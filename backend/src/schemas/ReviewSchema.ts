import { Schema,model } from 'mongoose';


interface Review {
  image: string; 
  name: String
  rating: number;
  text: string;
}

const reviewSchema = new Schema<Review>({
  image: { type: String, required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true }, 
});

export default model<Review>('Review', reviewSchema);






