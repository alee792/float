$(document).ready(() => {
    $('#profile-toggle').click(() => {
        $('#profile').hide(750);
    });

    // Toggle CSS for card-media
    if ($('.card-media').prop('naturalWidth') > $('.card-media').prop('naturalHeight')) {
        $('.card-media').css('height', 'auto');
    } else {
        $('.card-media').css('width', 'auto')
    };

    // Slick around the cards
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav1,.slider-nav2'
      });

      $('.slider-nav1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-for,.slider-nav2'
      });
             
      $('.slider-nav2').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        // dots: true,
        variableWidth: true,
        focusOnSelect: true,
        arrows: false,
        asNavFor: '.slider-for,.slider-nav1',
        // centerMode: true,
      }); 
});