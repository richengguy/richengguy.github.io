// Return the current build date (i.e. whenever eleventy invoks this) to use for
// showing a copyright year/date.  This is based off of the solution in
// https://www.markllobrera.com/posts/eleventy-date-output/

module.exports = function() {
    var date = new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay()
    };
}
