import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';
import ACTIONS from '../Action';
import {io} from 'socket.io-client'
import {useLocation, useNavigate, Navigate, useParams} from 'react-router-dom'
import { toast } from 'react-toast';
import TextChat from '../components/TextChat';


const initsocket = io('http://localhost:4000/');


function EditorPage() {
    
    const location = useLocation();
    const {roomId} = useParams();

    const [client, setClient] = useState([]);

    useEffect( ()=>{

        const init = async () => {
        
            initsocket.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            })

            initsocket.on(ACTIONS.JOINED, ({clients, username, socketId})=>{
                if(username !== location.state?.username) {
                    toast.success(`${username} joined the room`);
                }
                // console.log(clients)
                setClient(clients);
            })

            initsocket.on(ACTIONS.DISCONNECTED, ({socketId, username})=>{
                toast.success(`${username} left the room`)
                console.log(`${username} left the room`)
                setClient((prev)=> {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                });
            })
        };
        init();

        return ()=> {
            // initsocket.disconnect();
            initsocket.off(ACTIONS.JOIN);
            initsocket.off(ACTIONS.DISCONNECTED);
        } 
    }, [])



    if(!location.state){
        return <Navigate to={'/'}/>
    }

    async function copyFunction(){
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
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
            <button className='btn copyBtn' onClick={copyFunction}>Copy ROOM ID</button>
            <button className='btn leaveBtn'>Leave</button>
        </div>
        <div className="editorWrap">
            
            <Editor initsocket={initsocket} roomId={roomId}/>

        </div>
        <div className="textChat">
            <TextChat socket={initsocket} room={roomId} username={location.state?.username}/>
        </div>
    </div>
  )
}

export default EditorPage