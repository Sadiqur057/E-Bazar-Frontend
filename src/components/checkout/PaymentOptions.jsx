import React, { useState } from "react";
import { Modal } from "../shared/Modal";
import Payment from "./Payment/Payment";
import { Button } from "../ui/button";

const PaymentOptions = ({ processCheckout, isFormValid, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        disabled={!isFormValid}
        onClick={() => setIsOpen(true)}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90"
      >
        Proceed Payment
      </Button>
      <Modal
        title={"Enter payment Information"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="lg"
      >
        <Payment processCheckout={processCheckout} data={data} />
      </Modal>
    </>
  );
};

export default PaymentOptions;
