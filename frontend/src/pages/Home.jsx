import { useEffect, useState } from "react";
import { fetchAllPosts } from "../api/post";
import PostCard from "../components/PostCard";
import { CircularProgress, Box, Typography, Paper, useTheme } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const theme = useTheme()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetchAllPosts();
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box
      minHeight="100vh"
      py={6}
      px={2}
      sx={{ bgcolor: "background.default" }}
    >
      <Box maxWidth="md" mx="auto">
        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.primary.main,
            color: theme.palette.mode === "dark"
              ? theme.palette.text.primary
              : "#fff",
            border: theme.palette.mode === "dark" ? "1px solid #444" : "none",
          }}

        >
          <Typography variant="h4" fontWeight="bold">
            ConnectIn Feed
          </Typography>
          <Typography variant="subtitle2" mt={1}>
            See what your network is talking about
          </Typography>
        </Paper>

        {/* Loader or Posts */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={150}>
            <CircularProgress size={32} />
          </Box>
        ) : posts.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" fontSize="1.1rem">
            No posts available.
          </Typography>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} currentUserId={user?._id} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default Home;
