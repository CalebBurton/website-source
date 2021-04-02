import {
  //   apollo,
  //   chakra,
  css,
  django,
  docker,
  //   gatsby,
  graphql,
  html,
  javascript,
  //   kubernetes,
  //   mongodb,
  //   nextjs,
  nodejs,
  //   postgres,
  //   prisma,
  python,
  react,
  //   redux,
  sass,
  typescript,
  // firebase,
} from "../img/logos";

const rails = {
  logo: "",
  title: "Rails",
};
const rust = {
  logo: "",
  title: "Rust",
};
// const apache = { logo: "", title: "Apache" };
// const eleventy = { logo: "", title: "Eleventy" };
// const jekyll = { logo: "", title: "Jekyll" };
// const ansible = { logo: "", title: "Ansible" };
// const redis = { logo: "", title: "Redis" };
// const c = { logo: "", title: "C" };
// const cplusplus = { logo: "", title: "Cplusplus" };
// const assembly = { logo: "", title: "Assembly" };
// const kafka = { logo: "", title: "Kafka" };
const sql = { logo: "", title: "Sql" };
const vue = { logo: "", title: "Vue" };
// const linux = { logo: "", title: "Linux" };

export const skillsData = [
  {
    phrase: "I specialize in",
    items: [css, html, javascript, typescript, nodejs, sass, vue],
  },
  {
    phrase: "am familiar with",
    items: [
      docker,
      django,
      python,
      // apache,
      //   eleventy,
      //   jekyll,
      //   ansible,
      //   redis,
      //   c,
      //   cplusplus,
      sql,
      // linux,
      //   assembly,
    ],
  },
  {
    phrase: "and am currently exploring",
    items: [
      react,
      rails,
      rust,
      //   mongodb,
      //   redux,
      //   gatsby,
      //   nextjs,
      graphql,
      //   apollo,
      //   kubernetes,
      //   kafka,
    ],
  },
];
