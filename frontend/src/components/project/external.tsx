import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const fragmentStyle = {
  top: "50%",
  left: "50%",
};

export default ({ href, background, fragments }) => {
  const external: any = useRef();
  useEffect(() => {
    const fragmentElements: any =
      external.current.querySelectorAll(".fragment");

    gsap.set(fragmentElements[0], {
      y: -external.current.offsetHeight,
      x: -external.current.offsetWidth,
    });
    gsap.set(fragmentElements[1], {
      y: -external.current.offsetHeight,
      x: external.current.offsetWidth,
    });
    gsap.set(fragmentElements[2], {
      y: external.current.offsetHeight / 2,
      x: external.current.offsetWidth,
    });
    gsap.set(fragmentElements[3], {
      y: external.current.offsetHeight,
      x: external.current.offsetWidth,
    });
    gsap.set(fragmentElements[4], {
      y: external.current.offsetHeight,
      x: -external.current.offsetWidth,
    });
    gsap.set(fragmentElements[5], {
      y: external.current.offsetHeight / 2,
      x: -external.current.offsetWidth,
    });

    setTimeout(() => {
      if (external.current) {
        gsap.fromTo(
          external.current.querySelector("img"),
          {
            y: -2 * window.innerHeight,
          },
          {
            y: 0,
            scrollTrigger: {
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              markers: true,
            },
          }
        );
      }
    }, 0);

    let animation: any = null;
    external.current.addEventListener("mouseenter", () => {
      const randomX = `random(-${external.current.offsetWidth / 2}, ${
        external.current.offsetWidth / 2
      }, 1)`;
      const randomY = `random(-${external.current.offsetHeight / 2}, ${
        external.current.offsetHeight / 2
      }, 1)`;

      animation = gsap.timeline();

      animation.add("start");

      animation.fromTo(
        external.current.querySelector("button"),
        { scale: 0.8 },
        { scale: 1, duration: 2, ease: "Expo.easeOut" }
      );
      animation.to(
        fragmentElements,
        {
          x: randomX,
          y: randomY,
          rotation: "random(-180, 180, 5)",
          duration: 8,
          ease: "Expo.easeOut",
        },
        "start"
      );
      animation.to(
        fragmentElements,
        {
          x: randomX,
          y: randomY,
          rotation: "random(-90, 90, 2)",
          duration: 30,
          ease: "Power1.easeIn",
        },
        ">"
      );
    });
    external.current.addEventListener("mouseleave", () => {
      animation.pause();
      gsap.to(fragmentElements[0], {
        y: -external.current.offsetHeight,
        x: -external.current.offsetWidth,
        duration: 2,
        ease: "Expo.easeOut",
      });
      gsap.to(fragmentElements[1], {
        y: -external.current.offsetHeight,
        x: external.current.offsetWidth,
        duration: 2,
        ease: "Expo.easeOut",
      });
      gsap.to(fragmentElements[2], {
        y: external.current.offsetHeight / 2,
        x: external.current.offsetWidth,
        duration: 2,
        ease: "Expo.easeOut",
      });
      gsap.to(fragmentElements[3], {
        y: external.current.offsetHeight,
        x: external.current.offsetWidth,
        duration: 2,
        ease: "Expo.easeOut",
      });
      gsap.to(fragmentElements[4], {
        y: external.current.offsetHeight,
        x: -external.current.offsetWidth,
        duration: 2,
        ease: "Expo.easeOut",
      });
      gsap.to(fragmentElements[5], {
        y: external.current.offsetHeight / 2,
        x: -external.current.offsetWidth,
        duration: 2,
        ease: "Expo.easeOut",
      });
    });
  });

  return (
    <a
      className="cursor-pointer h-72 relative flex justify-center items-center flex-col w-full rounded-2xl overflow-hidden"
      ref={external}
    >
      <img
        className="absolute inset-0 object-cover object-top"
        src={process.env.STRAPI_API_URL + background.url}
        alt=""
      />

      <img
        className="fragment absolute z-10 max-w-20"
        src={process.env.STRAPI_API_URL + fragments[0].url}
        alt=""
      />
      <img
        className="fragment absolute z-10 max-w-20"
        src={process.env.STRAPI_API_URL + fragments[1].url}
        alt=""
      />
      <img
        className="fragment absolute z-10 max-w-20"
        src={process.env.STRAPI_API_URL + fragments[2].url}
        alt=""
      />
      <img
        className="fragment absolute z-10 max-w-20"
        src={process.env.STRAPI_API_URL + fragments[3].url}
        alt=""
      />
      <img
        className="fragment absolute z-10 max-w-20"
        src={process.env.STRAPI_API_URL + fragments[4].url}
        alt=""
      />
      <img
        className="fragment absolute z-10 max-w-20"
        src={process.env.STRAPI_API_URL + fragments[5].url}
        alt=""
      />

      <img
        className="elevation w-40 mb-6 z-20"
        src={process.env.STRAPI_API_URL + href}
        alt=""
      />
      <button className="elevation uppercase w-60 rounded-xl border-slate-700 font-bold bg-white py-4 px-6 text-black z-10">
        Go To Site
      </button>
    </a>
  );
};
