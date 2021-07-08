import { render, RenderResult } from '@testing-library/react'
import { FC, useContext } from 'react'
import { GlobalContext } from './src/GlobalContext'
import { ApiService } from './src/services/ApiService'

/**
 * This method allows us to mock parts of the GlobalContext w/ ease
 *
 * @param functionalComp
 * @param mockedContext
 * @returns
 */
const renderCompWithMockedContext = (
	functionalComp: FC,
	mockedContext: any
): RenderResult => {
	const MockedContextProvider: FC = () => {
		const context = useContext(GlobalContext)

		if (mockedContext.api) {
			context.api = mockedContext.api as unknown as ApiService
		}
		if (mockedContext.setApi) {
			context.setApi = mockedContext.setApi
		}
		if (mockedContext.title) {
			context.title = mockedContext.title
		}
		if (mockedContext.setTitle) {
			context.setTitle = mockedContext.setTitle
		}

		// render the Functional Component provided to us
		return functionalComp({})
	}

	// render the context-enabled wrapper
	return render(<MockedContextProvider />)
}

/**
 * This method allows us to mock parts of the GlobalContext w/ ease
 *
 * @param elem
 * @param mockedContext
 * @returns
 */
const renderElemWithMockedContext = (
	elem: JSX.Element | Element,
	mockedContext: any
): RenderResult => {
	const MockedContextProvider: FC = () => {
		const context = useContext(GlobalContext)

		if (mockedContext.api) {
			context.api = mockedContext.api as unknown as ApiService
		}
		if (mockedContext.setApi) {
			context.setApi = mockedContext.setApi
		}
		if (mockedContext.title) {
			context.title = mockedContext.title
		}
		if (mockedContext.setTitle) {
			context.setTitle = mockedContext.setTitle
		}

		// if simple Element, need to wrap in JSX tags;
		// otherwise, elem is a JSX Element so just return it
		return elem instanceof Element ? <>{elem}</> : elem
	}

	// render the context-enabled wrapper
	return render(<MockedContextProvider />)
}

export { renderCompWithMockedContext, renderElemWithMockedContext }
