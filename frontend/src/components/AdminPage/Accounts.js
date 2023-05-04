import React,{ useState,useEffect }  from "react";
import AdminSideMenu from './AdminSideMenu';
import {Button, Container,Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import {useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
const apiUrl = process.env.REACT_APP_API_URL;

const columns = [
    { key: 'accountId', label: 'ID' },
    { key: 'nameUser', label: 'Nazwa' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rola' }
  ];
  
  const Accounts = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [accountId, setAccountId] = useState(null);
    const navigate = useNavigate();


    const theme = createTheme({
      palette: {
        primary: {
          main: '#4caf50',
          contrastText: 'white',
        },
      },
    });
    


    const handleDrawerToggle = () => {
      setCollapsed(!collapsed);
    };
  
    const fetchData = () => {
        fetch(apiUrl + "/admin/accounts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken")
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          })
          .catch((error) => console.error(error));
        };
        
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };  
   
    const hanldeEditAccount = (accountId, nameUser, email, password, role) => {
      navigate("/components/EditUser", {
        state: {
          accountId: accountId,
          nameUser: nameUser,
          email: email,
          password: password,
          role: role
        }
      });
    };
    
    const hanldeDeleteAccount = (id) => {
      setSelectedAccountId(id);
    };

    const hanldeMoreInfoAccount = (accountId, nameUser, email, role, url_activation, register_date, activated) => {
      navigate("/components/MoreInfoPage", {
        state: {
          accountId: accountId,
          nameUser: nameUser,
          email: email,
          role: role,
          url_activation:url_activation,
          register_date:register_date,
          activated:activated
        }
      });
    };
  

    useEffect(() => {
      if (accountId) {
        fetch(apiUrl + `/admin/accounts/${accountId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken")
          },
        })
          .then((response) => {
            if (response.ok) {
              setAccountId(null);
              navigate("/components/MoreInfoPage");
            }
          })
          .catch((error) => console.error(error));
      }
    }, [accountId, navigate]);

  
    useEffect(() => {
      if (selectedAccountId) {
        fetch(apiUrl + `/admin/accounts/${selectedAccountId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken")
          },
        })
          .then((response) => {
            if (response.ok) {
              fetchData();
              setSelectedAccountId(null);
              navigate("/components/AdminPage");
            }
          })
          .catch((error) => console.error(error));
      }
    }, [selectedAccountId, navigate]);
  
  
    return (
      <>
        <AdminSideMenu onDrawerToggle={handleDrawerToggle} />
        <Box ml={collapsed ? 3 : "240px"} >
        <Container maxWidth="xl" >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.key}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={item.accountId}>
                  {columns.map(column => (
                    <TableCell key={column.key}>{item[column.key]}</TableCell>
                  ))}
                  <TableCell>
                  <Box sx={{ display: 'flex' }}>

                    <Button 
                       onClick={() => hanldeEditAccount(item.accountId, item.nameUser, item.email, item.password, item.role)}  
                      variant="contained" color="primary"
                      style={{ width: "70px", marginRight:"10px" }}>
                        Edytuj
                     </Button>

                     <Button 
                      onClick={() => hanldeDeleteAccount(item.accountId)}  
                      variant="contained" color="error"
                      style={{ width: "70px", marginRight:"10px" }}>
                        Usuń
                     </Button>

                     <ThemeProvider theme={theme}>
                        <Button 
                          onClick={() => hanldeMoreInfoAccount(item.accountId, item.nameUser, item.email, item.role, item.url_activation, item.register_date, item.activated)}  
                          variant="contained" 
                          color="primary"
                          style={{ width: "70px", marginRight:"10px" }}
                        >
                          Więcej
                        </Button>
                    </ThemeProvider>

                     </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        </Container>
        </Box>
      </>
    );
  };
  
  export default Accounts;