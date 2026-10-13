// Cinco dibujos de Khan Academy adaptados a p5.js (modo instancia). Lienzo: 400x400.

// 1. RANA
function rana(p) {
  let lengua = 0;
  p.setup = () => p.createCanvas(400, 400);
  p.draw = () => {
    p.background(170, 220, 240);
    p.noStroke(); p.fill(60, 140, 200); p.ellipse(200, 400, 500, 160); // estanque
    p.fill(70, 170, 80); p.ellipse(310, 360, 90, 30); // nenúfar
    p.fill(47, 158, 91);
    p.ellipse(200, 260, 240, 190);                      // cuerpo
    p.ellipse(120, 160, 90, 90); p.ellipse(280, 160, 90, 90); // ojos base
    p.ellipse(200, 210, 220, 150);                      // cabeza
    p.fill(255);
    p.ellipse(120, 160, 66, 66); p.ellipse(280, 160, 66, 66);
    p.fill(0);
    [120, 280].forEach(x => {
      const a = p.atan2(p.mouseY - 160, p.mouseX - x);
      p.ellipse(x + p.cos(a) * 14, 160 + p.sin(a) * 14, 28, 28);
    });
    p.stroke(20, 90, 50); p.strokeWeight(4); p.noFill();
    p.arc(200, 225, 130, 60, 0.15, p.PI - 0.15);       // sonrisa
    p.fill(20, 90, 50); p.noStroke();
    p.ellipse(185, 195, 6, 6); p.ellipse(215, 195, 6, 6); // fosas nasales
    lengua = p.lerp(lengua, p.mouseIsPressed ? 70 : 0, 0.2);
    if (lengua > 2) { p.fill(230, 80, 100); p.rect(190, 250, 20, lengua, 0, 0, 10, 10); }
    p.fill(47, 158, 91); p.ellipse(110, 340, 90, 40); p.ellipse(290, 340, 90, 40); // patas
  };
}

// 2. DIENTES DE CONEJO
function conejo(p) {
  let mordida = 0;
  p.setup = () => p.createCanvas(400, 400);
  p.draw = () => {
    p.background(255, 230, 240);
    const inc = p.map(p.mouseX, 0, 400, -0.15, 0.15);
    p.noStroke();
    [[140, -1], [260, 1]].forEach(([x, s]) => {
      p.push(); p.translate(x, 150); p.rotate(inc * s + s * 0.1);
      p.fill(235, 225, 220); p.ellipse(0, -70, 60, 170);
      p.fill(255, 170, 190); p.ellipse(0, -65, 28, 130); p.pop();
    });
    p.fill(240, 232, 225); p.ellipse(200, 250, 250, 220);  // cara
    p.fill(30); p.ellipse(150, 220, 22, 28); p.ellipse(250, 220, 22, 28);
    p.fill(255); p.ellipse(154, 214, 8, 8); p.ellipse(254, 214, 8, 8);
    const tw = p.sin(p.frameCount * (p.mouseIsPressed ? .5 : .1)) * 2;
    p.fill(255, 120, 150); p.ellipse(200 + tw, 255, 30, 20); // nariz
    p.stroke(120); p.strokeWeight(2); p.noFill();
    p.line(200, 265, 200, 285); p.arc(180, 285, 40, 24, 0, p.PI); p.arc(220, 285, 40, 24, 0, p.PI);
    p.line(80, 255, 140, 262); p.line(80, 280, 140, 275); p.line(320, 255, 260, 262); p.line(320, 280, 260, 275);
    mordida = p.lerp(mordida, p.mouseIsPressed ? 10 : 0, 0.25);
    p.fill(255); p.stroke(150); p.strokeWeight(2);
    p.rect(182, 296 + mordida, 17, 48, 0, 0, 6, 6); p.rect(201, 296 + mordida, 17, 48, 0, 0, 6, 6); // dientes
  };
}

// 3. ¿QUÉ HAY DE CENA?
function cena(p) {
  let plato = 0;
  const menus = ["Pizza", "Hamburguesa", "Espagueti"];
  p.setup = () => { p.createCanvas(400, 400); p.textAlign(p.CENTER); p.textFont("Trebuchet MS"); };
  p.mousePressed = () => { if (p.dist(p.mouseX, p.mouseY, 200, 210) < 130) plato = (plato + 1) % menus.length; };
  p.draw = () => {
    p.background(150, 100, 60);
    p.noStroke(); p.fill(250, 245, 235); p.rect(0, 40, 400, 330);   // mantel
    p.fill(255, 250); p.ellipse(200, 210, 270, 270);
    p.fill(225, 225, 230); p.ellipse(200, 210, 210, 210);
    if (plato === 0) {                                              // pizza
      p.fill(240, 190, 80); p.ellipse(200, 210, 190, 190);
      p.fill(210, 60, 40); p.ellipse(200, 210, 165, 165);
      p.fill(250, 220, 110); p.ellipse(200, 210, 145, 145);
      p.fill(190, 40, 40);
      [[170, 180], [225, 190], [190, 235], [235, 235], [160, 225]].forEach(c => p.ellipse(c[0], c[1], 28, 28));
      p.stroke(200, 150, 50); p.strokeWeight(2);
      for (let a = 0; a < 6; a++) p.line(200, 210, 200 + p.cos(a * p.PI / 3) * 95, 210 + p.sin(a * p.PI / 3) * 95);
    } else if (plato === 1) {                                       // hamburguesa
      p.fill(220, 150, 70); p.arc(200, 195, 150, 110, p.PI, 0);
      p.fill(90, 200, 90); p.rect(122, 195, 156, 12, 6);
      p.fill(250, 200, 40); p.rect(125, 205, 150, 10);
      p.fill(100, 55, 30); p.rect(122, 215, 156, 22, 11);
      p.fill(220, 150, 70); p.rect(125, 237, 150, 22, 0, 0, 14, 14);
    } else {                                                        // espagueti
      p.noFill(); p.stroke(245, 200, 90); p.strokeWeight(6);
      for (let i = 0; i < 7; i++) p.ellipse(200, 215, 40 + i * 20, 25 + i * 17);
      p.noStroke(); p.fill(200, 40, 40); p.ellipse(200, 205, 60, 45);
      p.fill(60, 150, 60); p.ellipse(190, 198, 14, 8); p.ellipse(212, 208, 14, 8);
    }
    p.noStroke(); p.fill(190);
    p.rect(60, 120, 8, 180, 4); p.rect(48, 120, 4, 50); p.rect(76, 120, 4, 50); p.rect(56, 120, 20, 50, 0, 0, 8, 8); // tenedor
    p.fill(200); p.rect(336, 120, 8, 180, 4); p.ellipse(330, 170, 24, 100); p.fill(250, 245, 235); p.rect(306, 120, 24, 100); p.fill(200); p.rect(330, 120, 14, 100, 0, 6, 6, 0); // cuchillo
    p.fill(60, 30, 10); p.textSize(30); p.text("¿Qué hay de cena?", 200, 32);
    p.textSize(26); p.fill(255); p.text(menus[plato], 200, 395);
  };
}

// 4. DÍA NEVADO SOLEADO
function nevado(p) {
  const copos = [];
  p.setup = () => {
    p.createCanvas(400, 400);
    for (let i = 0; i < 70; i++) copos.push({ x: p.random(400), y: p.random(400), r: p.random(2, 5), v: p.random(.5, 2) });
  };
  p.draw = () => {
    p.background(130, 200, 245);
    const sx = p.constrain(p.mouseX, 40, 360), sy = 90 + p.abs(sx - 200) * 0.25;
    p.noStroke(); p.fill(255, 220, 60, 80); p.ellipse(sx, sy, 130, 130);
    p.push(); p.translate(sx, sy); p.rotate(p.frameCount * 0.01);
    p.stroke(255, 200, 40); p.strokeWeight(4);
    for (let i = 0; i < 12; i++) { p.rotate(p.TWO_PI / 12); p.line(40, 0, 62, 0); }
    p.pop();
    p.noStroke(); p.fill(255, 215, 40); p.ellipse(sx, sy, 70, 70);
    p.fill(120, 140, 160); p.triangle(0, 280, 110, 160, 220, 280); p.triangle(150, 280, 290, 140, 420, 280); // montañas
    p.fill(255); p.triangle(86, 190, 110, 160, 134, 190); p.triangle(262, 172, 290, 140, 318, 172);
    p.fill(30, 110, 60);                                        // pinos
    [[60, 300], [340, 310]].forEach(t => { p.triangle(t[0] - 30, t[1], t[0], t[1] - 80, t[0] + 30, t[1]); p.triangle(t[0] - 24, t[1] - 35, t[0], t[1] - 100, t[0] + 24, t[1] - 35); });
    p.fill(255); p.ellipse(60, 296, 70, 14); p.ellipse(340, 306, 70, 14);
    p.fill(250, 252, 255); p.ellipse(100, 340, 360, 140); p.ellipse(320, 350, 320, 130); p.rect(0, 350, 400, 50);
    p.fill(255);
    copos.forEach(c => {
      p.ellipse(c.x, c.y, c.r * 2); c.y += c.v; c.x += p.sin(p.frameCount * .02 + c.r) * .4;
      if (c.y > 400) { c.y = -5; c.x = p.random(400); }
    });
  };
}

// 5. MUÑECO DE NIEVE
function muneco(p) {
  const copos = [];
  let sombrero = 0;
  p.setup = () => {
    p.createCanvas(400, 400);
    for (let i = 0; i < 50; i++) copos.push({ x: p.random(400), y: p.random(400), v: p.random(.5, 1.5) });
  };
  p.draw = () => {
    p.background(40, 60, 110);
    p.noStroke(); p.fill(255, 250, 200); p.ellipse(340, 60, 40, 40); p.fill(40, 60, 110); p.ellipse(352, 54, 36, 36); // luna
    p.fill(255); p.ellipse(200, 420, 600, 200);
    p.stroke(110, 70, 30); p.strokeWeight(6);                                   // brazos
    p.line(135, 250, 70, 205); p.line(265, 250, 330, 205);
    p.line(80, 212, 62, 215); p.line(80, 212, 72, 192); p.line(320, 212, 338, 215); p.line(320, 212, 328, 192);
    p.noStroke(); p.fill(255);
    p.stroke(200, 215, 235); p.strokeWeight(2);
    p.ellipse(200, 320, 160, 150); p.ellipse(200, 235, 120, 115); p.ellipse(200, 150, 90, 90);
    p.noStroke(); p.fill(0);
    [172, 228].forEach(x => {                                                  // ojos que siguen
      p.fill(255); p.ellipse(x - 8 + 8, 140, 18, 18);
      const a = p.atan2(p.mouseY - 140, p.mouseX - x); p.fill(0); p.ellipse(x + p.cos(a) * 3, 140 + p.sin(a) * 3, 8, 8);
    });
    p.fill(255, 140, 0); p.triangle(200, 150, 200, 164, 245, 160);              // nariz
    p.fill(0); for (let i = 0; i < 5; i++) p.ellipse(172 + i * 14, 172 + p.abs(i - 2) * -3 + 6, 5, 5); // sonrisa
    p.fill(30); [225, 245, 265].forEach(y => p.ellipse(200, y, 10, 10)); p.ellipse(200, 300, 10, 10);
    p.fill(200, 40, 50); p.rect(158, 188, 84, 16, 8); p.rect(215, 196, 18, 50, 4); // bufanda
    sombrero = p.lerp(sombrero, p.mouseIsPressed ? -22 : 0, 0.2);
    p.fill(20); p.rect(150, 110 + sombrero, 100, 10, 4); p.rect(165, 65 + sombrero, 70, 50, 4);
    p.fill(200, 40, 50); p.rect(165, 98 + sombrero, 70, 10);
    p.noStroke(); p.fill(255);
    copos.forEach(c => { p.ellipse(c.x, c.y, 5); c.y += c.v; if (c.y > 400) { c.y = -5; c.x = p.random(400); } });
  };
}
