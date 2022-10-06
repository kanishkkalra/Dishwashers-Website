$(document).ready(function() {

    $("#vecta_menu").highlightMenu();

    // Preloading images
	$("#image_list a").each(function() {
        var swapImage = new Image();
        swapImage.src = $(this).attr("href");
    });
	
    $("#image_list a").click(function(evt) {
		// Getting href of the image that has been clicked on
		var imageURL = $(this).attr("href");
		// Animating the enlarged image
		$("#image").animate( 
			// Turning opacity to 0 and subtracting 250 from left margin
			{opacity:0, marginLeft:"-=205"}, 
			// Animating the above properties over a period of 1 second
			// and calling function after 1 second complete
			{duration:1000, complete: function(){ 
				// Replacing the large image with the image that has been clicked on
				$("#image").attr("src", imageURL); 
				// Animating the new large image
				$("#image").animate( 
					// Turninf opacity to 1 and adding 250 to margin
					{opacity:1, marginLeft:"+=205"}, 
					// Over a period of 1 second
					{duration:1000} 
				);
			}}
		);

        evt.preventDefault();
    });

    var slider = $("#image_list");    // slider = ul element
	var leftProperty, newLeftProperty;
		
	// the click event handler for the right button						
	$("#right_button").click(function() { 
		// get value of current left property
		leftProperty = parseInt(slider.css("left"));
		// determine new value of left property
		if (leftProperty - 300 <= -600) {
			newLeftProperty = 0; }
		else {
			newLeftProperty = leftProperty - 300; }
		// use the animate function to change the left property
		slider.animate( {left: newLeftProperty}, 1000);
	});  // end click
	
	// the click event handler for the left button
	$("#left_button").click(function() {
		// get value of current right property
		leftProperty = parseInt(slider.css("left"));
		
		// determine new value of left property
		if (leftProperty < 0) {
			newLeftProperty = leftProperty + 300;
		}
		else {
			newLeftProperty = 0;
		}
		
		// use the animate function to change the left property
		slider.animate( {left: newLeftProperty}, 1000);				
	});  // end click	


    $("#contactUs").validate({
        rules: {
            fname: {
                required: true
            },
            lname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            number: {
                required: true,
                number: true,
                minlength: 10
            },
            dob: {
                required: true,
                date: true
            },
            message: {
                required: true
            }
            
        }
    });

    $(".ourTeamContent a").click(function(evt) {
        if($(this).text() == "Read more") {
            $(this).next().toggleClass("hide");
            $(this).next().css("opacity",0);
            $(this).parent().animate(
                {height:"+=280px",backgroundColor:"aliceblue"},
                {duration:1000}
            );
            $(this).next().animate(
                {opacity:1},
                {duration:1000, complete:function() {
                    $(this).prev().text("Read less");
                }}
            );

        } else {
            $(this).parent().animate(
                {height:"-=280px",backgroundColor:"#ffe4c4"},
                {duration:1000}
            );
            $(this).next().animate(
                {opacity:0},
                {duration:1000, complete:function(){
                    $(this).prev().text("Read more");
                    $(this).toggleClass("hide");
                    $(this).parent().css("height","350px")
                }}
            );
        }

        evt.preventDefault();
    });

    $.getJSON("data.json",function(data){
        $.each(data,function(){
            $.each(this,function(key,value){
                $("#products").append(
                    "<tr><td>"+value.name+
                    "</td><td>"+value.stockNo+
                    "</td><td>"+value.quantity+
                    "</td><td>"+value.size+
                    "</td><td>"+value.colour+
                    "</td></tr>"
                );
            });
        });
    });

    
	$("#btnSearch").click(function() {
		
		
		var searchTerm = $("#search").val();

		var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
					  "format=json&jsoncallback=?&tags=" + searchTerm + "&tagmode=all";

		$.getJSON(url, function(data){
		var html = "<h2>Search result</h2>";
		$.each(data.items, function(i, item){
            html += "<fieldset style='margin:10px;'>";
			html += "<h2>" + item.title + "</h2>";	
			html += "<img src=" + item.media.m + ">";
            html += "</fieldset>";
		});
		$("#photos").html(html);
		});
		
	});
});