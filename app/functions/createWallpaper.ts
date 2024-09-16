import JsBarcode from "jsbarcode";

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
  barcodeRef: HTMLCanvasElement
): Promise<void> => {
  return new Promise((resolve, reject) => {
    img.onload = () => {
      wallpaperCtx.drawImage(img, 0, 0);
      const x = (wallpaperRef.width - barcodeRef.width) / 2;
      const y = (wallpaperRef.height - barcodeRef.height) / 2;
      wallpaperCtx.drawImage(barcodeRef, x, y);
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
      bgColor: "#fff3ef",
      fgColor: "#251d36",
    },
    {
      bgColor: "#daeaf6",
      fgColor: "#091226",
    },
    {
      bgColor: "#e9d2dc",
      fgColor: "#262e30",
    },
    {
      bgColor: "#edeae4",
      fgColor: "#211e17",
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

    const img = new Image();
    img.src =
      res === "low"
        ? `/img/wallpaper-${design}-low-res.png`
        : `/img/wallpaper-${design}.png`;

    try {
      await loadImageAndDraw(img, wallpaperCtx, wallpaperRef, barcodeRef);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }
}
