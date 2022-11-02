import React from 'react'
import { Link } from "react-router-dom";

const Logo = () => {
    const src = "/images/logo.png";
    
    return(
        <Link to="/">
            <img
                alt="logo"
                src={src}
                height = "120"
            />
        </Link>
    )
}

export default Logo;