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
                refreshFileList();
            })
            .fail(function (error) {
                console.log("I'm not dead yet!", error);
            })
    }
}

// Allow inline editing of comments
$('.edit').on('click', function () {

    var $el = $(this).parent().siblings(".edit-content");

    var $input = $('<textarea class="textarea"/>').val($el.text()).css({ "font-style": "italic" });
    $el.replaceWith($input);

    var save = function () {
        var $p = $('<p class="edit-content" />').text($input.val());
        $input.replaceWith($p);
        $.ajax({
            type: 'PUT',
            url: '/api/feedback/' + id,
            dataType: 'json',
            contentType: 'application/json',
        })
            .done(function (response) {
                refreshFileList();
            })
            .fail(function (error) {
                console.log("I didn't update!", error);
            })

    };

    /**
      We're defining the callback with `one`, because we know that
      the element will be gone just after that, and we don't want 
      any callbacks leftovers take memory. 
      Next time `p` turns into `input` this single callback 
      will be applied again.
    */
    $input.one('blur', save).focus();

});