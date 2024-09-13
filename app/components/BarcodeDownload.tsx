import { Link } from "@remix-run/react";
import { Button } from "flowbite-react"; // Adjust the import path as necessary
import { useEffect, useRef } from "react";
import createWallpaper from "~/functions/createWallpaper";

interface BarcodeDownloadProps {
  cardNumber: string | undefined;
  design: string | undefined;
}

const BarcodeDownload: React.FC<BarcodeDownloadProps> = ({
  cardNumber,
  design,
}) => {
  const lowResBarcodeRef = useRef<HTMLCanvasElement | null>(null);
  const lowResWallpaperRef = useRef<HTMLCanvasElement | null>(null); // Actually in the DOM
  const highResBarcodeRef = useRef<HTMLCanvasElement | null>(null);
  const highResWallpaperRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const lowResBarcodeCanvas = document.createElement("canvas");
    lowResBarcodeRef.current = lowResBarcodeCanvas;
    if (lowResBarcodeRef.current && lowResWallpaperRef.current && cardNumber) {
      createWallpaper({
        barcodeRef: lowResBarcodeRef.current,
        wallpaperRef: lowResWallpaperRef.current,
        cardNumber,
        design: "0",
        res: "low",
      });
    }
  }, []);

  const handleDownload = () => {
    const highResBarcodeCanvas = document.createElement("canvas");
    highResBarcodeRef.current = highResBarcodeCanvas;
    const highResWallpaperCanvas = document.createElement("canvas");
    highResWallpaperRef.current = highResWallpaperCanvas;
    console.log(highResBarcodeRef.current);

    if (
      highResBarcodeRef.current &&
      highResWallpaperRef.current &&
      cardNumber
    ) {
      createWallpaper({
        barcodeRef: highResBarcodeRef.current,
        wallpaperRef: highResWallpaperRef.current,
        cardNumber,
        design: "0",
        res: "high",
      });
    }

    const canvas = highResWallpaperRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "tpl-barcode.png";
      link.click();
    }
  };

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="relative mx-auto my-1 border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 -translate-y-0.5 absolute"></div>
        <div className="rounded-[2rem] overflow-hidden w-[222px] h-[472px] dark:bg-gray-800">
          <canvas
            className="mx-auto cursor-pointer"
            ref={lowResWallpaperRef}
            onClick={handleDownload}
          ></canvas>
        </div>
      </div>
      <Button color="blue" type="button" onClick={handleDownload}>
        Download Wallpaper
      </Button>
      <div className="text-center mb-4">
        <Link
          to="/"
          className="text-md text-[#304a92] underline hover:no-underline"
        >
          Generate Another Barcode
        </Link>
      </div>
    </div>
  );
};

export default BarcodeDownload;
