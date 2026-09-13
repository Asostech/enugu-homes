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
  const ref = await fbDb().collection("listings").add(item);
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