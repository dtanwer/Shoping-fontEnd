import './App.css';
import MainPage from './componets/mainPage';
import MainPage2 from './componets/mainPage2';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/product';
import Cart from './pages/Cart';
import Protected from './componets/protected';
import Protected2 from './componets/protected2';
import DashBoard from './pages/DashBoard';
import OderSuccess from './pages/orderSuccess';
import Profile from './pages/profile';
import Orders from './pages/order';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import Page404 from './componets/Page404';
function App() {
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            {user.type === 'admin' ?
              <Route path='/' element={<DashBoard />} /> :
              <Route path='/' element={<MainPage />} />
            }
            <Route path='/catogory' element={<Protected2><MainPage2/></Protected2>} />
            <Route path='/dashboard' element={<Protected><DashBoard /></Protected>} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={<Protected><Cart /></Protected>} />
            <Route path='/cart/:productId' element={<Protected><Cart /></Protected>} />
            <Route path='/success' element={<Protected><OderSuccess /></Protected>} />
            <Route path='/profile' element={<Protected><Profile /></Protected>} />
            <Route path='/order' element={<Protected><Orders /></Protected>} />
            <Route path='/*' element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <div className='contentt'>
      <Spin tip="Loading" size="large"  spinning={loading}>
        <div className="content" />
      </Spin>
      </div>
    </div>
  );
}

export default App;
