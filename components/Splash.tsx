import React, { useState, useEffect } from "react";

import ColorUtils from "@/base/colors";

const Splash = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center ${ColorUtils.colors.darkGray} `}
      style={{ display: showSplash ? "flex" : "none" }}
    >
      <div
        className="flex flex-col items-center justify-center h-full w-full"
        style={{ backgroundColor: ColorUtils.colors.black }}
      >
        <div
          className="p-3 rounded-full z-40"
          style={{
            backgroundColor: ColorUtils.colors.darkGray,
          }}
        >
          <img
            src="/ekmek_reis.png"
            alt="ekmekReis"
            className="w-24 h-24 z-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Splash;
