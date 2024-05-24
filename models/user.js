const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
});

userSchema.statics.findUserByCredebtials = function(email, password) {
    return this
    .findOne({email})
    .then(user => {
        if (!user) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
        }

        return bcrypt.compare(password, user.password).then(matched => {
            if (!matched) {
                return Promise.reject(new Error('Неправильные почта или пароль'));
            }

            return user;
        })
    })
}

const user = mongoose.model('user', userSchema);
