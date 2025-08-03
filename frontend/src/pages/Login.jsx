import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await loginUser(form);
            localStorage.setItem("token", data.token);
            toast.success(data.message || 'Login successful');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Automatically trigger login if form has guest credentials
    useEffect(() => {
        if (form.email === 'h@gmail.com' && form.password === '123456') {
            handleSubmit(new Event('submit'));
        }
    }, [form]);

    const handleGuestLogin = () => {
        setForm({ email: 'h@gmail.com', password: '123456' });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10 }}>
                <Card elevation={3}>
                    <CardHeader
                        title="Login"
                        slotProps={{
                            title: {
                                align: 'center',
                                variant: 'h5',
                                sx: {
                                    fontWeight: 'bold',
                                },
                            },
                        }}
                        sx={{ backgroundColor: 'primary.main', color: 'white' }}
                    />
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={handleChange}
                                required
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{ mt: 2, fontWeight: 'bold', }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={handleGuestLogin}
                                sx={{
                                    mt: 2,
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'error.dark',
                                        color: 'white',
                                    },
                                }}
                            >
                                Login as Guest
                            </Button>
                        </form>

                        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                            Don’t have an account?{' '}
                            <MuiLink component={Link} to="/register">
                                Register
                            </MuiLink>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Login;
