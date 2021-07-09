import { Container, Typography } from "@material-ui/core"
import './Footer.css'

function Footer() {
	return (
		<Container className="footer" style={{ marginTop: '1rem' }}>
			<Typography variant="body2" align="center" style={{ color: '#aaa' }} gutterBottom>
				Anthony Williams, Vincent Leighton, Jonathan Stutson
				<br />© 2021, Most rights reserved
			</Typography>
		</Container>
	)
}

export { Footer }
