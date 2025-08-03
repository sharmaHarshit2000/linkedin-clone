import { Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '100px' }}>
      <Box>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 100, mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Sorry, the page you're looking for doesn't exist.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
