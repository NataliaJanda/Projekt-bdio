import React, { useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SideMenu from "../Dashboard/SideMenu";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link, useNavigate } from 'react-router-dom'

const ViewSharedNote = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const title = data?.title || '';
  const content = data?.content || '';
  const shortUrl = window.location.pathname.split('/').pop();
  const baseUrl = process.env.REACT_APP_API_URL.replace('/api', '');
  const userName = localStorage.getItem("loginName");


  const handleDrawerToggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/share/${shortUrl}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate("/403");
      }
    };
    fetchData();
  }, []);
  
  const dataNameUser = {
    nameUser:userName
  } 

  const saveSharedNote = () => {
    fetch(`${baseUrl}/share/${shortUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify(dataNameUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return {};
        }
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => console.error(error));
  };
    

  return (
    <>
      <SideMenu onDrawerToggle={handleDrawerToggle} />
      <Box ml={collapsed ? 3 : "240px"} display="flex" alignItems="center" height="100vh">
        <Container maxWidth="xl" style={{ height: '98%' }}>
          <Box height="98%" display="flex" flexDirection="column" bgcolor="lightgray" marginTop={2}>
            <Card style={{ height: '100%' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" component="div">
                    {title}
                  </Typography>
                  <IconButton onClick={() => {saveSharedNote()}} component={Link} to="/">
                    <BookmarkIcon />
                  </IconButton>
                </Box>
                <Box flex="1" maxHeight="100%" overflow="auto" marginTop={2}>
                  <Typography variant="body1">{content}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ViewSharedNote;