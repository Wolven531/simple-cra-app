import React from 'react'
import { IconDemo } from './IconDemo'
import './App.css'

const ENV_API_URL = process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

function App() {
	return (
		<div className="app">
			<header>
				<h2>Simple CRA App</h2>
			</header>
			<p>Welcome to Anthony and Vinny's Simple CRA App®!</p>
			API - <input disabled readOnly value={ENV_API_URL} style={{ width: '300px' }} />
			<br/>
			<IconDemo/>
		</div>
	)
}

export default App
