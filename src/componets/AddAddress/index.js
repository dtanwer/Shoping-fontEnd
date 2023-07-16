import React from 'react'
import {  Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
function AddAddress({isModalOpen1,setIsModalOpen1,setSelectedAddress}) {
    const user = useSelector((state) => state.auth.user);
    const handleOk1 = () => {
        setIsModalOpen1(false);
      };
    
      const handleCancel1 = () => {
        setIsModalOpen1(false);
      };
    //   const showModal1 = () => {
    //     setIsModalOpen1(true);
    //   };
    return (
        <Modal title="Select Address" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
            <ul>
                {
                    user?.address.map((item) => {
                        return (
                            <div className="userAddress">
                                <li onClick={() => setSelectedAddress(item.userAddress)}>
                                    {
                                        item.userAddress
                                    }
                                </li>
                            </div>
                        )
                    })
                }
            </ul>
     </Modal>
    )
}

export default AddAddress