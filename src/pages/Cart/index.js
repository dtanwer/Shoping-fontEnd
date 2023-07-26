import React, { useEffect, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import CartCard from '../../componets/cartCard';
import { Modal, Empty,message } from 'antd';
import AddAddress from '../../componets/AddAddress';
import { removeUserCart, setAddress } from '../../features/auth/auth.slice';
import { addAddresToUser, addOrders, getProduct, addToCart, removeToCart, updateMyProduct } from '../../services/product.service';
import { useNavigate, useParams } from 'react-router-dom';
const Cart = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content:msg,
      style:{fontSize:"20px"}

    });
  };
  const placing = (msg) => {
    messageApi.open({
      type: 'loading',
      content:msg,
      duration: 1,
      style:{fontSize:"20px"}

    });
  };
  const warning = (msg) => {
    messageApi.open({
      type: 'warning',
      content:msg,
      style:{fontSize:"20px"}
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const productPrice = useSelector((state) => state.auth.productPrice);
  const [selectedAddress, setSelectedAddress] = useState("")
  const [add, setAdd] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [cupon, setCupon] = useState("");
  const [msg, setMsg] = useState("");
  const [product, setProduct] = useState({});
  const [discount, setDiscount] = useState(0);
  const [delevry, setDelevry] = useState(500);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk = async () => {
    if (add !== "") {

      try {
        await addAddresToUser(user._id, { userAddress: add });
        dispatch(setAddress({ userAddress: add }))
        setSelectedAddress(add);
        setAdd("")
        setIsModalOpen(false);
      } catch (error) {
        console.log(error)
      }
    }
    else {
      setMsg("Please Input Address !!")
    }


  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMsg("")
  };

  const handelAddAddress = () => {
    showModal();
  }
  const handelSelectAddress = () => {
    showModal1();
  }
  useEffect(() => {
    if (Object.keys(user.address).length !== 0) {
      setSelectedAddress(user.address[0].userAddress);
    }
    else {
      showModal();
    }
    if (productId) {
      setCheckOut(true);
      setProduct(getProduct(productId));
    }

  }, [])

  useEffect(() => {
    let cost = 0;
    user.cart.map((item, i) => {
      cost += (parseInt(item?.price) * parseInt(item?.quantity))
    })
    setTotal(cost);
    if(cost===0)
    setDelevry(0);
  }, [isChange, user.cart])



  const getUserProduct = async (id) => {
    try {
      const res = await getProduct(id);
      setProduct(res.data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
  const handelRemoveCart = async (id) => {
    try {
      await removeToCart(user._id, { id })
      dispatch(removeUserCart({ id }))
    } catch (error) {
      console.log(error)
    }
    success("Product Removed!!")
  }
  const handelCupon = (e) => {
    e.preventDefault();
    if (cupon === "FREE500") {
      setDiscount(500);
    }
    else if (cupon === "FIRST") {
      setDelevry(0);
      setDiscount(500);
      success("Cupon Code Applyed!")
    }
    else {
      setDiscount(0);
      warning("Wrong Cupon Code")
      setCupon("");
    }
  }

  const placeOrder = async () => {
    if (selectedAddress === "") {
      showModal();
      return;
    }
    placing("Placing Your Oder...");
    if (productId) {
      try {
        const data = await getUserProduct(productId)
        const res = await addOrders(
          {
            vendorId: data.vendorId,
            userId: user._id,
            userName: user.name,
            productName: data.title,
            address: selectedAddress,
            productId: data._id,
            quantity: 5,
            price: data.price,
          })
        console.log('Oder Complete driect from BUY', res.data)
        navigate('/success')
      } catch (error) {
        console.log(error)
      }
      return;

    }
    user?.cart?.map(async (item) => {
      try {
        const data = await getUserProduct(item.id)
        const res = await addOrders(
          {
            vendorId: data.vendorId,
            userId: user._id,
            userName: user.name,
            productName: data.title,
            address: selectedAddress,
            productId: data._id,
            quantity: item?.quantity,
            price: data.price,
          })
        const totaloders = data.oderNum ?? 0
        await updateMyProduct({ oderNum: totaloders + 1 }, data._id);
        handelRemoveCart(item.id)
        navigate('/success')

        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    })


  }

  const handelCuponInput = (e) => {
    setCupon(e.target.value);
    if (cupon !== "FIRST") {
      setDiscount(0);
      setDelevry(500);
    }
  }
  return (

    <div className='cart'>
      {contextHolder}
      <div className="cartItems">
        <div className="address">
          <span className='heading'>Address</span>
          <div className="content">
            <div className="selectedAddress">
              <span>{selectedAddress}</span>
            </div>
            {
              Object.keys(user.address).length !== 0 ? (
                <div className='addressButton'>
                  <button onClick={handelSelectAddress}>Select Address</button>
                  <button onClick={handelAddAddress} className='add'>Add</button>
                </div>
              ) :
                (
                  <div className='addressButton'>
                    <button onClick={handelAddAddress}>Add address</button>
                  </div>
                )
            }
          </div>
        </div>
        {productId ?
          (<div className='itemsBuy'>
            <CartCard user={user} checkOut={checkOut} id={productId} />
          </div>) :
          (<div>
            {Object.keys(user?.cart).length !== 0 ? (<div className="items">
              {
                user?.cart?.map((item) => {
                  return (
                    <CartCard user={user} checkOut={checkOut} cart={item} id={item.id} key={item.id} isChange={isChange} setIsChange={setIsChange} />
                  )
                })
              }
              {!checkOut && <div className="placeOrder">
                <button onClick={() => setCheckOut(true)}>PLACE ORDER</button>
              </div>}
            </div>) : (<Empty description="Cart is Empty" />)}
          </div>)}
      </div>
      <div className="amountDetails">
        <div className='priceHead'>
          <h2>PRICE DETAILS</h2>
        </div>
        <div className="details">
          <span>Price ({Object.keys(user?.cart).length} item)</span>
          <span className='amount'>₹{total}</span> <br />
          <span>Delivery Charges</span>
          <span className='amount' style={{ "color": "green" }} >{delevry === 0 ? "FREE" : `${delevry}`}</span> <br />
          {checkOut && <span>Discount</span>}
          {checkOut && <span className='amount' >₹{discount}</span>}
        </div>
        <div className="total">
          <span>Total Payable</span>
          {
            productId ?
              <span className='amount'>₹{productPrice + delevry}</span> :
              <span className='amount'>₹{total + delevry }</span>
          }
        </div>
        {checkOut && <div className="cupon">
          <form onSubmit={handelCupon}>
            <input type="text" value={cupon} onChange={handelCuponInput} placeholder='Cupon Code' />
            <button type='submit'>Apply</button>
          </form>
          {discount !== 0 && <span style={{ "color": "green" }}> <b>{cupon} APPLYED!!</b> </span>}
        </div>}
        {checkOut && <div className="checkout">
          {discount === 0 && <span style={{ color: "red", fontWeight: "bold" }}>Use FIRST for free Delevery</span>}
          <button onClick={placeOrder}>CHECK OUT</button>
        </div>}

      </div>
      <Modal title="Input Your Address" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input type="text" value={add} onChange={(e) => setAdd(e.target.value)}
          style={{ padding: "10px", fontSize: "18px", width: "19rem" }} /> <br />
        <span style={{ color: "red", paddingTop: "20px", fontSize: "15px" }}>{msg}</span>
      </Modal>
      <AddAddress isModalOpen1={isModalOpen1} setIsModalOpen1={setIsModalOpen1} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />

    </div>
  )
}

export default Cart