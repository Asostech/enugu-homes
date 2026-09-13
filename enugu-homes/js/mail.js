function emailJsReady() {
  const c = SITE.emailjs || {};
  return c.publicKey && c.serviceId && c.templateId && window.emailjs;
}

async function sendCodeEmail(toEmail, toName, code) {
  if (!emailJsReady()) {
    return { ok: false, skipped: true };
  }
  try {
    emailjs.init({ publicKey: SITE.emailjs.publicKey });
    await emailjs.send(SITE.emailjs.serviceId, SITE.emailjs.templateId, {
      to_email: toEmail,
      to_name: toName || "there",
      code: code,
      site_name: SITE.name || "Enugu Homes"
    });
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Could not send email." };
  }
}