/* Keep local links valid after hiding the current file in the address bar. */
(function () {
    var path = window.location.pathname;
    var rootPath = path.replace(/html\/[^/]+$/, "").replace(/index\.html$/, "");
    var links = document.querySelectorAll("a[href]");

    links.forEach(function (link) {
        var href = link.getAttribute("href");

        if (href && !href.startsWith("#") && !href.includes("://") && !href.startsWith("mailto:")) {
            link.setAttribute("href", link.href);
        }
    });

    if (rootPath && rootPath !== path) {
        window.history.replaceState({}, document.title, rootPath);
    }
})();
