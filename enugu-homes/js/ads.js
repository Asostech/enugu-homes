
// Enugu Homes Advertisement Billboard

async function initAdBillboard() {
  const billboard = document.getElementById("adBillboard");
  if (!billboard) return;

  try {
    if (typeof fbLoadActiveAds !== "function") {
      throw new Error("Firebase ad functions are not loaded.");
    }

    const ads = await fbLoadActiveAds();

    if (!ads.length) {
      billboard.textContent = "No advertisements available.";
      return;
    }

    let currentIndex = 0;

    function showAd(index) {
      const ad = ads[index];
      billboard.replaceChildren();

      const mediaType = String(ad.mediaType || "").toLowerCase();
      let media;

      if (mediaType === "video") {
        media = document.createElement("video");
        media.autoplay = true;
        media.muted = true;
        media.loop = true;
        media.playsInline = true;
      } else {
        media = document.createElement("img");
        media.alt = ad.title || "Enugu Homes advertisement";
      }

      media.className = "ad-billboard-media";
      media.src = ad.mediaUrl;

      if (ad.linkUrl) {
        const link = document.createElement("a");
        link.href = ad.linkUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "ad-billboard-link";
        link.setAttribute("aria-label", ad.title || "View advertisement");
        link.appendChild(media);
        billboard.appendChild(link);
      } else {
        billboard.appendChild(media);
      }
    }

    showAd(currentIndex);

    if (ads.length > 1) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % ads.length;
        showAd(currentIndex);
      }, 6000);
    }
  } catch (error) {
    console.error("Advertisement billboard error:", error);
    billboard.textContent = "Advertisements are temporarily unavailable.";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdBillboard);
} else {
  initAdBillboard();
}
