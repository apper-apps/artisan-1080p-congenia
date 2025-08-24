import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { downloadImage, QUALITY_PRESETS, SUPPORTED_FORMATS } from "@/utils/downloadImage";

const DownloadDropdown = ({ image, onDownload, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('jpg');
  const [selectedQuality, setSelectedQuality] = useState('high');

  const handleDownload = async (format, quality) => {
    if (!image) return;
    
    const qualityValue = QUALITY_PRESETS[quality]?.value || 0.9;
    const filename = image.prompt ? 
      `artisan-ai-${image.prompt.substring(0, 30)}` : 
      `artisan-ai-${image.id || Date.now()}`;
    
    await downloadImage(image.imageUrl, filename, format, qualityValue);
    setIsOpen(false);
    
    // Call original onDownload if provided for backward compatibility
    if (onDownload) {
      onDownload();
    }
  };

  const handleQuickDownload = () => {
    handleDownload(selectedFormat, selectedQuality);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleQuickDownload}
          className="backdrop-blur-sm rounded-r-none border-r-0"
        >
          <ApperIcon name="Download" size={16} />
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="backdrop-blur-sm rounded-l-none px-2"
        >
          <ApperIcon name="ChevronDown" size={14} />
        </Button>
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-white/10 rounded-lg shadow-xl z-50 backdrop-blur-sm">
            <div className="p-4">
              <h3 className="text-sm font-medium text-white mb-3">Download Options</h3>
              
              {/* Format Selection */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 mb-2 block">Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {SUPPORTED_FORMATS.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setSelectedFormat(format.value)}
                      className={cn(
                        "p-2 text-xs rounded border transition-colors",
                        selectedFormat === format.value
                          ? "bg-primary-500/20 border-primary-500/50 text-primary-400"
                          : "bg-surface/50 border-white/10 text-gray-300 hover:border-white/20"
                      )}
                    >
                      {format.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selection (not for PNG) */}
              {selectedFormat !== 'png' && (
                <div className="mb-4">
                  <label className="text-xs text-gray-400 mb-2 block">Quality</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(QUALITY_PRESETS).map(([key, preset]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedQuality(key)}
                        className={cn(
                          "p-2 text-xs rounded border transition-colors",
                          selectedQuality === key
                            ? "bg-primary-500/20 border-primary-500/50 text-primary-400"
                            : "bg-surface/50 border-white/10 text-gray-300 hover:border-white/20"
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Download Button */}
              <Button
                onClick={handleQuickDownload}
                className="w-full"
                size="sm"
              >
                <ApperIcon name="Download" size={14} className="mr-2" />
                Download as {selectedFormat.toUpperCase()}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DownloadDropdown;