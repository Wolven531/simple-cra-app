import { Button, Container, Grid, Typography } from '@material-ui/core'
import React, { Component, ContextType, CSSProperties } from 'react'
import { GlobalContext } from '../GlobalContext'
import { theme } from '../theme'

interface SearchUsersPageCProps {
	
}

interface SearchUsersPageCState {
	hasSearched: boolean
	icon: string
	level: string
	name: string
	searchValue: string
}

class SearchUsersPageC extends Component<SearchUsersPageCProps, SearchUsersPageCState> {
// 	static contextType = GlobalContext

// 	// uses experimental public fields - limited to a single context type
// 	declare context: ContextType<typeof GlobalContext>

// 	private rowStyle: CSSProperties = {
// 		alignSelf: 'stretch',
// 		border: '1px solid',
// 		borderCollapse: 'collapse',
// 		borderColor: theme.palette.primary.main,
// 		display: 'flex',
// 		justifyContent: 'space-between',
// 		marginBottom: theme.spacing(3),
// 	}

// 	constructor(props: SearchUsersPageCProps) {
// 		super(props)
// 		this.state = {
// 			hasSearched: false,
// 			icon: '',
// 			level: '',
// 			name: '',
// 			searchValue: '',
// 		}
// 	}

	render() {
		return null
// 		return (
// 			<Container className="search-users-page">
// 				<Typography
// 					align="center"
// 					color="secondary"
// 					gutterBottom
// 					variant="h4"
// 				>
// 					Note - search function limited to exact name result
// 				</Typography>
// 				<Grid
// 					alignItems="center"
// 					className="api-container"
// 					container
// 					justify="center"
// 				>
// 					<Grid item>
// 						<input
// 							onChange={(e) => {
// 								this.setState({ searchValue: e.target.value })
// 							}}
// 							onKeyPress={(e) => {
// 								if (e.key !== 'Enter') {
// 									return
// 								}
// 								this.userSearchFunc()
// 							}}
// 							placeholder="Username"
// 							value={this.state.searchValue}
// 						/>
// 					</Grid>
// 					<Grid item>
// 						<Button
// 							color="primary"
// 							onClick={() => {
// 								this.userSearchFunc()
// 							}}
// 							variant="contained"
// 						>
// 							Search
// 						</Button>
// 					</Grid>
// 				</Grid>
// 				{/* display result if search has been made ; note the ID of icon will change to image when API updates */}
// 				{this.state.hasSearched && (
// 					<Container className="user-data-container">
// 						<Typography
// 							align="center"
// 							color="primary"
// 							gutterBottom
// 							variant="h5"
// 						>
// 							Results
// 						</Typography>

// 						<Container style={this.rowStyle}>
// 							<Typography
// 								align="left"
// 								color="primary"
// 								variant="h6"
// 							>
// 								Icon:
// 							</Typography>
// 							<Typography
// 								align="right"
// 								color="secondary"
// 								variant="h6"
// 							>
// 								{this.state.icon}
// 							</Typography>
// 						</Container>
// 						<Container style={this.rowStyle}>
// 							<Typography
// 								align="left"
// 								color="primary"
// 								variant="h6"
// 							>
// 								Name:
// 							</Typography>
// 							<Typography
// 								align="right"
// 								color="secondary"
// 								variant="h6"
// 							>
// 								{this.state.name}
// 							</Typography>
// 						</Container>
// 						<Container style={this.rowStyle}>
// 							<Typography
// 								align="left"
// 								color="primary"
// 								variant="h6"
// 							>
// 								Level:
// 							</Typography>
// 							<Typography
// 								align="right"
// 								color="secondary"
// 								variant="h6"
// 							>
// 								{this.state.level}
// 							</Typography>
// 						</Container>
// 					</Container>
// 				)}
// 			</Container>
// 		)
	}

// 	private async userSearchFunc(): Promise<void> {
// 		const response = await this.context.api.pingUserSearchEndpoint(
// 			this.state.searchValue
// 		)

// 		// !! must use keys as returned by server here, but can alias them as seen below
// 		const { name, profileIconId, summonerLevel } = response

// 		this.setState({
// 			hasSearched: true,
// 			icon: profileIconId,
// 			level: summonerLevel,
// 			name,
// 		})
// 	}
}

export { SearchUsersPageC }
