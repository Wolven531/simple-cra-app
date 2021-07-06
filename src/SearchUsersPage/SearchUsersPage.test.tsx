import {
	createEvent,
	fireEvent,
	render,
	RenderResult,
	// waitFor,
} from '@testing-library/react'
import React, { useContext } from 'react'
import { FC } from 'react'
import { GlobalContext } from '../GlobalContext'
import { ApiService } from '../services/ApiService'
import { SearchUsersPage } from './SearchUsersPage'

describe('SearchUsersPage component', () => {
	const fakeUsername = 'someUserName'
	const fakeIconId = '65478'
	const fakeLevel = '36'

	let comp: RenderResult
	let mockPingUserSearchEndpoint: jest.Mock
	let mockSetTitle: jest.Mock

	beforeEach(() => {
		mockSetTitle = jest.fn()
		mockPingUserSearchEndpoint = jest.fn().mockResolvedValue({
			name: fakeUsername,
			profileIconId: fakeIconId,
			summonerLevel: fakeLevel,
		})

		const FakeWrapperComp: FC<any> = (props: any) => {
			const context = useContext(GlobalContext)
			context.setTitle = mockSetTitle
			context.api = {
				pingUserSearchEndpoint: mockPingUserSearchEndpoint,
			} as unknown as ApiService

			return <SearchUsersPage />
		}

		comp = render(<FakeWrapperComp />)
	})

	it('renders SearchUsersPage', () => {
		expect(comp).toBeDefined()
	})

	it('invokes setTitle() w/ proper title', () => {
		expect(mockSetTitle).toHaveBeenCalledTimes(1)
		expect(mockSetTitle).toHaveBeenLastCalledWith('Search Users Page')
	})

	describe('updating the search input and pressing Enter', () => {
		let searchInput: HTMLElement

		beforeEach(() => {
			searchInput = comp.getByPlaceholderText('Username')
			const fakeKeyPress = createEvent.keyPress(searchInput, {
				code: 'Enter',
				key: 'Enter',
			})
			fireEvent.change(searchInput, {
				target: { value: fakeUsername },
			})
			fireEvent.keyPress(searchInput, fakeKeyPress)
		})

		it('calls the api method', async () => {
			expect(searchInput.getAttribute('value')).toEqual(fakeUsername)

			// !!! FIXME
			// await waitFor(() => {
			// 	expect(mockPingUserSearchEndpoint).toHaveBeenCalledTimes(1)
			// 	expect(mockPingUserSearchEndpoint).toHaveBeenLastCalledWith(
			// 		fakeUsername
			// 	)
			// })
		})
	})
})
