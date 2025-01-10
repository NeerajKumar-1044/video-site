import mongoose,{Schema,Document} from 'mongoose'
import {IUser} from './userModel'

export interface IVideos extends Document {
  url: string[];
  owner: IUser;
  title: string;
  description: string;
  duration: string;
  views: number;
  private: boolean;
  thumbnail: string;
}

const VideoSchema: Schema<IVideos> = new Schema({
  url: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  duration: { type: String, required: true },
  views: { type: Number, default: 0 },
  private: { type: Boolean, default: false },
  thumbnail: { type: String, required: false },
});

export const Video = mongoose.model<IVideos>("Videos", VideoSchema);
