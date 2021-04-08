// import React from "react";
import {
  showdown,
  portfolio,
  wedding,
  // rosenfeld,
  courier,
  // mixingboard,
} from "../img/projects";

// import { ExternalIcon, GithubIcon } from "../img/icons";
import {
  // apollo,
  // chakra,
  // django,
  firebase,
  gatsby,
  css,
  // graphql,
  html,
  javascript,
  jekyll,
  jquery,
  bootstrap,
  // nextjs,
  // postgres,
  // prisma,
  react,
  // redux,
  sass,
  // typescript,
} from "../img/logos";

export const projectsData = [
  {
    title: "Hamilton County Recorder's Office",
    description: `A complete rebuild of the county office's 2006-era website with a focus on simplicity, maintainability, and integration with another county site`,
    image: showdown,
    role: "Frontend Developer",
    type: "Freelance Project",
    stack: [
      // typescript,
      // nextjs,
      // react,
      // chakra,
      // apollo,
      // graphql,
      // prisma,
      // postgres,
      jquery,
      bootstrap,
      jekyll,
    ],
  },
  // {
  //   title: "Music Thing",
  //   description: `That squarespace site I worked on.`,
  //   image: mixingboard,
  //   role: "Frontend Developer",
  //   type: "Personal Project",
  //   stack: [html],
  //   buttons: [
  //     // {
  //     //   text: "View Git Project",
  //     //   link: "https://github.com/benlammers/portfolio",
  //     //   linkAriaLabel: "",
  //     //   icon: <GithubIcon />,
  //     // },
  //   ],
  // },
  {
    title: "Australia stuff",
    description: `Not sure how to get a good image of this.`,
    image: courier,
    role: "Frontend Developer",
    type: "Freelance Project",
    stack: [html],
    buttons: [
      // {
      //   text: "View Git Project",
      //   link: "https://github.com/benlammers/portfolio",
      //   linkAriaLabel: "",
      //   icon: <GithubIcon />,
      // },
    ],
  },
  {
    title: "CONWEB",
    description: `NUIT et cetera`,
    image: portfolio,
    role: "Frontend Developer",
    type: "Personal Project",
    stack: [html],
    buttons: [
      // {
      //   text: "View Git Project",
      //   link: "https://github.com/benlammers/portfolio",
      //   linkAriaLabel: "",
      //   icon: <GithubIcon />,
      // },
    ],
  },
  // {
  //   title: "Rosenfeld Tools",
  //   description: `Boy this will be quite a challenge to describe`,
  //   image: rosenfeld,
  //   role: "Frontend Developer",
  //   type: "Personal Project",
  //   stack: [html],
  //   buttons: [
  //     // {
  //     //   text: "View Git Project",
  //     //   link: "https://github.com/benlammers/portfolio",
  //     //   linkAriaLabel: "",
  //     //   icon: <GithubIcon />,
  //     // },
  //   ],
  // },
  {
    title: "Portfolio",
    description: `Created to showcase my experience as a developer while also exploring the React ecosystem (hint: it's the site you're currently on!)`,
    image: portfolio,
    role: "",
    type: "Personal Project",
    stack: [gatsby, react, sass],
    buttons: [
      // {
      //   text: "View Git Project",
      //   link: "https://github.com/benlammers/portfolio",
      //   linkAriaLabel: "",
      //   icon: <GithubIcon />,
      // },
    ],
  },
  {
    title: "Wedding",
    description: `A static site providing details for our wedding. Guests had the ability to RSVP through a reactive web form connected to a Firebase database.`,
    image: wedding,
    role: "",
    type: "Personal Project",
    stack: [javascript, html, css, firebase],
    buttons: [
      //   {
      //     text: "View Frontend Repo",
      //     link: "https://github.com/benlammers/unite-frontend",
      //     linkAriaLabel: "View Github repository for the frontend of Unite",
      //     icon: <GithubIcon />,
      //   },
      //   {
      //     text: "View API Repo",
      //     link: "https://github.com/benlammers/unite-api",
      //     linkAriaLabel: "View Github repository for the API of Unite",
      //     icon: <GithubIcon />,
      //   },
      //   {
      //     text: "View Site",
      //     link: "https://benandmadison.ca",
      //     linkAriaLabel: "View the hosted version of Unite",
      //     icon: <ExternalIcon />,
      //   },
    ],
  },
];
