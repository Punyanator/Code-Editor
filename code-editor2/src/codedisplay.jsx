import { useState, useEffect} from "react"
import styles from "./codearea.module.css"

function Codearea({isdragging,html, css, js}){
const [srcDoc, setSrcDoc] = useState("");    
    useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
      )
    }, 250);
    return () => clearTimeout(timeOut)
  }, [html, css, js])
    return(
      <>
      
        <div  className= {styles.codearea}>
        <iframe style={{pointerEvents:isdragging?"none":"all"}}
        srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="1"
          width="100%"
          height="100%"/>
        </div>
       
        </>
    )
}

export default Codearea