import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useInView } from "react-intersection-observer";

import styles from "./footer.module.scss";

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.6, triggerOnce: true });

  const data = useStaticQuery(graphql`
    query {
      currentBuildDate {
        currentDate
      }
    }
  `);

  const openInNewTab = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <footer className={styles.footerWrapper}>
      <span className={styles.byline}>
        Designed, built, and maintained by Caleb Burton{" "}
      </span>
      <div
        className={`${styles.footer} ${inView ? styles.footerVisible : null}`}
        ref={ref}
      >
        <span className={styles.lastBuilt}>
          Last build was {data.currentBuildDate.currentDate}
        </span>
        <span>
          <a
            href="https://github.com/CalebBurton/website-source"
            {...openInNewTab}
          >
            Source
          </a>
        </span>
        <span>
          <a
            href="https://bitsofco.de/the-new-system-font-stack/"
            {...openInNewTab}
          >
            System Font Stack
          </a>
        </span>
        <span>
          <a
            href="https://coolors.co/292929-203142-e3af72-ebebeb"
            {...openInNewTab}
          >
            Color Palette
          </a>
        </span>
      </div>
      {/* https://jarv.is/notes/css-waving-hand-emoji/ */}
    </footer>
  );
};

export default Footer;
