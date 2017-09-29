import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { withRouter } from "react-router-dom";

import { HomePage, Products, CategoriesComponent, Cart } from 'components'
import Header from './Header'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

class App extends Component {
  render(){
    return (
      <div>
        <Header update={() => this.forceUpdate} />
        <div className="container">
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/products/:category/:search" component={Products} />
              <Route path="/products/:category" component={Products} />
              <Route path="/categories" component={CategoriesComponent} exact />
              <Route path="/cart" component={Cart} />
            </Switch>
          </ThemeProvider>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
