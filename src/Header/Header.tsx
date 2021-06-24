import { Container, Typography } from '@material-ui/core'
import { Nav } from '../Nav/Nav'

function Header() {

	return (
		<Container className="header">
			<Typography variant="h4" align="center" color="primary" gutterBottom>
				NextGen League Compare
			</Typography>
			<Nav />
		</Container>
	)
}

export default Header
