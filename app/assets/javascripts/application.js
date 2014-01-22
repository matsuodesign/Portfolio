// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require parallax.js
//= require flowtype.js

(function($) {
 var hero_track = $("#hero-track"),
  debounce_background, 
  debounce_hero_scroll,
  debounce_responsive_behaviors,
  selected_hero,
  responsive_mode,
  parallax_active,
  information_open = false, 
  $lminspired = $('#lminspired-scene').parallax(),
  $ask = $('#ask-scene').parallax(),
  $lapsity = $('#lapsity-scene').parallax();
  $intervention = $('#intervention-scene').parallax();
  $fine_art = $('#fine-art-scene').parallax();

 var check_margins = function(){
  var left_edge = $("#information").position().left;
  var right_edge = left_edge + $("#information").width();
  var browser_right = $(window).width();
  var difference_right = right_edge - browser_right;
  var extra_right = 0;
  var extra_left = 0;

  if($("#hero-right").is(":visible")){
   extra_right = $("#hero-right").width() + 3;
  }

  if($("#hero-left").is(":visible")){
   extra_left = $("#hero-left").width() + 3;
  }

  if(right_edge > browser_right){
   $("#content-hero").animate({scrollLeft: $("#content-hero").scrollLeft() + difference_right + extra_right}, 400);
  }

  if(left_edge < 0){
   $("#content-hero").animate({scrollLeft: $("#content-hero").scrollLeft() + left_edge - extra_left}, 400);
  }
 },

 set_flowtype = function(){

 },

 activate_parallax = function(){
  if(responsive_mode != "mobile"){
   $ask.parallax('enable');
   $lminspired.parallax('enable');
   $lapsity.parallax('enable');
   $intervention.parallax('enable');
   $fine_art.parallax('enable');
   parallax_active = true;
  }
 },

 disable_parallax = function(){
  if(responsive_mode == "mobile"){
   $ask.parallax('disable');
   $lminspired.parallax('disable');
   $lapsity.parallax('disable');
   $intervention.parallax('disable');
   $fine_art.parallax('disable');
   parallax_active = false;
  }
 },

 size_carousel_track = function(){
  var track_width = hero_track.children().length * (hero_track.children().first().width() + 9);
  hero_track.css("width", track_width + 10);
 },

 deturmine_carousel_navigation = function(){
  var current_hero_scroll_position = $("#content-hero").scrollLeft();
  var hero_track_scroll_max = $("#hero-track").width() - $(window).width() - 50;

  if(current_hero_scroll_position === 0){
   $("#hero-left").fadeOut();
   $("#hero-right").fadeIn();
  } else if (current_hero_scroll_position > 0 && current_hero_scroll_position < hero_track_scroll_max){
   $("#hero-left").fadeIn();   
   $("#hero-right").fadeIn();
  } else if (current_hero_scroll_position >= hero_track_scroll_max){
   $("#hero-left").fadeIn();   
   $("#hero-right").fadeOut();
  }
 },
 
 update_infobox = function(selected_hero){
  $("#information-title").html(selected_hero.find(".mod-information .mod-title").html());
  $("#information-description").html(selected_hero.find(".mod-information .mod-description").html());
  $("#information-tags").html(selected_hero.find(".mod-information .mod-tags").html());
 },

 open_infobox = function(){
   if(!information_open){
     $("#main").fadeTo(300, 0.2).addClass("blur");;
     $("#information").css("display", "block");
     $("#information").css("height", 0);
     $("#information").css("width", $(".hero-element").first().width());
     $("#information").css('height', 'auto')
     information_open = true;
   }
 },
 
 position_infobox = function(selected_hero){
    $("#information").css("top", selected_hero.position().top + hero_track.children().first().height() + 10);
    $("#information").css("left", selected_hero.position().left);
 }, 

 close_infobox = function(){
  $("#information").stop().animate({height: 0}, {duration: 200, queue: false});
  $("#information").fadeOut(100);
  $("#main").fadeTo(100, 1);
  $("#main").removeClass("blur");
  information_open = false;
 }, 

 deturmine_responsive = function(){
  var current_width = $(window).width();
  if(current_width <= 575){
    responsive_mode = "mobile";
  } else if (current_width <= 850){
    responsive_mode = "tablet";
  } else {
    responsive_mode = "desktop";
  }
 },

 set_hero_height = function(){
  var window_height = $(window).height(),
  hero_height = window_height*0.42;
  hero_width = hero_height * (4/3);
  $("#content-crop").css("height", hero_height);
  $(".hero-element").css("height", hero_height - 3);
  $(".hero-element").css("width", hero_width - 3);
  $(".hero-element ul").css("height", "120%");
  $(".hero-element ul").css("width", "120%");
  $(".hero-element ul").css("margin-left", "-10%");
  $(".hero-element ul").css("margin-top", "-10%");
  $("#hero-right").css("height", hero_height - 3);
  $("#hero-left").css("height", hero_height - 3);
  size_carousel_track();
 }, 

 check_mobile_init = function(){
  deturmine_responsive();
  if(responsive_mode == "mobile"){
    var window_width = $(window).width();
    var project_height = $(".hero-element").first().height();
    $("#content-crop").css("height", "auto");
    $(".hero-element").css("height", "auto");
    $(".hero-element ul").css("margin-top", "0");
    $(".hero-element ul").css("margin-left", "7px");;
    $(".hero-element ul").css("display", "block");
    $(".hero-element ul").css("float", "left");
    $(".hero-element ul").css("width", window_width * 0.4 - 20);
    $(".hero-element ul").css("height", (window_width * 0.25) * (3/4) );
    $( ".hero-element ul" ).each(function( index ) {
      $(this).css("height", 250);
    });
  }else{
    set_hero_height();
  }
 }, 
 init_flowtype = function(){
  var work_description_ratio
  var work_title_ratio
  deturmine_responsive();
  switch(responsive_mode){
    case "mobile":
      work_description_ratio = 20
      work_title_ratio = 18
    break;
    case "tablet":
      work_description_ratio = 30
      work_title_ratio = 25
    break;
    case "desktop":
      work_description_ratio = 30
      work_title_ratio = 25
    break;

    break;
    default: break;
  }

  $('.work-description').flowtype({
   minimum : 400,
   maximum : 1200,
   fontRatio : work_description_ratio
  });

  $('.work-title').flowtype({
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
    "ready": function(){
     size_carousel_track();
     check_mobile_init();
     deturmine_carousel_navigation();
     deturmine_responsive();
     activate_parallax();
     disable_parallax();
     init_flowtype();

    $(".hero-element").mouseenter(function(){
      selected_hero = $(this);

      if(responsive_mode != "mobile"){
       clearTimeout(debounce_background);
       debounce_background = setTimeout(function() {
         position_infobox(selected_hero);
         update_infobox(selected_hero);
         open_infobox();
         check_margins();
       }, 50);
      }
     });

     $("#content-hero").scroll(function(){
      position_infobox(selected_hero);
      clearTimeout(debounce_hero_scroll);
      debounce_hero_scroll = setTimeout(function() {
       deturmine_carousel_navigation();
      }, 50);
     });

     $("#content-crop").mouseleave(function(){
       close_infobox();      
     });

     $("#hero-left").on({
      "mouseenter": function(){
       close_infobox();
      }, 
      "click": function(){
       close_infobox();
       $("#content-hero").animate({scrollLeft: ($("#content-hero").scrollLeft() - $(window).width())}, 800)
      }
     });

     $("#hero-right").on({
      "mouseenter": function(){
       close_infobox();
      },
      "click": function(){
       close_infobox();
       $("#content-hero").animate({scrollLeft: ($("#content-hero").scrollLeft() + $(window).width())}, 800)
      }
     });

    }
 })

 $(window).resize(function(){
  // $("title").html($(window).width());
  check_mobile_init();

  clearTimeout(debounce_responsive_behaviors);
  debounce_responsive_behaviors = setTimeout(function() {
    deturmine_carousel_navigation();
    switch(responsive_mode){
      case "mobile":
        if(parallax_active){
         disable_parallax();
        }
        init_flowtype();
      break;
      case "tablet":
        if(!parallax_active){
         activate_parallax();
        }
        init_flowtype();
      break;
      case "desktop":
        if(!parallax_active){
         activate_parallax();
        }
        init_flowtype();
      break;
      default: break;
    }
  }, 50);

  if(information_open){
    position_infobox(selected_hero);  
  }
 });
})(jQuery);