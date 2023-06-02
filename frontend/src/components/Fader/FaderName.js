import { useState, useEffect } from "react";
import React from "react";
import {Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import "./Fader.css";


const FaderName =({text}) => {
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
        }, 90000);

        return () => clearInterval(timeout)
    }, [fadeProp])

    return(
        <>
        <Typography color = "error" style={{ marginTop: "20px"}} className={fadeProp.fade}>{text}</Typography>
        </>
    )
}

FaderName.defaultProps = {
    text:"Ta nazwa jest już zajęta."
}

FaderName.propTypes = {
    text: PropTypes.string,

}
export default FaderName