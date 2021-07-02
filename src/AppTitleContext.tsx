import React, { createContext, FC, useState } from 'react'

const context = createContext({
	setTitle: (newTitle: string) => {
		alert('using default function to set title, WONT WORK')
	},
	title: 'Default Title From Creation',
})
const AppTitleContextConsumer = context.Consumer

const AppTitleContextProvider: FC<any> = (props: any) => {
	const [title, setTitle] = useState('Default Title From useState')

	return <context.Provider value={{ title, setTitle }}>{props.children}</context.Provider>
}

export {
	context as AppTitleContext,
	AppTitleContextProvider,
	AppTitleContextConsumer,
}
