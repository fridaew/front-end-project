import { Schema, model } from "mongoose";
import Package from './packageSchema'
import Review from './ReviewSchema'

interface Bookable {
  description: string;
  facilities: string[];
  packages: typeof Package;
  location: string;
  guests: Number;
  rooms: Number;
  reviews: Array<typeof Review>;

}


const bookablecabinSchema = new Schema<Bookable>({
  description: { type: String, required: true },
  facilities: { type: [String] },
  packages: { type: Schema.Types.ObjectId, ref: 'Package' },
  guests: { type: Number, default: 2 },
  rooms: { type: Number, default: 1 },
  location: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

export default model<Bookable>('Bookable', bookablecabinSchema);



