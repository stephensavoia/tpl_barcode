import "flowbite";
import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import type { CarouselProps, CustomFlowbiteTheme } from "flowbite-react";
import {
  Flowbite,
  Card,
  Button,
  TextInput,
  Label,
  Select,
  Carousel,
} from "flowbite-react";
import { useEffect, useRef } from "react";

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

export default function Index() {
  const cardNumberRef = useRef<HTMLInputElement>(null);
  // const aspectRatioRef = useRef<HTMLSelectElement>(null);
  const radioRefs = useRef<HTMLInputElement[]>([]);

  const handleCarouselChange = (index: number) => {
    if (radioRefs.current[index]) {
      radioRefs.current[index].checked = true;
    }
  };

  const handleFormSubmit = () => {
    let cardNumber = cardNumberRef.current?.value;
    // let aspectRatio = aspectRatioRef.current?.value;
    let selectedRadio = radioRefs.current.find((radio) => radio.checked);
    alert(
      "This app isn't quite finished yet.\nPlease come back soon!" +
        "\n\nCard Number: " +
        String(cardNumber) +
        // "\nPhone Size: " +
        // String(aspectRatio) +
        "\nWallpaper: " +
        selectedRadio?.value
    );
    radioRefs.current[0].click();
    // relaod page
    location.reload();
  };

  useEffect(() => {
    if (radioRefs.current[0]) {
      console.log(radioRefs.current[0].value);
    }
  }, []);
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="container mx-auto max-w-md p-5 overflow-hidden">
        <h1 className="max-w-md">TPL Barcode Generator</h1>
        <Card className="max-w-md mb-8">
          <div className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="cardNumber"
                  // color="failure"
                  value="Library card number (14 digits)"
                />
              </div>
              <TextInput
                ref={cardNumberRef}
                id="cardNumber"
                required
                // color="failure"
                // helperText={
                //   <>
                //     <span className="text-md">Oops!</span> Username already
                //     taken!
                //   </>
                // }
              />
            </div>
          </div>

          {/* <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="aspectRatio" value="Phone display aspect ratio" />
            </div>
            <Select ref={aspectRatioRef} id="aspectRatio" required>
              <option value="0">9:19.5 (iPhone 11 and newer)</option>
              <option value="1">9:16 (iPhone SE to 8+)</option>
              <option value="2">3:4 (iPhone 4s and older)</option>
            </Select>
          </div> */}

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
                    ref={(el) => (radioRefs.current[0] = el!)}
                    type="radio"
                    name="design"
                    value="0"
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
                    ref={(el) => (radioRefs.current[1] = el!)}
                    type="radio"
                    name="design"
                    value="1"
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
                    ref={(el) => (radioRefs.current[2] = el!)}
                    type="radio"
                    name="design"
                    value="2"
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
          <Button className="mt-8" color="blue" onClick={handleFormSubmit}>
            Generate Barcode
          </Button>
        </Card>
      </div>
    </Flowbite>
  );
}
