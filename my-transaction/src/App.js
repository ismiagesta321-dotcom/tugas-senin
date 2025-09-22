// import './App.css';
import React, { Component } from 'react';
//import React from 'react';
//import NavbarComp from './component/NavbarComp';
import { Row, Col, Container } from 'react-bootstrap';
//import ListCategory from './component/ListCategory';
//import Hasil from './component/Hasil';
import { Hasil, ListCategory, Menus, NavbarComp } from './component';
import { API_URL } from './utils/constants';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: []
    };
  }

  componentDidMount() {
    axios.get(API_URL + "product")
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state.menus);
    const { menus } = this.state;
    return (
      <div className="App">
        <NavbarComp />
        <div className="mt-3">
          <Container fluid>
    <Row>
        <ListCategory />
        <Col>
        <h5><strong>Daftar Produk</strong></h5>
        <hr />
        <Row>
            {Menus && menus.map((menu)=>(
                //<h5>{menu.nama}</h5>
                <Menus
                key={menu.id}
                menu={menu}
                />
            ))}
        </Row>
        </Col>
        <Hasil />
    </Row>
    </Container>
    </div>
    </div>
    )
}
}
             
        