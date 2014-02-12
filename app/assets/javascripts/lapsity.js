/*jslint browser: true, devel: true*/
/*global $, jQuery, skrollr, ga*/
/*jslint indent: 2 */

$(function () {
  'use strict';
  var sound_active = false,

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
    var current_height = current_width * (1/1.83);
    $("#iframe_protector").css("height", current_height);
    $("#google_viewer").css("height", current_height);
    $("#pdf_viewer").css("height", current_height + 60);
  };

  $(document).ready(function() {
    replace_images($("#mod-lapsity-demo"));
    size_demo();
    size_gallery();
  });

  $(window).resize(function() {
    size_demo();
    size_gallery();
  });
});