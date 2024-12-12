import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import ProductSlider from "@/app/components/ui/ProductSlider";
import Tabs from "@/app/components/ui/Tabs";
import Link from "next/link";

export default function productDetailsPage({}) {
  // const product =
  // allProducts.filter((elm) => elm.id == params.id)[0] || allProducts[0];
  return (
    <>
      <Header />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />

              <span className="text">Title</span>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs/>
      <ProductSlider/>
      <Footer />
    </>
  );
}
