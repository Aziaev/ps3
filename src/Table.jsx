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
    <div className="Table-container" style={tabStyle} onClick={closeTable}>
      <div className="Table">
        {boxMounted && (
          <Draggable
            defaultPosition={defaultPosition}
            onStart={(e) => setDrag(!dragged)}
            onStop={() => setDrag(!dragged)}
            onDrag={(e, ui) => {
              console.log(e, ui.y );
              setSize(calcSize(ui.y));
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
  );
}

const calcSize = y => {
  if (y < 70 && y > 30) {
    return {
      width: `${(0.0175 * y - .225) * 400}px`,
      height: `${(0.0175 * y - .225) * 90}px`,
    };
  } else if (y <= 30) {
    return {
      width: `${(0.0175 * 30 - .225) * 400}px`,
      height: `${(0.0175 * 30 - .225) * 90}px`,
    };
  } else {
    return defaultSize;
  }
};
