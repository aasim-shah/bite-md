import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

const earnMoneyData = [
  {
    imageSrc: "/landingpage/vendor-1.png",
    title: "Become a Courier",
    buttonText: "Register here",
  },
  {
    imageSrc: "/landingpage/vendor-2.png",
    title: "Become a Partner",
    buttonText: "Register here",
  },
];

const EarnMoney = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: { xs: "3rem", md: "5rem" }, // Ensures proper spacing on small screens
      }}
    >
      <Box
        sx={{
          //   backgroundColor: "#263471",
          width: { xs: "90%", sm: "75%", md: "100%" },
          padding: { xs: "2rem", sm: "3rem", md: "4rem" },
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography variant="h4" color="white" fontWeight={700} mb={4}>
          Earn Money
        </Typography>

        {/* Cards Section */}
        <Grid container spacing={4} justifyContent="center">
          {earnMoneyData.map((item, index) => (
            <Grid key={index} item xs={12} sm={8} md={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Box
                  sx={{ width: "140px", height: "140px", position: "relative" }}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    style={{ objectFit: "contain", borderRadius: "10px" }}
                  />
                </Box>
                <Typography color="white" variant="h6" fontWeight={600} mb={2}>
                  {item.title}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "20px", padding: "0.8rem 2rem" }}
                >
                  {item.buttonText}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EarnMoney;
