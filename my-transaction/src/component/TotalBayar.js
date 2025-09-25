import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { NumberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { withRouter } from "react-router-dom"; // ⬅️ tambahkan ini

class TotalBayar extends Component {
  submitTotalBayar = async (totalBayar) => {
  try {
    // 1. update stok semua produk
    for (const item of this.props.keranjangs) {
      const productId = item.product.id;
      const stokLama = item.product.stok;
      const jumlahBeli = item.jumlah;
      const stokBaru = stokLama - jumlahBeli;

      await axios.patch(`${API_URL}product/${productId}`, {
        stok: stokBaru
      });
    }

    // 2. simpan pesanan ke tabel pesanans
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
      tanggal: new Date().toISOString(),
    };

    await axios.post(API_URL + "pesanans", pesanan);

    // 3. redirect ke halaman sukses
    this.props.history.push("/Sukses");
  } catch (error) {
    console.error("Gagal menyelesaikan pesanan:", error);
  }
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