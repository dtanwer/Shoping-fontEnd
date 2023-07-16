import { useState, useEffect } from 'react'
import './index.css'
import { PlusOutlined} from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../services/client.service';
import { setUser } from '../../features/userSlice';
const Profile = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();

    const info = (msg) => {
        messageApi.info(msg);
    };
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const onFinish = async (values) => {
        try {
            const res = await updateUser({ ...values, address: [...user.address, { userAddress: values.Uaddress }] }, user._id)
            console.log(res.data);
            dispatch(setUser(res.data));
            info("Profile Updated!")
        } catch (error) {
            console.log(error)
        }

    };
    const updateProfileImg = async (img) => {
        try {
            const res = await updateUser({img}, user._id)
            // console.log(res.data);
            dispatch(setUser(res.data));
            info("Profile Image Updated!!")
        } catch (error) {
            console.log(error)
        }

    };
    const onFinishChangePassward = async (values) => {
        if (values?.oldPassword === user?.password) {

            try {
                const res = await updateUser({ password: values.newPassword }, user._id)
                console.log(res.data);
                dispatch(setUser(res.data));
                info("Password Changed")
                form1.setFieldsValue({ newPassword: "", oldPassword: "" });
                console.log("line 36")
            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert("Old Password is Not Matched!!!!");
        }

    };
    const onFill = () => {
        form.setFieldsValue({ ...user });
    };


    useEffect(() => {
        onFill()
    }, [])

    const handleChange = ({ file: newFile}) => {
        (newFile.status === 'done') && updateProfileImg(`http://localhost:5000/${newFile.response}`)
    };

    return (
        <div className='profile'>
            <div className="item1">
                <div className="hellow">
                    <div className="img">
                        <img src={user?.img} alt="user" />
                    </div>
                    <div className="hii">
                        <span>Hello,</span> <br />
                        <span><b>{user?.name}</b></span>
                    </div>
                </div>
                <div className='item left'>
                    <div className="img">
                        <img src={user?.img} alt="" /> <br />
                        <Upload
                            action="http://localhost:5000/uploads"
                            onChange={handleChange}
                            name='image'
                            maxCount={1}
                            multiple={false}
                            showUploadList={false}
                        >
                          <button className='changeImg'>Change Profile</button>
                        </Upload>

                    </div>
                    <div className="info">
                        <li><span>{user?.name}</span></li>
                        <li><span>{user?.email}</span></li>
                        <li><span>{user?.phone}</span></li>
                    </div>
                    <div className="address">
                        <h3>Address</h3>
                        {
                            user?.address?.map((item, i) => {
                                return (
                                    <li key={i}><span>{item?.userAddress}</span></li>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="item persenalDetails">
                {contextHolder}
                <div className='heading'>
                    <h2>Personal Information</h2>
                </div>
                <div className="form">
                    <Form
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item name="name" label="Name" rules={[{ required: true, },]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="phone" label="Phone" rules={[{ required: true, },]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Uaddress" label="Address" >
                            <Input />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
                <div style={{ "textAlign": "start", "marginLeft": "80px" }}>
                    <h2>Password</h2>
                </div>
                {
                    user?.password ? (<div className='form' >

                        <Form
                            form={form1}
                            name="control"
                            onFinish={onFinishChangePassward}
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item name="oldPassword" style={{ "width": "300px", "marginLeft": "110px", "marginTop": "50px" }} label=" Old Password " rules={[{ required: true, },]}>
                                <Input.Password placeholder="input  old password" />
                            </Form.Item>
                            <Form.Item name="newPassword" style={{ "width": "300px", "marginLeft": "110px" }} label="New Password " rules={[{ required: true, },]}>
                                <Input.Password placeholder="input password" />
                            </Form.Item>
                            <Form.Item style={{ "margin": "20px" }} >
                                <Button type="primary" htmlType="submit">
                                    Update Password
                                </Button>
                            </Form.Item>
                        </Form>

                    </div>) : (<div className='form'>
                        <Form
                            onFinish={onFinish}
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item name="password" style={{ "width": "300px", "marginLeft": "110px", "marginTop": "50px" }} label=" Password " rules={[{ required: true, },]}>
                                <Input.Password placeholder="input password" />
                            </Form.Item>
                            <Form.Item style={{ "margin": "20px" }} >
                                <Button type="primary" htmlType="submit">
                                    Set Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Profile