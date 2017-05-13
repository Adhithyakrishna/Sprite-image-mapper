	var handleError = function() {
		$(".previewContainer").removeClass('hasPreview');
		alert("Invalid Image");
	}

	var validator = function() {
		var num = parseInt($(".bg_reqW").val());
		if (typeof num === "number") {
			setBgCss();
		} else {
			alert("please enter a valid number");
		}
	}


	var setBgCss = function() {


		var obj = $('.bg_selector'),
			/*Jquery red box selector*/
			w = obj.width(),
			/*Width of the dappa*/
			h = obj.height(),
			/*Height of the dappa*/
			t = obj.offset().top,
			/*top relative to the entire document*/
			l = obj.offset().left,
			/*left relative to the entire document*/

			conObj = $('.bg_container'),
			/*Uploaded "image container"*/
			ct = conObj.offset().top - 2,
			/*top position of the image container*/
			cl = conObj.offset().left - 2,
			/*left position of the image container*/
			/*Get the exact position of the container relative to the document*/
			bx = (l - cl),
			/*left positon of the dappa - image container left*/
			by = (t - ct),
			/*top position of the dappa - image container top*/

			iw = $('.bg_image').width(),
			/*Width of the image container*/
			ih = $('.bg_image').height(),
			/*Height of the image container*/
			rw = $('.bg_reqW').val(),
			/* Width value given by the user*/
			rh = $('.bg_reqH').val(); /* Height value given by the user*/


		if (rw) {
			rw = rw / w; /* (required width / width of the dappa) --> ratio*/
			iw = iw * rw; /*(image container width * required width)*/
			bx = bx * rw; /*accurate x position * ratio*/
			by = by * rw; /*accurate Y position * ratio*/
			w = w * rw; /*(width of the dappa * requiredWidth)*/
			h = h * rw; /*(height of the dappa * requiredHeight)*/
		}

		pos = "-" + bx + "px -" + by + "px";
		size = iw + "px auto";

		$('.bg_preview').css({
			"width": w,
			"height": h,
			"background-position": pos,
			"background-size": size
		});
		$('.myRenderedCss').val("width :" + w + "px;\n" +
			"height :" + h + "px;\n" +
			"background-position :" + pos + ";\n" + "background-size :" + size + ";");

	}

	var renderView = function(imageURl, isfromUpload) {
		if (isfromUpload) {
			var imageURl = "data:image/png;base64," + imageURl;
			$(".renderPreview").attr('src', imageURl);
			$(".imageUpdater").addClass('imageUpdated');
		} else {
			$('.renderPreview').attr('src', imageURl);
		}
		$(".imageUpdater").addClass('imageUpdated');
		$(".previewContainer").addClass('hasPreview');
	}

	var initializeSelector = function() {

		$('.bg_selector').resizable({
			resize: function() {
				setBgCss();
			}
		}, {
			containment: 'parent'
		});
		$('.absolutePreview').draggable({
			containment: 'parent'
		});
		$('.absolutePreview').resizable({
			containment: 'parent'
		});
		$('.bg_selector').draggable({
			drag: function() {
				setBgCss();
			}
		}, {
			containment: 'parent'
		});
		// {containment: 'parent'},
		$(".bg_preview").droppable();

		/*
		 */
		$(".zoomin").click(function(event) {
			var zoomVal = $('.bg_preview').css('zoom');
			$('.bg_preview').css('zoom', (parseInt(zoomVal) + 1));
		});

		$(".zoomOut").click(function(event) {
			var zoomVal = $('.bg_preview').css('zoom');
			var minus;
			if(zoomVal > 1) {
				minus = zoomVal - 1;
			}
			else {
				minus = zoomVal - 0.5;
			}
			$('.bg_preview').css('zoom', minus);
		});

		$(".basic").spectrum({
			// showPaletteOnly: true,
			togglePaletteOnly: true,
			showButtons: false
		});

		$(".primary").on("dragstop.spectrum", function(e, color) {
			var color = color.toHexString(); // #ff0000
			$(".bg_container").css('background', color);
		});


		$(".secondary").on("dragstop.spectrum", function(e, color) {
			var color = color.toHexString(); // #ff0000

			$(".bg_selector").css('border', "2px solid" + color);
		});

	}

	$(".mapperContainer").unbind('click').bind('click', function() {
		// window.location = window.location.origin;
		window.open(
			location.href+"helper",'_blank' 
		);
	});

	$('.primary').off('click').on('click', function() {
		var bgColor = $(this).attr('style');
		$('.primary').removeClass('selected');
		$(this).addClass('selected');
		$('.bg_container').attr('style', bgColor);
	});

	$('.secondary').off('click').on('click', function() {
		var selectorColor = $(this).attr('style');
		var reqColor = selectorColor.split(":")[1].split(";")[0]
		$('.secondary').removeClass('selected');
		$(this).addClass('selected');
		$('.bg_selector').css('border-color', reqColor);
	});


	$("#updloadFile").on('change', function() {
		var fileExtension = ['jpeg', 'jpg', 'png', 'bmp'];

		if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
			alert("Only formats are allowed : " + fileExtension.join(', '));
		} else {
			var selectedFile = this.files[0];
			if ((selectedFile.size / 1024) < 1024) {
				selectedFile.convertToBase64(function(base64) {
					var imgUrl = base64.split("base64,")[1];
					renderView(imgUrl, true);
				});
			} else {
				alert("File size should not be greater than 1mb");
			}
		}
	});

	$('.cls_imageGetBtn').off('click').on('click', function() {
		$("#updloadFile").val('');
		var fileExtension = ['jpeg', 'jpg', 'png', 'bmp'];
		var imgUrl = $('.cls_getImage').val();
		if (imgUrl.length && $.inArray(imgUrl.split('.').pop().toLowerCase(), fileExtension) != -1) {
			renderView(imgUrl);
		} else {
			alert("invalid link");
		}
	});

	$(".mapImage").unbind('click').bind('click', function() {
		$(".previewStep").hide();
		var imageDom = $(".renderPreview")[0].src;
		$(".bg_image").attr('src', imageDom);
		$(".bg_preview").css('background-image', 'url(' + imageDom + ')');
		$(".renderStep").show();
		initializeSelector();
		setBgCss();
	});

	$(".reSelectImg").unbind('click').bind('click', function() {
		$("#updloadFile").val('');
		$(".previewStep").show();
		$(".renderStep").hide();
	});

	$(".copyCss").click(function() {
		$(".myRenderedCss").select();
		document.execCommand('copy');
	});

	$(".closePropertyTab").unbind('click').bind('click', function() {
		$(".absolutePreview.noOverFlow ").hide();
	});

	File.prototype.convertToBase64 = function(callback) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			callback(e.target.result, e.target.error);
		};
		reader.readAsDataURL(this);
	};