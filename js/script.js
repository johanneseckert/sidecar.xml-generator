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
	$("[title]").tooltip({
		placement: 'bottom'
	});
	$(".subnav a").click(function() { return false; });

//*** fixed table header
	var stickerTop = parseInt($('.subnav').offset().top)-40;
	var sticked = false;
	$(window).scroll(function() {
	    if (parseInt($(window).scrollTop()) > stickerTop) {
	    	if (!sticked) {
		        $(".subnav").addClass("subnav-fixed");
		        $("body").addClass("fixednav");
		        sticked = true;
	    	}
	    } else {
	    	if (sticked) {
		        $(".subnav").removeClass("subnav-fixed");
		        $("body").removeClass("fixednav");
		        sticked = false;
	    	}
	    }
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
			containment: "#articles",
			handle: '.icon-align-justify',
			forcePlaceholderSize: true,
			distance: 15,
			axis: 'y',
			opacity: 0.8,
			start: function(event, ui) {
//				$("#articles").sortable( 'refreshPositions' )
				console.log('refreshed positions');
				$(".collapse.in").addClass("hide-temporarily");
//				$(".collapse.in").removeClass("in");
			},
			update: function(event, ui) {
//				var result = $(this).sortable('toArray');
//				builder.reOrder(result);
			},
			stop: function(event, ui) {
				$(".collapse.in").removeClass("hide-temporarily");
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
	this.articlename = String("");
	this.articletitle = "";
	this.description = "";
	this.author = "";
	this.kicker = "";
	this.tags = "";
	this.section = "";
	this.hidefromtoc = false;
	this.isad = false;
	this.smoothscrolling = "never";
	this.isflattenedstack = false;
}

function builder() {
	this.listArticles = function() {
		// empty article list
		$("#articles").html("");
		$("#empty_folio").fadeOut("fast");

		// go through each article in folio
		var x = 0;
		$.each(folio.articles, function(name,value) {
			// force numbering to start at 0
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
//		console.log("new order is: "+newOrder);
	};

	this.generateSidecar = function() {
		console.log("STARTING GENERATE sidecar.xml");

		var xw = new XMLWriter("UTF-8","1.0");
		xw.writeStartDocument(true);
		xw.writeStartElement('sidecar');

		// comment and info
		var now = new Date();
		var build_date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
		xw.writeComment("\nsidecar.xml generator by Johannes Henseler\nhttp://projects.nordsueddesign.de/sidecarxml\n\nBuilt on "+build_date+" using version 0.5 of the generator.\nTo edit this sidecar, import it into the generator again.\n\n");

		// more magic here
		// fetch all articles from the DOM
		$("#articles > li").each(function (e) {
			xw.writeComment('article #'+$(this).attr("data-article-nr"));
			xw.writeStartElement('entry');
				xw.writeElementString("folderName",String($(this).find(".article-name input").val()));
				xw.writeElementString("articleTitle",String($(this).find(".article-title input").val()));
				xw.writeElementString("description",String($(this).find(".article-desc input").val()));
				xw.writeElementString("author",String($(this).find(".article-author input").val()));
				xw.writeElementString("kicker",String($(this).find(".article-kicker input").val()));
				xw.writeElementString("tags",String($(this).find(".article-tags input").val()));
				xw.writeElementString("section",String($(this).find(".article-section input").val()));
				// Hide from TOC
				var output = ($(this).find(".article-hide .btn").hasClass("active")) ? "true" : "false";
				xw.writeElementString("hideFromTOC",output);
				// Advertisement
				var output = ($(this).find(".article-adver .btn").hasClass("active")) ? "true" : "false";
				xw.writeElementString("isAd",output);
				// Flatten
				var output = ($(this).find(".article-flatten .btn").hasClass("active")) ? "true" : "false";
				xw.writeElementString("isFlattenedStack",output);
				// smooth scrolling
				var output = "never";
				if ($(this).find(".btn_smooth_both").hasClass("active"))
					output = "always";
				if ($(this).find(".btn_smooth_horizontal").hasClass("active"))
					output = "landscape";
				if ($(this).find(".btn_smooth_vertical").hasClass("active"))
					output = "portrait";
				if ($(this).find(".btn_smooth_never").hasClass("active"))
					output = "never";
				xw.writeElementString("smoothScrolling",output);

			xw.writeEndElement();
		});

/*
		for (x=0;x<folio.articles.length;x++) {
			data = folio.articles[x];
			xw.writeComment('article #'+article.ordernumber+" uid: "+article.uid);
			xw.writeStartElement('entry');
				xw.writeElementString("folderName",String(article.foldername));
				xw.writeElementString("articleTitle",String(article.articletitle));
				xw.writeElementString("author",String(article.author));
				xw.writeElementString("kicker",String(article.kicker));
				xw.writeElementString("description",String(article.description));
				xw.writeElementString("tags",String(article.tags));
				xw.writeElementString("isAd",String(article.isad));
				xw.writeElementString("smoothScrolling",String(article.smoothscrolling));
				xw.writeElementString("isFlattenedStack",String(article.isflattenedstack));
			xw.writeEndElement();
		}
*/

		// close
		xw.writeEndElement();

		// OUTPUT
		var xml = xw.flush(); //generate the xml string
		xw.close();//clean the writer
		xw = undefined;//don't let visitors use it, it's closed
		//set the xml
		$("#sidecar-generate").val(xml);
	}

	this.importSidecar = function() {
		console.log("STARTING IMPORT");
		var xml = $("#sidecar-import").val();
		//console.log(xml);

		// start fresh
		$("#articles").html("");
		// empty articles
		folio.uid = 0;
		folio.articles = new Array();

		$(xml).find('entry').each(function() {
			var $entry = $(this);

			// add new article at the end.
			folio.articles.push(new article());

			var newArticle = folio.articles[folio.articles.length-1];	

			newArticle.articlename = $entry.find('folderName').text();
			newArticle.articletitle = $entry.find('articleTitle').text();
			newArticle.author = $entry.find('author').text();
			newArticle.kicker = $entry.find('kicker').text();
			newArticle.description = $entry.find('description').text();
			newArticle.tags = $entry.find('tags').text();
			newArticle.section = $entry.find('section').text();

			var hidefromtoc_bool = ($entry.find('hideFromTOC').text() === "true") ? true : false;
			newArticle.hidefromtoc = hidefromtoc_bool;

			var isad_bool = ($entry.find('isad').text() === "true") ? true : false;
			newArticle.isad = isad_bool;
			// if marked as ad, also mark as "hide from toc"
			if (isad_bool) newArticle.hidefromtoc = true;

			newArticle.smoothscrolling = $entry.find('smoothScrolling').text();

			var isflattenedstack_bool = ($entry.find('isFlattenedStack').text() === "true") ? true : false;
			newArticle.isflattenedstack = isflattenedstack_bool;

			console.log(folio);
		});

		builder.listArticles();
	}
}

function write_article_html(value) {
			console.log("-----displaying article #"+value.uid);
			// begin nested list
			var html = '<li id="article_'+value.uid+'" class="article" data-article-nr="'+value.uid+'"><ul>';
				// grabber and preview
				html = html + '<li class="article-order"><span class="icon-align-justify"></span> <a class="icon-search" data-toggle="collapse" data-target="#preview_'+value.uid+'"></a></li>';
				// name
				html = html + '<li class="article-name"><input type="text" placeholder="Name" maxlength="60" value="'+String(value.articlename)+'" /></li>';
				// title
				html = html + '<li class="article-title"><input type="text" placeholder="Title" maxlength="60" value="'+String(value.articletitle)+'" /></li>';
				// desc
				html = html + '<li class="article-desc"><input type="text" placeholder="Description" maxlength="120" value="'+String(value.description)+'" /></li>';
				// author
				html = html + '<li class="article-author"><input type="text" placeholder="Author" maxlength="40" value="'+String(value.author)+'" /></li>';
				// kicker
				html = html + '<li class="article-kicker"><input type="text" placeholder="Kicker" maxlength="35" value="'+String(value.kicker)+'" /></li>';
				// tags
				html = html + '<li class="article-tags"><input type="text" placeholder="Tags" maxlength="75" value="'+String(value.tags)+'" /></li>';
				// sections
				html = html + '<li class="article-section"><input type="text" placeholder="Section" maxlength="75" value="'+String(value.section)+'" /></li>';
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
				// preview pane (empty, for later cloning)
				html = html + '<li class="article-preview collapse" id="preview_'+value.uid+'" >This is empty... still rendering?</li>'

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
	// check if we can enable sorting again
	if (!$("#articles .collapse.in").length) {
		$("#articles .icon-align-justify").show();
		$("#alert-sorting-disabled").fadeOut("fast");
	}


	console.log(folio)
	return false;
});

// disable flattening when in smooth scrolling
$("#articles .article-smooth button").live("click", function(e) {
	var article_nr = $(e.target).parents("li.article").attr("data-article-nr");
	console.log("changing smoothscrolling in article "+article_nr);

	if (!$("#article_"+article_nr+" .article-smooth button.active").hasClass("btn_smooth_off"))
		$("#article_"+article_nr+" .article-flatten button").removeClass("active");
});

// disable smooth scrolling when flattening
$("#articles .article-flatten button").live("click", function(e) {
	var article_nr = $(e.target).parents("li.article").attr("data-article-nr");
	console.log("changing flattening in article "+article_nr);

	if ($("#article_"+article_nr+" .article-flatten button.active")) {
		$("#article_"+article_nr+" .article-smooth button").removeClass("active");
		$("#article_"+article_nr+" .article-smooth button.btn_smooth_off").addClass("active");
	}
});

// enable hide from TOC when enabling ad
$("#articles .article-adver button").live("click", function(e) {
	var article_nr = $(e.target).parents("li.article").attr("data-article-nr");

	if ($("#article_"+article_nr+" .article-adver button").hasClass("active"))
		$("#article_"+article_nr+" .article-hide button").addClass("active");

});

// toggle all previews

// render preview
$("#articles .icon-search").live("click",function(e) {
	var article_nr = $(this).parents("li.article").attr("data-article-nr");
	console.log("starting to render preview for article #"+article_nr);

	// hide all sorting handlers (sorry!)
	if ($("#articles .collapse.in").length) {
		$("#articles .icon-align-justify").hide();
		$("#alert-sorting-disabled").fadeIn("fast");
	} else {
		$("#articles .icon-align-justify").show();
		$("#alert-sorting-disabled").fadeOut("fast");
	}
	

	// clone previews template and insert into preview pane (collapsed)
	// but only if there is no previews in this article yet
	if (!$(this).parents("li.article").find(".previews").length) {
		$("#preview_"+article_nr).html("");
		
		// clone first
		var cloned = $("#hidden .previews").clone(false);
		// change IDs for tabs
		var newid_landscape = "landscape_"+article_nr;
		var newid_portrait = "portrait_"+article_nr;
		$(cloned).find("a[href=#landscape_XX]").attr("href","#"+newid_landscape);
		$(cloned).find("a[href=#portrait_XX]").attr("href","#"+newid_portrait);
		$(cloned).find("#landscape_XX").attr("id",newid_landscape);
		$(cloned).find("#portrait_XX").attr("id",newid_portrait);
		// append changed elements
		$(cloned).appendTo("#preview_"+article_nr);

		// attach event handlers
		bind_handlers(".article-title",".prev-title");
		bind_handlers(".article-desc",".prev-description");
		bind_handlers(".article-author",".prev-author");
		bind_handlers(".article-kicker",".prev-kicker");
		bind_handlers(".article-tags",".prev-tags");

		function bind_handlers(where, to) {
			$("#article_"+article_nr+" .previews "+to).html($("#article_"+article_nr+" "+where+" input").val());
			$("#article_"+article_nr+" "+where+" input").bind("keyup", function(e) {
				$("#article_"+article_nr+" .previews "+to).html($(this).val());
			});
		}

	}
});

// ****** modal windows
$("#about-close").click(function() { $('#about').modal('hide') });
$("#import-close").click(function() { $('#import').modal('hide') });
$("#generate-close").click(function() { $('#generate').modal('hide') });

// generate sidecar during showtime of the generate modal window
$('#generate').on('show', function () {
	builder.generateSidecar();
});

// import from textarea during closing time of import modal window
$("#start-import").click(function() {
	$("#import").modal('hide');

	// reset UI
	$("#alert-sorting-disabled").hide();
	$("#articles .icon-align-justify").show();

	builder.importSidecar();
	$("#sidecar-import").val("");
});





});