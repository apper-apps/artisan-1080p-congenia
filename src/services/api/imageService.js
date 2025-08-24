import sampleImages from "@/services/mockData/sampleImages.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateImage = async ({ prompt, aspectRatio = "1:1", style = "Photorealistic" }) => {
  // Simulate API delay
  await delay(3000 + Math.random() * 2000);
  
  // Get random sample image
  const randomIndex = Math.floor(Math.random() * sampleImages.length);
  const imageUrl = sampleImages[randomIndex];
  
  // Generate unique ID
  const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const generatedImage = {
    id,
    prompt,
    imageUrl,
    timestamp: new Date().toISOString(),
    aspectRatio,
    style
  };
  
  return generatedImage;
};

export const getImageStyles = async () => {
  await delay(300);
  
  return [
    "Photorealistic",
    "Fantasy",
    "Cyberpunk",
    "Abstract",
    "Cinematic",
    "Anime",
    "Oil Painting",
    "Watercolor",
    "Sketch",
    "3D Render"
  ];
};

export const getAspectRatios = async () => {
  await delay(200);
  
  return [
    { value: "1:1", label: "Square (1:1)" },
    { value: "16:9", label: "Landscape (16:9)" },
    { value: "9:16", label: "Portrait (9:16)" },
    { value: "4:3", label: "Classic (4:3)" },
    { value: "3:4", label: "Vertical (3:4)" }
  ];
};