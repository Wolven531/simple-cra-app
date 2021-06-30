// more info: https://github.com/testing-library/jest-dom
// jest-dom adds custom jest matchers for asserts on DOM nodes, which allows things like
//     expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom'

jest.spyOn(window, 'alert').mockImplementation(jest.fn())
