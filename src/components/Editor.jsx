import React, { useEffect } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'

function Editor() {
    useEffect(()=>{
        function init(){
            CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
                mode: {name:'javascript', json:true},
                theme: 'dracula',
                autoClose:true,
                autoCloseBracket:true,
                lineNumbers:true,
            })
        }
        init();
    }, [])
  return (
    <div>
        <textarea id='realtimeEditor'></textarea>
    </div>
  )
}

export default Editor