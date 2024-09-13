import "flowbite";
import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Flowbite, Card, Button, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import { HiInformationCircle } from "react-icons/hi";
import tailwindFlowbiteTheme from "~/tailwindFlowbiteTheme";
import AspectRatioSelector from "~/components/AspectRatioSelector";
import WallpaperCarousel from "~/components/WallpaperCarousel";
import CardNumberInput from "~/components/CardNumberInput";
import { ActionResult } from "~/types/types";
import BarcodeDownload from "~/components/BarcodeDownload";

export const meta: MetaFunction = () => {
  return [
    { title: "TPL Barcode Generator" },
    {
      name: "description",
      content:
        "Generate a wallpaper for your phone that doubles as your digital TPL library card.",
    },
  ];
};

export const links: LinksFunction = () => {
  const links = [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Jersey+20&display=swap",
    },
  ];

  return links;
};

const customTheme = tailwindFlowbiteTheme;

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();

  console.log(formData);

  let cardNumber = String(formData.get("cardNumber") || "");
  let aspectRatio = String(formData.get("aspectRatio") || "AR");
  let design = String(formData.get("design") || "0");

  let formDataResponse: {
    cardNumber: string;
    aspectRatio: string;
    design: string;
  } = {
    cardNumber: String(cardNumber),
    aspectRatio: String(aspectRatio),
    design: String(design),
  };
  let errors: { cardNumber?: string } = {};

  switch (true) {
    case !cardNumber:
      errors.cardNumber = "Card number is required.";
      return { errors };
    case cardNumber.length !== 14:
      errors.cardNumber = "Card number must be exactly 14 digits.";
      return { errors };
    case /\D/.test(cardNumber):
      errors.cardNumber = "Card number must contain only digits.";
      return { errors };
    default:
      break;
  }

  return {
    cardNumber: String(cardNumber),
    aspectRatio: String(aspectRatio),
    design: String(design),
  };
}

export default function Index() {
  const actionResult = useActionData<ActionResult>();
  const [cardNumberError, setCardNumberError] = useState(false);

  useEffect(() => {
    if (actionResult) {
      if (actionResult.errors?.cardNumber) {
        setCardNumberError(true);
      }
    }
  }, [actionResult]);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="container mx-auto max-w-md p-5 overflow-hidden">
        <h1 className="max-w-md">
          <span>TPL</span>
          <span>BARCODE</span>
          <span>GENERATOR</span>
        </h1>
        {!(actionResult && !actionResult.errors) ? (
          <Form method="post">
            <Card className="max-w-md mb-8">
              <CardNumberInput
                actionResult={actionResult}
                cardNumberError={cardNumberError}
                setCardNumberError={setCardNumberError}
              />

              {/* <AspectRatioSelector /> */}

              <div className="block">
                <span className="text-md font-medium text-gray-900">
                  Select wallpaper design
                </span>
              </div>

              <WallpaperCarousel />

              <Button className="-translate-y-6" color="blue" type="submit">
                Generate Barcode
              </Button>

              {actionResult && actionResult.errors && cardNumberError ? (
                <Alert
                  className="-translate-y-6"
                  color="failure"
                  icon={HiInformationCircle}
                >
                  Oops! Check your library card number.
                </Alert>
              ) : null}
            </Card>
          </Form>
        ) : (
          <Card className="max-w-md mb-8">
            <BarcodeDownload
              cardNumber={actionResult.cardNumber}
              design={actionResult.design}
            />
          </Card>
        )}
      </div>
    </Flowbite>
  );
}
