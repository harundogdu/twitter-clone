import React, { useState, useEffect } from "react";

import { FaTwitter } from "react-icons/fa";

import ColorUtils from "@/base/colors";

const Splash = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return showSplash === true ? (
    <div
      className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center ${ColorUtils.colors.darkGray} `}
      style={{ display: showSplash ? "flex" : "none" }}
    >
      <div
        className="flex flex-col items-center justify-center h-full w-full"
        style={{ backgroundColor: ColorUtils.colors.black }}
      >
        <div className="p-3 rounded-full z-40">
          <FaTwitter size={60} color={ColorUtils.colors.blue} />
        </div>
      </div>
    </div>
  ) : null;
};

export default Splash;
