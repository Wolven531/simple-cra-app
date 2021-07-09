import { render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC, useContext } from 'react'
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

	describe('update search input and press Enter', () => {
		beforeEach(() => {
			userEvent.type(
				comp.getByPlaceholderText('Username'),
				`${fakeUsername}{enter}`
			)
		})

		it('invokes api.pingUserSearchEndpoint() w/ the correct search value', async () => {
			expect(mockPingUserSearchEndpoint).toHaveBeenCalledTimes(1)
			expect(mockPingUserSearchEndpoint).toHaveBeenLastCalledWith(
				fakeUsername
			)
		})
	})

	describe('update search input and click search button', () => {
		beforeEach(() => {
			userEvent.type(comp.getByPlaceholderText('Username'), fakeUsername)
			userEvent.click(comp.getByRole('button'))
		})

		it('invokes api.pingUserSearchEndpoint() w/ the correct search value', async () => {
			expect(mockPingUserSearchEndpoint).toHaveBeenCalledTimes(1)
			expect(mockPingUserSearchEndpoint).toHaveBeenLastCalledWith(
				fakeUsername
			)
		})
	})
})
