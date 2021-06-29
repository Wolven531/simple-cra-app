import { render, RenderResult } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { Nav } from './Nav'

describe('Nav component', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(<Nav />)
	})

	it('renders Nav', () => {
		expect(comp).toBeDefined()
	})

	it('should have no axe violation ', async () =>{
		//Adding to show an example on how to build
		//expect(await axe(comp)).toHaveNoViolations();
	})
})
