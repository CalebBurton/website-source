import React from "react";
import { GithubIcon, EmailIcon, LinkedinIcon } from "./../img/icons";

export const socialData = [
  {
    icon: <GithubIcon />,
    aValues: {
      href: "https://github.com/calebburton",
      target: "_blank",
      rel: "noopener noreferrer",
      ariaLabel: "Open Github profile for Caleb Burton",
    },
    className: "socialGithub",
  },
  {
    icon: <EmailIcon />,
    aValues: {
      href: "mailto:hi@calebburton.com",
      ariaLabel: "Send mail to hi@calebburton.com",
    },
    className: "socialEmail",
  },
  {
    icon: <LinkedinIcon />,
    aValues: {
      href: "https://www.linkedin.com/in/caleb-charles-burton/",
      target: "_blank",
      rel: "noopener noreferrer",
      ariaLabel: "Open LinkedIn profile for Caleb Burton",
    },
    className: "socialLinkedin",
  },
];
