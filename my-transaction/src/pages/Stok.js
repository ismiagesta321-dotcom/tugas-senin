import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import { API_URL } from "../utils/constants";

export default function Stok() {
  const [products, setProducts] = useState([]);
  const [stokBaru, setStokBaru] = useState({}); // simpan input per produk

  // ambil data produk dari API
  useEffect(() => {
    axios.get(`${API_URL}product`)
    .then((res) => {
        setProducts(res.data)});
  }, []);

  // handle input angka stok tambahan
  const handleInputChange = (id, value) => {
    setStokBaru((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // update stok dengan cara nambah, bukan replace
  const handleUpdateStok = async (id, stokLama) => {
    const tambahStok = parseInt(stokBaru[id] || 0, 10);

    if (tambahStok > 0) {
      const stokBaruTotal = stokLama + tambahStok;

      await axios.patch(`${API_URL}product/${id}`, { stok: stokBaruTotal });

      const res = await axios.get(`${API_URL}product`);
      setProducts(res.data);

      setStokBaru((prev) => ({ ...prev, [id]: "" })); // reset input
    }
  };

  return (
    <div className="p-4">
      <h3>📦 Kelola Stok Produk</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stok Saat Ini</th>
            <th>Tambah Stok</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.nama}</td>
              <td>Rp {p.harga.toLocaleString()}</td>
              <td>{p.stok}</td>
              <td>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Masukkan jumlah tambah"
                  value={stokBaru[p.id] || ""}
                  onChange={(e) => handleInputChange(p.id, e.target.value)}
                />
                <Button
                  variant="success"
                  className="mt-2"
                  onClick={() => handleUpdateStok(p.id, p.stok)}
                >
                  Tambah
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}