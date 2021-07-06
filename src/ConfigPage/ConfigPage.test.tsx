import { createEvent, fireEvent, RenderResult } from '@testing-library/react'
import { ApiService } from '../services/ApiService'
import { renderCompWithMockedContext } from '../testing-utils'
import { ConfigPage } from './ConfigPage'

describe('ConfigPage component', () => {
	const fakeApiUrl = 'https://some-api.co'
	const fakeApiHealthResponse = 'OK'

	let comp: RenderResult

	let mockAlert: jest.SpyInstance
	let mockPingApiHealthEndpoint: jest.Mock
	let mockPingTokenCheckEndpoint: jest.Mock
	let mockSetTitle: jest.Mock

	beforeEach(() => {
		mockAlert = jest.spyOn(window, 'alert').mockImplementation(jest.fn())
		mockPingApiHealthEndpoint = jest
			.fn()
			.mockResolvedValue(fakeApiHealthResponse)
		mockPingTokenCheckEndpoint = jest.fn().mockResolvedValue('true')
		mockSetTitle = jest.fn()

		comp = renderCompWithMockedContext(ConfigPage, {
			api: {
				apiUrl: fakeApiUrl,
				pingApiHealthEndpoint: mockPingApiHealthEndpoint,
				pingTokenCheckEndpoint: mockPingTokenCheckEndpoint,
			} as unknown as ApiService,
			setTitle: mockSetTitle,
		})
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
			const container = comp.container
			const healthButton: Element = container.querySelector(
				'.btn-health'
			) as Element
			const fakeClickEvent = createEvent('click', healthButton)
			fireEvent.click(healthButton, fakeClickEvent)

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
			const container = comp.container
			const healthButton: Element = container.querySelector(
				'.btn-token'
			) as Element
			const fakeClickEvent = createEvent('click', healthButton)
			fireEvent.click(healthButton, fakeClickEvent)
		})

		it('invokes api.pingTokenCheckEndpoint()', () => {
			expect(mockPingTokenCheckEndpoint).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenLastCalledWith('Token is valid')
		})
	})

	// 	// describe('click update token button w/o setting secret or token inputs', () => {
	// 	// 	let buttonUpdateToken: ShallowWrapper

	// 	// 	beforeEach(() => {
	// 	// 		buttonUpdateToken = comp.find('.btn-update-token')

	// 	// 		buttonUpdateToken.simulate('click')
	// 	// 	})

	// 	// 	it('shows alert and does NOT invoke API', () => {
	// 	// 		expect(buttonUpdateToken.text()).toEqual('Update Token')

	// 	// 		expect(mockApiService.pingTokenUpdateEndpoint).not.toHaveBeenCalled()

	// 	// 		expect(window.alert).toHaveBeenCalledTimes(1)
	// 	// 	})
	// 	// })

	// 	// describe('click update token button when using provided secret and token props for inputs', () => {
	// 	// 	const fakeSecret = 'some-secret'
	// 	// 	const fakeToken = 'some-token'
	// 	// 	let buttonUpdateToken: ShallowWrapper
	// 	// 	// let inputSecret: ShallowWrapper
	// 	// 	// let inputToken: ShallowWrapper

	// 	// 	beforeEach(() => {
	// 	// 		comp = shallow(<ConfigPage api={mockApiService} defaultSecret={fakeSecret} defaultToken={fakeToken} />)

	// 	// 		// const mockSetNewToken = jest.fn()
	// 	// 		// const mockSetSecret = jest.fn()
	// 	// 		// jest.spyOn(React, 'useState')
	// 	// 		// 	.mockImplementationOnce((defaultNewToken: string) => [defaultNewToken, mockSetNewToken])
	// 	// 		// 	.mockImplementationOnce((defaultSecret: string) => [defaultSecret, mockSetSecret])

	// 	// 		buttonUpdateToken = comp.find('.btn-update-token')
	// 	// 		// inputSecret = comp.find('.input-secret')
	// 	// 		// inputToken = comp.find('.input-new-token')

	// 	// 		// inputSecret.simulate('change', { target: { value: fakeSecret } })
	// 	// 		// inputToken.simulate('change', { target: { value: fakeToken } })

	// 	// 		buttonUpdateToken.simulate('click')
	// 	// 	})

	// 	// 	it('renders button properly, invokes pingTokenUpdateEndpoint() on API w/ proper params', () => {
	// 	// 		expect(buttonUpdateToken.text()).toEqual('Update Token')

	// 	// 		expect(mockApiService.pingTokenUpdateEndpoint).toHaveBeenCalledTimes(1)
	// 	// 		expect(mockApiService.pingTokenUpdateEndpoint).toHaveBeenCalledWith(fakeSecret, fakeToken)

	// 	// 		expect(window.alert).toHaveBeenCalledTimes(1)
	// 	// 	})
	// 	// })
})
