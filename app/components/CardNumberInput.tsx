import { Label, TextInput } from "flowbite-react"; // Adjust the import path as necessary
import { useCallback } from "react";
import { ActionResult } from "~/types/types";

interface CardNumberInputProps {
  actionResult: ActionResult | undefined;
  cardNumberError: boolean;
  setCardNumberError: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardNumberInput: React.FC<CardNumberInputProps> = ({
  actionResult,
  cardNumberError,
  setCardNumberError,
}) => {
  const handleCardNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cardNumber = event.target.value;
      if (cardNumber.length == 14 && /^\d+$/.test(cardNumber)) {
        setCardNumberError(false);
      } else {
        setCardNumberError(true);
      }
    },
    []
  );

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="cardNumber"
            color={
              actionResult && actionResult.errors?.cardNumber && cardNumberError
                ? "failure"
                : undefined
            }
            value="Library card number (14 digits)"
          />
        </div>
        <TextInput
          id="cardNumber"
          name="cardNumber"
          required
          color={
            actionResult && actionResult.errors?.cardNumber && cardNumberError
              ? "failure"
              : undefined
          }
          helperText={
            actionResult &&
            actionResult.errors?.cardNumber &&
            cardNumberError ? (
              <>{actionResult.errors.cardNumber}</>
            ) : undefined
          }
          onChange={
            actionResult && actionResult.errors?.cardNumber
              ? handleCardNumberChange
              : undefined
          }
          sizing="md"
        />
      </div>
    </div>
  );
};

export default CardNumberInput;
