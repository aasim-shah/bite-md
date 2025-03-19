import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  alpha,
  Button,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import { IsSmallScreen } from "utils/CommonValues";
import CustomContainer from "../container";
import DollarSignHighlighter from "../DollarSignHighlighter";
import DeliveryImage from "./svg-components/deliveryImage";
import HeroLocationForm from "./hero-section/HeroLocationForm";
import PlaceSuggestionInput from "./hero-section/places-suggestions";
import CardsSection from "./module-cards";

export const CustomButton = styled(Button)(({ theme, boxshadow }) => ({
  backgroundColor: theme.palette.primary.main,
  //   width: "150px",
  height: "45px",
  borderRadius: "30px",
  boxShadow: "0px 4px 60px rgba(3, 157, 85, 0.2)",
  color: theme.palette.whiteContainer.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: theme.palette.primary.deep,
  },
  [theme.breakpoints.down("sm")]: {
    // width: "130px",
    height: "35px",
    marginTop: "-2px",
  },
}));
const ComponentOne = ({ landingPageData, configData, handleOrderNow }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(landingPageData?.company_button_url);
  };
  return (
    <>
      <CustomContainer>
        <CustomBoxFullWidth
          sx={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
            marginBottom: ".1rem",
            height: "55rem",
            minHeight: "55rem",
            display: "flex",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFF7EA",
              width: "80%",
              height: "55rem",
              margin: " auto",
              position: "absolute",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              top: "-10rem",
              borderRadius: "20px",
              display: "flex",
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                display: "flex",
                width: "70%",
                padding: { xs: "1rem", sm: "2rem", md: "3rem" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.blue,
                  fontWeight: 900,
                  marginTop: "3rem",
                  fontSize: "1.3rem",
                }}
              >
                Your order starts here!
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.blue,
                  fontWeight: 500,
                  fontSize: ".7rem",
                  marginTop: "1rem",
                }}
              >
                Meal at your door, in your style!
              </Typography>
            </Grid>

            <HeroLocationForm />
            {/* <PlaceSuggestionInput /> */}

            <div>
              <CardsSection />
            </div>
          </div>
        </CustomBoxFullWidth>
      </CustomContainer>
    </>
  );
};

ComponentOne.propTypes = {};

export default ComponentOne;
