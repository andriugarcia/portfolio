import * as React from "react";

export default ({ index, delay, children }) => {
  return (
    <div
      className={
        "grid-box-" +
        index +
        " tall-block row-span-4 col-span-2 bg-white	rounded-lg relative overflow-hidden"
      }
      data-lag={delay.toString()}
    >
      {children}
    </div>
  );
};
