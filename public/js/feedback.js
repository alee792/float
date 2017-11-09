// Allow soft-deletion of feedback
function deleteFeedbackClick(id) {
    if (confirm("Are you sure?")) {
        $.ajax({
            type: 'DELETE',
            url: '/api/feedback/' + id,
            dataType: 'json',
            contentType: 'application/json',
        })
            .done(function (response) {
                console.log("feedback", id, "is DOOMED!!!!!!");
                window.location.href = '/feedback'
            })
            .fail(function (error) {
                console.log("I'm not dead yet!", error);
            })
    }
}

// Allow inline editing of comments
function editFeedbackClick(me, id) {

    var $el = $(me).parent().siblings(".edit-content");

    var $input = $('<textarea class="textarea"/>').val($el.text()).css({ "font-style": "italic" });
    $el.replaceWith($input);

    var save = function () {

        const feedbackData = {
            notes: $input.val()
        };

        var $p = $('<p class="edit-content" />').text($input.val());
        $input.replaceWith($p);

        $.ajax({
            type: 'PUT',
            url: '/api/feedback/' + id,
            data: JSON.stringify(feedbackData),
            // dataType: 'json',
            contentType: 'application/json',
        })
            .done(function (response) {
                console.log("Updated");
            })
            .fail(function (error) {
                console.log("I didn't update!", error);
            })

    };
    $input.one('blur', save).focus();

};