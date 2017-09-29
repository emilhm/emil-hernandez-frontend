import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { HomePage, Products, Product } from 'components'
import Header from './Header'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

const App = () => {
  // console.log(components);
  return (
    <div>
      <Header />
      <div className="container">
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/products" component={Products} exact />
            <Route path="/product/:id" component={Product} />
          </Switch>
        </ThemeProvider>
      </div>
    </div>
  )
}

export default App
