import { Carousel } from "flowbite-react";

interface WallpaperCarouselProps {
  handleCarouselChange: (index: number) => void;
  handleTouchStart: (event: React.TouchEvent) => void;
  handleTouchEnd: (event: React.TouchEvent) => void;
  radioRefs: React.MutableRefObject<HTMLInputElement[]>;
}

const WallpaperCarousel: React.FC<WallpaperCarouselProps> = ({
  handleCarouselChange,
  handleTouchStart,
  handleTouchEnd,
  radioRefs,
}) => {
  return (
    <div className="h-[574px]">
      <Carousel
        slide={false}
        onSlideChange={(index) => handleCarouselChange(index)}
      >
        {[0, 1, 2].map((value) => (
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
                  <img
                    src={`http://loremflickr.com/222/472/${
                      ["rome", "london", "paris"][value]
                    }`}
                    className="w-[222px] h-[472px]"
                    alt=""
                  />
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
