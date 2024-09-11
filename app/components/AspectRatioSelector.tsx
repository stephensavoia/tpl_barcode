import { Label, Select } from "flowbite-react"; // Adjust the import path as necessary

const AspectRatioSelector = () => (
  <div className="max-w-md">
    <div className="mb-2 block">
      <Label htmlFor="aspectRatio" value="Phone display aspect ratio" />
    </div>
    <Select id="aspectRatio" name="aspectRatio" required>
      <option value="0">9:19.5 (iPhone 11 and newer)</option>
      <option value="1">9:16 (iPhone SE to 8+)</option>
      <option value="2">3:4 (iPhone 4s and older)</option>
    </Select>
  </div>
);

export default AspectRatioSelector;
