// Just a placeholder to load the static Wordle assets
// https://github.com/gatsbyjs/gatsby/issues/17761#issuecomment-533816520

import React from "react";

const dummy = () => (
  <div
    style={{
      display: "flex",
      alignContent: "center",
      margin: "3rem auto",
      justifyContent: "space-around",
    }}
  >
    <div>
      <iframe
        src="/wordle.html"
        title="wordle"
        style={{ width: "800px", height: "600px" }}
      ></iframe>
    </div>
    <div>this is content for the page</div>
  </div>
);

export default dummy;
