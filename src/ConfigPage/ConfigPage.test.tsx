import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { ConfigPage } from './ConfigPage'

describe('ConfigPage component', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(<ConfigPage />)
	})

	it('renders ConfigPage component', () => {
		expect(comp).toBeDefined()
	})

// 	describe('click the health button while providing health check method', () => {
// 		let mockHealthCheck: jest.Mock

// 		beforeEach(() => {
// 			mockHealthCheck = jest.fn().mockResolvedValue(undefined)

// 			comp = render(
// 				<ConfigPage defaultFireHealthCheck={mockHealthCheck} />
// 			)

// 			const container = comp.container

// 			// method 1 - works
// 			// const healthButton = container.querySelector('.btn-health')
// 			// healthButton?.dispatchEvent(
// 			// 	new MouseEvent('click', {
// 			// 		bubbles: true,
// 			// 		cancelable: true,
// 			// 		view: window,
// 			// 	})
// 			// )

// 			// method 2 - works
// 			const healthButton = container.querySelector('.btn-health')
// 			fireEvent.click(healthButton as Element)

// 			// method 3
// 			// screen.getByRole('button', {

// 			// }).querySelector
// 		})

// 		it('invokes provided fireHealthCheck()', () => {
// 			expect(mockHealthCheck).toHaveBeenCalledTimes(1)
// 			// expect(mockHealthCheck).toHaveBeenLastCalledWith()
// 			// expect(healthButton?.textContent).toEqual('')

// 			// const buttons = comp.getAllByRole('button', { })

// 			// expect(buttons[0].classList.contains('btn-health')).toBeTruthy()
// 			// expect(buttons[1].classList.contains('btn-token')).toBeTruthy()
// 			// expect(buttons[2].classList.contains('btn-update-token')).toBeTruthy()
// 		})
// 	})

// 	describe('click the health button w/o health check method', () => {
// 		beforeEach(() => {
// 			const container = comp.container

// 			// method 2 - works
// 			const healthButton = container.querySelector('.btn-health')
// 			fireEvent.click(healthButton as Element)
// 		})

// 		it('invokes default fireHealthCheck()', () => {
// 			// TODO - add code to test default fireHealthCheck more thoroughly
// 			expect(true).toBeTruthy()
// 		})
// 	})

// 	// describe('click check token button', () => {
// 	// 	let buttonCheckToken: ShallowWrapper

// 	// 	beforeEach(() => {
// 	// 		buttonCheckToken = comp.find('.btn-token')

// 	// 		buttonCheckToken.simulate('click')
// 	// 	})

// 	// 	it('renders button properly, invokes pingTokenCheckEndpoint() on API w/ no params', () => {
// 	// 		expect(buttonCheckToken.text()).toEqual('Token valid?')

// 	// 		expect(mockApiService.pingTokenCheckEndpoint).toHaveBeenCalledTimes(1)
// 	// 		expect(mockApiService.pingTokenCheckEndpoint).toHaveBeenLastCalledWith()

// 	// 		expect(window.alert).toHaveBeenCalledTimes(1)
// 	// 	})
// 	// })

// 	// describe('click update token button w/o setting secret or token inputs', () => {
// 	// 	let buttonUpdateToken: ShallowWrapper

// 	// 	beforeEach(() => {
// 	// 		buttonUpdateToken = comp.find('.btn-update-token')

// 	// 		buttonUpdateToken.simulate('click')
// 	// 	})

// 	// 	it('shows alert and does NOT invoke API', () => {
// 	// 		expect(buttonUpdateToken.text()).toEqual('Update Token')

// 	// 		expect(mockApiService.pingTokenUpdateEndpoint).not.toHaveBeenCalled()

// 	// 		expect(window.alert).toHaveBeenCalledTimes(1)
// 	// 	})
// 	// })

// 	// describe('click update token button when using provided secret and token props for inputs', () => {
// 	// 	const fakeSecret = 'some-secret'
// 	// 	const fakeToken = 'some-token'
// 	// 	let buttonUpdateToken: ShallowWrapper
// 	// 	// let inputSecret: ShallowWrapper
// 	// 	// let inputToken: ShallowWrapper

// 	// 	beforeEach(() => {
// 	// 		comp = shallow(<ConfigPage api={mockApiService} defaultSecret={fakeSecret} defaultToken={fakeToken} />)

// 	// 		// const mockSetNewToken = jest.fn()
// 	// 		// const mockSetSecret = jest.fn()
// 	// 		// jest.spyOn(React, 'useState')
// 	// 		// 	.mockImplementationOnce((defaultNewToken: string) => [defaultNewToken, mockSetNewToken])
// 	// 		// 	.mockImplementationOnce((defaultSecret: string) => [defaultSecret, mockSetSecret])

// 	// 		buttonUpdateToken = comp.find('.btn-update-token')
// 	// 		// inputSecret = comp.find('.input-secret')
// 	// 		// inputToken = comp.find('.input-new-token')

// 	// 		// inputSecret.simulate('change', { target: { value: fakeSecret } })
// 	// 		// inputToken.simulate('change', { target: { value: fakeToken } })

// 	// 		buttonUpdateToken.simulate('click')
// 	// 	})

// 	// 	it('renders button properly, invokes pingTokenUpdateEndpoint() on API w/ proper params', () => {
// 	// 		expect(buttonUpdateToken.text()).toEqual('Update Token')

// 	// 		expect(mockApiService.pingTokenUpdateEndpoint).toHaveBeenCalledTimes(1)
// 	// 		expect(mockApiService.pingTokenUpdateEndpoint).toHaveBeenCalledWith(fakeSecret, fakeToken)

// 	// 		expect(window.alert).toHaveBeenCalledTimes(1)
// 	// 	})
// 	// })
})
