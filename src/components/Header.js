import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import Categories from './Categories/Categories'
import MenuHeader from './menuHeader/menuHeader'
import Toastr from './toastr/toastr'

class Header extends Component {
  constructor(props) {
    super(props)
    const search = this.props.location.pathname.split('/')[3]
    this.state = {
      selectCategory: undefined,
      selectCategoryName: undefined,
      search: search || '',
    }
  }
  onClick = (item) => {
    this.setState({ selectCategory: item, selectCategoryName: item.name })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { search, selectCategory } = this.state
    if (search && selectCategory) {
      this.props.history.push(`/products/${selectCategory.id}/${search}`)
    } else if (selectCategory) {
      this.props.history.push(`/products/${selectCategory.id}`)
    } else {
      this.container.error(
        'Escoja una categoria',
        'Alert', {
          timeOut: 5000,
          extendedTimeOut: 3000,
        })
    }
  }
  handleChange = (event) => {
    this.setState({ search: event.target.value })
  }
  inputFunction = (input) => { this.container = input }
  render() {
    const idCategory = this.props.location.pathname.split('/')[2]
    return (
      <nav className="navbar navbar-expand-lg row no-gutters navbar-light bg-light justify-content-center">
        <Toastr inputFunction={this.inputFunction} />
        <Link className="navbar-brand col-6 col-sm" to="/">El Baraton</Link>
        <div className="form-inline categories justify-content-center col">
          <form onSubmit={this.handleSubmit} className="input-group">
            <input type="text" className="form-control" value={this.state.search} onChange={this.handleChange} aria-label="Text input with dropdown button" />
            <div className="input-group-btn">
              <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.selectCategoryName || 'Categorias' }
              </button>
              <div className="dropdown-menu">
                <Categories onClick={this.onClick} idCategory={idCategory} />
              </div>
            </div>
          </form>
        </div>
        <MenuHeader />
      </nav>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}

export default withRouter(Header)
