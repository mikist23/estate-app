import { useContext, useState, useEffect } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [experienceCount, setExperienceCount] = useState(0);
  const [awardsCount, setAwardsCount] = useState(0);
  const [propertiesCount, setPropertiesCount] = useState(0);

  useEffect(() => {
    let interval;

    // Function to simulate counting animation
    const animateCount = (targetValue, setterFunc) => {
      let currentValue = 0;
      const increment = Math.ceil(targetValue / 50); // Adjust speed of counting
      interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(interval);
        }
        setterFunc(currentValue);
      }, 50); // Adjust interval for smoother animation
    };

    // Simulate counting animation for each number
    animateCount(28, setExperienceCount);
    animateCount(300, setAwardsCount);
    animateCount(4000, setPropertiesCount);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to ensure useEffect runs only once on mount

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            MikistEstate is a leading real estate platform dedicated to
            empowering consumers with data, inspiration, and knowledge around
            the place they call home. We connect people with the best local
            professionals who can help with their real estate needs.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>{experienceCount}+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>{awardsCount}</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>{propertiesCount}+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
