import { Alert } from 'antd'
import Head from 'next/head'
import MainLayout from '../components/MainLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Coin Lawencon (Technical Test) | Home</title>
        <meta name="description" content="Get data crypto coin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Alert
        message="Welcome to our Page!"
        description="Visit Coin menu to get all data crypto coin!"
        type="info"
        showIcon
      />
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}