import {useState,useEffect} from 'react'
import './index.css'
import { Radio } from 'antd';
import Rating from '../../assets/Rating'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import { getUser } from '../../services/auth.service';
const ProductDetails = ({ data }) => {
  const [vendor, setVendor] = useState({});
  const getVendor = async () => {
    try {
      // const res = await getUser(data?.vendorId)
      // console.log(res.data)
      // setVendor(res.data);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // getVendor()
  }, [])
  return (
    <div className='productDetails'>
      <div className="name">
        <h1>{data?.title}</h1>
        {/* <h3>{data?.description}</h3> */}
      </div>
      <Rating data={data?.rating} />
      <div className="price">
        <h1>₹ {data?.price}  <span className='MRP'>{data?.mrp}</span>   <span style={{ color: "green" }}>{data?.discountPercentage}%</span></h1>
      </div>
      <div className="options">
        <Radio.Group optionType="button" size="large">
          {
            data?.options?.map((item, i) => {
              return (
                <Radio value={item} key={i} >{item}</Radio>
              )
            })
          }
        </Radio.Group>
      </div>
      <div className="offer">
        <h3>Available offers</h3>
        {
          data?.offers?.map((item, i) => {
            return (
              <div className='bankOffers' key={i}>
                <h5> <LocalOfferIcon className='icon' /> {item}</h5>
              </div>
            )
          })
        }
      </div>
      <div className="Highlights">
        <h3>Highlights</h3>
        <ul>
          {
            data?.highlights?.map((item, i) => {
              return (
                <li key={i} >{item}</li>
              )
            })
          }
        </ul>
      </div>
      <div className="description">
        <h3>Description</h3>
        <p>
          {data?.description}
        </p>
      </div>
    </div>
  )
}

export default ProductDetails
