// import Loading from "../Loading/Loading";
import FeatureProduct from "../components/FeatureProduct";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Trusted from "../components/Trusted";

const Home = () => {
  const data = {
    name: "Price store",
  };

  return (
    <>
       
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
