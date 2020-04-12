import React, { Component } from "react";
import "./list_product_style.css";
import { Container, Form, FormGroup, Label, Input, Button,Alert } from "reactstrap";
import axios from "axios";

import {connect} from 'react-redux';
import {loadUser} from '../../Actions/authAction'
import {toast} from 'react-toastify';


 class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_category: [],
      seller_information: [],
      productName: "",
      categoryid: "",
      sellerid: "",
      price: "",    
      description: "",
      quantity: "",
      //error messages
      empty_form_error:"",
      product_error:""
    };
    //Click Handler for the submit

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm  = this.validateForm.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/product/category")
      .then(res => res.json())
      .then(data => this.setState({ product_category: data }));

      this.props.loadUser();
  
  }
  validateForm = (price) => {
    const priceRegex = /^^\d+(?:[.,]\d+)*$/
    if (priceRegex.test(price)){
        return true
    }
    else {
      return false;     
    }
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
      if(this.state.productName !=="" && this.state.price !== "" && this.state.description !==""){
          let product_obj ={};
            if(this.validateForm(this.state.price) == true){
              product_obj = {
              productname: this.state.productName,
              categoryid: this.category_sel.value,
              sellerid: this.props.Auth.user.decoded.accountid,
              price: parseInt(this.state.price),
              description: this.state.description,
              quantity: parseInt(this.state.quantity)
            };

            console.log(product_obj);
            axios.post("http://localhost:5000/products/add", product_obj)  
            .then(res => {
                //successfully created the product.
                //create a toast message
                toast("Product successfully listed")
            })
            .catch(err =>{
              //the product had an issues adding to the database
                this.setState({product_error: err.response.data})
            })
      }
    }
    else{
      this.setState({empty_form_error:"You must fill in the form to add a product"})   
    }
}

  render() {
    const { productName, category, price, quantity, description } = this.state;
    return (
      <Container className="product-form">
        {this.state.empty_form_error ? <Alert color="danger" >{this.state.empty_form_error}</Alert> : null}
        <h2>Add a Product</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Product Name: </Label>
            <Input
              type="text"
              name="productName"
              id="productNameInput"
              value={productName}
              onChange={e => this.handleChange(e)}
              />
          </FormGroup>
          <FormGroup>
            <Label>Product Category:</Label>
            <select
              className="form-control "
              ref={category_sel => (this.category_sel = category_sel)}
              >
              {this.state.product_category.map(category => {
                return (
                  <option key={category.categoryid} value={category.categoryid}>
                    {category.categoryname}
                  </option>
                );
              })}
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Price: </Label>
            <Input
              type="text"
              name="price"
              id="priceInput"
              value={price}
              onChange={e => this.handleChange(e)}
               />
          </FormGroup>
          <FormGroup>
            <Label>Quantity: </Label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={e => this.handleChange(e)}
               />
          </FormGroup>
          <FormGroup>
            <Label>Description: </Label><br></br>
            <textarea
              rows="4" 
              cols="50"
              name="description"
              id="descriptionId"
              value={description}
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>
          <Button type="submit" color="info">Add Product</Button>
        </Form>
        </Container>
    );
  }
}

const mapStateToProps = state =>({
  Auth: state.auth,
  error:state.error
})

export default connect(mapStateToProps, {loadUser})(AddProduct);