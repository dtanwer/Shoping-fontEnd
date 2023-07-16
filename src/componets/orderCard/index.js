import  { useEffect, useState } from 'react';
import './index.css';
import moment from 'moment';
import { Popover, Steps,Button, message, Space } from 'antd';
import { getOrderStatus } from '../../utils/getOrderStatus';
import { getProduct, updateOrder } from '../../services/product.service';
import { getDateDifference } from '../../utils/getHoursDifferance';
const OrderCard = ({ data }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [product,setProduct]=useState({});
    const [isCancel,setCancel]=useState(false);
    const handelCancel= async ()=>{
    const timeInHours=getDateDifference(data?.createdAt);
        if(timeInHours>24)
        {
            warning();
            return;
        }
        else{
            try {
                await updateOrder(data?._id,{status:"cancel"});
                setCancel(true);
            } catch (error) {
               console.log(error); 
            }
        }
    }
    const warning = () => {
        messageApi.open({
          type: 'warning',
          content: 'You Cancel Only With in 24 hours',
        });
      };

    const customDot = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );
    const getUserProduct = async () => {
        try {
            const res = await getProduct(data?.productId);
            setProduct(res.data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserProduct();
    }, [])
    return (
        <div className='orderCard'>
            {contextHolder}
            <div className="img">
                <img src={product?.img} alt="product img" />
                <h2>{product?.title}</h2>
                 <span> <b>Oder Date:</b> {moment(data?.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}</span>
            </div>
            <div className='steps'>
                <Steps
                    current={getOrderStatus(data?.status,isCancel)}
                    progressDot={customDot}
                    status={data.status==='cancel'||isCancel?"error":"process"}
                    items={[
                        {
                            title: 'Ordered',
                            description: "Your Oder is Complete",
                        },
                        {
                            title: 'In Progress',
                            description: "Your Oder is Shipped",
                        },
                        {
                            title: `${ data.status==='cancel'||isCancel?"Cancelled":"Delivered"}`,
                            description: `${ data.status==='cancel'||isCancel?"Oder Cancelled":"Oder Delivered"}`,
                        },
                    ]}
                />
                <div className='cancelButton'>
                <button className='button-1' onClick={handelCancel}  disabled={data.status==='cancel'} >Cancel Order</button>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
