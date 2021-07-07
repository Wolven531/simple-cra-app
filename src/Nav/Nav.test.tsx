import { RenderResult } from '@testing-library/react'
import { renderCompWithMockedContext } from '../testing-utils'
import { Nav } from './Nav'

describe('Nav component', () => {
	const fakeTitle = 'Some Page Title'

	let comp: RenderResult

	beforeEach(() => {
		comp = renderCompWithMockedContext(Nav, {
			title: fakeTitle,
		})
	})

	it('renders Nav', () => {
		expect(comp).toBeDefined()
	})

	it('renders title appropriately', () => {
		expect(comp.getByRole('heading')).toHaveTextContent(fakeTitle)
	})
})
