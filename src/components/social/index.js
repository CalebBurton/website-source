import React from "react";

import styles from "./social.module.scss";

const Social = ({ icon, aValues, classNames = [] }) => {
  classNames = [
    styles.social,
    ...classNames.map((className) => styles[className]),
  ].join(" ");

  const { ariaLabel, ...otherAValues } = aValues;

  return (
    <li id="contact" className={classNames}>
      <a title={ariaLabel} {...otherAValues}>
        {icon}
      </a>
    </li>
  );
};

export default Social;
