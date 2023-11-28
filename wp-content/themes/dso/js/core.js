document.addEventListener("DOMContentLoaded", () => {
    AOS.init();
    
    if ($(".sw-super-mentors").length > 0) {
        var $s = [];

        $(".sw-super-mentors")
            .find(".swiper-slide")
            .each(function (index, element) {
                var $id = $.trim(
                    $(this)
                        .find("a")
                        .attr("data-bs-target")
                        .replace(/#modal/g, "sw")
                );
                $s[$id] = new Swiper("." + $id, {
                    initialSlide: 0,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    breakpoints: {
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 40
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 40
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50
                        }
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                });
            });

        $("body").on(
            "click",
            ".modal-super-mentors .modal-footer button",
            function (e) {
                var $p = $(this).parents(".modal-super-mentors");
                var $id = $(this).parents(".modal-super-mentors").attr("id");
                var $t = $.trim(
                    $(this)
                        .attr("data-bs-target")
                        .replace(/#modal/g, "sw")
                );
                $s[$t].slideTo(0, 1, true);
            }
        );
    }

    var $initial = 0;
    var $x = [];
    var $list = [];
    var $list_item = [];
    $list_item["initial"] = 0;
    $list_item["status"] = "none";

    if ($(".nav-tablist .nav-select").length > 0) {
        for (var $i = 0; $i < $(".nav-tablist .nav-select").length; $i++) {
            $list[$i] = $list_item;
        }
        console.log(" suppose");

        $("body").on("click", ".nav-tablist .nav-select", function (e) {
            console.log(" click");
            var $id = $(this).attr("id");
            for (var $i = 0; $i < $(".nav-tablist .nav-select").length; $i++) {
                if ($id == $(".nav-tablist .nav-select").eq($i).attr("id")) {
                    if ($list[$i]["initial"] == 0) {
                        var $status =
                            $(this).next("ul.select-options").css("display") ==
                            "none"
                                ? "block"
                                : "none";
                        if ($status == "block") {
                            $(".nav-tablist .nav-select")
                                .eq($i)
                                .addClass("expanded");
                        } else {
                            $(".nav-tablist .nav-select")
                                .eq($i)
                                .removeClass("expanded");
                        }
                        $(this)
                            .next("ul.select-options")
                            .css("display", $status);
                        $list[$i]["initial"] = 1;
                        $list[$i]["status"] = $status;
                    }
                }
                if ($i + 1 == $(".nav-tablist .nav-select").length) {
                    $list[$i]["initial"] = 0;
                }
            }
        });
        $("body").on(
            "click",
            ".so-widget-dso-tabs-so-widget .bullet-title .btn",
            function (e) {
                $(this).parents(".bullet-title").addClass("hide");
                $(this)
                    .parents(".bullet-title")
                    .siblings(".bullet-item")
                    .addClass("show");
            }
        );
        $("body").on(
            "click",
            ".so-widget-dso-tabs-so-widget .bullet-item .bullet-back",
            function (e) {
                e.preventDefault();
                $(this).parents(".bullet-item").removeClass("show");
                $(this)
                    .parents(".bullet-item")
                    .siblings(".bullet-title")
                    .removeClass("hide");
            }
        );
    }

    if ($(".career-video-container.video-js").length > 0) {
        var $v = [];
        for (
            var $i = 0;
            $i < $(".career-video-container.video-js").length;
            $i++
        ) {
            var $id = $(".career-video-container.video-js").eq($i).attr("id");
            $v[$id] = videojs($id, {
                aspectRatio: "16:9",
                fluid: true,
                fill: true
            });
        }
    }

    if ($(".modal-video-tab").length > 0) {
        $(".modal-video-tab").each(function (index, element) {
            var $id = $(this).attr("id");
            $x[$id] = videojs($id, {
                aspectRatio: "16:9",
                fluid: true,
                fill: true
            });

            $x[$id].ready(function () {
                this.on("play", function () {
                    if ($("#" + $id).hasClass("modal-video-tab")) {
                        $("#" + $id)
                            .find(".video-js")
                            .removeClass("vjs-user-inactive");
                        $("#" + $id)
                            .find(".video-js")
                            .addClass("vjs-user-active");
                        $("#" + $id)
                            .find(".video-js")
                            .addClass("vjs-has-started");
                    } else {
                        $("#" + $id).removeClass("vjs-user-inactive");
                        $("#" + $id).addClass("vjs-user-active");
                        $("#" + $id).addClass("vjs-has-started");
                    }
                    $("#" + $id)
                        .find(".vjs-big-play-button")
                        .css("display", "none");
                }),
                    this.on("ended", function () {
                        var $id = $(this).attr("id");
                        if ($("#" + $id).hasClass("modal-video-tab")) {
                            $("#" + $id)
                                .find(".video-js")
                                .addClass("vjs-user-active");
                            $("#" + $id)
                                .find(".video-js")
                                .removeClass("vjs-has-started");
                            $("#" + $id)
                                .find(".video-js")
                                .removeClass("vjs-user-inactive");
                            $("#" + $id)
                                .find(".video-js")
                                .removeClass("vjs-ended");
                        } else {
                            $("#" + $id).removeClass("vjs-has-started");
                            $("#" + $id).removeClass("vjs-user-inactive");
                            $("#" + $id).removeClass("vjs-ended");
                            $("#" + $id).addClass("vjs-user-active");
                        }
                        $("#" + $id)
                            .find(".vjs-big-play-button")
                            .css("display", "block");
                    });
            });
        });

        $("body").on("click", ".modal-video-tab .close", function (e) {
            var vid = $(this).parents(".modal-video-tab").attr("id");
            $x[vid].pause();
            $(this)
                .parents(".modal-video-tab")
                .find(".vjs-big-play-button")
                .show();
            $("#" + vid).removeClass("show");
            $("#" + vid).attr("data-bs-dismiss", "modal");
            $("#" + vid).trigger("click");
        });
    }
});
