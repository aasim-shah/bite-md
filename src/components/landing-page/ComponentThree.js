import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

const cardData = [
  {
    title: "We make grocery delivery more interesting.",
    descriptions: [
      "Find the best deals from restaurants near you.",
      "Natural products. Bring nature into your home.",
      "Stay home and receive your daily essentials from our store.",
      "Start your daily shopping with BITE.",
    ],
    buttonText: "See Restaurants",
    imageSrc: "/landingpage/food.png",
  },
  {
    title: "BITE makes shopping easier!",
    descriptions: [
      "From local markets to big supermarkets – all in one place.",
      "Fresh produce, staple foods, and everything you need – delivered to you.",
      "Shop online, receive without stress!",
      "At home, at the office, or wherever you need – BITE comes to you",
    ],
    buttonText: "Shop Now",
    imageSrc: "/landingpage/food-1.png",
  },
  {
    title: "Pharmacy services for your health.",
    descriptions: [
      "Pharmacy is the science and technique of preparing and distributing medicines.",
      "Also offering additional clinical services such as vaccinations.",
      "Health screenings and advice for quitting smoking.",
      "Managing conditions like diabetes and asthma.",
    ],
    buttonText: "Order Now",
    imageSrc: "/landingpage/food-2.png",
  },
];

const ComponentThree = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box sx={{ padding: "0px" }}>
      <Box
        sx={{
          backgroundColor: theme.palette.cream,
          borderRadius: "3rem",
          padding: { xs: "2rem", md: "4rem" },
          display: "flex",
          flexDirection: "column",
          color: theme.palette.blue,
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          margin: "0px",
        }}
      >
        {cardData.map((card, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              maxWidth: "1000px",
              marginTop: { xs: "2rem", sm: "3rem", md: "4rem" },
            }}
          >
            <Grid
              container
              spacing={4}
              alignItems="center"
              direction={
                isSmall
                  ? "column-reverse"
                  : index % 2 === 0
                  ? "row"
                  : "row-reverse"
              }
            >
              {/* Left Side - Texts */}
              <Grid item xs={12} md={6} textAlign={isSmall ? "center" : "left"}>
                <Typography
                  variant={isSmall ? "h6" : "h5"}
                  fontWeight={600}
                  mb={2}
                >
                  {card.title}
                </Typography>
                {card.descriptions.map((desc, idx) => (
                  <Typography key={idx} variant="body1" mb={1}>
                    {desc}
                  </Typography>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    padding: { xs: "0.6rem 1.5rem", sm: "0.8rem 2rem" },
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    mt: 2,
                  }}
                >
                  {card.buttonText}
                </Button>
              </Grid>

              {/* Right Side - Image */}
              <Grid item xs={12} md={6} display="flex" justifyContent="center">
                <Box
                  sx={{
                    width: isSmall ? "100%" : isTablet ? "80%" : "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    width={400}
                    height={300}
                    style={{
                      borderRadius: "2rem",
                      objectFit: "cover",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ComponentThree;
