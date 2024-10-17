import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '@/context/CoinContext'
import { Link } from 'react-router-dom';

function Home() {

  const {allcoin,currency}=useContext(CoinContext);
  const [displayCoin,setdisplayCoin]=useState([]);
  const [input,setinput]=useState('');

  const inputhandler=(event)=>{
    setinput(event.target.value);
    if(event.target.value===""){
      setdisplayCoin(allcoin);
    }
  }

  const searchHandler=async(event)=>{
    event.preventDefault();
    const coins=await allcoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase());
    })
    setdisplayCoin(coins);
  }

  useEffect(()=>{
    setdisplayCoin(allcoin);
  },[allcoin])


  return (
    <div className='home'>
      <div className='hero'>
        <h1>Biggest <br/> Crypto Bazaar <i class="ri-shopping-cart-fill"></i></h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>


          <input onChange={inputhandler} list='coinlist' value={input} type="text" placeholder='Search Crypto' required/>
          
          <datalist id='coinlist'>
              {allcoin.map((item,index)=>(<option key={index} value={item.name}/>))}
          </datalist>
          
          
          
          
          <button type="submit">Search</button>
        </form>
      </div>
      <div className='crypto-table'>
        <div className='table-layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item, index)=>(
            <Link to={`/coin/${item.id}`} key={index} className='table-layout'>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name +" - " +item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h*100>0?"profit":"loss"}
              >{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home