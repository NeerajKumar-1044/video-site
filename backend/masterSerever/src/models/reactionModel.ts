import mongoose,{Document,Schema} from "mongoose"
import {IVideos} from "./videoModel"
import {IUser} from "./userModel"
import {IComment} from "./commentModel"

interface IReaction extends Document {
  positive: boolean;
  ref: IVideos | IComment;
  from: IUser;
}

const ReactionSchema: Schema<IReaction> = new Schema({
  positive: { type: Boolean, required: true },
  ref: { type: mongoose.Schema.Types.Mixed, required: true }, // Can be a Video or Comment
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Reaction = mongoose.model<IReaction>("Reaction", ReactionSchema);
