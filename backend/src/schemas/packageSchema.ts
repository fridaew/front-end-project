import { Schema, model } from 'mongoose';

interface Package {
  name: string;
  inclusions: string[];
  price: number;
  image: string[];
  type: string;
}

const packageSchema = new Schema<Package>({
  name: { type: String, required: true },
  inclusions: { type: [String] },
  price: { type: Number, required: true },
  image: { type: [String] },
  type: { type: String, required: true },

},);

export default model<Package>('Package', packageSchema);
