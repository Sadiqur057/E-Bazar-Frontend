import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_GATEWAY_KEY
);
const Payment = ({ handleOpen, processCheckout, data }) => {
  return (
    <div className="px-10 py-20">
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            handleOpen={handleOpen}
            processCheckout={processCheckout}
            data={data}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
