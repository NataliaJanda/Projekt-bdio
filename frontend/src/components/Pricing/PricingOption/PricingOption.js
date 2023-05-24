import React from "react";
import { Button, Card, Typography } from '@mui/material';

function PricingOption(props) {
  const pricingCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 70,
    margin: 50,
    borderColor: "blue",
    "&:hover": {
      boxShadow: "0 0 2em 0px rgba(0, 0, 0, 0.4)",
      transform: "scale(1.01)",
      borderColor: "white",
    },
  };

  const pricingButtonStyle = {
    marginTop: 20,
    fontSize: 20,
  };

  const lineStyle = {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    margin: "10px 0",
  };

  const additionalTextStyle = {
    textAlign: "center",
    color: "gray",
  };

  return (
    <Card variant="outlined" style={pricingCardStyle}>
      <Typography variant="h4">{props.title}</Typography>
      <Typography variant="h5">{props.price}</Typography>
      <Typography variant="subtitle2">{props.term}</Typography>
      <Typography variant="subtitle2" color="error">{props.description}</Typography>

      <Button color="primary" variant="contained" style={pricingButtonStyle}>
        Skorzystaj z oferty
      </Button>
      <div style={lineStyle}></div>
      <Typography style={additionalTextStyle}>
        {props.contain}
      </Typography>
    </Card>
  );
}

export default PricingOption;