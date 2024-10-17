import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '@/context/CoinContext'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'


function Navbar() {

  const {setcurrency}=useContext(CoinContext)

  const currencyHandler=(event)=>{
    switch(event.target.value){
      case 'usd':{
        setcurrency({name:'USD',symbol:"$"});
        break;
      }
      case 'eur':{
        setcurrency({name:'EUR',symbol:"€"});
        break;
      }
      case 'inr':{
        setcurrency({name:'INR',symbol:"₹"});
        break;
      }
      default:{
        setcurrency({name:'USD',symbol:"$"});
        break;
      }
    }
  }
  return (
    <div className='Navbar'>
        <Link to={'/'}>
        <img src={logo} alt="Logo" />
        </Link>
        <ul>
            <Link to={'/'}>
            <li>Home</li>
            </Link>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className='nav-right'>
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
            </select>
            <button >Sign Up <img src={arrow_icon} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar