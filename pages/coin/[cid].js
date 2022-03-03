import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'

export default function CoinDetail() {
  const router = useRouter()
  const { cid } = router.query
  const [coin, setCoin] = useState(null)

  useEffect(() => {
    if (Array.isArray(window['coin'])) {
      let coinItem = window['coin'].find(coinObj => coinObj.id == cid)
      if (coinItem) {
        setCoin(coinItem)
        return
      }
    }
    router.push('/coin')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <Head>
        <title>Coin Lawencon (Technical Test) | Coin Detail</title>
        <meta name="description" content="Get detail crypto coin selected" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {coin !== null ? (
        <>
          <h3 className='page-title'>Coin Detail</h3>
          <table className='detailCoin' cellSpacing={"10"}>
            <tbody>
              <tr>
                <td>ID</td>
                <td className='detail-value'>{coin.id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td className='detail-value'>{coin.name}</td>
              </tr>
              <tr>
                <td>Symbol</td>
                <td className='detail-value'>{coin.symbol}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td className='detail-value'>{coin.type}</td>
              </tr>
              <tr>
                <td>Active</td>
                <td className='detail-value'>{`${coin.is_active}`}</td>
              </tr>
              <tr>
                <td>Is New?</td>
                <td className='detail-value'>{`${coin.is_new}`}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : ''}
    </>
  )
}

CoinDetail.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}
