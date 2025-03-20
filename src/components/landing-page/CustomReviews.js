import { Box, Typography, Grid, Paper, Rating, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { t } from "i18next";
import { useEffect, useState } from "react";

// Styled Card with Background Image
const ReviewCard = styled(Paper)(({ bgImage }) => ({
  padding: "2rem",
  alignItems: "center",
  borderRadius: "2rem",
}));

const CustomReviews = (data, isSmall) => {
  const theme = useTheme();
  const [testimonial_list, setTestimonial_list] = useState([]);

  useEffect(() => {
    if (data.data && data.data.testimonial_list.length > 0) {
      setTestimonial_list(data.data.testimonial_list);
    }
  }, [data]);

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundImage: `url(/landingpage/orange.png)`,
        backgroundSize: "cover",
        py: "8rem",
        px: "2rem",
      }}
    >
      {/* Title */}
      <Typography variant="h4" color={"white"} fontWeight={700} mb={10}>
        {t("Reviews")}
      </Typography>

      {/* Reviews Grid */}
      <Grid container spacing={4} justifyContent="center">
        {testimonial_list.map((review, index) => (
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
              <Rating value={5} precision={0.5} readOnly />
            </ReviewCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomReviews;
