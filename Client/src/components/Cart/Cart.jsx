import React, { Component } from 'react';
import './Cart.css';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItems: JSON.parse(sessionStorage.getItem('cart')),
			productDetails: [],
			productId: this.props.itemID,
			productName: this.props.itemName,
			description: this.props.description,
			price: this.props.price,
			linePrice: 0
		};
	}
	
	componentDidMount() {
		//testAddToCart(this.state.productDetails);
		console.log(this.state.cartItems);
		
	}

	render() {
		return (
			<div>
				<div class="shopping-cart">
				<div class="column-labels">
					<label class="product-image">Image</label>
					<label class="product-details">Product</label>
					<label class="product-price">Price</label>
					<label class="product-quantity">Quantity</label>
					<label class="product-removal">Remove</label>
					<label class="product-line-price">Total</label>
  				</div>
						{this.state.cartItems &&
							this.state.cartItems.map((item) => (							
							<div>
								<div class="product">
									<div class="product-image">
										<img src="https://homepages.cae.wisc.edu/~ece533/images/watch.png"></img>
									</div>
									<div class="product-details">
										<div class="product-title">{item.productName}</div>
										<p class="product-description">{item.description}</p>
									</div>
									<div class="product-price">{item.price}</div>
									<div class="product-quantity">
									<input type="number" defaultValue="1" min="1"></input>
									</div>
									<div class="product-removal">
										<button class="remove-product">
											Remove
										</button>
									</div>
							<div class="product-line-price">{item.price * item.quantity}</div>
								</div>			
							</div>
						))}		
				</div>	
			</div>																
		);
	}
}
function getLinePrice(price, quantity){

	return price * quantity
}

function remove(productId) {
    var cart = JSON.parse(sessionStorage.getItem('cart'));

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].itemID == productId) {
            cart.splice(i, 1);
        }
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

//debug purposes only, will be implemented in product detail page
function testAddToCart(productInfo) {
	let cartItems = [];
	var product = {
		//productID: productInfo.productID
		productID: 1,
		productName: 'Razer Deathadder Elite',
		catrgoryID: 1,
		sellerID: 1,
		price: 99.99,
		description: 'Razer mouse, elite editon'
	};
	var product1 = {
		//productID: productInfo.productID
		productID: 1,
		productName: 'Razer Deathadder',
		catrgoryID: 1,
		sellerID: 1,
		price: 99.99,
		description: 'Razer mouse, standard editon'
	};

	cartItems.push(product);
	cartItems.push(product1);
	sessionStorage.setItem('cart', JSON.stringify(cartItems));
}
