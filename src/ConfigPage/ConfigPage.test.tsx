import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import { ApiService } from '../services/ApiService'
import { ConfigPage, ConfigPageProps } from './ConfigPage'

describe('ConfigPage component', () => {
	let comp: ShallowWrapper<ConfigPageProps>
	let mockAlert: jest.SpyInstance
	let mockApiService: ApiService

	beforeEach(() => {
		mockAlert = jest.spyOn(window, 'alert').mockImplementationOnce(jest.fn())

		mockApiService = {
			_apiUrl: 'fake-url',
			apiUrl: 'fake-url',
			handleError: jest.fn(),
			pingApiHealthEndpoint: jest.fn().mockResolvedValue('healthy'),
			pingTokenCheckEndpoint: jest.fn().mockResolvedValue(true),
			pingTokenUpdateEndpoint: jest.fn().mockResolvedValue(true),
		} as unknown as ApiService

		comp = shallow(<ConfigPage api={mockApiService} />)
	})

	it('renders ConfigPage component', () => {
		expect(comp).toBeDefined()
	})

	describe('click health button', () => {
		let buttonHealthcheck: ShallowWrapper

		beforeEach(() => {
			buttonHealthcheck = comp.find('.btn-health')

			buttonHealthcheck.simulate('click')
		})

		it('renders button properly, invokes pingApiHealthEndpoint() on API w/ no params', () => {
			expect(buttonHealthcheck.text()).toEqual('Server Up?')

			expect(mockApiService.pingApiHealthEndpoint).toHaveBeenCalledTimes(1)
			expect(mockApiService.pingApiHealthEndpoint).toHaveBeenLastCalledWith()

			expect(mockAlert).toHaveBeenCalledTimes(1)
		})
	})

	describe('click check token button', () => {
		let buttonCheckToken: ShallowWrapper

		beforeEach(() => {
			buttonCheckToken = comp.find('.btn-token')

			buttonCheckToken.simulate('click')
		})

		it('renders button properly, invokes pingTokenCheckEndpoint() on API w/ no params', () => {
			expect(buttonCheckToken.text()).toEqual('Token valid?')

			expect(mockApiService.pingTokenCheckEndpoint).toHaveBeenCalledTimes(1)
			expect(mockApiService.pingTokenCheckEndpoint).toHaveBeenLastCalledWith()

			expect(mockAlert).toHaveBeenCalledTimes(1)
		})
	})

	describe('click update token button w/o setting secret or token inputs', () => {
		let buttonUpdateToken: ShallowWrapper

		beforeEach(() => {
			buttonUpdateToken = comp.find('.btn-update-token')

			buttonUpdateToken.simulate('click')
		})

		it('shows alert and does NOT invoke API', () => {
			expect(buttonUpdateToken.text()).toEqual('Update Token')

			expect(mockApiService.pingTokenUpdateEndpoint).not.toHaveBeenCalled()

			expect(mockAlert).toHaveBeenCalledTimes(1)
		})
	})
})
