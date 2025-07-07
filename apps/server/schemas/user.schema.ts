import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
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
      /^(?=.*[A-Za-z])(?=.*[!@#$&*])(?=.*[0-9]).{8}$/gm,
      `Password should include:\n
      1- At least one letter.\n
      2- At least one number.\n
      3- At least one special character.
      `,
    ],
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create indexes for better performance
UserSchema.index({ email: 1 });

// Enable virtuals in JSON output
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret._id;
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
