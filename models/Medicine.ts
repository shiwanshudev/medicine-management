import mongoose, { Document, Model, Schema } from "mongoose";

interface IMedicine extends Document {
  medicineName: string;
  notes: string;
}

const medicineSchema: Schema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true },
    notes: { type: String, required: true },
    taken: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Medicine: Model<IMedicine> =
  mongoose.models.Medicine ||
  mongoose.model<IMedicine>("Medicine", medicineSchema);

export default Medicine;
