import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Footer } from './Footer'

describe('Footer component', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(<Footer />)
	})

	it('renders Footer', () => {
		expect(comp).toBeDefined()
	})
})
