import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import { SearchUsersPage } from './SearchUsersPage'

describe('SearchUsersPage component', () => {
	it('renders SearchUsersPage', () => {
		const comp = render(<SearchUsersPage />)

		expect(comp).toBeDefined()
	})
})
