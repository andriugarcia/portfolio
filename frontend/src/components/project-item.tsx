import * as React from "react";

import GridItem from "./grid";

import { delayMultiplier } from "../globals";

const titleStyle = {
  fontSize: "102px",
  textTransform: "uppercase",
  marginLeft: "7vw",
};

const verticalTextStyle = {
  writingMode: "vertical-rl",
  transform: "scale(-1, -1)",
};

export default ({ project, snap = true, index }) => {
  let containerStyle: any = {
    height: "50vh",
  };

  if (snap) {
    containerStyle.scrollSnapAlign = "start";
    containerStyle.scrollSnapStop = "always";
  }

  return (
    <div
      className={"grid-container-" + index + " flex items-end"}
      style={containerStyle}
      data-scroll-section=""
    >
      <h1
        className={"grid-box-" + index + " accordion-text text-lg"}
        style={{ ...titleStyle, ...verticalTextStyle }}
      >
        {project.title}
      </h1>
      <span
        data-lag={
          window.location.pathname === "/"
            ? delayMultiplier / (project.technologies.length + 7)
            : 0
        }
        className={"grid-box-" + index + " ml-4 mr-16"}
        style={verticalTextStyle}
      >
        {project.subtitle}
      </span>
      <div>
        <GridItem
          project={project}
          index={index}
          disableLag={window.location.pathname !== "/"}
        ></GridItem>
      </div>
    </div>
  );
};
