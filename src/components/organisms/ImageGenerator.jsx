import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import PromptInput from "@/components/molecules/PromptInput";
import GenerateButton from "@/components/molecules/GenerateButton";
import ImageDisplay from "@/components/molecules/ImageDisplay";
import ProgressRing from "@/components/molecules/ProgressRing";
import { generateImage } from "@/services/api/imageService";

const ImageGenerator = ({ 
  onImageGenerated, 
  currentImage, 
  onImageChange,
  className 
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your image");
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const generatedImage = await generateImage({
        prompt: prompt.trim(),
        aspectRatio: "1:1",
        style: "Photorealistic"
      });
      
      setProgress(100);
      setTimeout(() => {
        onImageGenerated?.(generatedImage);
        onImageChange?.(generatedImage);
        toast.success("Image generated successfully!");
      }, 500);
      
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 1000);
    }
  };

  const handleDownload = () => {
    if (currentImage) {
      const link = document.createElement("a");
      link.href = currentImage.imageUrl;
      link.download = `artisan-ai-${currentImage.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded!");
    }
  };

  const handleFullscreen = () => {
    if (currentImage) {
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <html>
          <head><title>Generated Image - Artisan AI</title></head>
          <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; min-height:100vh;">
            <img src="${currentImage.imageUrl}" style="max-width:100%; max-height:100vh; object-fit:contain;" />
          </body>
        </html>
      `);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Create Your Vision</h2>
            <p className="text-gray-400 text-sm">Describe the image you want to generate and watch AI bring your ideas to life.</p>
          </div>
          
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleGenerate}
            placeholder="A serene mountain landscape at sunset with a crystal clear lake reflecting the golden sky..."
          />
          
          <GenerateButton
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            loading={isGenerating}
            className="w-full"
          />
        </div>
      </Card>

      {isGenerating && (
        <Card className="text-center">
          <div className="space-y-6">
            <ProgressRing progress={progress} />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Crafting Your Masterpiece</h3>
              <p className="text-gray-400 text-sm">Our AI is analyzing your prompt and creating something amazing...</p>
            </div>
          </div>
        </Card>
      )}

      {currentImage && !isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Generated Image</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleFullscreen}
                className="p-2 rounded-lg bg-surface/50 hover:bg-surface border border-white/10 hover:border-primary-500/30 transition-colors"
              >
                <ApperIcon name="Maximize2" size={16} className="text-gray-400" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg bg-surface/50 hover:bg-surface border border-white/10 hover:border-primary-500/30 transition-colors"
              >
                <ApperIcon name="Download" size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
          
          <ImageDisplay
            image={currentImage}
            onDownload={handleDownload}
            onFullscreen={handleFullscreen}
          />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;