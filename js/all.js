(function($){
    "use strict"; // Start of use strict
    
    
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    
    $(window).on("load", function(){
        
        // Page loader
        
        $("body").imagesLoaded(function(){
            $(".page-loader div").fadeOut();
            $(".page-loader").delay(200).fadeOut("slow");
        });        
        
        initWorkFilter();
        init_scroll_navigate();
        
        $(window).trigger("scroll");
        $(window).trigger("resize");
        
        // Hash menu forwarding
        if ((window.location.hash) && ($(window.location.hash).length)){
            var hash_offset = $(window.location.hash).offset().top;
            $("html, body").animate({
                scrollTop: hash_offset
            });
        }
        
    });
    
    $(document).ready(function(){
        $(window).trigger("resize");            
        init_classic_menu();
        init_fullscreen_menu();
        init_side_panel();
        init_lightbox();
        init_parallax();
        init_shortcodes();
        init_tooltips();
        init_team();
        initPageSliders();
        init_map();
        init_wow();
        init_masonry();
    });
    
    $(window).resize(function(){        
        init_classic_menu_resize();
        init_side_panel_resize();
        js_height_init();
        split_height_init();
    });
    
    
    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }
    
    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
    
    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }
    
    
    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */
    
    // Sections backgrounds
    
    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // Function for block height 100%
    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }
    
    // Function equal height
    !function(a){
        a.fn.equalHeights = function(){
            var b = 0, c = a(this);
            return c.each(function(){
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function(){
            var b = a(this), c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);
    
    
    // Progress bars
    var progressBar = $(".progress-bar");
    progressBar.each(function(indx){
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });
    
    

    /* ---------------------------------------------
     Nav panel classic
     --------------------------------------------- */
    
    var mobile_nav = $(".mobile-nav");
    var desktop_nav = $(".desktop-nav");
    
    mobile_nav.attr("aria-expanded", "false");
    
    function init_classic_menu_resize(){
        
        // Mobile menu max height
        $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");
        
        // Mobile menu style toggle
        if ($(window).width() <= 1024) {
            $(".main-nav").addClass("mobile-on");
        }
        else 
            if ($(window).width() > 1024) {
                $(".main-nav").removeClass("mobile-on");
                desktop_nav.show();
            }
    }
    
    function init_classic_menu(){
    
        
        // Navbar sticky
        
        $(".js-stick").sticky({
            topSpacing: 0
        });
        
        
        height_line($(".inner-nav > ul > li > a"), $(".main-nav"));
        height_line(mobile_nav, $(".main-nav"));
        
        mobile_nav.css({
            "width": $(".main-nav").height() + "px"
        });
        
        // Transpaner menu
                
        if ($(".main-nav").hasClass("transparent")){
           $(".main-nav").addClass("js-transparent"); 
        }
        
        $(window).scroll(function(){        
            
            if ($(window).scrollTop() > 10) {
                $(".js-transparent").removeClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").addClass("small-height");
            }
            else {
                $(".js-transparent").addClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").removeClass("small-height");
            }
            
            
        });
        
        // Mobile menu toggle
        
        mobile_nav.click(function(){
                  
            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
                $(this).attr("aria-expanded", "false");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");
                $(this).attr("aria-expanded", "true");
                // Fix for responsive menu
                if ($(".main-nav").hasClass("not-top")){
                    $(window).scrollTo(".main-nav", "slow"); 
                }                
            }   
                     
        });
        
        $(document).on("click", function(event){            
            if ($(window).width() <= 1024) {
                var $trigger = $(".main-nav");
                if ($trigger !== event.target && !$trigger.has(event.target).length) {
                    desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                    mobile_nav.removeClass("active");
                    mobile_nav.attr("aria-expanded", "false");
                }
            }
        });
        
        mobile_nav.keydown(function(e){
            if (e.keyCode == 13 || e.keyCode == 32) {
                if (desktop_nav.hasClass("js-opened")) {
                    desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                    $(this).removeClass("active");
                    $(this).attr("aria-expanded", "false");
                }
                else {
                    desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                    $(this).addClass("active");
                    $(this).attr("aria-expanded", "true");
                    // Fix for responsive menu
                    if ($(".main-nav").hasClass("not-top")) {
                        $(window).scrollTo(".main-nav", "slow");
                    }
                }
            }        
        });
        
        desktop_nav.find("a:not(.mn-has-sub)").click(function(){
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
                mobile_nav.attr("aria-expanded", "false");
            }
        });
        
        
        // Sub menu
        
        var mnHasSub = $(".mn-has-sub");
        var mnThisLi;
        
        mnHasSub.attr({
            "role": "button",
            "aria-expanded": "false",
            "aria-haspopup": "true"
        });
        
        $(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");
        
        mnHasSub.click(function(){
        
            if ($(".main-nav").hasClass("mobile-on")) {
                mnThisLi = $(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    $(this).attr("aria-expanded", "false");
                    mnThisLi.find(".mn-sub:first").slideUp(function(){
                        mnThisLi.removeClass("js-opened");
                        mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                }
                else {
                    $(this).attr("aria-expanded", "true");
                    $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".mn-sub:first").slideDown();
                }
                
                return false;
            }
            
        });
        
        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
                $(this).find(".mn-has-sub:first")
                    .attr("aria-expanded", "true")
                    .addClass("js-opened");
                $(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
            }
            
        }, function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
                $(this).find(".mn-has-sub:first")
                    .attr("aria-expanded", "false")
                    .removeClass("js-opened");
                $(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
            
        });
        
        /* Keyboard navigation for main menu */
       
        mnHasSub.keydown(function(e){            
        
            if ($(".main-nav").hasClass("mobile-on")) {                
                if (e.keyCode == 13 || e.keyCode == 32) {                
                    mnThisLi = $(this).parent("li:first");
                    if (mnThisLi.hasClass("js-opened")) {
                        $(this).attr("aria-expanded", "false");
                        mnThisLi.find(".mn-sub:first").slideUp(function(){                            
                            mnThisLi.removeClass("js-opened");
                            mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                        });
                    }
                    else {
                        $(this).attr("aria-expanded", "true");
                        $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                        mnThisLi.addClass("js-opened");
                        mnThisLi.find(".mn-sub:first").slideDown();
                    }
                    
                    return false;
                }
            }
            
        });
        
        $(".inner-nav a").focus(function(){
            if (!($(".main-nav").hasClass("mobile-on")) && ($("html").hasClass("no-touch")) && (!($(this).parent("li").find(".mn-sub:first").is(":visible")))) {
                $(this).parent("li").parent().children().find(".mn-has-sub:first")
                    .attr("aria-expanded", "false")
                    .removeClass("js-opened");
                $(this).parent("li").parent().children().find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
        });
     
        $(".inner-nav a").first().keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (e.shiftKey && e.keyCode == 9) {
                    $(this).parent("li").find(".mn-has-sub:first")
                        .attr("aria-expanded", "false")
                        .removeClass("js-opened");
                    $(this).parent("li").find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
                }
            }
        });
        
        $(".mn-sub li:last a").keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (!e.shiftKey && e.keyCode == 9) {
                    $(this).parent("li").parent().parent().find(".mn-has-sub:first")
                        .attr("aria-expanded", "false")
                        .removeClass("js-opened");
                    $(this).parent("li").parent().stop(true, true).delay(100).fadeOut("fast");
                }
            }
        }); 

        $(document).keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (e.keyCode == 27) {
                    if (mnHasSub.parent("li").find(".mn-sub:first li .mn-sub").is(":visible")){
                        mnHasSub.parent("li").find(".mn-sub:first li .mn-has-sub")
                            .attr("aria-expanded", "false")
                            .removeClass("js-opened");
                        mnHasSub.parent("li").find(".mn-sub:first li .mn-sub").stop(true, true).delay(100).fadeOut("fast");
                    } else{
                        mnHasSub.parent("li").find(".mn-has-sub:first")
                            .attr("aria-expanded", "false")
                            .removeClass("js-opened");
                        mnHasSub.parent("li").find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
                    }
                    
                }
            }
        });
         
        mnHasSub.on("click", function () { 
            if ((!($(".main-nav").hasClass("mobile-on"))) && ($("html").hasClass("no-touch"))) {                
                if (!($(this).hasClass("js-opened"))){
                    $(this).addClass("js-opened");
                    $(this).attr("aria-expanded", "true");
                    $(this).parent("li").find(".mn-sub:first").fadeIn("fast");
                    return false;
                }
                else{
                    $(this).removeClass("js-opened");
                    $(this).attr("aria-expanded", "false");
                    $(this).parent("li").find(".mn-sub:first").fadeOut("fast");
                    return false;
                }                
            }            
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Scroll navigation
     --------------------------------------------- */
    
    function init_scroll_navigate(){
        
        $(".local-scroll").localScroll({
            target: "body",
            duration: 1500,
            offset: 0,
            easing: "easeInOutExpo",
            onAfter: function(anchor, settings){
                anchor.focus();
                if (anchor.is(":focus")) {
                    return !1;
                }
                else {
                    anchor.attr('tabindex', '-1');
                    anchor.focus()
                }        
            }
        });
        
        var sections = $(".home-section, .split-section, .page-section");
        var menu_links = $(".scroll-nav li a");
        
        $(window).scroll(function(){
        
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
            });
            
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Lightboxes
     --------------------------------------------- */
    
    function init_lightbox(){
    
        // Works Item Lightbox				
        $(".work-lightbox-link").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        
        // Works Item Lightbox	
        $(".lightbox-gallery-1").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        
        // Other Custom Lightbox
        $(".lightbox-gallery-2").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        $(".lightbox-gallery-3").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        $(".lightbox").magnificPopup();
        
    }
    
    
    
    /* -------------------------------------------
     Parallax
     --------------------------------------------- */
    
    function init_parallax(){
    
        // Parallax        
        if (($(window).width() >= 1024) && (mobileTest == false) && $("html").hasClass("no-touch")) {
            $(".parallax-1").parallax("50%", 0.1);
            $(".parallax-2").parallax("50%", 0.2);
            $(".parallax-3").parallax("50%", 0.3);
            $(".parallax-4").parallax("50%", 0.4);
            $(".parallax-5").parallax("50%", 0.5);
            $(".parallax-6").parallax("50%", 0.6);
            $(".parallax-7").parallax("50%", 0.7);
            $(".parallax-8").parallax("50%", 0.5);
            $(".parallax-9").parallax("50%", 0.5);
            $(".parallax-10").parallax("50%", 0.5);
            $(".parallax-11").parallax("50%", 0.05);
        }
        
    }
    
    
    
    /* ---------------------------------------------
     Shortcodes
     --------------------------------------------- */
    	
    function init_shortcodes(){
        // Tabs minimal
        var tpl_tab_height;
        $(".tpl-minimal-tabs > li > a").click(function(){
        
            if (!($(this).parent("li").hasClass("active"))) {
                tpl_tab_height = $(".tpl-minimal-tabs-cont > .tab-pane").filter($(this).attr("href")).height();
                $(".tpl-minimal-tabs-cont").animate({
                    height: tpl_tab_height
                }, function(){
                    $(".tpl-minimal-tabs-cont").css("height", "auto");
                });
                
            }
            
        });
        
        // Accordion        
        $(".accordion").each(function(){
            var allPanels = $(this).children("dd").hide();
            var allTabs = $(this).children("dt").children("a");
            allTabs.attr("role", "button");
            $(this).children("dd").first().slideDown("easeOutExpo");
            $(this).children("dt").children("a").first().addClass("active");
            $(this).children("dt").children("a").attr("aria-expanded", "false");
            $(this).children("dt").children("a").first().attr("aria-expanded", "true");
                        
            $(this).children("dt").children("a").click(function(){        
                var current = $(this).parent().next("dd");
                allTabs.removeClass("active");
                $(this).addClass("active");
                allTabs.attr("aria-expanded", "false");
                $(this).attr("aria-expanded", "true");
                allPanels.not(current).slideUp("easeInExpo");
                $(this).parent().next().slideDown("easeOutExpo");                
                return false;                
            });
            
         });        
        
        // Toggle
        var allToggles = $(".toggle > dd").hide();
        var allTabs = $(".toggle > dt > a");
        allTabs.attr({
            "role": "button",
            "aria-expanded": "false"
            });
        
        $(".toggle > dt > a").click(function(){
        
            if ($(this).hasClass("active")) {            
                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");
                $(this).attr("aria-expanded", "false");                
            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).attr("aria-expanded", "true");
                $(this).parent().next().slideDown("easeOutExpo");
            }
            
            return false;
        });
        
        // Responsive video
        $(".video, .resp-media, .blog-media").fitVids();
        $(".work-full-media").fitVids(); 
               
    }
    
    
    
    /* ---------------------------------------------
     Tooltips (bootstrap plugin activated)
     --------------------------------------------- */
    
    function init_tooltips(){
    
        $(".tooltip-bot, .tooltip-bot a, .nav-social-links a").tooltip({
            placement: "bottom"
        });
        
        $(".tooltip-top, .tooltip-top a").tooltip({
            placement: "top"
        });
        
    }
      
      
    
    /* ---------------------------------------------
     Team
     --------------------------------------------- */   
     
    function init_team(){
    
        // Hover        
        $(".team-item").click(function(){
            if ($("html").hasClass("mobile")) {
                $(this).toggleClass("js-active");
            }
        });
        
        // Keayboar navigation for team section        
        $(".team-social-links > a").on("focus blur", function(){
             if (!($("html").hasClass("mobile"))) {
                 $(this).parent().parent().parent().parent().toggleClass("js-active");
             }       
        });
        
    }
    
    
})(jQuery); // End of use strict


/* ---------------------------------------------
 Sliders
 --------------------------------------------- */
function initPageSliders(){
    (function($){
        "use strict";
        
        function owl_keynav(el){
            el.attr({
                "role": "region",
                "aria-roledescription": "carousel"
            });         
            el.find(".owl-prev, .owl-next").attr({
                "role": "button",
                "tabindex": "0"
            });
            if (el.hasClass("autoplay")){
                el.prepend("<button class='owl-pause-button visually-hidden sr-only'>Stop Sliding</button>");
                el.on("click", ".owl-pause-button", function(){
                    if ($(this).hasClass("owl-pause-button-paused")) {
                        $(this).removeClass("owl-pause-button-paused");
                        $(this).html("Stop Sliding");
                        var this_owl = el.data("owlCarousel");
                        this_owl.play();                       
                    } else {                    
                        $(this).addClass("owl-pause-button-paused");
                        $(this).html("Start Sliding");
                        var this_owl = el.data("owlCarousel");
                        this_owl.stop();
                    }     
                });            
            }  
            el.prepend(el.find(".owl-controls"));     
            el.on("click", ".owl-page, .owl-prev, .owl-next", function(e){
                el.find(".owl-pause-button").addClass("owl-pause-button-paused");
                el.find(".owl-pause-button").html("Start Sliding");
                var this_owl = el.data("owlCarousel");
                this_owl.stop();
            });   
            el.on("keydown", ".owl-page, .owl-prev, .owl-next", function(e){
                if (e.keyCode == 13 || e.keyCode == 32) {
                    el.find(".owl-pause-button").addClass("owl-pause-button-paused");
                    el.find(".owl-pause-button").html("Start Sliding");
                    var this_owl = el.data("owlCarousel");
                    this_owl.stop();
                }
            });          
            el.on("keydown", ".owl-prev", function(e){
                if (e.keyCode == 13 || e.keyCode == 32) {
                    var this_owl = el.data("owlCarousel");
                    this_owl.prev();
                    return false;                    
                }
            });
            el.on("keydown", ".owl-next", function(e){
                if (e.keyCode == 13 || e.keyCode == 32) {
                    var this_owl = el.data("owlCarousel");
                    this_owl.next();
                    return false;                   
                }
            });                      
        }
        
        function owl_update(el){       
            el.find(".owl-item").attr({
                "aria-hidden": "true"
            });
            el.find(".owl-item.active").removeAttr("aria-hidden");
            el.find(".owl-item a, .owl-item button, .owl-item input").attr({
                "tabindex": "-1"
            });
            el.find(".owl-item.active a, .owl-item.active button, .owl-item.active input").attr({
                "tabindex": "0"
            });
        }
        
        // Fullwidth slider
        $(".fullwidth-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Fullwidth slider fade
        $(".fullwidth-slider-fade").owlCarousel({
            transitionStyle: "fadeUp",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Fullwidth gallery
        $(".fullwidth-gallery").addClass("autoplay");
        $(".fullwidth-gallery").owlCarousel({
            transitionStyle: "fade",
            autoPlay: 5000,
            slideSpeed: 700,
            singleItem: true,
            autoHeight: true,
            navigation: false,
            pagination: false,
            lazyLoad: true,
            addClassActive : true,
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Item carousel
        $(".item-carousel").addClass("autoplay");
        $(".item-carousel").owlCarousel({
            autoPlay: 2500,
            stopOnHover: false,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 1],
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Small item carousel
        $(".small-item-carousel").addClass("autoplay");
        $(".small-item-carousel").owlCarousel({
            autoPlay: 2500,
            stopOnHover: false,
            items: 6,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 2],
            pagination: false,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Single carousel
        $(".single-carousel").owlCarousel({
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Content Slider
        $(".content-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });

        // Photo slider
        $(".photo-slider").owlCarousel({
            slideSpeed: 350,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        }); 
        
        // Work slider
        $(".work-full-slider").owlCarousel({
            slideSpeed : 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Blog posts carousel
        $(".blog-posts-carousel").addClass("autoplay");
        $(".blog-posts-carousel").owlCarousel({
            autoPlay: 5000,
            stopOnHover: false,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            pagination: false,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Blog posts carousel alt
        $(".blog-posts-carousel-alt").addClass("autoplay");
        $(".blog-posts-carousel-alt").owlCarousel({
            autoPlay: 3500,
            stopOnHover: false,
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            pagination: false,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Image carousel
        $(".image-carousel").addClass("autoplay");
        $(".image-carousel").owlCarousel({
            autoPlay: 5000,
            stopOnHover: false,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Fullwidth slideshow        
        var sync1 = $(".fullwidth-slideshow");
        var sync2 = $(".fullwidth-slideshow-pager");
        $(".fullwidth-slideshow").addClass("autoplay");
        $(".fullwidth-slideshow").owlCarousel({
            autoPlay: 5000,
            stopOnHover: false,
            transitionStyle: "fade",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            addClassActive : true,
            pagination: false,
            navigation: true,
            navigationText: ["<span class='sr-only'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='sr-only'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterAction : syncPosition,
            responsiveRefreshRate : 200
        });
        $(".fullwidth-slideshow-pager").addClass("autoplay");
        $(".fullwidth-slideshow-pager").owlCarousel({
            autoPlay: 5000,
            stopOnHover: false,
            items: 8,
            itemsDesktop: [1199,8],
            itemsDesktopSmall: [979,7],
            itemsTablet: [768,6],
            itemsMobile: [480,4],
            autoHeight: true,
            pagination: false,
            navigation: false,
            responsiveRefreshRate : 100,
            afterInit : function(el){
              el.find(".owl-item").eq(0).addClass("synced");
              el.find(".owl-item").attr({
                  "role": "button",
                  "tabindex": "0"
              });
              $(".fullwidth-slideshow").each(function(){
                  var owl = $(this).data('owlCarousel');
                  $(".fullwidth-slideshow-pager").find(".owl-item").keydown(function(e){
                      if (event.key === "Enter") {
                          owl.goTo($(this).index());
                      }
                  });
              });
            }
        });
        
        function syncPosition(el){
            var current = this.currentItem;
            $(".fullwidth-slideshow-pager").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
            if ($(".fullwidth-slideshow-pager").data("owlCarousel") !== undefined) {
                center(current)
            }
        }
        
        $(".fullwidth-slideshow-pager").on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });
 
        function center(number){
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num === sync2visible[i]) {
                    var found = true;
                }
            }
            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                }
                else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            }
            else 
                if (num === sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", sync2visible[1])
                }
                else 
                    if (num === sync2visible[0]) {
                        sync2.trigger("owl.goTo", num - 1)
                    }
        }
          
        var owl = $(".fullwidth-slideshow").data("owlCarousel");
        
        $(document.documentElement).keyup(function(event){
            // handle cursor keys
            if (event.keyCode == 37) {
                owl.prev();
            }
            else 
                if (event.keyCode == 39) {
                    owl.next();
                }
        });

    })(jQuery);
};


/* ---------------------------------------------
     Fullscreen menu
   --------------------------------------------- */
    
    var fm_menu_wrap = $("#fullscreen-menu");
    var fm_menu_button = $(".fm-button");
    fm_menu_button.attr({
        "role": "button",
        "aria-expanded": "false"
    });
    
    fm_menu_button.keydown(function(e){
        if (e.keyCode == 32) {
            $(this).trigger("click");
            return false;
        }
    });
    
    function init_fullscreen_menu(){
        
        fm_menu_button.click(function(){
            
            if ($(this).hasClass("animation-process")){
                return false;
            }
            else{
                if ($(this).hasClass("active")) {
                    
                    $(this).removeClass("active").attr("aria-expanded", "false").css("z-index", "2001").addClass("animation-process");;
                    
                    fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function(){
                        fm_menu_wrap.fadeOut(function(){
                            fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                            fm_menu_button.css("z-index", "1030").removeClass("animation-process");
                            
                        });
                    });
                    
                    if ($(".owl-carousel").lenth) {
                        $(".owl-carousel").data("owlCarousel").play();
                    }
                    
                }
                else {
                    if ($(".owl-carousel").lenth) {
                        $(".owl-carousel").data("owlCarousel").stop();
                    }
                    $(this).addClass("active").attr("aria-expanded", "true").css("z-index", "2001").addClass("animation-process");
                    
                    fm_menu_wrap.fadeIn(function(){
                        fm_menu_wrap.find(".fm-wrapper-sub").addClass("js-active");
                        fm_menu_button.removeClass("animation-process");
                    });
                }
                
                return false;
            }
            
        });
        
        $(document).keydown(function(e){
            
            if (fm_menu_button.hasClass("animation-process")){
                return false;
            } 
            else {
                if (e.keyCode == 27 && fm_menu_button.hasClass("active")) {
                    
                    fm_menu_button.removeClass("active").attr("aria-expanded", "false").css("z-index", "2001").addClass("animation-process");;
                    
                    fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function(){
                        fm_menu_wrap.fadeOut(function(){
                            fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                            fm_menu_button.css("z-index", "1030").removeClass("animation-process");
                            
                        });
                    });
                    
                    if ($(".owl-carousel").lenth) {
                        $(".owl-carousel").data("owlCarousel").play();
                    }
                    
                    return false;
                    
                }
            }
            
        });
        
        $("#fullscreen-menu").find("a:not(.fm-has-sub)").click(function(){
            
            if (fm_menu_button.hasClass("animation-process")){
                return false;
            } 
            else {
                fm_menu_button.removeClass("active").css("z-index", "2001").addClass("animation-process");
                    
                fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function(){
                    fm_menu_wrap.fadeOut(function(){
                        fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                        fm_menu_button.css("z-index", "1030").removeClass("animation-process");
                        
                    });
                });
                
                if ($(".owl-carousel").lenth) {
                    $(".owl-carousel").data("owlCarousel").play();
                }
            }
        });
        
        // Sub menu
        
        var fmHasSub = $(".fm-has-sub");
        var fmThisLi;
        
        fmHasSub.attr({
            "role": "button",
            "aria-expanded": "false"
        });
        
        fmHasSub.keydown(function(e){
            if (e.keyCode == 32) {
                $(this).trigger("click");
                return false;
            }
        });
        
        fmHasSub.filter(".active").each(function(){
            fmThisLi = $(this).parent("li:first");
            $(this).attr("aria-expanded", "true");
            $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
            fmThisLi.addClass("js-opened");
            fmThisLi.find(".fm-sub:first").show();
        });
        
        fmHasSub.click(function(){
        
            fmThisLi = $(this).parent("li:first");
            if (fmThisLi.hasClass("js-opened")) {
                $(this).attr("aria-expanded", "false");
                fmThisLi.find(".fm-sub:first").slideUp(function(){
                    fmThisLi.removeClass("js-opened");
                    fmThisLi.find(".fm-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                });
            }
            else {
                $(this).attr("aria-expanded", "true");
                $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                fmThisLi.addClass("js-opened");
                fmThisLi.find(".fm-sub:first").slideDown();
            }
            
            return false;
            
        });
      
    }    
    

/* ---------------------------------------------
     Side panel
   --------------------------------------------- */
    
    var side_panel = $(".side-panel");
    var sp_button = $(".sp-button");
    var sp_close_button = $(".sp-close-button");
    var sp_overlay = $(".sp-overlay");
    var sp_close_button_scroll_position;
    
    function sp_panel_close(){
        side_panel.animate({
            opacity: 0,
            left: -270
        }, 500, "easeOutExpo");
        sp_overlay.fadeOut();
        
        
        if ($(".owl-carousel").lenth) {
            $(".owl-carousel").data("owlCarousel").play();
        }

        $("html").css("overflow-y", "scroll");
        $("body").css("overflow", "initial");
        $(window).scrollTop(sp_close_button_scroll_position);
    }
    
    function init_side_panel(){
        (function($){
            "use strict";
            
            sp_button.click(function(){
            
                side_panel.animate({
                    opacity: 1,
                    left: 0
                }, 500, "easeOutExpo");
                
                setTimeout(function(){
                    sp_overlay.fadeIn();
                }, 100);
                
                if ($(".owl-carousel").lenth) {
                    $(".owl-carousel").data("owlCarousel").stop();
                }
                
                sp_close_button_scroll_position = $(window).scrollTop();
                $("html, body").css("overflow", "hidden");

                return false;
            
            });
            
            sp_close_button.click(function(){
                sp_panel_close();
                return false;
            });
            sp_overlay.click(function(){
                sp_panel_close();
                return false;
            });
            
            $("#side-panel-menu").find("a:not(.sp-has-sub)").click(function(){
                if (!($(window).width() >= 1199)) {
                    sp_panel_close();
                }
            });
            
            
            // Sub menu
        
            var spHasSub = $(".sp-has-sub");
            var spThisLi;
            
            spHasSub.attr({
                "role": "button",
                "aria-expanded": "false"
            });
            
            spHasSub.keydown(function(e){
                if (e.keyCode == 32) {
                    $(this).trigger("click");
                    return false;
                }
            });
            
            spHasSub.filter(".active").each(function(){
                spThisLi = $(this).parent("li:first");
                $(this).attr("aria-expanded", "true");
                $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                spThisLi.addClass("js-opened");
                spThisLi.find(".sp-sub:first").show();
            });
            
            spHasSub.click(function(){
            
                spThisLi = $(this).parent("li:first");
                if (spThisLi.hasClass("js-opened")) {
                    $(this).attr("aria-expanded", "false");
                    spThisLi.find(".sp-sub:first").slideUp(function(){
                        spThisLi.removeClass("js-opened");
                        spThisLi.find(".sp-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                }
                else {
                    $(this).attr("aria-expanded", "true");
                    $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    spThisLi.addClass("js-opened");
                    spThisLi.find(".sp-sub:first").slideDown();
                }
                
                return false;
                
            });
            
        })(jQuery);
    }
    
    function init_side_panel_resize(){
        (function($){
            "use strict";
            
             if ($(window).width() >= 1199){
               side_panel.css({
                   opacity: 1,
                   left: 0
               });
               $(".side-panel-is-left").css("margin-left", "270px");
               sp_button.css("display", "none");
               sp_close_button.css("display", "none");
             } else {
                 if (sp_close_button.is(":hidden")) {
                     side_panel.css({
                         opacity: 0,
                         left: -270
                     });
                     $(".side-panel-is-left").css("margin-left", "0");
                     sp_button.css("display", "block");
                     sp_close_button.css("display", "block");
                 }
             }
            
        })(jQuery);
    }

/* ---------------------------------------------
 Portfolio section
 --------------------------------------------- */

// Projects filtering
var fselector = 0;
var work_grid = $("#work-grid, #isotope");

function initWorkFilter(){
    (function($){
     "use strict";
     var isotope_mode;
     if (work_grid.hasClass("masonry")){
         isotope_mode = "masonry";
     } else{
         isotope_mode = "fitRows"
     }
     
     $(".filter").click(function(){
         $(".filter").removeClass("active").attr("aria-pressed", "false");
         $(this).addClass("active").attr("aria-pressed", "true");
         fselector = $(this).attr('data-filter');

         work_grid.imagesLoaded(function(){
             work_grid.isotope({
                 itemSelector: '.mix',
                 layoutMode: isotope_mode,
                 filter: fselector
             });
         });
         return false;
     });
        
     if (window.location.hash) {
         $(".filter").each(function(){
             if ($(this).attr("data-filter") == "." + window.location.hash.replace("#", "")) {
                 $(this).trigger('click');
                 
                 $("html, body").animate({
                     scrollTop: $("#portfolio").offset().top
                 });
                 
             }
         });
     }

     work_grid.imagesLoaded(function(){
         work_grid.isotope({
             itemSelector: '.mix',
             layoutMode: isotope_mode,
             filter: fselector
         });
     });
     
     // Lazy loading plus isotope filter
     $(".img-lazy-work").on("load", function(){
         masonry_update();
     });     
     function masonry_update(){
         work_grid.imagesLoaded(function(){
             work_grid.isotope({
                 itemSelector: '.mix',
                 layoutMode: isotope_mode,
                 filter: fselector
             });
         });
     }
     work_grid.on("arrangeComplete", function(){
         $(window).trigger("scroll");
     });
    
    })(jQuery);
}





/* ---------------------------------------------
 Height 100%
 --------------------------------------------- */
function js_height_init(){
    (function($){
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function(){
            $(this).height($(this).parent().first().height());
        });
    })(jQuery);
}




/* ---------------------------------------------
 Google map
 --------------------------------------------- */

var gmMapDiv = $("#map-canvas");

function init_map(){
    (function($){
        
        $(".map-section").click(function(){
            $(this).toggleClass("js-active");
            $(this).find(".mt-open").toggle();
            $(this).find(".mt-close").toggle();
            return false;
        });

    })(jQuery);
}




/* ---------------------------------------------
 WOW animations
 --------------------------------------------- */

function init_wow(){
    (function($){    
    
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 90,
            mobile: false, 
            live: true 
        });
        
        if ($("body").hasClass("appear-animate")){
           wow.init(); 
        } else{
            $(".wow").css("opacity", "1");
        }
        
    })(jQuery);
}


/* ---------------------------------------------
 Masonry
 --------------------------------------------- */

function init_masonry(){
    (function($){    
    
        $(".masonry").imagesLoaded(function(){
            $(".masonry").masonry();
        });
        
    })(jQuery);
}
        
        
/* ---------------------------------------------
 Split section
 --------------------------------------------- */
    
function split_height_init(){
    (function($){
        
        $(".ssh-table, .split-section-content").css("height", "auto");
        
        if ($(window).width() > 992) {
            $(".split-section").each(function(){
                var split_section_height = $(this).find(".split-section-content").innerHeight();
                $(this).find(".ssh-table").height(split_section_height);
            });
        }
            
    })(jQuery);
}


/* ---------------------------------------------
 Polyfill for :focus-visible     
 --------------------------------------------- */

/**
 * https://github.com/WICG/focus-visible
 */
function init() {
  var hadKeyboardEvent = true;
  var hadFocusVisibleRecently = false;
  var hadFocusVisibleRecentlyTimeout = null;

  var inputTypesWhitelist = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    time: true,
    datetime: true,
    'datetime-local': true
  };

  /**
   * Helper function for legacy browsers and iframes which sometimes focus
   * elements like document, body, and non-interactive SVG.
   * @param {Element} el
   */
  function isValidFocusTarget(el) {
    if (
      el &&
      el !== document &&
      el.nodeName !== 'HTML' &&
      el.nodeName !== 'BODY' &&
      'classList' in el &&
      'contains' in el.classList
    ) {
      return true;
    }
    return false;
  }

  /**
   * Computes whether the given element should automatically trigger the
   * `focus-visible` class being added, i.e. whether it should always match
   * `:focus-visible` when focused.
   * @param {Element} el
   * @return {boolean}
   */
  function focusTriggersKeyboardModality(el) {
    var type = el.type;
    var tagName = el.tagName;

    if (tagName == 'INPUT' && inputTypesWhitelist[type] && !el.readOnly) {
      return true;
    }

    if (tagName == 'TEXTAREA' && !el.readOnly) {
      return true;
    }

    if (el.isContentEditable) {
      return true;
    }

    return false;
  }

  /**
   * Add the `focus-visible` class to the given element if it was not added by
   * the author.
   * @param {Element} el
   */
  function addFocusVisibleClass(el) {
    if (el.classList.contains('focus-visible')) {
      return;
    }
    el.classList.add('focus-visible');
    el.setAttribute('data-focus-visible-added', '');
  }

  /**
   * Remove the `focus-visible` class from the given element if it was not
   * originally added by the author.
   * @param {Element} el
   */
  function removeFocusVisibleClass(el) {
    if (!el.hasAttribute('data-focus-visible-added')) {
      return;
    }
    el.classList.remove('focus-visible');
    el.removeAttribute('data-focus-visible-added');
  }

  /**
   * Treat `keydown` as a signal that the user is in keyboard modality.
   * Apply `focus-visible` to any current active element and keep track
   * of our keyboard modality state with `hadKeyboardEvent`.
   * @param {Event} e
   */
  function onKeyDown(e) {
    if (isValidFocusTarget(document.activeElement)) {
      addFocusVisibleClass(document.activeElement);
    }

    hadKeyboardEvent = true;
  }

  /**
   * If at any point a user clicks with a pointing device, ensure that we change
   * the modality away from keyboard.
   * This avoids the situation where a user presses a key on an already focused
   * element, and then clicks on a different element, focusing it with a
   * pointing device, while we still think we're in keyboard modality.
   * @param {Event} e
   */
  function onPointerDown(e) {
    hadKeyboardEvent = false;
  }

  /**
   * On `focus`, add the `focus-visible` class to the target if:
   * - the target received focus as a result of keyboard navigation, or
   * - the event target is an element that will likely require interaction
   *   via the keyboard (e.g. a text box)
   * @param {Event} e
   */
  function onFocus(e) {
    // Prevent IE from focusing the document or HTML element.
    if (!isValidFocusTarget(e.target)) {
      return;
    }

    if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
      addFocusVisibleClass(e.target);
    }
  }

  /**
   * On `blur`, remove the `focus-visible` class from the target.
   * @param {Event} e
   */
  function onBlur(e) {
    if (!isValidFocusTarget(e.target)) {
      return;
    }

    if (
      e.target.classList.contains('focus-visible') ||
      e.target.hasAttribute('data-focus-visible-added')
    ) {
      // To detect a tab/window switch, we look for a blur event followed
      // rapidly by a visibility change.
      // If we don't see a visibility change within 100ms, it's probably a
      // regular focus change.
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
        hadFocusVisibleRecently = false;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      }, 100);
      removeFocusVisibleClass(e.target);
    }
  }

  /**
   * If the user changes tabs, keep track of whether or not the previously
   * focused element had .focus-visible.
   * @param {Event} e
   */
  function onVisibilityChange(e) {
    if (document.visibilityState == 'hidden') {
      // If the tab becomes active again, the browser will handle calling focus
      // on the element (Safari actually calls it twice).
      // If this tab change caused a blur on an element with focus-visible,
      // re-apply the class when the user switches back to the tab.
      if (hadFocusVisibleRecently) {
        hadKeyboardEvent = true;
      }
      addInitialPointerMoveListeners();
    }
  }

  /**
   * Add a group of listeners to detect usage of any pointing devices.
   * These listeners will be added when the polyfill first loads, and anytime
   * the window is blurred, so that they are active when the window regains
   * focus.
   */
  function addInitialPointerMoveListeners() {
    document.addEventListener('mousemove', onInitialPointerMove);
    document.addEventListener('mousedown', onInitialPointerMove);
    document.addEventListener('mouseup', onInitialPointerMove);
    document.addEventListener('pointermove', onInitialPointerMove);
    document.addEventListener('pointerdown', onInitialPointerMove);
    document.addEventListener('pointerup', onInitialPointerMove);
    document.addEventListener('touchmove', onInitialPointerMove);
    document.addEventListener('touchstart', onInitialPointerMove);
    document.addEventListener('touchend', onInitialPointerMove);
  }

  function removeInitialPointerMoveListeners() {
    document.removeEventListener('mousemove', onInitialPointerMove);
    document.removeEventListener('mousedown', onInitialPointerMove);
    document.removeEventListener('mouseup', onInitialPointerMove);
    document.removeEventListener('pointermove', onInitialPointerMove);
    document.removeEventListener('pointerdown', onInitialPointerMove);
    document.removeEventListener('pointerup', onInitialPointerMove);
    document.removeEventListener('touchmove', onInitialPointerMove);
    document.removeEventListener('touchstart', onInitialPointerMove);
    document.removeEventListener('touchend', onInitialPointerMove);
  }

  /**
   * When the polfyill first loads, assume the user is in keyboard modality.
   * If any event is received from a pointing device (e.g. mouse, pointer,
   * touch), turn off keyboard modality.
   * This accounts for situations where focus enters the page from the URL bar.
   * @param {Event} e
   */
  function onInitialPointerMove(e) {
    // Work around a Safari quirk that fires a mousemove on <html> whenever the
    // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
    if (e.target.nodeName.toLowerCase() === 'html') {
      return;
    }

    hadKeyboardEvent = false;
    removeInitialPointerMoveListeners();
  }

  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('mousedown', onPointerDown, true);
  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('touchstart', onPointerDown, true);
  document.addEventListener('focus', onFocus, true);
  document.addEventListener('blur', onBlur, true);
  document.addEventListener('visibilitychange', onVisibilityChange, true);
  addInitialPointerMoveListeners();

  document.body.classList.add('js-focus-visible');
}

/**
 * Subscription when the DOM is ready
 * @param {Function} callback
 */
function onDOMReady(callback) {
  var loaded;

  /**
   * Callback wrapper for check loaded state
   */
  function load() {
    if (!loaded) {
      loaded = true;

      callback();
    }
  }

  if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
    callback();
  } else {
    loaded = false;
    document.addEventListener('DOMContentLoaded', load, false);
    window.addEventListener('load', load, false);
  }
}

if (typeof document !== 'undefined') {
  onDOMReady(init);
}


/* ---------------------------------------------
 Adding aria-hidden to Font Awesome and Et-line 
 icons
 --------------------------------------------- */

(function(){
    let getIcons = document.querySelectorAll('i.fa, span[class^="icon"]');
    getIcons.forEach(function(iconEach)
    {
        let getIconAttr = iconEach.getAttribute('aria-hidden');
        if (!getIconAttr)
        {
            iconEach.setAttribute('aria-hidden','true');
        }
    });
})();