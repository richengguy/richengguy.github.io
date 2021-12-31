module.exports = function(eleventyConfig) {
    // Ensure publications are copied as-is.
    eleventyConfig.addPassthroughCopy("publications");
}
