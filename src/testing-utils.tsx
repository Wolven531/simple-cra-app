import { render } from '@testing-library/react'
import { FC, useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import { ApiService } from './services/ApiService'

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
) => {
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
 * @param element
 * @param mockedContext
 * @returns
 */
const renderElemWithMockedContext = (
	functionalComp: JSX.Element,
	mockedContext: any
) => {
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

		// render the Element provided to us
		return functionalComp
	}

	// render the context-enabled wrapper
	return render(<MockedContextProvider />)
}

export { renderCompWithMockedContext, renderElemWithMockedContext }
