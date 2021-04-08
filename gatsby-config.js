module.exports = {
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true,
        formatting: {
          format: "YYYY-MM-DD",
          utc: false,
        },
      },
    },
    "gatsby-plugin-react-helmet",
  ],
};
