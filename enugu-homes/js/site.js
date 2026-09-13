function toggleNav() {
  document.getElementById("nav")?.classList.toggle("open");
}

function applySiteContact() {
  if (typeof SITE === "undefined") return;
  document.querySelectorAll("[data-site-phone]").forEach(el => { el.textContent = SITE.phoneDisplay; });
  document.querySelectorAll("[data-site-email]").forEach(el => {
    el.textContent = SITE.email;
    if (el.tagName === "A") el.href = "mailto:" + SITE.email;
  });
  document.querySelectorAll("[data-site-wa]").forEach(el => {
    if (el.tagName === "A") el.href = siteWaLink();
  });
}

function paintAuthNav() {
  const slot = document.getElementById("authSlot");
  if (!slot || typeof currentUser !== "function") return;
  const user = currentUser();
  if (user) {
    slot.innerHTML = `<a href="account.html">${user.name.split(" ")[0]}</a>
      <a class="btn btn-primary" href="list.html">List a property</a>`;
  } else {
    slot.innerHTML = `<a href="login.html">Log in</a>
      <a class="btn btn-gold" href="signup.html">Sign up</a>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applySiteContact();
  paintAuthNav();
});
