import React, { Component } from 'react'
import { Col, ListGroup, Badge, Button, Row } from 'react-bootstrap'
import { NumberWithCommas } from '../utils/utils'
import TotalBayar from './TotalBayar'


export default class Hasil extends Component {
  render() {
    const { keranjangs, hapusKeranjang } = this.props
    return (
      <Col md={3} mt="2">
        <h5><strong>Keranjang</strong></h5>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (

              <ListGroup.Item key={menuKeranjang.id}>
                <Row>
                  <Col xs={2}> <h4>
                    <Badge pill variant="success">
                      {menuKeranjang.jumlah}
                    </Badge>
                    </h4></Col>
                  <Col><h5>{menuKeranjang.product.nama}</h5>
                  <p>Rp. {NumberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col className="ms-auto text-end">
                  <strong>Total : Rp. {NumberWithCommas(menuKeranjang.total_harga)}</strong>
                  </Col>
                </Row>
                
                    <Button
                    variant="danger"
                    size="sm"
                    onClick={() => hapusKeranjang(menuKeranjang.id)}
                  >
                    Hapus
                  </Button>
                  
              </ListGroup.Item>

            ))}

          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props}/>
      </Col>
    )
  }
}