/*!
 * sidecar.xml generator
 *
 * Copyright 2011
 * Johannes Henseler
 *
 * v0.2
 *
 * http://digitalpublishing.tumblr.com
 */

// remap jQuery to $
(function($){
})(this.jQuery);



// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};


// qTip2
// Match all <A/> links with a title tag and use it as the content (default).
$('a[title]').qtip();
$('input[').qtip();
$('button[title]').qtip();
$('img[title]').qtip();
$('.attention').qtip();

$('#save').qtip({
	content: {
		text: "<b>Articles saved into your browser's URL</b><br />Save the URL on your own to come back later.",
	},
	position: {
		target: $("body"),
		my: "top right",
		at: "top right",
		adjust: {
			x: -200,
			y: 10
		}
	},
	show: {
		event: 'click',
	},
	hide: {
		fixed: true,
		delay: 1000,
	}
})


// *
// * OOP generator
// *

// init
var folio = new folio();
var builder = new builder();

if (location.hash != "") {
	folio = $.bbq.getState(false);
	builder.listarticles();
}




function folio() {
	this.articles = new Array();
}

function article() {
	log("New article created");
	this.ordernumber = 0;
	this.foldername = String("");
	this.articletitle = "";
	this.description = "";
	this.author = "";
	this.kicker = "";
	this.tags = "";
	this.isad = "false";
	this.smoothscrolling = "never";
	this.isflattenedstack = "false";
}

function builder() {
	this.listarticles = function() {

		// get current state from URL (updating values)
		folio = $.bbq.getState(false);

		// empty article list
		$("#articlelist").html("");
		// go through each article in folio
		var x = 0;
		$.each(folio.articles, function(name,value) {

			// update ordernumber, article may be deleted
			value.ordernumber = x;

			log("-----processing article #"+value.ordernumber);
			var html = "";
				// grabber
				html = html + '<div class="sgm grabber" alt='+x+'><img src="css/grabber.png" width="16" height="16" title="Change position" /></div>';
				// ordernumber
				html = html + '<div class="sqm ordernumber" alt='+x+'>'+value.ordernumber+'</div>';
				// folder name
				html = html + '<div class="sqm foldername" alt='+x+'><input type="text" placeholder="Folder Name" maxlength="60" value="'+String(value.foldername)+'" /></div>';
				// article title
				html = html + '<div class="sqm articletitle" alt='+x+'><input type="text" placeholder="Title" maxlength="60" value="'+value.articletitle+'" /></div>';
				// description
				html = html + '<div class="sqm description" alt='+x+'><input type="text" placeholder="Description" maxlength="119" value="'+value.description+'" /></div>';
				// author
				html = html + '<div class="sqm author" alt='+x+'><input type="text" placeholder="Author" maxlength="41" value="'+value.author+'" /></div>';
				// kicker
				html = html + '<div class="sqm kicker" alt='+x+'><input type="text" placeholder="Kicker" maxlength="36" value="'+value.kicker+'" /></div>';
				// tags
				html = html + '<div class="sqm tags" alt='+x+'><input type="text" placeholder="Tags" maxlength="100" value="'+value.tags+'" /></div>';
				// isAd
				var isad_true = "";
					isad_false = "";
				switch (value.isad) {
					case "true":
						isad_true = 'checked="checked"';
						break;
					case "false":
						isad_false = 'checked="checked"';
						break;
					default:
						isad_false = 'checked="checked"';
						break;
				}
				html = html + '<div class="sqm isad buttonset" alt='+x+'><input type="radio" id="isad'+value.ordernumber+'-true" name="isad'+value.ordernumber+'" value="true" '+isad_true+' />	<label for="isad'+value.ordernumber+'-true">True</label>	<input type="radio" id="isad'+value.ordernumber+'-false" name="isad'+value.ordernumber+'" value="false" '+isad_false+' />	<label for="isad'+value.ordernumber+'-false">False</label></div>';
				// smooth scrolling
				var smooth_always = "";
					smooth_portrait = "";
					smooth_landscape = "";
					smooth_never = "";
				switch (value.smoothscrolling) {
					case "always":
						smooth_always = 'checked="checked"';
						break;
					case "portrait":
						smooth_portrait = 'checked="checked"';
						break;
					case "landscape":
						smooth_landscape = 'checked="checked"';
						break;
					case "never":
						smooth_never = 'checked="checked"';
						break;
					default:
						smooth_never = 'checked="checked"';
						break;
				}
				html = html + '<div class="sqm smoothscrolling buttonset" alt='+x+'><input type="radio" id="smooth'+value.ordernumber+'-always" name="smooth'+value.ordernumber+'" value="always" '+smooth_always+' />	<label for="smooth'+value.ordernumber+'-always">Both</label>	<input type="radio" id="smooth'+value.ordernumber+'-portrait" name="smooth'+value.ordernumber+'" value="portrait" '+smooth_portrait+' />	<label for="smooth'+value.ordernumber+'-portrait">Vertical</label><input type="radio" id="smooth'+value.ordernumber+'-landscape" name="smooth'+value.ordernumber+'" value="landscape" '+smooth_landscape+' />	<label for="smooth'+value.ordernumber+'-landscape">Horizontal</label><input type="radio" id="smooth'+value.ordernumber+'-never" name="smooth'+value.ordernumber+'" value="never" '+smooth_never+' />	<label for="smooth'+value.ordernumber+'-never">Off</label>	</div>';
				// isFlattenedStack
				var flattened_true = "";
					flattened_false = "";
				switch (value.isflattenedstack) {
					case "true":
						flattened_true = 'checked="checked"';
						break;
					case "false":
						flattened_false = 'checked="checked"';
						break;
					default:
						flattened_false = 'checked="checked"';
						break;
				}
				html = html + '<div class="sqm isflattenedstack buttonset" alt='+x+'><input type="radio" id="flattened'+value.ordernumber+'-true" name="flattened'+value.ordernumber+'" value="true" '+flattened_true+' />	<label for="flattened'+value.ordernumber+'-true">True</label>	<input type="radio" id="flattened'+value.ordernumber+'-false" name="flattened'+value.ordernumber+'" value="false" '+flattened_false+' />	<label for="flattened'+value.ordernumber+'-false">False</label></div>';

				// delete
				html = html + '<div class="sqm remove" alt='+x+'><button class="delete ui-icon ui-icon-close" id="'+value.ordernumber+'">Delete</button></div>'

			$("#articlelist").append("<li class='ui-state-default' id="+x+">"+html+"</li>");

			// goto next article in array
			x = x+1;
		});

		// re-activate jQuery UI
		$("button, .button").button();
		$(".buttonset").buttonset();

		// onchange
		updatefolio("foldername");
		updatefolio("articletitle");
		updatefolio("description");
		updatefolio("author");
		updatefolio("kicker");
		updatefolio("tags");
		updatefolio("isad");
		updatefolio("smoothscrolling");
		updatefolio("isflattenedstack");
		add_remove_listener();
	};

	this.reorder = function(order) {
		log("reordered! "+order);
		// go through each article and change ordernumber to new UI-order
		// slightly unelegant, but logic ,-)
		for (var x=0; x<order.length; x++) {
			log("try to change ordernumber or article#"+x+" to: "+order[x]);
			folio.articles[order[x]].ordernumber = x;
		}

		// re-order articles
		folio.articles.sort(function(a, b){
			return parseInt(a.ordernumber) - parseInt(b.ordernumber);
		});
		$.bbq.pushState(folio);
		builder.listarticles();
	};

	this.makesidecar = function() {
		log("STARTING GENERATE sidecar.xml");


		var xw = new XMLWriter("UTF-8","1.0");
		xw.writeStartDocument(true);
		xw.writeStartElement('sidecar');

		xw.writeComment("\nsidecar.xml generator by Johannes Henseler\nhttp://projects.nordsueddesign.de/sidecarxml\n");
		if ($('#incllink').attr('checked'))
			xw.writeComment("\nVisit this link to edit your sidecar (danger, can be seriously very long)\n\n"+location.href+"\n\n");
		
		for (x=0;x<folio.articles.length;x++) {
			article = folio.articles[x];
			xw.writeComment('article #'+article.ordernumber);
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
/*		$.each(folio.articles, function(name,value) {
			xw.writeComment('article #'+value.ordernumber);
			xw.writeStartElement('entry');
				xw.writeElementString(name,value);
			xw.writeEndElement();
		});
*/
		xw.writeEndElement();

		// OUTPUT
		var xml = xw.flush(); //generate the xml string
		xw.close();//clean the writer
		xw = undefined;//don't let visitors use it, it's closed
		//set the xml
		$("#sidecar-output").val(xml);


		// show modal dialogue with sidecar xml
		$( "#dialog-message" ).dialog({
			modal: true,
			minHeight: 400,
			minWidth: 800,
			show: 'slide',
			resizable: false,
			buttons: [{
				text: "Ok",
				click: function() {
					$( this ).dialog( "close" );
				}
			}],
			close: function(event, ui) {
				// refresh folio object (whyever)
				location.reload();
/*				delete folio;
				folio = $.bbq.getState(true);
				builder.listarticles();
*/			}
		});		
	}
};


function updatefolio(where) {
	$("."+where+" INPUT").change(function(e) { 
		var id = $(e.target).parent().attr("alt");
		folio.articles[id][where] = String($(e.target).val());
		log("new "+where+" on "+id+" = " + folio.articles[id][where]);
		$.bbq.pushState(folio,true);
	});
}
function add_remove_listener() {
	$(".delete").click(function(e) { 
		var id = $(e.target).parent().attr("id");
		log("delete article #"+id);
		// remove from array
		folio.articles.splice(id,1);
		$.bbq.pushState(folio);
		builder.listarticles();
	//	folio.articles[id][where] = $(e.target).val();
	});
}


// *
// * user interface functions
// *
$("#add_article").click(function () {
	// check if articles is empty (completely deleted by splice)
	if (folio.articles === undefined) {
		folio.articles = new Array();
	}
	folio.articles.push(new article());
	$.bbq.pushState(folio);
	builder.listarticles();
})

// SAVE
$("#save").click( function() {
	log("PUSHING STATE");
	log(folio);
	$.bbq.pushState(folio,false);	
});

// GENERATE
$("#generate").click( function() {
	$.bbq.pushState(folio,false);
	builder.makesidecar();
});


// activate UI
$("button, .button").button();
$(".buttonset").buttonset();

$( "#articlelist" ).sortable({
			placeholder: "ui-state-highlight",
			distance: 15,
			axis: 'y',
			forcePlaceholderSize: true,
			opacity: 0.8,
/*			start: function(event, ui) {
				log("STARTING: PUSHING STATE");
				$.bbq.pushState(folio);
			},*/
			update: function(event, ui) {
				var result = $(this).sortable('toArray');
				builder.reorder(result);
			}
		});
//$( "#articlelist" ).disableSelection();



 // Bind an event to window.onhashchange that, when the history state changes,
 // gets the url from the hash and displays either our cached content or fetches
 // new content to be displayed.
 $(window).bind( 'hashchange', function(e) {
//	if (location.hash != "")
//		bike = $.bbq.getState();
//	builder.listarticles();
 });