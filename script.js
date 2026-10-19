// Focus cards open a detail panel
(function () {
  var dlg = document.getElementById('detail');
  var body = document.getElementById('detail-body');
  var names = { ai: 'ARTIFICIAL INTELLIGENCE', software: 'SOFTWARE ENGINEERING', creative: 'CREATIVE TECHNOLOGY' };
  var last = null;
  document.querySelectorAll('button.field').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-topic');
      last = b;
      body.textContent = '';
      var tpl = document.getElementById('t-' + t);
      if (tpl) {
        body.appendChild(tpl.content.cloneNode(true));
      } else {
        var h = document.createElement('h2');
        h.id = 'detail-title';
        h.textContent = 'WNXVRA — ' + names[t];
        var p = document.createElement('p');
        p.textContent = 'More on this is coming soon.';
        body.appendChild(h);
        body.appendChild(p);
      }
      if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
    });
  });
  document.getElementById('close').addEventListener('click', function () { if (dlg.close) { dlg.close(); } else { dlg.removeAttribute('open'); } });
  dlg.addEventListener('click', function (e) { if (e.target === dlg && dlg.close) { dlg.close(); } });
  dlg.addEventListener('close', function () { if (last) { last.focus(); } });
})();

// Upgrade meter
(function () {
  var n = 0;
  var fill = document.getElementById('fill');
  var ver = document.getElementById('ver');
  var msg = document.getElementById('msg');
  var wrap = document.getElementById('barwrap');
  var lines = [
    'Challenge accepted.',
    'Failure logged. Upgrade installed.',
    'Idea engineered.',
    'New skill unlocked.',
    'Built something that did not exist yesterday.',
    'Not the final form. The beginning of something bigger.'
  ];
  var meter = document.querySelector('.meter');
  var btn = document.getElementById('up');
  var stamp = document.getElementById('stamp');
  var box = document.getElementById('unlocks');
  var skills = ['Godot', 'Unity', 'C#', 'AI & LLM APIs', 'Blender', 'CAD', 'Game mechanics', 'Web development', 'UR5 robot arm', 'Hardware', 'Robotics', 'Electronics', 'Automation', 'Machine learning'];
  var info = {
    'Godot': 'The engine I use to build interactive experiences. Verxxor, my 2D platformer with multiple levels, enemies and mobile controls, was built with it and published on itch.io.',
    'Unity': 'Exploring Unity for ambitious 3D projects.',
    'C#': 'Exploring C# and software development, strengthening my logical thinking and problem-solving skills.',
    'AI & LLM APIs': 'Experimenting with language models and AI services to understand how intelligent applications work.',
    'Blender': 'Experimenting with 3D environments and digital modelling, and the connection between virtual design and real-world engineering.',
    'CAD': 'Exploring the link between virtual design and real-world engineering through CAD and digital modelling.',
    'Game mechanics': 'Combining creativity and code to build engaging gameplay mechanics, from challenging obstacles and enemies to victory and death screens.',
    'Web development': 'Creating digital experiences with modern web technologies and developing my own brand, WNXVRA.',
    'Hardware': 'Exploring how hardware, software, and digital systems work together.',
    'Automation': 'Exploring ways to make repetitive tasks smarter and workflows more efficient.',
    'Machine learning': 'Learning about machine learning, intelligent agents, and the next generation of AI-driven experiences.'
  };
  function openSkill(name, from) {
    var dlg = document.getElementById('detail');
    var body = document.getElementById('detail-body');
    body.textContent = '';
    var h = document.createElement('h2');
    h.id = 'detail-title';
    h.textContent = 'WNXVRA — ' + name.toUpperCase();
    var s = document.createElement('p');
    s.className = 'sub';
    s.textContent = '◈ SKILL UNLOCKED';
    var p = document.createElement('p');
    p.textContent = info[name] || 'Still exploring this one. More details come as time goes by.';
    body.appendChild(h);
    body.appendChild(s);
    body.appendChild(p);
    dlg.addEventListener('close', function () { from.focus(); }, { once: true });
    if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
  }
  function addTag(text, cls, skill) {
    var t = document.createElement(skill ? 'button' : 'span');
    if (skill) {
      t.type = 'button';
      t.addEventListener('click', function () { openSkill(skill, t); });
    }
    t.textContent = text;
    if (cls) { t.className = cls; }
    box.appendChild(t);
  }
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function replay(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function burst() {
    var m = meter.getBoundingClientRect(), b = btn.getBoundingClientRect();
    var cx = b.left - m.left + b.width / 2, cy = b.top - m.top + b.height / 2;
    var ring = document.createElement('span');
    ring.className = 'ring'; ring.style.left = cx + 'px'; ring.style.top = cy + 'px';
    meter.appendChild(ring);
    setTimeout(function () { ring.remove(); }, 850);
    for (var i = 0; i < 22; i++) {
      var s = document.createElement('span');
      var a = Math.random() * 6.283, d = 60 + Math.random() * 130;
      s.className = 'spark'; s.style.left = cx + 'px'; s.style.top = cy + 'px';
      s.style.setProperty('--dx', Math.cos(a) * d + 'px');
      s.style.setProperty('--dy', Math.sin(a) * d + 'px');
      meter.appendChild(s);
      (function (el) { setTimeout(function () { el.remove(); }, 850); })(s);
    }
  }

  btn.addEventListener('click', function () {
    n++;
    var pct = Math.min(8 + n * (84 / skills.length), 92);
    fill.style.width = pct + '%';
    wrap.setAttribute('aria-valuenow', pct);
    var zhLines = ['接受挑战。', '失败已记录，升级完成。', '创意已打造成形。', '新技能解锁。', '创造了昨天还不存在的东西。', '这不是最终形态，而是更大事物的开端。'];
    var total = skills.length;
    ver.textContent = 'v0.' + Math.min(n + 1, total + 1);
    var text;
    if (n < total) {
      text = lines[(n - 1) % (lines.length - 1)] + ' Unlocked: ' + skills[n - 1] + '.';
      addTag('◈ ' + skills[n - 1], '', skills[n - 1]);
    } else if (n === total) {
      text = 'Unlocked: ' + skills[n - 1] + '. ' + lines[lines.length - 1] + ' More comes as time goes by.';
      addTag('◈ ' + skills[n - 1], '', skills[n - 1]);
      addTag('◈ MORE COMING AS TIME GOES BY…', 'more');
      stamp.innerHTML = '敬请期待<small>MORE COMING…</small>';
    } else {
      text = 'Nothing left to unlock yet. More comes as time goes by. Keep building.';
    }
    var zhText;
    if (n < total) { zhText = zhLines[(n - 1) % (zhLines.length - 1)] + '已解锁：' + skills[n - 1] + '。'; }
    else if (n === total) { zhText = '已解锁：' + skills[n - 1] + '。' + zhLines[zhLines.length - 1] + '更多内容将随时间而来。'; }
    else { zhText = '暂时没有更多可解锁的内容。更多内容将随时间而来，继续创造。'; }
    msg.textContent = text;
    var zs = document.createElement('span');
    zs.className = 'zh msgzh'; zs.lang = 'zh-Hans'; zs.textContent = zhText;
    msg.appendChild(zs);
    if (!calm) { burst(); replay(meter, 'flash'); replay(ver, 'pop'); replay(stamp, 'show'); }
  });
})();

// Light up the closing words one by one
(function () {
  var spans = document.querySelectorAll('#words span');
  var box = document.getElementById('words');
  function run() {
    spans.forEach(function (s, i) { setTimeout(function () { s.classList.add('lit'); }, i * 450); });
  }
  if (!('IntersectionObserver' in window)) { run(); return; }
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) { run(); io.disconnect(); }
  }, { threshold: 0.6 });
  io.observe(box);
})();

// Falling gold and red petals
(function () {
  var c = document.getElementById('petals');
  if (!c || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var x = c.getContext('2d'), w, h;
  function size() { w = c.width = innerWidth; h = c.height = innerHeight; }
  size(); addEventListener('resize', size);
  function mk(r) { return { x: Math.random() * w, y: r ? Math.random() * h : -20, s: 4 + Math.random() * 6, v: .5 + Math.random(), ph: Math.random() * 6.28, rot: Math.random() * 6.28, c: Math.random() < .5 ? '#ffc83d' : '#ff5a68' }; }
  var P = [];
  for (var i = 0; i < 38; i++) { P.push(mk(true)); }
  function tick() {
    x.clearRect(0, 0, w, h);
    for (var i = 0; i < P.length; i++) {
      var p = P[i];
      p.y += p.v; p.ph += .02; p.rot += .02; p.x += Math.sin(p.ph) * .7;
      if (p.y > h + 20) { P[i] = mk(false); continue; }
      x.save(); x.translate(p.x, p.y); x.rotate(p.rot); x.globalAlpha = .7; x.fillStyle = p.c;
      x.beginPath(); x.ellipse(0, 0, p.s, p.s * .5, 0, 0, 6.283); x.fill(); x.restore();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// Scroll progress with the dragon seal
(function () {
  var fill = document.getElementById('progfill'), dr = document.getElementById('progdrag');
  function upd() {
    var m = document.documentElement.scrollHeight - innerHeight;
    var p = m > 0 ? Math.min(1, Math.max(0, scrollY / m)) : 0;
    fill.style.width = (p * 100) + '%';
    dr.style.left = 'calc(13px + (100% - 26px) * ' + p + ')';
  }
  addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
})();

// Lucky characters float up where you click
(function () {
  var ch = ['福', '龙', '梦', '创', '勇', '运'];
  document.addEventListener('click', function (e) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var g = document.createElement('span');
    g.className = 'glyph';
    g.textContent = ch[Math.floor(Math.random() * ch.length)];
    g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px';
    g.style.setProperty('--r', (Math.random() * 60 - 30) + 'deg');
    document.body.appendChild(g);
    setTimeout(function () { g.remove(); }, 1100);
  });
})();

// Dragon-fire cursor: realistic rising flames, smoke and sparks.
// Hold the mouse button to breathe fire; hold the cursor at the dragon's mouth and it blows fire like crazy.
(function () {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:7';
  document.body.appendChild(c);
  var g = c.getContext('2d'), w, h, dpr = Math.min(2, window.devicePixelRatio || 1);
  function size() { w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size(); addEventListener('resize', size);
  var mx = -100, my = -100, x = -100, y = -100, px = -100, py = -100, dirx = 0, diry = -1;
  var seen = false, holding = false, big = 0, bigS = 0, rage = 0, t = 0, pts = [], smoke = [], sparks = [], ripples = [];
  addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (!seen) { x = px = mx; y = py = my; seen = true; }
    big = (e.target.closest && e.target.closest('button, a')) ? 1 : 0;
  });
  addEventListener('mousedown', function (e) { holding = true; ripples.push({ x: e.clientX, y: e.clientY, r: 6, a: 1 }); });
  addEventListener('mouseup', function () { holding = false; });
  addEventListener('blur', function () { holding = false; });
  // black-body style colour ramp: white-hot core -> yellow -> orange -> red -> dark ember
  var STOPS = [[0, 60, 18, 12], [.15, 150, 35, 14], [.35, 235, 70, 18], [.55, 255, 140, 30], [.78, 255, 205, 90], [1, 255, 245, 215]];
  function ramp(L) {
    for (var i = 1; i < STOPS.length; i++) {
      if (L <= STOPS[i][0]) {
        var a = STOPS[i - 1], b = STOPS[i], f = (L - a[0]) / (b[0] - a[0]);
        return Math.round(a[1] + (b[1] - a[1]) * f) + ',' + Math.round(a[2] + (b[2] - a[2]) * f) + ',' + Math.round(a[3] + (b[3] - a[3]) * f);
      }
    }
    return '255,245,215';
  }
  function sprite(col) {
    var k = document.createElement('canvas'); k.width = k.height = 64;
    var kc = k.getContext('2d'), gr = kc.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(' + col + ',1)'); gr.addColorStop(.5, 'rgba(' + col + ',.55)'); gr.addColorStop(1, 'rgba(' + col + ',0)');
    kc.fillStyle = gr; kc.fillRect(0, 0, 64, 64);
    return k;
  }
  var spr = [];
  for (var si0 = 0; si0 <= 31; si0++) { spr.push(sprite(ramp(si0 / 31))); }
  var WHITE = spr.length; spr.push(sprite('255,236,190'));
  var smokeSpr = sprite('55,45,42');
  function spawn(sx, sy, vx, vy, sz, d, hot, blue) { pts.push({ x: sx, y: sy, vx: vx, vy: vy, s: sz, d: d, l: 1, h: hot, b: blue, o: Math.random() * 6.28 }); }
  function spark(sx, sy, vx, vy, d) { sparks.push({ x: sx, y: sy, px: sx, py: sy, vx: vx, vy: vy, d: d, l: 1 }); }
  function frame() {
    t += .05;
    x += (mx - x) * .3; y += (my - y) * .3;
    bigS += (big - bigS) * .15;
    var vx = x - px, vy = y - py, sp = Math.sqrt(vx * vx + vy * vy);
    px = x; py = y;
    if (sp > .5) {
      dirx += (vx / sp - dirx) * .25; diry += (vy / sp - diry) * .25;
      var dl = Math.sqrt(dirx * dirx + diry * diry) || 1; dirx /= dl; diry /= dl;
    }
    // where is the dragon's mouth?
    var img = document.querySelector('.dragonfig img'), rageT = 0, mX = 0, mY = 0, eX = 0, eY = 0, sc = 1;
    if (img) {
      var rc = img.getBoundingClientRect();
      if (rc.width > 0 && rc.bottom > 0 && rc.top < h) {
        sc = rc.width / 468;
        mX = rc.left + rc.width * .425; mY = rc.top + rc.height * .44;
        eX = rc.left + rc.width * .35; eY = rc.top + rc.height * .365;
        var dd = Math.sqrt((x - mX) * (x - mX) + (y - mY) * (y - mY)), R = rc.width * .24;
        rageT = seen && dd < R ? 1 - dd / R : 0;
      }
    }
    rage += (rageT - rage) * .2;
    if (img) {
      if (rage > .03) {
        var am = rage * 2.4;
        img.style.transform = 'translate(' + (Math.sin(t * 9) * am).toFixed(2) + 'px,' + (Math.cos(t * 11) * am).toFixed(2) + 'px) scale(' + (1 + rage * .015).toFixed(4) + ')';
      } else if (img.style.transform) { img.style.transform = ''; }
    }
    if (seen) {
      if (pts.length < (rage > .02 ? 520 : 300)) {
        // the flame itself: sits on the cursor, rises, leans away from the direction you move
        var wind = sp * .12, n = 6 + Math.min(8, sp * .4) | 0;
        for (var i = 0; i < n; i++) {
          var a = Math.random() * 6.283, rr = Math.random() * 5, k = .5 + Math.random();
          spawn(x + Math.cos(a) * rr, y + 2 + Math.sin(a) * rr * .4, -dirx * wind * k + (Math.random() - .5) * .9, -diry * wind * k - (1.6 + Math.random() * 2.2), 7 + Math.random() * 7 + bigS * 3, .018 + Math.random() * .02, Math.random() < .3, false);
        }
        if (holding) {
          for (var j = 0; j < 9; j++) {
            var ang = Math.atan2(diry, dirx) + (Math.random() - .5) * .7, v = 4 + Math.random() * 6;
            spawn(x, y, Math.cos(ang) * v, Math.sin(ang) * v - .4, 8 + Math.random() * 9, .02 + Math.random() * .02, Math.random() < .3, Math.random() < .2);
          }
        }
        if (rage > .02) {
          var cnt = Math.round(rage * 22);
          for (var q = 0; q < cnt; q++) {
            var fa = .18 + (Math.random() - .5) * .8, fv = (7 + Math.random() * 10) * (.6 + rage * .8);
            spawn(mX + (Math.random() - .5) * 10, mY + (Math.random() - .5) * 10, Math.cos(fa) * fv, Math.sin(fa) * fv - .3, 12 + Math.random() * 18, .011 + Math.random() * .015, Math.random() < .4, true);
          }
        }
      }
      if (Math.random() < .25) { spark(x, y, (Math.random() - .5) * 3, -(1.5 + Math.random() * 3), .012 + Math.random() * .012); }
      if (rage > .02 && Math.random() < .8) { spark(mX, mY, 3 + Math.random() * 7, (Math.random() - .5) * 5 - 1.5, .01 + Math.random() * .01); }
      if (rage > .3 && Math.random() < .15) { ripples.push({ x: mX, y: mY, r: 6, a: .9 }); }
    }
    g.clearRect(0, 0, w, h);
    // smoke first (normal blending), flames on top (additive)
    for (var s1 = smoke.length - 1; s1 >= 0; s1--) {
      var sm = smoke[s1];
      sm.x += sm.vx; sm.y += sm.vy; sm.vx *= .99; sm.l -= sm.d;
      if (sm.l <= 0) { smoke.splice(s1, 1); continue; }
      var sr = sm.s * (1 + (1 - sm.l) * 2.2);
      g.globalAlpha = sm.l * .16;
      g.drawImage(smokeSpr, sm.x - sr, sm.y - sr, sr * 2, sr * 2);
      g.globalAlpha = 1;
    }
    g.globalCompositeOperation = 'lighter';
    if (rage > .02) {
      var gR = Math.min(Math.max(w, h) * .45, 520);
      var bgG = g.createRadialGradient(mX, mY, 0, mX, mY, gR);
      bgG.addColorStop(0, 'rgba(255,110,30,' + (.28 * rage) + ')'); bgG.addColorStop(1, 'rgba(255,60,10,0)');
      g.fillStyle = bgG; g.fillRect(mX - gR, mY - gR, gR * 2, gR * 2);
      var eg = g.createRadialGradient(eX, eY, 0, eX, eY, 26 * sc + 6);
      eg.addColorStop(0, 'rgba(255,230,90,' + (.9 * rage) + ')'); eg.addColorStop(1, 'rgba(255,60,20,0)');
      g.fillStyle = eg; g.beginPath(); g.arc(eX, eY, 26 * sc + 6, 0, 6.283); g.fill();
    }
    for (var m = pts.length - 1; m >= 0; m--) {
      var p = pts[m];
      p.vy -= .022; p.vx *= .975; p.vy *= .988;
      p.vx += Math.sin(p.y * .045 + t * 3 + p.o) * .14;
      p.x += p.vx; p.y += p.vy; p.l -= p.d;
      if (p.l <= 0) {
        if (!p.b && Math.random() < .14 && smoke.length < 110) { smoke.push({ x: p.x, y: p.y, vx: p.vx * .3, vy: -.6 - Math.random() * .4, s: p.s * 1.2, l: 1, d: .008 + Math.random() * .006 }); }
        pts.splice(m, 1); continue;
      }
      var L = p.l, Lc = p.h ? Math.min(1, L + .18) : L;
      var si = (p.b && L > .75) ? WHITE : Math.round(Lc * 31);
      var r = p.s * (.25 + L * .9), al = Math.min(1, L * 4) * (p.b ? .32 : .5);
      g.globalAlpha = al;
      g.drawImage(spr[si], p.x - r, p.y - r, r * 2, r * 2);
    }
    g.globalAlpha = 1;
    g.lineCap = 'round'; g.lineWidth = 1.6;
    for (var s2 = sparks.length - 1; s2 >= 0; s2--) {
      var sk = sparks[s2];
      sk.px = sk.x; sk.py = sk.y; sk.vy += .03; sk.vx *= .99; sk.x += sk.vx; sk.y += sk.vy; sk.l -= sk.d;
      if (sk.l <= 0) { sparks.splice(s2, 1); continue; }
      g.strokeStyle = 'rgba(255,' + Math.round(120 + 100 * sk.l) + ',50,' + (sk.l * (.6 + .4 * Math.random())) + ')';
      g.beginPath(); g.moveTo(sk.px, sk.py); g.lineTo(sk.x, sk.y); g.stroke();
    }
    g.globalCompositeOperation = 'source-over';
    if (seen) {
      var pr = (6 + bigS * 5 + rage * 8) * (1 + Math.sin(t * 3) * .1);
      var hg = g.createRadialGradient(x, y, 0, x, y, pr * 2.4);
      hg.addColorStop(0, '#fffbe6'); hg.addColorStop(.3, '#ffd24d'); hg.addColorStop(.6, 'rgba(255,120,30,.45)'); hg.addColorStop(1, 'rgba(255,90,20,0)');
      g.fillStyle = hg; g.beginPath(); g.arc(x, y, pr * 2.4, 0, 6.283); g.fill();
      if (bigS > .05) {
        g.strokeStyle = 'rgba(255,200,61,' + (.8 * bigS) + ')'; g.lineWidth = 1.5;
        g.beginPath(); g.arc(x, y, pr + 10, 0, 6.283); g.stroke();
      }
    }
    for (var z = ripples.length - 1; z >= 0; z--) {
      var rp = ripples[z]; rp.r += 3; rp.a -= .03;
      if (rp.a <= 0) { ripples.splice(z, 1); continue; }
      g.strokeStyle = 'rgba(255,140,40,' + rp.a + ')'; g.lineWidth = 2;
      g.beginPath(); g.arc(rp.x, rp.y, rp.r, 0, 6.283); g.stroke();
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

// Sections rise into view
(function () {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .08 });
  document.querySelectorAll('section').forEach(function (el) { el.classList.add('rv'); io.observe(el); });
})();

// Palace gates swing open on arrival (click or any key to skip)
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var d = document.createElement('div');
  d.className = 'gates'; d.setAttribute('aria-hidden', 'true');
  d.innerHTML = '<div class="door l"><i class="ring"></i></div><div class="door r"><i class="ring"></i></div><div class="emblem"><b lang="zh-Hans">龙</b><span>WNXVRA</span><p class="enter" lang="zh-Hans">点击进入 · CLICK TO ENTER</p></div>';
  document.body.appendChild(d);
  document.body.style.overflow = 'hidden';
  var done = false;
  function open() {
    if (done) return;
    done = true; d.classList.add('open');
    setTimeout(function () { d.remove(); document.body.style.overflow = ''; }, 1500);
  }
  window.WNXgate = {
    open: open,
    wait: function () { var e = d.querySelector('.enter'); if (e) { e.classList.add('show'); } d.style.cursor = 'pointer'; }
  };
  d.addEventListener('click', open);
  addEventListener('keydown', open, { once: true });
})();

// Back-to-top seal
(function () {
  var b = document.getElementById('totop');
  function upd() { b.classList.toggle('show', scrollY > 600); }
  addEventListener('scroll', upd, { passive: true }); upd();
  b.addEventListener('click', function () {
    scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
})();

// Highlight the nav link of the section in view
(function () {
  if (!('IntersectionObserver' in window)) return;
  var links = {};
  document.querySelectorAll('nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) {
      if (e.isIntersecting) { Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); }); }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  Object.keys(links).forEach(function (id) { var el = document.getElementById(id); if (el) { io.observe(el); } });
})();

// Background music: starts after your first click or key press; the seal in the bottom-left corner turns it on or off
(function () {
  var a = document.getElementById('bgm'), b = document.getElementById('music');
  if (!a || !b) return;
  var chose = false, resume = false, tm = null;
  function fade(target) {
    clearInterval(tm);
    tm = setInterval(function () { a.volume = Math.min(target, a.volume + .02); if (a.volume >= target) { clearInterval(tm); } }, 80);
  }
  function mark(on) { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  function start() {
    a.volume = 0;
    var pr = a.play();
    if (pr && pr.then) { pr.then(function () { mark(true); fade(.4); }).catch(function () {}); } else { mark(true); fade(.4); }
  }
  b.addEventListener('click', function () {
    chose = true;
    if (a.paused) { start(); } else { a.pause(); mark(false); }
  });
  function first(e) {
    if (e.target.closest && e.target.closest('#music')) return;
    removeEventListener('pointerdown', first); removeEventListener('keydown', first);
    if (!chose && a.paused) { start(); }
  }
  addEventListener('pointerdown', first); addEventListener('keydown', first);
  // try to start the music as soon as the page loads; if the browser blocks it, the gates wait for a tap
  var decided = false;
  function waitForTap() { if (!decided) { decided = true; if (window.WNXgate) { window.WNXgate.wait(); } } }
  a.volume = 0;
  var ap = a.play();
  if (ap && ap.then) {
    ap.then(function () { mark(true); fade(.4); decided = true; if (window.WNXgate) { setTimeout(window.WNXgate.open, 1600); } }).catch(waitForTap);
  } else { waitForTap(); }
  setTimeout(waitForTap, 2500);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { if (!a.paused) { a.pause(); resume = true; } }
    else if (resume) { resume = false; a.play().catch(function () {}); }
  });
})();
