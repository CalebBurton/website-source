import React from "react";

import About from "../components/about";
import Banner from "../components/banner";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
// import Projects from "../components/projects";
import SEO from "../components/seo";
import Skills from "../components/skills";
import Contact from "../components/contact";

import * as styles from "./index.module.scss";

const Home = () => {
  return (
    <>
      <SEO title="Homepage" />
      <div className={`${styles.app} theme--default`}>
        <Banner />
        <Navigation />
        <main>
          <About />
          <Skills />
          {/* <Projects /> */}
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;

// Photo by <a href="https://unsplash.com/@medbadrc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Med Badr  Chemmaoui</a> on <a href="https://unsplash.com/s/photos/design?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

// Photo by <a href="https://unsplash.com/@lucaslaw__?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">lucas law</a> on <a href="https://unsplash.com/s/photos/wedding-ring-hands?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

// Photo by <a href="https://unsplash.com/@chrisliverani?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Chris Liverani</a> on <a href="https://unsplash.com/s/photos/graph?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

// Photo by <a href="https://unsplash.com/@purzlbaum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Claudio Schwarz | @purzlbaum</a> on <a href="https://unsplash.com/s/photos/courier?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

// Photo by <a href="https://unsplash.com/@yassine_khalfalli?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Yassine Khalfalli</a> on <a href="https://unsplash.com/s/photos/mixing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

// <a
//   href="https://www.flaticon.com/authors/freepik"
//   {...openInNewTab}
//   title="Freepik"
// >
//   Freepik
// </a>{" "}
// from{" "}
// <a
//   href="https://www.flaticon.com/"
//   {...openInNewTab}
//   title="Flaticon"
// >
//   www.flaticon.com
// </a>
