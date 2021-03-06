import {
	assert
} from 'chai';
import proxyquire from 'proxyquire';

let favoriteMarkets;
describe(`modules/markets/selectors/markets-favorite.js`, () => {
	proxyquire.noPreserveCache().noCallThru();
	let selector, out, test;
	let mockSelectors = {
		filteredMarkets: [{
			id: 'test1',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 1',
			tags: ['testtag', 'test']
		}, {
			id: 'test2',
			isFavorite: false,
			isPendingReport: true,
			positionsSummary: {
				qtyShares: {
					value: 10
				}
			},
			description: 'test 2',
			tags: ['testtag', 'test']
		}, {
			id: 'test3',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 3',
			tags: ['testtag', 'test']
		}, {
			id: 'test4',
			isFavorite: false,
			isPendingReport: true,
			description: 'test 4',
			tags: ['testtag', 'test']
		}, {
			id: 'test5',
			isFavorite: true,
			isPendingReport: false,
			positionsSummary: {
				qtyShares: {
					value: 5
				}
			},
			description: 'test 5',
			tags: ['testtag', 'test']
		}, {
			id: 'test6',
			isFavorite: false,
			isPendingReport: true,
			positionsSummary: {
				qtyShares: {
					value: 10
				}
			},
			description: 'test 6',
			tags: ['testtag', 'test']
		}]
	};

	selector = proxyquire('../../../src/modules/markets/selectors/markets-favorite.js', {
		'../../../selectors': mockSelectors
	});

	favoriteMarkets = selector.default;

	it(`should return only favorite markets`, () => {
		test = selector.default();
		out = mockSelectors.filteredMarkets.filter(market => market.isFavorite);
		assert.deepEqual(test, out, `Didn't return the expected markets`);
	});
});

export default favoriteMarkets;
