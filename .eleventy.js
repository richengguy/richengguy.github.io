const markdown = require("markdown-it");
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(UpgradeHelper);

    // Enable custom data formats.
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    // Ensure eleventy is aware of SCSS changes.
    eleventyConfig.addWatchTarget("scss");
    eleventyConfig.addWatchTarget("_build");

    // Ensure that generated assets (i.e. js & css) are copied, along with
    // everything in "src/publications" and some GH Pages configuration files.
    eleventyConfig.addPassthroughCopy({"_build/css": "css"});
    eleventyConfig.addPassthroughCopy("src/.nojekyll");
    eleventyConfig.addPassthroughCopy("src/CNAME");
    eleventyConfig.addPassthroughCopy("src/publications");

    // Add a "markdown" filter to allow for some custom markdown usage.
    md = markdown({
        html: false,
        linkify: true
    });
    eleventyConfig.addFilter("markdown", contents => md.render(contents));

    // Create a "sortedProjects" collection that has all of the projects sorted
    // alphabetically, by name.
    eleventyConfig.addCollection("sortedProjects", function(collectionsApi) {
        return collectionsApi.getFilteredByTag("projects").sort((a, b) => a.data.title.localeCompare(b.data.title));
    });

    // Set 'src' at the source folder and have it output to '_site'.
    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
};
