export default function (eleventyConfig) {
  // Passthrough copies for static assets
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/scripts");
  eleventyConfig.addPassthroughCopy("static");

  // Watch for SCSS changes (compilation handled by separate script)
  eleventyConfig.addWatchTarget("src/assets/styles/**/*.scss");

  // Set directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
