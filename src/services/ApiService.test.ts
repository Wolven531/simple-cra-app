import { ApiService } from './ApiService'

describe('ApiService service', () => {
	let service: ApiService

	describe('create new instance w/o providing URL', () => {
		beforeEach(() => {
			service = new ApiService()
		})

		it('creates ApiService w/o API URL', () => {
			expect(service).toBeDefined()
			expect(service.apiUrl).toEqual('')
		})
	})

	describe('create new instance providing URL', () => {
		const fakeUrl = 'http://some-fake-url.co'

		beforeEach(() => {
			service = new ApiService(fakeUrl)
		})

		it('creates ApiService w/ proper API URL', () => {
			expect(service).toBeDefined()
			expect(service.apiUrl).toEqual(fakeUrl)
		})
	})
})
