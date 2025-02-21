"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import toast from "react-hot-toast";
import api from "@/interceptors/axiosInstance";
import { clearCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import PaymentOptions from "./PaymentOptions";

const Checkout = () => {
  const { symbol, conversionRate } = useFetchCurrencyData();
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    state: "",
    name: "",
    email: "",
    phone: "",
    streetAddress: "",
    country: "",
    state: "",
    zipCode: "",
    orderNotes: "",
    totalAmount: "",
  });
  const [cartItems, setCartItems] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData, paymentMethod]);

  const fetchCartItem = async () => {
    try {
      const res = await api.get("/cart");
      if (res?.data?.success) {
        setCartItems(res?.data?.data?.products);
        setFormData((prev) => ({
          ...prev,
          name: res?.data?.data?.user?.name,
          email: res?.data?.data?.user?.email,
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchCartItem();
  }, []);

  const total = useMemo(() => {
    return cartItems?.reduce(
      (sum, item) =>
        (sum =
          +(item?.product?.price || 0) *
          conversionRate *
          (item?.quantity || 0)),
      0
    );
  }, [cartItems, conversionRate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validateForm = () => {
    if (!cartItems) return false;
    const requiredFields = [
      formData?.firstName,
      formData?.lastName,
      formData?.streetAddress,
      formData?.country,
      formData?.state,
      formData?.zipCode,
      formData?.email,
      formData?.phone,
      paymentMethod,
    ];

    const isValidated = requiredFields.every(
      (field) => field && field.trim() !== ""
    );

    if (!isValidated) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (paymentStatus) => {
    const data = {
      shippingAddress: `${formData?.streetAddress}, ${formData?.state} ${formData?.country}`,
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
      products: cartItems?.map((item) => ({
        product: item?.product?._id,
        quantity: item?.quantity,
      })),
    };
    console.log("Checkout", data);
    try {
      const res = await api.post("/order/add", data);
      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Something went wrong");
      }
      console.log("checking red", res);
      toast.success(res?.data?.message);
      dispatch(clearCart());
      router.push("/dashboard/orders");
    } catch (error) {
      console.error(error);
      return toast.error(
        error?.response?.data?.message || "something went wrong"
      );
    }
  };

  return (
    <div>
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-xl bg-gray-50 p-6">
            <h1 className="mb-6 text-2xl font-semibold tracking-tight">
              Billing Information
            </h1>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Your first name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company Name{" "}
                  <span className="text-sm text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="country">Country / Region</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="ZIP code"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    disabled
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold tracking-tight">
                  Additional Info
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                  <Textarea
                    id="orderNotes"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl bg-gray-50 p-6">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cartItems?.length > 0
                ? cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-16 w-16 overflow-hidden rounded-lg border bg-muted p-1">
                          <Image
                            src={item?.product?.image}
                            alt={item?.product?.name}
                            width={60}
                            height={60}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item?.product?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item?.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        {symbol}{" "}
                        {(item?.product?.price * conversionRate).toFixed(2)}
                      </p>
                    </div>
                  ))
                : "No item found"}

              <div className="my-6 border-t pt-6">
                <div className="flex justify-between">
                  <span className="text-base">Subtotal</span>
                  <span className="font-medium">
                    {symbol} {total?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-base">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between mt-2 text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    {symbol} {total?.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value)}
                  name="paymentMethod"
                >
                  <div>
                    <RadioGroupItem value="Cash on Delivery" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="text-sm ml-2 flex-1 cursor-pointer"
                    >
                      <span className="font-medium">Cash on Delivery</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="Online Payment" id="online" />
                    <Label
                      htmlFor="online"
                      className="text-sm ml-2 flex-1 cursor-pointer"
                    >
                      <span className="font-medium">Online Payment</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {paymentMethod === "Online Payment" ? (
                <PaymentOptions
                  isFormValid={isFormValid}
                  processCheckout={handleSubmit}
                  data={{
                    name: formData?.name,
                    email: formData?.email,
                    totalPrice: total,
                  }}
                />
              ) : (
                <Button
                  onClick={() => handleSubmit("unpaid")}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!isFormValid}
                >
                  Place Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
