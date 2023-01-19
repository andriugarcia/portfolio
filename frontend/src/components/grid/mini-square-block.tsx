import * as React from "react";
import { squareSideSize } from "../../globals";

export default ({ backgroundColor, index, delay, children }) => {
  const blockStyle = {
    backgroundColor,
    // width: `${squareSideSize/2}vh`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    padding: 12
  };

  return (
    <div
      className={"grid-box-" + index + " aspect-square rounded-lg"}
      data-lag={delay}
      style={blockStyle}
    >
      {children}
    </div>
  );
};
