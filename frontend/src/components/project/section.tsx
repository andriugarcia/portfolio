import React, { useEffect } from "react";
import Orbit from "./orbit";
import Testimonial from "./testimonial";
import External from "./external";
import { gsap } from "gsap";

const colorSelector: any = {
  about: "white",
  business: "purple",
  stack: "green",
  frontend: "red",
  backend: "blue",
  architecture: "orange",
  database: "green",
  ux: "yellow",
  ui: "purple",
};

const sectionStyle = {
  width: "70vw",
};

const verticalTextStyle = {
  position: "sticky",
  top: 75,
  fontSize: 32,
  width: 48,
  textTransform: "uppercase",
  writingMode: "vertical-rl",
  marginLeft: "6vw",
  transform: "scale(-1, -1)",
};

const sectionBarStyle = {
  width: 2,
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "calc(10vw + 48px)",
};

const SectionBar = ({ color }) => (
  <div style={{ ...sectionBarStyle, backgroundColor: color }}></div>
);

const imgStyle = {
  borderRadius: 16,
  marginTop: 32,
  marginBottom: 32,
};

const videoStyle = {
  width: "100%",
  borderRadius: 16,
  marginTop: 32,
  marginBottom: 32,
};

function renderByComponentType(node: any) {
  if (node.strapi_component === "shared.rich-text") {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: node.body.data.childMarkdownRemark.html,
        }}
      ></div>
    );
  } else if (node.strapi_component === "shared.media") {
    return (
      <img
        style={imgStyle}
        data-speed="1"
        src={process.env.STRAPI_API_URL + node.file.url}
      ></img>
    );
  } else if (node.strapi_component === "shared.video") {
    return <video controls auto-play style={videoStyle} src={node.url}></video>;
  } else if (node.strapi_component === "shared.external") {
    return (
      <External
        href={node.logo.url}
        background={node.background}
        fragments={node.fragments}
      ></External>
    );
  } else {
    return "";
  }
}

export default ({ name, children, nodes = {} }) => {
  return (
    <section
      id={name}
      className="relative flex items-start pl-16 mb-6"
      style={sectionStyle}
    >
      <h2
        className="w-60 rotate-270 font-black"
        style={{ ...verticalTextStyle, color: colorSelector[name] || 'white' }}
      >
        {" "}
        {name}{" "}
      </h2>
      <SectionBar color={colorSelector[name] || 'white'}></SectionBar>
      <div className="section-content" style={{ marginLeft: 70 }}>
        {name !== "stack" ? (
          Object.keys(nodes).map((key, index) => {
            return renderByComponentType(nodes[key]);
          })
        ) : (
          <div className="stack-section">
            <Orbit></Orbit>
          </div>
        )}
      </div>
    </section>
  );
};
