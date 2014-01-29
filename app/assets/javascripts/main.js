$(function () {
	var hero_track = $("#hero-track"),
	debounce_background, 
	debounce_hero_scroll,
	debounce_responsive_behaviors,
	selected_hero,
	responsive_mode,
	parallax_active,
	information_open = false, 
	information = $("#information"),
	hero_left = $("#hero-left"),
	hero_right = $("#hero-right"),
	hero_element = $(".hero-element"),
	hero_element_scene = $("ul", hero_element),
	backgrounds = $(".background"),
	logos = $(".logo"),
	scroll_timer,
	scroll_interval,
	scrolling = false,
	scroll_direction = "left";
	content_hero = $("#content-hero"),
	headers = $(".mod-title"),
	main_content = $("#main"),
	header_height = $("#global_header").height(),
	number_of_rows = 1,
	hero_viewport_size = .49,
	hero_element_width_ratio = 1.85;

	var check_margins = function(current_target){
		var left_edge = current_target.position().left;
		var right_edge = left_edge + current_target.width();
		var browser_right = $(window).width();
		var difference_right = right_edge - browser_right;
		var extra_right = 0;
		var extra_left = 0;

		if(hero_right.is(":visible")){
			extra_right = hero_right.width() + 3;
		}

		if(hero_left.is(":visible")){
			extra_left = hero_left.width() + 3;
		}

		if(right_edge > browser_right){
			content_hero.animate({scrollLeft: content_hero.scrollLeft() + difference_right + extra_right}, 400);
		}

		if(left_edge < 0){
			content_hero.animate({scrollLeft: content_hero.scrollLeft() + left_edge - extra_left}, 400);
		}
	},

	deturmine_carousel_navigation = function(){
		var current_hero_scroll_position = content_hero.scrollLeft();
		var hero_track_scroll_max = $("#hero-track").width() - $(window).width() - 50;

		if(current_hero_scroll_position === 0){
			hero_left.fadeOut();
			hero_right.fadeIn();
			scroll_direction = "left";
		} else if (current_hero_scroll_position > 0 && current_hero_scroll_position < hero_track_scroll_max){
			hero_left.fadeIn();   
			hero_right.fadeIn();
		} else if (current_hero_scroll_position >= hero_track_scroll_max){
			hero_left.fadeIn();   
			hero_right.fadeOut();
			scroll_direction = "right";
		}
	},

	update_infobox = function(selected_hero){
		$("#information-title").html(selected_hero.find(".mod-information .mod-title").html());
		$("#information-description").html(selected_hero.find(".mod-information .mod-description").html());
		$("#information-tags").html(selected_hero.find(".mod-information .mod-tags").html());
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

	size_carousel_track = function(){
		var track_width = Math.ceil(hero_track.children().length / number_of_rows)  * (hero_track.children().first().width());
		hero_track.css("width", track_width);
	},

	set_hero_height = function(){
		var window_height = $(window).height(),
		hero_height = ((window_height * hero_viewport_size) - $("#information").height() - 29) / number_of_rows;
		hero_width = hero_height * hero_element_width_ratio;
		$("#content-crop").css("height", hero_height * number_of_rows);
		hero_element.css("height", hero_height);
		hero_element.css("width", hero_width);
		size_carousel_track();
	},

	reset_backgrounds = function(){
		backgrounds.css("-webkit-transform", "translate3d(0, 0, 0)");
		backgrounds.css("-moz-transform", "translate3d(0, 0, 0)");
		backgrounds.css("transform", "translate3d(0, 0, 0)");

		logos.css("-webkit-transform", "translate3d(0, 0, 0)");
		logos.css("-moz-transform", "translate3d(0, 0, 0)");
		logos.css("transform", "translate3d(0, 0, 0)");
	}, 

	check_mobile_init = function(){
		deturmine_responsive();
		if(responsive_mode == "mobile"){
			var window_width = $(window).width();
			var project_height = hero_element.first().height();
			$("#content-crop").css("height", "auto");
			hero_element.css("height", "auto");
			hero_element_scene.css("margin-top", "0");
			hero_element_scene.css("margin-left", "7px");;
			hero_element_scene.css("display", "block");
			hero_element_scene.css("float", "left");
			hero_element_scene.css("width", window_width * 0.4 - 20);
			hero_element_scene.css("height", (window_width * 0.25) * (3/4) );
			hero_element_scene.each(function( index ) {
				$(this).css("height", 250);
			});
		}else{
			set_hero_height();
		}
	}, 
	set_timers = function(){
		scroll_timer = setTimeout(function() {
			scroll_interval = setInterval(function() { 
						scrolling = true;
	    	if(scroll_direction == "left"){
	    		content_hero.scrollLeft(content_hero.scrollLeft() + 1);
	    	}else{
	    		content_hero.scrollLeft(content_hero.scrollLeft() - 1);
	    	}
	    	
	    }, 50);
		}, 1000);
	},
	clear_timers = function(){
		scrolling = false;
		clearTimeout(scroll_timer);
		clearInterval(scroll_interval);
	},
	check_current_header = function(){
		var scrollTop  = $(window).scrollTop(),
		elements = [];
		headers.each(function(index) {
			var current = $(this);
			if((current.offset().top - scrollTop - header_height) <= 0){
				elements.push("true");
				elements[index - 1] = "false";  
			}else{
				elements.push("false");  
			}
		});
		console.log(elements);
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

		$('.work-description, #information-description').flowtype({
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
		"ready": function(){
			size_carousel_track();
			check_mobile_init();
			deturmine_carousel_navigation();
			deturmine_responsive();
			init_flowtype();
			set_timers();
			update_infobox($(".hero-element").first());

			hero_element.mouseenter(function(){
				selected_hero = $(this);
				clear_timers();
				check_margins(selected_hero);

				if(responsive_mode != "mobile"){
					clearTimeout(debounce_background);
					debounce_background = setTimeout(function() {
						update_infobox(selected_hero);
						check_margins();
					}, 50);
				}
			});

			content_hero.scroll(function(){
	
				clearTimeout(debounce_hero_scroll);
				debounce_hero_scroll = setTimeout(function() {
					deturmine_carousel_navigation();
				}, 50);
			});

			$("#content-crop").mouseleave(function(){
				set_timers();  
			});

			hero_left.on({ 
				"click": function(){
					content_hero.animate({scrollLeft: (content_hero.scrollLeft() - $(window).width())}, 800)
				}
			});

			hero_right.on({
				"click": function(){
					content_hero.animate({scrollLeft: (content_hero.scrollLeft() + $(window).width())}, 800)
				}
			});
		},
	});

$(window).bind("load", function() {
  check_current_header();
});

$(window).scroll(function(){
	if(responsive_mode == "mobile"){
		headers.css("position", "absolute");
		headers.css("top", "0");
	}
});

$(window).resize(function(){
	// $("title").html($(window).width());
	check_mobile_init();

	clearTimeout(debounce_responsive_behaviors);
	debounce_responsive_behaviors = setTimeout(function() {
		deturmine_carousel_navigation();
		switch(responsive_mode){
			case "mobile":

			init_flowtype();
			break;
			case "tablet":

			init_flowtype();
			break;
			case "desktop":

			init_flowtype();
			break;
			default: break;
		}
	}, 50);
});
});