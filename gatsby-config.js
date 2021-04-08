module.exports = {
  plugins: [
    `gatsby-plugin-csp`,
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true,
        formatting: {
          format: "YYYY-MM-DD [at] HH:mm [UTC]",
          utc: true,
        },
      },
    },
    "gatsby-plugin-react-helmet",
  ],
};
