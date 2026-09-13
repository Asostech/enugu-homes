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
  const files = Array.from(fileList || []).filter(f => f.type.startsWith("image/")).slice(0, 6);
  const photos = [];
  for (const file of files) {
    const raw = await readFileAsDataURL(file);
    const small = await resizeImage(raw, 1280, 0.72);
    photos.push(small);
  }
  return photos;
}