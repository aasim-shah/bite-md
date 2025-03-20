import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const EarnMoney = ({ configData, data, isSmall }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.log({ earningData: data });

  const earnMoneyData = [
    {
      imageSrc: "/landingpage/vendor-1.png",
      title: data.earning_seller_title,
      buttonText: data.earning_seller_button_name,
      link: data.earning_seller_button_url,
    },
    {
      imageSrc: "/landingpage/vendor-2.png",
      title: data.earning_dm_title,
      buttonText: data.earning_dm_button_name,
      link: data.earning_dm_button_url,
    },
  ];

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
          {data.earning_title}
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
                <Link
                  href={item.link}
                  style={{
                    textDecoration: "none",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: "20px",
                    padding: ".5rem 1.5rem",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    textTransform: "none",
                    marginBottom: "1rem",
                  }}
                >
                  {item.buttonText}
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EarnMoney;
