module.exports = {
    validateUser: function (user, requiered = true) {
        js_ret = [{}]
        if (requiered == true ||  user.username) {
            if (user.username.length < 4 || user.username.length > 20)
                js_ret[0]['username_length_error'] = "Username must be between 4 and 20 characters long";
        }
        if (requiered == true || user.email) {
            if (user.email.length < 4 || user.email.length > 30)
                js_ret[0]['email_length_error'] = "Email must be between 4 and 30 characters long"
            else if (requiered == true || user.email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(user.email))
                    js_ret[0]['email_match_error'] = "Invalid email address"
            }
        }
        if (requiered == true || user.password) {
            if (user.password.length < 4 || user.password.length > 20)
                js_ret[0]['password_length_error'] = "Password must be between 4 and 20 characters long"
        }
        return js_ret
    }
}