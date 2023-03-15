import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Registre.css'
import uuid from 'react-uuid';
import swal from 'sweetalert'
import axios from 'axios';
const Registre=() => {
    const navigate=useNavigate()
    const [dataUserResgistre,setDataUserResgistre] =useState({})
    const [verficationChangement,setVerficationChangement]=useState(false)
    const [fullname,setFullName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const VerficationAndSend=() => {
        if(fullname==='' || email==='' || password===''){
            swal("obligatory", "Fields is required", "error")
        }else{
            const regexpPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
            const regexpEmail=/^[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com|outlook.sa)$/
            if(regexpEmail.test(email)){
                if(regexpPassword.test(password)){
                    setDataUserResgistre(()=>{
                        return {idUser:uuid(),name:fullname,email:email,password:password}
                    })
                    setVerficationChangement(()=>{
                        return true
                    })
                }else{
                    swal("Error Password", "A word must contain : \n\n • Min 8 characters \n • Max 30 characters \n • Uppercase letter \n • Lowercase letter \n • Special character \n • Number", "error")
                }
            }else{
                swal("Error Email", "You can't use that email to register", "error")
            }
        }
    }
    useEffect(()=>{
        if(verficationChangement){
            const PostUser=async () => {
                let res =await axios.post('http://3.12.150.17:5500/userRegistre1923',dataUserResgistre)
                if(res.status>=200 && res.status<300){
                  return res
                }
                throw new Error('Something went wrong');
              }
              PostUser().then((res)=>{
                  if(parseInt(res.data[0].operation)===1){
                    swal("Good job!", "Successful registration", "success");
                    navigate('/SignIn', { replace: true })
                    window.location.reload()
                  }
              }).catch((e)=>{
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
              <h1>Sign Up</h1>
              <input type='text' onChange={e=>setFullName(()=>e.target.value)} name="fullname" placeholder="Enter your Full Name" maxLength="18" className="fullname-form" />
              <input type='text' onChange={e=>setEmail(()=>e.target.value)} name="email" placeholder="Enter your E-mail" className="Email-form" />
              <input type='password' onChange={e=>setPassword(()=>e.target.value)} name="Password" placeholder="Enter your Password" className="Password-form" />
              <button type="button" onClick={VerficationAndSend} className="Sign-in">Sign up</button>
              <p className="para-info">Do you have an account ? <Link to="/SignIn"> Sign in</Link></p>
          </div>
      </div>
    </div>
    </>
}
export default Registre
