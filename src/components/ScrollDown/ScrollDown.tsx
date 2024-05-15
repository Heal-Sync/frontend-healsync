import React from 'react';
import "./ScrollDown.css";
const ScrollDown: React.FC = () => {
  return (
    <div className='flex justify-center'>
    <div className="">
      <a href="" className="flex">
        <svg
          width="32px"
          height="32px"
          className=""
          viewBox="0 0 247 390"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            className="stroke-current animate-scroll"
            d="M123.359,79.775l0,72.843"
            strokeWidth="20px"
            fill="none"
          ></path>
          <path
            className="stroke-current "
            d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
            strokeWidth="20px"
            fill="none"
          ></path>
        </svg>
        <span className="ml-2">Scroll Down</span>
        <i className="uil uil-arrow-down"></i>
      </a>
    </div>
    </div>
  );
};

export default ScrollDown;
