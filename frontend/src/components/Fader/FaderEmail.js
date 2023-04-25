import { useState, useEffect } from "react";
import React from "react";
import {Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import "./Fader.css";


const FaderEmail =({text}) => {
    const [fadeProp, setFadeProp] = useState({
        fade: "fade-in",
    });

    useEffect(() => {
        const timeout = setInterval(() => {
            if (fadeProp.fade === 'fade-in') {
                setFadeProp({
                    fade: 'fade-out'
                })
            } else {
                setFadeProp({
                    fade: 'fade-in'
                })
            }
        }, 40000);

        return () => clearInterval(timeout)
    }, [fadeProp])

    return(
        <>
        <Typography color = "error" style={{ marginTop: "20px"}} className={fadeProp.fade}>{text}</Typography>
        </>
    )
}

FaderEmail.defaultProps = {
    text:"Ten email jest już zajęty."
}

FaderEmail.propTypes = {
    text: PropTypes.string,

}
export default FaderEmail