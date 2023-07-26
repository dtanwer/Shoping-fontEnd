import { useState} from 'react'
import './index.css'
import { Button, Form, Input, Upload, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { updateClientPhone, updateUser } from '../../services/client.service';
import { setUser } from '../../features/auth/auth.slice';
const Profile = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState(user?.name ?? "")
    const [editPhone, setEditPhone] = useState(false)
    const [phone, setPhone] = useState(user?.phone ?? "")
    const [address, setAddress] = useState("");
    const success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
            style: { marginTop: "10vh", fontSize: "18px" }
        });
    };

    const error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
            style: { marginTop: "10vh", fontSize: "18px" }
        });
    };

    const warning = (msg) => {
        messageApi.open({
            type: 'warning',
            content: msg,
            style: { marginTop: "20vh", fontSize: "18px" }
        });
    };
    const [form] = Form.useForm();
    const updateProfile = async (values) => {
        if(values?.password?.trim()==="")
        {
            warning("Password Can not be blank !!");
            return;
        }
        try {
            const res = await updateUser(values, user._id)
            console.log(res.data);
            dispatch(setUser(res.data));
            success("Profile Updated!")
        } catch (error) {
            console.log(error)
        }

    };
    const updateProfileImg = async (img) => {
        try {
            const res = await updateUser({ img }, user._id)
            dispatch(setUser(res.data));
            success("Profile Image Updated!!")
        } catch (error) {
            console.log(error)
        }

    };
    const onFinishChangePassward = async (values) => {
        if(values.newPassword==="")
        {
            warning("Password Can not be blank !!");
            form.setFieldsValue({ newPassword: ""});
            return;
        }
        if(values?.oldPassword===values.newPassword)
        {
            warning("New Password Should not match with old Password");
            form.setFieldsValue({ newPassword: ""});
            return;
        }
        if (values?.oldPassword === user?.password) {

            try {
                const res = await updateUser({ password: values.newPassword }, user._id)
                console.log(res.data);
                dispatch(setUser(res.data));
                success("Password Changed")
                form.setFieldsValue({ newPassword: "", oldPassword: "" });
            } catch (error) {
                console.log(error)
            }
        }
        else {
            warning("Old Password is Not Matched!!!!");
            return;
        }

    };

    const handleChange = ({ file: newFile }) => {
        (newFile.status === 'done') && updateProfileImg(`http://localhost:5000/${newFile.response}`)
    };

    const updateName = () => {
        if (name?.trim() === "") {
            setName("");
            warning("Input Name!!")
            return;
        }
        updateProfile({ name })
        setEditName(false)

    }
    const updatePhone = async () => {
        if (phone === "") {
            warning("Input Phone!!")
            return;
        }
        else if(phone.length!==10)
        {
            warning("Enter Correct Length of Number!!");
            return;
        }
       

        try {
            const res = await updateClientPhone({ phone }, user._id);
            if (res.status === 200) {
                dispatch(setUser(res.data));
                success("Profile Updated!")
                setEditPhone(false)
                return;
            }
            else {
                error("Phone Number Already Exist!!")
                return;
            }

        } catch ({ error }) {
            console.log(error)
        }



    }
    const updateAddress = () => {
        if (address?.trim() === "") {
            setAddress("")
            warning("Input Address !!")
            return;
        }

        updateProfile({ address: [...user.address, { userAddress: address }] })
        setAddress("")

    }

    const handelNumberInput = (e) => {
        if (e.currentTarget.value.includes(" ")) {
            e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
          }
        if (!isNaN(e.target.value)) {
            setPhone(e.target.value);
        }
    }

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
            <div className=" persenalDetails">
                {contextHolder}
                <div className='heading'>
                    <h2>Personal Information</h2>
                </div>
                <div className="name inputdata">
                    <span>Name</span><br />
                    <input type="text" value={name} onChange={(e) =>{ if(e.target.value!=" ") setName(e.target.value)}} disabled={!editName} />
                    {
                        !editName ?
                            <button onClick={() => setEditName(true)} className='edit'>Edit</button> :
                            <button className='update' onClick={() => updateName({ name })}>Update</button>
                    }
                </div>
                <div className="name inputdata">
                    <span>Phone No.</span><br />
                    <input type="text" value={phone} onChange={handelNumberInput}  maxLength={10} disabled={!editPhone} />
                    {
                        !editPhone ?
                            <button onClick={() => setEditPhone(true)} className='edit'>Edit</button> :
                            <button className='update' onClick={() => updatePhone({ phone })}  >Update</button>
                    }
                </div>
                <div className="name inputdata">
                    <span>Address</span><br />
                    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
                    <button className='update' onClick={() => updateAddress({ address })} >Add Address</button>

                </div>
                <div style={{ "textAlign": "start", "marginLeft": "80px" }}>
                    <h2>Password</h2>
                </div>
                {
                    user?.password ? (<div className='form' >

                        <Form
                            form={form}
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
                            onFinish={updateProfile}
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