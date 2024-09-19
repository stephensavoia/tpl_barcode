import "flowbite";
import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Flowbite, Card, Button, Alert, Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { HiInformationCircle } from "react-icons/hi";
import {
  tailwindFlowbiteTheme,
  infoButtonTheme,
} from "~/tailwindFlowbiteTheme";
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
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (actionResult) {
      if (actionResult.errors?.cardNumber) {
        setCardNumberError(true);
      }
    }
  }, [actionResult]);

  const isSubmitting = navigation.state !== "idle";

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

              <Button
                className="-translate-y-6"
                color="blue"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner color="gray" aria-label="Generating barcode..." />
                ) : (
                  "Generate Barcode"
                )}
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
      <Button
        theme={infoButtonTheme}
        color="light"
        size="xs"
        className="absolute top-4 right-4"
        onClick={() => setOpenModal(true)}
        pill
      >
        <svg
          className="w-12 h-12 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#1f387a"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </Button>
      <Modal
        dismissible
        show={openModal}
        size="sm"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>FAQ</Modal.Header>
        <Modal.Body>
          <div className="space-y-5">
            <h4 className="text-lg font-medium text-gray-900">
              What is TPL Barcode Generator?
            </h4>
            <p className="text-base leading-relaxed text-gray-500">
              TPL Barcode Generator is a tool that generates phone wallpapers
              that double as digital Toronto Public Library cards.
            </p>
            <p className="text-base leading-relaxed text-gray-500">
              A digital version of your library card can be useful if you want
              to lighten your wallet or avoid forgetting your physical card.
            </p>
            <h4 className="text-lg font-medium text-gray-900">
              How do I use TPL Barcode Generator?
            </h4>
            <ol className="list-decimal">
              <li className="ml-4 text-base leading-relaxed text-gray-500">
                Enter your 14-digit library card number.
              </li>
              <li className="ml-4 text-base leading-relaxed text-gray-500">
                Select a wallpaper design.
              </li>
              <li className="ml-4 text-base leading-relaxed text-gray-500">
                Tap "Generate Barcode".
              </li>
              <li className="ml-4 text-base leading-relaxed text-gray-500">
                Tap "Download Wallpaper".
              </li>
              <li className="ml-4 text-base leading-relaxed text-gray-500">
                Set the downloaded wallpaper as your phone's lock screen,
                cropping the image as needed. (You may need to locate the
                wallpaper under "Files" or "Downloads" and then save it to
                "Photos" first.)
              </li>
              <li className="ml-4 text-base leading-relaxed text-gray-500">
                Use your new wallpaper with a barcode scanner at any Toronto
                Public Library location.
              </li>
            </ol>
            <h4 className="text-lg font-medium text-gray-900">
              Is this tool officially associated with the Toronto Public
              Library?
            </h4>
            <p className="text-base leading-relaxed text-gray-500">
              No. I have been using a barcode wallpaper image to check out
              library books for years, and developed this tool to share what I
              think is better checkout experience with other library users.
            </p>
            <p className="text-base leading-relaxed text-gray-500">
              You can view this project's GitHub repository{" "}
              <Link
                to="https://github.com/stephensavoia/tpl_barcode"
                className="underline hover:no-underline"
              >
                here
              </Link>
              .
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Button color="light" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Flowbite>
  );
}
