import React from 'react'
import { Modal, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
function AddAddress({ isModalOpen1,selectedAddress, setIsModalOpen1, setSelectedAddress }) {
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
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setSelectedAddress(e.target.value);
      };
    return (
        <Modal title="Select Address" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
            <Radio.Group  value={selectedAddress} onChange={onChange} >
                {
                    user?.address.map((item) => {
                        return (
                            <div className="userAddress">
                                <Radio   value={item.userAddress}>
                                    {
                                        item.userAddress
                                    }
                                </Radio>
                            </div>
                        )
                    })
                }
            </Radio.Group>

        </Modal>
    )
}

export default AddAddress