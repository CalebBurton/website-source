import React from "react";
import styles from "./banner.module.scss";
import { Link } from "react-scroll";

const Banner = () => {
  return (
    <>
      <header className={styles.banner}>
        <div className={styles.text}>
          <h1 className="text--xxl">Caleb C. Burton</h1>
          <div className={styles.line} />
          <h2 className={`text--md ${styles.title}`}>Full Stack Developer</h2>
        </div>
      </header>
      <Link
        className={styles.arrow}
        to={"about"}
        spy={true}
        smooth={true}
        offset={-10}
        duration={1000}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="44"
          height="44"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Link>
    </>
  );
};

export default Banner;
