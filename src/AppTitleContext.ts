import React from 'react'

let Title = 'NextGen League Compare'

export const AppTitleDefaultValue = {
	title: Title,
	setTitle: (e: string) => {
		Title = e
	},
}

export const AppTitleContext = React.createContext(AppTitleDefaultValue)
