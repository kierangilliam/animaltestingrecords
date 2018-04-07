
var $stripes = $('#stripes');


function transitionToPage(link) {
    
    var offset = '0';    
    var height = $(window).height() / 3;
    var originalValues = [];

    $stripes.children().each(function() {
        var topPos = offset * height;
        offset++;
        originalValues.push({height: $(this).height(), bottom: $(this).css("bottom")});

        $(this).animate({
            top: topPos,
            height: height
        }, { duration: 'slow', easing: 'easeInOutBack' });
    }).promise().done(function() {
        window.location.href = '/' + link;
    });    
}

$(window).bind("pageshow", function() {

    var offset = 3;    
    var height = 11;    

    $stripes.children().each(function() {        

        $(this).css({"height": height, "top": $(window).height() - (height * offset * 2) + 'px'});
        offset--;

    }).promise().done(function() {
        offset = 0;
        $stripes.children().each(function() {
            var botPos = 2*(offset * height);
            offset++;
            $(this).css('top', 'auto');

            $(this).animate({                            
                height: height,
                bottom: botPos
            }, { duration: 'slow', easing: 'easeInOutBack' });
        });
    });    
});





