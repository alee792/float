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
        // infinite: true,
        variableWidth: true,
        focusOnSelect: true,
        arrows: false,
        asNavFor: '.slider-for,.slider-nav1',
        // centerMode: true,
    });
});

function submitFeedback(id) {
    
    if ($('#notes').val() == "") {
        window.alert("Sinks need notes! Let us know why this post doesn't make the cut.");
        return;
    }

    if (!$("#consent:checked").is(":checked")) {
        window.alert("Must consent to terms and conditions");
        return;
    }

    floatBool = (id === "floatTrue") ? true : false

    // AJAX for feedback submission
    const feedbackData = {
        notes: $('#notes').val(),
        post_id: $('.slick-current #post_id').html(),
        float: floatBool,
    };

    $.ajax({    
        type: 'POST',
        url: $('#feedback-form').attr("action"),
        data: JSON.stringify(feedbackData),
        // dataType: 'json',
        contentType: 'application/json',
    })
        .done(function (response) {
            window.location.href = '/'
        })
        .fail(function (error) {
            console.log("Failed to submit");
            console.log(error);
        });
}