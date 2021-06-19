import { HEADERS_JSON_CONTENT, HTTP_POST, NO_CACHE } from '../constants'
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

		describe('set apiUrl w/ property setter and invoke method', () => {
			const fakeUpdatedUrl = 'http://updated-fake-url.co'
			let mockFetch: jest.SpyInstance

			beforeEach(async () => {
				mockFetch = jest.spyOn(window, 'fetch').mockResolvedValueOnce({
					text: jest.fn().mockResolvedValue(''),
				} as unknown as Response)

				service.apiUrl = fakeUpdatedUrl

				await service.pingApiHealthEndpoint()
			})

			it('uses updated apiUrl during method execution', () => {
				expect(mockFetch).toHaveBeenLastCalledWith(
					`${fakeUpdatedUrl}/health`,
					{
						cache: 'no-cache',
						method: 'get',
					},
				)
			})
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

		describe('pingApiHealthEndpoint() w/ mocked non-error response', () => {
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

		describe('pingApiHealthEndpoint() w/ mocked error response', () => {
			const fakeError = 'fake-error'
			let mockAlert: jest.SpyInstance
			let mockConsoleError: jest.SpyInstance
			let mockFetch: jest.SpyInstance
			let resp: string

			beforeEach(async () => {
				mockAlert = jest.spyOn(window, 'alert').mockImplementationOnce(jest.fn())
				mockConsoleError = jest.spyOn(window.console, 'error').mockImplementationOnce(jest.fn())
				mockFetch = jest.spyOn(window, 'fetch').mockRejectedValueOnce(fakeError)

				resp = await service.pingApiHealthEndpoint()
			})

			it('invokes handleError() properly and returns safe value', () => {
				expect(resp).toEqual('')
				expect(mockFetch).toHaveBeenCalledTimes(1)
				expect(mockConsoleError).toHaveBeenCalledTimes(1)
				expect(mockConsoleError).toHaveBeenLastCalledWith(fakeError)
				expect(mockAlert).toHaveBeenCalledTimes(1)
			})
		})

		describe('pingTokenCheckEndpoint() w/ mocked non-error response', () => {
			const fakeResponseText = 'true'
			let mockFetch: jest.SpyInstance
			let resp: boolean

			beforeEach(async () => {
				mockFetch = jest.spyOn(window, 'fetch').mockResolvedValueOnce({
					text: jest.fn().mockResolvedValue(fakeResponseText),
				} as unknown as Response)

				resp = await service.pingTokenCheckEndpoint()
			})

			it('uses fetch() properly and returns processed value', () => {
				expect(resp).toEqual(true)
				expect(mockFetch).toHaveBeenCalledTimes(1)
				expect(mockFetch).toHaveBeenLastCalledWith(
					`${fakeUrl}/config/check-token`,
					{
						cache: 'no-cache',
						method: 'get',
					},
				)
			})
		})

		describe('pingTokenCheckEndpoint() w/ mocked error response', () => {
			const fakeError = 'fake-error'
			let mockFetch: jest.SpyInstance
			let resp: boolean
			let spyHandleError: jest.SpyInstance

			beforeEach(async () => {
				mockFetch = jest.spyOn(window, 'fetch').mockRejectedValueOnce(fakeError)
				spyHandleError = jest.spyOn<any, 'handleError'>(service, 'handleError')
					.mockImplementationOnce(jest.fn())

				resp = await service.pingTokenCheckEndpoint()
			})

			it('invokes handleError() properly and returns safe value', () => {
				expect(resp).toEqual(false)
				expect(mockFetch).toHaveBeenCalledTimes(1)
				expect(spyHandleError).toHaveBeenCalledTimes(1)
				expect(spyHandleError).toHaveBeenLastCalledWith(fakeError)
			})
		})

		describe('pingTokenUpdateEndpoint() w/ mocked non-error response', () => {
			const fakeResponseText = 'true'
			const fakeSecret = 'some-secret'
			const fakeToken = 'some-token'
			let mockFetch: jest.SpyInstance
			let resp: boolean

			beforeEach(async () => {
				mockFetch = jest.spyOn(window, 'fetch').mockResolvedValueOnce({
					text: jest.fn().mockResolvedValue(fakeResponseText),
				} as unknown as Response)

				resp = await service.pingTokenUpdateEndpoint(fakeSecret, fakeToken)
			})

			it('uses fetch() properly and returns processed value', () => {
				expect(resp).toEqual(true)
				expect(mockFetch).toHaveBeenCalledTimes(1)
				expect(mockFetch).toHaveBeenLastCalledWith(
					`${fakeUrl}/config/set-token`, {
						cache: NO_CACHE,
						method: HTTP_POST,
						body: JSON.stringify({
							secret: fakeSecret,
							token: fakeToken,
						}),
						headers: HEADERS_JSON_CONTENT,
					}
				)
			})
		})

		describe('pingTokenUpdateEndpoint() w/ mocked error response', () => {
			const fakeError = 'fake-error'
			let mockFetch: jest.SpyInstance
			let resp: boolean
			let spyHandleError: jest.SpyInstance

			beforeEach(async () => {
				mockFetch = jest.spyOn(window, 'fetch').mockRejectedValueOnce(fakeError)
				spyHandleError = jest.spyOn<any, 'handleError'>(service, 'handleError')
					.mockImplementationOnce(jest.fn())

				resp = await service.pingTokenUpdateEndpoint('some-secret', 'some-token')
			})

			it('invokes handleError() properly and returns safe value', () => {
				expect(resp).toEqual(false)
				expect(mockFetch).toHaveBeenCalledTimes(1)
				expect(spyHandleError).toHaveBeenCalledTimes(1)
				expect(spyHandleError).toHaveBeenLastCalledWith(fakeError)
			})
		})
	})
})
