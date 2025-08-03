import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'grey.300',
        textAlign: 'center',
        py: 2,
        mt: 10,
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} <strong>ConnectIn</strong>. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
