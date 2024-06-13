import { Schema, model } from "mongoose";

const URLSchema = new Schema(
  {
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    urlId: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },

    history: [
      {
        clickedDate: Date,
      },
    ],
  },
  { timestamps: true }
);
const URLModel = model("Url", URLSchema);
export default URLModel;
