import mongoose, { Schema, Document } from "mongoose";
import { IVideos } from "./videoModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  coverImage: string;
  watchHistory: string[];
  password: string;
  refreshToken: string;
  subscribedChannels: string[];
  latestNotification: string[];
  notificationHistory: string[];
  videosUploaded: string[];
  subscribers: IUser[];
  subscriberCount: number;
  savedVideos: IVideos[];
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  isPasswordCorrect: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  avatar: { type: String, required: false },
  coverImage: { type: String, required: false },
  watchHistory: [{ type: String }],
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
  subscribedChannels: [{ type: String }],
  latestNotification: [{ type: String }],
  notificationHistory: [{ type: String }],
  videosUploaded: [{ type: String }],
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  subscriberCount: { type: Number, default: 0 },
  savedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Videos" }],
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10)
  next()
})
UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRECT,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,

    },
    process.env.REFRESH_TOKEN_SECRECT,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model<IUser>("User", UserSchema);
