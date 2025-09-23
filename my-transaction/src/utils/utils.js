
// Format angka pakai koma (1,000,000)
export const NumberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// // Format angka pakai titik sesuai Indonesia (1.000.000)
// export const NumberWithDots = (x) => {
//   return x.toLocaleString("id-ID");
// };

// // Format angka jadi Rupiah (Rp 1.000.000)
// export const FormatRupiah = (x) => {
//   return `Rp ${x.toLocaleString("id-ID")}`;
// };