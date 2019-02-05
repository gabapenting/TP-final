import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import ProductDetail from './ProductDetail';
import './App.css';


class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar inputChange={this.inputChange}></Navbar>
            <Route path='/items/' component={Products} />
            <Route path='/details/:id' component={ProductDetail} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
