import { Avatar, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "utils/CustomFunctions";
import useGetModule from "../../../api-manage/hooks/react-query/useGetModule";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { setModules } from "../../../redux/slices/configData";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import AddressReselect from "../top-navbar/address-reselect/AddressReselect";
import DrawerMenu from "../top-navbar/drawer-menu/DrawerMenu";
import MobileModuleSelection from "./mobile-module-select";
import LogoSide from "components/logo/LogoSide";

const ModuleWiseNav = (props) => {
  const {
    router,
    configData,
    token,
    setToggled,
    location,
    setOpenSignIn,
    setModalFor,
  } = props;

  const { modules } = useSelector((state) => state.configData);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, refetch } = useGetModule();
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const profileImageUrl = `${getImageUrl(
    profileInfo?.storage,
    "customer_image_url",
    configData
  )}/${profileInfo?.image}`;
  const favIcon = configData?.logo_full_url;
  const lanDirection = getLanguage();
  const dispatch = useDispatch();
  useEffect(() => {
    if (modules?.length === 0) {
      refetch();
      //dispatch(setModules(data));
    }
  }, [modules]);
  useEffect(() => {
    if (data?.length > 0) {
      dispatch(setModules(data));
    }
  }, [data]);
  const handleProfileClick = () => {
    if (token) {
      router.push(
        { pathname: "/profile", query: { page: "profile-settings" } },
        undefined,
        { shallow: true }
      );
    } else {
      setModalFor("sign-in");
      setOpenSignIn(true);
    }
  };

  const handleFlexendSide = () => (
    <CustomStackFullWidth
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Avatar
        src={profileImageUrl}
        sx={{ width: 18, height: 18, cursor: "pointer" }}
        onClick={handleProfileClick}
      />
      <DrawerMenu
        setToggled={setToggled}
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
      />
    </CustomStackFullWidth>
  );
  const handleIconClick = () => {
    if (location) {
      router.push("/home");
    } else {
      router.push("/");
    }
  };
  const getIcon = () => (
    <Box
      onClick={handleIconClick}
      sx={{
        height: "40px",
        position: "relative",
        cursor: "pointer",
        "& img": {
          maxHeight: "100%",
        },
      }}
    >
      <CustomImageContainer
        src={favIcon}
        alt="Background"
        height="100%"
        width="100%"
        objectFit="cover"
      />
    </Box>
  );
  return (
    <CustomStackFullWidth>
      {!!modules && (
        <Grid container alignItems="center">
          <Grid
            item
            xs={10}
            align={
              lanDirection
                ? lanDirection === "ltr"
                  ? "left"
                  : "right"
                : "left"
            }
            container
          >
            <CustomBoxFullWidth>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid padding={1} item xs={2} sm={2}>
                  {router.pathname === "/home" && !router.query.search ? (
                    modules.length >= 2 ? (
                      <MobileModuleSelection />
                    ) : (
                      <LogoSide
                        width="200px"
                        height="50px"
                        configData={configData}
                        objectFit="contain"
                      />
                    )
                  ) : (
                    <LogoSide
                      width="200px"
                      height="40px"
                      configData={configData}
                      objectFit="contain"
                    />
                  )}
                </Grid>
                {location ? (
                  <Grid item xs={8} sm={8} align="left">
                    <AddressReselect
                      setOpenDrawer={setOpenDrawer}
                      location={location}
                      openDrawer={openDrawer}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={10} sm={11}></Grid>
                )}
              </Grid>
            </CustomBoxFullWidth>
          </Grid>
          <Grid item xs={2} align="right">
            {handleFlexendSide()}
          </Grid>
        </Grid>
      )}
    </CustomStackFullWidth>
  );
};

ModuleWiseNav.propTypes = {};

export default React.memo(ModuleWiseNav);
