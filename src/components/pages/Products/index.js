import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Product } from 'components'
import Toastr from '../../toastr/toastr'
import Filters from '../../filter/filter'
import { setCart } from '../../actions'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: props.cart,
      products: [],
      filterProducts: [],
    }
  }
  componentDidMount() {
    const { match } = this.props
    this.filterByCategories(parseInt(match.params.category, 10), match.params.search)
  }
  componentWillUpdate(nextProps) {
    const { match } = nextProps
    if (match.url !== this.props.match.url) {
      this.filterByCategories(parseInt(match.params.category, 10), match.params.search)
    }
  }
  order = (order) => {
    const newOrder = this.state.filterProducts.sort((a, b) => {
      if (order === 'Precio') {
        return parseInt(a.price.replace(',', ''), 10) - parseInt(b.price.replace(',', ''), 10)
      } else if (order === 'Disponibilidad') {
        return a.available ? -1 : 1
      }
      return parseInt(a.quantity, 10) - parseInt(b.quantity, 10)
    })
    this.setState({ filterProducts: newOrder, orderName: order })
  }
  toggleToCard = (item) => {
    const { cart } = this.state
    const index = cart.findIndex(element => element.id === item.id)
    if (index === -1) {
      cart.push(item)
    } else {
      cart.splice(index, 1)
    }
    this.setState({ cart })
    this.props.setCart(cart)
    this.container.success(
      index === -1 ? `${item.name} añadido al carrito` : `${item.name} removido del carrito`,
      'Alert', {
        timeOut: 5000,
        extendedTimeOut: 3000,
      })
  }
  filterByCategories = (categories, search) => {
    const { products } = this.props
    let filterProducts
    if (categories) {
      filterProducts = products.filter((item) => {
        return item.sublevel_id === categories
      })
      this.setState({ products: filterProducts, filterProducts })
    }
    if (search) {
      this.filterBySearch(search, filterProducts)
    }
  }
  filterBySearch = (search, products) => {
    let filterProducts
    if (search) {
      filterProducts = products.filter((item) => {
        return item.name.indexOf(`${search}`) !== -1
      })
      this.setState({ products: filterProducts, filterProducts })
    }
  }
  updateProduct = (filterProducts) => {
    this.setState({ filterProducts })
  }
  renderProducts = () => {
    const { cart, filterProducts } = this.state
    return filterProducts.map((item) => {
      return (
        <div key={item.id} className="product col-sm-6 col-lg-4 justify-content-center">
          <Product item={item} toggleToCard={this.toggleToCard} inCart={cart.findIndex(element => element.id === item.id)} />
        </div>
      )
    })
  }
  render() {
    const { products, filterProducts } = this.state
    return (
      <div className="content-products">
        <Toastr inputFunction={(input) => { this.container = input }} />
        <Filters products={products} orderName={this.state.orderName} order={this.order} updateProduct={this.updateProduct} />
        <h2 className="text-center">Agrega al carrito de compra</h2>
        <div className="row">
          {filterProducts.length > 0 && (this.renderProducts())}
          {filterProducts.length === 0 && (
            <h2 className="text-center">
              No tenemos este producto :(
            </h2>
            )
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
  }
}

const mapDispatchToProps = {
  setCart,
}

Products.propTypes = {
  products: PropTypes.array,
  cart: PropTypes.array,
  setCart: PropTypes.func,
  match: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
