import React, { useEffect, useRef, useState } from "react";
import { useEventListener } from "./useEventListener";

const fillCols = (children, cols) => {
  children.forEach((child, i) => cols[i % cols.length].push(child));
};
export default function Masonry({ children, gap, minWidth = 500, ...rest }) {
  const ref = useRef();

  const [numCols, setNumCols] = useState(3);
  const cols = [...Array(numCols).keys()].map(() => []);
  fillCols(children, cols);
  const resizeHandler = () => {
    return setNumCols(Math.ceil(ref.current.offsetWidth / minWidth));
  };
  useEffect(resizeHandler, []);
  useEventListener(`resize`, resizeHandler);

  return (
    <div className="masonry" ref={ref}>
      {[...Array(numCols)].map((_, index) => (
        <div key={index} gap={gap}>
          {cols[index]}
        </div>
      ))}
    </div>
  );
}
