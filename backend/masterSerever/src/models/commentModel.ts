import mongoose,{Schema,Document} from "mongoose"
<<<<<<< HEAD
import {IVideos} from "./videoModel"
import { IUser } from "./userModel";
=======
import {IVideos} from "./videoModel.ts"
import { IUser } from "./userModel.js";
>>>>>>> 05f5290 (Update changes)

export interface IComment extends Document {
  parent: IComment | IVideos;
  child: IComment | null;
  content: string;
  video: IVideos;
  commentOwner: IUser;
}

const CommentSchema: Schema<IComment> = new Schema({
  parent: { type: mongoose.Schema.Types.Mixed, required: false }, // Can be a Comment or Video
  child: { type: mongoose.Schema.Types.Mixed, required: false },
  content: { type: String, required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Videos", required: true },
  commentOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
