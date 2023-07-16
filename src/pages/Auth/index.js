import { useState } from 'react'
import './index.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Login from '../../componets/Login'
import SignUp from '../../componets/SignUp'
const Auth = ({handleCancel}) => {

    const [isLogin, setLogin] = useState(true)
    return (
        <div className='auth'>
            <div className="left">
                <div className="content">
                     { isLogin?<h1>Login</h1>:<h1>Looks like you're <br /> new here!</h1>}
                     { isLogin?<h1>Get access to your Orders, Wishlist and Recommendations</h1>:<h1>Sign up with your mobile number or Email to get started</h1>}

                </div>
                <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png' alt="login" />
            </div>
            <div className="right">
                {isLogin ? <Login setlogin={setLogin} handleCancel={handleCancel}  /> : <SignUp setlogin={setLogin} handleCancel={handleCancel} />}
            </div>
        </div>
    )
}

export default Auth
