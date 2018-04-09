var $stripes = $('#stripes');
var stripesResetInterval = 0;
var showingHomeButton = false;
var stripeHeight = 11;

// Grow red stripe and show a home button
function showReturnHome () {
    
    if (showingHomeButton == false) {
        
        showingHomeButton = true;

        $('#stripes #red #home-button').animate({
            opacity: '100',
            height: '50px'
        }, { duration: 300, easing: 'easeInOutBack' })
        .css('display', 'inline');

        $('#stripes #red').animate({
            bottom: 0,
            height: stripeHeight * 3
        }, { duration: 'slow', easing: 'easeInOutBack' });
    }
}

// Shrink red stripe and hide a home button
function hideReturnHome () {

    if (showingHomeButton == true) {
        showingHomeButton = false;
        
        $('#stripes #red #home-button').animate({
            opacity: '0',
            height: '0px'
        }, { duration: 500, easing: 'easeInOutBack' })
        .css('display', 'none');

        $('#stripes #red').animate({
            bottom: stripeHeight * 4,
            height: stripeHeight
        }, { duration: 'slow', easing: 'easeInOutBack' });
    }
}

$stripes.click(function () {
    
    var offset = 0;       

    // Home page (711jesus.faith/)
    // Special case: if stripes clicked in succession,
    // they blow up to show a secret
    if (window.location.pathname === '/') {

        // Set a timer, if timer expires, reset the stripes to their origin
        clearInterval(stripesResetInterval);
        stripesResetInterval = setTimeout(function () { resetStripes(true) }, 2000);

        // If $secret height is reached, show secret
        // TODO

        $stripes.children().each(function() {
            // Grow each stripe by a factor of 1.5
            var height = $(this).height() * 1.5;
            var topPos = offset * (height);
            offset++;
    
            $(this).animate({
                top: topPos,
                height: height
            }, { duration: 'slow', easing: 'easeInOutBack' });
        });
    } 
    // Show a return to home button
    else {
        
        showReturnHome();

        // Set a timer, if timer expires, reset the stripes to their origin
        clearInterval(stripesResetInterval);
        stripesResetInterval = setTimeout(hideReturnHome, 2000);        
    }
});

/* Call this function when a link is clicked internally on 711jesus.faith
    Stripes animate to cover screen then link is called
    TODO: Maybe start to load the link when function is first called then
          send user to loaded link after stripes hit the top of the screen
 */
function transitionToPage(link) {
    
    var offset = 0;    
    var height = $(window).height() / 3;
    
    $('#stripes #red #home-button').css('opacity', '0');

    $stripes.children().each(function() {
        var topPos = offset * height;
        offset++;

        $(this).animate({
            top: topPos,
            height: height
        }, { duration: 'slow', easing: 'easeInOutBack' });
    }).promise().done(function() {
        window.location.href = '/' + link;
    });    
}

/* On window load, reset stripes */
$(window).bind("pageshow", function() {
    resetStripes(false);

    // After a few seconds, show that there is a way to get home
    if (window.location.pathname !== '/') {
        setTimeout(function () { 
            showReturnHome();
            clearInterval(stripesResetInterval);
            stripesResetInterval = setTimeout(hideReturnHome, 2000);        
        }, 2000);    
    }
});

function resetStripes (animated) {

    var offset = 0;    
    var height = 11;    

    $stripes.children().each(function() {        

        // The -19 seems to be a good constant for resetting 
        // the stripes without jittering them when animated is true
        var topPos = $(window).height() - (height * offset * 2) - 19 + 'px';

        if (animated == true) {
            $(this).animate({                            
                height: height,
                top: topPos,//$(window).height(),
            }, { duration: 'slow', easing: 'easeInOutBack' });            
        } else {
            $(this).css({"height": height, "top": topPos});            
        }        

        offset++;

    }).promise().done(function() {
        offset = 0;
        $stripes.children().each(function() {
            var botPos = 2*(offset * height);
            offset++;
            $(this).css('top', 'auto');

            $(this).animate({    
                //top: "auto",                        
                height: height,
                bottom: botPos
            }, { duration: 'slow', easing: 'easeInOutBack' });
        });
    });    
}