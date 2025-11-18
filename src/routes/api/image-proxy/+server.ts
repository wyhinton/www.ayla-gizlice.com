import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, fetch }) => {
  const imageUrl = url.searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AylaGallery/1.0)",
        Referer: "https://photos.google.com",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();

    return new Response(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=31536000", // 1 day browser, 1 year CDN
        ETag: `"${Date.now()}"`,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new Response("Failed to fetch image", { status: 500 });
  }
};
