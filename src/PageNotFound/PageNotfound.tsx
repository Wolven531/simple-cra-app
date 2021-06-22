import { Container, Grid } from '@material-ui/core'
import React from 'react'
import  PNFImage from '../Media/PageNotFoundImage.jpg'

interface Props {}

function PageNotfound() {
	return (
		<Grid container alignItems="center" justify="center">
			<Grid item>
				<h3>Page not found. How did you even get here?</h3>
			</Grid>
            <img src={PNFImage} width='300' height='400'/>
		</Grid>
	)
}

export default PageNotfound
