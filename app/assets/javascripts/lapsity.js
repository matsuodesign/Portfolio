/*jslint browser: true, devel: true*/
/*global $, jQuery, skrollr, ga*/
/*jslint indent: 2 */

$(function () {
  'use strict';
  var sound_active = false,
    current_pdf_size,
    viewer_open = false,
    called_once = false,
    debounce_scroll,

  replace_images = function (targets) {
    $.each(targets, function () {
      var current_image = $(this).find("img"),
        current_source = current_image.attr("src");
      $(this).css("background-image", "url(" + current_source + ")");
      current_image.css("display", "none");
    });
  },

  size_demo = function() {
    var current_width = $("#lapsity_demo").width();
    var current_height = current_width * (480/320);
    $("#lapsity_demo").css("height", current_height);
  }, 

  size_gallery = function() {
    var current_width = $("#pdf_headline").width();
    current_pdf_size = current_width * (1/1.83);
    $("#iframe_protector").css("height", current_pdf_size);
    $("#google_viewer").css("height", current_pdf_size);
    $("#pdf_viewer").css("height", current_pdf_size + 30);
    $("#view_options").css("top", (current_pdf_size / 2) - (150 / 3));
  }, 

  open_viewer = function() {
    $("#google_viewer").css("height", $(window).height() - $("#global_header").height() - 30);
    $("#pdf_viewer").css("height", $(window).height() - $("#global_header").height());
    var new_scrolltop = $("#pdf_headline").offset().top - $("#global_header").height();
    $("#user-study").css({width: "95%"});
    $("html, body").animate({scrollTop: new_scrolltop}, 400, function(){
      if(!called_once){
        setTimeout(function() {
          viewer_open = true;
        }, 100);
        called_once = true;
      }
    });
  }, 

  close_viewer = function() {
    var current_width = $("#pdf_headline").width();
    current_pdf_size = current_width * (1/1.83);
    $("#iframe_protector").animate({height: current_pdf_size}, 400);
    $("#google_viewer").animate({height: current_pdf_size}, 400);
    $("#pdf_viewer").animate({height: current_pdf_size + 30}, 400);
    $("#iframe_protector").fadeIn();
    $("#view_options").fadeIn();
    $("#user-study").css({width: "80%"});
    $("#google_viewer").addClass("blurred");
    viewer_open = false;
    called_once = false;
  };

  $(document).ready(function() {
    replace_images($("#mod-lapsity-demo"));
    size_demo();
    size_gallery();

    $("#view_inline").click(function() {
      $("#iframe_protector").fadeOut();
      $("#view_options").fadeOut();
      $("#google_viewer").removeClass("blurred");
      open_viewer();
    });
  });

  $(window).resize(function() {
    size_demo();
    size_gallery();
  });

  $(window).scroll(function() {
    if (viewer_open) {
      close_viewer();
    }
  });
});