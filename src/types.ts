export interface Project {
  project_name: string;
  category: string;
  project_description: string;
  Mediums: string;
  Year: number;
  Collaborator: string;
  Collaborator_Link: string;
  Picture_Link_1_Small: string;
  Picture_Link_1_Large: string;
  Picture_Link_2_Small: string;
  Picture_Link_2_Large: string;
  Picture_Link_3_Small: string;
  Picture_Link_3_Large: string;
  Picture_Link_4_Small: string;
  Picture_Link_4_Large: string;
  Picture_Link_5_Small: string;
  Picture_Link_5_Large: string;
  Picture_Link_6_Small: string;
  Picture_Link_6_Large: string;
  Picture_Link_7_Small: string;
  Picture_Link_7_Large: string;
  Picture_Link_8_Small: string;
  Picture_Link_8_Large: string;
  Video_Link: string;
}

export interface ProjectImage {
  small: string;
  large: string;
  index: number;
}

/**
 * Cleans and optimizes Google Photos URLs for public access
 */
export function cleanGooglePhotosUrl(url: string): string {
  if (!url || url === "empty") return url;

  try {
    const urlObj = new URL(url);

    // Remove problematic parameters
    urlObj.searchParams.delete("authuser");
    urlObj.searchParams.delete("usp");

    // For Google Photos, ensure we have the right format
    if (urlObj.hostname.includes("googleusercontent.com")) {
      // Add parameters that help with public access and caching
      if (!urlObj.searchParams.has("sz")) {
        // Add size parameter to help with caching and reduce rate limiting
        urlObj.searchParams.set("sz", "800");
      }

      // Ensure we're not using a cached version that might be rate limited
      urlObj.searchParams.delete("cache");
    }

    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, return original URL
    console.warn("Failed to parse URL:", url);
    return url;
  }
}

/**
 * Creates a proxy URL to avoid CORS and rate limiting issues
 */
export function createProxyUrl(originalUrl: string): string {
  if (!originalUrl || originalUrl === "empty") return originalUrl;

  // Option 1: Use a simple proxy service (you'll need to implement this)
  // return `https://your-proxy-service.com/proxy?url=${encodeURIComponent(originalUrl)}`;

  // Option 2: Use CORS proxy (temporary solution)
  // return `https://cors-anywhere.herokuapp.com/${originalUrl}`;

  // For now, return cleaned URL
  return cleanGooglePhotosUrl(originalUrl);
}

/**
 * Adds random delay to help with rate limiting
 */
export function addRandomDelay(): Promise<void> {
  const delay = Math.random() * 1000 + 500; // 500-1500ms delay
  return new Promise((resolve) => setTimeout(resolve, delay));
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
      images.push({
        small: cleanGooglePhotosUrl(smallUrl),
        large: cleanGooglePhotosUrl(largeUrl),
        index: i,
      });
    }
  }

  return images;
}

// Helper function to check if project has any images
export function hasProjectImages(project: Project): boolean {
  return getProjectImages(project).length > 0;
}

interface CSVRow {}
