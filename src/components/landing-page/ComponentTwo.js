import {
  alpha,
  Box,
  Button,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomContainer from "../container";
import DownloadApps from "./DownloadApps";
import SolutionSvg from "./SolutionSvg";
import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";
import Image from "next/image";
import Link from "next/link";

export const ComponentTwoContainer = styled(Box)(
  ({ theme, paddingTop, paddingBottom }) => ({
    marginTop: ".6rem",
    paddingTop: paddingTop || "1.5rem",
    paddingBottom: paddingBottom || "1rem",
    background: `linear-gradient(180deg, ${alpha(
      theme.palette.primary.main,
      0
    )} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
  })
);

const ComponentTwo = ({ landingPageData }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CustomContainer>
      <CustomBoxFullWidth
        sx={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "82%",
          height: "20rem",
          minHeight: "20rem",
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundImage: "url(/landingpage/white-bg.png)",
            backgroundSize: "cover",
            position: "absolute",
            width: "100%",
            height: "30rem",
            left: 0,
            right: 0,
            alignItems: "center",
            top: "-17rem",
            borderRadius: "20px",
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: isSmall ? "100%" : "60%",
              padding: { xs: "1rem", sm: "2rem", md: "3rem" },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: theme.palette.blue,
                color: theme.palette.primary.contrastText,
                borderRadius: "20px",
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                fontWeight: 500,
                textTransform: "none",
                marginBottom: "1rem",
              }}
            >
              Download the app
            </Button>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.blue,
                fontWeight: 500,
                fontSize: "1.2rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Order anything and track in real-time with the app
            </Typography>

            <div
              style={{
                display: "flex",
                flexDirection: isSmall ? "column" : "row",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <Link
                href={landingPageData.download_user_app_links.playstore_url}
                style={{ width: "10rem", height: "3rem" }}
              >
                <Image
                  src="/landingpage/playstore.png"
                  alt="Playstore"
                  width={500}
                  style={{ width: "100%", height: "100%" }}
                  height={500}
                />
              </Link>
              <Link
                href={landingPageData.download_user_app_links.apple_store_url}
                style={{ width: "10rem", height: "3rem" }}
              >
                <Image
                  src="/landingpage/appstore.png"
                  alt="Appstore"
                  width={500}
                  style={{ width: "100%", height: "100%" }}
                  height={500}
                />
              </Link>
            </div>
          </Grid>

          {!isSmall && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                position: "relative",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "23rem",
                  top: "1rem",
                  left: "1rem",
                  zIndex: 10,
                }}
              >
                <Image
                  src="/landingpage/PHONE-1.png"
                  alt="Phone"
                  width={500}
                  style={{ width: "100%", height: "100%" }}
                  height={500}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  height: "14rem",
                  top: "30%",
                  right: "2rem",
                }}
              >
                <Image
                  src="/landingpage/image-1.png"
                  alt="Image"
                  width={500}
                  style={{ width: "100%", height: "100%" }}
                  height={500}
                />
              </div>
            </div>
          )}
        </div>
      </CustomBoxFullWidth>
    </CustomContainer>
  );
};

export default ComponentTwo;
