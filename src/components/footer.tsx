import React from "react";

import LOGO from "../assets/images/footer_logo.png";
import FACEBOOK from "../assets/images/Facebook.png";
import YOUTUBE from "../assets/images/youtube.png";
import INSTAGRAM from "../assets/images/instagram.png";
import TELEGRAM from "../assets/images/telegram.png";

import PHONE from "../assets/images/phone.png";
import MAIL from "../assets/images/mail.png";
import LOCATION_MARK from "../assets/images/location_mark.png";
import CLOCK from "../assets/images/clock.png";

const Footer = () => {
  return (
    <div className="w-full bg-bg-secondary">
      <div className="container py-[65px] flex items-center justify-between">
        <div className="about w-[615px]">
          <img src={LOGO} alt="footer logo" />

          <p className="font-[400] text-sm mt-6 mb-[43px] text-text-secondary opacity-50">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>

          <div className="socials flex items-center gap-[15px]">
            <p className="text-text-secondary">Bizni kuzatib qoling:</p>
            <div className="logos flex items-center gap-[10px]">
              <img src={FACEBOOK} alt="facebook logo" />
              <img src={YOUTUBE} alt="youtube logo" />
              <img src={INSTAGRAM} alt="instagram logo" />
              <img src={TELEGRAM} alt="telegram logo" />
            </div>
          </div>
        </div>
        <div className="contacts grid gap-[10px]">
          <div className="contact flex items-center gap-[15px]">
            <img src={PHONE} alt="phone" />
            <span className="text-text-secondary opacity-50 font-[400] text-xs">
              +7 702 505 00 07
            </span>
          </div>
          <div className="contact flex items-center gap-[15px]">
            <img src={MAIL} alt="phone" />
            <span className="text-text-secondary opacity-50 font-[400] text-xs">
              info@example.com
            </span>
          </div>
          <div className="contact flex items-center gap-[15px]">
            <img src={LOCATION_MARK} alt="phone" />
            <span className="text-text-secondary opacity-50 font-[400] text-xs">
              Toshkent shahar, Chilonzor tumani, Furqat ko’chasi
            </span>
          </div>
          <div className="contact flex items-center gap-[15px]">
            <img src={CLOCK} alt="phone" />
            <span className="text-text-secondary opacity-50 font-[400] text-xs">
              Dushanba - Shanba 7:00 - 20:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
