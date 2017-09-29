import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Categories extends Component {
  componentWillMount(){
    const { categories } = this.props
    this.iteratorCategories(categories)
  }
  iteratorCategories = (categories = []) => {
    const { idCategory, onClick } = this.props
      categories.map((item) => {
        if (item.sublevels) {
          return this.iteratorCategories(item.sublevels)
        }
        if(idCategory && item.id=== parseInt(idCategory)){
          onClick(item)
        }
      })
  }
  renderCategories = (categories = [], key) => {
    const { ClassComponent, idCategory } = this.props
    let currentKey
    key === undefined ? currentKey = 1 : currentKey = key + 1
    const margin = {
      paddingLeft: `${0.50*currentKey}rem`
    }
    return (
      categories.map((item) => {
        if (item.sublevels) {
          return (
            <div key={`${item.id}-${item.name}`} className="sublevel">
              <div key={`${item.id}-${currentKey}`} style={margin} className={`sublevel-${currentKey}`}>{item.name}</div>
              { this.renderCategories(item.sublevels, currentKey) }
            </div>
          )
        }
        return (
          <div key={`${item.id}-${item.name}`} className="sublevel finalLevel">
            { !ClassComponent && (
              <a key={`${item.id}-${item.name}`} onClick={() => this.props.onClick(item)} style={margin} className={`dropdown-item`}>{item.name}</a>
            )}
            { ClassComponent && (
              <Link key={`${item.id}-${item.name}`} style={margin} to={`/products/${item.id}`} className={`dropdown-item`}>{item.name}</Link>
            )}
          </div>
        )
      })
    )
  }
  render() {
    const { categories, ClassComponent } = this.props
    return (
      <div className={ClassComponent}>
        {this.renderCategories(categories)}
      </div>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array,
  onClick: PropTypes.func,
  ClassComponent: PropTypes.string
}

function mapStateToProps(state) {
  return { categories: state.categories }
}

export default connect(mapStateToProps, null)(Categories)
