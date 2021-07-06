import {
	createEvent,
	fireEvent,
	RenderResult,
	waitFor,
} from '@testing-library/react'
import { ApiService } from '../services/ApiService'
import { renderCompWithMockedContext } from '../testing-utils'
import { ConfigPage } from './ConfigPage'

describe('ConfigPage component', () => {
	const fakeApiUrl = 'https://some-api.co'
	let comp: RenderResult

	let mockAlert: jest.SpyInstance
	let mockPingApiHealthEndpoint: jest.Mock
	let mockSetTitle: jest.Mock

	beforeEach(() => {
		mockAlert = jest.spyOn(window, 'alert').mockImplementation(jest.fn())
		mockPingApiHealthEndpoint = jest.fn().mockResolvedValue('OK')
		mockSetTitle = jest.fn()

		comp = renderCompWithMockedContext(ConfigPage, {
			api: {
				apiUrl: fakeApiUrl,
				pingApiHealthEndpoint: mockPingApiHealthEndpoint,
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

	xit('sets title appropriately (Jim / RTL check)', async () => {
		comp = renderCompWithMockedContext(ConfigPage, {
			api: {
				apiUrl: fakeApiUrl,
			},
		})
		await waitFor(() => comp.getByText('Config Page'))
	})

	describe('click the health button while providing health check method', () => {
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
			expect(mockAlert).toHaveBeenLastCalledWith('OK') // val specified using mockResolvedValue() above
		})
	})

	// 	describe('click the health button w/o health check method', () => {
	// 		beforeEach(() => {
	// 			const container = comp.container

	// 			// method 2 - works
	// 			const healthButton = container.querySelector('.btn-health')
	// 			fireEvent.click(healthButton as Element)
	// 		})

	// 		it('invokes default fireHealthCheck()', () => {
	// 			// TODO - add code to test default fireHealthCheck more thoroughly
	// 			expect(true).toBeTruthy()
	// 		})
	// 	})

	// 	// describe('click check token button', () => {
	// 	// 	let buttonCheckToken: ShallowWrapper

	// 	// 	beforeEach(() => {
	// 	// 		buttonCheckToken = comp.find('.btn-token')

	// 	// 		buttonCheckToken.simulate('click')
	// 	// 	})

	// 	// 	it('renders button properly, invokes pingTokenCheckEndpoint() on API w/ no params', () => {
	// 	// 		expect(buttonCheckToken.text()).toEqual('Token valid?')

	// 	// 		expect(mockApiService.pingTokenCheckEndpoint).toHaveBeenCalledTimes(1)
	// 	// 		expect(mockApiService.pingTokenCheckEndpoint).toHaveBeenLastCalledWith()

	// 	// 		expect(window.alert).toHaveBeenCalledTimes(1)
	// 	// 	})
	// 	// })

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
