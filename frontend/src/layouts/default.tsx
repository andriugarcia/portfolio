import React, { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import FilterBar from "../components/filter-bar";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

library.add(fab);

class DefaultLayout extends React.Component {
  componentDidMount(): void {
    console.log("USINGEFFECT");
    const boxes = document.querySelectorAll("[class*=grid-box-]");

    boxes.forEach((box) => {
      box.addEventListener("mouseover", function () {
        gsap.fromTo(
          box,
          { scale: 1 },
          { scale: 1.05, duration: 1, ease: "Power2.easeOut" }
        );
      });
      box.addEventListener("mouseleave", function () {
        gsap.fromTo(
          box,
          { scale: 1.05 },
          { scale: 1, duration: 1, ease: "Power2.easeOut" }
        );
      });
    });
  }

  render() {
    return (
      <main className="app">
        {this.props.children}
        <FilterBar></FilterBar>
        {/* <link rel="stylesheet"></link> */}
      </main>
    );
  }
}

export default DefaultLayout;
