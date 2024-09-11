import "flowbite";
import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Flowbite,
  Card,
  Button,
  TextInput,
  Label,
  Carousel,
  Alert,
} from "flowbite-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Form, Link, useActionData } from "@remix-run/react";
import { HiInformationCircle } from "react-icons/hi";
import tailwindFlowbiteTheme from "~/tailwindFlowbiteTheme";
import AspectRatioSelector from "~/components/AspectRatioSelector";

export const meta: MetaFunction = () => {
  return [
    { title: "TPL Barcode Phone Wallpaper Generator" },
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

  return String(cardNumber) + " " + String(aspectRatio) + " " + String(design);
}

// Had to add this because typescript is too stupid to understand what a "?" means
type ActionResult = {
  errors?: {
    cardNumber?: string;
  };
};

export default function Index() {
  const actionResult = useActionData<ActionResult>();
  const [design, setDesign] = useState(0);
  const [cardNumberError, setCardNumberError] = useState(false);
  const radioRefs = useRef<HTMLInputElement[]>([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    if (actionResult && actionResult.errors?.cardNumber) {
      setCardNumberError(true);
    }
  }, [actionResult]);

  const handleCardNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cardNumber = event.target.value;
      if (cardNumber.length == 14 && /^\d+$/.test(cardNumber)) {
        setCardNumberError(false);
      }
    },
    []
  );

  const handleCarouselChange = useCallback((index: number) => {
    if (radioRefs.current[index]) {
      radioRefs.current[index].checked = true;
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const eventEndX = e.changedTouches[0].clientX;
    setTouchEndX(eventEndX);

    if (touchStartX - eventEndX < -50) {
      const leftControl = document.querySelector(
        '[data-testid="carousel-left-control"]'
      );
      leftControl?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    } else if (touchStartX - eventEndX > 50) {
      const rightControl = document.querySelector(
        '[data-testid="carousel-right-control"]'
      );
      rightControl?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="container mx-auto max-w-md p-5 overflow-hidden">
        <h1 className="max-w-md">TPL Barcode Generator</h1>
        {!(actionResult && !actionResult.errors) ? (
          <Form method="post">
            <Card className="max-w-md mb-8">
              <div className="flex max-w-md flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="cardNumber"
                      color={
                        actionResult &&
                        actionResult.errors?.cardNumber &&
                        cardNumberError
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
                      actionResult &&
                      actionResult.errors?.cardNumber &&
                      cardNumberError
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
                      actionResult &&
                      actionResult.errors?.cardNumber &&
                      cardNumberError
                        ? handleCardNumberChange
                        : undefined
                    }
                    sizing="md"
                  />
                </div>
              </div>

              <AspectRatioSelector />

              <div className="block">
                <span className="text-md font-medium text-gray-900">
                  Select wallpaper design
                </span>
              </div>

              <div className="h-[574px]">
                <Carousel
                  slide={false}
                  onSlideChange={(index) => handleCarouselChange(index)}
                >
                  <div className="flex h-full items-center justify-center">
                    <label
                      className="radio-img"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <input
                        type="radio"
                        name="design"
                        value="0"
                        ref={(el) => (radioRefs.current[0] = el!)}
                      />
                      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] shadow-xl">
                        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 -translate-y-0.5 absolute"></div>
                        <div className="rounded-[2rem] overflow-hidden w-[222px] h-[472px] dark:bg-gray-800">
                          <img
                            src="http://loremflickr.com/222/472/rome"
                            className="w-[222px] h-[472px]"
                            alt=""
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <label
                      className="radio-img"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <input
                        type="radio"
                        name="design"
                        value="1"
                        ref={(el) => (radioRefs.current[1] = el!)}
                      />
                      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] shadow-xl">
                        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 -translate-y-0.5 absolute"></div>
                        <div className="rounded-[2rem] overflow-hidden w-[222px] h-[472px] dark:bg-gray-800">
                          <img
                            src="http://loremflickr.com/222/472/london"
                            className="w-[222px] h-[472px]"
                            alt=""
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <label
                      className="radio-img"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <input
                        type="radio"
                        name="design"
                        value="2"
                        ref={(el) => (radioRefs.current[2] = el!)}
                      />
                      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] shadow-xl">
                        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 -translate-y-0.5 absolute"></div>
                        <div className="rounded-[2rem] overflow-hidden w-[222px] h-[472px] dark:bg-gray-800">
                          <img
                            src="http://loremflickr.com/222/472/paris"
                            className="w-[222px] h-[472px]"
                            alt=""
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </Carousel>
              </div>
              <Button className="-translate-y-5" color="blue" type="submit">
                Generate Barcode
              </Button>
              {actionResult && actionResult.errors && cardNumberError ? (
                <Alert color="failure" icon={HiInformationCircle}>
                  Oops! Check your library card number.
                </Alert>
              ) : null}
            </Card>
          </Form>
        ) : (
          <Card className="max-w-md mb-8">
            <div className="flex max-w-md flex-col gap-4">
              {" "}
              <p className="text-center text-md">
                This app isn't quite finished yet. <br /> Please come back soon!
                <br />
                <br />
                {String(actionResult)}
              </p>
              <Button color="blue" type="submit">
                Download Wallpaper
              </Button>
              <Link
                to="/"
                className="text-md text-center pb-4 text-blue-600 underline dark:text-blue-500 hover:no-underline"
              >
                Generate Another Barcode
              </Link>
            </div>
          </Card>
        )}
      </div>
    </Flowbite>
  );
}
