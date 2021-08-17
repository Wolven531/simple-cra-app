// more info: https://github.com/testing-library/jest-dom
// jest-dom adds custom jest matchers for asserts on DOM nodes, which allows things like
//     expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom'

// mock window alert
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(jest.fn())

// mock console methods
const mockConsoleDebug = jest.spyOn(window.console, 'debug').mockImplementation(jest.fn())
const mockConsoleError = jest.spyOn(window.console, 'error').mockImplementation(jest.fn())
const mockConsoleInfo = jest.spyOn(window.console, 'info').mockImplementation(jest.fn())
const mockConsoleLog = jest.spyOn(window.console, 'log').mockImplementation(jest.fn())
const mockConsoleWarn = jest.spyOn(window.console, 'warn').mockImplementation(jest.fn())

afterAll(() => {
	jest.spyOn(window.console, 'log').mockRestore()

	console.log(`console.log called ${mockConsoleLog.mock.calls.length} times`)
	console.log(`window.alert called ${mockAlert.mock.calls.length} times`)
})