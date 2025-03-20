import Link from "next/link";
import React from "react";
import { NavLinkStyle } from "../NavBar.style";
import { t } from "i18next";

export default function NewNavBar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "15px",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Link href="/">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          {t("Home")}
        </NavLinkStyle>
      </Link>
      <Link href="/about-us">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          {t("About Us")}
        </NavLinkStyle>
      </Link>
      <Link href="/privacy-policy">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          {t("Privacy Policy")}
        </NavLinkStyle>
      </Link>
      <Link href="/terms-and-conditions">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          {t("terms and conditions")}
        </NavLinkStyle>
      </Link>
      <Link href="/contact">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          {t("Contact Us")}
        </NavLinkStyle>
      </Link>
    </nav>
  );
}
