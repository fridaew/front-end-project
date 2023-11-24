import { RequestHandler } from "express";
import Bookable from '../schemas/bookableSchema'
import ReviewSchema from "../schemas/ReviewSchema";
import PackagesSchema from "../schemas/packageSchema";


export const createBookable: RequestHandler = async (req, res, next) => {

  const {description,facilities, packages,location, reviews, } = req.body;

  try {
    const newBookable= await Bookable.create({
      description,
      facilities,
      packages,
      location,
      reviews, 

    })
    res.status(201).json(newBookable)
  } catch (error) {
    next(error)
  }

}

export const getAllBookables: RequestHandler = async (req, res, next) => {
  try {
    const bookables = await Bookable.find()
      .populate('reviews')
      .populate('packages')
      .exec();

      if (!bookables) {
        return res.status(404).json({ message: 'Bookable not found' });
      }

    res.status(200).json(bookables);
  } catch (error) {
    next(error);
  }
};



export const getBookableById: RequestHandler = async (req, res, next) => {
  try {
    const bookable = await Bookable.findById(req.params.id)
      .populate('reviews')
      .populate('packages')
      .exec();

    if (!bookable) {
      return res.status(404).json({ message: 'Bookable not found' });
    }

    res.status(200).json(bookable);
  } catch (error) {
    next(error);
  }
};


export const createPackages: RequestHandler = async (req, res, next) => {

    try {
      const {name , inclusions, price, image, type} = req.body; // Get review data from the request body
      const newPackage = await PackagesSchema.create({
        name,
        inclusions,
        price,
        image,
        type
      });
      res.status(201).json(newPackage);
    } catch (error) {
      next(error);
    }
  }



  export const getBookablesByPackageType: RequestHandler = async (req, res, next) => {

    const packageType = req.params.packageType; 
  
    try {
      const matchingPackages = await PackagesSchema.find({ type: packageType });
  
      if (!matchingPackages || matchingPackages.length === 0) {
        return res.status(404).json({ message: 'No matching packages found.' });
      }
  
      const packageIds = matchingPackages.map((pkg) => pkg._id);
  
      const bookables = await Bookable.find({ 'packages': { $in: packageIds } })
        .populate('reviews')
        .populate('packages')
        .exec();
  
      if (!bookables || bookables.length === 0) {
        console.log('No matching bookables found.');
        return res.status(404).json({ message: 'No matching bookables found.' });
      }
  
      res.status(200).json(bookables);
    } catch (error) {
      next(error);
    }
  };


  export const createReview: RequestHandler = async (req, res, next) => {

  try {
    const {rating, image, name, text} = req.body; // Get review data from the request body
    const newReview = await ReviewSchema.create({
      rating, 
      name,
      image,
      text
    });
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
}

export const getReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await ReviewSchema.find();

    if (!reviews) {
      return res.status(404).json({ message: 'Reviews not found' });
    }
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};