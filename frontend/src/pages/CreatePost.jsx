import { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { createPost } from "../api/post";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Post cannot be empty");
    setLoading(true);
    try {
      await createPost({ content });
      toast.success("Post created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AddCircleOutline color="primary" />
          <Typography variant="h5" fontWeight="bold">Create New Post</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            multiline
            fullWidth
            rows={5}
            variant="outlined"
            label="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreatePost;
