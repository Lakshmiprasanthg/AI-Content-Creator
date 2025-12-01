import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please add a username'],
			unique: true,
			trim: true,
			maxlength: [50, 'Username cannot be more than 50 characters']
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address'
			]
		},
		password: {
			type: String,
			required: [true, 'Please set a password'],
			minlength: [6, 'Password must be at least 6 characters'],
			select: false
		}
	},
	{ timestamps: true }
);

// Hash password before save if modified
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Compare raw password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
