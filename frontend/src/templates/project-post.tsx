import React from "react";
import { graphql, navigate } from "gatsby";
import Layout from "../layouts/default";
import { gsap } from "gsap";
import ProjectItem from "../components/project-item";
import Section from "../components/project/section";
import SectionNav from "../components/project/section-nav";

import "../styles/project.css";

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  document.getElementsByTagName("body")[0].style.overflowY = "none";
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  document.getElementsByTagName("body")[0].style.overflowY = "auto";
}

class ProjectPost extends React.Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      project: props.data.strapiProject,
    };

    this.state.next = props.data.allStrapiProject.edges.find(
      (edge: any) => edge.node.id === this.state.project.id
    ).next;

    console.log("NEXT", this.state.next);

    if (!this.state.next)
      this.state.next = props.data.allStrapiProject.edges[0].next;

    console.log("NEXT ATT 2", this.state.next);

    this.state.content = {};

    let actualItem = null;
    this.state.project.content.forEach((item: any) => {
      if (item.hasOwnProperty("name")) {
        this.state.content[item.name] = {};
        actualItem = this.state.content[item.name];
      } else {
        actualItem[
          item.strapi_component.substr(item.strapi_component.indexOf(".") + 1)
        ] = item;
      }
    });

    this.state.nextProject = null;

    if (this.state.next) {
      this.state.nextProject = (
        <div>
          <div
            style={{
              fontSize: "5em",
              fontFamily: "Davidas",
              marginLeft: "16vw",
            }}
          >
            NEXT PROJECT
          </div>
          <ProjectItem
            project={this.state.next}
            snap={false}
            index={0}
          ></ProjectItem>
          <div style={{ height: "50vh" }}></div>
        </div>
      );
    }
  }

  componentDidMount(): void {
    disableScroll();

    console.log("SCROLL SMOOTHER", window.scrollSmoother);

    if (window.scrollSmoother) {
      // window.scrollSmoother.smooth = 0;
      // window.scrollSmoother.paused(true);
    }

    console.log("MOUNTING ARTICLE");

    gsap.fromTo(
      ".article",
      { y: "80vh" },
      {
        y: 0,
        duration: 2,
        ease: "Power2.easeInOut",
        overwrite: true,
        onComplete: () => {
          console.log("Completed");

          enableScroll();
          // window.scrollSmoother.paused(false);
        },
      }
    );

    window.onscroll = () => {
      if (
        window.innerHeight + Math.ceil(window.pageYOffset) >=
        document.body.offsetHeight
      ) {
        console.log("SCROLL", window.innerHeight + Math.ceil(window.pageYOffset), document.body.offsetHeight);
        // console.log("NAVIGATE", this.state);
        // navigate("/" + this.state.next.id);
      }
    };
  }
  render() {
    return (
      <Layout>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="h-full">
              <ProjectItem
                project={this.state.project}
                snap={false}
                index={0}
              ></ProjectItem>
              <article className="article">
                {Object.keys(this.state.content).map((key, index) => {
                  return (
                    <Section
                      name={key}
                      key={key}
                      nodes={this.state.content[key]}
                    ></Section>
                  );
                })}
                {this.state.nextProject}
              </article>
            </div>
          </div>
        </div>
        {/* <SectionNav sections={content}></SectionNav> */}
      </Layout>
    );
  }
}

export default ProjectPost;

export const query = graphql`
  fragment RichTextComponent on STRAPI__COMPONENT_SHARED_RICH_TEXT {
    strapi_component
    body {
      data {
        childMarkdownRemark {
          html
        }
      }
    }
  }
  fragment ExternalComponent on STRAPI__COMPONENT_SHARED_EXTERNAL {
    url
    strapi_component
    logo {
      url
    }
    background {
      url
    }
    fragments {
      url
    }
  }
  fragment MediaComponent on STRAPI__COMPONENT_SHARED_MEDIA {
    file {
      url
    }
    strapi_component
  }

  fragment VideoComponent on STRAPI__COMPONENT_SHARED_VIDEO {
    url
    strapi_component
  }

  query ($slug: String!) {
    strapiProject(id: { eq: $slug }) {
      id
      title
      subtitle
      content {
        ... on STRAPI__COMPONENT_SECTION_SECTION_NAME {
          name
        }
        ... on STRAPI__COMPONENT_SHARED_EXTERNAL {
          ...ExternalComponent
        }
        ... on STRAPI__COMPONENT_SHARED_MEDIA {
          ...MediaComponent
        }
        ... on STRAPI__COMPONENT_SHARED_RICH_TEXT {
          ...RichTextComponent
        }
        ... on STRAPI__COMPONENT_SHARED_VIDEO {
          ...VideoComponent
        }
      }
      showcase {
        ... on STRAPI__COMPONENT_BLOCKS_IMAGE {
          type
          strapi_component
          backgroundColor
          image {
            url
          }
          fullPicture
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
    allStrapiProject {
      edges {
        node {
          id
        }
        next {
          id
          title
          subtitle
          technologies {
            backgroundColor
            name
            font
            icon {
              url
            }
          }
          showcase {
            ... on STRAPI__COMPONENT_BLOCKS_IMAGE {
              type
              strapi_component
              backgroundColor
              image {
                url
              }
              fullPicture
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
        }
      }
    }
  }
`;
