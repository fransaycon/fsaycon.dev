import React from "react"
import Header from "../common/Header"
import Footer from "../common/Footer"

const MyApp = ({ Component, pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
)

export default MyApp
