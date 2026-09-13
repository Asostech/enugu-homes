/* =========================================================
   EDIT THIS FILE IN VS CODE
   Site contact, then listings and photos.
   ========================================================= */

window.SITE = window.SITE = {
  name: "Enugu Homes",
  tagline: "Rent, buy and list property in Enugu State",
  phoneDisplay: "09122822890",
  phoneIntl: "2349122822890",
  email: "enuguhomes@gmail.com",
  adminEmail: "enuguhomessupport@gmail.com",
  city: "Enugu, Nigeria",
  whatsappPrefill: "Hello Enugu Homes, I want to list / find a property.",
  emailjs: {
    publicKey: "tFAi6it-_541Jq1sx",
    serviceId: "service_815i20y",
    templateId: "template_zhi6g28"
  },
    recaptchaSiteKey: "6Lc7W7ktAAAAACndgnwN1zqTcJg7XVt3fPF-8TTm",
};
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAIdAvNpXk7ORGl-HzhHfrwp0noi_CKhdA",
  authDomain: "enugu-homes.firebaseapp.com",
  projectId: "enugu-homes",
  storageBucket: "enugu-homes.firebasestorage.app",
  messagingSenderId: "820898973982",
  appId: "1:820898973982:web:d06bf0f6a25e9ef3b1a10f",
  measurementId: "G-5Q52CEG80Y"
};

/* Photo tip:
   1. Put pictures in the images folder, e.g. images/transekulu-3bed.jpg
   2. Change photo: "images/transekulu-3bed.jpg"
   Or keep a full https image link.
*/

window.ENUGU_LISTINGS = [
  {
    id: "en-101",
    title: "3-bedroom flat in Trans-Ekulu",
    type: "rent",
    property: "Flat",
    area: "Trans-Ekulu",
    price: 1800000,
    period: "/year",
    beds: 3,
    baths: 3,
    amenities: ["Generator", "Borehole", "Parking", "Tiled", "Fenced"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "Spacious 3-bedroom flat in a quiet street in Trans-Ekulu. Tiled throughout, prepaid meter, borehole and standby generator.",
    photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-102",
    title: "Newly built duplex in Independence Layout",
    type: "sale",
    property: "Duplex",
    area: "Independence Layout",
    price: 85000000,
    period: "",
    beds: 5,
    baths: 5,
    amenities: ["Generator", "Borehole", "Fence", "POP", "Estate"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "5-bedroom detached duplex on a standard plot. POP ceilings, fitted kitchen, BQ, interlocking compound.",
    photo: "https://images.unsplash.com/photo-1600585154340-0ef3c08c8416?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-103",
    title: "Self-contain in Uwani (near UNEC)",
    type: "rent",
    property: "Self-contain",
    area: "Uwani",
    price: 350000,
    period: "/year",
    beds: 1,
    baths: 1,
    amenities: ["Water", "Tiled", "Prepaid meter"],
    lister: "Asos Realty",
    role: "Owner",
    phone: "2349122822890",
    desc: "Clean self-contain close to UNEC. Suitable for a student or young professional.",
    photo: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-104",
    title: "2-bedroom mini-flat in New Haven",
    type: "rent",
    property: "Mini-flat",
    area: "New Haven",
    price: 900000,
    period: "/year",
    beds: 2,
    baths: 2,
    amenities: ["Generator", "Parking", "Security"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "Mini-flat on a tarred street in New Haven. Shared compound with gate.",
    photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-105",
    title: "Standard plot of land in Ugwuaji",
    type: "land",
    property: "Land",
    area: "Ugwuaji",
    price: 3500000,
    period: "",
    beds: 0,
    baths: 0,
    amenities: ["Survey", "Accessible road"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "About 500sqm in a developing layout off Enugu–Port Harcourt Expressway.",
    photo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-106",
    title: "4-bedroom bungalow in GRA",
    type: "rent",
    property: "Bungalow",
    area: "GRA",
    price: 4500000,
    period: "/year",
    beds: 4,
    baths: 4,
    amenities: ["Generator", "Borehole", "BQ", "Fence", "Parking"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "Detached bungalow on a large compound in GRA. Quiet street, boys’ quarters.",
    photo: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-107",
    title: "1-bedroom flat in Thinkers Corner",
    type: "rent",
    property: "Flat",
    area: "Thinkers Corner",
    price: 550000,
    period: "/year",
    beds: 1,
    baths: 1,
    amenities: ["Tiled", "Water", "Parking"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "Affordable 1-bedroom in a newer building at Thinkers Corner.",
    photo: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-108",
    title: "Commercial plot in Emene",
    type: "land",
    property: "Land",
    area: "Emene",
    price: 8000000,
    period: "",
    beds: 0,
    baths: 0,
    amenities: ["Corner piece", "Near airport road"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "Corner plot suitable for warehouse, shops or small factory.",
    photo: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-109",
    title: "Room and parlour in Abakpa",
    type: "rent",
    property: "Mini-flat",
    area: "Abakpa",
    price: 280000,
    period: "/year",
    beds: 1,
    baths: 1,
    amenities: ["Water", "Tiled"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "Room and parlour with kitchen in Abakpa. Close to the market.",
    photo: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "en-110",
    title: "Semi-finished 4-bed duplex, Centenary City",
    type: "sale",
    property: "Duplex",
    area: "Centenary City",
    price: 42000000,
    period: "",
    beds: 4,
    baths: 4,
    amenities: ["Estate", "Fence", "Tarred access"],
    lister: "Asos Realty",
    role: "Agent",
    phone: "2349122822890",
    desc: "Semi-finished duplex in a planned estate. Documents available for inspection.",
    photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80"
  }
];

function formatNaira(n) {
  return "₦" + Number(n).toLocaleString("en-NG");
}

function deletedIds() {
  return JSON.parse(localStorage.getItem("deletedListings") || "[]");
}

function allListings() {
  const extra = JSON.parse(localStorage.getItem("userListings") || "[]");
  const remote = window._remoteListings || [];
  const gone = deletedIds();
  const merged = remote.concat(extra).concat(window.ENUGU_LISTINGS);
  const seen = new Set();
  return merged.filter(p => {
    if (!p || gone.includes(p.id) || seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

async function refreshListings() {
  if (typeof fbLoadListings === "function" && typeof fbInit === "function" && fbInit()) {
    try {
      window._remoteListings = await fbLoadListings();
    } catch (e) {
      window._remoteListings = window._remoteListings || [];
    }
  }
  return allListings();
}

function isAdminUser(user) {
  if (!user) return false;
  return user.email.toLowerCase() === String(SITE.adminEmail || SITE.email).toLowerCase();
}

function canDeleteListing(listing, user) {
  if (!user || !listing) return false;
  if (isAdminUser(user)) return true;
  return listing.ownerEmail && listing.ownerEmail === user.email;
}

function deleteListing(id) {
  const extra = JSON.parse(localStorage.getItem("userListings") || "[]").filter(p => p.id !== id);
  localStorage.setItem("userListings", JSON.stringify(extra));
  const gone = deletedIds();
  if (!gone.includes(id)) gone.push(id);
  localStorage.setItem("deletedListings", JSON.stringify(gone));
}
function waLink(phone, title) {
  const text = encodeURIComponent("Hello, I saw \"" + title + "\" on Enugu Homes. Is it still available?");
  return "https://wa.me/" + phone + "?text=" + text;
}

function siteWaLink() {
  return "https://wa.me/" + SITE.phoneIntl + "?text=" + encodeURIComponent(SITE.whatsappPrefill);
}

function cardHTML(p) {
  const label = p.type === "sale" ? "For sale" : p.type === "land" ? "Land" : "For rent";
  const badge = p.type === "sale" ? "sale" : p.type === "land" ? "land" : "";
  const beds = p.property === "Land" ? "Land" : (p.beds + " bed · " + p.baths + " bath");
  return `
    <article class="card">
      <a class="photo" href="listing.html?id=${p.id}" style="background-image:url('${p.photo}')">
        <span class="badge ${badge}">${label}</span>
      </a>
      <div class="body">
        <div class="price">${formatNaira(p.price)}${p.period || ""}</div>
        <h3><a href="listing.html?id=${p.id}">${p.title}</a></h3>
        <div class="meta">${p.property} · ${p.area}<br>${beds}</div>
        <div class="actions">
          <a class="btn btn-wa" href="${waLink(p.phone, p.title)}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn btn-outline" href="listing.html?id=${p.id}">Details</a>
        </div>
      </div>
    </article>`;
}
