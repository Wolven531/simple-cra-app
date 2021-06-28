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
import { AppTitleContext } from '../AppTitleContext'

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
							vertical: 'top',
							horizontal: 'right',
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
