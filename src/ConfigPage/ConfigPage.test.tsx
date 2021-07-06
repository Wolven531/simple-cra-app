import { createEvent, fireEvent, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiService } from '../services/ApiService'
import { renderCompWithMockedContext } from '../testing-utils'
import { ConfigPage } from './ConfigPage'

describe('ConfigPage component', () => {
	const fakeApiUrl = 'https://some-api.co'
	const fakeApiHealthResponse = 'OK'

	let comp: RenderResult
	let container: HTMLElement

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
		container = comp?.container // optional access (in case render failed)
	})

	it('renders ConfigPage component', () => {
		expect(comp).toBeDefined()
	})

	it('sets title appropriately (Anthony check)', () => {
		expect(mockSetTitle).toHaveBeenCalledTimes(1)
		expect(mockSetTitle).toHaveBeenLastCalledWith('Config Page')
	})

	// xit('sets title appropriately (Jim / RTL check)', async () => {
	// 	comp = renderCompWithMockedContext(ConfigPage, {
	// 		api: {
	// 			apiUrl: fakeApiUrl,
	// 		},
	// 	})
	// 	await waitFor(() => comp.getByText('Config Page'))
	// })

	describe('click health check button', () => {
		beforeEach(() => {
			const healthCheckButton: Element = container.querySelector(
				'.btn-health'
			) as Element
			const fakeClickEvent = createEvent('click', healthCheckButton)
			fireEvent.click(healthCheckButton, fakeClickEvent)

			// method 3 - not yet working
			// comp.getByRole('button', {
			// })
		})

		it('invokes api.pingApiHealthEndpoint()', () => {
			expect(mockPingApiHealthEndpoint).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenLastCalledWith(fakeApiHealthResponse)
		})
	})

	describe('click token check button', () => {
		beforeEach(() => {
			const tokenCheckButton: Element = container.querySelector(
				'.btn-token'
			) as Element
			const fakeClickEvent = createEvent('click', tokenCheckButton)
			fireEvent.click(tokenCheckButton, fakeClickEvent)
		})

		it('invokes api.pingTokenCheckEndpoint()', () => {
			expect(mockPingTokenCheckEndpoint).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenLastCalledWith('Token is valid')
		})
	})

	describe('click update token button w/o setting secret or token inputs', () => {
		beforeEach(() => {
			const updateTokenButton: Element = container.querySelector(
				'.btn-update-token'
			) as Element
			const fakeClickEvent = createEvent('click', updateTokenButton)
			fireEvent.click(updateTokenButton, fakeClickEvent)
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
			// gather the elements that will need interaction / setup
			const secretInput: HTMLInputElement = container.querySelector(
				'.input-secret'
			) as HTMLInputElement
			// const tokenInput: HTMLInputElement = container.querySelector(
			// 	'.input-new-token'
			// ) as HTMLInputElement
			const tokenInput: HTMLInputElement = comp.getByPlaceholderText('New token') as HTMLInputElement
			const updateTokenButton: Element = container.querySelector(
				'.btn-update-token'
			) as Element

			// create fake interaction events
			// const fakeChangeSecretEvent = createEvent('change', secretInput, {
			// 	target: { value: fakeSecret },
			// })
			// const fakeChangeTokenEvent = createEvent('change', tokenInput, {
			// 	target: { value: fakeToken },
			// })
			// const fakeClickEvent = createEvent('click', updateTokenButton)

			// update required text inputs first using fake events
			// fireEvent.change(tokenInput, fakeChangeTokenEvent)
			// fireEvent.change(secretInput, fakeChangeSecretEvent)
			userEvent.type(secretInput, fakeSecret)
			userEvent.type(tokenInput, fakeToken)

			// then click update button using fake event
			// fireEvent.click(updateTokenButton, fakeClickEvent)
			userEvent.click(updateTokenButton)
		})

		it('renders button properly, invokes pingTokenUpdateEndpoint() on API w/ proper params', () => {
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
