if (window.location.href.indexOf('postback') > -1) {

  $(".js-range-slider").ionRangeSlider({
    skin: "modern",
    min: 0,
    max: 168,
    from: 104,
    postfix: ' hours'
  });

}
