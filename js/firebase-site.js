import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const firebaseConfig = {
  authDomain: "imperio-25340.firebaseapp.com",
  projectId: "imperio-25340",
  storageBucket: "imperio-25340.appspot.com",
  messagingSenderId: "305282928509",
  appId: "1:305282928509:web:5d2edc0b6238b1f50a4ad6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { doc, getDoc, setDoc, collection, getDocs, onSnapshot };

export async function ensureSeriesSeed() {
  const snap = await getDocs(collection(db, "series"));
  if (!snap.empty) return;

  let superSeries = {
    id: "super-stream",
    title: "Super Stream",
    year: "2026",
    genres: "Ficção / Animação",
    synopsis: "A noite inteira sem série, sem filme, sem nada. Mas Super Stream sente! No topo da torre, ele aparece. Capa no vento. Olhar firme. O herói do streaming não deixa ninguém no escuro.",
    poster: "",
    published: true,
    ordem: 1,
    seasons: [],
    gallery: [],
    totalEpisodes: 0
  };

  try {
    const old = await getDoc(doc(db, "config", "vlog"));
    if (old.exists() && old.data().series) {
      const s = old.data().series;
      superSeries = {
        ...superSeries,
        title: s.title || superSeries.title,
        year: s.year || superSeries.year,
        genres: s.genres || superSeries.genres,
        synopsis: s.synopsis || superSeries.synopsis,
        poster: s.poster || "",
        seasons: Array.isArray(s.seasons) ? s.seasons : [],
        totalEpisodes: s.totalEpisodes || 0
      };
    }
    const gal = await getDoc(doc(db, "config", "galeria"));
    if (gal.exists() && Array.isArray(gal.data().images)) {
      superSeries.gallery = gal.data().images;
    }
  } catch (e) { console.warn(e); }

  await setDoc(doc(db, "series", "super-stream"), superSeries);
  await setDoc(doc(db, "series", "teste-2026"), {
    id: "teste-2026",
    title: "Teste 2026",
    year: "2026",
    genres: "Ficção",
    synopsis: "Série de teste. Edite título, sinopse, poster e episódios na aba 6 do admin.",
    poster: "",
    published: true,
    ordem: 2,
    seasons: [{ id: "tp1", name: "TP 1", episodesCount: 0, episodes: [] }],
    gallery: [],
    totalEpisodes: 0
  });
}

const adIntervals = {};
export function renderAds1316(data, gridId) {
  Object.keys(adIntervals).forEach(k => { clearInterval(adIntervals[k]); delete adIntervals[k]; });
  const grid = document.getElementById(gridId);
  if (!grid || !data) return;
  grid.innerHTML = "";
  for (let i = 13; i <= 16; i++) {
    const exibir = data["an" + i + "_exibir"] === true;
    const urls = [data["an" + i + "_img1"], data["an" + i + "_img2"], data["an" + i + "_img3"]].filter(u => u && String(u).trim());
    if (!exibir || !urls.length) continue;
    const titulo = (data["an" + i + "_titulo"] || "").trim();
    const link = (data["an" + i + "_link"] || "").trim();
    const slot = document.createElement("div");
    slot.className = "ad-slot";
    slot.style.display = "block";
    if (titulo) slot.title = titulo;
    urls.forEach((url, idx) => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = titulo || ("Anúncio " + i);
      if (idx === 0) img.classList.add("active");
      slot.appendChild(img);
    });
    if (titulo) {
      const tip = document.createElement("div");
      tip.className = "ad-tooltip";
      tip.textContent = titulo;
      slot.appendChild(tip);
    }
    if (link) slot.addEventListener("click", () => window.open(link, "_blank", "noopener,noreferrer"));
    if (urls.length > 1) {
      let idx = 0;
      adIntervals[i] = setInterval(() => {
        const imgs = slot.querySelectorAll("img");
        if (!imgs.length) return;
        imgs[idx].classList.remove("active");
        idx = (idx + 1) % imgs.length;
        imgs[idx].classList.add("active");
      }, 3000);
    }
    grid.appendChild(slot);
  }
  const wrap = document.getElementById("ads-footer");
  if (wrap) wrap.style.display = grid.children.length ? "block" : "none";
}
