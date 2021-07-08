import { render, RenderResult } from '@testing-library/react'
import { LoadingModal } from './LoadingModal'

describe('LoadingModal component', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(<LoadingModal />)
	})

	it('renders w/o problems', () => {
		expect(comp).toBeDefined()
	})
})
