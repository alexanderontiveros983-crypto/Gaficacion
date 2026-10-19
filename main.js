// Menú móvil
const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  burger.setAttribute("aria-expanded", abierto);
});
menu.addEventListener("click", e => {
  if (e.target.tagName === "A") { menu.classList.remove("abierto"); burger.setAttribute("aria-expanded", false); }
});
 
// Demo de <canvas> con contexto 2D (JavaScript puro)
const ctx = document.getElementById("demoCanvas").getContext("2d");
ctx.fillStyle = "#3a9d5d";
ctx.fillRect(20, 20, 80, 80);
ctx.beginPath();
ctx.arc(200, 60, 40, 0, Math.PI * 2);
ctx.fillStyle = "#f2a900";
ctx.fill();
 
// Iniciar los sketches de p5.js (modo instancia)
new p5(rana, "c-rana");
new p5(conejo, "c-conejo");
new p5(cena, "c-cena");
new p5(nevado, "c-nevado");
new p5(muneco, "c-muneco");
new p5(sol, "c-sol");
new p5(nubes, "c-nubes");
new p5(estrella, "c-estrella");
