import {  useEffect, useState,useRef } from "react"
import styles from "./textarea.module.css"
import CodeMirror, { lineNumbers } from "@uiw/react-codemirror";
import { EditorView} from "codemirror";
import { defaultKeymap } from "@codemirror/commands";
import { keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

import {dracula} from "@uiw/codemirror-theme-dracula"
function Textarea({isdragging,setdrag, lang, setjs, setcss, sethtml}){
  const [code, setCode] = useState("// type your code here");;
  const [language, setlanguage] = useState([javascript()]);
  
  const [newHeight,setheight]= useState(500);
  let startWidth = useRef(0);
  let startWidth2 = useRef(0);
  const handleMouseDown = (event)=>{setdrag(true);
          console.log(isdragging);
          startWidth.current= event.clientX;
          startWidth2.current=newHeight;
        }
  const handleMouseMove=(event)=>{
          if (!isdragging ){
             return;}
        // Calculate new height for top panel
        const deltaX = startWidth.current - event.clientX;
        if((startWidth2.current+deltaX)<=100) return;
          console.log(window.innerWidth);
          setheight(startWidth2.current+deltaX);
      }
      const handleMouseUp = ()=>{setdrag(false);}
  useEffect(()=>{
    window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('mousemove', handleMouseMove)
  
       return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  },[isdragging])



//My theme
  const myTheme = EditorView.theme({
     ".cm-content": {
    backgroundColor: "rgb(64, 7, 56)", // text area background
  },
  "&": {
    backgroundColor: "rgb(64, 7, 56)",  // editor background
    color: "#b9b90fff",
             // default text
  },
  ".cm-gutters": {
    backgroundColor: "rgb(64, 7, 56)",  // gutter (line numbers) background
    color: "#838684ff",            // line number text
    border: "none",
  },
  ".cm-cursor": {
    borderLeft: "2px solid #ff79c6", // pink cursor
  },
  ".cm-activeLine": {
    backgroundColor:" rgb(64, 7, 56)",
     // highlight current line
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#44475a33", // change this to your highlight color
    color: "#50fa7b",             // the line number color
    border: "none",
    outline: "none"
  },
  ".cm-selectionBackground": {
    backgroundColor: "#08db4aff",
     // selection color
  },
  ".cm-scroller ":{ 
    overflowX:"visible"/* Disable CodeMirror's internal scroll */
  /* Let it grow as wide as content needs */              /* Prevent collapsing too small */
},
});

//chnaging language
useEffect(() => {
  let note;
  if (lang==="html"){
    setlanguage([html()]);
    note = sessionStorage.getItem("htmlnote") || "// type your code here";
  }
  else if (lang==="css"){
    console.log("lets Go!!");
    setlanguage([css()]);
    note = sessionStorage.getItem("cssnote") || "// type your code here";;

  }
  else {
    setlanguage([javascript()]);
   note = sessionStorage.getItem("jsnote") || "// type your code here";;
  }
  if (note){
  setCode(note)}
}, [lang]);

     
    return(
      <>
       < div   onMouseDown={handleMouseDown} id="divider"></div>
       <div style ={{width: `${newHeight}px`}} className={styles.textarea} > 
      <CodeMirror
        value={code}
        height="100%"
        
        extensions={[...language,myTheme, keymap.of(defaultKeymap)]}  // makes it treat text as JavaScript
        onChange={(value) =>{ setCode(value);
        if(lang==="html"){
          sessionStorage.setItem("htmlnote", value);
        sethtml(value);}
        else if(lang==="css"){
          sessionStorage.setItem("cssnote", value);
        setcss(value);}
        else {
          sessionStorage.setItem("jsnote", value);
        setjs(value);} }}
        onClick={()=>{if(code=="// type your code here")setCode("");
           
        }}  // updates state when typing
          />
        
        
        </div>
        </>
    )
}

export default Textarea


