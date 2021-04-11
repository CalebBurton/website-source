import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useInView } from "react-intersection-observer";

import styles from "./footer.module.scss";

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.6, triggerOnce: true });

  const {
    siteBuildMetadata: { buildTime },
  } = useStaticQuery(graphql`
    query {
      siteBuildMetadata {
        buildTime
      }
    }
  `);

  // Intl.DateTimeFormat() would be great here, but it doesn't have ISO 8601 support yet
  const re = /(?<date>\d{4}-\d{2}-\d{2})T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2}).(?<ms>\d{3})Z/;
  const { groups } = re.exec(buildTime);
  const formattedBuildTime = `${groups.date} at ${groups.hour}:${groups.minute} UTC`;

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
          Last build was {formattedBuildTime}
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
