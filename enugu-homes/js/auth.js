const USERS_KEY = "enuguUsers";
const SESSION_KEY = "enuguSession";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function currentUser() {
  const profile = localStorage.getItem("enuguProfile");
  if (profile) {
    try { return JSON.parse(profile); } catch (e) {}
  }
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  return getUsers().find(u => u.email === email) || null;
}
function loginUser(email, password) {
  const user = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return { ok: false, error: "Wrong email or password." };
  localStorage.setItem(SESSION_KEY, user.email);
  return { ok: true, user };
}
function makeCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function startEmailCode(kind, payload) {
  const code = makeCode();
  localStorage.setItem("emailChallenge", JSON.stringify({
    kind, code, payload, at: Date.now()
  }));
  return code;
}

function readEmailChallenge() {
  return JSON.parse(localStorage.getItem("emailChallenge") || "null");
}

function clearEmailChallenge() {
  localStorage.removeItem("emailChallenge");
}

function signupUser(data) {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { ok: false, error: "An account with that email already exists. Please log in." };
  }
  const code = startEmailCode("signup", {
    name: data.name,
    email: data.email.trim(),
    phone: data.phone.replace(/\D/g, ""),
    password: data.password,
    role: data.role
  });
  return { ok: true, pending: true, email: data.email.trim(), code };
}

function finishSignup(entered) {
  const ch = readEmailChallenge();
  if (!ch || ch.kind !== "signup") return { ok: false, error: "No pending sign up. Start again." };
  if (Date.now() - ch.at > 15 * 60 * 1000) return { ok: false, error: "Code expired. Sign up again." };
  if (String(entered).trim() !== ch.code) return { ok: false, error: "Wrong code." };
  const data = ch.payload;
  const user = {
    id: "u" + Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    verified: true,
    role: data.email.toLowerCase() === String((window.SITE && SITE.adminEmail) || "").toLowerCase()
      ? "admin"
      : data.role,
    createdAt: new Date().toISOString()
  };
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  clearEmailChallenge();
  localStorage.setItem(SESSION_KEY, user.email);
  return { ok: true, user };
}

function startPasswordReset(email) {
  const user = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false, error: "No account with that email." };
  const code = startEmailCode("reset", { email: user.email });
  return { ok: true, email: user.email, code };
}

function finishPasswordReset(entered, newPassword) {
  const ch = readEmailChallenge();
  if (!ch || ch.kind !== "reset") return { ok: false, error: "No reset in progress." };
  if (Date.now() - ch.at > 15 * 60 * 1000) return { ok: false, error: "Code expired. Try again." };
  if (String(entered).trim() !== ch.code) return { ok: false, error: "Wrong code." };
  if (!newPassword || newPassword.length < 4) return { ok: false, error: "Password too short." };
  const users = getUsers().map(u => {
    if (u.email.toLowerCase() === ch.payload.email.toLowerCase()) u.password = newPassword;
    return u;
  });
  saveUsers(users);
  clearEmailChallenge();
  return { ok: true };
}
function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("enuguSession");
  localStorage.removeItem("enuguProfile");
  try {
    if (typeof fbAuth === "function" && fbAuth()) fbAuth().signOut();
  } catch (e) {}
  location.href = "index.html";
}
function requireLister() {
  const user = currentUser();
  if (!user) {
    location.href = "login.html?next=list.html";
    return null;
  }
  if (user.role === "seeker") {
    alert("Tenants and buyers browse listings. Sign up as Landlord or Agent to list a property.");
    location.href = "account.html";
    return null;
  }
  return user;
}
