const fs = require('fs');
const pluginPageAssets = require('eleventy-plugin-page-assets')

// const navigationPlugin = require("@11ty/eleventy-navigation");
// const rssPlugin = require("@11ty/eleventy-plugin-rss");
const minificationLocalPlugin = require('./config/minification');
// const objectHas = require("./config/object-has");

// Load yaml from Prism to highlight frontmatter
// loadLanguages(['yaml']);

const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
// const shortcodes = require('./utils/shortcodes.js')
// const markdown = require('./utils/markdown.js')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const CONTENT_GLOBS = {
    posts: 'src/posts/**/*.md',
    notes: 'src/notes/*.md',
    media: '*.jpg|*.png|*.gif|*.mp4|*.webp|*.webm'
}

module.exports = function (config) {
    config.setDataDeepMerge(true);
    if (!process.env.ELEVENTY_PRODUCTION) {
        config.setQuietMode(true);
    }

    config.addPlugin(pluginPageAssets, {
        mode: 'directory',
        postsMatching: 'src/posts/*/*.md',
        assetsMatching: CONTENT_GLOBS.media
    })
    config.addPlugin(minificationLocalPlugin);
    config.addPlugin(inclusiveLangPlugin);

    // Filters
    Object.keys(filters).forEach((filterName) => {
        config.addFilter(filterName, filters[filterName])
    })

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        config.addTransform(transformName, transforms[transformName])
    })

    config.setBrowserSyncConfig({
        ui: false,
        ghostMode: false,
        callbacks: {
            ready: function (err, bs) {
                bs.addMiddleware('*', (req, res) => {
                    const content_404 = fs.readFileSync('dist/404.html');
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    // Add 404 http status code in request header.
                    // res.writeHead(404, { "Content-Type": "text/html" });
                    res.writeHead(404);
                    res.end();
                });
            },
        },
    });

    config.addShortcode('url', function (href, text, isDownload = false) {
        const isExternal = href.indexOf('http') != -1;
        let output;
        if (isDownload) {
            output = `<a href="${href}" class="download">${text}<img src="/assets/static/download.svg" alt="Download Link"/></a>`
        } else if (isExternal) {
            output = `<a href="${href}" class="external">${text}<img src="/assets/static/external.svg" alt="External Link"/></a>`
        } else {
            output = `<a href="${href}">${text}</a>`
        }
        return output;
    });

    // Layouts
    config.addLayoutAlias('base', 'base.njk')
    config.addLayoutAlias('main', 'main.njk')
    // config.addLayoutAlias('page', 'page.njk')
    // config.addLayoutAlias('post', 'post.njk')

    // Pass-through files
    // config.addPassthroughCopy('_redirects');
    // config.addPassthroughCopy('netlify-email');
    // config.addPassthroughCopy('css/fonts');
    // config.addPassthroughCopy('img');
    // config.addPassthroughCopy('favicon.ico');
    config.addPassthroughCopy('src/assets/static')

    // Deep-Merge
    config.setDataDeepMerge(true)

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: ['njk', 'md', '11ty.js'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        // dataTemplateEngine: false,
    };
};
