const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['admin', 'editor', 'gestor', 'estudiante'];

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    roles: [{ type: String, enum: ROLES, required: true }],
}, { timestamps: true });

userSchema.pre('validate', function (next) {
    const r = this.roles || [];
    if (r.includes('estudiante') && (r.includes('editor') || r.includes('gestor'))) {
        const err = new Error('El rol estudiante no puede combinarse con editor o gestor');
        err.status = 400;
        return next(err);
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();

    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model('User', userSchema);
