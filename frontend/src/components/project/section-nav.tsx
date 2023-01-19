import React, { useEffect } from "react";

const sectionNavStyle = {
  position: "fixed",
  right: "5vw",
  top: "15vh",
  width: "20vw",
  padding: 24,
  backgroundColor: "#fffcf2",
  borderRadius: 12,
  color: "#2b2d42",
};

const SingleLine = () => {
  return (
    <div
      style={{
        width: 40,
        height: 1,
        marginTop: 12,
        backgroundColor: "#2b2d42",
      }}
    ></div>
  );
};

const SubTree = () => {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        marginTop: -24,
        borderLeft: "1px solid #2b2d42",
        borderBottom: "1px solid #2b2d42",
      }}
    ></div>
  );
};

const blockLine = {
  padding: "6px 4px",
  width: "100%",
  borderRadius: 4,
};

const goToSection = (sectionName) => {
  document.getElementById(sectionName).scrollIntoView({
    behavior: "smooth",
  });
};

export default ({ sections }) => {
  const options = {
    root: document.querySelector(".article"),
    threshold: 0.5,
    rootMargin: "0px 0px 0px",
  };

  const callback = function (entries, observer) {
    entries.forEach((entry: any) => {
      const intersecting = entry.isIntersecting;

      if (intersecting) {
        document
          .getElementById("nav-section-" + entry.target.id)
          .classList.add("active");
      } else {
        document
          .getElementById("nav-section-" + entry.target.id)
          .classList.remove("active");
      }
    });
  };

  useEffect(() => {
    let observer = new IntersectionObserver(callback, options);
    let target: any = document.querySelectorAll("section");

    target.forEach((el: HTMLElement) => observer.observe(el));
  });

  return (
    <div style={sectionNavStyle}>
      <div className="flex">
        <SingleLine></SingleLine>
        <div style={blockLine}>Cases</div>
      </div>
      <div className="flex ml-6">
        <SubTree></SubTree>
        <div style={blockLine}>Olimaps</div>
      </div>
      {Object.keys(sections).map((key) => (
        <div
          id={"nav-section-" + key}
          className="nav-item flex ml-10 cursor-pointer"
          onClick={() => goToSection(key)}
        >
          <SubTree></SubTree>
          <div style={blockLine}>{key}</div>
        </div>
      ))}
    </div>
  );
};
