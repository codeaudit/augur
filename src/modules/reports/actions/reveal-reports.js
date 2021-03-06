import async from 'async';
import { updateReports } from '../../reports/actions/update-reports';
import { addRevealReportTransaction } from '../../transactions/actions/add-reveal-report-transaction';
import { constants } from '../../../services/augurjs';

export function revealReports() {
	return (dispatch, getState) => {
		const { blockchain, loginAccount, reports, branch } = getState();
		// Make sure that:
		//  - branch is in the second half of its reporting period
		//  - user is logged in and has Rep
		//  - that this user has committed reports to reveal
		if (blockchain.isReportConfirmationPhase && loginAccount.rep && reports) {
			const branchReports = reports[branch.id];
			if (branchReports) {
				const revealableReports = Object.keys(branchReports)
					.filter(eventID => branchReports[eventID].reportHash &&
					branchReports[eventID].reportHash.length && !branchReports[eventID].isRevealed)
					.map(eventID => {
						const obj = { ...branchReports[eventID], eventID };
						return obj;
					});
				if (revealableReports && revealableReports.length && loginAccount && loginAccount.id) {
					async.eachLimit(revealableReports, constants.PARALLEL_LIMIT, (report, nextReport) => {
						addRevealReportTransaction(report.eventID, report.reportedOutcomeID, report.salt, report.isUnethical, report.isScalar, report.isIndeterminate, (e) => {
							if (e) return nextReport(e);
							dispatch(updateReports({
								[branch.id]: {
									[report.eventID]: { ...report, isRevealed: true }
								}
							}));
							nextReport();
						});
					}, (e) => {
						if (e) return console.error('revealReports:', e);
					});
				}
			}
		}
	};
}
