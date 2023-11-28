(function() {
    const startTime = performance.now();
    document.addEventListener("DOMContentLoaded", function() {
        console.log(`HTML loaded after ${(performance.now() - startTime).toFixed(0)}ms`);
        const footer = document.querySelector("footer.footer");
        if (footer) {
            const links = footer.querySelectorAll("a");
            links.forEach(function(a) {
                a.setAttribute("target", "_blank");
            });
        }
        const home = document.querySelector(".home.section-item");
        if (!home) return;
        const headline = home.querySelector(".home-hero .home-headline");
        if (headline) {
            headline.classList.add("enter");
            const tokens = headline.textContent.split(/[^ \w]+/s);
            const duration = .3;
            const interval = .3;
            headline.innerHTML = tokens.map(function(w, i) {
                return `<span class="token"
                style="animation: home-headline-enter ${duration}s ${interval * i}s ease-out forwards">${w.trim().toUpperCase()}</span> `;
            }).join("");
        }
    });
    window.addEventListener("load", function() {
        console.log(`Assets loaded after ${(performance.now() - startTime).toFixed(0)}ms`);
    });
})();