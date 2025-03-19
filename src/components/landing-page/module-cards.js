import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";

const cardsData = [
  { image: "/landingpage/module1.png", title: "Groceries" },
  { image: "/landingpage/module2.png", title: "Food" },
  { image: "/landingpage/module3.png", title: "Pharmacy" },
];

const CardsSection = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ textAlign: "center", py: "4rem", px: "2rem" }}>
      <Grid container spacing={isSmall ? 2 : 4} justifyContent="center">
        {cardsData.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Box
              sx={{
                width: isSmall ? "100%" : "240px",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: isSmall ? "90px" : "120px",
                  height: isSmall ? "90px" : "120px",
                  position: "relative",
                  mb: 2,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={400}
                  height={400}
                  style={{ height: "100%", width: "100%" }}
                />
              </Box>
              <Typography
                variant={isSmall ? "body1" : "h6"}
                color={theme.palette.blue}
                fontWeight={600}
              >
                {card.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardsSection;
