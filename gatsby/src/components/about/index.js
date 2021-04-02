import React from "react";
import { useInView } from "react-intersection-observer";

import styles from "./about.module.scss";

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.6, triggerOnce: true });
  return (
    <section className="section" id="about">
      <div className="heading">
        <h2 className="text--xl font--heading font--bold">
          Hi!
          <span
            role="img"
            aria-label="waving hand"
            // className={`${styles.waveEmoji} ${styles.isWaving}`}
            className={`${styles.waveEmoji} ${inView ? styles.isWaving : null}`}
            ref={ref}
          >
            👋
          </span>
          {/* <img draggable="false" loading="eager" class="emoji" alt="👋" src="https://jarv.is/vendor/emoji/svg/1f44b.svg"></img> */}
        </h2>
        <p className="text--md font--heading aligned--left">
          I'm a web developer fascinated with electronics, programming, and all
          things healthcare.
        </p>
        <p className="text--md font--heading aligned--left">
          My most recent hobbies have involved running some self-hosted projects
          like&ensp;
          <a
            href="https://www.home-assistant.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home Assistant
          </a>
          ,&ensp;
          <a
            href="https://nextcloud.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NextCloud
          </a>
          , and&ensp;
          <a
            href="https://jellyfin.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jellyfin
          </a>
          . They're pretty neat, check them out if you haven't!
        </p>
        <p className="text--md font--heading aligned--left">
          Other ways I love to spend time are by playing with my dogs, reading,
          and making music.
        </p>
      </div>
    </section>
  );
};

export default About;
