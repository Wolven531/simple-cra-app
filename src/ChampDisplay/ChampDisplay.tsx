import { Container, makeStyles, Theme } from '@material-ui/core'
import React, { FC } from 'react'
import { theme } from '../theme'
import { IChampDisplay } from '../types/IChampDisplay'

interface ChampDisplayProps {
	champInfo: IChampDisplay
}

const useStyles = makeStyles({
	champDisplayContainer: (theme: Theme) => ({
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		justifyContent: 'center',
		marginTop: theme.spacing(3),
		color: 'white',
	}),
})

export const ChampDisplay: FC<ChampDisplayProps> = ({ champInfo }) => {
	const classes = useStyles(theme)
	const newTitle = champInfo.title[0]
		.toUpperCase()
		.concat(champInfo.title.substring(1))
	return (
		<Container className={classes.champDisplayContainer}>
			<Container>{champInfo.name}</Container>
			<Container>{newTitle}</Container>
		</Container>
	)
}
