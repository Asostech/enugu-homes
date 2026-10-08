function fbOn() {
  return !!(window.firebase && window.FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey);
}

function fbInit() {
  if (!fbOn()) return false;
  if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  return true;
}

function fbAuth() {
  return fbInit() ? firebase.auth() : null;
}

function fbDb() {
  return fbInit() ? firebase.firestore() : null;
}

function mapAuthError(err) {
  const c = (err && err.code) || "";
  if (c.indexOf("email-already-in-use") !== -1) return "That email already has an account. Log in.";
  if (c.indexOf("wrong-password") !== -1 || c.indexOf("invalid-credential") !== -1) return "Wrong email or password.";
  if (c.indexOf("user-not-found") !== -1) return "No account with that email.";
  if (c.indexOf("weak-password") !== -1) return "Password is too short.";
  if (c.indexOf("invalid-email") !== -1) return "Enter a valid email.";
  if (c.indexOf("unauthorized-domain") !== -1) return "Add 127.0.0.1 in Firebase Authentication → Settings → Authorized domains.";
  return (err && err.message) || "Something went wrong.";
}

async function fbSignup(data) {
  const auth = fbAuth();
  const db = fbDb();
  const cred = await auth.createUserWithEmailAndPassword(data.email, data.password);
  await cred.user.updateProfile({ displayName: data.name });
  const role = data.email.toLowerCase() === String(SITE.adminEmail || "").toLowerCase() ? "admin" : data.role;
  await db.collection("users").doc(cred.user.uid).set({
    name: data.name,
    email: data.email,
    phone: String(data.phone || "").replace(/\D/g, ""),
    role: role,
    createdAt: new Date().toISOString()
  });
  try { await cred.user.sendEmailVerification(); } catch (e) {}
  localStorage.setItem("enuguSession", data.email);
  localStorage.setItem("enuguProfile", JSON.stringify({
    email: data.email, name: data.name, phone: data.phone, role: role, uid: cred.user.uid
  }));
  return { ok: true, user: { email: data.email, name: data.name, role: role, uid: cred.user.uid } };
}

async function fbLogin(email, password) {
  const cred = await fbAuth().signInWithEmailAndPassword(email, password);
  let role = "seeker";
  let name = cred.user.displayName || email;
  let phone = "";
  try {
    const doc = await fbDb().collection("users").doc(cred.user.uid).get();
    if (doc.exists) {
      const d = doc.data();
      role = d.role || role;
      name = d.name || name;
      phone = d.phone || "";
    }
  } catch (e) {}
  const user = { email: cred.user.email, name, phone, role, uid: cred.user.uid };
  localStorage.setItem("enuguSession", user.email);
  localStorage.setItem("enuguProfile", JSON.stringify(user));
  return { ok: true, user };
}

async function fbReset(email) {
  await fbAuth().sendPasswordResetEmail(email);
  return { ok: true };
}


async function fbSaveListing(item) {
  const auth = fbAuth();
  if (!auth) {
    throw new Error("Firebase is not initialized.");
  }

  const user = await new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      unsubscribe();
      resolve(firebaseUser);
    });
  });

  if (!user) {
    throw new Error("You are not signed in to Firebase. Please log in again.");
  }

  const listing = Object.assign({}, item, {
  ownerEmail: user.email,
  ownerUid: user.uid
});

  const ref = await fbDb().collection("listings").add(listing);
  return ref.id;
}

async function fbLoadListings() {
  const snap = await fbDb().collection("listings").get();
  return snap.docs.map(d => {
    const data = d.data();
    return Object.assign({}, data, { id: d.id });
  });
}

async function fbDeleteListing(id) {
  await fbDb().collection("listings").doc(id).delete();
}

// =========================
// ADVERTISEMENT FUNCTIONS
// =========================

const FB_ADMIN_EMAIL = "enuguhomessurpport@gmail.com";

// Check the currently authenticated Firebase user.
function fbIsAdAdmin() {
  const user = fbAuth()?.currentUser;
  return !!user &&
    (user.email || "").toLowerCase() === FB_ADMIN_EMAIL.toLowerCase();
}

// Load active adverts for public pages.
async function fbLoadActiveAds() {
  const db = fbDb();
  if (!db) throw new Error("Firebase is not initialized.");

  const snap = await db.collection("ads")
    .where("status", "==", "active")
    .get();

  return snap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

// Load all adverts for the admin dashboard.
async function fbLoadAllAds() {
  if (!fbIsAdAdmin()) {
    throw new Error("Admin access required.");
  }

  const snap = await fbDb().collection("ads").get();

  return snap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

// Create a new advert.
async function fbCreateAd(ad) {
  if (!fbIsAdAdmin()) {
    throw new Error("Admin access required.");
  }

  const now = firebase.firestore.FieldValue.serverTimestamp();

  const data = {
    title: String(ad.title || ""),
    mediaType: ad.mediaType,
    mediaUrl: ad.mediaUrl,
    status: ad.status || "paused",
    linkUrl: String(ad.linkUrl || ""),
    order: Number(ad.order || 1),
    createdAt: now,
    updatedAt: now
  };

  const ref = await fbDb().collection("ads").add(data);
  return ref.id;
}

// Edit an existing advert.
async function fbUpdateAd(id, ad) {
  if (!fbIsAdAdmin()) {
    throw new Error("Admin access required.");
  }

  await fbDb().collection("ads").doc(id).update({
    title: String(ad.title || ""),
    mediaType: ad.mediaType,
    mediaUrl: ad.mediaUrl,
    status: ad.status,
    linkUrl: String(ad.linkUrl || ""),
    order: Number(ad.order || 1),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Pause or activate an advert.
async function fbSetAdStatus(id, status) {
  if (!fbIsAdAdmin()) {
    throw new Error("Admin access required.");
  }

  if (!["active", "paused"].includes(status)) {
    throw new Error("Invalid advert status.");
  }

  await fbDb().collection("ads").doc(id).update({
    status,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Delete an advert from Firestore.
async function fbDeleteAd(id) {
  if (!fbIsAdAdmin()) {
    throw new Error("Admin access required.");
  }

  await fbDb().collection("ads").doc(id).delete();
}
