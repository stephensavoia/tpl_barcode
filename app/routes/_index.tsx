import "flowbite";
import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import type { CustomFlowbiteTheme } from "flowbite-react";
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

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "text-white bg-[#2a3c4e] hover:bg-[#2e455c]",
    },
  },
  carousel: {
    root: {
      base: "relative h-full w-full",
      leftControl:
        "absolute left-0 top-0 flex h-full items-center justify-center focus:outline-none",
      rightControl:
        "absolute right-0 top-0 flex h-full items-center justify-center focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-gray-200 border border-gray-300 hover:bg-gray-50",
        on: "bg-blue-700 dark:bg-gray-800",
      },
      base: "h-3 w-3 rounded-full",
      wrapper:
        "absolute translate-y-4 left-1/2 flex -translate-x-1/2 space-x-5",
    },
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 border border-gray-300 group-hover:bg-gray-200 group-focus:outline-none group-focus:ring-2 group-focus:ring-cyan-500 sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-[#6B7280] sm:h-6 sm:w-6",
    },
  },
};

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();

  console.log(formData);

  let cardNumber = String(formData.get("cardNumber") || "");
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

  return String(cardNumber) + " " + String(design);

  //   let errors = await validate(email, password);
  //   if (errors) {
  //     return json({ ok: false, errors }, 400);
  //   }
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

  useEffect(() => {
    if (actionResult && actionResult.errors?.cardNumber) {
      setCardNumberError(true);
    }
  }, [actionResult]);

  const handleCardNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cardNumber = event.target.value;
      console.log(cardNumber);
      console.log(cardNumber.length !== 14);
      console.log(/\D/.test(cardNumber));
      if (cardNumber.length == 14 && /^\d+$/.test(cardNumber)) {
        setCardNumberError(false);
        console.log("Card number is valid");
      }
    },
    []
  );

  const handleCarouselChange = useCallback((index: number) => {
    if (radioRefs.current[index]) {
      radioRefs.current[index].checked = true;
    }
  }, []);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="container mx-auto max-w-md p-5 overflow-hidden">
        <h1 className="max-w-md">TPL Barcode Generator</h1>
        {actionResult && !actionResult.errors ? (
          <Card className="max-w-md mb-8">
            {" "}
            <p className="text-center">
              This app isn't quite finished yet. <br /> Please come back soon!
              <br />
              <br />
              {String(actionResult)}
            </p>
            <Button className="mt-8" color="blue" type="submit">
              Download Wallpaper
            </Button>
            <Link
              to="/"
              className="text-sm font-medium text-center text-blue-600 underline dark:text-blue-500 hover:no-underline"
            >
              Generate Another Barcode
            </Link>
          </Card>
        ) : (
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
                  />
                </div>
              </div>

              {/* <AspectRatioSelector /> */}

              <div className="block">
                <span className="text-sm font-medium text-gray-900">
                  Select wallpaper design
                </span>
              </div>

              <div className="h-[500px]">
                <Carousel
                  slide={false}
                  onSlideChange={(index) => handleCarouselChange(index)}
                >
                  <div className="flex h-full items-center justify-center">
                    <label id="designRadio1" className="radio-img">
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
                    <label className="radio-img">
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
                    <label className="radio-img">
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
              <Button className="mt-8" color="blue" type="submit">
                Generate Barcode
              </Button>
              {actionResult && actionResult.errors && cardNumberError ? (
                <Alert color="failure" icon={HiInformationCircle}>
                  Oops! Check your library card number.
                </Alert>
              ) : null}
            </Card>
          </Form>
        )}
      </div>
    </Flowbite>
  );
}
