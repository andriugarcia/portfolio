import React, { useEffect } from "react";
import type { HeadFC } from "gatsby";
import { graphql, navigate } from "gatsby";
import { gsap } from "gsap";

import TransitionLink from "gatsby-plugin-transition-link";

import Layout from "../layouts/default";

import { firstState, lastState } from "../animation/grid";

import ProjectItem from "../components/project-item";

import { ScrollSmoother } from "gsap/ScrollSmoother";

class IndexPage extends React.Component {
  componentDidMount(): void {
    window.scrollSmoother = ScrollSmoother.create({
      smooth: 0.8, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });
    window.scrollTo(0, 0);
    gsap.fromTo(
      ".grid-box-0",
      {
        y: "100vh",
      },
      {
        y: "0",
        stagger: 0.05,
        duration: 2,
        ease: "Expo.easeInOut",
      }
    );
    gsap.fromTo(
      ".grid-box-1",
      {
        y: "100vh",
      },
      {
        y: "0",
        stagger: 0.05,
        duration: 2,
        ease: "Expo.easeInOut",
      }
    );
  }

  goToProject({ exit, node, index }) {
    const leaveTimeline = gsap.timeline();

    console.log("Going to project", exit, node, index);

    leaveTimeline.add("start");
    leaveTimeline.add("after", 0.7);

    for (let i = 0; i < this.props.data.allStrapiProject.nodes.length; i++) {
      if (i !== index) {
        leaveTimeline.fromTo(
          ".grid-box-" + i,
          { x: 0 },
          { x: "-80vw", stagger: 0.05, duration: 0.5, overwrite: true },
          "start"
        );
      } else {
        const boxes = document.querySelectorAll(".grid-box-" + i);
        const container: any = document.querySelector(".grid-container-" + i);

        leaveTimeline.to(
          ".grid-box-" + i,
          {
            y: -container.getBoundingClientRect().top,
            duration: 0.5,
            stagger: 0.05,
            overwrite: true,
          },
          "after"
        );
      }
    }
  }

  render() {
    return (
      <Layout>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {this.props.data.allStrapiProject.nodes.map((project, index) => {
              return (
                // <a
                //   style={{ height: "600vh" }}
                //   className="cursor-pointer"
                //   onClick={() => goToProject(project.id, index)}
                //   >
                // </a>
                <TransitionLink
                  key={project.id}
                  to={project.id}
                  exit={{
                    length: 2,
                    trigger: ({ exit, node }) =>
                      this.goToProject({
                        exit,
                        node,
                        index,
                      }),
                  }}
                  entry={{
                    delay: 2,
                    length: 0,
                    trigger: ({ exit, node }) => {
                      console.log("Entry");
                      window.scrollTo(0, 0);
                    },
                  }}
                >
                  <ProjectItem project={project} index={index}></ProjectItem>
                </TransitionLink>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allStrapiProjectCategory {
      nodes {
        name
      }
    }
    allStrapiProject(sort: { fields: relevance, order: DESC }) {
      nodes {
        id
        title
        subtitle
        showcase {
          ... on STRAPI__COMPONENT_BLOCKS_IMAGE {
            type
            strapi_component
            backgroundColor
            fullPicture
            image {
              url
            }
          }
          ... on STRAPI__COMPONENT_BLOCKS_INFO {
            backgroundColor
            color
            strapi_component
            text {
              data {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
          ... on STRAPI__COMPONENT_BLOCKS_VIDEO {
            strapi_component
            url
            type
          }
        }
        technologies {
          backgroundColor
          name
          font
          icon {
            url
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <title>Home Page</title>;
