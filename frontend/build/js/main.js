$(function() {
	$("#slider").slider({ range: true, value: [780, 1763] });
	$("#slider").on("slide", function(e) {
		$("#slider-min").text(e.value[0]);
		$("#slider-max").text(e.value[1]);
	});
	$("#slider2").slider({ range: true, value: [780, 1763] });
	$("#slider2").on("slide", function(e) {
		$("#slider-min2").text(e.value[0]);
		$("#slider-max2").text(e.value[1]);
	});
});