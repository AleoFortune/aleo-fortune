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
import { EventType, requestCreateEvent, useAccount } from "@puzzlehq/sdk";

type Props = {};

const AddCreditDialog = (props: Props) => {
  const { account } = useAccount();
  const creditInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const depositCredit = async () => {
    if (!account) {
      alert("no account");
      return;
    }
    const fields = { receiver: account?.address, amount: "100u64" };

    const createEventResponse = await requestCreateEvent({
      type: EventType.Execute,
      programId: "cassino_game_test_fp.aleo",
      functionId: "deposit_public",
      fee: 1.5,
      inputs: Object.values(fields),
    });
    if (createEventResponse.error) {
      alert(JSON.stringify(createEventResponse));
    } else {
      alert(JSON.stringify(createEventResponse));
      console.log(createEventResponse);
    }
  };

  const handleDeposit = () => {
    if (creditInputRef.current?.value === "" || 0) return;

    if (parseInt(creditInputRef.current!.value) > 50) {
      alert("Max 50 credits");
    }

    console.log(creditInputRef.current?.value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add More Credits</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the credit amount</DialogTitle>
          <DialogDescription>
            <div className="flex gap-6 w-full mt-2">
              <div className="w-full">
                <Input ref={creditInputRef} type="number" />

                <p className="text-xs font-bold mt-2">Max: 50 credits</p>
              </div>
              <Button onClick={() => handleDeposit()}>Deposit</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditDialog;
