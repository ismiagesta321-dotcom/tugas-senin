// // import './App.css';
// import React, { Component } from "react";
// // import NavbarComp from './component/NavbarComp';
// import { Row, Col, Container } from "react-bootstrap";
// // import ListCategory from './component/ListCategory'
// // import Hasil from './component/Hasil';
// import { Hasil, ListCategory, Menus, NavbarComp } from "./component";
// import { API_URL } from "./utils/constants";
// import axios from "axios";
// import swal from "sweetalert";
import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { NavbarComp } from "./component";
import { Home } from "./pages/index";
import { Sukses} from "./pages/index";
import { RekapTransaksi } from "./pages/index";
import { Stok } from "./pages/index";

function App(){
  return (
    <BrowserRouter>
      <NavbarComp />
    <main>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/Sukses" component={Sukses} exact/>
        <Route path="/RekapTransaksi" component={RekapTransaksi} exact/>
        <Route path="/Stok" component={Stok} exact/>
      </Switch>
    </main>
    </BrowserRouter>
  );
}
export default App;

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       menus: [],
//       categoryYangDipilih: "Makanan",
//       keranjangs: [],
//     };
//   }

//   componentDidMount() {
//     axios
//       .get(API_URL + "product?category.nama=" + this.state.categoryYangDipilih)
//       .then((res) => {
//         const menus = res.data;
//         this.setState({ menus });
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     axios
//       .get(API_URL + "keranjangs")
//       .then((res) => {
//         const keranjangs = res.data;
//         this.setState({ keranjangs });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   //ambil daftar keranjang
//   getListKeranjang = () => {
//     axios
//       .get(API_URL + "keranjangs")
//       .then((res) => {
//         this.setState({ keranjangs: res.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   //hapus keranjang
//   hapusKeranjang = (id) => {
//   axios
//     .delete(API_URL + "keranjangs/" + id)
//     .then(() => {
//       swal({
//         title: "Terhapus!",
//         text: "Produk berhasil dihapus dari keranjang",
//         icon: "error",
//         button: false,
//         timer: 1000,
//       });
//       this.getListKeranjang(); // refresh data setelah hapus
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

//   changeCategory = (value) => {
//     this.setState({
//       categoryYangDipilih: value,
//       menus: [],
//     });

//     axios
//       .get(API_URL + "product?category.nama=" + value)
//       .then((res) => {
//         const menus = res.data;
//         this.setState({ menus });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   masukkeranjang = (value) => {
//     axios
//       .get(API_URL + "keranjangs?product.id=" + value.id)
//       .then((res) => {
//         if (res.data.length === 0) {
//         const keranjang = {
//           jumlah: 1,
//           total_harga: value.harga,
//           product: value,
//         };

//         axios
//           .post(API_URL + "keranjangs", keranjang)
//           .then(() => {
//             swal({
//               title: "Sukses !",
//               text: "Sukses Masuk Keranjang! " + keranjang.product.nama,
//               icon: "success",
//               button: false,
//               timer: 1000,
//             });

//             //refresh data keranjang setelah tambah
//             this.getListKeranjang();
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } else {
//         // Jika produk sudah ada, update jumlah dan total harga
//         const keranjang = {
//           jumlah: res.data[0].jumlah + 1,
//           total_harga: res.data[0].total_harga + value.harga,
//           product: value,
//         };

//         axios
//           .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
//           .then(() => {
//             swal({
//               title: "Sukses !",
//               text: "Sukses Masuk Keranjang! " + keranjang.product.nama ,
//               icon: "success",
//               button: false,
//               timer: 1000,
//             });
//             //refresh data keranjang setelah update
//            this.getListKeranjang();
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
// /*
//     const keranjang = {
//           jumlah: 1,
//           total_harga: value.harga,
//           product: value,
//         };

//         axios
//           .post(API_URL + "keranjangs", keranjang)
//           .then((res) => {
//             swal({
//               title: "Sukses !",
//               text: "Sukses Masuk Keranjang! " + keranjang.product.nama,
//               icon: "success",
//               button: false,
//               timer: 1000,
//               });
//           this.getListKeranjang();
//     })
//     .catch((error) => {
//       console.log(error);
//     }); */
//   }

// render() {
//   // console.log(this.state.menus);
//   const { menus, categoryYangDipilih, keranjangs } = this.state;
//   return (
//     <div className="App">
//       <NavbarComp />
//       <div className="mt-3">
//         <Container fluid>
//           <Row>
//             <ListCategory
//               changeCategory={this.changeCategory}
//               categoryYangDipilih={categoryYangDipilih}
//             />
//             <Col>
//               <h5>
//                 <strong>Daftar Produk</strong>
//               </h5>
//               <hr />
//               <Row>
//                 {menus &&
//                   menus.map((menu) => (
//                     //<h5>{menu.nama}</h5>
//                     <Menus
//                     key={menu.id}
//                     menu={menu}
//                     masukkeranjang={this.masukkeranjang}
//                     />
//                   ))}
//               </Row>
//             </Col>
//           <Hasil keranjangs={keranjangs} hapusKeranjang={this.hapusKeranjang}/>

//         </Row>
//       </Container>
//       </div>
//       </div>
//     )
//   }
// }