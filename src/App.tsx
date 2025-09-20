// ---------------- App.tsx ----------------
import React, { useState } from "react";
import "./App.css";

type Onglet = "studio" | "multicam" | "scenes" | "settings";

function App() {
	const [activeTab, setActiveTab] = useState<Onglet>("studio");

	return (
		<div className="app-container">
			<header className="navbar">
				<div className="brand">
					<div className="logo">Castor</div>
					<div className="subtitle">Mockup</div>
				</div>

				<nav>
					<button
						className={activeTab === "studio" ? "active" : ""}
						onClick={() => setActiveTab("studio")}
					>
						Studio
					</button>
					<button
						className={activeTab === "multicam" ? "active" : ""}
						onClick={() => setActiveTab("multicam")}
					>
						Multicam
					</button>
					<button
						className={activeTab === "scenes" ? "active" : ""}
						onClick={() => setActiveTab("scenes")}
					>
						Scènes
					</button>
					<button
						className={activeTab === "settings" ? "active" : ""}
						onClick={() => setActiveTab("settings")}
					>
						Paramètres
					</button>
				</nav>
			</header>

			<main className="main-content">
				{activeTab === "studio" && <Studio />}
				{activeTab === "multicam" && <Multicam />}
				{activeTab === "scenes" && <Scenes />}
				{activeTab === "settings" && <Settings />}
			</main>
		</div>
	);
}

// ---------------- Studio ----------------
function Studio() {
	return (
		<div className="studio-layout">
			<aside className="sidebar left">
				<h3>Scène active</h3>
				<div className="panel small">Scène par défaut</div>

				<h3>Audio</h3>
				<div className="panel">
					<AudioEntry nom="Micro principal" />
					<AudioEntry nom="Musique" />
					<AudioEntry nom="Commentaire" />
				</div>
			</aside>

			<section className="preview-area">
				<div className="preview-panel panel">
					<div className="preview-screen">Prévisualisation</div>
				</div>

				<div className="preview-toolbar">
					<div className="status">
						<span className="dot offline" />
						<span>Hors ligne</span>
					</div>

					<div className="controls">
						<button className="go-live">Mettre en direct</button>
						<button className="record">Enregistrer</button>
					</div>
				</div>

				<div className="transitions panel small" style={{ marginTop: 16 }}>
					<strong>Transition : </strong>
					<button>Fondu</button>
					<button>Coupe</button>
					<button>Glissée</button>
				</div>
			</section>
		</div>
	);
}

// ---------------- Multicam ----------------
function Multicam() {
	const cameras = Array.from({ length: 11 }, (_, i) => `Caméra ${i + 1}`);
	const audios = ["Micro 1", "Micro 2", "Micro 3", "Micro 4", "Micro 5"];
	const [selectedCam, setSelectedCam] = useState(cameras[0]);
	const [volumes, setVolumes] = useState(audios.map(() => 50));
	const [mutes, setMutes] = useState(audios.map(() => false));

	const toggleMute = (index: number) => {
		setMutes((prev) => prev.map((m, i) => (i === index ? !m : m)));
	};

	const setVolume = (index: number, value: number) => {
		setVolumes((prev) => prev.map((v, i) => (i === index ? value : v)));
	};

	return (
		<div
			className="multicam-layout"
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				width: "100%",
			}}
		>
			{/* Top: Cams + Preview */}
			<div style={{ display: "flex", flex: 2, gap: 12, padding: 12 }}>
				{/* Caméras */}
				<div
					style={{
						flex: 3,
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: 8,
					}}
				>
					{cameras.map((cam) => (
						<div
							key={cam}
							className="template"
							style={{
								cursor: "pointer",
								height: 120,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								background:
									selectedCam === cam
										? "var(--accent-solid)"
										: "rgba(255,255,255,0.02)",
							}}
							onClick={() => setSelectedCam(cam)}
						>
							{cam}
						</div>
					))}
				</div>

				{/* Preview */}
				<div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
					<div
						className="panel"
						style={{
							flex: 1,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div className="preview-screen">
							{selectedCam} - Prévisualisation
						</div>
					</div>
				</div>
			</div>

			{/* Bottom: Audio */}
			<div style={{ flex: 1, padding: 12, minHeight: 200 }}>
				<div
					className="panel"
					style={{ height: "100%", overflowY: "auto", padding: 12 }}
				>
					<h3>Mix Audio</h3>
					{audios.map((audio, i) => (
						<div
							key={audio}
							style={{
								marginBottom: 12,
								paddingBottom: 8,
								borderBottom: "1px solid rgba(255,255,255,0.2)",
							}}
						>
							<strong>{audio}</strong>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									marginTop: 4,
								}}
							>
								<input
									type="range"
									min={0}
									max={100}
									value={volumes[i]}
									onChange={(e) => setVolume(i, Number(e.target.value))}
									style={{ flex: 1 }}
								/>
								<button onClick={() => toggleMute(i)}>
									{mutes[i] ? "🔇" : "🔊"}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// ---------------- Scènes ----------------
function Scenes() {
	const scenes = [
		"Scène de démarrage",
		"Scène de pause",
		"Scène finale",
		"Scène commentateurs",
		"Scène gameplay",
	];

	return (
		<div className="scenes panel">
			<h2>Galerie de Scènes</h2>
			<div className="list">
				{scenes.map((s) => (
					<button key={s} className="template">
						{s}
					</button>
				))}
			</div>
		</div>
	);
}

// ---------------- Paramètres ----------------
function Settings() {
	return (
		<div className="settings panel">
			<h2>Paramètres</h2>

			<label>
				Chemin d’enregistrement :
				<input type="text" defaultValue="C:/Videos" />
			</label>

			<label>
				Qualité vidéo :
				<select defaultValue="Standard">
					<option>Basique</option>
					<option>Standard</option>
					<option>Pro</option>
				</select>
			</label>

			<label>
				Paramètres streaming :
				<input type="text" defaultValue="rtmp://serveur.exemple/live" />
			</label>
		</div>
	);
}

// ---------------- AudioEntry ----------------
function AudioEntry({ nom }: { nom: string }) {
	const [volume, setVolume] = useState(50);
	const [mute, setMute] = useState(false);

	return (
		<div className="panel small" style={{ marginBottom: 8 }}>
			<strong>{nom}</strong>
			<div
				style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}
			>
				<input
					type="range"
					min={0}
					max={100}
					value={volume}
					onChange={(e) => setVolume(Number(e.target.value))}
					style={{ flex: 1 }}
				/>
				<button onClick={() => setMute(!mute)}>
					{mute ? "Unmute" : "Mute"}
				</button>
			</div>
		</div>
	);
}

export default App;
