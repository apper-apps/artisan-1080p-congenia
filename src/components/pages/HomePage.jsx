import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import ImageGenerator from "@/components/organisms/ImageGenerator";
import HistorySidebar from "@/components/organisms/HistorySidebar";
import { getGenerationHistory, deleteGeneratedImage } from "@/services/api/historyService";

const HomePage = () => {
const [history, setHistory] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const historyData = await getGenerationHistory();
      setHistory(historyData);
      if (historyData.length > 0 && !currentImage) {
        setCurrentImage(historyData[0]);
      }
    } catch (error) {
      console.error("Failed to load history:", error);
      toast.error("Failed to load generation history");
    } finally {
      setLoading(false);
    }
  };

const handleImageGenerated = (newImage) => {
    setHistory(prev => [newImage, ...prev]);
    setCurrentImage(newImage);
  };

  const handleImageSelect = (image) => {
    setCurrentImage(image);
  };

  const handleImageDelete = async (imageId) => {
    try {
      await deleteGeneratedImage(imageId);
      setHistory(prev => prev.filter(img => img.id !== imageId));
      if (currentImage?.id === imageId) {
        const remainingImages = history.filter(img => img.id !== imageId);
        setCurrentImage(remainingImages.length > 0 ? remainingImages[0] : null);
      }
      toast.success("Image deleted from history");
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
<main className="max-w-7xl mx-auto p-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 space-y-8 lg:space-y-0">
{/* Main Content */}
          <div className="lg:col-span-3">
            <ImageGenerator
              onImageGenerated={handleImageGenerated}
              currentImage={currentImage}
              onImageChange={setCurrentImage}
            />
          </div>
          
          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <HistorySidebar
                history={history.slice(0, 5)}
                currentImage={currentImage}
                onImageSelect={handleImageSelect}
                onImageDelete={handleImageDelete}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;