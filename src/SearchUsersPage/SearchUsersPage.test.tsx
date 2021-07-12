import { act, RenderResult, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderCompWithMockedContext } from '../../testing-utils'
import { SearchUsersPage } from './SearchUsersPage'

describe('SearchUsersPage component', () => {
	const fakeIconId = '65478'
	const fakeLevel = '36'
	const fakeUsername = 'someUserName'

	let comp: RenderResult
	let mockPingUserSearchEndpoint: jest.Mock
	let mockSetTitle: jest.Mock

	// !!! hides warning due to multiple state updates inside MockedContextProvider
	// !!! cannot seem to resolve error (even w/ act()), but tests pass; error below
	/*
	Warning: An update to MockedContextProvider inside a test was not wrapped in act(...).
	When testing, code that causes React state updates should be wrapped into act(...):
	*/
	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(jest.fn())
	})

	beforeEach((done) => {
		mockSetTitle = jest.fn()
		mockPingUserSearchEndpoint = jest.fn().mockResolvedValue({
			name: fakeUsername,
			profileIconId: fakeIconId,
			summonerLevel: fakeLevel,
		})

		act(() => {
			comp = renderCompWithMockedContext(SearchUsersPage, {
				api: {
					pingUserSearchEndpoint: mockPingUserSearchEndpoint,
				},
				setTitle: mockSetTitle,
			})
			done()
		})
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
			// !!! using act() here breaks the events
			// act(() => {
			userEvent.type(
				comp.getByPlaceholderText('Username'),
				`${fakeUsername}{enter}`
			)
			// })
		})

		it('invokes api.pingUserSearchEndpoint() w/ the correct search value', async () => {
			expect(mockPingUserSearchEndpoint).toHaveBeenCalledTimes(1)
			expect(mockPingUserSearchEndpoint).toHaveBeenLastCalledWith(
				fakeUsername,
				expect.any(Function)
			)

			await waitFor(() =>
				expect(comp.getByText('Results')).toBeInTheDocument()
			)
			// waitFor(() =>
			// 	expect(comp.getByText('Results')).toBeInTheDocument()
			// ).then(() => {
			// 	done()
			// })
		})
	})

	describe('update search input and click search button', () => {
		beforeEach(() => {
			// !!! using act() here breaks the events
			// act(() => {
			userEvent.type(comp.getByPlaceholderText('Username'), fakeUsername)
			userEvent.click(comp.getByRole('button'))
			// })
		})

		it('invokes api.pingUserSearchEndpoint() w/ the correct search value', async () => {
			expect(mockPingUserSearchEndpoint).toHaveBeenCalledTimes(1)
			expect(mockPingUserSearchEndpoint).toHaveBeenLastCalledWith(
				fakeUsername,
				expect.any(Function)
			)

			await waitFor(() =>
				expect(comp.getByText('Results')).toBeInTheDocument()
			)
			// waitFor(() =>
			// 	expect(comp.getByText('Results')).toBeInTheDocument()
			// ).then(() => {
			// 	done()
			// })
		})
	})
})
