import React from "react";

function Footer() {
   const date = new Date().getFullYear()
   
   
    return( 
    <footer> <p>CopyRight Emin Demirhan  {date}   </p> </footer>
    )
;
    
}

export default Footer;