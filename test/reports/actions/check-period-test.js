import {
	assert
} from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testState from '../../testState';

describe('modules/reports/actions/check-period.js', () => {
	proxyquire.noPreserveCache().noCallThru();
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	let store, action;
	let state = Object.assign({}, testState, {
		blockchain: {...testState.blockchain,
			isReportConfirmationPhase: false
		},
		loginAccount: {...testState.loginAccount,
			rep: 100
		}
	});
	store = mockStore(state);
	let mockAugurJS = { augur: {} };
	let mockLoadReports = { loadReports: () => {} };
	let mockCollectFees = {};
	let mockRevealReports = {};
	let mockLoadEventsWithSubmittedReport = { loadEventsWithSubmittedReport: () => {} };
	mockAugurJS.augur.getCurrentPeriod = sinon.stub().returns(20);
	mockAugurJS.augur.getCurrentPeriodProgress = sinon.stub().returns(52);
	mockAugurJS.augur.checkPeriod = sinon.stub().yields(null, 'TEST RESPONSE!');
	mockAugurJS.augur.penalizeWrong = sinon.stub().yields(null, 'TEST RESPONSE!');
	mockAugurJS.augur.incrementPeriodAfterReporting = sinon.stub().yields(null, 'TEST RESPONSE!');
	sinon.stub(mockLoadReports, 'loadReports', (cb) => {
		return (dispatch, getState) => {
			dispatch({
				type: 'UPDATE_REPORTS',
				reports: { '0xf69b5': { '0xdeadbeef': { reportedOutcomeID: 1 } } }
			});
			cb(null);
		};
	});
	sinon.stub(mockLoadEventsWithSubmittedReport, 'loadEventsWithSubmittedReport', () => {
		return dispatch => {
			dispatch({ type: 'LOAD_EVENTS' });
		};
	});
	mockCollectFees.collectFees = sinon.stub().returns({
		type: 'UPDATE_ASSETS'
	});
	mockRevealReports.revealReports = sinon.stub().returns({
		type: 'UPDATE_REPORTS',
		reports: { '0xf69b5': { '0xdeadbeef': { reportedOutcomeID: 1, isRevealed: true } } }
	});


	action = proxyquire('../../../src/modules/reports/actions/check-period.js', {
		'../../../services/augurjs': mockAugurJS,
		'../../reports/actions/load-reports': mockLoadReports,
		'../../reports/actions/collect-fees': mockCollectFees,
		'../../reports/actions/reveal-reports': mockRevealReports,
		'../../my-reports/actions/load-events-with-submitted-report': mockLoadEventsWithSubmittedReport
	});

	beforeEach(() => {
		store.clearActions();
	});

	afterEach(() => {
		store.clearActions();
	});

	it('should check for increment period / penalize wrong', () => {
		store.dispatch(action.checkPeriod());
		assert(mockAugurJS.augur.checkPeriod.calledOnce);
	});

});
