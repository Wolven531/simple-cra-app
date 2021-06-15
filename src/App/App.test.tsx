import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import App from './App'

describe('App component when process.env.REACT_APP_API_URL has value', () => {
	const fakeApiUrl = 'http://fake-api.co'
	let comp: RenderResult
	let origEnv: NodeJS.ProcessEnv

	beforeEach(() => {
		origEnv = process.env

		process.env = {
			NODE_ENV: process.env.NODE_ENV,
			PUBLIC_URL: process.env.PUBLIC_URL,
			REACT_APP_API_URL: fakeApiUrl,
		}

		comp = render(<App />)
	})

	afterEach(() => {
		process.env = origEnv
	})

	it('renders App, uses values from environment', () => {
		expect(comp).toBeDefined()
		// TODO - 
		// comp.asFragment().querySelector('<ApiContext.Provider>')?.getAttribute('value')
		// const linkElement = screen.getByText(/learn react/i)
		// expect(linkElement).toBeInTheDocument()
	})

})

describe('App component when process.env.REACT_APP_API_URL is not set', () => {
	let comp: RenderResult
	let origEnv: NodeJS.ProcessEnv

	beforeEach(() => {
		origEnv = process.env

		process.env = {
			NODE_ENV: process.env.NODE_ENV,
			PUBLIC_URL: process.env.PUBLIC_URL,
			REACT_APP_API_URL: undefined,
		}

		comp = render(<App />)
	})

	afterEach(() => {
		process.env = origEnv
	})

	it('renders App, uses default value from App comp', () => {
		expect(comp).toBeDefined()
	})
})
