import { Grid } from '@material-ui/core'
import React, { FC } from 'react'
import PageNotFoundImage from './PageNotFound.jpg'

const PageNotFoundPage: FC = () => {
	return (
		<Grid container alignItems="center" justify="center">
			<Grid item>
				<h3>Page not found. How did you even get here?</h3>
			</Grid>
			<img src={PageNotFoundImage} width="300" height="400" alt="" />
		</Grid>
	)
}

export { PageNotFoundPage }
