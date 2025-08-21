import "../Pages/Section/SectionStyle.css";
import Section1 from "../Pages/Section/Section1";
import Section2 from "../Pages/Section/Section2";
import Section3 from "../Pages/Section/Section3";
import Section4 from "../Pages/Section/Section4";
import Section5 from "../Pages/Section/Section5";
import Section6 from "../Pages/Section/Section6";
import Section8 from "../Pages/Section/Section8";
import Section9 from "../Pages/Section/Section9";
import Section7 from "../Pages/Section/Section7";
import DiscountBanner from "./DiscountBanner";

const HeroSection = () => {
  return (
    <>
    <DiscountBanner/>
      {/*section 1.0 Order now main display */}
      <Section1 />
      {/*section 2.0 view menu */}
      <Section2 />
      {/* section 3.0 Explore full menu */}
      <Section3 />
      {/* section 4.0 Slider Explore menu */}
      <Section4 />
      {/*section 5.0 Our Crazy items */}
      <Section5 />
      {/*section 6.0 Review section */}
      <Section6 />
      {/*section 7.0 Paradox menu */}
      <Section7 />
      {/*section 8.0 Delivery section 30 minute */}
      <Section8 />
      {/*section 9.0 App Download Section */}
      <Section9 />
    
    </>
  );
};

export default HeroSection;
