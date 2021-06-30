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

		// !! must use keys as returned by server here, but can alias them as seen below
		const { name, profileIconId, summonerLevel } = response

		updateFunc({
			icon: profileIconId,
			level: summonerLevel,
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
			<Typography variant="h2" align="center" color="secondary">
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
			{/* display result of search; note the ID of icon will change to image when API updates */}
			<Container className="user-data-container">
					<Typography variant="h6" align="center" color="primary" gutterBottom>
						Icon: {result.icon}
					</Typography>
					<Typography variant="h6" align="center" color="primary" gutterBottom>
						Name: {result.name}
					</Typography>
					<Typography variant="h6" align="center" color="primary" gutterBottom>
						Level: {result.level}
					</Typography>
			</Container>
		</Container>
	)
}

export { SearchUsersPage }
