import { render } from '@testing-library/react'
import React from 'react'
import { App } from './App'

describe('App component when process.env.REACT_APP_API_URL has value', () => {
	// const fakeApiUrl = 'http://fake-api.co'
	// let comp: RenderResult
	// let origEnv: NodeJS.ProcessEnv

	// beforeEach(() => {
	// 	// !!! this should NOT be necessary, but is currently based on the error from
	// 	// !!!     updating context value in render code
	// 	jest.spyOn(console, 'error').mockImplementation(jest.fn())

	// 	origEnv = process.env

	// 	process.env = {
	// 		NODE_ENV: process.env.NODE_ENV,
	// 		PUBLIC_URL: process.env.PUBLIC_URL,
	// 		REACT_APP_API_URL: fakeApiUrl,
	// 	}

	// 	comp = render(<App />)
	// })

	// afterEach(() => {
	// 	process.env = origEnv
	// })

	it('renders App', () => {
		const comp = render(<App />)
		expect(comp).toBeDefined()
	})
})

// describe('App component when process.env.REACT_APP_API_URL is not set', () => {
// 	let wrapper: ShallowWrapper
// 	let origEnv: NodeJS.ProcessEnv

// 	beforeEach(() => {
// 		origEnv = process.env

// 		process.env = {
// 			NODE_ENV: process.env.NODE_ENV,
// 			PUBLIC_URL: process.env.PUBLIC_URL,
// 			REACT_APP_API_URL: undefined,
// 		}

// 		wrapper = shallow(<App />)

// 	})

// 	afterEach(() => {
// 		process.env = origEnv
// 	})

// 	it('renders App, uses default value from App comp', () => {
// 		expect(wrapper).toBeDefined()

// 		// expect(wrapper.find(ConfigPage).props().api.apiUrl).toEqual('!!! ENV WAS MISSING URL !!!')
// 	})
// })
