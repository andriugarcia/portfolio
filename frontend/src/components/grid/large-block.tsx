import * as React from "react";
import { squareSideSize } from "../../globals";

export default ({ index, delay, children }) => {
  return (
    <div
      className={
        "grid-box-" +
        index +
        " box col-span-4 row-span-2 bg-white	rounded-lg relative overflow-hidden"
      }
      data-lag={delay.toString()}
    >
      {children}
    </div>
  );
};
