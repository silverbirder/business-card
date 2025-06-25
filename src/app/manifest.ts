import type { MetadataRoute } from "next";
import { iconSizes } from "./icon";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "名刺生成",
    short_name: "名刺生成",
    description: "GitHubプロフィールから簡単に名刺を生成できるWebアプリです",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#111827",
    icons: iconSizes.map((size) => ({
      src: `/icon/${size}`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };
}
