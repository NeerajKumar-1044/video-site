import mongoose,{Document,Schema} from "mongoose"
import "IVideos" from "./videoModel.ts"
import "IUser" from "./userModel.ts"
import "IComment" from "./commentModel.ts"

interface IReaction extends Document {
  id: string;
  positive: boolean;
  ref: IVideos | IComment;
  from: IUser;
}

const ReactionSchema: Schema<IReaction> = new Schema({
  id: { type: String, required: true, unique: true },
  positive: { type: Boolean, required: true },
  ref: { type: mongoose.Schema.Types.Mixed, required: true }, // Can be a Video or Comment
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Reaction = mongoose.model<IReaction>("Reaction", ReactionSchema);
