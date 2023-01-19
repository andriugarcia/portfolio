import * as React from "react"
import {squareSideSize} from "../../globals"


export default ({backgroundColor, index, children}) => {
  const blockStyle = {
    backgroundColor, 
    width: `${squareSideSize}vh`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  
  return (
    <div className={"grid-box-" + index + " aspect-square rounded-lg col-span-2 row-span-3"} style={blockStyle}>
      { children }
    </div>
  )
}