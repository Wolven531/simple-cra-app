import React from 'react'
import {
	makeStyles,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	MenuItem,
	Menu,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from '@material-ui/core'
import { AppTitleContext } from '../AppTitleContext'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

function Nav() {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleMenu = (event: any) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={open}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>
							<Link href="/" rel="noopener noreferrer">
								Home
							</Link>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Link href="/config" rel="noopener noreferrer">
								Config
							</Link>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Link href="/icons" rel="noopener noreferrer">
								Icon Demo
							</Link>
						</MenuItem>
					</Menu>
					<Typography variant="h6" className={classes.title}>
						<AppTitleContext.Consumer>
							{/* This is not updating when config should be setting the title */}
							{({ title }) => {
								return title
							}}
						</AppTitleContext.Consumer>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export { Nav }
