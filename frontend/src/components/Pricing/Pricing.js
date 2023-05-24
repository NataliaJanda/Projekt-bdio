import React from "react";
import PricingOption from "./PricingOption/PricingOption";
import { Container,Grid,Typography,IconButton,Box} from '@mui/material';
import {Home} from '@mui/icons-material';
import {Link} from 'react-router-dom'


function Pricing() {
  return (
    <Container xs={12}>
     <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">
          Wybierz abonament
        </Typography>

        <IconButton component={Link} to="/components/dashboard">
          <Home />
        </IconButton>
      </Box>


      <Grid container justify="center">
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <PricingOption
            title="Standardowy"
            price="Darmowy"
            term=""
            description=""
            contain="Liczba notatek ograniczona do 25"
          />
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
          <PricingOption
            title="Premium+"
            price="269.99 zł"
            term="/rocznie"
            description="Dzięki rocznemu pakietowi możesz zaoszczędzić 25% "
            contain="Nielimitowana liczba notatek"
          />
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
        <PricingOption
            title="Premium"
            price="29.99 zł"
            term="/miesięcznie"
            description=""
            contain="Nielimitowana liczba notatek"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Pricing;