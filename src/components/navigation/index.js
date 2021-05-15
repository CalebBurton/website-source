import React from "react";
import { Link } from "react-scroll";
import { useInView } from "react-intersection-observer";

import * as styles from "./navigation.module.scss";

const SECTIONS = [
  "about",
  "skills",
  // "projects",
  "contact",
];

const Navigation = () => {
  const [ref, inView] = useInView({ threshold: 1, triggerOnce: true });

  return (
    <nav className={styles.navigation}>
      <ul
        className={`${styles.links} ${inView ? styles.linksVisible : null}`}
        ref={ref}
      >
        {SECTIONS.map((section, index) => (
          <li className={styles.link} key={index}>
            <Link
              className={`text--lg color--primary ${styles.navLink}`}
              activeClass={styles.active}
              to={section}
              spy={true}
              smooth={true}
              offset={-30}
              duration={750}
            >
              {section}
            </Link>
            {/* <button
              role="link"
              className="text--lg color--primary"
              onClick={() => {
                scrollTo(`#${section}`);
                setTimeout(() => (window.location.hash = `#${section}`), 500);
              }}
            >
              {section}
            </button> */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
