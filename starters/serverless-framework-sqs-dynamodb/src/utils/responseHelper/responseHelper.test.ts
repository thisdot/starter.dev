import { responseHelper } from './responseHelper';

describe('responseHelper()', () => {
	let subject: ReturnType<typeof responseHelper>;

	describe('when resp is string', () => {
		beforeAll(() => {
			subject = responseHelper(200, 'some string');
		});

		it('returns a response object', () => {
			expect(subject).toHaveProperty('statusCode');
			expect(subject).toHaveProperty('body');
		});

		it('sets body to the provided string', () => {
			expect(subject.body).toEqual('some string');
		});
	});

	describe('when resp is not a string', () => {
		beforeAll(() => {
			subject = responseHelper(200, null);
		});

		it('returns a response object', () => {
			expect(subject).toHaveProperty('statusCode');
			expect(subject).toHaveProperty('body');
		});

		it('sets body to the JSON stringified value', () => {
			expect(subject.body).toEqual('null');
		});
	});
});
