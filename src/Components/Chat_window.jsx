import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import Message from './Message'


const Chat_Box = styled.div`
    
    text-align: center;
    /* overflow: hidden; */
    position: relative;
    width: 70%;
    /* overflow: hidden; */
    /* overflow: auto; */
    
    background: linear-gradient(45deg,black,#74d9e429);
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 15px #000000;
    border: 10px solid #3a3f3f;
    
    
    

    

    .Window_head{
      width: 100%;
      height: 80px;
     
      position: relative;
      background: #336e72;
      /* background-color: #3ebdc6; */
      /* display: flex; */
      /* text-align: center; */
      
      /* margin: auto; */
      /* margin-top:20px; */

    }
    .Chat_type{
      font-size: 1.5rem;
      font-weight: 900;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      letter-spacing: 0.03rem;
    }
    .Headtext{
      position: sticky;
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 0px 50px;    
      cursor: default;
    }
    .Participants{
      display: flex;
      color: #000000;
      gap: 10px;
      list-style: none;
      margin: 5px 0px;
      font-weight: normal;
      opacity: 0.6;
      font-size: 1rem;
      font-family: sans-serif;
      letter-spacing: 0.015rem;

    }
    .Inpmessage{
      position: fixed;
      height: 60px;
      bottom: 12px;
      width: 67%;
      margin: 0 5px;
      
     
    }
    .TypeBoard{
      width: 94%;
      text-align: left;
      padding: 0 30px;
      height: 60px;
      outline: none;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: 0.02rem;
    }
    .Send{
      
      position: absolute;
      background: none;
      border: none;
      font-size: 1.5rem;
      right:0;
      top: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      margin: 0 20px;
      color: #444242;
    }

    .Send:hover{
      color: black;
      
    }

    .ChatContainer{
      height: 77%;
      position: relative;
      overflow-y: auto;
    }

    
`


export default function Chat_window(props) {
  const InputRef = useRef(null)
  
  
  const [MessagesAry, setMessagesAry] = useState([{message : "" , msgside :""}])

  

  
  
  
  props.NameNsocket.Socket.on('user-join' , (name)=>{
    appendMsg(`${name} join the chat `)
  })

  const appendMsg=(msg , side)=>{
    
    setMessagesAry(MessagesAry.concat({message:msg , msgside:side}))
    console.log(MessagesAry)
  }
  
  props.NameNsocket.Socket.on('recive' , (data)=>{
    // console.log(`this is name ${props.NameNSocket.Name.trim()}  and this is Name from recieve ${data.Uname.trim()}`)
    
    if (data.Uname.trim()!=props.NameNsocket.Name.trim()) {
      console.log("recive")
      console.log("under the if")
      appendMsg(`${data.message}` , "left")
      props.NameNsocket.Socket.off('recive')
      
    }
    else{
      console.log("else is running")
    }
  })
  
  
  // socket.on('user-join' , name=>{
    //   if (name!=props.NameValue) {
  //     appendMsg(`${name} join the chat`)
  
  //   }
  // })
  
  
  
  
  
  
  const participants = ["participants1", "participants2", "participants3", "participants4"]
  
  const Handle_Click = (e) => {
    console.log(InputRef.current.value)
    if (InputRef.current.value.trim()!="") {
      
      appendMsg(`You:${InputRef.current.value}` , 'right')
      
      console.log("Under the handle click")
      
      
      props.NameNsocket.Socket.emit('send' , {message:(InputRef.current.value) , Uname : (props.NameNsocket.Name)});
    }

    InputRef.current.value = ""
    
  }


  
  





  return (
    <Chat_Box>
      <div className="Window_head">
        <div className="Headtext">
          <span className='Chat_type'>{props.Option}</span>
          <ul className='Participants'>
            <li>{participants[0]}</li>
            <li>{participants[1]}</li>
            <li>{participants[2]}</li>
            <li>{participants[3]}</li>

          </ul>

        </div>
      </div>


      <div className='ChatContainer'>

        {}
        {MessagesAry.map((msg, index) => {
          if (msg.message.trim()!="") {
            return <Message message={`${msg.message}`} dir={msg.msgside} key={index} />
            
          }
          
        })}

  

      </div>






      <div className="Inpmessage" >

        <input type="text" className='TypeBoard' ref={InputRef} placeholder='Type Your Message' onKeyDown={(e)=>{
          e.key=="Enter" ? Handle_Click() :null
        }}/>
        <button className='Send' onClick={Handle_Click}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>

      </div>


    </Chat_Box>

  )
}
