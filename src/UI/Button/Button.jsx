
import { ButtonStyle } from "./ButtonStyle"
import React from "react"


function Button ({isActive, text, change, value}){

   
    return(<ButtonStyle $active={isActive ? isActive : undefined} value={value} onClick={change} type="button">{text}</ButtonStyle>)
}

export default Button