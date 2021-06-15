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
		return fetch(
			`${this._apiUrl}/health`,
			{
				cache: 'no-cache',
				method: 'get',
			})
			.then(resp => resp.text())
			.then(text => text)
			.catch(err => {
				this.handleError(err)

				return Promise.resolve('')
			})
	}

	/**
	 * Use the fetch API over HTTP to hit the check token endpoint on the server
	 *
	 * @returns Promise that resolves to true if token was valid; otherwise, Promise that resolves to false
	 */
	pingTokenCheckEndpoint(): Promise<boolean> {
		return fetch(
			`${this._apiUrl}/config/check-token`,
			{
				cache: 'no-cache',
				method: 'get',
			})
			.then(resp => resp.text())
			.then(text => !!text)
			.catch(err => {
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
