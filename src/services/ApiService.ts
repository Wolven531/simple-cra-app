import {
	HEADERS_JSON_CONTENT,
	HTTP_GET,
	HTTP_POST,
	NO_CACHE,
} from '../constants'

export interface GetUsersEndpointResult {
	accountId: string
	lastUpdated: number
	masteryTotal: number
	name: string
	summonerId: string
}
/**
 * This service encapsulates API communication in a centralized location
 */
class ApiService {
	private _apiUrl: string

	/**
	 * The base URL of the API that this service uses when it makes HTTP requests
	 */
	get apiUrl(): string {
		return this._apiUrl
	}
	set apiUrl(newUrl: string) {
		this._apiUrl = newUrl
	}

	/**
	 * Create a new instance of the ApiService w/ optional API URL
	 *
	 * @param apiUrl Base URL of the API for this service to use
	 */
	constructor(apiUrl: string | undefined = '') {
		this._apiUrl = apiUrl
	}

	/**
	 * Use the fetch API over HTTP to hit the API health endpoint on the server
	 *
	 * @returns Promise that resolves to server message if successful; otherwise, Promise that resolves to empty string
	 */
	pingApiHealthEndpoint(): Promise<string> {
		return fetch(`${this._apiUrl}/health`, {
			cache: NO_CACHE,
			method: HTTP_GET,
		})
			.then((resp) => resp.text())
			.then((text) => text)
			.catch((err) => {
				this.handleError(err)

				return Promise.resolve('')
			})
	}

	/**
	 * Use the fetch API over HTTP to hit user search endpoint on the server
	 *
	 * @param searchKey string sent to the API for search
	 * @param handleErr optional function that accepts an error as its only parameter; called when an error occurs
	 * @returns Promise that resolves to user object if successful; otherwise, Promise that resolves to empty object
	 */
	pingUserSearchEndpoint(
		searchKey: string,
		handleErr?: Function
	): Promise<any> {
		return fetch(`${this._apiUrl}/user/search?searchKey=${searchKey}`, {
			cache: NO_CACHE,
			method: HTTP_GET,
		})
			.then((resp) => resp.json())
			.then((obj) => obj)
			.catch((err) => {
				// if an error handler was provided, use it
				if (handleErr !== undefined) {
					handleErr(err)
					return Promise.resolve({})
				}

				this.handleError(err)

				return Promise.resolve({})
			})
	}

	/**
	 * Use the fetch API over HTTP to hit mastery total endpoint on the server
	 *
	 * @returns Promise that resolves to json; otherwise, Promise that resolves to empty object
	 */
	 pingMasteryTotalEndpoint(summonerId: string, withUser: boolean): Promise<any> {
		return fetch(`${this._apiUrl}/mastery/total/${summonerId}?withUser=${withUser}`, {
			cache: NO_CACHE,
			method: HTTP_GET,
		})
			.then((resp) => resp.json())
			.then((obj) => obj)
			.catch((err) => {
				this.handleError(err)

				return Promise.resolve({})
			})
	}

	/**
	 * Use the fetch API over HTTP to hit the check token endpoint on the server
	 *
	 * @returns Promise that resolves user object if successful; otherwise, Promise that resolves to empty object
	 */
	pingGetUsersEndpoint(): Promise<GetUsersEndpointResult[]> {
		return fetch(`${this._apiUrl}/user`, {
			cache: NO_CACHE,
			method: HTTP_GET,
		})
			.then((resp) => resp.json())
			.then((obj) => obj)
			.catch((err) => {
				this.handleError(err)

				return Promise.resolve([])
			})
	}

	/**
	 * Use the fetch API over HTTP to hit the check token endpoint on the server
	 *
	 * @returns Promise that resolves to true if token was valid; otherwise, Promise that resolves to false
	 */
	pingTokenCheckEndpoint(): Promise<boolean> {
		return fetch(`${this._apiUrl}/config/check-token`, {
			cache: NO_CACHE,
			method: HTTP_GET,
		})
			.then((resp) => resp.text())
			.then((text) => text === 'true')
			.catch((err) => {
				this.handleError(err)

				return Promise.resolve(false)
			})
	}

	/**
	 * Use the fetch API over HTTP to hit the update token endpoint
	 *
	 * @returns Promise that resolves to true if token was upated; otherwise, Promise that resolves to false
	 */
	pingTokenUpdateEndpoint(secret: string, token: string): Promise<boolean> {
		return fetch(`${this._apiUrl}/config/set-token`, {
			cache: NO_CACHE,
			method: HTTP_POST,
			body: JSON.stringify({
				secret,
				token,
			}),
			headers: HEADERS_JSON_CONTENT,
		})
			.then((resp) => resp.text())
			.then((text) => text === 'true')
			.catch((err) => {
				this.handleError(err)

				return Promise.resolve(false)
			})
	}

	/**
	 * Use the fetch API over HTTP to hit the update token endpoint
	 *
	 * @returns Promise that resolves to true if user was added; otherwise, Promise that resolves to false
	 */
	 pingAddUserEndpoint(accountId: string): Promise<boolean> {
		return fetch(`${this._apiUrl}/user/add/${accountId}`, {
			cache: NO_CACHE,
			method: HTTP_POST,
			headers: HEADERS_JSON_CONTENT,
		})
			.then((resp) => resp.json())
			.then((users) => !!users)
			.catch((err) => {
				this.handleError(err)

				return Promise.resolve(false)
			})
	}

	private handleError(err: Error) {
		console.error(err)
		alert(`There was a problem -\n\n${err.message}`)
	}
}

export { ApiService }
