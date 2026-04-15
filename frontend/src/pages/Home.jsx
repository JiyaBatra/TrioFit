
import Offer from "../components/Offer"; // <-- import karo
import Popular from "../components/Popular";
import Category from "../components/Category";
import TwentyPercentOff from "./twentypercentoff";

const Home = () => {
  return (
    <main className="home">

      {/* Header ke niche offer slider */}
      <Offer />
    
      {/* Popular picks */}
      <Popular />
        {/* Discounted products */}
      <TwentyPercentOff />
      {/* Category section */}
      <Category />



      
    </main>
  );
};

export default Home;