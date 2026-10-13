const PAGINAS = ["index.html", "dom-inspector.html"];
const SEMANTICAS = ["header", "nav", "main", "section", "article", "footer", "aside"];
const RECURSOS = ["script", "link", "meta", "title"];
const arbol = document.getElementById("arbol");
const stats = document.getElementById("stats");
const pestanas = document.getElementById("pestanas");
let cuenta = 0, profMax = 0;

// Menú móvil
const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("abierto")));

function crearNodo(el, prof) {
  cuenta++; profMax = Math.max(profMax, prof);
  const tag = el.tagName.toLowerCase();
  const hijos = [...el.children];
  const li = document.createElement("li");
  if (hijos.length && prof >= 2) li.classList.add("cerrado");

  const b = document.createElement("button");
  b.className = "nodo" + (hijos.length ? " hijos" : "")
    + (SEMANTICAS.includes(tag) ? " sem" : RECURSOS.includes(tag) ? " rec" : "");
  b.textContent = "<" + tag + ">";
  const extra = el.id ? "#" + el.id : el.classList.length ? "." + el.classList[0]
    : el.getAttribute("src") || el.getAttribute("href") || "";
  if (extra) { const s = document.createElement("small"); s.textContent = extra; b.appendChild(s); }
  b.title = hijos.length ? hijos.length + " hijo(s)" : (el.textContent.trim().slice(0, 80) || "sin hijos");
  if (hijos.length) {
    const mas = document.createElement("span"); mas.className = "mas"; mas.textContent = hijos.length;
    b.firstChild.after(mas);
    b.addEventListener("click", () => li.classList.toggle("cerrado"));
  }
  li.appendChild(b);
  if (hijos.length) {
    const ul = document.createElement("ul");
    hijos.forEach(h => ul.appendChild(crearNodo(h, prof + 1)));
    li.appendChild(ul);
  }
  return li;
}

function dibujar(doc, nombre) {
  cuenta = 0; profMax = 0;
  arbol.innerHTML = "";
  const ul = document.createElement("ul");
  ul.appendChild(crearNodo(doc.documentElement, 0));
  arbol.appendChild(ul);
  stats.textContent = nombre + ": " + cuenta + " elementos, " + (profMax + 1) + " niveles de profundidad.";
}

async function mostrar(nombre) {
  [...pestanas.children].forEach(t => t.setAttribute("aria-selected", t.dataset.p === nombre));
  try {
    const r = await fetch(nombre);
    if (!r.ok) throw new Error(r.status);
    const doc = new DOMParser().parseFromString(await r.text(), "text/html");
    dibujar(doc, nombre);
  } catch (e) {
    if (nombre === location.pathname.split("/").pop() || (nombre === "dom-inspector.html" && !location.pathname.split("/").pop())) {
      dibujar(document, nombre);
    } else {
      arbol.innerHTML = "<p style='color:#fff'>No se pudo leer " + nombre + ". Abre el sitio desde GitHub Pages o un servidor local (no con doble clic en el archivo).</p>";
      stats.textContent = "";
    }
  }
}

PAGINAS.forEach(p => {
  const t = document.createElement("button");
  t.textContent = p; t.dataset.p = p; t.setAttribute("role", "tab");
  t.addEventListener("click", () => mostrar(p));
  pestanas.appendChild(t);
});
document.getElementById("expandir").addEventListener("click", () => arbol.querySelectorAll("li.cerrado").forEach(l => l.classList.remove("cerrado")));
document.getElementById("contraer").addEventListener("click", () => mostrar(document.querySelector("[aria-selected=true]").dataset.p));
mostrar(PAGINAS[0]);
