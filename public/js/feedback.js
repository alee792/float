function deleteFeedbackClick(id) {
    if (confirm("Are you sure?")) {
      $.ajax({
        type: 'DELETE',
        url: '/api/feedback/' + id,
        dataType: 'json',
        contentType : 'application/json',
      })
        .done(function(response) {
          console.log("feedback", id, "is DOOMED!!!!!!");
          refreshFileList();
        })
        .fail(function(error) {
          console.log("I'm not dead yet!", error);
        })
    }
  }