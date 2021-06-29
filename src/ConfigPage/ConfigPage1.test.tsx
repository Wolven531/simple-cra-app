import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import { ConfigPage } from './ConfigPage'

describe('ConfigPage component', () => {
	// let comp: ShallowWrapper<ConfigPageProps>
	// let heavyComp: cheerio.Cheerio
	// let inst: ReactElement<any, any>
	// let inst2: ReactElement<ConfigPageProps, any>
	let inst3: RenderResult
	// let mockAlert: jest.SpyInstance
	// let mockApiService: ApiService

	beforeEach(() => {
		// mockAlert = jest.spyOn(window, 'alert').mockImplementationOnce(jest.fn())

		// mockApiService = {
		// 	_apiUrl: 'fake-url',
		// 	apiUrl: 'fake-url',
		// 	handleError: jest.fn(),
		// 	pingApiHealthEndpoint: jest.fn().mockResolvedValue('healthy'),
		// 	pingTokenCheckEndpoint: jest.fn().mockResolvedValue(true),
		// 	pingTokenUpdateEndpoint: jest.fn().mockResolvedValue(true),
		// } as unknown as ApiService

		// comp = shallow(<ConfigPage api={mockApiService} />)
		// heavyComp = render(<ConfigPage api={mockApiService} />)
		// inst = ConfigPage({ }) as ReactElement<any, any>
		// inst2 = <ConfigPage api={mockApiService} />
		inst3 = render(<ConfigPage />)
	})

	it('renders ConfigPage component', () => {
		expect(inst3).toBeDefined()
	})

	// describe('click health button', () => {
	// 	let buttonHealthcheck: ShallowWrapper

	// 	beforeEach(() => {
	// 		buttonHealthcheck = comp.find('.btn-health')

	// 		buttonHealthcheck.simulate('click')
	// 	})

	// 	it('renders button properly, invokes pingApiHealthEndpoint() on API w/ no params', () => {
	// 		expect(buttonHealthcheck.text()).toEqual('Server Up?')

	// 		expect(mockApiService.pingApiHealthEndpoint).toHaveBeenCalledTimes(1)
	// 		expect(mockApiService.pingApiHealthEndpoint).toHaveBeenLastCalledWith()

	// 		expect(window.alert).toHaveBeenCalledTimes(1)
	// 	})
	// })

	// describe('click check token button', () => {
	// 	let buttonCheckToken: ShallowWrapper

	// 	beforeEach(() => {
	// 		buttonCheckToken = comp.find('.btn-token')

	// 		buttonCheckToken.simulate('click')
	// 	})

	// 	it('renders button properly, invokes pingTokenCheckEndpoint() on API w/ no params', () => {
	// 		expect(buttonCheckToken.text()).toEqual('Token valid?')

	// 		expect(mockApiService.pingTokenCheckEndpoint).toHaveBeenCalledTimes(1)
	// 		expect(mockApiService.pingTokenCheckEndpoint).toHaveBeenLastCalledWith()

	// 		expect(window.alert).toHaveBeenCalledTimes(1)
	// 	})
	// })

	// describe('click update token button w/o setting secret or token inputs', () => {
	// 	let buttonUpdateToken: ShallowWrapper

	// 	beforeEach(() => {
	// 		buttonUpdateToken = comp.find('.btn-update-token')

	// 		buttonUpdateToken.simulate('click')
	// 	})

	// 	it('shows alert and does NOT invoke API', () => {
	// 		expect(buttonUpdateToken.text()).toEqual('Update Token')

	// 		expect(mockApiService.pingTokenUpdateEndpoint).not.toHaveBeenCalled()

	// 		expect(window.alert).toHaveBeenCalledTimes(1)
	// 	})
	// })

	// describe('click update token button when using provided secret and token props for inputs', () => {
	// 	const fakeSecret = 'some-secret'
	// 	const fakeToken = 'some-token'
	// 	let buttonUpdateToken: ShallowWrapper
	// 	// let inputSecret: ShallowWrapper
	// 	// let inputToken: ShallowWrapper

	// 	beforeEach(() => {
	// 		comp = shallow(<ConfigPage api={mockApiService} defaultSecret={fakeSecret} defaultToken={fakeToken} />)

	// 		// const mockSetNewToken = jest.fn()
	// 		// const mockSetSecret = jest.fn()
	// 		// jest.spyOn(React, 'useState')
	// 		// 	.mockImplementationOnce((defaultNewToken: string) => [defaultNewToken, mockSetNewToken])
	// 		// 	.mockImplementationOnce((defaultSecret: string) => [defaultSecret, mockSetSecret])

	// 		buttonUpdateToken = comp.find('.btn-update-token')
	// 		// inputSecret = comp.find('.input-secret')
	// 		// inputToken = comp.find('.input-new-token')

	// 		// inputSecret.simulate('change', { target: { value: fakeSecret } })
	// 		// inputToken.simulate('change', { target: { value: fakeToken } })

	// 		buttonUpdateToken.simulate('click')
	// 	})

	// 	it('renders button properly, invokes pingTokenUpdateEndpoint() on API w/ proper params', () => {
	// 		expect(buttonUpdateToken.text()).toEqual('Update Token')

	// 		expect(mockApiService.pingTokenUpdateEndpoint).toHaveBeenCalledTimes(1)
	// 		expect(mockApiService.pingTokenUpdateEndpoint).toHaveBeenCalledWith(fakeSecret, fakeToken)

	// 		expect(window.alert).toHaveBeenCalledTimes(1)
	// 	})
	// })
})
