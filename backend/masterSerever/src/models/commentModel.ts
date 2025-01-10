import mongoose,{Schema,Document} from "mongoose"
import {IVideos} from "./videoModel"
import { IUser } from "./userModel";

export interface IComment extends Document {
  id: string;
  parent: IComment | IVideos;
  child: IComment | null;
  content: string;
  video: IVideos;
  commentOwner: IUser;
}

const CommentSchema: Schema<IComment> = new Schema({
  id: { type: String, required: true, unique: true },
  parent: { type: mongoose.Schema.Types.Mixed, required: false }, // Can be a Comment or Video
  child: { type: mongoose.Schema.Types.Mixed, required: false },
  content: { type: String, required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Videos", required: true },
  commentOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
