// Everything Marek edits lives in SITE: the version, the patch notes, the links and the videos.
// Leave a link as '' and its button shows "coming soon" instead.
const SITE = {
	version: '0.1.0',
	stage: 'Pre-alpha',
	minecraft: 'Java Edition 26.2 (Fabric)',
	links: {
		youtube: 'https://www.youtube.com/@GoDu_v2',
		tiktok: 'https://www.tiktok.com/@godu_clips',
		kofi: 'https://ko-fi.com/mareklackowski',
		patreon: '',
	},
	// newest first; each video is media/videos/<id>.mp4 with <id>.jpg as its poster
	videos: [
		{ id: 'ep05', title: 'Terminids, part 1' },
		{ id: 'ep04', title: 'The Helldiver armour' },
		{ id: 'ep03', title: 'Machine Gun Sentry' },
		{ id: 'ep02', title: 'Eagle Airstrike' },
		{ id: 'ep01', title: 'I added Helldivers 2 to Minecraft' },
	],
	// newest first
	patchNotes: [
		// the next version, filled in as it is built (Marek, 2026-10-06): new changes go into this entry until 0.2.0 is out
		{ date: '2026-10-06', title: 'Version 0.2.0 (in progress)', items: [
			'The Shrieker and the Dragonroach now fly level instead of leaning into a constant turn.',
			'New stratagems: MD-I4 Incendiary Mines, MD-17 Anti-Tank Mines and MD-8 Gas Mines.',
			'All mines have new models and go off as soon as something touches them.',
			'A stratagem beacon stuck to an enemy now moves smoothly with it.',
			'Fixed flickering textures on Terminids.',
		] },
		{ date: '2026-10-05', title: 'One True Flag', items: [
			'New stratagem: CQC-1 One True Flag. Carry it on your back, hold it, or plant it in the ground.',
			'The flag works as a melee weapon with a forward thrust.',
			'Terminids and Automatons go for whoever carries the flag.',
			'Support weapons are now held the same way as the Liberator.',
		] },
		{ date: '2026-10-01', title: 'Flame, gas, arc and laser', items: [
			'FLAM-40 Flamethrower, TX-41 Sterilizer, ARC-3 Arc Thrower and LAS-98 Laser Cannon.',
			'Fire weapons leave burning ground and gas weapons leave a cloud, like in the game.',
		] },
		{ date: '2026-09-25', title: 'Enemies rebuilt from the game', items: [
			'All Terminids and Automatons rebuilt from the game files, at the same size as in Helldivers 2.',
			'Super Earth objectives: SEAF Artillery, SAM Site and radar, activated the same way as in the game.',
		] },
		{ date: '2026-09-15', title: 'Terminid infestation', items: [
			'A new biome with bug nests, patrols and samples to collect.',
			'Nest sizes and enemy counts follow the game’s difficulty levels.',
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

$('#videos').innerHTML = SITE.videos.map(v => `
	<figure class="video">
		<video src="media/videos/${v.id}.mp4" poster="media/videos/${v.id}.jpg" controls preload="none" playsinline></video>
		<figcaption>${esc(v.title)}</figcaption>
	</figure>`).join('');
// each video's first play counts as an event in GoatCounter
for (const v of document.querySelectorAll('#videos video')) {
	v.addEventListener('play', () => window.goatcounter && window.goatcounter.count({ path: 'play-' + v.src.split('/').pop().replace('.mp4', ''), event: true }), { once: true });
}

$('#notes').innerHTML = SITE.patchNotes.map((n, i) => `
	<article class="note${i === 0 ? ' latest' : ''}">
		<header><time>${n.date}</time><h3>${esc(n.title)}</h3>${i === 0 ? '<span class="tag">latest</span>' : ''}</header>
		<ul>${n.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
	</article>`).join('');

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
	'one_true_flag', 'seaf_artillery'];
$('#icons').innerHTML = ICONS.map(i => `<img src="media/icons/${i}.png" alt="${i.replace(/_/g, ' ')}" title="${i.replace(/_/g, ' ')}" loading="lazy">`).join('');
$('#icon-count').textContent = ICONS.length;
