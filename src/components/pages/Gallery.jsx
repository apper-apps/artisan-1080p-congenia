import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import HistoryThumbnail from "@/components/molecules/HistoryThumbnail";
import { getGenerationHistory, deleteGeneratedImage } from "@/services/api/historyService";
import { cn } from "@/utils/cn";

const Gallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredImages(allImages);
    } else {
      const filtered = allImages.filter(image => 
        image.prompt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.style?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredImages(filtered);
    }
  }, [searchQuery, allImages]);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const images = await getGenerationHistory();
      setAllImages(images);
      setFilteredImages(images);
    } catch (error) {
      console.error("Error loading gallery:", error);
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleImageDelete = async (imageId) => {
    try {
      await deleteGeneratedImage(imageId);
      const updatedImages = allImages.filter(img => img.id !== imageId);
      setAllImages(updatedImages);
      if (selectedImage?.id === imageId) {
        setSelectedImage(null);
      }
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading gallery...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
              <p className="text-gray-400">
                {allImages.length} {allImages.length === 1 ? 'image' : 'images'} generated
              </p>
            </div>
            
            {/* Search */}
            <div className="w-full md:w-80">
              <div className="relative">
                <ApperIcon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <Input
                  type="text"
                  placeholder="Search by prompt or style..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <ApperIcon name="ImageOff" size={64} className="text-gray-400 mx-auto mb-4" />
                {allImages.length === 0 ? (
                  <>
                    <h3 className="text-xl font-semibold text-white mb-2">No Images Generated</h3>
                    <p className="text-gray-400 mb-4">Start creating amazing images to build your gallery</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
                    <p className="text-gray-400 mb-4">Try adjusting your search terms</p>
                  </>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredImages.map((image, index) => (
                <HistoryThumbnail
                  key={image?.id || `gallery-${index}-${image?.timestamp || Date.now()}`}
                  image={image}
                  onClick={handleImageSelect}
                  onDelete={handleImageDelete}
                  isActive={selectedImage?.id === image.id}
                  className="hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          )}

          {/* Stats Card */}
          {allImages.length > 0 && (
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <ApperIcon name="BarChart3" size={20} className="text-accent-400" />
                <h3 className="font-semibold text-white">Gallery Statistics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{allImages.length}</div>
                  <div className="text-sm text-gray-400">Total Images</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {new Set(allImages.map(img => img.style)).size}
                  </div>
                  <div className="text-sm text-gray-400">Unique Styles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {filteredImages.length}
                  </div>
                  <div className="text-sm text-gray-400">Showing</div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Gallery;