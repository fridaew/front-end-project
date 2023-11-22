import { Routes, Route, useLocation } from 'react-router-dom';
import Bookable from './components/Bookable';
import BookableDetail from './pages/BookableDetail'
import Home from './pages/Home'
import Reservation from './pages/Reservation'

import PaymentConfimation from './pages/PaymentConfimation';
import RegisterForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import HeroBanner from './components/heroComponents/HeroBanner';


function App() {

  const location = useLocation();

  return (
    <div className='app'>
{/* 
      {location.pathname === '/' ? <HeroBanner /> : <Navbar transparent={location.pathname === '/'} />} */}

      {location.pathname === '/' ? <HeroBanner /> : <Navbar/>}
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          
          <Route path="/bookable" element={<Bookable />} />
          <Route path="bookable/packages/:packageType" element={<Bookable />} />
          <Route path="/bookable/:id" element={<BookableDetail />} />
          <Route path="/reservation/:id" element={<Reservation />} />
          <Route path="/payment-confirmation" element={<PaymentConfimation/>} />  
        </Routes>
        <Footer/>
    </div>

  );
}

export default App;








