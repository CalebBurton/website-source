import React from "react";
import styles from "./banner.module.scss";

const Banner = () => {
  return (
    <header className={styles.banner}>
      <div className={styles.text}>
        <h1 className="text--xxl">Caleb Burton</h1>
        <div className={styles.line} />
        <h2 className={`text--md ${styles.title}`}>Full Stack Developer</h2>
      </div>
    </header>
  );
};

export default Banner;
