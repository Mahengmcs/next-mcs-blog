import React from 'react'
import App, { Container } from 'next/app'
import MyLayout from "../components/MyLayout/MyLayout";
import './reset.less'
import "antd/dist/antd.less";

export default class MyApp extends App {
    
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, router } = this.props
    return (
        <Container>
            <MyLayout router={router}>
                <Component {...pageProps} />
            </MyLayout>
            
            
        </Container>
    )
  }
}