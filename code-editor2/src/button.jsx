function Button2({title, setclick, lang}){
   const styles = {
            padding:"10px 20px",
            backgroundColor:"rgb(121,54,124)",
            border:"none",
            borderRadius:"20px"
    }
    const active_styles = {
            padding:"10px 20px",
            backgroundColor:"rgb(54,8,48)",
            border:"none",
            borderRadius:"20px",
            color:"white"
    }
    return(
     <button style={title.toLowerCase()==lang?active_styles:styles} onClick={setclick} >{title}</button>
    )
}
export default Button2