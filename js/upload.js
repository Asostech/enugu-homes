
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resizeImage(dataUrl, maxW, quality) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const scale = Math.min(1, maxW / img.width);
      const canvas = document.createElement("canvas");

      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/jpeg", quality));
    };

    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

async function filesToPhotos(fileList) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const files = Array.from(fileList || [])
    .filter(file => allowedTypes.includes(file.type))
    .slice(0, 6);

  const photos = [];

  for (const file of files) {
    const raw = await readFileAsDataURL(file);
    const small = await resizeImage(raw, 1280, 0.72);

    const formData = new FormData();
    formData.append("file", small);
    formData.append("upload_preset", "enugu_homes_photos");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/ayz4tiup/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Image upload failed");
    }

    photos.push(result.secure_url);
  }

  return photos;
}

// =========================
// BILLBOARD MEDIA UPLOAD
// =========================

async function uploadAdMedia(file) {
  if (!file) {
    throw new Error("Please select an image or video.");
  }

  const isImage = ["image/jpeg", "image/png", "image/webp"]
    .includes(file.type);

  const isVideo = ["video/mp4", "video/webm"]
    .includes(file.type);

  if (!isImage && !isVideo) {
    throw new Error("Only JPG, PNG, WebP, MP4, and WebM files are allowed.");
  }

  if (isImage && file.size > 8 * 1024 * 1024) {
    throw new Error("Image must be 8 MB or smaller.");
  }

  if (isVideo && file.size > 30 * 1024 * 1024) {
    throw new Error("Video must be 30 MB or smaller.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "enugu_homes_ads");
  formData.append("folder", "enugu_homes/ads");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/ayz4tiup/auto/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error?.message || "Advert media upload failed."
    );
  }

  return {
    mediaType: result.resource_type,
    mediaUrl: result.secure_url,
    publicId: result.public_id
  };
}
