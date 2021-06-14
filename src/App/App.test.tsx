import React from 'react'
// import { render, screen } from '@testing-library/react'
import { render, RenderResult } from '@testing-library/react'
import App from './App'

describe('App component', () => {
	let app: RenderResult

	beforeEach(() => {
		app = render(<App />)
	})

	it('renders app', () => {
		expect(app).toBeDefined()

		// const linkElement = screen.getByText(/learn react/i)
		// expect(linkElement).toBeInTheDocument()
	})
})
