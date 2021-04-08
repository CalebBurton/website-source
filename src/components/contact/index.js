import React from "react";

import { socialData } from "../../data";

import Social from "../social";
import styles from "./contact.module.scss";

const Contact = () => (
  <section className={`${styles.contactBackground}`} id="contact">
    <div className={`heading ${styles.contact}`}>
      <h2 className={`text--xl font--heading font--bold ${styles.head}`}>
        Get in touch!
      </h2>
      <p className={`text--md ${styles.subhead}`}>
        Whether you're looking for development help, want to work together, or
        have any queries at all, I'd love to hear from you.
      </p>
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
