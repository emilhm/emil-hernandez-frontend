import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Header extends Component {
  renderCategories = (categories = [], key) => {
    let currentKey
    key === undefined ? currentKey = 1 : currentKey = key + 1
    return (
      categories.map((item) => {
        if (item.sublevels) {
          return (
            <div>
              <a key={`${item.id}-${currentKey}`} className={`dropdown-item margin-${currentKey}`}>{item.name}</a>
              { this.renderCategories(item.sublevels, currentKey) }
            </div>
          )
        }
        return (<a key={item.id} className="dropdown-item">{item.name}</a>)
      })
    )
  }
  render() {
    const { categories } = this.props
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
        <a className="navbar-brand" href="/">El Baraton</a>
        <div className="form-inline justify-content-center col">
          <div className="input-group">
            <input type="text" className="form-control" aria-label="Text input with dropdown button" />
            <div className="input-group-btn">
              <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categorias
              </button>
              <div className="dropdown-menu">
                { this.renderCategories(categories) }
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  categories: PropTypes.array,
}

function mapStateToProps(state) {
  return { categories: state.categories }
}

export default connect(mapStateToProps, null)(Header)
