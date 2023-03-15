import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/ConnexionRoom.css'
import swal from 'sweetalert'
import cryptojs from 'crypto-js'
const ConnexionRoom=() => {
  const navigate=useNavigate()
  const [verficationSession,setVerficationSession]=useState(false)
  const [verficationChangement,setVerficationChangement]=useState(false)
  const [getIdRoomChange,setGetIdRoomChange]=useState('')
  const [getIdRoom,setGetIdRoom]=useState('')
  const ClickHandlerAccessRoom=() => {
    if(getIdRoom===''){
      swal("obligatory", "Field is required", "error")
    }else{
      setVerficationChangement(()=>{
        return true
      })
      setGetIdRoomChange(()=>{
        return getIdRoom
      })
    }
  }
  useEffect(()=>{
    if(verficationChangement){
      const VerficationRoomAndUser=async () => {
        let res=await axios.post('http://18.219.83.70:5500/room/ConnectRoom',{idRoom:getIdRoomChange},{headers:{Authorization:`Bearer ${window.sessionStorage.getItem('idUserSerie')}`}})
        if(res.status>=200 && res.status<300){
          return res
        }
      }
      VerficationRoomAndUser().then((res)=>{
        if(res.data){
          if(parseInt(res.data[0].operation)===1){
            swal("Error", "You're already in this room", "error")
          }else{
            const ndecr=cryptojs.AES.decrypt(window.sessionStorage.getItem('name'),process.env.REACT_APP_PASS_ENCR).toString(cryptojs.enc.Utf8)
            const AccessToTheRoom=async () => {
              let resultat=await axios.post('http://18.219.83.70:5500/room/login',{idRoom:getIdRoomChange,name:ndecr},{headers:{Authorization:`Bearer ${window.sessionStorage.getItem('idUserSerie')}`}})
              if(resultat.status>=200 && resultat.status<300){
                return resultat
              }
              throw new Error('Something went wrong')
            }
            AccessToTheRoom().then((resultat)=>{
              if(resultat.data){
                if(parseInt(resultat.data[0].operation)===1){
                  const iRencr=cryptojs.AES.encrypt(getIdRoomChange,process.env.REACT_APP_PASS_ENCR).toString()
                  window.sessionStorage.setItem('idSessionGeneral',iRencr)
                  swal("Tiger Chat 🐆", "Start your conversation ✅", "success")
                  navigate('/RoomChat',{replace:true})
                }else{
                  swal("Invalid", "Invalid Id Room, Try Again", "error")
                }
              }
            }).catch((e)=>{
              console.log(new Error(e))
            })
            
          }
        }
      }).catch((e)=>{
        console.log(new Error(e))
      })
    }
  },[getIdRoomChange])
  useEffect(()=>{
    if(window.sessionStorage.getItem('idUser') && window.sessionStorage.getItem('idUserSerie') && window.sessionStorage.getItem('name')){
      setVerficationSession(()=>{
        return true
      })
    }else{
      navigate('/SignIn',{replace:true})
      window.location.reload()
    }
  },[])
  if(verficationSession){
    return<>
    <div className='Principale'>
    <div className='Room-selection'>
            <div className="tigeLogo-and-title">
                <img src={require('../img/logoTiger2.png')} alt="Logo Tiger" />
                <h1>Connect Room</h1>
            </div>
            <div className='GenerateE'>
                <input type="text" onChange={e=>setGetIdRoom(()=>e.target.value)} name="generateIdRoomM" className="generateIdRoomM" />
            </div>
            <button type='button' onClick={ClickHandlerAccessRoom} className='createRoom'>OK</button>
    </div>
  </div>
  </>
  }
}
export default ConnexionRoom