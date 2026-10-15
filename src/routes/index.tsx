import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import cover from "@/assets/capa-ebook.png.asset.json";
import offerCover from "@/assets/capa-ebook-nova.webp.asset.json";
import ebookHtml from "@/content/ebook.html?raw";
import ebookCss from "@/content/ebook.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Como Lidar com Pessoas Narcisistas — Guia Prático" },
      { name: "description", content: "Um guia prático para reconhecer padrões manipuladores, estabelecer limites e proteger a sua paz emocional." },
      { property: "og:title", content: "Como Lidar com Pessoas Narcisistas — Guia Prático" },
      { property: "og:description", content: "Conheça o ebook e os quatro bónus para estabelecer limites e proteger a sua paz emocional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: ebookCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const cycle = 17 * 60 * 1000;
    const storageKey = "ebook_offer_deadline_v1";
    let deadline = Date.now() + cycle;
    try {
      const saved = Number(localStorage.getItem(storageKey));
      if (saved > Date.now()) deadline = saved;
      localStorage.setItem(storageKey, String(deadline));
    } catch { /* Storage may be unavailable. */ }
    const update = () => {
      let remaining = deadline - Date.now();
      if (remaining <= 0) {
        deadline = Date.now() + cycle;
        remaining = cycle;
        try { localStorage.setItem(storageKey, String(deadline)); } catch { /* Optional storage. */ }
      }
      const clock = document.getElementById("offer-countdown");
      if (clock) clock.textContent = `${String(Math.floor(remaining / 60000)).padStart(2, "0")}:${String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0")}`;
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <main dangerouslySetInnerHTML={{ __html: ebookHtml.replaceAll("__EBOOK_OFFER_COVER__", offerCover.url).replaceAll("__EBOOK_COVER__", cover.url) }} />;
}
