import { useState } from 'react'
import './index.css'
import Login from '../../componets/Login'
import SignUp from '../../componets/SignUp'
import { message } from 'antd';
const Auth = ({handleCancel}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLogin, setLogin] = useState(true)
    const success1 = () => {
        messageApi.open({
          type: 'success',
          content: 'Registration Successful',
          style: {
            marginTop: '20vh',
          },
        });
      };
    return (
        <div className='auth'>
            {contextHolder}
            <div className="left">
                <div className="content">
                     { isLogin?<h1>Login</h1>:<h1>Looks like you're <br /> new here!</h1>}
                     { isLogin?<h1>Get access to your Orders, Wishlist and Recommendations</h1>:<h1>Sign up with your mobile number or Email to get started</h1>}

                </div>
                <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png' alt="login" />
            </div>
            <div className="right">
                {isLogin ? <Login setlogin={setLogin} handleCancel={handleCancel}  /> : <SignUp setlogin={setLogin} handleCancel={handleCancel} success1={success1} />}
            </div>
        </div>
    )
}

export default Auth
