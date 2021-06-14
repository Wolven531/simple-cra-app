import React from 'react'
// import { render, screen } from '@testing-library/react'
import { render, RenderResult } from '@testing-library/react'
import App from './App'

describe('App component', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(<App />)
	})

	it('renders App', () => {
		expect(comp).toBeDefined()

		// const linkElement = screen.getByText(/learn react/i)
		// expect(linkElement).toBeInTheDocument()
	})
})
