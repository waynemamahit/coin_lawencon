import { message, Spin, Table, Select, Alert, Input, Row, Col } from 'antd'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../../components/MainLayout'
import { selectCoin, setData, setLoading } from '../../reducers/coinSlice'

// id: "btc-bitcoin"
// is_active: true
// is_new: false
// name: "Bitcoin"
// rank: 1
// symbol: "BTC"
// type: "coin"

const { Option } = Select

export default function Coin() {
  const router = useRouter()
  const coinState = useSelector(selectCoin)
  const [coin, setCoin] = useState([])
  const dispatch = useDispatch()
  
  const getData = async () => {
    dispatch(setLoading())
    dispatch(setData({
      field: 'error',
      data: false
    }))
    
    try {
      let response = await axios.get('https://api.coinpaprika.com/v1/coins/')
      response = await response.data
      
      if (!Array.isArray(response)) throw "Data not found"
      
      let types = response.map(typeItem => typeItem.type)
      types = Array.from(new Set(types))

      dispatch(setData({
        field: 'types',
        data: types
      }))

      setCoin(response)

      window['coin'] = response
      
    } catch (error) {

      message.error(`${error}` || "Something went wrong!")
      
      dispatch(setData({
        field: 'error',
        data: true
      }))

    } finally {
      dispatch(setLoading())
    }
  }

  const onChange = value => {
    let result = window['coin'].filter(coinItem => coinItem.type == value)
    setCoin(result)
  }
  
  const onSearch = value => {
    let result = window['coin'].filter(coinItem => {
      let regex = new RegExp(value, 'i')
      return regex.test(coinItem.name) || regex.test(coinItem.symbol)
    })
    setCoin(result)
  }

  const goDetail = item => {
    router.push('/coin/' + item.id)
  }

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text, record) => <a style={{ color: 'blue', cursor: "pointer" }} onClick={() => goDetail(record)}>{text}</a>,
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
      },
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      sorter: {
        compare: (a, b) => a.symbol - b.symbol,
      },
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      sorter: {
        compare: (a, b) => a.rank - b.rank,
        multiple: 1,
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      render: text => <span>{`${text}`}</span>
    },
  ]

  return (
    <>
      <Head>
        <title>Coin Lawencon (Technical Test) | Coin</title>
        <meta name="description" content="Get data crypto coin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spin spinning={coinState.loading} delay={500} size="large">
        {coin.length > 0 ? (
          <>
            <h3 className='page-title'>Coin List</h3>
            <Row gutter={[24, 24]}>
              <Col>
                <Select
                  showSearch
                  placeholder="Select type"
                  optionFilterProp="children"
                  onChange={value => onChange(value)}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {coinState.types.map((typeItem, typeIndex) => (
                    <Option key={typeIndex} value={typeItem}>{typeItem}</Option>
                  ))}
                </Select>
              </Col>
              <Col>
                <Input.Search 
                  style={{ display: 'inline-block'}} 
                  placeholder="Search"
                  onSearch={value => onSearch(value)} 
                  enterButton   
                />
              </Col>
            </Row>
            <Table 
              columns={columns} 
              dataSource={coin}
              rowKey={(item) => item.id}
            />
          </>
        ) : null}
        {coinState.error ? (
          <Alert
            message="Data not found!"
            description="Click here for reload data."
            type="error"
            showIcon
          />
        ) : null}
      </Spin>
    </>
  )
}

Coin.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}