import React from "react";
import { useInView } from "react-intersection-observer";

import * as styles from "./about.module.scss";
import Priorities from "../priorities";
import { isAvailableData } from "../../data";

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
          My most recent hobbies have been running some self-hosted projects
          like{" "}
          <a
            href="https://www.home-assistant.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home Assistant
          </a>
          ,{" "}
          <a
            href="https://nextcloud.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NextCloud
          </a>
          , and{" "}
          <a
            href="https://jellyfin.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jellyfin
          </a>
          . Other ways I love to spend time are playing with my dogs, reading,
          and making music.
        </p>
        <p className="text--md font--heading aligned--left">
          {isAvailableData.isAvailable ? (
            <>
              <span className={styles.availability}>I'm</span> currently
              available for part-time freelance projects. If you'd like to work
              together, please reach out using the contact information below.
            </>
          ) : (
            <>
              I'm <span className={styles.availability}>NOT</span> currently
              available for freelance work, but if you have a project I'm happy
              to recommend other developers who might suit your needs.
            </>
          )}
        </p>
      </div>
      <Priorities />
    </section>
  );
};

export default About;
