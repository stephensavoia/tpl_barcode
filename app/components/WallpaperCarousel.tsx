import { Carousel } from "flowbite-react";
import { useCallback, useEffect, useRef, useState } from "react";
import createWallpaper from "~/functions/createWallpaper";

const WallpaperCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const radioRefs = useRef<HTMLInputElement[]>([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

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

  useEffect(() => {
    radioRefs.current.forEach((radio, index) => {
      if (radio) {
        const radioCanvas = radio.closest("label")?.querySelector("canvas");
        console.log(radioCanvas);
        if (radioCanvas) {
          const radioBarcodeCanvas = document.createElement("canvas");
          if (radioBarcodeCanvas) {
            createWallpaper({
              barcodeRef: radioBarcodeCanvas,
              wallpaperRef: radioCanvas,
              cardNumber: "00000000000000",
              design: index.toString(),
              res: "low",
            });
          }
        }
      }
    });
  }, []);

  // Make sure Carousel buttons do not submit the form
  useEffect(() => {
    const buttons = carouselRef.current?.querySelectorAll("button");
    buttons?.forEach((button) => {
      button.setAttribute("type", "button");
    });
  }, [carouselRef]);

  return (
    <div ref={carouselRef} className="h-[574px]">
      <Carousel
        slide={false}
        onSlideChange={(index) => handleCarouselChange(index)}
      >
        {[0, 1, 2, 3, 4].map((value) => (
          <div key={value} className="flex h-full items-center justify-center">
            <label
              className="radio-img"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <input
                type="radio"
                name="design"
                value={value}
                ref={(el) => (radioRefs.current[value] = el!)}
              />
              <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] shadow-xl">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 -translate-y-0.5 absolute"></div>
                <div className="rounded-[2rem] overflow-hidden w-[222px] h-[472px] dark:bg-gray-800">
                  <canvas></canvas>
                </div>
              </div>
            </label>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default WallpaperCarousel;
