module.exports = {
  siteMetadata: {
    title: `CalebBurton.com`,
    siteUrl: "https://calebburton.com",
    description: "Caleb Burton's personal website",
  },
  plugins: [
    // `gatsby-plugin-csp`,
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
  ],
  flags: {
    FAST_DEV: true,
  },
};
