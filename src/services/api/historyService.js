import historyData from "@/services/mockData/images.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let generationHistory = [...historyData].sort((a, b) => 
  new Date(b.timestamp) - new Date(a.timestamp)
);

export const getGenerationHistory = async () => {
  await delay(300);
  return [...generationHistory];
};

export const getGeneratedImageById = async (id) => {
  await delay(200);
  return generationHistory.find(image => image.Id === parseInt(id));
};

export const addToHistory = async (imageData) => {
  await delay(300);
  
  const highestId = Math.max(...generationHistory.map(item => item.Id), 0);
  const newImage = {
    ...imageData,
    Id: highestId + 1,
    timestamp: imageData.timestamp || new Date().toISOString()
  };
  
  generationHistory = [newImage, ...generationHistory.slice(0, 4)];
  return newImage;
};

export const deleteGeneratedImage = async (id) => {
  await delay(300);
  
  const imageId = typeof id === "string" ? id : id.toString();
  generationHistory = generationHistory.filter(image => 
    image.Id.toString() !== imageId && image.id !== imageId
  );
  
  return true;
};

export const clearHistory = async () => {
  await delay(300);
  generationHistory = [];
  return true;
};

export const getHistoryStats = async () => {
  await delay(250);
  
  const totalGenerated = generationHistory.length;
  const styleCount = {};
  const aspectRatioCount = {};
  
  generationHistory.forEach(image => {
    styleCount[image.style] = (styleCount[image.style] || 0) + 1;
    aspectRatioCount[image.aspectRatio] = (aspectRatioCount[image.aspectRatio] || 0) + 1;
  });
  
  const mostUsedStyle = Object.keys(styleCount).reduce((a, b) => 
    styleCount[a] > styleCount[b] ? a : b, "Photorealistic"
  );
  
  const favoriteRatio = Object.keys(aspectRatioCount).reduce((a, b) => 
    aspectRatioCount[a] > aspectRatioCount[b] ? a : b, "1:1"
  );
  
  return {
    totalGenerated,
    mostUsedStyle,
    favoriteRatio,
    styleBreakdown: styleCount,
    aspectRatioBreakdown: aspectRatioCount
  };
};