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
    window_width = $(window).width,
    hero_left = $("#hero-left"),
    hero_right = $("#hero-right"),
    hero_element = $(".hero-element"),
    hero_element_scene = $("ul", hero_element),
    content_hero = $("#content-hero"),
    headers = $(".mod-title"),
    header_height = $("#global_header").height(),
    number_of_rows = 1,
    hero_viewport_size = 0.49,
    // hero_element_width_ratio = 1.618,

    update_window_width = function() {
      window_width = $(window).width();
    },

    update_infobox = function(selected_hero) {
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

    set_hero_height = function() {
      var window_height = $(window).height(),
        hero_height = ((window_height * hero_viewport_size) - $("#information").height() - 29) / number_of_rows,
        hero_width = $(window).width(); //hero_height * hero_element_width_ratio;

      $("#content-crop").css("height", hero_height * number_of_rows);
      hero_element.css("height", hero_height);
      hero_element.css("width", hero_width);
      size_carousel_track();
    },

    check_mobile_init = function() {
      deturmine_responsive();
      if (responsive_mode === "mobile") {
        update_window_width();
        $("#content-crop").css("height", "auto");
        hero_element.css("height", "auto");
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
      update_infobox($(".hero-element").first());


      hero_element.mouseenter(function() {
        selected_hero = $(this);
        // check_margins(selected_hero);

        if (responsive_mode !== "mobile") {
          clearTimeout(debounce_background);
          debounce_background = setTimeout(function() {
            update_infobox(selected_hero);
          }, 50);
        }
      });

      content_hero.on('mousewheel', function(event) {
        if (swipe === false) {
          update_window_width();
          if (event.deltaX > 0) {
            swipe = true;
            content_hero.animate({scrollLeft: (content_hero.scrollLeft() + window_width)}, 600, function() {
              clearTimeout(debounce_swipe);
              debounce_swipe = setTimeout(function() {
                swipe = false;
              }, 300);
            });
          } else {
            swipe = true;
            content_hero.animate({scrollLeft: (content_hero.scrollLeft() - window_width)}, 600, function() {
              clearTimeout(debounce_swipe);
              debounce_swipe = setTimeout(function() {
                swipe = false;
              }, 800);
            });
          }
        }
        return false;
      });
      // });

      hero_left.on({
        "click": function() {
          content_hero.animate({scrollLeft: (content_hero.scrollLeft() - $(window).width())}, 800);
        }
      });

      hero_right.on({
        "click": function() {
          content_hero.animate({scrollLeft: (content_hero.scrollLeft() + $(window).width())}, 800);
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
    }
  });

  $(window).resize(function() {
    // $("title").html($(window).width());
    check_mobile_init();

    clearTimeout(debounce_responsive_behaviors);
    debounce_responsive_behaviors = setTimeout(function() {
      switch (responsive_mode) {
      case "mobile":
        init_flowtype();
        break;
      case "tablet":
        init_flowtype();
        break;
      case "desktop":
        init_flowtype();
        break;
      default:
        break;
      }
    }, 50);
  });
});