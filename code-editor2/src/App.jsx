import Button from './button';
import Button2 from './button2';
import Textarea from './textarea';
import Codearea from './codedisplay';
import { useState } from 'react';

function App() {
  const [isdragging,setdrag]= useState(false);
  const[html, sethtml] = useState("");
  const[css, setcss] = useState("");
  const[js, setjs] =  useState("");
  const [lang, setlang] = useState("js");
  const saveFile = (name) => {
    let text;
  if(!name){
    alert("please input name");
    return;
  }
  else{
  if(lang=="html") {text = html;}
  else if (lang=="css") {text = css;}
  else{text = js;}
  if(!text){
    alert("file is currently empty");
    return;
  }
  // Create a Blob (like a file in memory)
  const blob = new Blob([text], { type: "text/plain" });
  
  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name+"."+lang; // file name
  
  // Trigger download
  link.click();
  }
}
  
  return (
    <>
    <div id="navbar">
    <div className="langbuttons">
    <Button lang={lang} title="HTML" setclick={()=>{setlang("html")}}/>
    <Button lang={lang} title="CSS" setclick={()=>{setlang("css")}}/>
    <Button  lang={lang}title="JS" setclick={()=>{setlang("js")}}/>
    </div>
    <Button2  title="Save File" setclick={saveFile}/>
    </div>
    <div id="article">
    <Codearea isdragging={isdragging} js={js} html={html} css={css}/>
    <Textarea isdragging={isdragging} setdrag={setdrag} sethtml={sethtml} setcss={setcss} setjs={setjs} lang={lang}/>
    </div>
    </>
  )
}

export default App;


