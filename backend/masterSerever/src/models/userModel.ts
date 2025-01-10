import mongoose, { Schema, Document } from "mongoose";
import {IVideos} from "./videoModel.ts"

export interface IUser extends Document {
  id: string;
  createdAt: Date;
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
}

const UserSchema: Schema<IUser> = new Schema({
  id: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
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
});

export const User = mongoose.model<IUser>("User", UserSchema);
