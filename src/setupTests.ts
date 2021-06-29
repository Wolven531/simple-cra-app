// more info: https://github.com/testing-library/jest-dom
// jest-dom adds custom jest matchers for asserts on DOM nodes, which allows things like
//     expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom'

// Enzyme allows shallow rendering and interaction simulation (e.g. click)
import Enzyme from 'enzyme'

import ReactSeventeenAdapter from 'enzyme-adapter-react-17-updated'
// import * as ReactSeventeenAdapter from 'enzyme-adapter-react-17-updated'
// import ReactSeventeenAdapter from 'enzyme-adapter-react-17-updated/build/ReactSeventeenAdapter'

// !!! NOTE - ignore purported TS error below, tests work properly
//     but imports appear odd; more info - https://www.npmjs.com/package/enzyme-adapter-react-17-updated
Enzyme.configure({ adapter: new ReactSeventeenAdapter() })

jest.spyOn(window, 'alert').mockImplementation(jest.fn())
