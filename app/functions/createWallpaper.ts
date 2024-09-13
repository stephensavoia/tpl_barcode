import JsBarcode from "jsbarcode";

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
  JsBarcode(barcodeRef, cardNumber, {
    format: "codabar",
    height: 50,
    width: 1,
  });

  const lowResWallpaperCtx = wallpaperRef.getContext("2d");

  if (lowResWallpaperCtx) {
    wallpaperRef.width = 222;
    wallpaperRef.height = 472;
    lowResWallpaperCtx.fillStyle = "blue";
    lowResWallpaperCtx.fillRect(0, 0, wallpaperRef.width, wallpaperRef.height);

    // Create a radial gradient
    const gradient = lowResWallpaperCtx.createRadialGradient(
      25,
      25,
      10, // Inner circle (x, y, radius)
      25,
      25,
      50 // Outer circle (x, y, radius)
    );
    gradient.addColorStop(0, "#a4c6ed");
    gradient.addColorStop(0.33, "#dbede2");
    gradient.addColorStop(0.66, "#c2c5eb");
    gradient.addColorStop(1, "#f2f2f2");

    lowResWallpaperCtx.fillStyle = gradient;
    lowResWallpaperCtx.fillRect(0, 0, wallpaperRef.width, wallpaperRef.height);

    lowResWallpaperCtx.drawImage(barcodeRef, 0, 200);
  }
}
