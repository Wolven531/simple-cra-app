import { Box, CircularProgress, Modal } from '@material-ui/core'

function LoadingModal() {
	return (
		<Modal open>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100%"
			>
				<CircularProgress color="secondary" size="300px" />
			</Box>
		</Modal>
	)
}

export {LoadingModal}
