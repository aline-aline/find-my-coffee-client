import React, {useState, useEffect} from 'react'
import BusinessService from '../../services/business_service'
import Ratings from './Ratings'

import styled from 'styled-components'

const LeftBar = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 250px;
  color: white;
  position: absolute;
  background-color: rgba(10,10,10,0.9);
  padding: 20px;
`
const Title = styled.h1`
  font-size: 20px;
  color: rgba(220,110,50,0.7);
`
const Paragraph = styled.p`
  font-size: 13px;
  line-height: 14px;
`
const Image = styled.img`
  height: 150px;
  width: 100%;
`
const Business = (props) => {
  const [business, setBusiness] = useState([])
  const { REACT_APP_GOOGLE_API_KEY } = process.env

  useEffect(() => {
    getBusinessDetails()
  }, [props.place])

  async function getBusinessDetails() {
    try {
      const response = await BusinessService.show(props.place.place_id)
      setBusiness(response.data.result)
    } catch (error) {
      setBusiness([])
    }
  }

  return(
    <LeftBar>
      {
        (business.photos) ?
          <Image src={`
            https://maps.googleapis.com/maps/api/place/photo?photoreference=${business.photos[0].photo_reference}&key=${REACT_APP_GOOGLE_API_KEY}&maxwidth=400
            `} alt="Coffee Photo"
          />
          : <Image src="/images/no_photo.jpg" alt="No photo"/>
      }
      <Title>{business.name}</Title>
      {
        (business.opening_hours) ?
          <div>
            { (business.opening_hours.open_now === true) ? "Open" : "Closed" }
            <hr/>
            {
              business.opening_hours.weekday_text.map((schedule, index) => {
                return(<Paragraph key={index}>{schedule}</Paragraph>)
              })
            }
          </div>
      : <Paragraph>"There is no record of open days and time"</Paragraph>
      }
      <hr/>
      <Paragraph>{business.formatted_address}</Paragraph>

      <Ratings place={props.place}/>
    </LeftBar>
  )
}

export default Business
