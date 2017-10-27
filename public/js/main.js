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
      });
              
});