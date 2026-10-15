export default {
  // All of these are the defaults anyway, they're just included for clarity.
  // See https://prettier.io/docs/en/options.html for a full list of options
  printWidth: 80, // this is a guideline, NOT a hard limit
  tabWidth: 2,
  useTabs: false,
  arrowParens: "always",
  // Below are the customizations that are _different_ from the defaults.
  plugins: ["prettier-plugin-jinja-template"],
  overrides: [
    {
      // The plugin registers .html, .jinja, .jinja2, and .j2 by default but
      // not .njk, so point Nunjucks templates at its parser explicitly.
      files: ["*.njk"],
      options: {
        parser: "jinja-template",
      },
    },
  ],
};
