import React, { Component } from 'react'
import { styled } from 'styled-components'

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
        <a className="navbar-brand col-3" href="/">El Baraton</a>
        <form className="form-inline justify-content-center col">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    )
  }
}

export default Header
