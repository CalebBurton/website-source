import React from "react";

import styles from "./css-toggle.module.scss";

function toggleCss() {
  const styles = Array.from(document.querySelectorAll("style"));
  for (let j = 0, k = styles.length; j < k; j++) {
    styles[j].disabled = !styles[j].disabled;
  }
  const stylesheets = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  );
  for (let j = 0, k = stylesheets.length; j < k; j++) {
    stylesheets[j].disabled = !styles[j].disabled;
  }
}

const CssToggle = () => {
  return (
    <button className={styles.toggle} onClick={toggleCss}>
      Toggle CSS
    </button>
  );
};

export default CssToggle;
