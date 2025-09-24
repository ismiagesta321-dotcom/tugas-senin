import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card } from "react-bootstrap";
import { API_URL } from "../utils/constants";

export default function RekapTransaksi() {
  const [pesanans, setPesanan] = useState([]);

  useEffect(() => {
    axios.get(API_URL + "pesanans").then((res) => setPesanan(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="fw-bold mb-3 text-primary">📊 Rekap Transaksi</h3>

        {pesanans.length === 0 ? (
          <p>Belum ada transaksi.</p>
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pesanans.map((trx, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(trx.tanggal).toLocaleString()}</td>
                  <td>Rp {trx.total_bayar.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}