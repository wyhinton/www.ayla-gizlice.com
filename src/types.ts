export interface Project {
  project_name: string;
  category: string;
  project_description: string;
  Mediums: string;
  Year: number;
  Collaborator: string;
  Collaborator_Link: string;
  Picture_Link_1_Small?: string;
  Picture_Link_1_Large?: string;
  Picture_Link_2_Small?: string;
  Picture_Link_2_Large?: string;
  Picture_Link_3_Small?: string;
  Picture_Link_3_Large?: string;
  Picture_Link_4_Small?: string;
  Picture_Link_4_Large?: string;
  Picture_Link_5_Small?: string;
  Picture_Link_5_Large?: string;
  Picture_Link_6_Small?: string;
  Picture_Link_6_Large?: string;
  Picture_Link_7_Small?: string;
  Picture_Link_7_Large?: string;
  Picture_Link_8_Small?: string;
  Picture_Link_8_Large?: string;
  Image_Sizes: ImageSize[];
}

interface ImageSize {
  image_url: string;
  small_width: number;
  large_width: number;
  small_height: number;
  large_height: number;
}

interface CSVRow {}

export interface ProjectImage {
  src: string;
  index: number;
}

/**
 * Safely encode a URL path while preserving forward slashes
 */
function safeUrl(path: string): string {
  return encodeURIComponent(path).replace(/%2F/g, "/");
}

// Utility function to get existing images from a project
export function getProjectImages(project: Project): ProjectImage[] {
  const images: ProjectImage[] = [];

  for (let i = 1; i <= 8; i++) {
    const smallKey = `Picture_Link_${i}_Small` as keyof Project;
    const largeKey = `Picture_Link_${i}_Large` as keyof Project;

    const smallUrl = project[smallKey] as string;
    const largeUrl = project[largeKey] as string;

    // Check if both small and large images exist and are not "empty"
    if (
      smallUrl &&
      largeUrl &&
      smallUrl.trim() !== "" &&
      smallUrl.toLowerCase() !== "empty" &&
      largeUrl.trim() !== "" &&
      largeUrl.toLowerCase() !== "empty"
    ) {
      console.log(project.project_name);
      // Instead of using Google Photos URLs, use local static images
      // The image path will be handled by Cloudflare Image Resizing in the component
      images.push({
        src: safeUrl(`/images/artworks/${project.project_name.replaceAll(" ", "_")}_Picture_Large_${i}.webp`),
        index: i,
      });
    }
  }
  console.log(images);

  return images;
}

// Helper function to check if project has any images
export function hasProjectImages(project: Project): boolean {
  return getProjectImages(project).length > 0;
}
