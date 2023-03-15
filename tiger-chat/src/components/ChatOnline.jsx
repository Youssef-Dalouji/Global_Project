import React, { useEffect, useState } from "react";
import '../styles/ChatOnline.css'
import {FaUserAlt,FaCompressArrowsAlt,FaExpandArrowsAlt} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import cryptojs from 'crypto-js'
const ChatOnline=() => {
    const navigate=useNavigate()
    const [verficationSession,setVerficationSession]=useState(false)
    const [message,setMessage]=useState('')
    const [visibility,setVisibility]=useState(false)
    const iRdecr=cryptojs.AES.decrypt(window.sessionStorage.getItem('idSessionGeneral'),process.env.REACT_APP_PASS_ENCR).toString(cryptojs.enc.Utf8)
    const queryExistRoom=useQuery('findRooms',()=>{
        return axios.post('http://18.219.83.70:5500/room/query',{idRoom:iRdecr},{headers:{Authorization:`Bearer ${window.sessionStorage.getItem('idUserSerie')}`}})
    },{
        refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    const queryInformationsRoom=useQuery('GETInformationsRoom',()=>{
        return axios.post('http://18.219.83.70:5500/room/queryInformationsRoom',{idRoom:iRdecr},{headers:{Authorization:`Bearer ${window.sessionStorage.getItem('idUserSerie')}`}})
    },{
        refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    const queryExistUserInRoom=useQuery('ExistUserInRoom',() => {
        return axios.post('http://18.219.83.70:5500/room/ConnectRoom',{idRoom:iRdecr},{headers:{Authorization:`Bearer ${window.sessionStorage.getItem('idUserSerie')}`}})
    },{
        refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    const queryPingUser=useQuery('ExistUserOnLine',() => {
        return axios.post('http://18.219.83.70:5500/M-1351919175/queryPingConnect',{idRoom:iRdecr},{headers:{Authorization:`Bearer ${window.sessionStorage.getItem('idUserSerie')}`}})
    },{
        refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    const getDataUserChat=useQuery('DataUserChat',() => {
        return axios.post('http://18.219.83.70:5500/M-1351919175/get',{idRoom:iRdecr},{headers:{Authorization:`Bearer ${window.sessionStorage.getItem('idUserSerie')}`}})
    },{
        refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    const envMessage=() => {
      if(message!==''){
        const ndecr=cryptojs.AES.decrypt(window.sessionStorage.getItem('name'),process.env.REACT_APP_PASS_ENCR).toString(cryptojs.enc.Utf8)
        const SendMsg=async ()=>{
            let resu=await axios.post('http://18.219.83.70:5500/M-1351919175/create',{message:message,idRoom:iRdecr,name:ndecr},{headers:{Authorization:`Bearer ${window.sessionStorage.getItem('idUserSerie')}`}})
            if(resu.status>=200 && resu.status<300){
                return resu
            }
            throw new Error('Something went wrong')
        }
        SendMsg().then((resu)=>{
            setMessage(()=>{
                return ""
            })
        }).catch((e)=>{
            console.log(new Error(e))
        })
      }
    }
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
        if(!queryExistRoom.isLoading && !queryExistUserInRoom.isLoading && !getDataUserChat.isLoading){
            if(parseInt(queryExistRoom.data.data[0].operation)===1 && parseInt(queryExistUserInRoom.data.data[0].operation)===1){
                if(!queryInformationsRoom.isLoading){
                    if(parseInt(queryInformationsRoom.data.data[0].operation)===1){
                        return<>
                        <div className="main">
                            <div className="chatOnlineMain">
                                <div className="contentChat">
                                    <h1>__Start Chat__</h1>
                                    {getDataUserChat.data.data[0].data.map((item,index)=>{
                                        if(item.type==="E"){
                                                return<>
                                                    <div className="they" key={index}>
                                                        <p className="name-user">{item.name}</p>
                                                        <p className="body-message">{item.message}</p>
                                                        <p className="time-message">{item.date.slice(11,16)}</p>
                                                    </div>
                                                </>
                                            }else{
                                                return<>
                                                    <div className="me" key={index}>
                                                        <p className="name-user">{item.name}</p>
                                                        <p className="body-message">{item.message}</p>
                                                        <p className="time-message">{item.date.slice(11,16)}</p>
                                                    </div>
                                                </>
                                            }
                                    })}
                                </div>
                                <div className="tapANDsend">
                                    <input type="text" onKeyUp={e=>{
                                        if(e.key==='Enter'){
                                            envMessage()
                                        }
                                    }} onChange={e=>{setMessage(()=>e.target.value)}} value={message} name="envoyerChat" className="envoyerChat" placeholder="Enter Message" />
                                </div>
                            </div>
                            <div className="buttonSideMenumaximiser" onClick={()=>setVisibility(()=>true)} style={visibility?{display:'none'}:{display:''}}><FaExpandArrowsAlt className="maximiser" /></div>
                            <div className="SideMenuInformation" style={visibility?{display:'block'}:{display:''}}>
                            <div className="buttonSideMenuminimiser" onClick={()=>setVisibility(()=>false)} style={visibility?{display:'block'}:{display:''}}><FaCompressArrowsAlt className="minimiser" /></div>
                                    <div className="Info-Room-and-User">
                                        <img src={require('../img/logoTiger2.png')} alt="Tiger Logo" />
                                        <h1 className="RoomChat">Room Chat</h1>
                                        <div className="sup-info-room">
                                            <div>
                                                <h3>Room Name :</h3><span>{queryInformationsRoom.data.data[0].data.nameRoom}</span>
                                            </div>
                                            <div>
                                                <h3>Room Id :</h3><span>{queryInformationsRoom.data.data[0].data.idRoom}</span>
                                            </div>
                                            <div>
                                                <h3>Created By :</h3><span>{queryInformationsRoom.data.data[0].data.name}</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <h3>Participating List</h3>
                                    <div className="List-participant">
                                    {queryInformationsRoom.data.data[0].data.users.map((item,index) => {
                                        if(item.connectState===true){
                                            return<>
                                        <div key={index}>
                                            <FaUserAlt />
                                            <p className="nameUserList">{item.name}</p>
                                            <p className="Tconnect"></p>
                                        </div>
                                        </>
                                        }else{
                                            return<>
                                        <div key={index}>
                                            <FaUserAlt />
                                            <p className="nameUserList">{item.name}</p>
                                            <p className="Fconnect"></p>
                                        </div>
                                        </>
                                        }
                                      
                                    }
                                    )}
                                    </div>
                            </div>
                        </div>
                    </>
                    }
                }
            }else{
                window.localStorage.setItem('UniqueAthentification',0)
                navigate('/ConnectionRoom',{replace:true})
                window.location.reload()
            }
        }
    }
}
export default ChatOnline
