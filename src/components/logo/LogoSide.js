import CustomLogo from "./CustomLogo";
import { Stack } from "@mui/system";
import { getImageUrl } from "utils/CustomFunctions";

const LogoSide = ({ configData, width, height, objectFit }) => {
  const businessLogo = configData?.base_urls?.business_logo_url;

  return (
    <Stack
      direction="row"
      alignItems="center"
      width="150px"
      justifyContent="flex-start"
    >
      <CustomLogo
        atlText="logo"
        logoImg={"/landingpage/logo.png"}
        width={width}
        height={height}
        objectFit={objectFit}
      />
    </Stack>
  );
};

LogoSide.propTypes = {};

export default LogoSide;
