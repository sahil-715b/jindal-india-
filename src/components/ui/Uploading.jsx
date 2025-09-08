import { useRef, useState } from "react";
import { Upload, Cloud, HardDrive, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Uploading() {
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);

  // === LOCAL UPLOAD ===
  const handleLocalClick = () => {
    fileInputRef.current.click();
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected local file:", file);
      alert(`You selected: ${file.name}`);
      // TODO: send to backend/local storage
    }
  };

  // === GOOGLE DRIVE UPLOAD (placeholder) ===
  const handleDriveClick = () => {
    setOpen(false);
    alert("🚀 Google Drive upload coming soon!");
    // TODO: integrate Google Picker API
  };

  // === OTHER CLOUD (Dropbox/OneDrive/etc.) ===
  const handleCloudClick = () => {
    setOpen(false);
    alert("🌐 Cloud upload coming soon!");
    // TODO: integrate other storage APIs
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Menu */}
      <div className="relative inline-flex flex-col items-start gap-2">
        <AnimatePresence>
          {open && (
            <div className="absolute -top-2 left-0 flex flex-col items-start gap-2 mb-2">
              {/* Local Upload */}
              <motion.button
                key="local"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={handleLocalClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-800 shadow-md hover:bg-gray-100"
              >
                <HardDrive className="w-4 h-4" />
                Local
              </motion.button>

            </div>
          )}
        </AnimatePresence>

        {/* Upload Invoice Button (replaces QR) */}
        <Button
          onClick={() => setOpen((prev) => !prev)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Upload Invoice
        </Button>
      </div>
    </>
  );
}
