import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { t } from "i18next";
import Image from "next/image";
import { useSelector } from "react-redux";

const BiteFooter = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { configData } = useSelector((state) => state.configData);

  if (!configData) {
    return null;
  }

  return (
    <Box
      sx={{ backgroundColor: "#263471", color: "white", pt: 10, pb: 3, mt: 6 }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent={isSmall ? "center" : "space-between"}
          alignItems="center"
          flexDirection={isSmall ? "column" : "row"}
          textAlign={isSmall ? "left" : "left"}
        >
          {/* Logo Section */}
          <Box sx={{ width: "6rem", height: "6rem", mb: isSmall ? 3 : 0 }}>
            <Image
              src="/landingpage/logo-white.png"
              alt="Logo"
              width={300}
              height={300}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          {/* Links & Contact Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmall ? "column" : "row",
              gap: isSmall ? 2 : 4,
              width: isSmall ? "100%" : "70%",
              justifyContent: isSmall ? "center" : "space-between",
              alignItems: isSmall ? "center" : "flex-start",
            }}
          >
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Services
              </Typography>
              <Link
                href="/privacy"
                color="inherit"
                underline="hover"
                display="block"
              >
                {t("Privacy Policy")}
              </Link>
              <Link
                href="/terms"
                color="inherit"
                underline="hover"
                display="block"
              >
                {t("terms and conditions")}
              </Link>
              <Link
                href="/about"
                color="inherit"
                underline="hover"
                display="block"
              >
                {t(" About Us")}
              </Link>
            </Grid>

            {/* Contact Us Section */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                {t("Contact Us")}
              </Typography>
              <Typography variant="body1">📍 {configData.address}</Typography>
              <Typography variant="body1">📞 {configData.phone}</Typography>
              <Typography variant="body1">✉️ {configData.email} </Typography>
            </Grid>
          </Box>
        </Grid>

        {/* Download Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            alignItems: "center",
            gap: 2,
            justifyContent: isSmall ? "center" : "flex-end",
            width: isSmall ? "100%" : "60%",
            // border: "1px solid white",
            gap: 2,
            mt: 6,
          }}
        >
          <Box sx={{ width: "10rem", height: "3rem" }}>
            <Image
              src="/landingpage/app-blue.png"
              alt="App Store"
              width={800}
              height={800}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
            />
          </Box>

          <Box sx={{ width: "10rem", height: "3rem" }}>
            <Image
              src="/landingpage/play-blue.png"
              alt="Play Store"
              width={800}
              height={800}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
            />
          </Box>
        </Box>
      </Container>

      {/* Copyright */}
      <Typography textAlign="center" mt={6} variant="body2">
        {configData.cookies_text}
      </Typography>
    </Box>
  );
};

export default BiteFooter;
