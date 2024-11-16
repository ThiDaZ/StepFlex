import Brands from "./components/Home/Brands";
import Categories from "./components/Home/Catagories";
import Features from "./components/Home/Features";
import Hero from "./components/Home/Hero";
import Products from "./components/Home/Products";
import AboutUs from "./components/Home/AboutUs";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Categories />
      <Brands />
      <Products />
      <AboutUs />
      <Features />
      <Footer bgColor="background-gray" />
    </div>
  );
}
