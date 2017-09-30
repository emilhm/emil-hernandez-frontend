import React, { Component } from 'react'
import PropTypes from 'prop-types'

class product extends Component {
  renderButtonCart = () => {
    const { inCart, toggleToCard, item } = this.props
    if (inCart === -1) {
      return (<button type="button" className="btn btn-secondary" onClick={() => toggleToCard(item)}>Agregar al carrito</button>)
    }
    return (<button type="button" className="btn btn-secondary" onClick={() => toggleToCard(item)}>Remover del carrito</button>)
  }
  renderProduct = () => {
    const { item } = this.props
    return (
      <div className="content-product">
        {
          item.available && (<i className="fa fa-circle" />)
        }
        <div className="row no-gutters align-items-center">
          <div className="col">
            <h3>{item.name}</h3>
            <div className="price">Precio: ${item.price}</div>
            <div className="quantity">Stock: {item.quantity}</div>
          </div>
          <div className="col-3 text-center">
            <img className="card-img-top" alt={item.name} src="https://cdn-images-1.medium.com/max/512/1*qUlxDdY3T-rDtJ4LhLGkEg.png" />
          </div>
        </div>
        <div className="text-right">
          {this.renderButtonCart(item)}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderProduct()}
      </div>
    )
  }
}

product.propTypes = {
  item: PropTypes.object,
  toggleToCard: PropTypes.func,
  inCart: PropTypes.number,
}

export default product
