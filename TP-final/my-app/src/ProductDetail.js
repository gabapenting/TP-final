import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import envio from './assets/Icono_Envio.png';
import './App.css';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      categories: [],
      isLoading: true
    }
  }
  componentDidMount() {
    fetch('http://localhost:3003/api/items/' + this.props.match.params.id)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          product: data.item,
          categories: data.categories,
          isLoading: false
        })
      })
  }

  render() {
    if (this.state.isLoading) {
      return <p>cargando...</p>
    }
    const breadcrumb = this.state.categories.map((p) =>
      <div className='breadcrumb'>{p.name}  > </div>
    )
    return (
      <div>
          {breadcrumb}
        <div className='info'>
          <div className='descr'>
            <img alt='' src={this.state.product.picture}></img>
            <h3>Descripción del producto</h3>
            <p> {this.state.product.description} </p>
          </div>
          <div className='comprar'>
            <div className='new'>
              <p>{this.state.product.condition === 'new' ? 'Nuevo' : 'Usado'} - <span>{this.state.product.sold_quantity} vendidos </span>
                <span className='free'>
                  {this.state.product.free_shipping && <img alt='' src={envio}></img>}
                </span>
              </p>
            </div>
            <h2>$ {this.state.product.price.amount}
              {/* {(this.state.product.price.decimals === 0) && <sup className='single-product-decimals'>  00</sup>}
              {(this.state.product.price.decimals !== 0) &&
                <sup className='single-product-decimals'>{this.state.product.price.decimals} </sup>} */}
            </h2>
              <Link to={'/'}><button>Comprar</button></Link>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductDetail;