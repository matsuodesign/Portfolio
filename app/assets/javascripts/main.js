/*jslint browser: true, devel: true*/
/*global $, jQuery, skrollr, ga*/
/*jslint indent: 2 */

$(function () {
  'use strict';
  var hero_track = $("#hero-track"),
    debounce_background,
    debounce_responsive_behaviors,
    selected_hero,
    responsive_mode,
    current_slide,
    swipe = false,
    debounce_swipe,
    doublecheck_hero_target,
    thumbnails_open = false,
    window_width = $(window).width,
    hero_left = $("#hero-left"),
    hero_right = $("#hero-right"),
    hero_element = $(".hero-element"),
    total_slides = hero_element.length - 1,
    hero_element_scene = $("ul", hero_element),
    content_hero = $("#content-hero"),
    content_crop = $("#content-crop"),
    headers = $(".mod-title"),
    hero_thumbnails = $("#thumbnails li"),
    slide_pagination = $("#slide-pagination"),
    slide_pagination_items = $("li", slide_pagination),
    header_height = $("#global_header").height(),
    number_of_rows = 1,
    hero_viewport_size = 0.49,
    // hero_element_width_ratio = 1.618,

    update_window_width = function() {
      window_width = $(window).width();
    },
    animate_carousel = function() {
      content_hero.animate({scrollLeft: (window_width * current_slide)}, 400);
    },

    iterate_pagination = function(current_slide) {
      slide_pagination_items.removeClass("active");
      slide_pagination_items.slice(current_slide, current_slide + 1).addClass("active");
      hero_thumbnails.removeClass("active");
      hero_thumbnails.slice(current_slide, current_slide + 1).addClass("active");
    },

    update_infobox = function(selected_hero) {
      selected_hero = typeof selected_hero !== 'undefined' ? selected_hero : hero_element.slice(current_slide, current_slide + 1);
      $("#information-title").html(selected_hero.find(".mod-information .mod-title").html());
      $("#information-description").html(selected_hero.find(".mod-information .mod-description").html());
      $("#information-tags").html(selected_hero.find(".mod-information .mod-tags").html());
    },

    deturmine_responsive = function() {
      update_window_width();

      if (window_width <= 575) {
        responsive_mode = "mobile";
      } else if (window_width <= 850) {
        responsive_mode = "tablet";
      } else {
        responsive_mode = "desktop";
      }
    },

    size_carousel_track = function() {
      var track_width = Math.ceil(hero_track.children().length / number_of_rows) * (hero_track.children().first().width());
      hero_track.css("width", track_width);
    },

    open_filmstrip = function() {
      thumbnails_open = true;
      $("#film-strip").stop().animate({height: 190}, 200);
      hero_right.stop().animate({right: -40}, 400);
      hero_left.stop().animate({left: -40}, 400);
      $("#information-description").fadeOut(0);
      $("#information-icons").fadeOut(0);
      $("#information-title").fadeOut(0);
      slide_pagination.animate({paddingBottom: 3}, 200);

      var padding_amount = ((window_width - (44 * slide_pagination_items.length)) / slide_pagination_items.length) / 2;
      console.log(padding_amount);
      slide_pagination_items.delay(130).animate({paddingLeft: padding_amount, paddingRight: padding_amount}, 200);
    },

    close_filmstrip = function() {
      thumbnails_open = false;
      $("#film-strip").stop().animate({height: 0}, 200);
      hero_right.stop().animate({right: 0}, 400);
      hero_left.stop().animate({left: 0}, 400);
      $("#information-description").fadeIn();
      $("#information-icons").fadeIn();
      $("#information-title").fadeIn();
      slide_pagination.fadeIn();
      slide_pagination.animate({paddingBottom: 10}, 200);
      slide_pagination_items.animate({paddingLeft: 10, paddingRight: 10}, 200);

    },

    set_hero_height = function() {
      var window_height = $(window).height(),
        hero_height = ((window_height * hero_viewport_size) - $("#information").height() - 29) / number_of_rows,
        hero_width = $(window).width(); //hero_height * hero_element_width_ratio;

      content_crop.css("height", hero_height * number_of_rows);
      content_hero.css("height", hero_height + 100);
      hero_element.css("height", hero_height);
      hero_element.css("width", hero_width);
      hero_element_scene.css("width", "100%");
      hero_element_scene.css("height", "100%");
      hero_element_scene.css("margin-left", "0");
      size_carousel_track();
    },

    check_mobile_init = function() {
      deturmine_responsive();
      if (responsive_mode === "mobile") {
        update_window_width();
        content_crop.css("height", "auto");
        content_hero.css("height", "auto");
        hero_element.css("height", "auto");
        hero_track.css("height", "auto");
        hero_element_scene.css("margin-top", "0");
        hero_element_scene.css("margin-left", "7px");
        hero_element_scene.css("display", "block");
        hero_element_scene.css("float", "left");
        hero_element_scene.css("width", window_width * 0.4 - 20);
        hero_element_scene.css("height", (window_width * 0.25) * (3 / 4));
        hero_element_scene.each(function() {
          $(this).css("height", 250);
        });
      } else {
        set_hero_height();
      }
    },

    calculate_footer_margins = function() {
      var paragraph_height = $(".mod-footer p").height(),
        footer_height = $(".mod-footer").height();
      $('#quote').css("margin-top", (footer_height - paragraph_height) / 2);
    },

    show_hero_items = function() {
      hero_element.fadeIn();
    },

    size_hero_thumbnails = function() {
      update_window_width();
      hero_thumbnails.css("width", (window_width - (hero_thumbnails.length * 30) - 30) / hero_thumbnails.length);
    },

    reset_mobile = function() {
      content_hero.css("margin-top", "0");
      headers.css("top", "-3px");
      $("#work-downloads").css("position", "absolute");
    },

    check_current_header = function() {
      var scrollTop  = $(window).scrollTop(),
        elements = [];

      headers.each(function(index) {
        var current = $(this);
        if ((current.offset().top - scrollTop - header_height) <= 0) {
          elements.push("true");
          elements[index - 1] = "false";
        } else {
          elements.push("false");
        }
      });
      // console.log(elements);
    },

    check_carousel_nav = function() {
      if (current_slide === total_slides) {
        hero_right.fadeOut();
        hero_left.fadeIn();
      } else if (current_slide === 0) {
        hero_left.fadeOut();
        hero_right.fadeIn();
      } else {
        hero_left.fadeIn();
        hero_right.fadeIn();
      }
    },

    init_flowtype = function() {
      var work_description_ratio, work_title_ratio;
      deturmine_responsive();
      switch (responsive_mode) {
      case "mobile":
        work_description_ratio = 20;
        work_title_ratio = 18;
        break;
      case "tablet":
        work_description_ratio = 30;
        work_title_ratio = 25;
        break;
      case "desktop":
        work_description_ratio = 30;
        work_title_ratio = 25;
        break;
      default:
        break;
      }

      $('.work-description').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_description_ratio
      });

      $('.work-title, #information-title').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio
      });

      $('.work-location').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : 36
      });

      $('.work-date').flowtype({
        minimum : 280,
        maximum : 500,
        fontRatio : 24
      });

      $('.education-description').flowtype({
        minimum : 170,
        maximum : 300,
        fontRatio : 14
      });

      $('.education-title').flowtype({
        minimum : 170,
        maximum : 300,
        fontRatio : 13
      });

      $('.education-location').flowtype({
        minimum : 170,
        maximum : 300,
        fontRatio : 18
      });
    };


  $(document).on({
    "ready": function() {
      size_carousel_track();
      check_mobile_init();
      deturmine_responsive();
      init_flowtype();
      current_slide = 0;
      iterate_pagination(current_slide);
      check_carousel_nav();
      update_infobox();
      calculate_footer_margins();
      show_hero_items();
      size_hero_thumbnails();

      hero_thumbnails.click(function() {
        hero_thumbnails.removeClass("active");
        $(this).addClass("active");
        current_slide = $(this).index();
        iterate_pagination(current_slide);
        animate_carousel();
      });


      hero_element.mouseenter(function() {
        selected_hero = $(this);

        if (responsive_mode !== "mobile") {
          clearTimeout(debounce_background);
          debounce_background = setTimeout(function() {
            update_infobox(selected_hero);
          }, 50);
        }
      });

      slide_pagination_items.mouseenter(function(e) {
        if (thumbnails_open != true) {
          open_filmstrip();
        }
      });

      slide_pagination.mouseenter(function() {
        clearTimeout(doublecheck_hero_target);
      });

      $("#film-strip").mouseleave(function() {
        doublecheck_hero_target = setTimeout(function() {
          if (thumbnails_open) {
            close_filmstrip();
          }
        }, 10);
      });

      content_hero.on('mousewheel', function(event) {
        if (swipe === false && responsive_mode !== "mobile") {
          update_window_width();

          if (event.deltaX > 0) {
            if (current_slide < total_slides) {
              current_slide += 1;
              iterate_pagination(current_slide);
              update_infobox();
              check_carousel_nav();
              swipe = true;
              content_hero.animate({scrollLeft: (content_hero.scrollLeft() + window_width)}, 600, function() {
                clearTimeout(debounce_swipe);
                debounce_swipe = setTimeout(function() {
                  swipe = false;
                }, 700);
              });
            }
          } else {
            if (current_slide > 0) {
              current_slide -= 1;
              iterate_pagination(current_slide);
              update_infobox();
              check_carousel_nav();
              swipe = true;
              content_hero.animate({scrollLeft: (content_hero.scrollLeft() - window_width)}, 600, function() {
                clearTimeout(debounce_swipe);
                debounce_swipe = setTimeout(function() {
                  swipe = false;
                }, 700);
              });
            }
          }
        }
        if (responsive_mode !== "mobile") {
          return false;
        }
      });

      hero_left.on({
        "click": function() {
          if (current_slide > 0) {
            current_slide -= 1;
            iterate_pagination(current_slide);
            check_carousel_nav();
            update_infobox();
            animate_carousel();
          }
        }
      });

      hero_right.on({
        "click": function() {
          if (current_slide < total_slides) {
            current_slide += 1;
            iterate_pagination(current_slide);
            check_carousel_nav();
            update_infobox();
            animate_carousel();
          }
        }
      });
    }
  });

  $(window).bind("load", function() {
    check_current_header();
  });

  $(window).scroll(function() {
    if (responsive_mode === "mobile") {
      headers.css("position", "absolute");
      headers.css("top", "0");
      if ($(window).scrollTop() >= 67) {
        $("#work-downloads").css("position", "fixed");
        content_hero.css("margin-top", 49);
      } else {
        $("#work-downloads").css("position", "relative");
        content_hero.css("margin-top", 0);

      }
    }
  });

  $(window).resize(function() {
    check_mobile_init();
    size_hero_thumbnails();
    content_hero.scrollLeft(window_width * current_slide);
    clearTimeout(debounce_responsive_behaviors);
    debounce_responsive_behaviors = setTimeout(function() {
      deturmine_responsive();
      switch (responsive_mode) {
      case "mobile":
        init_flowtype();
        break;
      case "tablet":
        init_flowtype();
        set_hero_height();
        reset_mobile();
        break;
      case "desktop":
        init_flowtype();
        reset_mobile();
        break;
      default:
        break;
      }
    }, 50);
  });
});