$(document).ready(function() {
    $('#registration-form').submit(function(event) {
        event.preventDefault();
        var email = $('#email').val();
        var login = $('#login').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirm-password').val();

        if (password !== confirmPassword) {
            alert("Паролі не співпадають");
            return;
        }

        var userData = {
            'email': email,
            'login': login,
            'password': password
        };

        $.ajax({
            url: '/users',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                alert(response.message);
                $('#registration-form')[0].reset();
            },
            error: function(error) {
                alert('Сталася помилка при реєстрації');
                console.log(error);
            }
        });
    });
});