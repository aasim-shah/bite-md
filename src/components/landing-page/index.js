import { NoSsr, useMediaQuery, useTheme } from "@mui/material";
import AvailableZoneSection from "components/landing-page/AvailableZoneSection";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import CookiesConsent from "../CookiesConsent";
import PushNotificationLayout from "../PushNotificationLayout";
import AppDownloadSection from "./app-download-section/index";
import Banners from "./Banners";
import ComponentOne from "./ComponentOne";
import ComponentTwo from "./ComponentTwo";
import DiscountBanner from "./DiscountBanner";
import HeroSection from "./hero-section/HeroSection";
import Registration from "./Registration";
import BGimage from "./bg-img";
import Link from "next/link";
import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
import HeroLocationForm from "./hero-section/HeroLocationForm";
import ComponentThree from "./ComponentThree";
import EarnMoney from "./EarnMoney";
import CustomReviews from "./CustomReviews";
const MapModal = dynamic(() => import("../Map/MapModal"));
const LandingPage = ({ configData, landingPageData }) => {
  const Testimonials = dynamic(() => import("./Testimonials"), {
    ssr: false,
  });
  const [location, setLocation] = useState(undefined);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    isGeolocationEnabled: true,
  });
  useEffect(() => {
    setLocation(JSON.stringify(localStorage.getItem("location")));
  }, []);
  const handleClose = () => {
    const location = localStorage.getItem("location");
    const isModuleExist = localStorage.getItem("module");
    if (location) {
      isModuleExist && setOpen(false);
    } else {
    }
  };
  const router = useRouter();
  const handleOrderNow = () => {
    if (location) {
      if (location === "null") {
        setOpen(true);
      } else {
        router.push("/home", undefined, { shallow: true });
      }
    } else {
      setOpen(true);
    }
  };

  console.log({ landingPageData });

  return (
    <>
      <PushNotificationLayout>
        {/* <HeroSection
          configData={configData}
          landingPageData={landingPageData}
          handleOrderNow={handleOrderNow}
        /> */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            backgroundImage: "url(/landingpage/bg-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "33rem",
            height: "33rem",
          }}
        >
          <div style={{ position: "absolute", top: "30%", left: "13%" }}>
            <p style={{ color: "white", fontSize: "1.3rem", fontWeight: 900 }}>
              {landingPageData.header_title}
            </p>
            <p style={{ color: "#273472", fontSize: "1rem", fontWeight: 700 }}>
              {landingPageData.header_sub_title}
            </p>
          </div>
        </div>

        <ComponentOne
          landingPageData={landingPageData}
          configData={configData}
          handleOrderNow={handleOrderNow}
        />
        {/* {landingPageData?.promotion_banners?.length > 0 ? (
          <Banners landingPageData={landingPageData} isSmall={isSmall} />
        ) : null} */}
        <ComponentTwo
          configData={configData}
          landingPageData={landingPageData}
        />
        {/* {landingPageData?.available_zone_status === 1 &&
        landingPageData?.available_zone_list?.length > 0 ? (
          <AvailableZoneSection landingPageData={landingPageData} />
        ) : null} */}

        {/* {landingPageData?.fixed_promotional_banner_full_url ? (
          <DiscountBanner
            bannerImage={landingPageData?.fixed_promotional_banner_full_url}
            isSmall={isSmall}
          />
        ) : null} */}
        {/* {landingPageData?.business_title ||
        landingPageData?.business_sub_title ||
        landingPageData?.business_image ? (
          <AppDownloadSection
            configData={configData}
            landingPageData={landingPageData}
          />
        ) : null} */}

        <div
          style={{
            backgroundColor: "#263471",
            padding: "0px",
            width: "75%",
            borderRadius: "3rem",
            marginTop: "0px",
            margin: "auto",
          }}
        >
          <ComponentThree />

          {/* <EarnMoney /> */}

          {/* {landingPageData?.earning_seller_status ||
          landingPageData?.earning_dm_status ? ( */}
          {landingPageData?.earning_title &&
            landingPageData.earning_sub_title && (
              <EarnMoney
                configData={configData}
                data={landingPageData}
                isSmall={isSmall}
              />
            )}

          {/* <CustomReviews /> */}
          {landingPageData?.testimonial_list?.length > 0 ? (
            // <Testimonials landingPageData={landingPageData} isSmall={isSmall} />
            <CustomReviews data={landingPageData} isSmall={isSmall} />
          ) : null}
        </div>

        {open && (
          <MapModal
            open={open}
            handleClose={handleClose}
            coords={coords}
            disableAutoFocus
          />
        )}
        {/* <NoSsr>
          <CookiesConsent text={configData?.cookies_text} />
        </NoSsr> */}
      </PushNotificationLayout>
    </>
  );
};

export default LandingPage;
