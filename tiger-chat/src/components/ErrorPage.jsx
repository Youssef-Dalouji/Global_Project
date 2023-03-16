import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ErrorPage.css';
const ErrorPage=() => {
    const navigate=useNavigate()
    const [verficationSession,setVerficationSession]=useState(false)
    useEffect(()=>{
        window.onbeforeunload = function() {
            window.localStorage.clear()
            window.sessionStorage.clear()
        }
        if(window.sessionStorage.getItem('idUser') && window.sessionStorage.getItem('idUserSerie') && window.sessionStorage.getItem('name')){
          setVerficationSession(()=>{
            return true
          })
        }else{
          navigate('/SignIn',{replace:true})
        }
      },[])
    if(verficationSession){
        return<>
        <div className='errorpagemain'>
            <div className='errorpagesquare'>
                <div className='errorpageimg'>
                    <img src={require('../img/logoTiger2.png')} alt="Logo Tiger" />
                </div>
                <div className='errorpageinfo'>
                    <h1>Page Not Found 404</h1>
                </div>
            </div>
        </div>
            
        </>
    }
}
export default ErrorPage;
