//globals
var CLOSE_ICON = $(".toggle-container .close-icon");
var OPEN_ICON = $(".toggle-container .open-icon");

$(document).ready(function(){
	$(".toggle-container").on('click', Nav.toggle);
});

var Nav = {
	toggle: function(){
		//if menu is hidden/closed
		if($(this).hasClass('closed')){
			Nav.showNav($(this));
		}

		//if menu is opened
		else if($(this).hasClass('opened')){
			Nav.hideNav($(this));
		}
	},

	showNav: function(context){
		context.removeClass('closed');
		context.addClass('opened');

		$("#site-navigation").removeClass("hide");
		$("#site-navigation").addClass("show mobile-list-style");

		//hide open icon
		OPEN_ICON.toggleClass("hide");

		//show close icon
		CLOSE_ICON.toggleClass("hide");
	},

	hideNav: function(context){
		context.removeClass('opened');
		context.addClass('closed');

		$("#site-navigation").removeClass("show mobile-list-style");
		$("#site-navigation").addClass("hide");

		//hide close icon
		CLOSE_ICON.toggleClass("hide");

		//show open icon
		OPEN_ICON.toggleClass('hide');
	}
}