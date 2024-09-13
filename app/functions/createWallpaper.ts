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

  JsBarcode(barcodeRef, cardNumber, {
    format: "codabar",
    height: 50,
    width: 1,
    fontSize: 16,
    background: colors[parseInt(design)].bgColor,
    lineColor: colors[parseInt(design)].fgColor,
  });

  const lowResWallpaperCtx = wallpaperRef.getContext("2d");

  if (lowResWallpaperCtx) {
    wallpaperRef.width = 222;
    wallpaperRef.height = 472;
    lowResWallpaperCtx.fillStyle = "#a4c6ed";
    lowResWallpaperCtx.fillRect(0, 0, wallpaperRef.width, wallpaperRef.height);

    const gradient = lowResWallpaperCtx.createRadialGradient(
      wallpaperRef.width * 0.27,
      wallpaperRef.height * 0.27,
      0, // Inner circle (x, y, radius)
      wallpaperRef.width * 0.25,
      wallpaperRef.height * 0.22,
      Math.max(wallpaperRef.width, wallpaperRef.height) // Outer circle (x, y, radius)
    );
    gradient.addColorStop(0, colors[parseInt(design)].rColor1);
    gradient.addColorStop(0.33, colors[parseInt(design)].rColor2);
    gradient.addColorStop(0.66, colors[parseInt(design)].rColor3);
    gradient.addColorStop(1, colors[parseInt(design)].rColor4);
    lowResWallpaperCtx.fillStyle = gradient;

    lowResWallpaperCtx.fillRect(0, 0, wallpaperRef.width, wallpaperRef.height);

    const x = (wallpaperRef.width - barcodeRef.width) / 2;
    const y = (wallpaperRef.height - barcodeRef.height) / 2;
    lowResWallpaperCtx.drawImage(barcodeRef, x, y);
  }
}
