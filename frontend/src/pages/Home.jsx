import HeroBanner from '../components/heroComponents/HeroBanner'
import PackageInfoCard from '../components/homePageCards/PackageInfoCard';
import InfoCabin from '../components/homePageCards/InfoCabin'
import ImageHomeSlider from '../components/homePageCards/ImageHomeSlider';
import Reviews from '../components/reviewComponent/Reviews';

function Home() {

  return (
    <>
      <HeroBanner />
      <PackageInfoCard/>
      <InfoCabin/>
      <ImageHomeSlider/>
      <Reviews/>
    </>
  );
}

export default Home;










