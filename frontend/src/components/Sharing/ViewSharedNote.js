import React, { useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SideMenu from "../Dashboard/SideMenu";
import {Card,CardContent,Typography,IconButton} from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {Link,useNavigate} from 'react-router-dom'


const ViewSharedNote = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const title = data?.title || '';
  const content = data?.content || '';
  const currentPath = window.location.href;
  const shortUrl = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  const apiUrl = process.env.REACT_APP_API_URL;
  const baseUrl = apiUrl.replace('/api', '');

  const handleDrawerToggle = () => {
    setCollapsed(!collapsed);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl+"/share/"+shortUrl);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate("/403");
      }
    };
    fetchData();
  }, []);

 

  return (
    <>
      <SideMenu onDrawerToggle={handleDrawerToggle} />
      <Box
        ml={collapsed ? 3 : "240px"}
        display="flex"
        alignItems="center"
        height="100vh"
      >
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center">
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Typography variant="h5" component="div">
                    {title}
                  </Typography>
                  <IconButton component={Link} to="/" >
                    <BookmarkIcon />
                  </IconButton>
                </Box>
                <Box
                  maxHeight={400}
                  overflow="auto"
                  marginTop={2}
                >
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
