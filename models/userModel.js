const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You need to define a name"],
  },
  email: {
    type: String,
    unique: [true, "This email is already in use."],
    lowercase: true,
    required: [true, "You need to define an email address"],
  },
  password: {
    type: String,
    require: [true, "You need to define a password"],
    minlength: [8, "Password must be 8 characters or more."],
  },
  passwordConfirm: {
    type: String,
    require: [true, "You need to confirm your passwor."],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: { type: Date },
});

userSchema.pre("save", async function (next) {
  // This will execute if the password was actually modified or created
  if (!this.isModified("password")) return next();

  // Hashing the password.
  this.password = await bcrypt.hash(this.password, 12);
  // Deleting passwordConfirm field, since it was only needed for validation.
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  currentPassword
) {
  return await bcrypt.compare(inputPassword, currentPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  console.log(this);
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log("jee");

    return changeTimeStamp > JWTTimestamp;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
