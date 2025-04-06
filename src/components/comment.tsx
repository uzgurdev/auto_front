import React from "react";

import PROFILE_IMAGE from "../assets/images/profile_image.png";

const Comment = () => {
  return (
    <div className="shadow w-[49%] h-[360px] px-[45px] pt-[40px] pb-[35] rounded-[10px] cursor-default">
      <p className="text-text-secondary font-[500] text-2xl">
        Ajoyib narx va servis
      </p>
      <p className="text-text-secondary opacity-50 font-[400] text-sm mt-[10px] mb-[40px]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </p>

      <div className="profile flex items-center gap-3">
        <img loading="lazy" src={PROFILE_IMAGE} alt="profile pic" />
        <p className="font-[400] text-sm text-text-secondary">Thomas Shelby</p>
      </div>
    </div>
  );
};

export default Comment;
