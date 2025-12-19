import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import Replicate from 'replicate';

const MODEL = 'google/nano-banana-pro';

const REFERENCE_IMAGE_PATH = path.join(process.cwd(), 'public', 'nikita.jpg.webp');

const coverArtists = [
	{
		key: 'mf-doom',
		artistId: 'poetify-artist-mf-doom',
		displayName: 'MF DOOM (cover)',
		genres: 'hip-hop, lo-fi',
		style:
			'dark underground hip-hop, gritty lighting, comic-book mood, lo-fi texture',
	},
	{
		key: 'nirvana',
		artistId: 'poetify-artist-nirvana',
		displayName: 'Nirvana (cover)',
		genres: 'rock, grunge',
		style: '90s grunge vibe, raw film look, distressed texture, moody lighting',
	},
	{
		key: 'janis',
		artistId: 'poetify-artist-janis',
		displayName: 'Janis Joplin (cover)',
		genres: 'blues, psychedelic rock',
		style: '60s psychedelic rock poster, warm tones, vintage print texture',
	},
	{
		key: 'queen',
		artistId: 'poetify-artist-queen',
		displayName: 'Queen (cover)',
		genres: 'classic rock, glam rock',
		style: '70s glam rock, dramatic studio lighting, rich color, regal mood',
	},
	{
		key: 'joy-division',
		artistId: 'poetify-artist-joy-division',
		displayName: 'Joy Division (cover)',
		genres: 'post-punk, alternative',
		style: 'minimal post-punk, high-contrast black-and-white, subtle noise',
	},
	{
		key: 'the-prodigy',
		artistId: 'poetify-artist-the-prodigy',
		displayName: 'The Prodigy (cover)',
		genres: 'electronic, breakbeat, rave',
		style: '90s rave energy, neon highlights, glitch accents, high contrast',
	},
	{
		key: 'feduk',
		artistId: 'poetify-artist-feduk',
		displayName: 'FEDUK (cover)',
		genres: 'hip-hop, pop',
		style: 'modern street portrait, clean background, stylish urban vibe',
	},
	{
		key: 'poetify',
		artistId: 'poetify-artist-poetify',
		displayName: 'Poetify (demo)',
		genres: 'demo',
		style: 'clean modern portrait, soft lighting, minimal background',
	},
];

const albumIdFromArtistId = (artistId) =>
	`poetify-album-${artistId.replace(/^poetify-artist-/, '')}`;

const buildArtistPortraitPrompt = (artist) =>
	`Create a square artist portrait for ${artist.displayName}. ` +
	`Use the provided reference image as the subject (Nikita) and keep his face recognizable. ` +
	`Style: ${artist.style}. ` +
	`No text, no watermarks, no brand logos.`;

const buildArtistAlbumCoverPrompt = (artist) => {
	const title = `POETIFY x ${artist.displayName.replace(/\s*\(cover\)\s*$/, '').replace(/\s*\(demo\)\s*$/, '')}`;
	return (
		`Design a square album cover for “${title}”. ` +
		`Use the provided reference image as the subject (Nikita) and keep his face recognizable. ` +
		`Genre/style: ${artist.genres}; ${artist.style}. ` +
		`Modern streaming-style album art, bold composition, tasteful grain. ` +
		`Include clean, subtle typography “${title}” and small “POETIFY”. ` +
		`No watermarks, no brand logos.`
	);
};

const trackCoverDefinitions = [
	{
		id: 'poetify-track-heart-shaped-box-cover',
		title: 'Heart-Shaped Box (cover by Nirvana)',
		artistId: 'poetify-artist-nirvana',
		motif: 'surreal heart-shaped box, raw grunge texture, moody shadows',
	},
	{
		id: 'poetify-track-moonlight-cover',
		title: 'Moonlight (XXXTENTACION cover by Nirvana)',
		artistId: 'poetify-artist-nirvana',
		motif: 'moonlit night, raw grunge texture, melancholic mood',
	},
	{
		id: 'poetify-track-revenge-cover',
		title: 'Revenge (XXXTENTACION cover by Nirvana)',
		artistId: 'poetify-artist-nirvana',
		motif: 'shattered neon, distressed typography, intense contrast',
	},
	{
		id: 'poetify-track-shimmy-cover',
		title: 'Shimmy Shimmy Ya (Ol’ Dirty Bastard cover by Janis Joplin)',
		artistId: 'poetify-artist-janis',
		motif: 'psychedelic swirls, vintage microphone, warm poster tones',
	},
	{
		id: 'poetify-track-all-along-the-watchtower-cover',
		title: 'All Along the Watchtower (Jimi Hendrix cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		motif: 'watchtower silhouette, stormy sky, comic-book halftone texture',
	},
	{
		id: 'poetify-track-blue-suede-shoes-cover',
		title: 'Blue Suede Shoes (Elvis Presley cover by The Prodigy)',
		artistId: 'poetify-artist-the-prodigy',
		motif: 'blue suede shoes, retro meets rave, neon edges',
	},
	{
		id: 'poetify-track-cry-baby-cover',
		title: 'Cry Baby (Janis Joplin cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		motif: 'teardrops, gritty collage, lo-fi comic textures',
	},
	{
		id: 'poetify-track-hippa-to-da-hoppa-cover',
		title: 'Hippa to Da Hoppa (Ol’ Dirty Bastard cover by Joy Division)',
		artistId: 'poetify-artist-joy-division',
		motif: 'minimal waveform lines, stark contrast, cold mood',
	},
	{
		id: 'poetify-track-i-love-rock-n-roll-cover',
		title: "I Love Rock ’n Roll (Joan Jett and the Blackhearts cover by MF DOOM)",
		artistId: 'poetify-artist-mf-doom',
		motif: 'electric guitar, stage lights, gritty halftone collage',
	},
	{
		id: 'poetify-track-i-want-it-that-way-cover',
		title: 'I Want It That Way (Backstreet Boys cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		motif: 'late-90s pop poster vibe, ironic collage, bold shapes',
	},
	{
		id: 'poetify-track-jamming-cover',
		title: 'Jamming (Bob Marley & The Wailers cover by Queen)',
		artistId: 'poetify-artist-queen',
		motif: 'warm sunset, subtle reggae colors, stadium grandeur',
	},
	{
		id: 'poetify-track-out-of-space-cover',
		title: 'Out of Space (The Prodigy cover by Queen)',
		artistId: 'poetify-artist-queen',
		motif: 'cosmic space scene, glam rock drama, rich color',
	},
	{
		id: 'poetify-track-rapp-snitch-knishes-cover',
		title: 'Rapp Snitch Knishes (MF DOOM cover by Janis Joplin)',
		artistId: 'poetify-artist-janis',
		motif: 'psychedelic comic collage, vintage print grain, bold shapes',
	},
	{
		id: 'poetify-track-riders-on-the-storm-cover',
		title: 'Riders on the Storm (The Doors cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		motif: 'rain, storm, car silhouette, gritty noir texture',
	},
	{
		id: 'poetify-track-were-rolling-suicide',
		title: 'We\'re rolling "Suicide" (System of a Down cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		motif: 'dark rolling motion, gritty collage, underground hip-hop mood',
	},
	{
		id: 'poetify-track-den-rozhdeniya-cover',
		title: 'День рождения (Birthday) (Ленинград cover by Janis Joplin)',
		artistId: 'poetify-artist-janis',
		motif: 'birthday cake meets psychedelic poster art, warm tones',
	},
	{
		id: 'poetify-track-intro-griby-cover-v2',
		title: 'Интро (Intro) (Грибы (Griby) cover by Nirvana) (v2)',
		artistId: 'poetify-artist-nirvana',
		motif: 'cassette tape intro, grunge texture, raw film mood',
	},
	{
		id: 'poetify-track-intro-griby-cover',
		title: 'Интро (Intro) (Грибы (Griby) cover by Nirvana)',
		artistId: 'poetify-artist-nirvana',
		motif: 'raw rehearsal vibe, distressed texture, moody lighting',
	},
	{
		id: 'poetify-track-okolofutbola',
		title: 'Околофутбола (Near Football)',
		artistId: 'poetify-artist-feduk',
		motif: 'street football energy, city night lights, bold modern shapes',
	},
];

const buildTrackCoverPrompt = (track) => {
	const artist = coverArtists.find((a) => a.artistId === track.artistId);
	if (!artist) {
		throw new Error(`Missing artist style for track ${track.id} (${track.artistId})`);
	}

	return (
		`Design a square single cover for “${track.title}” on POETIFY. ` +
		`Use the provided reference image as the subject (Nikita) and keep his face recognizable. ` +
		`Cover style inspired by ${artist.displayName} (${artist.genres}): ${artist.style}. ` +
		`Incorporate motifs: ${track.motif}. ` +
		`Modern streaming-style cover, strong composition, no Spotify branding. ` +
		`Include small text “POETIFY” only. ` +
		`No watermarks, no brand logos.`
	);
};

const jobs = [
	{
		id: 'login-bg',
		outPath: path.join(process.cwd(), 'public', 'assets', 'login-bg.jpg'),
		aspect_ratio: '16:9',
		prompt:
			'Create a cinematic website login background for a Spotify-like app called POETIFY. ' +
			'Use the provided reference image as the subject (Nikita) and keep his face recognizable. ' +
			'Add subtle bold typography that says “POETIFY” (clean, modern, high-contrast). ' +
			'Moody lighting, music-themed vibe, tasteful grain, no watermarks, no brand logos.',
	},
	{
		id: 'brand-album-cover',
		outPath: path.join(
			process.cwd(),
			'public',
			'assets',
			'covers',
			'demo-album-nikita.jpg'
		),
		aspect_ratio: '1:1',
		prompt:
			'Design a square cover image for “for Nikita’s Birthday” (POETIFY). ' +
			'Use the provided reference image as the subject (Nikita) and keep his face recognizable. ' +
			'Modern Spotify-style album art, bold composition, music collage elements, ' +
			'include small text “POETIFY” and “for Nikita’s Birthday”, no watermarks, no brand logos.',
	},
	{
		id: 'playlist-cover',
		outPath: path.join(
			process.cwd(),
			'public',
			'assets',
			'covers',
			'demo-playlist.jpg'
		),
		aspect_ratio: '1:1',
		prompt:
			'Design a square playlist cover image for POETIFY. ' +
			'Use the provided reference image as the subject (Nikita) and keep his face recognizable. ' +
			'Clean, modern, high-contrast, music-themed, include small text “POETIFY”, ' +
			'no watermarks, no brand logos.',
	},
	...coverArtists.flatMap((artist) => {
		const albumId = albumIdFromArtistId(artist.artistId);
		return [
			{
				id: `artist-album-${artist.key}`,
					outPath: path.join(
						process.cwd(),
						'public',
						'assets',
						'covers',
						'albums',
						`${albumId}.jpg`
					),
				aspect_ratio: '1:1',
				prompt: buildArtistAlbumCoverPrompt(artist),
			},
			{
				id: `artist-portrait-${artist.key}`,
					outPath: path.join(
						process.cwd(),
						'public',
						'assets',
						'artists',
						`${artist.artistId}.jpg`
					),
				aspect_ratio: '1:1',
				prompt: buildArtistPortraitPrompt(artist),
			},
		];
	}),
	...trackCoverDefinitions.map((track) => ({
		id: `track-cover-${track.id}`,
			outPath: path.join(
				process.cwd(),
				'public',
				'assets',
				'covers',
				'tracks',
				`${track.id}.jpg`
			),
		aspect_ratio: '1:1',
		prompt: buildTrackCoverPrompt(track),
	})),
];

const loadEnvFromFiles = async () => {
	const candidates = ['.env.local', '.env'];

	for (const candidate of candidates) {
		try {
			const envPath = path.join(process.cwd(), candidate);
			const contents = await readFile(envPath, 'utf8');
			for (const rawLine of contents.split(/\r?\n/)) {
				const line = rawLine.trim();
				if (!line || line.startsWith('#')) {
					continue;
				}

				const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
				if (!match) {
					continue;
				}

				const [, key, rawValue] = match;
				if (!key || process.env[key]) {
					continue;
				}

				let value = rawValue.trim();
				if (
					(value.startsWith('"') && value.endsWith('"')) ||
					(value.startsWith("'") && value.endsWith("'"))
				) {
					value = value.slice(1, -1);
				}
				process.env[key] = value;
			}
		} catch {
			// Ignore missing/unreadable env files.
		}
	}
};

const ensureDirectories = async () => {
	const dirs = new Set(jobs.map((job) => path.dirname(job.outPath)));
	await Promise.all([...dirs].map((dir) => mkdir(dir, { recursive: true })));
};

const getArgValue = (flag) => {
	const idx = process.argv.indexOf(flag);
	if (idx === -1) {
		return null;
	}
	return process.argv[idx + 1] ?? null;
};

const getSelectedJobs = () => {
	const filterValue = getArgValue('--filter');
	if (!filterValue) {
		return jobs;
	}

	let filter;
	try {
		filter = new RegExp(filterValue);
	} catch (err) {
		throw new Error(`Invalid --filter regex: ${filterValue}\n${err}`);
	}

	const selected = jobs.filter((job) => filter.test(job.id));
	if (selected.length === 0) {
		throw new Error(`No jobs matched --filter ${filterValue}`);
	}
	return selected;
};

const resolveFileOutput = (output) => {
	if (Array.isArray(output)) {
		return output[0];
	}
	return output;
};

const isSensitiveFlagError = (err) =>
	err instanceof Error &&
	/flagged as sensitive/i.test(err.message);

const PROMPT_SAFETY_SUFFIX =
	' Fully clothed. Head-and-shoulders framing. Non-sexual, no nudity, no lingerie, no suggestive content. No violence, no gore.';

const writeOutputFile = async (outPath, output) => {
	const fileOutput = resolveFileOutput(output);

	if (typeof fileOutput === 'string') {
		const response = await fetch(fileOutput);
		if (!response.ok) {
			throw new Error(`Failed to download output: ${response.status}`);
		}
		const arrayBuffer = await response.arrayBuffer();
		await writeFile(outPath, Buffer.from(arrayBuffer));
		return;
	}

	if (fileOutput && typeof fileOutput.blob === 'function') {
		const blob = await fileOutput.blob();
		const arrayBuffer = await blob.arrayBuffer();
		await writeFile(outPath, Buffer.from(arrayBuffer));
		return;
	}

	await writeFile(outPath, fileOutput);
};

const main = async () => {
	await loadEnvFromFiles();

	if (!process.env.REPLICATE_API_TOKEN) {
		console.error(
			'Missing REPLICATE_API_TOKEN. Set it in your environment (or in .env.local) before running this script.'
		);
		process.exit(1);
	}

	await ensureDirectories();
	const selectedJobs = getSelectedJobs();

	const replicate = new Replicate();
	const referenceBuffer = await readFile(REFERENCE_IMAGE_PATH);
	const referenceFile = await replicate.files.create(referenceBuffer);
	const referenceUrl = referenceFile?.urls?.get;

	if (!referenceUrl) {
		throw new Error('Failed to upload reference image to Replicate.');
	}

	const failures = [];

	for (const job of selectedJobs) {
		console.log(`[replicate] Generating ${job.id} -> ${path.relative(process.cwd(), job.outPath)}`);
		const promptVariants = [
			job.prompt,
			`${job.prompt} ${PROMPT_SAFETY_SUFFIX}`,
			`${job.prompt} ${PROMPT_SAFETY_SUFFIX} Stylized illustration, not photorealistic.`,
		];

		let lastErr = null;

		for (let attempt = 0; attempt < promptVariants.length; attempt++) {
			try {
				const input = {
					prompt: promptVariants[attempt],
					image_input: [referenceUrl],
					aspect_ratio: job.aspect_ratio,
					output_format: 'jpg',
					resolution: '2K',
					safety_filter_level: 'block_only_high',
				};

				const output = await replicate.run(MODEL, { input });
				await writeOutputFile(job.outPath, output);
				lastErr = null;
				break;
			} catch (err) {
				lastErr = err;
				if (!isSensitiveFlagError(err)) {
					throw err;
				}
				console.warn(
					`[replicate] Sensitive flag for ${job.id} (attempt ${attempt + 1}/${promptVariants.length}); retrying with safer prompt...`
				);
			}
		}

		if (lastErr) {
			console.error(`[replicate] Failed to generate ${job.id} after retries.`);
			failures.push({ id: job.id, outPath: job.outPath, error: lastErr });
		}
	}

	if (failures.length > 0) {
		console.error('[replicate] Some images failed to generate:');
		for (const failure of failures) {
			console.error(
				`- ${failure.id} -> ${path.relative(process.cwd(), failure.outPath)}`
			);
		}
		process.exit(1);
	}

	console.log('[replicate] Done.');
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
