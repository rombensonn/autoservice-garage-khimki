export function isAdminConfigured(login = process.env.ADMIN_LOGIN, password = process.env.ADMIN_PASSWORD) {
  return Boolean(login && password);
}

export function parseBasicAuthHeader(header: string | null) {
  if (!header?.startsWith("Basic ")) {
    return null;
  }

  const encoded = header.slice("Basic ".length);
  const decoded = decodeBase64(encoded);
  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) {
    return null;
  }

  return {
    login: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  };
}

export function isAdminAuthorized(header: string | null, login = process.env.ADMIN_LOGIN, password = process.env.ADMIN_PASSWORD) {
  if (!login || !password) {
    return false;
  }

  const credentials = parseBasicAuthHeader(header);

  if (!credentials) {
    return false;
  }

  return credentials.login === login && credentials.password === password;
}

function decodeBase64(value: string) {
  if (typeof atob === "function") {
    return atob(value);
  }

  return Buffer.from(value, "base64").toString("utf8");
}
