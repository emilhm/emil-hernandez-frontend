import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { Products, CategoriesComponent, Cart } from 'components'
import PropTypes from 'prop-types'
import Header from './Header'
import { setCart } from './actions'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

class App extends Component {
  componentWillMount() {
    if (localStorage.getItem('cart')) {
      const localCart = localStorage.getItem('cart').split(',')
      const { products, setCart } = this.props
      const cart = products.filter((item) => {
        const index = localCart.findIndex(element => element === item.id)
        return index !== -1
      })
      setCart(cart)
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/" component={CategoriesComponent} exact />
              <Route path="/products/:category/:search" component={Products} />
              <Route path="/products/:category" component={Products} />
              <Route path="/cart" component={Cart} exact />
            </Switch>
          </ThemeProvider>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}
const mapDispatchToProps = {
  setCart,
}
App.propTypes = {
  products: PropTypes.array,
  setCart: PropTypes.func,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
