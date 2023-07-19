import React, { useState } from 'react';
import { Badge, Modal } from 'antd';
import './index.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import Auth from '../../pages/Auth';
import { setLogOut, setShowModel } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.login);
    const user = useSelector((state) => state.auth.user);
    const modalShow = useSelector((state) => state.auth.showModel);
    const admin = user.type === 'admin'

    // const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        dispatch(setShowModel(true));
        // setIsModalOpen(true);
    };

    const handleCancel = () => {
        dispatch(setShowModel(false));
        // setIsModalOpen(false);
    };
    const handelSearch = () => {

    }
    return (
        <>
            {!admin ? (<div className='navBar'>
                <div className="leftNav">
                    <div className="item">
                        <h1 onClick={() => navigate('/')}>Flipkart</h1>
                    </div>
                    <div className="itemsearch">
                        <form onSubmit={handelSearch}>
                            <input type="text" placeholder=' Search for products, brands and more' required />
                            <SearchOutlinedIcon className='icon' />
                        </form>
                    </div>
                </div>
                <div className="rightNav">

                    <div className="item" onClick={() => navigate('/')} >Home</div>
                    {
                        user.type !== 'user' && isLogin && <div className="item" onClick={() => navigate('/dashboard')}>DashBoard</div>
                    }

                    {isLogin && <div className="item" onClick={() => navigate('/cart')}>
                        <Badge count={Object?.keys(user?.cart??[])?.length} className='item'>
                        <ShoppingCartIcon  style={{color:"white"}} /> <span  style={{color:"white"}}>Cart</span>
                        </Badge>
                        </div>}
                    {isLogin && <div className="item" onClick={() => navigate('/order')}> <CardGiftcardOutlinedIcon /> Order</div>}
                    {
                        !isLogin ? <div className="item"> <button onClick={showModal}>Login</button>  </div> :
                            <div className="item"> <button onClick={() => dispatch(setLogOut())}>Logout</button>  </div>
                    }
                    {isLogin && <div className="item" onClick={() => navigate('/profile')}>  <img src={user.img ?? "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="no icon" /> </div>}
                </div>
            </div>) :
                (
                    <div className="adminNav">
                        <div className="head"> <h1>Systumm Admin</h1> </div>
                        <div className="adminLogout">
                            <button onClick={() => dispatch(setLogOut())}>Logout</button>
                        </div>
                    </div>
                )}
            <Modal width={1000} open={modalShow} onCancel={handleCancel} footer={[]}>
                <Auth handleCancel={handleCancel} />
            </Modal>
        </>
    )
}

export default Navbar