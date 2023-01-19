import * as React from "react"
import {squareSideSize} from "../../globals"


export default ({children}) => {
  const blockStyle = {
    width: `${squareSideSize}vh`
  }
  
  return (
    <div className={"aspect-square grid-flow-col grid gap-3 grid-cols-2 grid-rows-2 col-span-2 row-span-2"} style={blockStyle}>
      { children }
    </div>
  )
}