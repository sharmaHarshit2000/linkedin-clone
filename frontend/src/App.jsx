import { Box, Container, } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const NotFound = lazy(() => import('./pages/NotFound'));


const App = ({ toggleTheme, mode }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header toggleTheme={toggleTheme} mode={mode} />

      <Box component="main" flexGrow={1} py={4}>
        <Container maxWidth="md">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/:id" element={<UserProfile />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default App;
