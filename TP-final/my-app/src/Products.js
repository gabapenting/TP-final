import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import envio from './assets/Icono_Envio.png'
import './App.css';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      items: []
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    fetch('http://localhost:3003/api/items?search=' + search)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          categories: data.categories,
          items: data.items
        })
      })
  }

  render() {
    const categories = this.state.categories.map((p) =>
      <div className='breadcrumb'>{p} > </div>);

    const productList = this.state.items.map((product) =>
      <div id='prod'>
        <img src={product.picture} alt='' />
        <div className='info'>
          <p className='price'>$ {product.price && product.price.amount}
            <span>{product.free_shipping && <img src={envio} alt=''></img>}</span></p>
          <p>{product.title}</p>
        </div>
        <div className='detail'>
          <p> {product.location} </p>
          <Link to={'/api/items/' + product.id}><button>Ver detalle</button></Link>
        </div>
      </div>)

    return (
      <div>
        {categories}
        <div className='products-div'>
          {productList}
        </div>
      </div>
    );
  }
}

export default Products;