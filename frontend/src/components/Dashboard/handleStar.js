import React, { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const StarButton = () => {
    const [starred, setStarred] = useState(false);

    const handleStarClick = () => {
        setStarred(!starred);
    };

    return (
        <IconButton
            edge="end"
            color="default"
            onClick={(e) => {
                e.stopPropagation();
                handleStarClick();
            }}
            style={{
                position: "absolute",
                top: "-3px",
                right: "10px",
                zIndex: 1,
            }}
        >
            {starred ? <Star /> : <StarBorder />}
        </IconButton>
    );
};

export default StarButton;
