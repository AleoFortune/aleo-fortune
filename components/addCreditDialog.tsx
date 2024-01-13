import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useAccount } from "@puzzlehq/sdk";
import { useMutation } from "@tanstack/react-query";
import { depositFortuneCredit } from "@/lib/queries/depositFortuneCredits";

type Props = {};

const AddCreditDialog = (props: Props) => {
  const { account } = useAccount();
  const creditInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const depositMutation = useMutation({
    mutationKey: ["depositFortuneCredit", Date.now().toString()],
    mutationFn: () =>
      depositFortuneCredit(account!, parseInt(creditInputRef.current!.value)),
    onSuccess(data, variables, context) {
      setOpen(false);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const handleDeposit = () => {
    console.log("handle deposit triggred");
    if (creditInputRef.current?.value === "" || 0) return;

    if (parseInt(creditInputRef.current!.value) > 50) {
      alert("Max 50 credits");
    }
    depositMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add More Credits</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the credit amount</DialogTitle>
          <DialogDescription asChild>
            <div className="flex gap-6 w-full mt-2">
              <div className="w-full">
                <Input ref={creditInputRef} type="number" />

                <p className="text-xs font-bold mt-2">
                  Max: 50 credits, current fee:3.5 ALEO TOKEN
                </p>
              </div>
              <Button onClick={handleDeposit}>Deposit</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditDialog;
