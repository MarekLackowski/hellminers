// Everything Marek edits lives in SITE: the version, the patch notes, the links and the videos.
// Leave a link as '' and its button shows "coming soon" instead.
const SITE = {
	version: '0.2.0',
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
		{ date: '2026-10-07', title: 'Version 0.3.0', sections: [
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
		${n.sections.map(s => `<h4>${esc(s.title)}</h4><ul>${s.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`).join('')}
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
	'one_true_flag', 'seaf_artillery', 'incendiary_mines', 'anti_tank_mines', 'gas_mines', 'shield_generator_relay',
	'anti_tank_emplacement', 'grenadier_battlement'];
$('#icons').innerHTML = ICONS.map(i => `<img src="media/icons/${i}.png" alt="${i.replace(/_/g, ' ')}" title="${i.replace(/_/g, ' ')}" loading="lazy">`).join('');
$('#icon-count').textContent = ICONS.length;
