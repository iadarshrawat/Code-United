import React, { useEffect, useRef } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import ACTIONS from '../Action';

function Editor({initsocket, roomId}) {
    const editorRef = useRef(null);
    useEffect(()=>{
        function init(){
            editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
                mode: {name:'javascript', json:true},
                theme: 'dracula',
                autoClose:true,
                autoCloseBracket:true,
                lineNumbers:true,
            })

            editorRef.current.on('change', (instance, changes)=>{
                // console.log(changes)
                const {origin} = changes;
                const code = instance.getValue();
                if(origin !== 'setValue') {
                    initsocket.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    })
                }
            })

            initsocket.on(ACTIONS.CODE_CHANGE, ({code})=>{
                if(code != null) {
                    const editor = editorRef.current;
                    const lastLineNumber = editor.getCursor().line;
                    const lastLine = editor.getLine(lastLineNumber);
                    const cursor = editor.getCursor(lastLine);
                    editor.setValue(code);
                    editor.setCursor({ line: lastLineNumber, ch: cursor.ch });

                }
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