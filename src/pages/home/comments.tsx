import { Comment } from "components";
import React from "react";

const Comments = () => {
  return (
    <div className="w-full mb-[100px] relative grid">
      <div className="wrapper flex items-center justify-between w-full">
        <Comment />
        <Comment />
      </div>

      <div className="dots flex items-center justify-between gap-[13px] left-[48.5%] absolute bottom-[-35px] w-max h-max z-20">
        <div
          // key={`dot-container-`}
          className='w-4 h-4 rounded-full grid place-items-center border border-primary 
          currentIndex === index ? "border border-primary" : ""
        '
        >
          <span
            className='cursor-pointer block bg-primary
            currentIndex === index ? "bg-primary" : "bg-border-medium"
          } w-2 h-2 rounded-full'
            //   onClick={() => handleDot(index)}
          ></span>
        </div>
        <div
          // key={`dot-container-`}
          className='w-4 h-4 rounded-full grid place-items-center
          currentIndex === index ? "border border-primary" : ""
        '
        >
          <span
            className='cursor-pointer block bg-border-medium
            currentIndex === index ? "bg-primary" : "bg-border-medium"
          } w-2 h-2 rounded-full'
            //   onClick={() => handleDot(index)}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
