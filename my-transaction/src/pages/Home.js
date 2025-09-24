import React, {Component} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Hasil, ListCategory, Menus } from '../component';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan", // default kategori awal
      keranjangs: [],
    };
  }

  componentDidMount() {
    // ambil produk pertama kali sesuai kategori default
    axios
      .get(API_URL + "product?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    // ambil keranjang
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

    // getListKeranjang = () => {
    // axios
    //     .get(API_URL + "keranjangs")
    //     .then((res) => {
    //     this.setState({ keranjangs: res.data });
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     });
    // };

    // hapus keranjang
    hapusKeranjang = (id) => {
    axios
        .get(API_URL + "keranjangs/" + id)
        .then((res) => {
        const keranjang = res.data;

        if (keranjang.jumlah > 1) {
            // kalau lebih dari 1, kurangi jumlah
            const keranjangUpdate = {
            ...keranjang,
            jumlah: keranjang.jumlah - 1,
            total_harga: keranjang.total_harga - keranjang.product.harga,
            };

            axios
            .put(API_URL + "keranjangs/" + id, keranjangUpdate)
            .then(() => {
                swal({
                title: "Berhasil!",
                text: "Jumlah produk dikurangi 1",
                icon: "info",
                button: false,
                timer: 1000,
                });
                this.getListKeranjang(); // refresh data
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            // kalau jumlah 1, hapus item
            axios
            .delete(API_URL + "keranjangs/" + id)
            .then(() => {
                swal({
                title: "Terhapus!",
                text: "Produk dihapus dari keranjang",
                icon: "error",
                button: false,
                timer: 1000,
                });
                this.getListKeranjang(); // refresh data
            })
            .catch((error) => {
                console.log(error);
            });
        }
        })
        .catch((error) => {
        console.log(error);
        });
    };


    // agar otomatis tambah dan hapus produk di keranjang (tanpa refresh)
    componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    changeCategory = (value) => {
        this.setState({
        categoriYangDipilih: value, // konsisten pakai yg sama
        menus: [],
        });

    axios
      .get(API_URL + "product?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukkeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          // produk belum ada di keranjang → tambah baru
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then(() => {
              swal({
                title: "Sukses !",
                text: "Sukses Masuk Keranjang! " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // produk sudah ada di keranjang → update jumlah
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then(() => {
              swal({
                title: "Sukses !",
                text: "Sukses Masuk Keranjang! " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;

    return (
      <div className="App">
        
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategory
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col>
                <h5>
                  <strong>Daftar Produk</strong>
                </h5>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukkeranjang={this.masukkeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} hapusKeranjang={this.hapusKeranjang}/>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}