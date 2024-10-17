import { createContext, useState, useEffect } from "react";

export const CoinContext=createContext();

const CoinContextProvider=(props)=>{

    const[allcoin,setAllcoin]=useState([]);
    const[currency,setcurrency]=useState({
        name:"USD",
        symbol:"$",
    })
    const fetchAllcoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-9pN6osrJL2xdTbSUPsRnwhBa'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllcoin(response))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
       fetchAllcoin(); 
    },[currency])
    const contextvalue={
        allcoin,currency,setcurrency
    }
    return(
        <CoinContext.Provider value={contextvalue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;