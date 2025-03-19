import Image from "next/image";
import React from "react";

export default function BGimage() {
  return (
    <div
      style={{
        width: "100%",
        height: "30rem",
        // zIndex: -1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Image
        src="/landingpage/bg.png"
        alt="Hero Background"
        style={{
          width: "100%",
          height: "100%",
        }}
        width={820}
        height={500}
      />
    </div>
  );
}
