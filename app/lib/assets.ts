export const REMOTE_ORIGIN = "https://tamilkumaran.in";

/** Resolve portfolio media: local covers when present, otherwise remote original. */
export function mediaUrl(path: string): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const cleaned = path.replace(/^\//, "");

  // Prefer local public copies for homepage / covers / contact assets
  const localAliases: Record<string, string> = {
    "images/6.gif": "/images/6.gif",
    "images/3.png": "/images/3.png",
    "images/thala 2.mp4": "/images/thala-2.mp4",
    "About assets/MEEEEEEEEE.jpg": "/about-assets/portrait.jpg",
    "About assets/MEEEEEEEEE1.jpg": "/about-assets/portrait-about.jpg",
    "Contact file/Monster.gif": "/contact/monster.gif",
    "Contact file/Google pay.png": "/contact/google-pay.png",
  };

  if (localAliases[cleaned]) return localAliases[cleaned];

  // Local work covers
  const coverMatch = cleaned.match(/^works\/(project-\d+)\/cover\.(jpg|jpeg|png|gif|mp4|webm)$/i);
  if (coverMatch) {
    return `/works/${coverMatch[1]}/cover.${coverMatch[2].toLowerCase()}`;
  }

  return `${REMOTE_ORIGIN}/${cleaned.split("/").map(encodeURIComponent).join("/")}`;
}

export function isVideoSource(source = ""): boolean {
  return /\.(mp4|webm|mov|m4v)$/i.test(source);
}
