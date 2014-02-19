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
    debounce_swipe,
    thumbnails_open = false,
    swipe = false,
    window_width = $(window).width,
    cycle_interval,
    cycle_interval_time = 3500,
    cycle_direction = "right",
    debounce_thumbnails_open,
    debounce_thumbnails_close,
    hero_left = $("#hero-left"),
    hero_right = $("#hero-right"),
    hero_element = $(".hero-element"),
    total_slides = hero_element.length - 1,
    hero_element_scene = $("ul", hero_element),
    content_hero = $("#content-hero"),
    content_crop = $("#content-crop"),
    information_title = $("#information-title"),
    information_description = $("#information-description"),
    information_icons = $("#information-icons"),
    headers = $(".mod-title"),
    thumbnail_strip = $("#film-strip"),
    hero_thumbnails = $("#thumbnails li"),
    slide_pagination = $("#slide-pagination"),
    work_downloads = $("#work-downloads"),
    slide_pagination_items = $("li", slide_pagination),
    intervention_video,
    number_of_rows = 1,
    hero_viewport_size = 0.60,

    // Initiating functions
    update_window_width = function() {
      window_width = $(window).width();
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

      content_crop.css("height", hero_height * number_of_rows);
      content_hero.css("height", hero_height + 100);
      hero_element.css("height", hero_height);
      hero_element.css("width", hero_width);
      hero_element_scene.css("width", "100%");
      hero_element_scene.css("height", "100%");
      hero_element_scene.css("margin-left", "0");
      size_carousel_track();
    },

    size_pagination = function(mode) {
      var padding_amount = ((window_width - (43 * slide_pagination_items.length)) / slide_pagination_items.length) / 2;

      if (mode === "animate") {
        slide_pagination_items.delay(130).animate({paddingLeft: padding_amount, paddingRight: padding_amount}, 200);
      } else {
        slide_pagination_items.css({paddingLeft: padding_amount, paddingRight: padding_amount});
      }
    },

    clear_auto_cycle = function() {
      clearInterval(cycle_interval);
    },

    //Interactions
    animate_carousel = function() {
      content_hero.animate({scrollLeft: (window_width * current_slide)}, 400);
    },

    calculate_footer_margins = function() {
      var paragraph_height = $(".mod-footer p").height(),
        footer_height = $(".mod-footer").height();
      $('#quote').css("margin-top", (footer_height - paragraph_height) / 2);
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

    close_filmstrip = function() {
      clearTimeout(debounce_thumbnails_open);
      clearTimeout(debounce_thumbnails_close);
      debounce_thumbnails_close = setTimeout(function() {
        thumbnails_open = false;
        thumbnail_strip.stop().animate({height: 0}, 200);
        hero_right.stop().animate({right: 0}, 400);
        hero_left.stop().animate({left: 0}, 400);
        information_description.stop().fadeIn();
        information_icons.stop().fadeIn();
        information_title.stop().fadeIn();
        slide_pagination.stop().fadeIn();
        slide_pagination.stop().animate({paddingBottom: 7}, 200);
        slide_pagination_items.stop().animate({paddingLeft: 10, paddingRight: 10}, 200);
      }, 50);
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

      $('.experience').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_description_ratio
      });
      
      $('.work-title, #information-title').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio
      });

      $('.intervention-description-container h1').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio
      });

      $('#mod-lapsity-description h1').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio
      });
      
      $('#mod-lminspired-description h1').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio
      });

      $('#mod-kudosed-description h1').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio
      });

      $('#plurhype-1').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio * 1.4
      });

      $('.col1').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio * 1.1
      });

      $('.intervention-description-container h4').flowtype({
        minimum : 400,
        maximum : 1200,
        fontRatio : work_title_ratio * 1.4
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
    },

    iterate_pagination = function(current_slide) {
      slide_pagination_items.removeClass("active");
      slide_pagination_items.slice(current_slide, current_slide + 1).addClass("active");
      hero_thumbnails.removeClass("active");
      hero_thumbnails.slice(current_slide, current_slide + 1).addClass("active");
    },

    open_filmstrip = function() {
      clearTimeout(debounce_thumbnails_open);
      clearTimeout(debounce_thumbnails_close);
      debounce_thumbnails_open = setTimeout(function() {
        thumbnails_open = true;
        thumbnail_strip.stop().animate({height: 190}, 200);
        hero_right.stop().animate({right: -40}, 400);
        hero_left.stop().animate({left: -40}, 400);
        information_description.stop().fadeOut(0);
        information_icons.stop().fadeOut(0);
        information_title.stop().fadeOut(0);
        slide_pagination.stop().animate({paddingBottom: 0}, 200);
        size_pagination("animate");
      }, 300);
    },

    show_hero_items = function() {
      hero_element.fadeIn();
    },

    size_hero_thumbnails = function() {
      update_window_width();
      var current_padding_left = parseInt(hero_thumbnails.first().css("margin-left"), 10),
        current_padding_right = parseInt(hero_thumbnails.first().css("margin-right"), 10) * 2;
      hero_thumbnails.css("width", (window_width - (hero_thumbnails.length * current_padding_right) - current_padding_left) / hero_thumbnails.length);
    },

    update_infobox = function(selected_hero) {
      selected_hero = (selected_hero !== undefined) ? selected_hero : hero_element.slice(current_slide, current_slide + 1);
      information_title.html(selected_hero.find(".mod-information .mod-title").html());
      information_description.html(selected_hero.find(".mod-information .mod-description").html());
      $("#information-tags").html(selected_hero.find(".mod-information .mod-tags").html());
    },

    reset_mobile = function() {
      content_hero.css("margin-top", "0");
      headers.css("top", "-3px");
      work_downloads.css("position", "absolute");
    },

    start_auto_cycle = function() {
      clearInterval(cycle_interval);
      cycle_interval = setInterval(function() {
        if (cycle_direction === "right") {
          current_slide += 1;
          iterate_pagination(current_slide);
          check_carousel_nav();
          update_infobox();
          animate_carousel();
          if (current_slide === total_slides) {
            cycle_direction = "left";
          }
        } else if (cycle_direction === "left") {
          current_slide -= 1;
          iterate_pagination(current_slide);
          check_carousel_nav();
          update_infobox();
          animate_carousel();
          if (current_slide === 0) {
            cycle_direction = "right";
          }
        }
      }, cycle_interval_time);
    };

  $(document).on({
    "ready": function() {
      size_carousel_track();
      check_mobile_init();
      deturmine_responsive();
      init_flowtype();
      current_slide = 0;
      calculate_footer_margins();
      show_hero_items();
      iterate_pagination(current_slide);
      check_carousel_nav();
      update_infobox();
      size_hero_thumbnails();
      start_auto_cycle();

      hero_thumbnails.click(function() {
        hero_thumbnails.removeClass("active");
        $(this).addClass("active");
        current_slide = $(this).index();
        iterate_pagination(current_slide);
        check_carousel_nav();
        update_infobox();
        animate_carousel();
      });

      slide_pagination_items.click(function(){
        current_slide = $(this).index();
        iterate_pagination(current_slide);
        check_carousel_nav();
        update_infobox();
        animate_carousel();
      });

      $("#hero *").on({
        mouseenter: function() {
          clear_auto_cycle();
        },
        mouseleave: function() {
          start_auto_cycle();
        }
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

      slide_pagination_items.mouseenter(function() {
        if (thumbnails_open !== true) {
          open_filmstrip();
        }
      });

      slide_pagination.mouseover(function(e) {
        e.stopPropagation();
      });

      thumbnail_strip.mouseover(function(e) {
        e.stopPropagation();
      });

      $(document).mouseover(function() {
        if (thumbnails_open) {
          close_filmstrip();
        }
      });

      content_hero.on('mousewheel', function(event) {
        var diffx = event.deltaX,
          diffy = event.deltaY,
          posx,
          posy;

        posx = -diffx > 0 ? -diffx : diffx;
        posy = -diffy > 0 ? -diffy : diffy;

        if (posx > (250 * posy + 1)) {
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
        } else {
          $("body").scrollTop($("body").scrollTop() - event.deltaY);
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

  $(window).scroll(function() {
    if (responsive_mode === "mobile") {
      headers.css("position", "absolute");
      headers.css("top", "0");
      if ($(window).scrollTop() >= 67) {
        work_downloads.css("position", "fixed");
        content_hero.css("margin-top", 49);
      } else {
        work_downloads.css("position", "relative");
        content_hero.css("margin-top", 0);

      }
    }
  });

  $(window).resize(function() {
    check_mobile_init();
    size_hero_thumbnails();
    if (thumbnails_open) {
      size_pagination("static");
    }
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