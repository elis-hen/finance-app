import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from "axios";
import AccMain from './components/AccMain'
import InvMain from './components/InvMain'
import BalMain from './components/BalMain'
import MovMain from './components/MovMain'
import CatMain from './components/CatMain'

function App() {

  useEffect(() => {
    Axios.post("http://localhost:3000/user_key", {
      user_key: 'admin@admin',
    }).then((response) => {
      console.log(response);
    })
  }, []);


  return (
    <div className='div-main'>
      <AccMain />
      <InvMain />
      <BalMain />
      <MovMain />
      <CatMain />
    </div>
  )
}

export default App
