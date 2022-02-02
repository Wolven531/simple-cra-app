import { Container, Link, makeStyles, Theme } from '@material-ui/core'
import React, { FC } from 'react'
import { theme } from '../theme'
import { IChampDisplay } from '../types/IChampDisplay'
import { Link as RouterLink } from 'react-router-dom'

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

export const ChampDisplay: FC<ChampDisplayProps> = ({ champInfo: champ }) => {
	const classes = useStyles(theme)
	const imgUrl = `http://ddragon.leagueoflegends.com/cdn/${champ.version}/img/sprite/${champ.image.sprite}`

	const newTitle = champ.title[0]
		.toUpperCase()
		.concat(champ.title.substring(1))
	return (
		<Container className={classes.champDisplayContainer}>
			<Link
				component={RouterLink}
				to={`/champInfo/${champ.id}`}
				rel="noopener noreferrer"
				role="link"
			>
				<Container
					style={{
						width: 48,
						height: 48,
						backgroundPositionX: -champ.image.x,
						backgroundPositionY: -champ.image.y,
						backgroundImage: `url(${imgUrl})`,
						transform: 'scale(1.5) translate(0px, -10px)',
					}}
				>
					<div />
				</Container>
			</Link>
			<Container>{champ.name}</Container>
			<Container>{newTitle}</Container>
		</Container>
	)
}
