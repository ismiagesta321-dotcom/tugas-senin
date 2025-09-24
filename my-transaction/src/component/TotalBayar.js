import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { NumberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { withRouter } from "react-router-dom"; // ⬅️ tambahkan ini

class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
     tanggal: new Date().toISOString(),
    };

    axios.post(API_URL + "pesanans", pesanan).then(() => {
      this.props.history.push("/Sukses"); // ✅ sekarang bisa jalan
    });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(
      (result, item) => result + item.total_harga,
      0
    );

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h5>Total Bayar : Rp. {NumberWithCommas(totalBayar)}</h5>

            <Button
              variant="primary"
              style={{ width: "250px" }}
              onClick={() => this.submitTotalBayar(totalBayar)}
              
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Bayar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(TotalBayar); // ⬅️ wrap class dengan withRouter