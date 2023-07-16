import { useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Radio } from 'antd';
import './index.css'
import { signUpUser } from '../../services/auth.service';
import { message } from 'antd';
const SignUp = ({ setlogin }) => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [type, setType] = useState("user");
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Registration Successful',
      style: {
        marginTop: '20vh',
      },
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
      style: {
        marginTop: '20vh',
        fontSize: '20px',
        marginLeft: "15rem"
      },
    });
  };


  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if(phone.length!==10)
      {
        error("Phone number length Should be 10");
        return;
      }

      try {
        const res = await signUpUser({ phone, email, type, password });
        if (res.status === 209) {
          error('Email Alredy Exist!!');
        }
        else {
          success();
          setlogin(true);
        }
      } catch (error) {
        error("Unable to Register  Right Now!!");
        console.log(error);
      }
    }
    else{
      setConfirmPassword("");
      error("Confir Password Did not Match !")
    }
  }


  return (
    <div className='login'>
      {contextHolder}
      <div className="inputBox">
        <form onSubmit={handelSubmit} >
          <div className="email myInput">
            <MailOutlineIcon className='icon' />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=' Enter Email' required />
          </div>
          <div className="phone myInput">
            <PhoneAndroidIcon className='icon' />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder=' Mobile number' required />
          </div>
          <div className="password myInput">
            <LockOpenIcon className='icon' />
            <input type="password" placeholder=' Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="confPassword myInput">
            <LockOpenIcon className='icon' />
            <input type="password" placeholder=' Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <Radio.Group onChange={(e) => setType(e.target.value)} value={type}>
            <Radio value='user'>User</Radio>
            <Radio value='vendor'>Vendor</Radio>
          </Radio.Group>
          <div className="submitBtn">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <div className="link">
        <p>Already have Account ?<span onClick={() => setlogin(true)} > Login</span></p>
      </div>
    </div>
  )
}

export default SignUp