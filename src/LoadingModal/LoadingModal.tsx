import {
	CircularProgress,
	Container,
	makeStyles,
	Modal,
} from '@material-ui/core'
import { FC } from 'react'
import './LoadingModal.css'

const useStyles = makeStyles({
	container: {
		alignItems: 'center',
		display: 'flex',
		height: '100vh',
		justifyContent: 'center',
		width: '100vw',
	},
})

const LoadingModal: FC = () => {
	const classes = useStyles()

	return (
		<Modal open>
			<Container className={classes.container}>
				<CircularProgress color="primary" size={100} />
			</Container>
		</Modal>
	)
}

export { LoadingModal }
