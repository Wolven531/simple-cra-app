import { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiService } from '../services/ApiService'
import { renderCompWithMockedContext } from '../../testing-utils'
import { ConfigPage } from './ConfigPage'

describe('ConfigPage component', () => {
	const fakeApiHealthResponse = 'OK'
	const fakeApiUrl = 'https://some-api.co'

	let comp: RenderResult

	let mockAlert: jest.SpyInstance
	let mockPingApiHealthEndpoint: jest.Mock
	let mockPingTokenCheckEndpoint: jest.Mock
	let mockPingTokenUpdateEndpoint: jest.Mock
	let mockSetTitle: jest.Mock

	beforeEach(() => {
		mockAlert = jest.spyOn(window, 'alert').mockImplementation(jest.fn())
		mockPingApiHealthEndpoint = jest
			.fn()
			.mockResolvedValue(fakeApiHealthResponse)
		mockPingTokenCheckEndpoint = jest.fn().mockResolvedValue(true)
		mockPingTokenUpdateEndpoint = jest.fn().mockResolvedValue(true)
		mockSetTitle = jest.fn()

		comp = renderCompWithMockedContext(ConfigPage, {
			api: {
				apiUrl: fakeApiUrl,
				pingApiHealthEndpoint: mockPingApiHealthEndpoint,
				pingTokenCheckEndpoint: mockPingTokenCheckEndpoint,
				pingTokenUpdateEndpoint: mockPingTokenUpdateEndpoint,
			} as unknown as ApiService,
			setTitle: mockSetTitle,
		})
	})

	it('renders ConfigPage component', () => {
		expect(comp).toBeDefined()
	})

	it('sets title appropriately', () => {
		expect(mockSetTitle).toHaveBeenCalledTimes(1)
		expect(mockSetTitle).toHaveBeenLastCalledWith('Config Page')
	})

	describe('click health check button', () => {
		beforeEach(() => {
			const healthCheckButton: Element = comp.getByText('Server Up?')
			userEvent.click(healthCheckButton)
		})

		it('invokes api.pingApiHealthEndpoint()', () => {
			expect(mockPingApiHealthEndpoint).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenLastCalledWith(fakeApiHealthResponse)
		})
	})

	describe('click token check button', () => {
		beforeEach(() => {
			const tokenCheckButton: Element = comp.getByText('Token valid?')
			userEvent.click(tokenCheckButton)
		})

		it('invokes api.pingTokenCheckEndpoint()', () => {
			expect(mockPingTokenCheckEndpoint).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenLastCalledWith('Token is valid')
		})
	})

	describe('click update token button w/o setting secret or token inputs', () => {
		beforeEach(() => {
			const updateTokenButton: Element = comp.getByText('Update Token')
			userEvent.click(updateTokenButton)
		})

		it('shows validation alert and does NOT invoke API method', () => {
			expect(mockPingTokenUpdateEndpoint).not.toHaveBeenCalled()
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenLastCalledWith(
				'Secret and Token are required to update token'
			)
		})
	})

	describe('click update token button after setting valid secret and token input values', () => {
		const fakeSecret = 'some-secret'
		const fakeToken = 'some-token'

		beforeEach(() => {
			// gather elements that need interaction / setup
			const secretInput: Element = comp.getByPlaceholderText('Secret')
			const tokenInput: Element = comp.getByPlaceholderText('New token')
			const updateTokenButton: Element = comp.getByText('Update Token')

			// update required text inputs
			userEvent.type(secretInput, fakeSecret)
			userEvent.type(tokenInput, fakeToken)

			// click update button
			userEvent.click(updateTokenButton)
		})

		it('invokes api.pingTokenUpdateEndpoint() w/ proper params and shows success alert', () => {
			expect(mockPingTokenUpdateEndpoint).toHaveBeenCalledTimes(1)
			expect(mockPingTokenUpdateEndpoint).toHaveBeenCalledWith(
				fakeSecret,
				fakeToken
			)

			expect(window.alert).toHaveBeenCalledTimes(1)
			expect(window.alert).toHaveBeenLastCalledWith('Token updated')
		})
	})
})
