import mongoose,{Document,Schema} from "mongoose"
import {IUser} from "./userModel.ts"

interface ISubscribe extends Document {
  id: string;
  from: IUser;
  to: IUser;
}

const SubscribeSchema: Schema<ISubscribe> = new Schema({
  id: { type: String, required: true, unique: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Subscribe = mongoose.model<ISubscribe>("Subscribe", SubscribeSchema);
