import React from "react";

import ProjectCard from "./project-card";

import { projectsData } from "../../data";

import * as styles from "./projects.module.scss";

const Projects = () => {
  return (
    <section className="section" id="projects">
      <div className="heading">
        <h2 className="text--xl font--heading font--bold">Projects</h2>
        <p className="text--md font--heading">
          Mmmm tasty projects. Imagine if <em>you</em> could be listed in this
          hall of fame.
        </p>
      </div>
      <div className={styles.list}>
        {projectsData.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
