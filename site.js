// Everything Marek edits lives in SITE: the version, the patch notes, the links and the videos.
// Leave a link as '' and its button shows "coming soon" instead.
const SITE = {
	version: '0.3.0',
	stage: 'Beta',
	minecraft: 'Java Edition 26.2 (Fabric)',
	links: {
		youtube: 'https://www.youtube.com/@GoDu_v2',
		tiktok: 'https://www.tiktok.com/@godu_clips',
		kofi: 'https://ko-fi.com/mareklackowski',
		patreon: 'https://www.patreon.com/cw/GoDuuu',
		beta: 'https://www.patreon.com/posts/hellminers-beta-172140879', // the free beta post
	},
	// Patreon supporters, added by hand: superCitizens get their own row at the top of the list
	supporters: { superCitizens: [], others: [] },
	// newest first; each video is media/videos/<id>.mp4 with <id>.jpg as its poster
	videos: [
		{ id: 'ep14', title: 'Orbital Railcannon Strike' },
		{ id: 'ep13', title: 'Resupply' },
		{ id: 'ep12', title: 'Shrieker Nest' },
		{ id: 'ep11', title: 'Spore Spewer' },
		{ id: 'ep10', title: 'Eagle 500kg Bomb' },
		{ id: 'ep09', title: 'Bug Nests' },
		{ id: 'ep08', title: 'Minefields' },
		{ id: 'ep07', title: 'Terminids, part 3' },
		{ id: 'ep06', title: 'Terminids, part 2' },
		{ id: 'ep05', title: 'Terminids, part 1' },
		{ id: 'ep04', title: 'The Helldiver armour' },
		{ id: 'ep03', title: 'Machine Gun Sentry' },
		{ id: 'ep02', title: 'Eagle Airstrike' },
		{ id: 'ep01', title: 'I added Helldivers 2 to Minecraft' },
	],
	// newest first. Written the way games and mods write them (see README): sections, one short line per change,
	// 'Name: what changed', numbers as 'from X to Y', fixes as 'Fixed ...'. No selling, no explaining.
	patchNotes: [
		{ date: '2026-10-12', title: 'Version 0.3.0', sections: [
			{ title: 'New enemies', items: [
				'Devastator',
				'Heavy Devastator',
				'Rocket Devastator',
				'Berserker',
			] },
			{ title: 'Changes', items: [
				'Automatons now fire while moving. Some hold position, some close in, some circle the target.',
				'Automatons now aim their weapons up and down at the target.',
				'Automatons now back away at half their walking speed.',
				'Automaton hit zones now follow the model closely. Head shots work.',
				'Automatons now have red eyes.',
				'Enemies are no longer knocked back when shot.',
				'A head shot kill leaves the Automaton’s head smoking and sparking.',
			] },
			{ title: 'Fixes', items: [
				'Fixed Shriekers getting stuck circling their tower.',
				'Fixed flickering textures on Automatons.',
				'Fixed Automaton shots not coming from their weapons.',
			] },
		] },
		{ date: '2026-10-07', title: 'Version 0.2.0', sections: [
			{ title: 'New stratagems', items: [
				'MD-I4 Incendiary Mines',
				'MD-17 Anti-Tank Mines',
				'MD-8 Gas Mines',
				'FX-12 Shield Generator Relay',
				'E/AT-12 Anti-Tank Emplacement',
				'E/GL-21 Grenadier Battlement',
			] },
			{ title: 'Changes', items: [
				'Mines: new models.',
				'Mines now go off on contact.',
				'HMG Emplacement: range increased from 40 m to 300 m.',
				'Emplacements now fire at the crosshair.',
				'Grenade launcher and AT-12 rounds have their own explosion effect and break fewer blocks.',
				'Stratagem beacons stuck to an enemy now follow it smoothly.',
			] },
			{ title: 'Fixes', items: [
				'Fixed Shrieker and Dragonroach flying tilted.',
				'Fixed flickering textures on Terminids.',
			] },
		] },
		{ date: '2026-10-05', title: 'One True Flag', sections: [
			{ title: 'New stratagems', items: [
				'CQC-1 One True Flag. Can be worn on the back, held or planted in the ground.',
			] },
			{ title: 'Changes', items: [
				'Terminids and Automatons now target whoever carries the flag.',
				'Support weapons now use the same holding pose as the Liberator.',
			] },
		] },
		{ date: '2026-10-01', title: 'Flame, gas, arc and laser', sections: [
			{ title: 'New stratagems', items: [
				'FLAM-40 Flamethrower',
				'TX-41 Sterilizer',
				'ARC-3 Arc Thrower',
				'LAS-98 Laser Cannon',
			] },
			{ title: 'Changes', items: [
				'Fire weapons now leave burning ground.',
				'Gas weapons now leave a gas cloud.',
			] },
		] },
		{ date: '2026-09-25', title: 'Enemies rebuilt', sections: [
			{ title: 'Added', items: [
				'SEAF Artillery, SAM Site and radar station objectives.',
			] },
			{ title: 'Changes', items: [
				'All Terminids and Automatons rebuilt from Helldivers 2 models and animations, at in-game size.',
			] },
		] },
		{ date: '2026-09-15', title: 'Terminid infestation', sections: [
			{ title: 'Added', items: [
				'Terminid infestation biome with bug nests, patrols and samples.',
				'Nest size and enemy count depend on difficulty.',
			] },
		] },
	],
};

// --- rendering below; no need to touch it ---
const $ = s => document.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

$('#version').textContent = 'v' + SITE.version;
$('#stage').textContent = SITE.stage;
$('#mc').textContent = SITE.minecraft;
$('#ver-big').textContent = 'v' + SITE.version;

for (const [key, url] of Object.entries(SITE.links)) {
	for (const a of document.querySelectorAll(`[data-link="${key}"]`)) {
		if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
		else { a.classList.add('soon'); a.removeAttribute('href'); a.querySelector('small').textContent = 'coming soon'; }
	}
}

// the videos: poster cards (a muted preview on hover) that open a vertical player with prev/next, swipe and keys
const fmt = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
$('#videos').innerHTML = SITE.videos.map((v, i) => `
	<button type="button" class="video" data-i="${i}" aria-label="Play: ${esc(v.title)}">
		<span class="thumb"><img src="media/videos/${v.id}.jpg" alt="" width="540" height="960" loading="lazy"><span class="play" aria-hidden="true"></span></span>
		<span class="vt">${esc(v.title)}</span>
	</button>`).join('');
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
for (const card of document.querySelectorAll('#videos .video')) {
	const v = SITE.videos[card.dataset.i], thumb = card.querySelector('.thumb');
	card.addEventListener('click', () => openPlayer(+card.dataset.i));
	if (!fine || still) continue;
	let prev;
	card.addEventListener('mouseenter', () => {
		if (!prev) {
			prev = document.createElement('video');
			Object.assign(prev, { src: `media/videos/${v.id}.mp4`, muted: true, loop: true, playsInline: true });
			prev.className = 'preview';
			thumb.append(prev);
		}
		prev.currentTime = 0;
		prev.play().catch(() => {});
	});
	card.addEventListener('mouseleave', () => prev && prev.pause());
}

const pl = $('#player'), pv = pl.querySelector('video'), fill = pl.querySelector('.pl-fill'), seek = pl.querySelector('.pl-seek');
let cur = 0;
function openPlayer(i) {
	cur = (i + SITE.videos.length) % SITE.videos.length;
	const v = SITE.videos[cur];
	pv.src = `media/videos/${v.id}.mp4`;
	pv.poster = `media/videos/${v.id}.jpg`;
	pl.querySelector('.pl-title').textContent = v.title;
	if (!pl.open) pl.showModal();
	pv.play().catch(() => {});
	if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'play-' + v.id, event: true });
}
const sync = () => {
	pl.classList.toggle('paused', pv.paused);
	pl.querySelector('.pl-play').setAttribute('aria-label', pv.paused ? 'Play' : 'Pause');
};
pv.addEventListener('play', sync);
pv.addEventListener('pause', sync);
pv.addEventListener('timeupdate', () => {
	fill.style.width = (pv.currentTime / pv.duration * 100 || 0) + '%';
	pl.querySelector('.pl-time').textContent = fmt(pv.currentTime);
});
pv.addEventListener('ended', () => openPlayer(cur + 1));
const toggle = () => (pv.paused ? pv.play() : pv.pause());
pv.addEventListener('click', toggle);
pl.querySelector('.pl-big').addEventListener('click', toggle);
pl.querySelector('.pl-play').addEventListener('click', toggle);
// volume: the slider and the mute button, remembered between videos and visits
const vol = pl.querySelector('.pl-vol');
try { const v = localStorage.getItem('hm-vol'); if (v !== null) vol.value = v; } catch (e) {}
const setVol = () => { pv.volume = +vol.value; pv.muted = +vol.value === 0; pl.classList.toggle('muted', pv.muted); vol.style.setProperty('--v', vol.value * 100 + '%'); try { localStorage.setItem('hm-vol', vol.value); } catch (e) {} };
vol.addEventListener('input', setVol);
setVol();
pl.querySelector('.pl-mute').addEventListener('click', () => { if (pv.muted || +vol.value === 0) { vol.value = vol.value > 0 ? vol.value : 0.6; pv.muted = false; pv.volume = +vol.value; vol.style.setProperty('--v', vol.value * 100 + '%'); } else pv.muted = true; pl.classList.toggle('muted', pv.muted); });
const seekTo = e => { const r = seek.getBoundingClientRect(); pv.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * pv.duration; };
seek.addEventListener('pointerdown', e => { seekTo(e); seek.setPointerCapture(e.pointerId); seek.onpointermove = seekTo; });
seek.addEventListener('pointerup', () => { seek.onpointermove = null; });
seek.addEventListener('keydown', e => { if (e.key === 'ArrowRight') pv.currentTime += 2; if (e.key === 'ArrowLeft') pv.currentTime -= 2; });
pl.querySelector('.prev').addEventListener('click', () => openPlayer(cur - 1));
pl.querySelector('.next').addEventListener('click', () => openPlayer(cur + 1));
pl.querySelector('.close').addEventListener('click', () => pl.close());
pl.addEventListener('click', e => { if (e.target === pl) pl.close(); });
pl.addEventListener('close', () => pv.pause());
pl.addEventListener('keydown', e => {
	if (e.key === 'ArrowDown') openPlayer(cur + 1);
	if (e.key === 'ArrowUp') openPlayer(cur - 1);
});
// swipe up / down between videos on phones, as on TikTok
let y0 = null;
pl.addEventListener('touchstart', e => { y0 = e.touches[0].clientY; }, { passive: true });
pl.addEventListener('touchend', e => {
	if (y0 === null) return;
	const d = e.changedTouches[0].clientY - y0;
	if (Math.abs(d) > 60) openPlayer(cur + (d < 0 ? 1 : -1));
	y0 = null;
});

// the hero reel plays only while on screen, and never for reduced motion
const reel = $('#hero-reel');
if (reel && !still && 'IntersectionObserver' in window) {
	new IntersectionObserver(([e]) => (e.isIntersecting ? reel.play().catch(() => {}) : reel.pause())).observe(reel);
}

// cards and notes rise in as they scroll into view (once; skipped for reduced motion)
if (!still && 'IntersectionObserver' in window) {
	const io = new IntersectionObserver(es => es.forEach(e => {
		if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
	}), { rootMargin: '0px 0px -8% 0px' });
	document.querySelectorAll('.cards article, .bugs figure, .video, .note').forEach((el, i) => {
		el.classList.add('rise');
		el.style.transitionDelay = (i % 6) * 60 + 'ms';
		io.observe(el);
	});
}

$('#notes').innerHTML = SITE.patchNotes.filter(n => !n.draft).map((n, i) => `
	<details class="note${i === 0 ? ' latest' : ''}"${i === 0 ? ' open' : ''}>
		<summary><time>${n.date}</time><h3>${esc(n.title)}</h3>${i === 0 ? '<span class="tag">latest</span>' : ''}</summary>
		${n.sections.map(s => `<h4>${esc(s.title)}</h4><ul>${s.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`).join('')}
	</details>`).join('');

// supporters: Super Citizens first, then everyone else; an empty list invites the first one
const sup = SITE.supporters;
$('#supporters').innerHTML = sup.superCitizens.length + sup.others.length === 0
	? '<p class="dim">No supporters yet. Be the first!</p>'
	: (sup.superCitizens.length ? `<h3>Super Citizens</h3><ul class="names super">${sup.superCitizens.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : '') +
	  (sup.others.length ? `<h3>Helldivers</h3><ul class="names">${sup.others.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : '');

// the stratagem wall: every icon the mod has, its name on hover
const ICONS = ['eagle_airstrike', 'orbital_precision_strike', 'resupply', 'machine_gun_sentry', 'expendable_anti_tank',
	'hellbomb', 'eagle_500kg_bomb', 'orbital_railcannon_strike', 'orbital_laser', 'eagle_cluster_bomb', 'eagle_napalm_airstrike',
	'eagle_strafing_run', 'eagle_110mm_rocket_pods', 'eagle_smoke_strike', 'orbital_120mm_barrage', 'orbital_380mm_barrage',
	'orbital_walking_barrage', 'orbital_gatling_barrage', 'orbital_airburst_strike', 'orbital_napalm_barrage', 'orbital_gas_strike',
	'orbital_ems_strike', 'orbital_smoke_strike', 'gatling_sentry', 'autocannon_sentry', 'rocket_sentry', 'mortar_sentry',
	'ems_mortar_sentry', 'gas_mortar_sentry', 'flame_sentry', 'laser_sentry', 'tesla_tower', 'hmg_emplacement',
	'anti_personnel_minefield', 'shield_generator_pack', 'supply_pack', 'warp_pack', 'hover_pack', 'jump_pack',
	'ballistic_shield', 'directional_shield', 'hellbomb_pack', 'guard_dog', 'guard_dog_rover', 'guard_dog_k9',
	'guard_dog_hot_dog', 'guard_dog_breath', 'machine_gun', 'flamethrower', 'sterilizer', 'arc_thrower', 'laser_cannon',
	'one_true_flag', 'seaf_artillery', 'incendiary_mines', 'anti_tank_mines', 'gas_mines', 'shield_generator_relay',
	'anti_tank_emplacement', 'grenadier_battlement'];
$('#icons').innerHTML = ICONS.map(i => `<img src="media/icons/${i}.png" width="64" height="64" alt="${i.replace(/_/g, ' ')}" title="${i.replace(/_/g, ' ')}" loading="lazy">`).join('');
$('#icon-count').textContent = ICONS.length;

// the bug photos: a click opens the full-size one; a click anywhere, Esc or the cross closes it
const box = document.getElementById('lightbox');
if (box) {
	const big = box.querySelector('img');
	for (const b of document.querySelectorAll('.zoom')) {
		b.addEventListener('click', () => { big.src = b.dataset.big; big.alt = b.querySelector('img').alt; box.showModal(); });
	}
	box.addEventListener('click', () => box.close());
}
