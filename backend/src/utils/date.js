export function now() {
  return new Date();
}

export function format(date = new Date(), locale = "en-US") {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export function add(date = new Date(), amount = 0, unit = "ms") {
  const d = new Date(date);

  switch (unit) {
    case "ms":
      d.setMilliseconds(d.getMilliseconds() + amount);
      break;
    case "s":
      d.setSeconds(d.getSeconds() + amount);
      break;
    case "m":
      d.setMinutes(d.getMinutes() + amount);
      break;
    case "h":
      d.setHours(d.getHours() + amount);
      break;
    case "d":
      d.setDate(d.getDate() + amount);
      break;
    default:
      break;
  }

  return d;
}
