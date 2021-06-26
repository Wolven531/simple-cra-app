import { Container, Typography } from "@material-ui/core"
import './Footer.css'

function Footer() {
	return (
		<Container className="footer">
			<Typography variant="body2" align="center" gutterBottom>
				Anthony Williams, Vincent Leighton, Jonathan Stutson
				<br />© 2021, Most rights reserved
			</Typography>
		</Container>
	)
}

export { Footer }
