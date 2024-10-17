import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '@/context/CoinContext';
import Line from '@/components/LineChart/Line';

function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState(); // Renamed variable
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => { // Corrected function name
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-9pN6osrJL2xdTbSUPsRnwhBa' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  };

  const fetchHistoricalData = async () => { // Corrected function name
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-9pN6osrJL2xdTbSUPsRnwhBa' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response)) // Fixed setHistoricalData usage
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData(); // Added call to fetchHistoricalData in useEffect
  }, [coinId, currency]); // Added coinId to dependency array

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image?.large} alt="" /> 
          <p><b>{coinData.name} ({coinData.symbol?.toUpperCase()})</b></p> 
        </div>
        <div className="coin-chart">
          <Line historicalData={historicalData}/>
        </div>

<div className="coin-info">
  <ul>
    <li>Crypto Market Rank</li>
    <li>{coinData.market_cap_rank}</li>
  </ul>

  <ul>
  <li>Current Market Price</li>
<li>{currency.symbol} {coinData.market_data.current_price[currency.name] ? coinData.market_data.current_price[currency.name].toLocaleString() : 'N/A'}</li>

  </ul>

  <ul>
    <li>Market Cap</li>
    <li>{currency.symbol}{coinData.market_data.market_cap[currency.name]}</li>
  </ul>

  <ul>
    <li>24 Hour High</li>
    <li>{currency.symbol}{coinData.market_data.high_24h[currency.name]}</li>
  </ul>

  <ul>
    <li>24 Hour Low</li>
    <li>{currency.symbol}{coinData.market_data.low_24h[currency.name]}</li>
  </ul>

</div>



      </div>
    );
  } else {
    return <div className='spinner'>
      <div className="spin"></div>
    </div>;
  }
}

export default Coin;
