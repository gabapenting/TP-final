import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import icon from './assets/Ada_Iso_Blanco.png'
import search from './assets/Icono_Search.png'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: null
    }

    this.inputChange = this.inputChange.bind(this)
  }

  inputChange(e) {
    this.setState({
      searchBar: e.target.value
    })
  }

  render() {
    return (
      <div id='nav'>
        <img id='logo' src={icon} alt='logo' />
        <input id='searchBar' placeholder='Nunca dejes de buscar' value={this.inputVal} onChange={this.inputChange} />
        <Link to={'/items?search=' + this.state.searchBar}>
          <button><img src={search} alt='search' />
          </button>
        </Link>
      </div>)
  }
}

export default Navbar;