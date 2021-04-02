import React from "react";

import { socialData } from "../../data";

import Social from "../social";
import styles from "./contact.module.scss";

const Contact = () => (
  <section className={styles.contactBackground}>
    <div className={styles.contact}>
      <ul className={styles.socials}>
        {socialData.map((social, index) => (
          <Social
            classNames={[social.className]}
            icon={social.icon}
            aValues={social.aValues}
            key={index}
          />
        ))}
      </ul>
    </div>
  </section>
);

export default Contact;
