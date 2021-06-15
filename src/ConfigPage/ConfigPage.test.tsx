import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import { ApiService } from '../services/ApiService'
import { ConfigPage } from './ConfigPage'

describe('ConfigPage component', () => {
	let comp: RenderResult
	let mockApiService: ApiService

	beforeEach(() => {
		mockApiService = {
			_apiUrl: 'fake-url',
			apiUrl: 'fake-url',
			handleError: jest.fn(),
			pingApiHealthEndpoint: jest.fn().mockResolvedValue('healthy'),
			pingTokenCheckEndpoint: jest.fn().mockResolvedValue(true),
		} as unknown as ApiService

		comp = render(<ConfigPage api={mockApiService} />)
	})

	it('renders ConfigPage', () => {
		expect(comp).toBeDefined()
	})
})
