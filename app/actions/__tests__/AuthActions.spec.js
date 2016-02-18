jest.dontMock('../AuthActions');
jest.dontMock('../../util/registry');
jest.dontMock('debug');

var registry = require('../../util/registry');
var AuthActions = require('../AuthActions');
var {MODEL, UPDATE} = require('../const');

describe('AuthActions', function () {

  	pit('handles authentication by fetching the associated user data when user is authenticated.', () => {
		
		var uid = 'fakeId-123',
			mockFn = jest.genMockFunction().mockImplementation((payload, resolve, reject) => resolve(payload));

		function FakeAPI() { this.fetch = mockFn };

  		var API = new FakeAPI(),
  			actions = new AuthActions();

  		registry.set("API", API);

		return actions.onAuth({ uid }).then(
			payload => expect(API.fetch.mock.calls[0][0]).toEqual({ id: uid, model: MODEL.USER })
		)
	});

	pit('handles unauthentication by returning an empty auth obj.', () => {
		
  		let actions = new AuthActions();

		return actions.onAuth(null).then(
			payload => expect(payload).toEqual(null)
		)
	});

});
