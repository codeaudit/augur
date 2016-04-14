import * as AugurJS from '../../../services/augurjs';

export const UPDATE_ACCOUNT_TRADES_DATA = 'UPDATE_ACCOUNT_TRADES_DATA';

export function loadAccountTrades() {
	return (dispatch, getState) => {
		AugurJS.loadAccountTrades(getState().loginAccount.id, (err, accountTrades) => {
			if (err) {
				console.log('ERROR loadAccountTrades', err);
				return;
			}
			if (!accountTrades) {
				return;
			}

			var trades = Object.keys(accountTrades).reduce((p, accountTradeID) => {
					Object.keys(accountTrades[accountTradeID]).forEach(outcomeID => {
						accountTrades[accountTradeID][outcomeID].forEach(trade => {
							if (!p[trade.market]) {
								p[trade.market] = {};
							}
							if (!p[trade.market][outcomeID]) {
								p[trade.market][outcomeID] = [];
							}

							p[trade.market][outcomeID].push({
								qtyShares: trade.shares,
								purchasePrice: Math.abs(trade.cost)
							});
						});
					});
					return p;
				}, {});

			dispatch(updateAccountTradesData(trades));
		});
	};
}

export function updateAccountTradesData(data) {
    return { type: UPDATE_ACCOUNT_TRADES_DATA, data };
}

export function loadMeanTradePrices() {
    return (dispatch, getState) => {
        var { loginAccount } = getState();
        AugurJS.loadMeanTradePrices(loginAccount.id, (err, meanTradePrices) => {
console.log('========loadMeanTradePrices>>>>', err, meanTradePrices);
            if (err) {
                return console.info('ERR loadMeanTradePrices():', err);
            }

            /*
            if (meanTradePrices) {
                dispatch(updatePositionsData(meanTradePrices));
            }
            */
        });
    };
}