module.exports = {
  siteMetadata: {
    title: `Caleb Charles Burton`,
    siteUrl: "https://calebburton.com",
    description: "Caleb Burton's personal website",
  },
  plugins: [
    // `gatsby-plugin-csp`,
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
  ],
  flags: {
    FAST_DEV: true,
  },
};
