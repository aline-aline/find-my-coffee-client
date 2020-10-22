import React, { useEffect, useState } from 'react'
import StoreService from '../../services/store'
import styled from 'styled-components'
import ReactStars from 'react-rating-stars-component'

const RightBar = styled.div`
  width: 250px;
  position: absolute;
  color: white;
  right: 0;
  top: 0;
`
const Head = styled.div`
  background-color: rgba(10,10,10,0.9);
  border-radius: 6px;
  padding: 2px;
  text-align: center;
  margin: 10px;
`

const Body = styled.div`
  background-color: rgba(10,10,10,0.9);
  border-radius: 6px;
  padding: 20px;
  height: 450px;
  overflow-y: auto;
  margin: 10px;
`

const BusinessItem = styled.div`
  cursor: pointer;
`
const Title = styled.h1`
  font-size: 18px;
  color: rgba(220,110,50,0.7);
`

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 14px;
`

const NearstCoffees = (props) => {
  const [stores, setStores] = useState([])

  useEffect(() => {
    loadNearestStores()
  }, [props.latitude])

  async function loadNearestStores() {
    const response = await StoreService.index(props.latitude, props.longitude)
    setStores(response.data)
  }

  return (
    <RightBar>
      <Head>
        <h3>Find My Coffee</h3>
      </Head>

      <Body>
        <strong>The best ones</strong>
        <hr />
        {
          stores.map(store => {
            return (
              <BusinessItem key={store.name}>
                <Title>{store.name}</Title>

                <Paragraph>
                  {store.address}
                </Paragraph>

                { store.ratings_count || 0 } Opinions
                <ReactStars edit={false} value={store.ratings_average || 0} />
                <hr/>
              </BusinessItem>
            )
          })
        }
      </Body>
    </RightBar>
  )
}

export default NearstCoffees
