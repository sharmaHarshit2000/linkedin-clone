import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Avatar,
    Tooltip,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    AddCircleOutline,
    Login as LoginIcon,
    Logout as LogoutIcon,
    LightMode,
    DarkMode,
    Menu as MenuIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Header = ({ toggleTheme, mode }) => {
    const { user, setUser } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        handleClose();
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary" elevation={3}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}
                >
                    ConnectIn
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={toggleTheme} color="inherit">
                        {mode === 'light' ? <DarkMode /> : <LightMode />}
                    </IconButton>

                    {user ? (
                        isMobile ? (
                            <>
                                <Tooltip title={user.username}>
                                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Tooltip>

                                <IconButton onClick={handleMenu} color="inherit">
                                    <MenuIcon />
                                </IconButton>

                                {isMobile && anchorEl && (
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem component={Link} to="/profile" onClick={handleClose}>
                                            <PersonIcon sx={{ mr: 1 }} /> My Profile
                                        </MenuItem>
                                        <MenuItem component={Link} to="/create-post" onClick={handleClose}>
                                            <AddCircleOutline sx={{ mr: 1 }} /> Create Post
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <LogoutIcon sx={{ mr: 1 }} /> Logout
                                        </MenuItem>
                                    </Menu>
                                )}

                            </>
                        ) : (
                            <>
                                <Tooltip title={user.username}>
                                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Tooltip>

                                <Button
                                    component={Link}
                                    to="/profile"
                                    sx={{ color: 'inherit', textTransform: 'none' }}
                                >
                                    My Profile
                                </Button>

                                <Button
                                    component={Link}
                                    to="/create-post"
                                    startIcon={<AddCircleOutline />}
                                    sx={{ color: 'inherit', textTransform: 'none' }}
                                >
                                    Create Post
                                </Button>

                                <Button
                                    onClick={handleLogout}
                                    startIcon={<LogoutIcon />}
                                    sx={{ color: 'inherit', textTransform: 'none' }}
                                >
                                    Logout
                                </Button>
                            </>
                        )
                    ) : (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                startIcon={<LoginIcon />}
                                sx={{ color: 'inherit', textTransform: 'none' }}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                to="/register"
                                sx={{ color: 'inherit', textTransform: 'none' }}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
