var mobile_menu_hidden = true;

function toggle_mobile_menu() {

  if (mobile_menu_hidden) {
    $(".navigation").animate({top: '50px'});
    mobile_menu_hidden = false;
  } else {
    $(".navigation").animate({top: '-200px'});
    mobile_menu_hidden = true;
  }
}
