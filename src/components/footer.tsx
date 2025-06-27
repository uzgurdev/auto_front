import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../lang";
import { RootState } from "../store/store";

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
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div className="w-full bg-bg-secondary">
      <div className="container py-[65px] flex md:flex-row flex-col items-start md:items-center justify-between">
        <div className="about w-full md:w-[615px]">
          <img src={LOGO} alt="footer logo" />

          <p className="font-[400] text-sm mt-6 mb-[43px] text-text-secondary opacity-50">
            {t("footer.about_text")}
          </p>

          <div className="socials hidden md:flex items-center gap-[15px]">
            <p className="text-text-secondary">{t("footer.follow_us")}</p>
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
              {t("header.phone")}
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
              {t("header.address")}
            </span>
          </div>
          <div className="contact flex items-center gap-[15px]">
            <img src={CLOCK} alt="phone" />
            <span className="text-text-secondary opacity-50 font-[400] text-xs">
              {t("header.schedule")}
            </span>
          </div>
        </div>

        <div className="socials md:hidden flex flex-col items-start gap-[15px] mt-4">
          <p className="text-text-secondary">{t("footer.follow_us")}</p>
          <div className="logos flex items-center gap-[10px]">
            <img src={FACEBOOK} alt="facebook logo" />
            <img src={YOUTUBE} alt="youtube logo" />
            <img src={INSTAGRAM} alt="instagram logo" />
            <img src={TELEGRAM} alt="telegram logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
