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
import { depositAleoCredit } from "@/lib/queries/depositAleoCredits";
import Spinner from "./ui/spinner";
import { toast } from "sonner";

type Props = {};

const AddAleoCreditDialog = (props: Props) => {
  const creditInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const depositMutation = useMutation({
    mutationKey: ["depositAleoCredit"],
    mutationFn: () =>
    depositAleoCredit(parseInt(creditInputRef.current!.value)),
    onSuccess(data, variables, context) {
      setOpen(false);
      toast.success("Deposit Successful");
    },
    onError(error, variables, context) {
      console.log(error);
      toast.error("Deposit Failed:");
    },
  });

  const handleDeposit = () => {
    console.log("handle deposit triggred");
    if (creditInputRef.current?.value === "" || 0) return;

    if (parseInt(creditInputRef.current!.value) > 50) {
      toast.error("Max 50 credits", {
        duration: 2500,
        dismissible: true,
        important: true,
        action: {
          label: "Delete",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      return;
    }
    depositMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogTrigger>
        <Button>Send Aleo Credits to Play</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the credit amount</DialogTitle>
          <DialogDescription asChild>
            <div className="flex gap-6 w-full mt-2">
              <div className="w-full">
                <Input
                  ref={creditInputRef}
                  type="number"
                  maxLength={2}
                  min={0}
                  max={50}
                />
                <p className="text-xs font-bold mt-2">
                  Max: 50 credits, current fee: 1 ALEO TOKEN
                </p>
              </div>
              {depositMutation.isLoading ? (
                !depositMutation.isSuccess && <Spinner />
              ) : (
                <Button onClick={handleDeposit}>Deposit</Button>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddAleoCreditDialog;
