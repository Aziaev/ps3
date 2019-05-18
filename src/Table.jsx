import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './App.css';

const defaultPosition = { x: 100, y: 100 };
const defaultSize = { width: '400px', height: '90px' };
const closeAnimation = { animation: 'Table-active-animation .2s ease-in-out' };

export function Table(props) {
  const [dragged, setDrag] = useState(false);
  const [size, setSize] = useState(defaultSize);
  const [tabStyle, setTabStyle] = useState({});
  const [position, setPosition] = useState(defaultPosition);
  const [boxMounted, setBoxMounted] = useState(false);

  useEffect(() => {
    if (props.opened) {
      setTimeout(() => setBoxMounted(true), 500);
    } else {
      setTimeout(() => setBoxMounted(false), 500);
    }
  });

  function closeTable() {
    setTabStyle(closeAnimation);
    setTimeout(() => props.onClick(), 200);
  }

  return (
    <>
    {props.opened && (
      <div className="Table-container" style={tabStyle} onClick={closeTable}>
        <div className="Table">
          {boxMounted && (
            <Draggable
              defaultPosition={position}
              onStart={(e) => setDrag(!dragged)}
              onStop={() => setDrag(!dragged)}
              scale={1}
              onDrag={({ clientX, clientY }, { x, y }) => {
                setPosition({ x: clientX, y: clientY });
                setSize(calcSize(clientX, clientY, x, y));
              }}
            >
              <div
                className="box"
                style={size}
                onClick={e => e.stopPropagation()}
              />
            </Draggable>
          )}
        </div>
      </div>
    )}
    </>
  );
}

const calcSize = (clientX, clientY, x, y, position) => {
  if (y < 70 && y > 30) {
    const width = (0.0175 * y - .225) * 400;
    const height = (0.0175 * y - .225) * 90;
    const margin = {
      left: (400 * clientX - width * clientX + x * width) / 400 - x,
      top: (90 * clientY - height * clientY + y * height) / 90 - y,
    };

    return {
      width: `${width}px`,
      height: `${height}px`,
      marginLeft: `${margin.left}px`,
      marginTop: `${margin.top}px`,
    };
  } else if (y <= 30) {
    const width = (0.0175 * 30 - .225) * 400;
    const height = (0.0175 * 30 - .225) * 90;
    const margin = {
      left: (400 * clientX - width * clientX + x * width) / 400 - x,
      top: (90 * clientY - height * clientY + y * height) / 90 - y,
    };

    return {
      width: `${width}px`,
      height: `${height}px`,
      marginLeft: `${margin.left}px`,
      marginTop: `${margin.top}px`,
    };
  } else {
    return defaultSize;
  }
};
