import blockchain from './modules/app/reducers/blockchain';
import branch from './modules/app/reducers/branch';

import auth from './modules/auth/reducers/auth';
import loginAccount from './modules/auth/reducers/login-account';
import activePage from './modules/app/reducers/active-page';

import markets from './modules/markets/reducers/markets';
import favorites from './modules/markets/reducers/favorites';
import recentlyExpiredMarkets from './modules/markets/reducers/recently-expired-markets';

import recentlyExpiredEvents from './modules/reports/reducers/recently-expired-events';
import pendingReports from './modules/reports/reducers/pending-reports';

import outcomes from './modules/markets/reducers/outcomes';
import bidsAsks from './modules/bids-asks/reducers/bids-asks';
import accountTrades from './modules/positions/reducers/account-trades';
import transactions from './modules/transactions/reducers/transactions';

import selectedMarketsHeader from './modules/markets/reducers/selected-markets-header';
import selectedMarketID from './modules/markets/reducers/selected-market-id';
import tradesInProgress from './modules/trade/reducers/trades-in-progress';
import createMarketInProgress from './modules/create-market/reducers/create-market-in-progress';
import keywords from './modules/markets/reducers/keywords';
import selectedFilters from './modules/markets/reducers/selected-filters';
import selectedSort from './modules/markets/reducers/selected-sort';

module.exports = {
	blockchain,
	branch,

	auth,
	loginAccount,
	activePage,

	markets,
	favorites,
	recentlyExpiredMarkets,

	recentlyExpiredEvents,
	pendingReports,

	selectedMarketID,
	selectedMarketsHeader,
	keywords,
	selectedFilters,
	selectedSort,

	tradesInProgress,
	createMarketInProgress,

	outcomes,
	bidsAsks,
	accountTrades,
	transactions
};