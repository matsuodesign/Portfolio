/*jslint browser: true, devel: true*/
/*global $, jQuery, skrollr, ga*/
/*jslint indent: 2 */

$(function () {
  'use strict';
  var sound_active = false;
  $(document).ready(function() {
    $(".sc-play").click(function() {
      if (!sound_active) {
        $(".sc-play").addClass("sound_active");
        sound_active = true;
      } else {
        $(".sc-play").removeClass("sound_active");
        sound_active = false;
      }
    });
  });
});