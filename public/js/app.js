$('#register-button').click(() => {
    $('.registration').slideToggle();
    
    // Change login to submit
    if ($('#login-button').text() == "Submit") {
        $('#login-button').text("Login");
    }
    else {
        $('#login-button').text("Submit");
    }

    // Change register to cancel
    if ($('#register-button').text() == "Cancel") {
        $('#register-button').text("Register");
    }
    else {
        $('#register-button').text("Cancel");
    }
});