import React, { useEffect, useRef, useState } from "react";
import {
  alpha,
  Avatar,
  IconButton,
  NoSsr,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import LogoSide from "../../logo/LogoSide";
import NavLinks from "./NavLinks";
import { t } from "i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import NavBarIcon from "./NavBarIcon";
import { useDispatch, useSelector } from "react-redux";
import AccountPopover from "./account-popover";
import CardView from "../../added-cart-view";
import CustomContainer from "../../container";
import { getCartListModuleWise } from "helper-functions/getCartListModuleWise";
import ModuleWiseNav from "./ModuleWiseNav";
import WishListCardView from "../../wishlist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useGetAllCartList from "../../../api-manage/hooks/react-query/add-cart/useGetAllCartList";
import { setCartList } from "redux/slices/cart";
import { clearOfflinePaymentInfo } from "redux/slices/offlinePaymentData";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { getModule } from "helper-functions/getLanguage";
import { handleProductValueWithOutDiscount } from "utils/CustomFunctions";
import useGetGuest from "../../../api-manage/hooks/react-query/guest/useGetGuest";
import ThemeSwitches from "../top-navbar/ThemeSwitches";
import CallToAdmin from "../../CallToAdmin";
import CustomLanguage from "../top-navbar/language/CustomLanguage";
import { NavLinkStyle, SignInButton } from "components/header/NavBar.style";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import dynamic from "next/dynamic";
import Link from "next/link";
import NewNavBar from "./navv-bar";
const AuthModal = dynamic(() => import("components/auth/AuthModal"));
const Cart = ({ isLoading }) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleIconClick = () => {
    setSideDrawerOpen(true);
  };
  return (
    <>
      <NavBarIcon
        icon={<ShoppingCartOutlinedIcon sx={{ fontSize: "22px" }} />}
        label={t("Cart")}
        user="false"
        handleClick={handleIconClick}
        badgeCount={
          getCartListModuleWise(cartList)?.length > 0
            ? getCartListModuleWise(cartList).length
            : null // or use `0` if you want the badge to show as "0"
        }
      />
      {!!sideDrawerOpen && (
        <CardView
          isLoading={isLoading}
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          cartList={cartList}
        />
      )}
    </>
  );
};
const WishListSideBar = ({ totalWishList }) => {
  const [wishListSideDrawerOpen, setWishListSideDrawerOpen] = useState(false);
  const handleIconClick = () => {
    setWishListSideDrawerOpen(true);
  };
  return (
    <>
      <NavBarIcon
        icon={<FavoriteBorderIcon sx={{ fontSize: "22px" }} />}
        label={t("WishList")}
        user="false"
        handleClick={handleIconClick}
        badgeCount={totalWishList > 0 ? totalWishList : null}
      />

      {!!wishListSideDrawerOpen && (
        <WishListCardView
          sideDrawerOpen={wishListSideDrawerOpen}
          setSideDrawerOpen={setWishListSideDrawerOpen}
        />
      )}
    </>
  );
};

export const getSelectedVariations = (variations) => {
  let selectedItem = [];
  if (variations?.length > 0) {
    variations?.forEach((item, index) => {
      item?.values?.forEach((value, optionIndex) => {
        if (value?.isSelected) {
          const itemObj = {
            choiceIndex: index,
            isSelected: value?.isSelected,
            label: value?.label,
            optionIndex: optionIndex,
            optionPrice: value?.optionPrice,
            // type:item?.
          };
          selectedItem.push(itemObj);
        }
      });
    });
  }
  return selectedItem;
};
const getOtherModuleVariation = (itemVariations, selectedVariation) => {
  let selectedItem = [];
  itemVariations?.forEach((item) => {
    selectedVariation?.forEach((sVari) => {
      if (sVari?.type === item?.type) {
        selectedItem.push(item);
      }
    });
  });

  return selectedItem;
};
const SecondNavBar = ({ configData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartList } = useSelector((state) => state.cart);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const { offlineInfoStep } = useSelector((state) => state.offlinePayment);
  const { countryCode, language } = useSelector((state) => state.configData);
  const isSmall = useMediaQuery("(max-width:1180px)");
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const [openPopover, setOpenPopover] = useState(false);
  const [moduleType, SetModuleType] = useState("");
  const { wishLists } = useSelector((state) => state.wishList);
  const [toggled, setToggled] = useState(false);
  const totalWishList = wishLists?.item?.length + wishLists?.store?.length;
  const [openSignIn, setOpenSignIn] = useState(false);
  const anchorRef = useRef(null);
  const [modalFor, setModalFor] = useState("sign-in");
  let token = undefined;
  let location = undefined;
  let zoneId = undefined;
  let guestId = undefined;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  if (typeof window !== "undefined") {
    guestId = localStorage.getItem("guest_id");
  }

  const {
    data: guestData,
    refetch: guestRefetch,
    isLoading: guestIsLoading,
  } = useGetGuest();

  useEffect(() => {
    const fetchGuestId = async () => {
      try {
        // Check if there is no guest ID in local storage
        if (!guestId) {
          // Trigger API call to get guest ID
          await guestRefetch();
        }
      } catch (error) {
        // Handle error (e.g., log it or show a notification)
        console.error("Error fetching guest ID:", error);
      }
    };

    // Call the function to fetch guest ID
    fetchGuestId();
  }, [guestId, guestRefetch]);

  useEffect(() => {
    // Update guestId when guestData is available
    if (guestData?.guest_id) {
      localStorage.setItem("guest_id", guestData.guest_id);
      guestId = guestData.guest_id;
    }
  }, [guestData]);

  const {
    data,
    refetch: cartListRefetch,
    isLoading,
  } = useGetAllCartList(guestId);

  useEffect(() => {
    cartListRefetch();
  }, [moduleType]);

  const setItemIntoCart = () => {
    return data?.map((item) => ({
      ...item?.item,
      cartItemId: item?.id,
      totalPrice:
        handleProductValueWithOutDiscount({
          ...item?.item,
          selectedOption:
            getModule()?.module_type !== "food"
              ? getOtherModuleVariation(item?.item?.variations, item?.variation)
              : [],
        }) * item?.quantity,
      selectedAddons: item?.item?.addons,
      quantity: item?.quantity,
      food_variations: item?.item?.food_variations,
      itemBasePrice: item?.item?.price,
      selectedOption:
        getModule()?.module_type !== "food"
          ? getOtherModuleVariation(item?.item?.variations, item?.variation)
          : getSelectedVariations(item?.item?.food_variations),
    }));
  };

  useEffect(() => {
    dispatch(setCartList(setItemIntoCart()));
  }, [data]);

  useEffect(() => {
    if (offlineInfoStep !== 0) {
      if (router.pathname !== "/checkout") {
        dispatch(clearOfflinePaymentInfo());
      }
    }
  }, []);

  useEffect(() => {
    SetModuleType(selectedModule?.module_type);
  }, [selectedModule]);

  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
    token = localStorage.getItem("token");
    zoneId = JSON.parse(localStorage.getItem("zoneid"));
  }

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };
  const handleWishlistClick = (pathName) => {
    router.push({
      pathname: "/profile",
      query: {
        page: pathName,
      },
    });
  };

  const handleTrackOrder = () => {
    router.push({
      pathname: "/track-order",
    });
  };
  const handleClose = () => {
    setModalFor("sign-in");
    setOpenSignIn(false);
  };
  const getMobileScreenComponents = () => (
    <ModuleWiseNav
      router={router}
      configData={configData}
      token={token}
      setToggled={setToggled}
      location={location}
      setOpenSignIn={setOpenSignIn}
      setModalFor={setModalFor}
    />
  );
  const getDesktopScreenComponents = () => (
    <CustomStackFullWidth
      direction="row"
      width={"100%"}
      alignItems="center"
      justifyContent=""
      sx={{
        marginLeft: "0 !important",
        backgroundColor: "transparent !important",
      }}
    >
      <Stack direction="row" alignItems="center" width="40%">
        {!isSmall && (
          <LogoSide
            width="110px"
            height="50px"
            configData={configData}
            objectFit="contain"
          />
        )}
      </Stack>

      {!isSmall && location && (
        // <NavLinks t={t} zoneid="zoneid" moduleType={moduleType} />
        <NewNavBar />
      )}

      {!isSmall && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          width={"100%"}
          justifyContent="space-between"
          spacing={2.5}
        >
          {/* {!token && moduleType !== "parcel" && location && (
            <IconButton onClick={handleTrackOrder}>
              <Tooltip
                title={t("Track order")}
                arrow
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: (theme) => theme.palette.toolTipColor,
                      "& .MuiTooltip-arrow": {
                        color: (theme) => theme.palette.toolTipColor,
                      },
                    },
                  },
                }}
              >
                <LocalShippingOutlinedIcon fontSize="22px" />
              </Tooltip>
            </IconButton>
          )}
          {token && moduleType !== "parcel" && (
            <NavBarIcon
              icon={<ChatBubbleOutlineIcon sx={{ fontSize: "22px" }} />}
              label={t("Chat")}
              user="false"
              handleClick={() => handleWishlistClick("inbox")}
            />
          )} */}
          {/* {token && zoneId && moduleType !== "parcel" && (
            <WishListSideBar totalWishList={totalWishList} />
          )} */}

          {/* {moduleType !== "parcel" &&
            !isLoading &&
            (location || cartList?.length !== 0) && (
              <Cart isLoading={isLoading} />
            )} */}

          {token ? (
            <IconButton
              ref={anchorRef}
              onClick={() => handleOpenPopover()}
              sx={{
                padding: "5px",
                gap: "10px",
              }}
            >
              {profileInfo?.image ? (
                <Avatar
                  alt={profileInfo?.last_name}
                  sx={{ width: 34, height: 34 }}
                  src={profileInfo?.image_full_url}
                />
              ) : (
                <AccountCircleIcon
                  color="primary"
                  sx={{
                    fontSize: "30px",
                    borderRadius: "50%",
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.1),
                  }}
                />
              )}

              <Typography
                color={theme.palette.neutral[1000]}
                textTransform="capitalize"
              >
                {profileInfo?.f_name}
              </Typography>
            </IconButton>
          ) : (
            <Stack flexDirection="row">
              {!location && (
                <Stack
                  direction="row"
                  width={"100%"}
                  spacing={2}
                  justifyContent="end"
                  alignItems="center"
                >
                  <NewNavBar />

                  {/* <ThemeSwitches /> */}
                  {/* <CallToAdmin configData={configData} /> */}
                  <CustomLanguage
                    countryCode={countryCode}
                    language={language}
                  />
                </Stack>
              )}
              <Stack
                justifyContent="center"
                alignItems="center"
                display={"flex"}
                width={"14rem"}
                style={{ marginLeft: "1rem" }}
              >
                <SignInButton onClick={() => setOpenSignIn(true)}>
                  <CustomStackFullWidth
                    direction="row"
                    justifyContent="center"
                    display={"flex"}
                    alignItems="center"
                    spacing={1}
                  >
                    <LockOutlinedIcon
                      fontSize="small"
                      // style={{ color: theme.palette.whiteContainer.main }}
                    />
                    <Typography>{t("Sign In")}</Typography>
                  </CustomStackFullWidth>
                </SignInButton>
              </Stack>
            </Stack>
          )}
        </CustomStackFullWidth>
      )}
    </CustomStackFullWidth>
  );

  return (
    <CustomBoxFullWidth
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: (theme) =>
          `0px 5px 20px -3px ${alpha(theme.palette.primary.main, 0.1)}`,
        zIndex: 1251,
      }}
    >
      <NoSsr>
        <CustomContainer>
          <Toolbar disableGutters={true}>
            {isSmall
              ? getMobileScreenComponents()
              : getDesktopScreenComponents()}
            <AccountPopover
              anchorEl={anchorRef.current}
              onClose={() => setOpenPopover(false)}
              open={openPopover}
              cartListRefetch={cartListRefetch}
            />
          </Toolbar>
        </CustomContainer>
        <AuthModal
          modalFor={modalFor}
          setModalFor={setModalFor}
          open={openSignIn}
          handleClose={handleClose}
        />
      </NoSsr>
    </CustomBoxFullWidth>
  );
};

export default SecondNavBar;
