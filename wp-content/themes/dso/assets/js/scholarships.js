(function() {
    const animatableSections = {
        ".tag-container": {
            selectors: [ ".tag-list" ]
        },
        ".student-hero": {
            selectors: [ ".kv", ".description", ".student-card" ]
        },
        ".journey": {
            selectors: [ ".heading", ".cta" ]
        },
        ".benefits": {
            selectors: [ ".heading", "ul", ".columns" ]
        },
        ".enroll": {
            selectors: [ ".heading", ".requirements", ".cta", ".work-fields" ]
        }
    };
    function isMobile() {
        if (window.matchMedia) return window.matchMedia("(max-width:991px)").matches;
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width <= 9911;
    }
    document.addEventListener("DOMContentLoaded", function() {
        const scholarships = document.querySelector(".scholarships");
        if (!scholarships) return;
        const header = document.querySelector(".header__main");
        if (header) {
            document.addEventListener("scroll", function(e) {
                if (window.scrollY > 10) {
                    header.classList.add("below-fold");
                } else {
                    header.classList.remove("below-fold");
                }
            });
        }
        for (const selector in animatableSections) {
            const sections = document.querySelectorAll(".scholarships " + selector);
            sections.forEach(section => {
                const animatables = section.querySelectorAll(animatableSections[selector].selectors.join(","));
                if (isMobile()) {
                    animatables.forEach(animatable => {
                        if (!animatable.classList.contains("animated")) animatable.classList.add("animated");
                    });
                }
                const observer = new IntersectionObserver((entries, observer) => {
                    if (isMobile()) {
                        animatables.forEach(animatable => {
                            if (!animatable.classList.contains("animated")) animatable.classList.add("animated");
                        });
                    }
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animatables.forEach(animatable => {
                                if (!animatable.classList.contains("animated")) animatable.classList.add("animated");
                            });
                        } else {}
                    });
                }, {
                    rootMargin: "0px",
                    threshold: .5
                });
                observer.observe(section);
            });
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        $('.banner-title .row p').attr("data-aos", "fade-up");
        $('.banner-title h2').removeAttr("data-aos");
        $('.banner-title .secondary-font').removeAttr("data-aos");

        $('.int_s09 .title p').attr("data-aos", "fade-right");
        $('.int_s09 .title h1').removeAttr("data-aos");

        $(".int_s07 .green").parent().find('strong').attr("style", "color:#307730");
        $(".int_s07 .red").parent().find('strong').attr("style", "color:#D26665");
    });
})();