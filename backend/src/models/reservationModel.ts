import { RequestHandler } from "express";
import ReservationSchema from '../schemas/reservationSchema'


export const getReservationById: RequestHandler = async (req, res) => {

  const reservation = await ReservationSchema.findById(req.params.id)
 
  .populate({
    path: 'bookableId',
    select: 'description location guests rooms', 
    populate: {
      path: 'packages', 
      select: 'name inclusions price image', 
    },
  })


  .exec();

  if(!reservation) res.status(404).json({ message: 'Could not find order' })

  res.status(200).json(reservation)
}

export const getReservation: RequestHandler = async (req, res,next) =>{

    try {
        const reservations = await ReservationSchema.find()
        .populate({
          path: 'bookableId',
          select: 'description location guests cancellation_protection rooms', 
          populate: {
            path: 'packages', 
            select: 'name inclusions price image', 
          },
        })
        .exec();

        res.status(201).json(reservations);

      } catch (error) {
        next(error);
      }
  }



  const generateBookingReference = () => {
  
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const referenceLength = 8; 
  
    let reference = '';
  
    // Generate a unique reference 
    for (let i = 0; i < referenceLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      reference += characters[randomIndex];
    }
  
    return reference;
  };
  
  
export const createReservation: RequestHandler = async (req, res, next) => {

  const { bookableId, userId, checkInDate, checkOutDate } = req.body;

  const bookingReference = generateBookingReference();

  try {
    const newReservation = await ReservationSchema.create({
      bookableId,
      userId,
      checkInDate,
      checkOutDate,
      bookingReference,
    });
    if (!newReservation) {
      return res.status(404).json({ message: 'Bookable not found' });
    }

    res.status(201).json(newReservation);
  } catch (error) {
    next(error);
  }
};


// export const createReservation: RequestHandler = async (req, res, next) => {
//   try {
//     const { bookableId, checkInDate, checkOutDate } = req.body;

//     const bookingReference = generateBookingReference();

//     const userId = req.session.userId;

//     // Check if userId is available in the session
//     if (!userId) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }
//     const newReservation = await ReservationSchema.create({
//       bookableId,
//       userId,
//       checkInDate,
//       checkOutDate,
//       bookingReference,
//     });

//     if (!newReservation) {
//       return res.status(404).json({ message: 'Bookable not found' });
//     }

//     res.status(201).json(newReservation);
//   } catch (error) {
//     console.error('Error:', error); // Log any errors
//     next(error);
//   }
// };








export const getReservationByUser: RequestHandler = async (req, res) => {

  const reservations = await ReservationSchema.find({ userId: req.params.id })
  .populate({
    path: 'bookableId',
    select: 'description location guests cancellation_protection rooms', 
    populate: {
      path: 'packages', 
      select: 'name inclusions price', 
    },
  })
  .exec();


  if(!reservations) res.status(404).json({ message: 'Could not find reservation' })

  res.status(200).json(reservations)
}

