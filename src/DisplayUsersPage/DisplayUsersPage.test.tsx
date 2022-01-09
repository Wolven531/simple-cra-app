import { RenderResult } from '@testing-library/react'
import { renderCompWithMockedContext } from '../../testing-utils'
import { DisplayUsersPage } from './DisplayUsersPage'

describe('DisplayUsersPage component', () => {
	const fakeIconId = '65478'
	const fakeLevel = '36'
	const fakeUsername = 'someUserName'

	let comp: RenderResult
	let mockPingGetUsersEndpoint: jest.Mock
	let mockSetTitle: jest.Mock

	beforeEach((done) => {
		mockSetTitle = jest.fn()
		mockPingGetUsersEndpoint = jest.fn().mockResolvedValue([
			{
				name: fakeUsername,
				profileIconId: fakeIconId,
				summonerLevel: fakeLevel,
				lastUpdated: new Date(1, 1, 2022),
			},
		])

		comp = renderCompWithMockedContext(DisplayUsersPage, {
			api: {
				pingGetUsersEndpoint: mockPingGetUsersEndpoint,
			},
			setTitle: mockSetTitle,
		})
		done()
	})

	it('renders DisplayUsersPage', () => {
		expect(comp).toBeDefined()
	})

	it('invokes api.pingGetUsersEndpoint()', () => {
		expect(mockPingGetUsersEndpoint).toHaveBeenCalledTimes(1)
	})

	it('invokes GlobalContext.setTitle()', () => {
		expect(mockSetTitle).toHaveBeenCalledTimes(1)
	})
})
