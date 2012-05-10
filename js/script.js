/*!
 * sidecar.xml generator
 *
 * Copyright 2011-2012
 * Johannes Henseler
 *
 * v0.3
 *
 * http://digitalpublishing.tumblr.com
 */

$(function() {


//*** activate popovers
	$(".subnav a").tooltip({
		placement: 'bottom'
	});


//*** fix sub nav on scroll
/*    var $win = $(window)
      , $nav = $('.subnav')
      , $body = $('body')
      , navTop = $('.subnav').length && $('.subnav').offset().top - 40
      , isFixed = 0

    processScroll()

    $win.on('scroll', processScroll)

    function processScroll() {
      var i, scrollTop = $win.scrollTop()
      if (scrollTop >= navTop && !isFixed) {
        isFixed = 1
        $nav.addClass('subnav-fixed')
        $body.addClass('fixednav')
      } else if (scrollTop <= navTop && isFixed) {
        isFixed = 0
        $nav.removeClass('subnav-fixed')
        $body.removeClass('fixednav')
      }
    }
*/

//*** init buttons and forms */
		$("#articles").sortable({
			placeholder: "dragging-highlight",
			containment: "#articles",
			distance: 15,
			axis: 'y',
			forcePlaceholderSize: true,
			opacity: 0.8,
			update: function(event, ui) {
				var result = $(this).sortable('toArray');
				builder.reOrder(result);
			}
		});
		$("#articles").disableSelection();


// *********************
// * OOP generator
// *********************

// create
var folio = new folio();
var builder = new builder();

// init
function folio() {
	this.uid = 0;
	this.articles = new Array();
}

function article() {
	console.log("New article created");
	folio.uid = folio.uid+1;

	this.uid = folio.uid;
	this.ordernumber = 0;
	this.articlename = String("");
	this.articletitle = "";
	this.description = "";
	this.author = "";
	this.kicker = "";
	this.tags = "";
	this.hidefromtoc = false;
	this.isad = false;
	this.smoothscrolling = "never";
	this.isflattenedstack = false;
}

function builder() {
	this.listArticles = function() {
		// empty article list
		$("#articles").html("");

		// go through each article in folio
		var x = 0;
		$.each(folio.articles, function(name,value) {
			// force numbering to start at 0
			value.ordernumber = x;
			html = write_article_html(value);
			// add to the list
			$("#articles").append(html);
			// goto next article in array
			x = x+1;
		});
	
/*		// change object values on change of the input fields
		// NO NEED CURRENTLY. DATA WILL BE HARVESTED AT THE END OF THE JOURNEY
		bindonchange_text("article-name","articlename");
		bindonchange_text("article-title","articletitle");
		bindonchange_text("article-desc","description");
		bindonchange_text("article-author","author");
		bindonchange_text("article-kicker","kicker");
		bindonchange_text("article-tags","tags");*/
	}

	this.addArticle = function(position) {
		console.log("adding article after: "+position);

		html = write_article_html(folio.articles[position]);
		$("#articles").append(html);

		// hide notice
		if (folio.articles.length >= 1) {
			$("#empty_folio").fadeOut("fast");
		}
		console.log(folio);
	};

	this.reOrder = function(newOrder) {
		console.log("new order is: "+newOrder);
	};
}

function write_article_html(value) {
			console.log("-----displaying article #"+folio.uid);
			// begin nested list
			var html = '<li id="article_'+folio.uid+'" class="article" data-article-nr="'+folio.uid+'"><ul>';
				// grabber and preview
				html = html + '<li class="article-order"><span class="icon-align-justify"></span> <span class="icon-search"></span>'+folio.uid+'</li>';
				// name
				html = html + '<li class="article-name"><input type="text" placeholder="Article Name" maxlength="60" value="'+String(value.articlename)+'" /></li>';
				// title
				html = html + '<li class="article-title"><input type="text" placeholder="Title" maxlength="60" value="'+String(value.articletitle)+'" /></li>';
				// desc
				html = html + '<li class="article-desc"><input type="text" placeholder="Description" maxlength="119" value="'+String(value.description)+'" /></li>';
				// author
				html = html + '<li class="article-author"><input type="text" placeholder="Author" maxlength="41" value="'+String(value.author)+'" /></li>';
				// kicker
				html = html + '<li class="article-kicker"><input type="text" placeholder="Kicker" maxlength="36" value="'+String(value.kicker)+'" /></li>';
				// tags
				html = html + '<li class="article-tags"><input type="text" placeholder="Tags" maxlength="100" value="'+String(value.tags)+'" /></li>';
				// hidefromTOC
				var output = (value.hidefromtoc) ? "active" : "";
				html = html + '<li class="article-hide"><button class="btn '+output+'" data-toggle="button"><span class="lbl btn_off">No</span><span class="lbl btn_on">Yes</span></button></li>'
				// is Advertisement
				var output = (value.isad) ? "active" : "";
				html = html + '<li class="article-adver"><button class="btn '+output+'" data-toggle="button"><span class="lbl btn_off">No</span><span class="lbl btn_on">Yes</span></button></li>'
				// smooth scrolling
				switch (value.smoothscrolling) {
					case "always":
						var smooth_always = 'active';
						break;
					case "portrait":
						var smooth_portrait = 'active';
						break;
					case "landscape":
						var smooth_landscape = 'active';
						break;
					case "never":
						var smooth_never = 'active';
						break;
					default:
						var smooth_never = 'active';
						break;
				}
				html = html + '<li class="article-smooth">';
					html = html + '<div class="btn-group" data-toggle="buttons-radio">';
						html = html + '<button class="btn btn_smooth_both '+smooth_always+'" title="Both directions"><span class="icon-move"></span></button>';
						html = html + '<button class="btn btn_smooth_vertical '+smooth_portrait+'" title="Vertical"><span class="icon-resize-vertical"></span></button>';
						html = html + '<button class="btn btn_smooth_horizontal '+smooth_landscape+'" title="Horizontal"><span class="icon-resize-horizontal"></span></button>';
						html = html + '<button class="btn btn_smooth_off '+smooth_never+'">Off</button>';
					html = html + '</div>';
				html = html + '</li>';
				// flatten
				var output = (value.isflattenedstack) ? "active" : "";
				html = html + '<li class="article-flatten"><button class="btn '+output+'" data-toggle="button"><span class="lbl btn_off">No</span><span class="lbl btn_on">Yes</span></button></li>'
				// delete
				html = html + '<li class="article-delete"><a href="#"><span class="icon-remove"></span></a></li>';

			// end nested list
			html = html + '</ul></li>';

			return html;
}


function bindonchange_text(where,mapped_value) {
	$("."+where+" INPUT").keyup(function(e) { 
		var article_nr = $(e.target).parents("li.article").attr("data-article-nr");
		folio.articles[article_nr][mapped_value] = String($(e.target).val());

		console.log("CHANGED "+where+" on "+article_nr+" = " + folio.articles[article_nr][mapped_value]);
	});
}


// *********************************
// * user interface interactions
// *********************************
$("#article_add-end").click(function () {
	// check if articles is empty (completely deleted by splice)
	if (folio.articles === undefined) {
		folio.articles = new Array();
	}
	// add a fresh article into the list of articles
	folio.articles.push(new article());

	builder.addArticle(folio.articles.length-1);

	// flush & list all articles
	// builder.listArticles();
});

$("#articles .article-delete a").live("click", function(e) {
	var article_nr = $(e.target).parents("li.article").attr("data-article-nr");
	console.log("starting to delete article: "+article_nr);

	// remove from array
	for(var i = folio.articles.length-1; i >= 0; i--){  // STEP 1
		if(folio.articles[i].uid == article_nr){			  // STEP 2
			folio.articles.splice(i,1);				 // STEP 3
		}
	}

	// remove article from DOM
	$("#article_"+article_nr).remove();

	console.log(folio)
	return false;
});

// disable flattening when in smooth scrolling
$("#articles .article-smooth").live("click", function(e) {
	var article_nr = $(e.target).parents("li.article").attr("data-article-nr");
	console.log("changing smoothscrolling in article "+article_nr);

	if (!$("#article_"+article_nr+" .article-smooth button.active").hasClass("btn_smooth_both"))
		$("#article_"+article_nr+" .article-flatten button").removeClass("active");
});

// disable smooth scrolling when flattening
$("#articles .article-flatten").live("click", function(e) {
	var article_nr = $(e.target).parents("li.article").attr("data-article-nr");
	console.log("changing flattening in article "+article_nr);

	if ($("#article_"+article_nr+" .article-flatten button.active")) {
		$("#article_"+article_nr+" .article-smooth button").removeClass("active");
		$("#article_"+article_nr+" .article-smooth button.btn_smooth_off").addClass("active");
	}
});


// ****** modal windows
$("#about-close").click(function() { $('#about').modal('hide') });
$("#import-close").click(function() { $('#import').modal('hide') });
$("#generate-close").click(function() { $('#generate').modal('hide') });







//*** add new article hover
    /*$("#last_line").mouseover(function(){
    	var $pin = $("#article_add-end"), 
    		$pos = $("#last_line").offset().top;
    	console.log($pos);
    	$pin.css("top",$pos);
    	$pin.fadeIn("fast");

    });

    $("#last_line").mouseout(function() {
    	var $pin = $("#article_add-end");

    	$pin.delay(1000).fadeOut('slow'); 
    });*/



});