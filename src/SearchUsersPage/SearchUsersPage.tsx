import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { ApiService } from '../services/ApiService'
import './SearchUsersPage.css'

interface SearchUsersPageProps {
	api: ApiService
	initialSearchValue?: string
	userSearchFunc?: (
		searchKey: string,
		updateFunc: (updatedResult: any) => void
	) => Promise<void>
}

const SearchUsersPage: FC<SearchUsersPageProps> = ({
	api,
	initialSearchValue = '',
	userSearchFunc = async (
		searchKey: string,
		updateFunc: (updatedResult: any) => void
	) => {
		const response = await api.pingUserSearchEndpoint(searchKey)
		const { icon, level, name } = response

		updateFunc({
			icon,
			level,
			name,
		})
	},
}) => {
	const [result, setResult] = useState({
		icon: '',
		level: '',
		name: '',
	})
	const [searchValue, setSearchValue] = useState(initialSearchValue)

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
								userSearchFunc(searchValue, setResult)
							}
						}}
						placeholder="Username"
						value={searchValue}
					/>
				</Grid>
				<Grid item>
					<Button
						color="primary"
						onClick={() => {
							userSearchFunc(searchValue, setResult)
						}}
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
