import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast';
import {v4 as uuidV4} from 'uuid'

function Home() {

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const createNewRoom = (e)=>{
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('created a new room')
    }

    const joinRoom = ()=>{
        if(!roomId || !username) {
            toast.error('Room id & username is required')
            return;
        }
        // redirect
        navigate(`/editor/${roomId}`, {
            state:{
                username,
            }
        })

    }

  return (
    <div className='homePageWrapper'>
        <div className='formWrapper'>
            <img className='homePageLogo' src="/code-sync.png" alt="code-sync-logo" />
            <h4 className='mainLable'>Paste invitation Room ID</h4>
            <div className='inputGroup'>
                <input type="text" className='inputBox'placeholder='Enter you ROOM ID' value={roomId} onChange={(e)=>setRoomId(e.target.value)}/>
                <input type="text" className='inputBox'placeholder='Enter you USERNAME'value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <button className='btn joinBtn' onClick={joinRoom}>JOIN</button>
                <span className='createInfo'>
                    If you don't have an invite then create &nbsp;
                </span>
                <a onClick={createNewRoom} href="" className='createNewBtn'>new Room</a>
            </div>
        </div>
        <footer>
            <h4>Built with ❤️ by <a href="https://github.com/iadarshrawat">Cooder's gyan</a></h4>
        </footer>
    </div>

  )
}

export default Home