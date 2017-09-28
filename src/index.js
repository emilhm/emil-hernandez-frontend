import 'react-hot-loader/patch'
import React from 'react'
import { basename } from 'config'
import App from 'components/App'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { compose, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import storeApp from './reducer'

const middleware = [
  thunk, // Allows action creators to return functions (not just plain objects)
]

const store = compose(
  applyMiddleware(...middleware),
)(createStore)(storeApp)

// const store = createStore(storeApp)

const renderApp = () => (
  <Provider store={store}>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </Provider>
)

const root = document.getElementById('app')
render(renderApp(), root)

if (module.hot) {
  module.hot.accept('components/App', () => {
    require('components/App')
    render(renderApp(), root)
  })
}
