import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [crypto,setCrypto] = useState('')
  const [img,setImg] = useState('')
  const [name,setName] = useState('')
  const [symbol,setSymbol] = useState('')
  const [link,setLink] = useState('')
  const [usd,setUsd] = useState('')
  const [desc,setDesc] = useState('')
  const handleSubmit=()=>{
    const url = "https://api.coingecko.com/api/v3/coins/" + crypto;
    axios.get(url).then(res=>{
      const resData = res.data
      setImg(resData.image.large)
      setName(resData.name)
      setSymbol(resData.symbol)
      setLink(resData.links.homepage[0])
      setUsd("United States: $"+resData.market_data.current_price.usd)
      setDesc(JSON.stringify(resData.description.en))
    })
  }
  function createMarkup() {
    return{__html : desc}
  }
  return (
    <div style ={{backgroundColor:"#1C8795", minHeight:"100vh"}} className="App">
      <h1 className="bg-info p-4">Cryptocurrency Search</h1>
      <div className="d-flex justify-content-center">
        <div className="col-md-4 mt-5">
          <input className="form-control" type="text" value={crypto} onChange={(e)=>setCrypto(e.target.value)} placeholder="Enter the Cryptocurrency" required />
        </div>
      </div>
      <button onClick={handleSubmit} className="btn btn-light px-5 mt-4">Submit</button>
      <div className="mt-5 container-fluid d-flex justify-content-center">
        <div className="col-md-5 bg-info p-2 rounded">
          <img src={img} alt="" width="150"/>
          <br/>
          <h1 className="text-black">{name} ({symbol})</h1>
          <h2><a className="text-white" href={link}>{link}</a></h2>
          <h2>{usd}</h2>
        </div>
      </div>
      <div className="text-white col-md-7 my-auto mx-auto pt-5 pb-4">
        <h1 className="text-black pb-1">Description</h1>
        <div dangerouslySetInnerHTML={createMarkup()}>
        </div>
      </div>
    </div>
  );
}

export default App;
