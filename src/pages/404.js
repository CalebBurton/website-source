import React from "react";
import { Helmet } from "react-helmet";

import logo from "../../static/logo.svg";

import styles from "./404.module.scss";

const Custom404 = () => {
  return (
    <div className={`${styles.app} theme--default`}>
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
      >
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" sizes="96x96" href={logo}></link>
        <title>Caleb Charles Burton</title>
      </Helmet>
      <main>
        <h1 className="text--xl font--heading font--bold">Oops!</h1>
        <p className="text--md font--heading aligned--left">
          There's no page at that address... would you like to try one of the
          following?
        </p>
        <ul
          className={`text--md font--heading aligned--left ${styles.listWrapper}`}
        >
          {/* <li className={styles.bullets}>
            <a href="javascript:history.go(-1)">Go back a page</a>
          </li> */}
          <li className={styles.bullets}>
            <a href="/">Visit the homepage</a>
          </li>
          <li className={styles.bullets}>
            <a href="https://github.com/CalebBurton/website-source/issues">
              Submit a bug report
            </a>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Custom404;
