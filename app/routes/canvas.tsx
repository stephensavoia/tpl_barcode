import { Card, Flowbite } from "flowbite-react";
import BarcodeDownload from "~/components/BarcodeDownload";
import tailwindFlowbiteTheme from "~/tailwindFlowbiteTheme";

const customTheme = tailwindFlowbiteTheme;

export default function Canvas() {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div
        className="container mx-auto max-w-md p-5 overflow-hidden
      "
      >
        <h1 className="max-w-md">
          <span>TPL</span>
          <span>BARCODE</span>
          <span>GENERATOR</span>
        </h1>
        <Card className="max-w-md mb-8">
          <BarcodeDownload cardNumber="11111111111111" design="0" />
        </Card>
      </div>
    </Flowbite>
  );
}
