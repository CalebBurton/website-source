import React from "react";
import { useInView } from "react-intersection-observer";

import { prioritiesData } from "../../data";

import * as styles from "./priorities.module.scss";

const Priority = ({ priority }) => {
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });

  return (
    <div
      className={`${styles.priority} ${inView ? styles.priorityVisible : ""}`}
      ref={ref}
    >
      <img src={priority.icon} alt={priority.altText} />
      <p className="text--lg font--bold font--heading">{priority.title}</p>
      <p className="text--md">{priority.text}</p>
    </div>
  );
};

const Priorities = () => {
  return (
    <section className={styles.prioritiesBackground}>
      <div className={styles.prioritiesWrapper}>
        <h2 className={`text--xl ${styles.prioritiesHeader}`}>
          I provide work that is
        </h2>
        <div className={styles.prioritiesRow}>
          {prioritiesData.map((priority, index) => (
            <Priority priority={priority} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Priorities;
