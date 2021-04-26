// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production' ? '/studio88_frontend/' : '/',
// };
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/studio88_frontend/' : '/',
  configureWebpack: {
    externals: {
      moment: "moment",
    },
  },
};