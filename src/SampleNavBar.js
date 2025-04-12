import React from 'react';
import { Link } from 'react-router-dom';
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
import SchoolIcon from '@mui/icons-material/School';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { alpha } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const pages = [
  { label: 'Home', path: '/' },
  { label: 'Attendance by L-T-P-S', path: '/calbyltps' },
  { label: 'Attendance When Absent', path: '/total' },
  { label: 'Subject Attendance', path: '/calc3' }
];

const socialLinks = [
  { 
    icon: <GitHubIcon />, 
    name: 'GitHub',
    url: 'https://github.com/likithkandepu13' 
  },
  { 
    icon: <LinkedInIcon />, 
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/likithkandepu13' 
  },
  { 
    icon: <EmailIcon />, 
    name: 'Contact',
    url: 'mailto:withlikith@gmail.com' 
  },
  { 
    icon: <PersonIcon />, 
    name: 'About Me',
    url: 'https://likithkandepu.netlify.app/' 
  }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isSpeedDialOpen, setSpeedDialOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleSpeedDialOpen = () => setSpeedDialOpen(true);
  const handleSpeedDialClose = () => setSpeedDialOpen(false);

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: `linear-gradient(145deg, #a51c24 0%, #8a1820 100%)`,
        boxShadow: '0 4px 20px rgba(165, 28, 36, 0.15)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: '64px', md: '75px' } }}>
          <SchoolIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 2,
              fontSize: '2.2rem',
              filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))',
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-5px)' }
              }
            }} 
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Poppins", "Segoe UI", "Roboto"',
              fontWeight: 700,
              letterSpacing: '.15rem',
              color: 'inherit',
              textDecoration: 'none',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px) scale(1.02)',
                textShadow: '2px 4px 6px rgba(0, 0, 0, 0.3)'
              }
            }}
          >
            KL University
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: alpha('#fff', 0.15)
                }
              }}
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
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  mt: 1.5,
                  border: '1px solid rgba(255, 255, 255, 0.18)'
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.path} 
                  component={Link} 
                  to={page.path} 
                  onClick={handleCloseNavMenu}
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha('#a51c24', 0.08),
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#333',
                      fontWeight: 500
                    }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <SchoolIcon 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1, 
              fontSize: '2rem',
              filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '1.3rem',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
            }}
          >
            Let's Cal!
          </Typography>

          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center',
            gap: 1
          }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 1,
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: 600,
                  position: 'relative',
                  padding: '6px 16px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    transform: 'translateY(-2px)',
                    '&::after': {
                      width: '100%',
                      opacity: 1
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0%',
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease',
                    opacity: 0,
                    borderRadius: '2px'
                  }
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {/* Social Links for Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {socialLinks.map((link) => (
                <Tooltip 
                  key={link.name}
                  title={link.name}
                  arrow
                >
                  <IconButton
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        backgroundColor: alpha('#fff', 0.15)
                      }
                    }}
                  >
                    {link.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            {/* SpeedDial for Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, position: 'relative' }}>
              <SpeedDial
                ariaLabel="Social Links SpeedDial"
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  '& .MuiFab-primary': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.15)
                    }
                  }
                }}
                icon={<SpeedDialIcon />}
                onClose={handleSpeedDialClose}
                onOpen={handleSpeedDialOpen}
                open={isSpeedDialOpen}
                direction="down"
              >
                {socialLinks.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                      window.open(action.url, '_blank');
                      handleSpeedDialClose();
                    }}
                    sx={{
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: alpha('#a51c24', 0.1)
                      }
                    }}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;