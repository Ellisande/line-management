const hashCode = function(s: string) {
  var hash = 0,
    i,
    chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";

export const generateConfirmationCode = (queuerId: string) => {
  let hashNumber = Math.abs(hashCode(queuerId));
  let parts: string[] = [];
  while (hashNumber > 0) {
    parts = [...parts, alphabet[hashNumber % alphabet.length]];
    hashNumber = Math.floor(hashNumber / alphabet.length);
  }
  return parts.join("");
};

//l7E1Upi8kYtNUaGKHMsO
