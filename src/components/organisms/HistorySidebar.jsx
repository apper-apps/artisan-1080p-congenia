import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import HistoryThumbnail from "@/components/molecules/HistoryThumbnail";

const HistorySidebar = ({ 
  history = [], 
  currentImage, 
  onImageSelect, 
  onImageDelete,
  className 
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <ApperIcon name="History" size={20} className="text-primary-400" />
          <h3 className="font-semibold text-white">Recent Creations</h3>
        </div>
        
        {history.length === 0 ? (
          <div className="text-center py-8">
            <ApperIcon name="ImageOff" size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No images generated yet</p>
            <p className="text-gray-500 text-xs mt-1">Your recent creations will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {history.map((image) => (
              <HistoryThumbnail
                key={image.id}
                image={image}
                onClick={onImageSelect}
                onDelete={onImageDelete}
                isActive={currentImage?.id === image.id}
              />
            ))}
          </div>
        )}
      </Card>
      
      {history.length > 0 && (
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <ApperIcon name="BarChart3" size={20} className="text-accent-400" />
            <h3 className="font-semibold text-white">Generation Stats</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total Generated</span>
              <span className="text-white font-semibold">{history.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Most Used Style</span>
              <span className="text-white font-semibold">Photorealistic</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Favorite Ratio</span>
              <span className="text-white font-semibold">1:1</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HistorySidebar;