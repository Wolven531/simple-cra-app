import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import { ApiService } from '../services/ApiService'
import { ConfigPage, ConfigPageProps } from './ConfigPage'

describe('ConfigPage component', () => {
	let comp: ShallowWrapper<ConfigPageProps>
	let mockApiService: ApiService

	beforeEach(() => {
		mockApiService = {
			_apiUrl: 'fake-url',
			apiUrl: 'fake-url',
			handleError: jest.fn(),
			pingApiHealthEndpoint: jest.fn().mockResolvedValue('healthy'),
			pingTokenCheckEndpoint: jest.fn().mockResolvedValue(true),
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
		})
	})
})
