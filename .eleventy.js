const markdownIt = require("markdown-it");
const fs = require("fs");

// const navigationPlugin = require("@11ty/eleventy-navigation");
// const rssPlugin = require("@11ty/eleventy-plugin-rss");
const minificationLocalPlugin = require("./config/minification");
// const objectHas = require("./config/object-has");

// Load yaml from Prism to highlight frontmatter
// loadLanguages(['yaml']);

let defaultAvatarHtml = `<img src="/img/default-avatar.png" alt="Default Avatar" loading="lazy" class="avatar">`;
const shortcodes = {
	link: function(linkUrl, content) {
		return (linkUrl ? `<a href="${linkUrl}">` : "") +
			content +
			(linkUrl ? `</a>` : "");
	}
};

module.exports = function(eleventyConfig) {
	eleventyConfig.setDataDeepMerge(true);
	if(!process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.setQuietMode(true);
	}

	eleventyConfig.setBrowserSyncConfig({
		ui: false,
		ghostMode: false,
		callbacks: {
			ready: function(err, bs) {
	  
			  bs.addMiddleware("*", (req, res) => {
				const content_404 = fs.readFileSync('_site/404.html');
				// Provides the 404 content without redirect.
				res.write(content_404);
				// Add 404 http status code in request header.
				// res.writeHead(404, { "Content-Type": "text/html" });
				res.writeHead(404);
				res.end();
			  });
			}
		  }
	});

	// eleventyConfig.addPlugin(syntaxHighlightPlugin, {
	// 	templateFormats: ["md", "njk"],
	// 	init: function({ Prism }) {
	// 		Prism.languages.markdown = Prism.languages.extend('markup', {
	// 			'frontmatter': {
	// 				pattern: /^---[\s\S]*?^---$/m,
	// 				greedy: true,
	// 				inside: Prism.languages.yaml
	// 			}
	// 		});
	// 	}
	// });
	// eleventyConfig.addPlugin(rssPlugin);
	// eleventyConfig.addPlugin(navigationPlugin);
	// eleventyConfig.addPlugin(addedInLocalPlugin);
	// eleventyConfig.addPlugin(monthDiffPlugin);
	eleventyConfig.addPlugin(minificationLocalPlugin);

	eleventyConfig.addCollection("sidebarNav", function(collection) {
		// filter out excludeFromSidebar options
		return collection.getAll()
			.filter(item => (item.data || {}).excludeFromSidebar !== true);
	});

	let md = new markdownIt();
	eleventyConfig.addPairedShortcode("callout", function(content, level = "warn", format = "html") {
		if( format === "md" ) {
			content = md.renderInline(content);
		}
		return `<div class="elv-callout elv-callout-${level}">${content}</div>`;
	});

	eleventyConfig.addShortcode("emoji", function(emoji, alt = "") {
		return `<span aria-hidden="true" class="emoji">${emoji}</span>` +
			(alt ? `<span class="sr-only">${alt}</span>` : "");
	});

	eleventyConfig.addShortcode("codetitle", function(title, heading = "Filename") {
		return `<div class="codetitle codetitle-left"><b>${heading} </b>${title}</div>`;
	});

	eleventyConfig.addPairedShortcode("minilink", function(text, href) {
		return `<a href="${href}" class="minilink minilink-lower">${text}</a>`;
	});

	eleventyConfig.addPassthroughCopy({
		"node_modules/@11ty/logo/img/logo.svg": "img/logo.svg",
		"node_modules/@11ty/logo/img/logo-784x1093.png": "img/logo.png",
		"node_modules/@11ty/logo/img/logo-300x418.png": "img/logo-github.png",
		"node_modules/@11ty/logo/img/logo-96x96.png": "img/favicon.png"
	});

	eleventyConfig.addPassthroughCopy("_redirects");
	eleventyConfig.addPassthroughCopy("netlify-email");
	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("favicon.ico");

	eleventyConfig.addFilter("fileExists", function(url) {
		return fs.pathExistsSync(`.${url}`);
	});

	eleventyConfig.addFilter("toJSON", function(obj) {
		return JSON.stringify(obj);
	});

	eleventyConfig.addFilter("toSearchEntry", function(str) {
		return str.replace(/<a class="direct-link"[^>]*>#<\/a\>/g, "");
	});

	eleventyConfig.addFilter("humanReadableNum", function(num) {
		return HumanReadable.toHumanString(num);
	});

	eleventyConfig.addFilter("commaNumber", function(num) {
		return commaNumber(num);
	});

	eleventyConfig.addFilter("displayPrice", function(num) {
		return parseFloat(num).toFixed(2);
	});

	// eleventyConfig.addShortcode("junkCode", function() {
	// 	return process.env.ELEVENTY_ENV != 'production';
	// });

	eleventyConfig.addFilter("orphanWrap", str => {
		let splitSpace = str.split(" ");
		let after = "";
		if( splitSpace.length > 2 ) {
			after += " ";

			// TODO strip HTML from this?
			let lastWord = splitSpace.pop();
			let secondLastWord = splitSpace.pop();

			after += `${secondLastWord}&nbsp;${lastWord}`;
		}

		return splitSpace.join(" ") + after;
	});

	function randomizeArray(arr) {
		let a = arr.slice(0);
		for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	// Thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	eleventyConfig.addFilter("shuffle", arr => {
		if( Array.isArray(arr) ) {
			return randomizeArray(arr);
		}

		let keys = randomizeArray(Object.keys(arr));
		let a = {};
		for(let key of keys) {
			a[key] = arr[key];
		}
		return a;
	});

	// Thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	eleventyConfig.addFilter("randompick", arr => {
		if( Array.isArray(arr) ) {
			return arr[Math.floor(Math.random() * arr.length)];
		}

		let randkey = Object.keys(arr)[Math.floor(Math.random() * arr.length)];
		return arr[randkey]
	});

	eleventyConfig.addFilter("getsize", arr => {
		if( Array.isArray(arr) ) {
			return arr.length
		}

		return Object.keys(arr).length;
	});

	eleventyConfig.addShortcode("addToSampleSites", function() {
		return `<a href="https://github.com/11ty/11ty-website/issues/new/choose"><strong>Want to add your site to this list?</strong></a>`;
	});

	eleventyConfig.addCollection("quicktipssorted", function(collection) {
		return collection.getFilteredByTag("quicktips").sort(function(a, b) {
			return parseInt(a.data.tipindex, 10) - parseInt(b.data.tipindex, 10);
		});
	});

	/* Markdown */
	let markdownItAnchor = require("markdown-it-anchor");
	// let markdownItToc = require("markdown-it-table-of-contents");

	let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	})
	.use(markdownItAnchor, {
		permalink: true,
		// slugify: markdownItSlugify,
		permalinkBefore: false,
		permalinkClass: "direct-link",
		permalinkSymbol: "#",
		level: [1,2,3,4]
	})

	mdIt.linkify.tlds('.io', false);
	eleventyConfig.setLibrary("md", mdIt);

	eleventyConfig.addFilter("newsDate", (dateObj, format = "yyyy LLLL dd") => {
		if(typeof dateObj === "number") {
			dateObj = new Date(dateObj);
		}
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

	eleventyConfig.addFilter("objectFilterNot", (obj, compareKey) => {
		let newObj = {};
		for(let j in obj) {
			if(!obj[j][compareKey]) {
				newObj[j] = obj[j];
			}
		}
		return newObj;
	});

	eleventyConfig.addFilter("rankSortByNumericKey", (arr, ...keys) => {
		return arr.filter(entry => true).sort((a, b) => {
			let aSum = 0;
			let bSum = 0;
			for(let key of keys) {
				aSum += a[key];
				bSum += b[key];
			}
			return aSum - bSum;
		});
	});

	eleventyConfig.addFilter("calc", (sites, type, key, greaterThanOrEqualTo = 1) => {
		let sum = 0;
		let values = [];
		let keys;
		if(Array.isArray(key)) {
			keys = key;
		} else {
			keys = [key];
		}
		let count = 0;
		for(let site of sites) {
			let test = true;
			for(let key of keys) {
				if(isNaN(site[key]) || site[key] < greaterThanOrEqualTo) {
					test = false;
				}
			}
			if(test) {
				count++;
			}
			if(typeof site[key] === "number") {
				sum += site[key];
				values.push(site[key]);
			}
		}
		if(type === "count") {
			return count;
		}
		if(type === "mean") {
			return sum / values.length;
		}
		if(type === "median") {
			if(values.length > 0) {
				return values.sort((a, b) => b - a)[Math.floor(values.length / 2)];
			}
		}
	});

	eleventyConfig.addFilter("findBy", (data, key, value) => {
		return data.filter(entry => {
			if(!key || !value || !entry[key]) {
				return false;
			}

			let valueLower = value.toLowerCase();
			let dataLower = entry[key].toLowerCase();
			if(valueLower === dataLower) {
				return true;
			}
			return false;
		});
	});

	eleventyConfig.addFilter("findSiteDataByUrl", (url, sites) => {
		let sitesArr = sites;
		if(!Array.isArray(sitesArr)) {
			sitesArr = Object.values(sites);
		}

		for(let site of sitesArr) {
			if(!url || !site.url) {
				continue;
			}
			let lowerUrl = url.toLowerCase();
			let siteUrl = site.url.toLowerCase();
			if(lowerUrl === siteUrl || lowerUrl === `${siteUrl}/` || `${lowerUrl}/` === siteUrl) {
				return site;
			}
		}
	});

	eleventyConfig.addFilter("repeat", (number, str) => {
		if(number > 0) {
			return str + (new Array(number)).join(str);
		}
		return "";
	});

	eleventyConfig.addFilter("topAuthors", sites => {
		let counts = {};
		let eligibleCounts = {};
		getAuthors(sites, (name, site) => {
			let key = name.toLowerCase();
			if(!counts[key]) {
				counts[key] = 0;
			}
			counts[key]++;

			if(site.url && !site.disabled && !site.superfeatured && !site.hideOnHomepage) {
				if(!eligibleCounts[key]) {
					eligibleCounts[key] = 0;
				}
				eligibleCounts[key]++;
			}
		});

		let top = [];
		for(let author in counts) {
			if(counts[author]) {
				top.push({
					name: author,
					count: counts[author],
					eligibleCount: eligibleCounts[author],
				});
			}
		}
		top.sort((a, b) => {
			return b.count - a.count;
		});

		return top;
	});

	eleventyConfig.addFilter("head", (arr, num) => {
		return num ? arr.slice(0, num) : arr;
	});

	// Sort an object that has `order` props in values. Return an array
	eleventyConfig.addFilter("sortObjectByOrder", (obj) => {
		let arr = [];
		for(let key in obj) {
			arr.push(obj[key]);
		}
		return arr.sort((a, b) => {
			return (b.order || 0) - (a.order || 0);
		});
	});

	// // Case insensitive check an object for a key
	// eleventyConfig.addFilter("has", objectHas);

	return {
		templateFormats: ["html", "njk", "md", "11ty.js"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: false
	};
};
