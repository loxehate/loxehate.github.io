import { siteConfig } from "@/config";
import I18nKey from "@/i18n/i18nKey";
import { i18n } from "@/i18n/translation";
import type { ImmersiveReadingConfig } from "@/types/immersiveReadingConfig";
import { refreshSidebarStickyState } from "@/utils/grid-layout-utils";
import { isPostPage, TOCManager } from "@/utils/toc-utils";

if (typeof window.ImmersiveReading === "undefined") {
	window.ImmersiveReading = {
		btn: null,
		tocBtn: null,
		toc: null,
		manager: null,
		prevScroll: 0,
		isImmersive: false,
	};
}

const IR = window.ImmersiveReading;

function clampContentTop(): void {
	const panel = document.querySelector<HTMLElement>(".content-panel");
	if (!panel) return;
	panel.style.setProperty("top", "1rem", "important");
	panel.style.setProperty("min-height", "calc(100vh - 1rem)", "important");
	panel.style.setProperty("--content-top", "1rem", "important");
}

function clearContentTop(): void {
	const panel = document.querySelector<HTMLElement>(".content-panel");
	if (!panel) return;
	panel.style.removeProperty("top");
	panel.style.removeProperty("min-height");
	panel.style.removeProperty("--content-top");
}

function isDesktop(): boolean {
	return window.innerWidth >= 1024;
}

function immersiveConfig(): ImmersiveReadingConfig {
	return (
		siteConfig.post.immersiveReading ?? {
			enable: true,
			defaultOn: false,
			tocEnabled: true,
			tocPosition: "left",
		}
	);
}

function setupImmersiveTOC(): void {
	const cfg = immersiveConfig();
	const content = document.getElementById("immersive-toc-content");
	if (cfg.tocEnabled !== false && content) {
		IR.tocBtn?.classList.remove("hide");
		IR.toc?.classList.add("open");
		IR.tocBtn?.classList.add("toggled");
		IR.tocBtn?.setAttribute("title", i18n(I18nKey.tocCollapse));
		document.body.classList.add("immersive-toc-open");
		try {
			if (IR.manager) IR.manager.cleanup();
			IR.manager = new TOCManager({
				contentId: "immersive-toc-content",
				indicatorId: "immersive-toc-indicator",
				maxLevel: 3,
				scrollOffset: 80,
			});
			IR.manager.attach();
		} catch (error) {
			console.error("Failed to init immersive TOC:", error);
		}
	} else {
		IR.tocBtn?.classList.add("hide");
		IR.toc?.classList.remove("open");
		IR.tocBtn?.classList.remove("toggled");
		IR.tocBtn?.setAttribute("title", i18n(I18nKey.tocExpand));
		document.body.classList.remove("immersive-toc-open");
	}
}

function enterImmersiveReading(): void {
	if (IR.isImmersive) return;
	if (!isPostPage() || !isDesktop()) return;
	IR.isImmersive = true;
	IR.prevScroll = window.scrollY;

	document.body.classList.add("immersive-reading");
	clampContentTop();
	const cfg = immersiveConfig();
	document.body.classList.toggle(
		"immersive-toc-right",
		cfg.tocPosition === "right",
	);

	IR.btn?.classList.remove("hide");
	IR.btn?.classList.add("toggled");
	IR.btn?.setAttribute("title", i18n(I18nKey.exitImmersiveReading));
	setupImmersiveTOC();
	window.scrollTo({ top: 0, behavior: "instant" });
	document.dispatchEvent(
		new CustomEvent("immersiveReadingChange", { detail: { on: true } }),
	);
}

function exitImmersiveReading(): void {
	if (!IR.isImmersive) return;
	IR.isImmersive = false;

	document.body.classList.remove("immersive-reading");
	document.body.classList.remove("immersive-toc-right");
	document.body.classList.remove("immersive-toc-open");
	clearContentTop();
	requestAnimationFrame(refreshSidebarStickyState);

	IR.manager?.cleanup();
	IR.manager = null;
	IR.btn?.classList.remove("toggled");
	IR.btn?.setAttribute("title", i18n(I18nKey.enterImmersiveReading));
	IR.tocBtn?.classList.add("hide");
	IR.tocBtn?.classList.remove("toggled");
	IR.tocBtn?.setAttribute("title", i18n(I18nKey.tocExpand));
	IR.toc?.classList.remove("open");
	updateImmersiveReadingVisibility();
	window.scrollTo({ top: IR.prevScroll || 0, behavior: "instant" });
	document.dispatchEvent(
		new CustomEvent("immersiveReadingChange", { detail: { on: false } }),
	);
}

function toggleImmersiveReading(): void {
	if (IR.isImmersive) exitImmersiveReading();
	else enterImmersiveReading();
}

function toggleImmersiveTOC(): void {
	if (!IR.isImmersive) return;
	const toc = IR.toc;
	if (!toc) return;
	const isOpen = toc.classList.contains("open");
	toc.classList.toggle("open", !isOpen);
	document.body.classList.toggle("immersive-toc-open", !isOpen);
	IR.tocBtn?.classList.toggle("toggled", !isOpen);
	IR.tocBtn?.setAttribute(
		"title",
		!isOpen ? i18n(I18nKey.tocCollapse) : i18n(I18nKey.tocExpand),
	);
}

function bindImmersiveTOCNav(): void {
	const tocContent = document.getElementById("immersive-toc-content");
	if (!tocContent) return;
	tocContent.addEventListener(
		"click",
		(e) => {
			const target = e.target as Element | null;
			const anchor = target?.closest('a[href^="#"]');
			if (anchor) window.tocInternalNavigation = true;
		},
		{ capture: true },
	);
}

function updateImmersiveReadingVisibility(): void {
	if (!IR.btn) return;
	const enabled = immersiveConfig().enable !== false;
	if (!enabled || !isPostPage() || !isDesktop()) {
		if (IR.isImmersive) exitImmersiveReading();
		IR.btn.classList.add("hide");
		IR.tocBtn?.classList.add("hide");
		return;
	}
	IR.btn.classList.remove("hide");
}

export function initImmersiveReading(): void {
	IR.btn = document.getElementById("immersive-reading-btn");
	IR.tocBtn = document.getElementById("immersive-toc-toggle-btn");
	IR.toc = document.getElementById("immersive-toc");
	bindImmersiveTOCNav();
	updateImmersiveReadingVisibility();
	if (IR.isImmersive) setupImmersiveTOC();

	const cfg = immersiveConfig();
	if (cfg.enable !== false && cfg.defaultOn && isPostPage()) {
		enterImmersiveReading();
	}

	if (!window.__immersiveReadingInit) {
		window.__immersiveReadingInit = true;
		document.addEventListener("swup:contentReplaced", () => {
			setTimeout(initImmersiveReading, 100);
		});
		document.addEventListener("astro:page-load", () => {
			setTimeout(initImmersiveReading, 100);
		});
		window.addEventListener("popstate", () => {
			setTimeout(initImmersiveReading, 200);
		});
		window.addEventListener("resize", updateImmersiveReadingVisibility);
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") exitImmersiveReading();
		});
		document.addEventListener("password:decrypted", () => {
			setTimeout(() => {
				if (!IR.isImmersive) return;
				IR.manager?.cleanup();
				IR.manager = new TOCManager({
					contentId: "immersive-toc-content",
					indicatorId: "immersive-toc-indicator",
					maxLevel: 3,
					scrollOffset: 80,
				});
				IR.manager.attach();
			}, 200);
		});
	}
}

window.toggleImmersiveReading = toggleImmersiveReading;
window.toggleImmersiveTOC = toggleImmersiveTOC;
window.enterImmersiveReading = enterImmersiveReading;
window.exitImmersiveReading = exitImmersiveReading;
