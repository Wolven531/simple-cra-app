import { Container, Typography } from '@material-ui/core'
import { FC, useContext, useEffect } from 'react'
import { AppTitleContext } from '../AppTitleContext'

const HomePage: FC = () => {
	const context = useContext(AppTitleContext)

	useEffect(() => {
		context.setTitle('Home')
	}, [context])

	return (
		<Container>
			<Typography variant="body1" align="center" gutterBottom>
				Welcome to our next generation League compare app!
			</Typography>
		</Container>
	)
}

export { HomePage }

