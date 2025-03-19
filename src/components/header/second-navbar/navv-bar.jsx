import Link from "next/link";
import React from "react";
import { NavLinkStyle } from "../NavBar.style";

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
          Home
        </NavLinkStyle>
      </Link>
      <Link href="/about-us">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          About us
        </NavLinkStyle>
      </Link>
      <Link href="/privacy-policy">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          Privacy Policy
        </NavLinkStyle>
      </Link>
      <Link href="/terms-and-conditions">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          Terms and Conditions
        </NavLinkStyle>
      </Link>
      <Link href="/contact">
        <NavLinkStyle
          underline="none"
          sx={{ cursor: "pointer", color: "white" }}
        >
          Contact Us
        </NavLinkStyle>
      </Link>
    </nav>
  );
}
