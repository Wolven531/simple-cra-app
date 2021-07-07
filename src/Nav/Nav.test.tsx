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
	})
})
