import React from 'react'
import { Link } from 'react-router-dom'

const MenuHeader = () => (
  <div className="btn-group menuHeader col-6 col-sm">
    <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i className="fa fa-bars" />
    </button>
    <div className="dropdown-menu dropdown-menu-right">
      <Link className="dropdown-item" to="/">Categorias</Link>
      <Link className="dropdown-item" to="/cart">Cart</Link>
    </div>
  </div>
)

export default MenuHeader
