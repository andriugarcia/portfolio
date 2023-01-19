import * as React from "react";
import { squareSideSize } from "../../globals";

export default ({ backgroundColor = "#fffcf2", index, delay, children }) => {
  const blockStyle = {
    backgroundColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      className={"grid-box-" + index + " rounded-lg col-span-2 row-span-1"}
      data-lag={delay}
      style={blockStyle}
    >
      {children}
    </div>
  );
};
