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
//= require parallax.js
//= require flowtype.js
//= require_tree .
(function(e){var t=e("#hero-track"),n,r,i,s,o,u,a=!1,f=e("#lminspired-scene").parallax(),l=e("#ask-scene").parallax(),c=e("#lapsity-scene").parallax();$intervention=e("#intervention-scene").parallax(),$fine_art=e("#fine-art-scene").parallax();var h=function(){var t=e("#information").position().left,n=t+e("#information").width(),r=e(window).width(),i=n-r,s=0,o=0;e("#hero-right").is(":visible")&&(s=e("#hero-right").width()+3),e("#hero-left").is(":visible")&&(o=e("#hero-left").width()+3),n>r&&e("#content-hero").animate({scrollLeft:e("#content-hero").scrollLeft()+i+s},400),t<0&&e("#content-hero").animate({scrollLeft:e("#content-hero").scrollLeft()+t-o},400)},p=function(){},d=function(){o!="mobile"&&(l.parallax("enable"),f.parallax("enable"),c.parallax("enable"),$intervention.parallax("enable"),$fine_art.parallax("enable"),u=!0)},v=function(){o=="mobile"&&(l.parallax("disable"),f.parallax("disable"),c.parallax("disable"),$intervention.parallax("disable"),$fine_art.parallax("disable"),u=!1)},m=function(){var e=t.children().length*(t.children().first().width()+9);t.css("width",e+10)},g=function(){var t=e("#content-hero").scrollLeft(),n=e("#hero-track").width()-e(window).width()-50;t===0?(e("#hero-left").fadeOut(),e("#hero-right").fadeIn()):t>0&&t<n?(e("#hero-left").fadeIn(),e("#hero-right").fadeIn()):t>=n&&(e("#hero-left").fadeIn(),e("#hero-right").fadeOut())},y=function(t){e("#information-title").html(t.find(".mod-information .mod-title").html()),e("#information-description").html(t.find(".mod-information .mod-description").html()),e("#information-tags").html(t.find(".mod-information .mod-tags").html())},b=function(){a||(e("#main").fadeTo(300,.2).addClass("blur"),e("#information").css("display","block"),e("#information").css("height",0),e("#information").css("width",e(".hero-element").first().width()),e("#information").css("height","auto"),a=!0)},w=function(n){e("#information").css("top",n.position().top+t.children().first().height()+10),e("#information").css("left",n.position().left)},E=function(){e("#information").stop().animate({height:0},{duration:200,queue:!1}),e("#information").fadeOut(100),e("#main").fadeTo(100,1),e("#main").removeClass("blur"),a=!1},S=function(){var t=e(window).width();t<=575?o="mobile":t<=850?o="tablet":o="desktop"},x=function(){var t=e(window).height(),n=t*.42;hero_width=n*(4/3),e("#content-crop").css("height",n),e(".hero-element").css("height",n-3),e(".hero-element").css("width",hero_width-3),e(".hero-element ul").css("height","120%"),e(".hero-element ul").css("width","120%"),e(".hero-element ul").css("margin-left","-10%"),e(".hero-element ul").css("margin-top","-10%"),e("#hero-right").css("height",n-3),e("#hero-left").css("height",n-3),m()},T=function(){S();if(o=="mobile"){var t=e(window).width(),n=e(".hero-element").first().height();e("#content-crop").css("height","auto"),e(".hero-element").css("height","auto"),e(".hero-element ul").css("margin-top","0"),e(".hero-element ul").css("margin-left","7px"),e(".hero-element ul").css("display","block"),e(".hero-element ul").css("float","left"),e(".hero-element ul").css("width",t*.4-20),e(".hero-element ul").css("height",t*.25*.75),e(".hero-element ul").each(function(t){e(this).css("height",250)})}else x()},N=function(){var t,n;S();switch(o){case"mobile":t=20,n=18;break;case"tablet":t=30,n=25;break;case"desktop":t=30,n=25;break;default:}e(".work-description").flowtype({minimum:400,maximum:1200,fontRatio:t}),e(".work-title").flowtype({minimum:400,maximum:1200,fontRatio:n}),e(".work-location").flowtype({minimum:400,maximum:1200,fontRatio:36}),e(".work-date").flowtype({minimum:280,maximum:500,fontRatio:24}),e(".education-description").flowtype({minimum:170,maximum:300,fontRatio:14}),e(".education-title").flowtype({minimum:170,maximum:300,fontRatio:13}),e(".education-location").flowtype({minimum:170,maximum:300,fontRatio:18})};e(document).on({ready:function(){m(),T(),g(),S(),d(),v(),N(),e(".hero-element").mouseenter(function(){s=e(this),o!="mobile"&&(clearTimeout(n),n=setTimeout(function(){w(s),y(s),b(),h()},50))}),e("#content-hero").scroll(function(){w(s),clearTimeout(r),r=setTimeout(function(){g()},50)}),e("#content-crop").mouseleave(function(){E()}),e("#hero-left").on({mouseenter:function(){E()},click:function(){E(),e("#content-hero").animate({scrollLeft:e("#content-hero").scrollLeft()-e(window).width()},800)}}),e("#hero-right").on({mouseenter:function(){E()},click:function(){E(),e("#content-hero").animate({scrollLeft:e("#content-hero").scrollLeft()+e(window).width()},800)}})}}),e(window).resize(function(){T(),clearTimeout(i),i=setTimeout(function(){g();switch(o){case"mobile":u&&v(),N();break;case"tablet":u||d(),N();break;case"desktop":u||d(),N();break;default:}},50),a&&w(s)})})(jQuery);