import React, {useContext, useEffect} from 'react';
import {authContext} from '../../Components/Contexts'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../Components/Logo';
import colors from '../../Config/theme/colors';
import fonts from '../../Config/theme/fonts';
import {NavLink, useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import BASEURL from '../../Config/baseUrl'
import styled from 'styled-components';
import pxToRem from '../../Services/pxToRem';

const pages = [
  {id: 1, name: 'Accueil', link: '/'},
  {id: 2, name: 'Calendrier de plantation', link: '/calendrier'}
];

const NavLinkDesk = styled(NavLink).attrs((/* props */) => ({ tabIndex: 0 }))`
    margin: 3rem 0rem 3rem 2.5rem;
    padding: 1rem 0rem;
    color: ${colors.primary}; 
    text-decoration: none; 
    font-size: ${fonts.size.itemMenu}; 

    &:hover{ 
      color: ${colors.secondary};
      background: "none";
    }

    &.active{
      border-bottom: ${pxToRem(4)} solid;
      border-color: ${colors.secondary};
    }
  `;

const NavLinkProfil = styled(NavLink).attrs(() => ({ tabIndex: 0 }))`
  margin-right:${pxToRem(25)};
  padding: 1rem 0;
  color: ${colors.primary}; 
  text-decoration: none; 
  font-size: ${fonts.size.itemMenu};

  &:hover{ 
    color: ${colors.secondary};
    background: "none";
  }

  &.active{
    border-bottom: ${pxToRem(4)} solid;
    border-color: ${colors.secondary};
  }
`;

const Navbar = () => {
  const navigate = useNavigate()
  const { auth, resetContextData } = useContext(authContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  // const token = localStorage.getItem('token');
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const logOut = () => {
    resetContextData();
    navigate('/')
  }

  // const goToAdminpage = async () => {
  //   const id = localStorage.getItem('id');
  //   const token = localStorage.getItem('token');
  //   await axios.get(`${BASEURL}/users/${id}`, 
  //   {
  //     id: id
  //   }, 
  //   {headers: {'Authorization': `Bearer ${token}`}}).then((res) => {
  //         if(res.data.user.role === "admin"){
  //       navigate('/back-office')
  //   }else {
  //     navigate("/")
  //   }
  //   })
  // }

  useEffect(() => {
  }, [auth])

  return (
    <AppBar position="static" style={{ background: '#FFFFFF', paddingTop:'0.5rem', paddingBottom: 'o.5rem'}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Logo />
        </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color= "default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              {pages.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <NavLink to={page.link} end
                            key={page.id}
                            style={({ isActive }) => ({
                              color: isActive ? colors.secondary : colors.primary,
                              textDecoration:'none',
                      })}>
                     {page.name}
                    </NavLink>
                  </MenuItem>
                ))}
                  <MenuItem onClick={handleCloseNavMenu}>
                    {auth?.user?.role === "user" || role === "user" ?  
                        <NavLink to="/mon-potager" end
                        style={({ isActive }) => ({
                          color: isActive ? colors.secondary : colors.primary,
                          textDecoration:'none',
                        })}>
                            Mon potager
                        </NavLink>
                        : 
                        null
                    }
                  </MenuItem>
            </Menu>
          </Box>
          <Typography  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Logo />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLinkDesk
                to={page.link} end
                key={page.id}
              >
                {page.name}
              </NavLinkDesk>
            ))}
            {auth?.user?.role === "user" || role === "user" ?
                <NavLinkDesk to="/mon-potager" end >
                    Mon potager
                </NavLinkDesk>
                : 
                null
            }
          </Box>

          <Box sx={{ flexGrow: 0 , display:'flex', alignItems:'baseline'}}>
            <Tooltip title="Mon profil" >

              { name ?
                <NavLinkProfil to="/mon-profil" >
                  <Box sx={{textAlign:'center'}}>
                    <img src="/images/avatar.png" alt=""/>
                  </Box>
                  {name}
                </NavLinkProfil>

              :      
              <NavLink to="/connexion" disableripple onClick={handleOpenUserMenu} sx={{ p: 0, "&:hover":{ background: "none" } }}>
                <Typography sx={{ color: colors.primary, ml: 1 }}>Se connecter / Créer un compte</Typography>
              </NavLink>
              }
            </Tooltip>

            {auth?.user?.role === "admin" || role === "admin" ? 
                <NavLinkDesk to="/back-office" end >Back office</NavLinkDesk> 
                : 
                null
            }

            {name && <Button sx={{color: colors.secondary, p:0, display:'flex', ml:6}} onClick={logOut}>Déconnexion<LogoutIcon sx={{cursor:"pointer", ml:1, color: colors.primary}}/></Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;