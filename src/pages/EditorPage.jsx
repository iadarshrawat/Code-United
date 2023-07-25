import React, { useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';

function EditorPage() {
    const [client, setClient] = useState([
        {socketId:1, username:'Adarsh R'},
        {socketId:2, username:'Rakesh R'},
        
    ]);
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