import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Authentification.css'
import swal from 'sweetalert'
import axios from 'axios';
import cryptojs from 'crypto-js'
const Authentification=() => {
  const navigate=useNavigate()
  const [dataUserResgistre,setDataUserResgistre] =useState({})
  const [verficationChangement,setVerficationChangement]=useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const VerficationAndSend=()=>{
    if(window.localStorage.getItem('UniqueAthentification')){
      if(parseInt(window.localStorage.getItem('UniqueAthentification'))===1){
        swal("Warning", "Can't Sign In more than once", "warning")
        return true;
      }
    }
    if(email==='' || password===''){
      swal("obligatory", "Fields is required", "error")
    }else{
      setDataUserResgistre(()=>{
        return {email:email,password:password}
      })
      setVerficationChangement(()=>{
        return true
    })
    }
  }
  useEffect(()=>{
    if(verficationChangement){
      const VerfiactionExistUser=async () => {
        let res=await axios.post('http://18.118.144.246:5500/userinfo',dataUserResgistre)
        if(res.status>=200 && res.status<300){
          return res
        }
        throw new Error('Something went wrong')
      }
      VerfiactionExistUser().then((res)=>{
        if(res.data){
          const iencr=cryptojs.AES.encrypt(res.data[0].idUser,process.env.REACT_APP_PASS_ENCR).toString()
          const nencr=cryptojs.AES.encrypt(res.data[0].name,process.env.REACT_APP_PASS_ENCR).toString()
          window.sessionStorage.setItem('idUser',iencr)
          window.sessionStorage.setItem('idUserSerie',res.data[0].token)
          window.sessionStorage.setItem('name',nencr)
          window.localStorage.setItem('UniqueAthentification',1)
          window.addEventListener('beforeunload',(eo) => {
            window.localStorage.setItem('UniqueAthentification',0)
            return true
          }
          )
          navigate('/RoomList',{ replace: true })

        }
      }).catch((e)=>{
        swal("Error Informations", "Email or Password Invalid", "error")
        console.log(new Error(e))
      })
    }
  },[dataUserResgistre])
  return<>
    <div className="Principale">
      <div className="Authentification-form">
          <div className="tiger-logo">
              <img src={require('../img/logoTiger2.png')} alt="Logo Tiger" />
          </div>
          <div className="form-content">
              <h1>Sign In</h1>
              <input type='text' onChange={e=>setEmail(()=>e.target.value)} name="email" placeholder="Enter your E-mail" className="Email-form" />
              <input type='password' onChange={e=>setPassword(()=>e.target.value)} name="Password" placeholder="Enter your Password" className="Password-form" />
              <button type="button" onClick={VerficationAndSend} className="Sign-in">Sign in</button>
              <p className="para-info">Don't have an account ? <Link to="/SignUp"> Sign up</Link></p>
          </div>
      </div>
    </div>
  </>
}
export default Authentification
