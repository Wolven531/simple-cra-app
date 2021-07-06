import { Grid, Typography } from '@material-ui/core'
import React, { FC, useContext, useEffect } from 'react'
import { GlobalContext } from '../GlobalContext'
import PageNotFoundImage from './PageNotFound.jpg'
import './PageNotFoundPage.css'

const PageNotFoundPage: FC = () => {
	const context = useContext(GlobalContext)

	useEffect(() => {
		context.setTitle('Page Not Found')
	}, [context])

	return (
		<Grid
			alignItems="center"
			className="page-not-found"
			container
			justify="center"
		>
			<Grid item>
				<Typography
					align="center"
					color="error"
					gutterBottom
					variant="h5"
				>
					Page not found. How did you even get here?
				</Typography>
			</Grid>
			<img
				alt="pile of question marks"
				height="400"
				src={PageNotFoundImage}
				width="300"
			/>
		</Grid>
	)
}

export { PageNotFoundPage }
