import React from "react";
import { useInView } from "react-intersection-observer";

import styles from "./footer.module.scss";

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.6, triggerOnce: true });

  //   let openInNewTab = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <footer className={styles.footerWrapper}>
      <div
        className={`${styles.footer} ${inView ? styles.footerVisible : null}`}
        ref={ref}
      >
        <span className="text--xs">Credits and &copy; copyright</span>
        {/* https://bitsofco.de/the-new-system-font-stack/ */}
        {/* https://jarv.is/notes/css-waving-hand-emoji/ */}
      </div>
    </footer>
  );
};

export default Footer;
