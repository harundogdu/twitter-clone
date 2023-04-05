import React from "react";

import Bottom from "@/components/Bottom";

const BottomBarModal = () => {
  const bodycontent = (
    <p className="text-white">
      <span className="mr-2">Twitter users will be the first to know..</span>
    </p>
  );
  return <Bottom title="Don't miss what's going on" body={bodycontent} />;
};

export default BottomBarModal;
