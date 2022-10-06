(function($) {
    $.fn.highlightMenu = function() {
        
        return this.each(function() {
            var items = $("li a");

            items.css("background","linear-gradient(to left, bisque 50%, black 50%) right")
            .css("background-size","200%")
            .css("transition", ".5s ease-out")
            
            items.mouseover(function() {
                $(this).css("background-position", "left")
                .css("color", "bisque");
            });

            items.mouseout(function() {
                $(this).css("background-position", "right")
                .css("color", "black");
            });
        });
    }
})(jQuery);