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

		describe('pingApiHealthEndpoint()', () => {
			const fakeResponseText = 'fake-response-text'
			let mockFetch: jest.SpyInstance
			let resp: string

			beforeEach(async () => {
				mockFetch = jest.spyOn(window, 'fetch').mockResolvedValueOnce({
					text: jest.fn().mockResolvedValue(fakeResponseText),
				} as unknown as Response)

				resp = await service.pingApiHealthEndpoint()
			})

			it('uses fetch() properly and returns processed value', () => {
				expect(resp).toEqual(fakeResponseText)
				expect(mockFetch).toHaveBeenCalledTimes(1)
				expect(mockFetch).toHaveBeenLastCalledWith(
					`${fakeUrl}/health`,
					{
						cache: 'no-cache',
						method: 'get',
					},
				)
			})
		})
	})
})
