import { RenderResult } from '@testing-library/react'
import { renderElemWithMockedContext } from '../testing-utils'
import { Nav } from './Nav'
import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

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
})
