import { Link as RouterLink } from "react-router-dom";
import { Box, Paper, Typography, Avatar, Link, Stack } from "@mui/material";

const PostCard = ({ post, currentUserId }) => {
  const author = post?.author;
  const authorName = author?.name || "Unknown";
  const createdAt = post?.createdAt?.slice(0, 10);
  const content = post?.content || "";

  // If it's the logged-in user's post, link to "/profile"
  const profileLink =
    currentUserId && author?._id === currentUserId
      ? "/profile"
      : `/profile/${author?._id}`;

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        transition: "0.3s ease",
        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-3px)",
        },
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 48,
            height: 48,
            fontWeight: "bold",
            fontSize: 20,
            mr: 2,
          }}
        >
          {authorName.charAt(0)}
        </Avatar>

        <Stack spacing={0.5}>
          <Link
            component={RouterLink}
            to={profileLink}
            underline="hover"
            color="text.primary"
            fontWeight="600"
            fontSize="1.05rem"
          >
            {authorName}
          </Link>
          <Typography variant="caption" color="text.secondary">
            Posted on <strong>{createdAt}</strong>
          </Typography>
        </Stack>
      </Box>

      {/* Content */}
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ whiteSpace: "pre-line", fontSize: "1.02rem", lineHeight: 1.7 }}
      >
        {content}
      </Typography>
    </Paper>
  );
};

export default PostCard;
