import { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { renderElemWithMockedContext } from '../testing-utils'
import { Nav } from './Nav'

describe('Nav component', () => {
	const fakeTitle = 'Some Page Title'

	let comp: RenderResult
	let history: MemoryHistory<unknown>

	beforeEach(() => {
		history = createMemoryHistory()
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

	describe('click to open menu', () => {
		const expectedLinkRoutes = ['/', '/config', '/icons', '/search-users']
		const expectedLinkTexts = [
			'Home',
			'Config',
			'Icon Demo',
			'Search Users',
		]

		beforeEach(() => {
			userEvent.click(comp.getByLabelText('menu'))
		})

		it('displays menu items', () => {
			const links = comp.getAllByRole('link')

			expect(links.map((elem) => elem.getAttribute('href'))).toEqual(
				expectedLinkRoutes
			)
			expect(links.map((elem) => elem.textContent)).toEqual(
				expectedLinkTexts
			)
		})

		// describe('click link to go to Home page', () => {
		// 	beforeEach(() => {
		// 		userEvent.click(comp.getByText('Home'))
		// 	})

		// 	it('navigates to Home page route', () => {
		// 		expect(history.location.pathname).toEqual('/')
		// 	})
		// })

		// describe('click link to go to Config page', () => {
		// 	beforeEach(() => {
		// 		userEvent.click(comp.getByText('Config'))
		// 	})

		// 	it('navigates to Config page route', () => {
		// 		expect(history.location.pathname).toEqual('/config')
		// 	})
		// })

		// describe('click link to go to Icon Demo page', () => {
		// 	beforeEach(() => {
		// 		userEvent.click(comp.getByText('Icon Demo'))
		// 	})

		// 	it('navigates to Icon Demo page route', () => {
		// 		expect(history.location.pathname).toEqual('/icon-demo')
		// 	})
		// })

		// describe('click link to go to Search Users page', () => {
		// 	beforeEach(() => {
		// 		userEvent.click(comp.getByText('Search Users'))
		// 	})

		// 	it('navigates to Search Users page route', () => {
		// 		expect(history.location.pathname).toEqual('/search-users')
		// 	})
		// })
	})
})
