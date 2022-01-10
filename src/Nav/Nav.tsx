import {
	AppBar,
	IconButton,
	Link,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { FC, MouseEvent, useContext, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
}))

const Nav: FC = () => {
	const classes = useStyles()
	const [anchorElem, setAnchorElem] = useState<HTMLElement | null>(null)
	const [menuIsOpen, setMenuIsOpen] = useState(false)

	const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
		setMenuIsOpen(true)
		setAnchorElem(event.currentTarget)
	}

	const handleClose = () => {
		setMenuIsOpen(false)
		setAnchorElem(null)
	}

	const { title } = useContext(GlobalContext)

	return (
		<AppBar position="static" className={classes.root} role="menubar">
			<Toolbar>
				<IconButton
					aria-controls="menu-appbar"
					aria-haspopup="true"
					aria-label="menu"
					className={classes.menuButton}
					color="inherit"
					edge="start"
					onClick={(evt) => {
						handleMenuOpen(evt)
					}}
					role="menuitem"
				>
					<MenuIcon />
				</IconButton>
				<Menu
					anchorEl={anchorElem}
					anchorOrigin={{
						horizontal: 'right',
						vertical: 'top',
					}}
					id="menu-appbar"
					keepMounted
					onClose={() => {
						handleClose()
					}}
					open={menuIsOpen}
					role="menuitem"
					transformOrigin={{
						horizontal: 'right',
						vertical: 'top',
					}}
				>
					<MenuItem
						onClick={() => {
							handleClose()
						}}
					>
						<Link
							component={RouterLink}
							to="/"
							rel="noopener noreferrer"
							role="link"
						>
							Home
						</Link>
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose()
						}}
					>
						<Link
							component={RouterLink}
							to="/config"
							rel="noopener noreferrer"
							role="link"
						>
							Config
						</Link>
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose()
						}}
					>
						<Link
							component={RouterLink}
							to="/icons"
							rel="noopener noreferrer"
							role="link"
						>
							Icon Demo
						</Link>
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose()
						}}
					>
						<Link
							component={RouterLink}
							to="/search"
							rel="noopener noreferrer"
							role="link"
						>
							Search Users
						</Link>
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose()
						}}
					>
						<Link
							component={RouterLink}
							to="/users"
							rel="noopener noreferrer"
							role="link"
						>
							All Users
						</Link>
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose()
						}}
					>
						<Link
							component={RouterLink}
							to="/compare"
							rel="noopener noreferrer"
							role="link"
						>
							Compare Users
						</Link>
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose()
						}}
					>
						<Link
							component={RouterLink}
							to="/champs"
							rel="noopener noreferrer"
							role="link"
						>
							Champions
						</Link>
					</MenuItem>
				</Menu>
				<Typography
					aria-roledescription="title of page"
					className={classes.title}
					role="heading"
					variant="h4"
					component="h1"
				>
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export { Nav }
