import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';
import ACTIONS from '../Action';
import {io} from 'socket.io-client'
import {useLocation, useNavigate, Navigate, useParams} from 'react-router-dom'
import { toast } from 'react-toast';


const initsocket = io('http://localhost:4000/');


function EditorPage() {
    
    const location = useLocation();
    const {roomId} = useParams();


    useEffect( ()=>{

        const init = async () => {
        
            initsocket.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            })

            initsocket.on(ACTIONS.JOINED, ({clients, username, socketId})=>{
                console.log(`${username} joined the room`)
                if(username !== location.state?.username) {
                    toast.success(`${username} joined the room`);
                    console.log(`${username} joined the room`);
                }
            })

        };
        init();
    }, [])



    const [client, setClient] = useState([
        {socketId:1, username:'Adarsh R'},
        {socketId:2, username:'Rakesh R'},
        
    ]);

    if(!location.state){
        return <Navigate to={'/'}/>
    }

  return (
    <div className='mainWrap'>
        <div className="aside">
            <div className='asideInner'>
                <div className="logo">
                    <img className='logoImage' src="" alt="logo" />
                </div>
                <h3>Connected</h3>
                <div className="clientsList">
                    {
                        client.map(client=>(
                            <Client
                                key={client.socketId}
                                username={client.username}/>
                        ))
                    }
                </div>
            </div>
            <button className='btn copyBtn'>Copy ROOM ID</button>
            <button className='btn leaveBtn'>Leave</button>
        </div>
        <div className="editorWrap">
            
            <Editor/>

        </div>
    </div>
  )
}

export default EditorPage