import { Schema, model } from 'mongoose';
import Bookable from './bookableSchema'
import User from './userSchema'

interface Reservation {
    bookableId: typeof Bookable;
    userId: typeof User;
    checkInDate: Date;
    checkOutDate: Date;
    cancellation_protection: {
        selected: boolean;
        price: number;
    };
    paymentOption: string;
    status: String
    bookingReference: string;
}

const reservationSchema = new Schema<Reservation>({
    bookableId: { type: Schema.Types.ObjectId, ref: 'Bookable' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    checkInDate: { type: Date, required:true},
    checkOutDate: { type: Date, required:true},
    cancellation_protection: {
        selected: { type: Boolean, default: false },
        price: { type: Number, default: 500 },
    },
    paymentOption: {
        type: String,
        enum: ['Klarna', 'PayPal', 'Card', 'American Express' ],
      },
    status: { type: String, default: 'pending' },
    bookingReference: { type: String, unique: true }, 
   

}, { timestamps: true });

export default model('Reservation', reservationSchema);

