import Cart from "@/app/components/cart/Cart";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";

export const metadata = {
    title: "Step Flex",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Shopping Cart</div>
        </div>
      </div>
      <Cart/>
      <Footer/>
    </>
  );
}
