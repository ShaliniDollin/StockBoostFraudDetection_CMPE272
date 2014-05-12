		

////////////////////////////////////////////////////grid	

(function ($) {
				var $grid = $( '#tp-grid' ),
					$name = $( '#name' ),
					$close = $( '#close' ),
					$loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
					stapel = $grid.stapel( {
						onLoad : function() {
							$loader.remove();
						},
						onBeforeOpen : function( pileName ) {
							$name.html( pileName );
						},
						onAfterOpen : function( pileName ) {
							$close.show();
						}
					} );

				$close.on( 'click', function() {
					$close.hide();
					$name.empty();
					stapel.closePile();
				} );

 }) (jQuery);
			
////////////////////////////////////////////////////responsive nav

(function ($) {
                var open = false;

                function resizeMenu() {
                    if ($(this).width() < 768) {
                        if (!open) {
                            $("#menu").hide();
                        }
                        $("#menu-button").show();
                        
                    }
                    else if ($(this).width() >= 768) {
                        if (!open) {
                            $("#menu").show();
                        }
                        $("#menu-button").hide();
                        
                    }
                }

                function setupMenuButton() {
                    $("#menu-button").click(function(e) {
                        e.preventDefault();

                        if (open) {
                            $("#menu").fadeOut();
                            $("#menu-button").toggleClass("selected");
                        }
                        else {
                            $("#menu").fadeIn();
                            $("#menu-button").toggleClass("selected");
                        }
                        open = !open;
                    });
                }


                $(window).resize(resizeMenu);

                resizeMenu();
                setupMenuButton();

 }) (jQuery);
	
////////////////////////////////////////////////////top nav
	
	         (function ($) {
              $(".top-nav").sticky({ topSpacing: 0 });
            }) (jQuery);
	
	

////////////////////////////////////////////////////FancyBox

(function ($) {

	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
		
		$(".fancybox").fancybox({				
				padding : 0,
				beforeShow: function () {
					this.title = $(this.element).attr('title');
					this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
				},
				helpers : {
					title : { type: 'inside' },
				}
			});
			
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
	}
		

}) (jQuery);



////////////////////////////////////////////////////smothScroll

(function ($) {
 
    $("#navigation a, .jumbTo").bind('click',function(event){
		
		var navH = $('.top-nav').height();

        $("html, body, div.page").animate({
            scrollTop: $($(this).attr("href")).offset().top + (2) - (navH) + "px"
        }, {
            duration: 1200,
            easing: "easeInOutCirc"
        });

        return false;
		event.preventDefault();
    });
	
}) (jQuery);	
	
////////////////////////////////////////////////////waypoint nav highlight
	
(function ($) {	
	
	var page = $(".page");
	var navigation_links = $("#navigation a");
	
	page.waypoint({
		handler: function(event, direction) {
		
			var active_page;
			active_page = $(this);
			if (direction === "up") active_page = active_page.prev();

			var active_link = $('#navigation a[href="#' + active_page.attr("id") + '"]');
			navigation_links.removeClass("active");
			active_link.addClass("active");

		},
		offset: '35%'
	})

}) (jQuery);





////////////////////////////////////////////////////cbpFWSlider
	
(function ($) {
				/*
				- how to call the plugin:
				$( selector ).cbpFWSlider( [options] );
				- options:
				{
					// default transition speed (ms)
					speed : 500,
					// default transition easing
					easing : 'ease'
				}
				- destroy:
				$( selector ).cbpFWSlider( 'destroy' );
				*/

				$( '#cbp-fwslider' ).cbpFWSlider();

			}) (jQuery);



			
			



////////////////////////////////////////////////////accordion
				
(function ($) {
			  
  $(".accordion > .accordion-group > a").on("click", function(e){
    if($(this).parent().has("div.accordionin")) {
      e.preventDefault();
    }
    
    if(!$(this).hasClass("open")) {
      // hide any open menus and remove all other classes
      $("div.accordionin").slideUp(350);
      $(".accordion > .accordion-group > a").removeClass("open");
      
      // open our new menu and add the open class
      $(this).next("div.accordionin").slideDown(350);
      $(this).addClass("open");
    }
    
    else if($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).next("div.accordionin").slideUp(350);
    }
  });
}) (jQuery);
	
				
////////////////////////////////////////////////////accordion
(function ($) {
	$('#va-accordion').vaccordion({
					
  });
}) (jQuery);
			

////////////////////////////////////////////////////TABS

(function ($) {

	//Default Action
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content
	
	//On Click Event
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active content
		return false;
	});

}) (jQuery);



////////////////////////////////////////////////////ROTATOR

(function ($) {		

	$( '#cbp-qtrotator' ).cbpQTRotator();

}) (jQuery);



////////////////////////////////////////////////////CAROUSEL

(function ($) {

      $("#owl-cclints").owlCarousel({
	    navigation : true
	  });
		
}) (jQuery);

////////////////////////////////////////////////////PRELOADER

(function ($) {
// Preload the page with jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: true,
		autoClose:true,
		splashFunction: function() {
			$('#circle').delay(250).animate({'opacity' : 1}, 5000, 'linear');
		}
	});
	
}) (jQuery);	
	
	
	