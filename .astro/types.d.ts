declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"episodes": {
"01-missing-tombstone.mdoc": {
	id: "01-missing-tombstone.mdoc";
  slug: "01-missing-tombstone";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"02-rpi.mdoc": {
	id: "02-rpi.mdoc";
  slug: "02-rpi";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"03-vale.mdoc": {
	id: "03-vale.mdoc";
  slug: "03-vale";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"04-hexenmeister.mdoc": {
	id: "04-hexenmeister.mdoc";
  slug: "04-hexenmeister";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"05-union-hotel.mdoc": {
	id: "05-union-hotel.mdoc";
  slug: "05-union-hotel";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"06-kinderhook-creature.mdoc": {
	id: "06-kinderhook-creature.mdoc";
  slug: "06-kinderhook-creature";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"07-gmoneless.mdoc": {
	id: "07-gmoneless.mdoc";
  slug: "07-gmoneless";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"08-aruba.mdoc": {
	id: "08-aruba.mdoc";
  slug: "08-aruba";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"09-vampires.mdoc": {
	id: "09-vampires.mdoc";
  slug: "09-vampires";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"10-saratoga-witch.mdoc": {
	id: "10-saratoga-witch.mdoc";
  slug: "10-saratoga-witch";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"11-stone-chambers.mdoc": {
	id: "11-stone-chambers.mdoc";
  slug: "11-stone-chambers";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"12-rolling-hills.mdoc": {
	id: "12-rolling-hills.mdoc";
  slug: "12-rolling-hills";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"13-dr-best.mdoc": {
	id: "13-dr-best.mdoc";
  slug: "13-dr-best";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"14-cropsey.mdoc": {
	id: "14-cropsey.mdoc";
  slug: "14-cropsey";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"15-ouija.mdoc": {
	id: "15-ouija.mdoc";
  slug: "15-ouija";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"16-jersey-devil.mdoc": {
	id: "16-jersey-devil.mdoc";
  slug: "16-jersey-devil";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"17-ufo-bigfoot.mdoc": {
	id: "17-ufo-bigfoot.mdoc";
  slug: "17-ufo-bigfoot";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"18-halloween-2023.mdoc": {
	id: "18-halloween-2023.mdoc";
  slug: "18-halloween-2023";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"19-skinwalkers.mdoc": {
	id: "19-skinwalkers.mdoc";
  slug: "19-skinwalkers";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"20-paranormal-technology.mdoc": {
	id: "20-paranormal-technology.mdoc";
  slug: "20-paranormal-technology";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"21-santa.mdoc": {
	id: "21-santa.mdoc";
  slug: "21-santa";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"22-fairy-census.mdoc": {
	id: "22-fairy-census.mdoc";
  slug: "22-fairy-census";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"23-captain-kidd.mdoc": {
	id: "23-captain-kidd.mdoc";
  slug: "23-captain-kidd";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"24-mantis-man.mdoc": {
	id: "24-mantis-man.mdoc";
  slug: "24-mantis-man";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"25-chris.mdoc": {
	id: "25-chris.mdoc";
  slug: "25-chris";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"26-loch-ness.mdoc": {
	id: "26-loch-ness.mdoc";
  slug: "26-loch-ness";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"27-yokai.mdoc": {
	id: "27-yokai.mdoc";
  slug: "27-yokai";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"28-deals-with-devil.mdoc": {
	id: "28-deals-with-devil.mdoc";
  slug: "28-deals-with-devil";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"29-black-eyed-kids.mdoc": {
	id: "29-black-eyed-kids.mdoc";
  slug: "29-black-eyed-kids";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
"30-women-in-white.mdoc": {
	id: "30-women-in-white.mdoc";
  slug: "30-women-in-white";
  body: string;
  collection: "episodes";
  data: InferEntrySchema<"episodes">
} & { render(): Render[".mdoc"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
