import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    CircularProgress,
    Card,
    Divider,
    Paper,
    Avatar,
    Box,
    Stack,
} from "@mui/material";
import { getMe } from "../api/auth";
import PostCard from "../components/PostCard";
import { useTheme } from "@mui/material/styles";

const MyProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMe();
                setUserData(res.data);
            } catch (err) {
                console.error("Failed to load profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Container sx={{ mt: 10, textAlign: "center" }}>
                <CircularProgress size={40} color="primary" />
            </Container>
        );
    }

    const { user, posts } = userData;

    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <Card
                elevation={4}
                sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    textAlign={{ xs: "center", sm: "left" }}
                >
                    <Avatar
                        src={user.avatar || ""}
                        alt={user.name}
                        sx={{ width: 72, height: 72, fontSize: 28, bgcolor: "primary.main" }}
                    >
                        {user.name?.[0]}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight={600}>
                            {user.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {user.email}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={1}
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {user.bio || "No bio available"}
                        </Typography>

                    </Box>
                </Stack>
            </Card>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: "primary.main" }}>
                My Posts
            </Typography>

            {posts.length === 0 ? (
                <Paper
                    elevation={2}
                    sx={{ p: 4, textAlign: "center", borderRadius: 2 }}
                >
                    <Typography variant="body1">You haven’t posted anything yet.</Typography>
                </Paper>
            ) : (
                <Stack spacing={3}>
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} currentUserId={user._id} />
                    ))}
                </Stack>
            )}
        </Container>
    );
};

export default MyProfile;
