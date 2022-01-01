module.exports = function(eleventyConfig) {
    // Ensure that generated assets (i.e. js & css) are copied, along with
    // everything in "src/publications".
    eleventyConfig.addPassthroughCopy({"_build/css": "css"});
    eleventyConfig.addPassthroughCopy("src/publications");

    // Set 'src' at the source folder and have it output to '_site'.
    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
};
