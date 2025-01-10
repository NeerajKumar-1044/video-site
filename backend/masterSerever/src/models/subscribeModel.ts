import mongoose,{Document,Schema} from "mongoose"
import {IUser} from "./userModel"

interface ISubscribe extends Document {
  from: IUser;
  to: IUser;
}

const SubscribeSchema: Schema<ISubscribe> = new Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Subscribe = mongoose.model<ISubscribe>("Subscribe", SubscribeSchema);
