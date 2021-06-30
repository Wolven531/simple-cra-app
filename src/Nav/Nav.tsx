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
import React, { FC, MouseEvent, useState } from 'react'
import { AppTitleContextConsumer } from '../AppTitleContext'

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

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						aria-controls="menu-appbar"
						aria-haspopup="true"
						aria-label="menu"
						className={classes.menuButton}
						color="inherit"
						edge="start"
						onClick={(evt: any) => {
							handleMenuOpen(evt)
						}}
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
							<Link href="/" rel="noopener noreferrer">
								Home
							</Link>
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose()
							}}
						>
							<Link href="/config" rel="noopener noreferrer">
								Config
							</Link>
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose()
							}}
						>
							<Link href="/icons" rel="noopener noreferrer">
								Icon Demo
							</Link>
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose()
							}}
						>
							<Link
								href="/search-users"
								rel="noopener noreferrer"
							>
								Search Users
							</Link>
						</MenuItem>
					</Menu>
					<Typography
						variant="h4"
						component="h1"
						className={classes.title}
					>
						<AppTitleContextConsumer>
							{(context) => context.title}
						</AppTitleContextConsumer>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export { Nav }
