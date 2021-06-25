import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App'
import reportWebVitals from './reportWebVitals'
import { theme } from './theme'

import '@fontsource/roboto'
import './index.css'

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			{/* CssBaseline provides consistent baseline to build upon */}
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
