import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import { PageNotFoundPage } from './PageNotFoundPage'

describe('PageNotFoundPage component', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(<PageNotFoundPage />)
	})

	it('renders PageNotFoundPage', () => {
		expect(comp).toBeDefined()
	})
})
