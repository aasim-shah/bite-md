import { NoSsr, Stack, styled } from "@mui/material";
import HeaderComponent from "../header";
import FooterComponent from "../footer";
import PropTypes from "prop-types";
import useGetLandingPage from "api-manage/hooks/react-query/useGetLandingPage";
import { useEffect } from "react";
import BiteFooter from "components/landing-page/bite-footer";

export const MainLayoutRoot = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100vh",
}));

export const LandingLayout = ({ children, configData }) => {
  const { data, refetch } = useGetLandingPage();
  useEffect(() => {
    refetch();
  }, []);

  return (
    <MainLayoutRoot justifyContent="space-between">
      <header>
        <HeaderComponent configData={configData} />
      </header>
      {children}
      <footer>
        <BiteFooter />
      </footer>
    </MainLayoutRoot>
  );
};

LandingLayout.propTypes = {
  children: PropTypes.node,
};
