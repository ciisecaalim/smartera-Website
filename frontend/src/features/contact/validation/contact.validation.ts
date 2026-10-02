export type ContactValues = { fullName: string; email: string; phone: string; subject: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.fullName.trim(); const email = values.email.trim(); const phone = values.phone.trim(); const subject = values.subject.trim(); const message = values.message.trim();
  if (name.length < 2 || name.length > 80) errors.fullName = "Magaca waa inuu u dhexeeyaa 2 iyo 80 xaraf.";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Geli email sax ah.";
  if (phone && (phone.length < 7 || phone.length > 20 || !/^[+\d\s().-]+$/.test(phone))) errors.phone = "Phone-ka geli qaab sax ah.";
  if (subject.length < 3 || subject.length > 120) errors.subject = "Subject-ku waa inuu u dhexeeyaa 3 iyo 120 xaraf.";
  if (message.length < 10 || message.length > 2000) errors.message = "Message-ku waa inuu u dhexeeyaa 10 iyo 2000 xaraf.";
  return errors;
}
