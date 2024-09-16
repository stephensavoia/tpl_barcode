import JsBarcode from "jsbarcode";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

interface createWallpaperProps {
  barcodeRef: HTMLCanvasElement;
  wallpaperRef: HTMLCanvasElement;
  cardNumber: string;
  design: string;
  res: string;
}

export default function createWallpaper({
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
      rColor1: "#a4c6ed",
      rColor2: "#dbede2",
      rColor3: "#c2c5eb",
      rColor4: "#f2f2f2",
    },
    {
      bgColor: "#f0d6de",
      fgColor: "#1b0911",
      rColor1: "#eda4a4",
      rColor2: "#ebcbd2",
      rColor3: "#ebc2dd",
      rColor4: "#f2f2f2",
    },
    {
      bgColor: "#ececec",
      fgColor: "#222222",
      rColor1: "#bbbbbb",
      rColor2: "#e9e9e9",
      rColor3: "#b4b4b4",
      rColor4: "#c7c7c7",
    },
  ];

  const dimensions: { [key: string]: { [key: string]: number } } = {
    low: {
      wWidth: 222,
      wHeight: 472,
      bWidth: 1,
      bHeight: 50,
      fSize: 16,
      margin: 10,
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

    // Create a cool striped background
    const stripeWidth = 20; // Width of each stripe
    for (let i = 0; i < wallpaperRef.width; i += stripeWidth * 2) {
      // Draw alternating stripes
      wallpaperCtx.fillStyle = colors[parseInt(design)].rColor1;
      wallpaperCtx.fillRect(i, 0, stripeWidth, wallpaperRef.height);

      wallpaperCtx.fillStyle = colors[parseInt(design)].rColor2;
      wallpaperCtx.fillRect(
        i + stripeWidth,
        0,
        stripeWidth,
        wallpaperRef.height
      );
    }

    const x = (wallpaperRef.width - barcodeRef.width) / 2;
    const y = (wallpaperRef.height - barcodeRef.height) / 2;
    wallpaperCtx.drawImage(barcodeRef, x, y);
  }
}
