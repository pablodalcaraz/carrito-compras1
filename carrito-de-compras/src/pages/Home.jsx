import { useEffect } from "react";
import { Banner } from "../components/Banner"


export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Banner></Banner>
    </>
  )
}



