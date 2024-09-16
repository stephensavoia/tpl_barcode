import JsBarcode from "jsbarcode";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

interface createWallpaperProps {
  barcodeRef: HTMLCanvasElement;
  wallpaperRef: HTMLCanvasElement;
  cardNumber: string;
  design: string;
  res: string;
}

const loadImageAndDraw = (
  img: HTMLImageElement,
  wallpaperCtx: CanvasRenderingContext2D,
  wallpaperRef: HTMLCanvasElement,
  barcodeRef: HTMLCanvasElement,
  res: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    img.onload = () => {
      wallpaperCtx.drawImage(img, 0, 0);
      const bcw =
        res === "low" ? Math.floor(barcodeRef.width / 5.81) : barcodeRef.width;
      const bch =
        res === "low"
          ? Math.floor(barcodeRef.height / 5.81)
          : barcodeRef.height;
      const x = (wallpaperRef.width - bcw) / 2;
      const y = (wallpaperRef.height - bch) / 2;
      wallpaperCtx.drawImage(barcodeRef, x, y, bcw, bch);
      resolve();
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};

export default async function createWallpaper({
  barcodeRef,
  wallpaperRef,
  cardNumber,
  design,
  res,
}: createWallpaperProps) {
  const colors = [
    {
      bgColor: "#dae5f1",
      fgColor: "#0a1521",
    },
    {
      bgColor: "#e7d5f2",
      fgColor: "#2b2b4d",
    },
    {
      bgColor: "#f3ecf2",
      fgColor: "#162c35",
    },
    {
      bgColor: "#ecf7e0",
      fgColor: "#0f221b",
    },
    {
      bgColor: "#e4e9f2",
      fgColor: "#141f31",
    },
  ];

  const dimensions: { [key: string]: { [key: string]: number } } = {
    low: {
      wWidth: 222,
      wHeight: 472,
      bWidth: 5,
      bHeight: 250,
      fSize: 80,
      margin: 40,
    },
    high: {
      wWidth: 1290,
      wHeight: 2796,
      bWidth: 5,
      bHeight: 250,
      fSize: 80,
      margin: 40,
    },
  };

  JsBarcode(barcodeRef, cardNumber, {
    format: "codabar",
    height: dimensions[res].bHeight,
    width: dimensions[res].bWidth,
    fontSize: dimensions[res].fSize,
    margin: dimensions[res].margin,
    background: colors[parseInt(design)].bgColor,
    lineColor: colors[parseInt(design)].fgColor,
  });

  const wallpaperCtx = wallpaperRef.getContext("2d");

  if (wallpaperCtx) {
    wallpaperRef.width = dimensions[res].wWidth;
    wallpaperRef.height = dimensions[res].wHeight;

    const img = new Image();
    img.src =
      res === "low"
        ? `/img/wallpaper-${design}-low-res.png`
        : `/img/wallpaper-${design}.png`;

    try {
      await loadImageAndDraw(img, wallpaperCtx, wallpaperRef, barcodeRef, res);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }
}
