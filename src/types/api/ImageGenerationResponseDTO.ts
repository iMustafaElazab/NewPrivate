interface ImageGenerationResponseDTO {
  created?: number | null;
  data?: Data[] | null;
}

interface Data {
  url?: string | null;
}

export default ImageGenerationResponseDTO;
