import React, { Component } from 'react'
import Categories from './Categories/Categories'
import MenuHeader from './menuHeader/menuHeader'

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectCategory: undefined,
      selectCategoryName: undefined,
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  onClick = (item) =>{
    this.setState({selectCategory: item, selectCategoryName: item.name})
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
        <a className="navbar-brand" href="/">El Baraton</a>
        <div className="form-inline categories justify-content-center col">
          <div className="input-group">
            <input type="text" className="form-control" aria-label="Text input with dropdown button" />
            <div className="input-group-btn">
              <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.selectCategoryName || "Categorias" }
              </button>
              <div className="dropdown-menu">
                  <Categories onClick={this.onClick} />
              </div>
            </div>
          </div>
        </div>
        <MenuHeader />
      </nav>
    )
  }
}

export default Header
