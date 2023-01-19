import * as React from "react";
import Canvas from "./canvas";

const sidebarStyle = {
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 12,
  paddingTop: "8vh",
  width: "20vw",
  color: "white",
};

const boldText = { fontWeight: 700 };

export default () => {
  return (
    <div className="filter-bar" style={sidebarStyle}>
      <Canvas></Canvas>
      <div className="flex justify-center -mt-8">
        <img
          src="https://pbs.twimg.com/profile_images/1571547194464903168/JgT6t58w_400x400.jpg"
          className="w-16 h-16 rounded-full"
        ></img>
      </div>
      <div className="mt-6">
        <div className="flex justify-start">
          <div className="rounded-lg bg-white text-black p-4">
            <p>Esto es un mensaje de prueba</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="rounded-lg border-white text-white border-2 p-4 max-w-sm">
            <p>Esto es un mensaje de prueba</p>
          </div>
        </div>
      </div>
    </div>
  );
};
