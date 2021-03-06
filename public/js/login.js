$(document).ready( () => {
    // Effects for the registration button
    $('#register-button').click(() => {
        $('.registration').slideToggle();

        // Change login to submit and form action to /register
        if ($('#login-button').text() == "Submit") {
            $('#login-button').text("Login");
            $("#user-form").attr("action", "/login");
        }
        else {
            $('#login-button').text("Submit");
            $("#user-form").attr("action", "/register");
        }

        // Change register to cancel
        if ($('#register-button').text() == "Cancel") {
            $('#register-button').text("Register");
        }
        else {
            $('#register-button').text("Cancel");
        }

        $('#register-button').toggleClass("is-info");
    });
});
function submitUser() {
    const loginData = {
        name: $('#name').val(),
        email: $('#email').val(),
        screen_name: $('#screen_name').val(),
        password: $('#password').val(),
        confirmPassword: $('#confirmPassword').val()
    };

    $.ajax({
        type: 'POST',
        url: $('#user-form').attr("action"),
        data: JSON.stringify(loginData),
        // dataType: 'json',
        contentType: 'application/json',
    })
        .done(function (response) {
            console.log("Logged In");
            window.location.href='/'
        })
        .fail(function (error) {
            console.log("Failed Login");
            console.log(error);
            window.alert("Something went wrong!");
        })
}

