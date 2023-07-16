import { useEffect, useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setUsers } from '../../features/userSlice';
import { signInWithGoogle, signInWithEmailPassword } from '../../utils/signIn';
import { loginUser, signUpUser } from '../../services/auth.service';
import './index.css';
import { checkUser } from '../../services/auth.service';

import { Modal } from 'antd';
const Login = ({ setlogin, handleCancel }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState("");
    const [isNum, setNum] = useState(false);
    const [open, setOpen] = useState(false);
    const [responce, setResponce] = useState({});

    const dispatch = useDispatch();

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handelOnChange = (e) => {
        isNaN(e.target.value) ? setNum(false) : setNum(true);
        e.target.maxlength = 10;
        setEmail(e.target.value);

    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        // console.log(isNum,password,email)
        try {
            const res = await loginUser({ email, password })
            // console.log(res.data,"with id password")
            if (res.status === 200) {
                dispatch(setLogin(res.data));
                setEmail("");
                setPassword("");
                setMsg("");
                handleCancel();

            }
            else if (res.status === 204) {
                setMsg("Invalid Emial or Phone number !!")
                setPassword("");
                setEmail("");
            }
            else{
                setMsg("User Block By Admin!!");
            }


        } catch (error) {
            setMsg("Wrong Password!!!")
            setPassword("");
            console.log(error);
        }

    }

    const handelOnClickGoogle = async () => {
        try {
            const res = await signInWithGoogle();
            setResponce(res);
            const user = await checkUser({ email: res._tokenResponse?.email })
            if (!user.data) {
                showModal()
            }
            else {
                dispatch(setLogin(user?.data));
            }

        } catch (error) {
            console.log("Unable to login with google", error)
        }

        handleCancel();
    }

    const handelClickType = async (userType) => {
        try {
            const user = await signUpUser({ email: responce?._tokenResponse?.email, type: userType, name: responce?._tokenResponse?.displayName, img: responce?._tokenResponse?.photoUrl });
            dispatch(setLogin(user?.data))
        } catch (error) {
            console.log(error)
        }
        hideModal();
        handelOnClickGoogle();
    }




    return (
        <div className='login'>
            <div className="inputBox">
                <Toaster toastOptions={{ duration: 4000 }} />
                <form onSubmit={handelSubmit} >
                    <div className="email myInput">
                        <MailOutlineIcon className='icon' />
                        <input type="text" value={email} onChange={handelOnChange} maxLength={isNum ? 10 : 20} placeholder=' Enter Email/Mobile number' required />
                    </div>
                    <div className="password myInput">
                        <LockOpenIcon className='icon' />
                        <input type="password" placeholder=' Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div style={{ color: "red", fontWeight: 'bold' }} ><span>{msg}</span></div>
                    <div className="submitBtn">
                        <button type="submit">Login</button>
                    </div>
                </form>


            </div>
            <div className="link">
                <p>Don't have Account ?<span onClick={() => setlogin(false)} > Register</span></p>
                <span className='smallHeading' >Or, Sign in with your Google account</span>
            </div>
            <div className="btns" onClick={handelOnClickGoogle}>
                <img src="http://uitheme.net/sociala/images/icon-1.png" alt="" />
                <button >Sign in with Google</button>
            </div>

            <Modal
                title="Modal"
                open={open}
                onOk={() => handelClickType("vendor")}
                onCancel={() => handelClickType("user")}
                okText="Vendor"
                cancelText="user"
                closeIcon={false}
            >
                <h3>What Type of Account You want</h3>
            </Modal>
        </div >
    )
}

export default Login
