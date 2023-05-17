import { useState } from "react"
import './App.css'
import * as cheerio from 'cheerio'
import axios from "../node_modules/axios/index"

const url = "https://0acf00eb041e7f9982224e0900c30050.web-security-academy.net/login"

function App() {
const [username, setUsername] = useState<String>('')
const [password, setPassword] = useState<String>('')
const [csrf, setCsrf] = useState<String>('')

const getCsrf = async() =>{
  const result = await axios.get(url)
  const $ = cheerio.load(result.data)
  const csrf = $('input[name="csrf"]').attr('value')
  return csrf
}


const handleSubmit = async(e:Event) =>{
  e.preventDefault()
  const token = await getCsrf()
  setCsrf(token);
  
  try{
    const result = await axios.post(url, {
      'csrf': csrf,
      'username': username,
      'password': password
      
    },{headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers':
      'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,XRSF-TOKEN',
      'Access-Control-Allow-Methods': 'OPTIONS,POST',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': '*',
    }}
    )
    const response = result

  }catch(err){
    console.log(err)
  }
}


  return (
    <>
    <div className='login-container'>
        <h1>Login</h1>
    
      <form className='login-form' onSubmit={handleSubmit}>
        <label
        htmlFor = 'username'
        >
          Usuario
        </label>
        <input 
        type='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
      
      <label
        htmlFor = 'password'
        >
          Contraseña
        </label>
        <input 
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      
      <button type = "submit" className='submit-button'>
        Login
      </button> 
      </form>
      
      
    </div>
      
      
    </>
  )
}

export default App
