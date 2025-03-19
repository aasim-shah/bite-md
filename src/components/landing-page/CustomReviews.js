import { Box, Typography, Grid, Paper, Rating, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const reviewsData = [
  {
    name: "John Doe",
    review: "Amazing service! The process was smooth and hassle-free.",
    rating: 5,
    bgImage: "/landingpage/review-bg-1.jpg",
  },
  {
    name: "Emily Smith",
    review: "Very professional and reliable. Highly recommended!",
    rating: 4.5,
    bgImage: "/landingpage/review-bg-2.jpg",
  },
  {
    name: "Michael Johnson",
    review: "A fantastic experience from start to finish!",
    rating: 5,
    bgImage: "/landingpage/review-bg-3.jpg",
  },
];

// Styled Card with Background Image
const ReviewCard = styled(Paper)(({ bgImage }) => ({
  padding: "2rem",
  alignItems: "center",
  borderRadius: "2rem",
}));

const CustomReviews = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundImage: `url(/landingpage/orange.png)`,

        py: "8rem",
        px: "2rem",
      }}
    >
      {/* Title */}
      <Typography variant="h4" color={"white"} fontWeight={700} mb={10}>
        Reviews
      </Typography>

      {/* Reviews Grid */}
      <Grid container spacing={4} justifyContent="center">
        {reviewsData.map((review, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <ReviewCard elevation={3} bgImage={review.bgImage}>
              <Typography
                variant="h6"
                color={theme.palette.blue}
                fontWeight={600}
                mb={1}
              >
                {review.name}
              </Typography>
              <Typography variant="body1" color={theme.palette.blue} mb={2}>
                {review.review}
              </Typography>
              <Rating value={review.rating} precision={0.5} readOnly />
            </ReviewCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomReviews;
