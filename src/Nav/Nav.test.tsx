import React from 'react'
// import { render, screen } from '@testing-library/react'
import { render, RenderResult } from '@testing-library/react'
import { Nav } from './Nav'

describe('Nav component', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(<Nav />)
	})

	it('renders Nav', () => {
		expect(comp).toBeDefined()
	})
})
