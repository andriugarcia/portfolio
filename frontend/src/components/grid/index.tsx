import React, { useEffect } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { delayMultiplier } from "../../globals";
import SquareSubGrid from "./square-sub-grid";
import MiniSquareBlock from "./mini-square-block";
import SquareBlock from "./square-block";
import TallBlock from "./tall-block";
import LargeBlock from "./large-block";
import SmallRow from "./small-row";
import TallRow from "./tall-row";
import ThreethirdsRow from "./threethirds-row";

let delay = delayMultiplier;

const getFullUrl = (src) => {
  return process.env.STRAPI_API_URL + src;
};

function renderSubElement(block) {
  if (block["strapi_component"] === "blocks.image") {
    const imageURL = block.image ? getFullUrl(block.image.url) : ''
    return (
      <img
        className={
          block.fullPicture
            ? "absolute inset-0 w-full h-full object-cover"
            : "w-32"
        }
        src={imageURL}
        alt=""
      />
    );
  } else if (block["strapi_component"] === "blocks.video") {
    return (
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={block.url}
        auto-play="true"
        muted
        loop
      />
    );
  }
}

export default ({ project, index, disableLag = false }) => {
  if (disableLag) delay = 0;

  let incrementalIndex = 0;

  // const logo = getImage(project.logo.logo.localFile.childImageSharp.gatsbyImageData);

  // const portraitImages =

  useEffect(() => {
    let videoElems = document.querySelectorAll("video");
    videoElems.forEach((videoElem) => {
      videoElem.play();
    });
  });

  return (
    <div className="h-full grid-flow-col grid gap-4 grid-cols-10 grid-rows-4">
      {project.showcase.map((block: any, blockIndex) => {
        if (!block.hasOwnProperty("type")) {
          if (block["strapi_component"] === "blocks.info") {
            return (
              <SquareBlock
                index={index}
                key={incrementalIndex++ + "-1"}
                delay={
                  delay * ((blockIndex + 2) / (project.showcase.length + 7))
                }
                backgroundColor={block.backgroundColor}
              >
                <div></div>
              </SquareBlock>
            );
          }
        } else if (block.type === "square") {
          return (
            <SquareBlock
              index={index}
              key={incrementalIndex++ + "-2"}
              delay={delay * ((blockIndex + 2) / (project.showcase.length + 7))}
              backgroundColor={block.backgroundColor}
            >
              {renderSubElement(block)}
            </SquareBlock>
          );
        } else if (block.type === "tall") {
          return (
            <TallBlock
              index={index}
              key={incrementalIndex++ + "-3"}
              delay={delay * ((blockIndex + 2) / (project.showcase.length + 7))}
            >
              {renderSubElement(block)}
            </TallBlock>
          );
        } else if (block.type === "wide") {
          return (
            <LargeBlock
              index={index}
              key={incrementalIndex++ + "-4"}
              delay={delay * ((blockIndex + 2) / (project.showcase.length + 7))}
            >
              {renderSubElement(block)}
            </LargeBlock>
          );
        }
      })}

      <SquareSubGrid>
        {project.technologies.map((technology, subindex) => {
          const imageURL = technology.icon ? getFullUrl(technology.icon.url) : ''
          return (
            <MiniSquareBlock
              index={index}
              key={incrementalIndex++ + "-5"}
              delay={
                delay *
                ((project.showcase.length + 2 + subindex) /
                  (project.showcase.length + 7))
              }
              backgroundColor={technology.backgroundColor}
            >
              <img
                className="w-full"
                src={imageURL}
                alt=""
              />
            </MiniSquareBlock>
          );
        })}
      </SquareSubGrid>
      <SmallRow
        index={index}
        key={incrementalIndex++ + "-6"}
        delay={delay}
        backgroundColor="white"
      >
        <div className="text-black">#SocialNetwork</div>
      </SmallRow>
      <ThreethirdsRow
        index={index}
        key={incrementalIndex++ + "-7"}
        delay={delay}
        backgroundColor="white"
      >
        <div className="text-black">Testing</div>
      </ThreethirdsRow>
      {/* <SmallRow index={index} speed={ -(10/10) + 1 } backgroundColor="white">
      <div className="text-black">#SocialNetwork</div>
    </SmallRow> */}
      {/* <TallRow index={index} backgroundColor="white">
    </TallRow> */}
    </div>
  );
};
