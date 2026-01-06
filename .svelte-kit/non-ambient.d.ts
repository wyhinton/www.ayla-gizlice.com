
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
		RouteId(): "/" | "/about";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/about": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/about/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/data/arrow_upward-24px.svg" | "/data/highlight_off-24px.svg" | "/data/HOME_VIDEO_LOOPED.webm" | "/data/introVideo.mp4" | "/data/menu-24px.svg" | "/data/OGImage.webp" | "/favicon/android-chrome-192x192.png" | "/favicon/android-chrome-512x512.png" | "/favicon/apple-touch-icon.png" | "/favicon/browserconfig.xml" | "/favicon/favicon-16x16.png" | "/favicon/favicon-32x32.png" | "/favicon/favicon.ico" | "/favicon/mstile-144x144.png" | "/favicon/mstile-150x150.png" | "/favicon/mstile-310x150.png" | "/favicon/mstile-310x310.png" | "/favicon/mstile-70x70.png" | "/favicon/safari-pinned-tab.svg" | "/favicon/site.webmanifest" | "/fonts/PragatiNarrow-Regular.ttf" | "/images/artworks/Clay_Carpet_Picture_Large_1.webp" | "/images/artworks/Clay_Carpet_Picture_Large_2.webp" | "/images/artworks/Clay_Carpet_Picture_Large_3.webp" | "/images/artworks/Conversation_Piece_Picture_Large_1.webp" | "/images/artworks/Cukurova_Street_View_Picture_Large_1.webp" | "/images/artworks/Cukurova_Street_View_Picture_Large_2.webp" | "/images/artworks/Cukurova_Street_View_Picture_Large_3.webp" | "/images/artworks/Interpersonal_Protest_Picture_Large_1.webp" | "/images/artworks/Interpersonal_Protest_Picture_Large_2.webp" | "/images/artworks/Kilim_Kite_Picture_Large_1.webp" | "/images/artworks/Kilim_Kite_Picture_Large_2.webp" | "/images/artworks/Kudzu_Cooking_Class_Picture_Large_1.webp" | "/images/artworks/Kudzu_Cooking_Class_Picture_Large_2.webp" | "/images/artworks/Kudzu_Cooking_Class_Picture_Large_3.webp" | "/images/artworks/Locus_Picture_Large_1.webp" | "/images/artworks/Locus_Picture_Large_2.webp" | "/images/artworks/Locus_Picture_Large_3.webp" | "/images/artworks/Map_of_Fish_Kill_Events_in_the_Jordan_Lake_Watershed,_1997-2018_Picture_Large_1.webp" | "/images/artworks/Map_of_Fish_Kill_Events_in_the_Jordan_Lake_Watershed,_1997-2018_Picture_Large_2.webp" | "/images/artworks/Map_of_Fish_Kill_Events_in_the_Jordan_Lake_Watershed,_1997-2018_Picture_Large_3.webp" | "/images/artworks/Migratory_Olive_Orchard_Picture_Large_1.webp" | "/images/artworks/Migratory_Olive_Orchard_Picture_Large_2.webp" | "/images/artworks/Migratory_Olive_Orchard_Picture_Large_3.webp" | "/images/artworks/Nesting_Anthracite_Picture_Large_1.webp" | "/images/artworks/Nesting_Anthracite_Picture_Large_2.webp" | "/images/artworks/Of_Primary_Concern_is_the_Possible_Eutrophic_Tendency_of_the_Lake_Picture_Large_1.webp" | "/images/artworks/Of_Primary_Concern_is_the_Possible_Eutrophic_Tendency_of_the_Lake_Picture_Large_2.webp" | "/images/artworks/Provisional_Support_Structure_(Husband_#1)_Picture_Large_1.webp" | "/images/artworks/Provisional_Support_Structure_(Husband_#1)_Picture_Large_2.webp" | "/images/artworks/Provisional_Support_Structure_(Husband_#2)_Picture_Large_1.webp" | "/images/artworks/Provisional_Support_Structure_(Husband_#3)_Picture_Large_1.webp" | "/images/artworks/Provisional_Support_Structure_(Husband_#3)_Picture_Large_2.webp" | "/images/artworks/Raw_Clay_Samples_Picture_Large_1.webp" | "/images/artworks/Raw_Clay_Samples_Picture_Large_2.webp" | "/images/artworks/Rumble_Rubble_Rattle__Picture_Large_1.webp" | "/images/artworks/Rumble_Rubble_Rattle__Picture_Large_2.webp" | "/images/artworks/Rumble_Rubble_Rattle__Picture_Large_3.webp" | "/images/artworks/Rumble_Rubble_Rattle__Picture_Large_4.webp" | "/images/artworks/Rumble_Rubble_Rattle__Picture_Large_5.webp" | "/images/artworks/Rumble_Rubble_Rattle__Picture_Large_6.webp" | "/images/artworks/Rumble_Rubble_Rattle__Picture_Large_7.webp" | "/images/artworks/Strike-Slip_(A_Conversation_Between_Tectonic_Plates)_Picture_Large_1.webp" | "/images/artworks/The_Woman_With_Three_Husbands_Picture_Large_1.webp" | "/images/artworks/Water_Book_Picture_Large_1.webp" | "/images/artworks/Whisper_Conductor_(Mouth_to_Ear)_Picture_Large_1.webp" | "/images/artworks/Whisper_Conductor_(Mouth_to_Ear)_Picture_Large_2.webp" | "/images/artworks/Whisper_Conductor_(Mouth_to_Genitals)_Picture_Large_1.webp" | "/images/artworks/Worm's_Eye_View_of_the_Peanut_Field_Picture_Large_1.webp" | "/images/artworks/Worm's_Eye_View_of_the_Peanut_Field_Picture_Large_2.webp" | "/images/artworks/Çukurova_Plain_Picture_Large_1.webp" | "/images/close.png" | "/images/loading.gif" | "/images/next.png" | "/images/ooo.png" | "/images/prev.png" | string & {};
	}
}