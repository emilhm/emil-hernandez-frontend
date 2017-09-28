import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { HomePage, product } from 'components'
import Header from './Header'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

const App = () => {
  return (
    <div>
      <Header />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/product" component={product} exact />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App
