import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { ApiService } from '../services/ApiService'
import './SearchUsersPage.css'

interface SearchUsersPageProps {
	api: ApiService
	initialSearchValue?: string
}

const SearchUsersPage: FC<SearchUsersPageProps> = ({
	api,
	initialSearchValue = '',
}) => {
	const [result, setResult] = useState({
		icon: '',
		level: '',
		name: '',
	})
	const [searchValue, setSearchValue] = useState(initialSearchValue)

	const fireUserSearch = async () => {
		const response = await api.pingUserSearchEndpoint(searchValue)
		const { icon, level, name } = response

		setResult({
			icon,
			level,
			name,
		})
	}

	return (
		<Container className="config-page">
			<Typography variant="h2" align="center">
				Note, search function is limited to single exact name result for
				now.
			</Typography>
			<Grid
				alignItems="center"
				className="api-container"
				container
				justify="center"
			>
				<Grid item>
					<input
						onChange={(e) => {
							setSearchValue(e.target.value)
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								fireUserSearch()
							}
						}}
						placeholder="Username"
						value={searchValue}
					/>
				</Grid>
				<Grid item>
					<Button
						color="primary"
						onClick={fireUserSearch}
						variant="contained"
					>
						Search
					</Button>
				</Grid>
			</Grid>
			{/* Display searched user data. Icon(ID will change to image whe API updated)/Name/Level */}
			<Container className="user-data-container">
				<Box className="display-data" display="inline" border={1}>
					{result.icon}
				</Box>
				<Box className="display-data" display="inline" border={1}>
					{result.name}
				</Box>
				<Box className="display-data" display="inline" border={1}>
					{result.level}
				</Box>
			</Container>
		</Container>
	)
}

export { SearchUsersPage }
