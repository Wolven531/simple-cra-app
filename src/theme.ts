import { blue, green, grey, red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		background: {
			default: grey.A400,
		},
		error: {
			main: red.A400,
		},
		primary: {
			main: green.A400,
		},
		secondary: {
			main: blue.A400,
		},
		text: {
			primary: green.A400,
			secondary: blue.A400,
		},
	},
	typography: {
		body1: {
			color: green.A400,
		},
		body2: {
			color: grey.A400,
		},
	},
})

export { theme }

