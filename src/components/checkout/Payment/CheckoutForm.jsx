import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import apiPublic from "@/interceptors/axiosInstancePublic";

const CheckoutForm = ({ processCheckout, data }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const user = {
    name: data?.name,
    email: data?.email,
  };
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = data?.totalPrice;

  useEffect(() => {
    if (totalPrice > 0) {
      apiPublic
        .post("/payment/create-payment", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice]);

  const handleSubmit = async () => {
    console.log("processing");
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error: ", error);
      setError(error.message);
    } else {
      setError(null);
      console.log("payment method: ", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        console.log("transaction id", paymentIntent.id);
        toast.success("Payment successful");
        processCheckout("paid");
      } else {
        toast.error("Payment could not be completed");
      }
    }
  };
  return (
    <div className="flex flex-col">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "20px",
              color: "black",
              "::placeholder": {
                color: "black",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-red-700 mt-4">{error}</p>
      <p className="text-green-700 mt-4 text-center text-lg font-semibold">
        {transactionId &&
          "Payment Successful. Redirecting you to orders page..."}
      </p>

      {!transactionId && (
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full btn bg-primary text-white mt-5 py-2 rounded-md cursor-pointer"
          disabled={transactionId || !stripe || !clientSecret}
        >
          Pay
        </button>
      )}
    </div>
  );
};

export default CheckoutForm;
