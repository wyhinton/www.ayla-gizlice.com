
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/api" | "/api/image-proxy" | "/[slug]";
		RouteParams(): {
			"/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about": Record<string, never>;
			"/api": Record<string, never>;
			"/api/image-proxy": Record<string, never>;
			"/[slug]": { slug: string }
		};
		Pathname(): "/" | "/about" | "/about/" | "/api" | "/api/" | "/api/image-proxy" | "/api/image-proxy/" | `/${string}` & {} | `/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/data/arrow_upward-24px.svg" | "/data/highlight_off-24px.svg" | "/data/introVideo 6.mp4" | "/data/introVideo.mp4" | "/data/menu-24px.svg" | "/data/OGImage.webp" | "/favicon/android-chrome-192x192.png" | "/favicon/android-chrome-512x512.png" | "/favicon/apple-touch-icon.png" | "/favicon/browserconfig.xml" | "/favicon/favicon-16x16.png" | "/favicon/favicon-32x32.png" | "/favicon/favicon.ico" | "/favicon/mstile-144x144.png" | "/favicon/mstile-150x150.png" | "/favicon/mstile-310x150.png" | "/favicon/mstile-310x310.png" | "/favicon/mstile-70x70.png" | "/favicon/safari-pinned-tab.svg" | "/favicon/site.webmanifest" | "/fonts/PragatiNarrow-Regular.ttf" | "/images/close.png" | "/images/loading.gif" | "/images/next.png" | "/images/ooo.png" | "/images/prev.png" | string & {};
	}
}