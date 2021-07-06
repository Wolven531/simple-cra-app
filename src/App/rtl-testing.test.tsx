import { Button, Container, Typography } from '@material-ui/core'
import { StateMock } from '@react-mock/state'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React, { Component, FC, useState } from 'react'

interface HelloMessageProps {
	name: string
}
interface StatefulCounterProps {
	count?: number
}
interface StatefulCounterState {
	count: number
}

const HelloMessage: FC<HelloMessageProps> = ({ name }) => {
	return <Typography>hello {name}</Typography>
}

class StatefulCounter extends Component<
	StatefulCounterProps,
	StatefulCounterState
> {
	constructor(props: StatefulCounterProps) {
		super(props)
		this.state = {
			count: !isNaN(props.count as number) ? (props.count as number) : 0,
		}
	}

	increment() {
		this.setState((oldState) => ({ count: oldState.count + 1 }))
	}

	render() {
		return (
			<Container>
				<Typography>Clicked {this.state.count} times </Typography>
				<Button
					onClick={() => {
						this.increment()
					}}
				>
					+1
				</Button>
			</Container>
		)
	}
}

const StatefulCounterF: FC<StatefulCounterProps> = (props) => {
	const [internalCount, setInternalCount] = useState<number>(
		!isNaN(props.count as number) ? (props.count as number) : 0
	)

	const increment = () => {
		setInternalCount(internalCount + 1)
	}

	return (
		<Container>
			<Typography>Clicked {internalCount} times </Typography>
			<Button
				onClick={() => {
					increment()
				}}
			>
				+1
			</Button>
		</Container>
	)
}

// hoist helper functions (but not vars) to reuse between test cases

// <StateMock> can ONLY be used on class components, otherwise causes this error -
// "Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
const renderComponent = ({ count }: StatefulCounterState) =>
	render(
		<StateMock state={{ count }}>
			<StatefulCounter />
		</StateMock>
	)

// simple render test

it('renders personalized greeting', async () => {
	// Render new instance in every test to prevent leaking state
	const { getByText } = render(<HelloMessage name="Satoshi" />)

	await waitFor(() => getByText(/hello Satoshi/i))
})

// callback test

it('calls "onClick" prop on button click', () => {
	// Render new instance in every test to prevent leaking state
	const onClick = jest.fn()
	const { getByText } = render(
		<Button onClick={onClick}>cLiCk mE NaO</Button>
	)

	fireEvent.click(getByText(/click me nao/i))
	expect(onClick).toHaveBeenCalled()
})

// stateful tests

it('renders initial count', async () => {
	// Render new instance in every test to prevent leaking state
	const { getByText } = renderComponent({ count: 5 })

	await waitFor(() => getByText(/clicked 5 times/i))
})

it('increments count', async () => {
	// Render new instance in every test to prevent leaking state
	const { getByText } = renderComponent({ count: 5 })

	fireEvent.click(getByText('+1'))

	await waitFor(() => getByText(/clicked 6 times/i))
})
