// Check if mobile device
const isMobileDevice = () =>
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1;

document.addEventListener('alpine:init', function() {
    // Alpine.js
    Alpine.data(
        "profileWidgetPostListData",
        (postsCount, currentCategoryId, instance) => ({
            currentCategoryId: currentCategoryId,
            displayingPosts: [],
            // Post count from server-side
            postsCount: postsCount,
            // Page use for query
            currentPage: 1,
            isShowLoadMoreBtn: false,
            instance: instance,
            init() {
                this.isShowLoadMoreBtn = this.postsCount > 3;
            },
            deepClone(proxy) {
                return JSON.parse(JSON.stringify(proxy));
            },
            // Posts display at screen
            reInitJs() {
                // Video.js
                const videoElements = document.querySelectorAll(".video-js");

                videoElements.forEach((videoElement) => videojs(videoElement));
            },
            async loadMorePosts() {
                NProgress.start();

                const newCurrentPage = this.currentPage + 1;
                let isCanBeLoadMore = newCurrentPage * 3 <= this.postsCount;

                if (isCanBeLoadMore) {
                    let response;

                    if (this.currentCategorySlug === "all-stories")
                        response = await fetch(
                            `/static/wp-content/themes/dso/acf-json/profile_page_${newCurrentPage}.json`
                        );
                    else
                        response = await fetch(
                            `/static/wp-content/themes/dso/acf-json/profile_page_${newCurrentPage}.json`
                        );

                    if (response.status === 200) {
                        const posts = await response.json();
                        const total = response.headers.get("X-WP-Total");

                        isCanBeLoadMore = total - newCurrentPage * 3 > 0;

                        // Must use deep clone approach:
                        // Read more: https://stackoverflow.com/questions/69407819/concatenating-arrays-in-a-alpine-data-objects-returns-proxies
                        const displayingPostsClone = this.deepClone(
                            this.displayingPosts
                        );
                        this.displayingPosts = [
                            ...this.displayingPosts,
                            ...posts
                        ];
                        this.isShowLoadMoreBtn = isCanBeLoadMore;
                        this.currentPage = newCurrentPage;

                        // Need this magic property to init videojs elements after DOM update
                        // Read more: https://alpinejs.dev/magics/nextTick
                        this.$nextTick(() => {
                            this.reInitJs();
                        });
                    }

                    if (response.status === 400) this.isShowLoadMoreBtn = false;
                } else {
                    this.isShowLoadMoreBtn = false;
                }

                NProgress.done();
            },
            async changeCategory(name, slug, id) {
                NProgress.start();

                if (slug !== this.currentCategorySlug) {
                    // currentCategoryName and currentCategorySlug defined in profile widget markup
                    // not in this data because rendering reason
                    this.currentCategoryId = id;
                    this.currentCategorySlug = slug;
                    this.currentCategoryName = name;

                    let response, responseTotal = null;

                    if (this.currentCategorySlug === "all-stories") {
                        response = await fetch(
                            `/static/wp-content/themes/dso/acf-json/profile_page_1.json`
                        );
                        responseTotal = await fetch(
                            `/static/wp-content/themes/dso/acf-json/profile_total.json`
                        );
                    } else
                        response = await fetch(
                            `/static/wp-content/themes/dso/acf-json/profile_cat_${this.currentCategoryId}.json`
                        );



                    if (response.status === 200) {
                        const posts = await response.json();

                        // Get total posts count from API response header
                        // const total = response.headers.get("X-WP-Total");
                        const total = responseTotal ? await responseTotal.text() : 0;

                        this.displayingPosts = posts;
                        this.postsCount = total;

                        // Reset current page
                        this.currentPage = 1;
                        this.isShowLoadMoreBtn = total - 3 > 0;

                        // Need this magic property to init videojs elements after DOM update
                        // Read more: https://alpinejs.dev/magics/nextTick
                        this.$nextTick(() => {
                            this.reInitJs();
                        });

                        document
                            .getElementById(
                                "dso-stories__profile-widget__posts-list"
                            )
                            .scrollIntoView({ behavior: "smooth" });
                    }

                    if (response.status === 400) this.isShowLoadMoreBtn = false;
                }

                NProgress.done();
            }
        })
    );

    Alpine.data(
        "profileWidgetLayout1Data",
        (poster, title, url, startAt = 0) => ({
            poster: poster,
            title: title,
            url: url,
            startAt: startAt,
            isVideo: false,
            init() {
                let lowerTrimmedUrl = url.trim().toLowerCase();
                this.startAt = this.startAt.trim();

                if (
                    /.mp4/i.test(lowerTrimmedUrl) ||
                    /drive.google.com/i.test(lowerTrimmedUrl)
                ) {
                    this.id =
                        new Date().toISOString().replace(/[-T:.Z]/g, "") +
                        Math.floor(Math.random() * 20 + 1);
                    this.isVideo = true;
                } else {
                    this.url = url.replace(/watch\?v\=/i, "embed/");
                    this.title = title.replace(/(<([^>]+)>)/gi, "");
                    this.isVideo = false;
                }
            }
        })
    );
})