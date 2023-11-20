import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookableCard from '../components/BookableCard';
import LoadingComponent from '../components/statusComponents/LoadingComponent'; // Import your LoadingComponent
import ErrorComponenet from "./statusComponents/ErrorComponenet";

const Bookable = () => {
  const location = useLocation();
  const packageType = location.pathname.split("/").pop(); // Get the package type from the URL

  const [bookable, setBookable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        let url;

        if (packageType === 'bookable') {
          url = "http://localhost:3000/api/bookable/";
        } else {
          url = `http://localhost:3000/api/bookable/packages/${packageType}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const bookableData = await response.json();
        setBookable(bookableData);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };

    fetchItem();
  }, [packageType]);

return (
  <div className='Bookables'>
    {loading ? (
      <LoadingComponent />
    ) : error ? (
      <ErrorComponenet error={error} />
    ) : (
      <>
      <ul className='bookableCards-container'>
        {bookable && bookable.map(bookableItem => (
          <BookableCard key={bookableItem._id} bookable={bookableItem}/>         
        ))}
      </ul>
      </>
    )}
  </div>
    
);
}


export default Bookable;












