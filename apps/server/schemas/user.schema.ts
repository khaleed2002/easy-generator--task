import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail } from "class-validator";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true, // Automatically manages createdAt and updatedAt
  versionKey: false, // Removes __v field
})
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email: string) => {
        return isEmail(email);
      },
      message: "Please enter a valid email address",
    },
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 3,
  })
  name: string;

  @Prop({
    required: true,
    minlength: 8,
    select: false, // Excludes password from queries by default
    match: [
      /^(?=.*[A-Za-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
      "Password must contain at least one letter, one number, and one special character.",
    ],
  })
  password: string;

  @Prop({
    required: false,
  })
  refresh_token_hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Enable virtuals in JSON output
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// Pre-save middleware example (you might want to hash passwords here)
UserSchema.pre("save", function (next) {
  // Example: Hash password before saving
  // if (this.isModified('password')) {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
  next();
});
