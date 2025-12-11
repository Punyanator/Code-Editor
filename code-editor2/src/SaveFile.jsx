import { useState } from "react"

function SaveFile({title, setclick,}){
const [filename,setname]= useState("");
const handlefile = (event)=>setname(event.target.value);
   const styles = {
            padding:"10px 20px",
            backgroundColor:"rgb(121,54,124)",
            border:"none",
            borderRadius:"20px"
    }
    return(
    <form id="form" onSubmit={(e)=>{e.preventDefault()}}>
    <input placeholder="Input File Name" id="forminput" type="text" value={filename} onChange={handlefile}/>
    <button type="button" style={styles} 
    onClick=
    {()=>{setclick(filename);
        setname('');
    }} >{title}</button>
     </form>
    )
}
export default SaveFile