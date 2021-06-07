import React from 'react'
import Grid from '@material-ui/core/Grid'
import { IconDemo } from './IconDemo'
import './App.css'

const ENV_API_URL = process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

function App() {
	return (
		<Grid container className="app">
			<Grid item xs={12}>
				<h2>Simple CRA App</h2>
			</Grid>
			<Grid item xs={12}>
				<p>Welcome to Anthony and Vinny's Simple CRA App®!</p>
			</Grid>
			<Grid item xs={12}>
				API - <input disabled readOnly value={ENV_API_URL}  />
			</Grid>
			<Grid item xs={12}>
				<IconDemo/>
			</Grid>
		</Grid>
	)
}

export default App
