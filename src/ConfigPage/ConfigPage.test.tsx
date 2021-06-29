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

	describe('click the health button while providing health check method', () => {
		let mockHealthCheck: jest.Mock

		beforeEach(() => {
			mockHealthCheck = jest.fn().mockResolvedValue(undefined)

			comp = render(
				<ConfigPage defaultFireHealthCheck={mockHealthCheck} />
			)

			const container = comp.container

			// method 1 - works
			// const healthButton = container.querySelector('.btn-health')
			// healthButton?.dispatchEvent(
			// 	new MouseEvent('click', {
			// 		bubbles: true,
			// 		cancelable: true,
			// 		view: window,
			// 	})
			// )

			// method 2 - works
			const healthButton = container.querySelector('.btn-health')
			fireEvent.click(healthButton as Element)

			// method 3
			// screen.getByRole('button', {

			// }).querySelector
		})

		it('invokes provided fireHealthCheck()', () => {
			expect(mockHealthCheck).toHaveBeenCalledTimes(1)
			// expect(mockHealthCheck).toHaveBeenLastCalledWith()
			// expect(healthButton?.textContent).toEqual('')

			// const buttons = comp.getAllByRole('button', { })

			// expect(buttons[0].classList.contains('btn-health')).toBeTruthy()
			// expect(buttons[1].classList.contains('btn-token')).toBeTruthy()
			// expect(buttons[2].classList.contains('btn-update-token')).toBeTruthy()
		})
	})

	describe('click the health button w/o health check method', () => {
		beforeEach(() => {
			const container = comp.container

			// method 2 - works
			const healthButton = container.querySelector('.btn-health')
			fireEvent.click(healthButton as Element)
		})

		it('invokes default fireHealthCheck()', () => {
			// TODO - add code to test default fireHealthCheck more thoroughly
			expect(true).toBeTruthy()
		})
	})
})
