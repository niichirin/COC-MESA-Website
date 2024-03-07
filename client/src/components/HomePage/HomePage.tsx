import HomeHeader from "./HomeHeader.tsx";
import HomeAbout from "./HomeAbout.tsx";
import HomeResults from "./HomeResults.tsx";
import HomeServices from "./HomeServices.tsx";

const HomePage = () => {
    return (
      <div className="HomePage">
          <HomeHeader />
          <HomeAbout />
          <HomeResults />
          <HomeServices />
      </div>
    );
  }
  
  export default HomePage;