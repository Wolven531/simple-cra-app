import React from 'react'
import './App.css'

const ENV_API_URL = process.env.API_URL

function App() {
	return (
		<div className="">
			<header className="">
				<h2>Simple CRA App</h2>
			</header>
			<p>Welcome to Anthony and Vinny's Simple CRA App™!</p>
			<p>This web app is connected to the following API</p>
			<input readOnly value={ENV_API_URL} />
		</div>
	)
}

export default App
