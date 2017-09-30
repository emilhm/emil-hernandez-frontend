

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: props.products,
      available: false,
    }
  }
  componentWillUpdate(nextProps) {
    if (nextProps.products !== this.props.products) {
      this.setState({
        products: nextProps.products,
      })
    }
  }
  filterAvailable = (available) => {
    const { products } = this.state
    let filterProducts
    if (available) {
      filterProducts = products.filter((item) => {
        return item.available === available
      })
      this.setState({ products: filterProducts })
    }
    setTimeout(() => {
      this.applyFilter()
    }, 10)
  }
  filters = () => {
    const { products } = this.props
    const { lessPrice = 0, highPrice, lessQuantity = 0, highQuantity } = this.state
    let filterProducts
    if (highPrice && highQuantity) {
      filterProducts = products.filter((item) => {
        const price = parseInt(item.price.replace(',', ''), 10)
        return price < parseInt(highPrice, 10) && price > parseInt(lessPrice, 10) && item.quantity < parseInt(highQuantity, 10) && item.quantity > parseInt(lessQuantity, 10)
      })
    } else if (highPrice) {
      filterProducts = products.filter((item) => {
        const price = parseInt(item.price.replace(',', ''), 10)
        return price < parseInt(highPrice, 10) && price > parseInt(lessPrice, 10) && item.quantity > parseInt(lessQuantity, 10)
      })
    } else if (highQuantity) {
      filterProducts = products.filter((item) => {
        const price = parseInt(item.price.replace(',', ''), 10)
        return price > parseInt(lessPrice, 10) && item.quantity < parseInt(highQuantity, 10) && item.quantity > parseInt(lessQuantity, 10)
      })
    } else {
      filterProducts = products.filter((item) => {
        const price = parseInt(item.price.replace(',', ''), 10)
        return price > parseInt(lessPrice, 10) && item.quantity > parseInt(lessQuantity, 10)
      })
    }
    if (this.state.available) {
      filterProducts = filterProducts.filter((item) => {
        return item.available === true
      })
      this.setState({ products: filterProducts })
      setTimeout(() => {
        this.applyFilter()
      })
    } else {
      this.setState({ products: filterProducts })
      setTimeout(() => {
        this.applyFilter()
      })
    }
  }
  applyFilter = () => {
    this.props.updateProduct(this.state.products)
  }
  handler = (event) => {
    const { products } = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value,
      products,
    })
    if (name === 'available') {
      setTimeout(() => {
        this.filters()
      }, 10)
    }
  }
  render() {
    return (
      <div className="filter-content" >
        <a data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Filtros <i className="fa fa-angle-double-right" aria-hidden="true" />
        </a>
        <div className="collapse" id="collapseExample">
          <div className="filters bg-light row no-gutters">
            <div className="priceFilter col-12 col-sm-6 col-lg-4">
              <h5>Precio</h5>
              <div className="input-group">
                <input type="number" className="form-control" name="lessPrice" onChange={this.handler} placeholder="Minimo" value={this.state.lessPrice} aria-label="Text input with dropdown button" />
                <i>-</i>
                <input type="number" className="form-control" name="highPrice" onChange={this.handler} placeholder="Maximo" value={this.state.highPrice} aria-label="Text input with dropdown button" />
                <i className="fa fa-chevron-circle-right" onClick={this.filters} aria-hidden="true" />
              </div>
            </div>
            <div className="quantityFilter col-12 col-sm-6 col-lg-4">
              <h5>Cantidad</h5>
              <div className="input-group">
                <input type="number" className="form-control" name="lessQuantity" onChange={this.handler} placeholder="Minimo" value={this.state.lessQuantity} aria-label="Text input with dropdown button" />
                <i>-</i>
                <input type="number" className="form-control" name="highQuantity" onChange={this.handler} placeholder="Maximo" value={this.state.highQuantity} aria-label="Text input with dropdown button" />
                <i className="fa fa-chevron-circle-right" onClick={this.filters} aria-hidden="true" />
              </div>
            </div>
            <div className="availableFilter col-12 col-sm-6 col-lg-4">
              <h5>Disponibilidad</h5>
              <div className="form-check">
                <label htmlFor="as" className="form-check-label">
                  <input className="form-check-input" name="available" type="checkbox" onChange={this.handler} value={this.state.available} /> Solo los disponibles
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Filters.propTypes = {
  updateProduct: PropTypes.func,
  products: PropTypes.array,
}

export default Filters
