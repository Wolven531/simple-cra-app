import React, { createContext, FC, useState } from 'react'

const { Provider, Consumer } = createContext({
	setTitle: (newTitle: string) => {
		alert('using default function to set title, WONT WORK')
	},
	title: 'Default Title From Creation',
})

const AppTitleContextProvider: FC<any> = (props: any) => {
	const [title, setTitle] = useState('Default Title From useState')

	return <Provider value={{ title, setTitle }}>{props.children}</Provider>
}

export { AppTitleContextProvider, Consumer as AppTitleContextConsumer }
