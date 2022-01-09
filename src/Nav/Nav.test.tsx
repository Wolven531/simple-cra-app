import { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createBrowserHistory, History } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { renderElemWithMockedContext } from '../../testing-utils'
import { Nav } from './Nav'

describe('Nav component', () => {
	const fakeTitle = 'Some Page Title'

	let comp: RenderResult
	let history: History<unknown>

	beforeEach(() => {
		history = createBrowserHistory({
			// initialEntries: ['/'],
			// initialIndex: 0,
		})
		comp = renderElemWithMockedContext(
			<Router history={history}>
				<Nav />
			</Router>,
			{
				title: fakeTitle,
			}
		)
	})

	it('renders Nav', () => {
		expect(comp).toBeDefined()
	})

	it('renders title appropriately', () => {
		expect(comp.getByRole('heading')).toHaveTextContent(fakeTitle)
	})

	// !!! FIXME - this test does not work w/ the DOM structure
	// it('renders w/ menu closed', () => {
	// 	expect(comp.getByRole('menubar')).toHaveAttribute('aria-hidden')
	// })

	describe('click to open menu', () => {
		const expectedLinkRoutes = [
			'/',
			'/config',
			'/icons',
			'/search',
			'/users',
			'/compare',
		]
		const expectedLinkTexts = [
			'Home',
			'Config',
			'Icon Demo',
			'Search Users',
			'All Users',
			'Compare Users',
		]

		beforeEach(() => {
			userEvent.click(comp.getByLabelText('menu'))
		})

		it('displays open menu and items', () => {
			const links = comp.getAllByRole('link')

			// !!! FIXME - this assertion does not work w/ the DOM structure
			// expect(comp.getByRole('menubar')).not.toHaveAttribute('aria-hidden')

			expect(links.map((elem) => elem.getAttribute('href'))).toEqual(
				expectedLinkRoutes
			)
			expect(links.map((elem) => elem.textContent)).toEqual(
				expectedLinkTexts
			)
		})

		// !!! FIXME - this test does not work w/ the DOM structure
		// describe('click heading to close menu', () => {
		// 	beforeEach(() => {
		// 		userEvent.click(comp.getByRole('heading', { hidden: true }))
		// 	})

		// 	it('closes menu by adding hidden attribute', () => {
		// 		expect(comp.getByRole('menubar')).toHaveAttribute('aria-hidden')
		// 	})
		// })

		// !!! FIXME - this test does not work due to navigation
		// describe('click link to go to Home page', () => {
		// 	beforeEach(() => {
		// 		userEvent.click(comp.getByText('Home'))
		// 	})

		// 	it('navigates to Home page route', () => {
		// 		expect(history.location.pathname).toEqual('/')
		// 	})
		// })

		// !!! FIXME - this test does not work due to navigation
		// describe('click link to go to Config page', () => {
		// 	beforeEach(() => {
		// 		expect(history.length).toBe(1)
		// 		expect(history.location.pathname).toEqual('/')

		// 		userEvent.click(comp.getByText('Config'))
		// 	})

		// 	it('navigates to Config page route', () => {
		// 		expect(history.length).toBe(2)
		// 		expect(history.location.pathname).toEqual('/config')
		// 	})
		// })

		// !!! FIXME - this test does not work due to navigation
		// describe('click link to go to Icon Demo page', () => {
		// 	beforeEach(() => {
		// 		userEvent.click(comp.getByText('Icon Demo'))
		// 	})

		// 	it('navigates to Icon Demo page route', () => {
		// 		expect(history.location.pathname).toEqual('/icon-demo')
		// 	})
		// })

		// !!! FIXME - this test does not work due to navigation
		// describe('click link to go to Search Users page', () => {
		// 	beforeEach(() => {
		// 		userEvent.click(comp.getByText('Search Users'))
		// 	})

		// 	it('navigates to Search Users page route', () => {
		// 		expect(history.location.pathname).toEqual('/search')
		// 	})
		// })
	})
})
