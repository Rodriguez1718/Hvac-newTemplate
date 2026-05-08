var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { escape } from "html-escaper";
import { Traverse } from "neotraverse/modern";
import pLimit from "p-limit";
import { z } from "zod";
import { A as AstroError, U as UnknownContentCollectionError, a as createComponent, R as RenderUndefinedEntryError, u as unescapeHTML, r as renderTemplate, e as renderUniqueStylesheet, f as renderScriptElement, g as createHeadAndContent, d as renderComponent, c as createAstro, b as addAttribute, h as renderScript, m as maybeRenderHead, F as Fragment, i as renderSlot, j as renderHead } from "./astro/server-DD07jsDe.js";
import "piccolore";
import * as devalue from "devalue";
import "clsx";
/* empty css                         */
import { s as siteConfig, g as getLocationText, $ as $$PopupModal, a as $$FreeScanButton } from "./ui-components-CfisT9gJ.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i) => {
    if (i === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
function isRemotePath(src) {
  if (!src) return false;
  const trimmed = src.trim();
  if (!trimmed) return false;
  let decoded = trimmed;
  let previousDecoded = "";
  let maxIterations = 10;
  while (decoded !== previousDecoded && maxIterations > 0) {
    previousDecoded = decoded;
    try {
      decoded = decodeURIComponent(decoded);
    } catch {
      break;
    }
    maxIterations--;
  }
  if (/^[a-zA-Z]:/.test(decoded)) {
    return false;
  }
  if (decoded[0] === "/" && decoded[1] !== "/" && decoded[1] !== "\\") {
    return false;
  }
  if (decoded[0] === "\\") {
    return true;
  }
  if (decoded.startsWith("//")) {
    return true;
  }
  try {
    const url = new URL(decoded, "http://n");
    if (url.username || url.password) {
      return true;
    }
    if (decoded.includes("@") && !url.pathname.includes("@") && !url.search.includes("@")) {
      return true;
    }
    if (url.origin !== "http://n") {
      const protocol = url.protocol.toLowerCase();
      if (protocol === "file:") {
        return false;
      }
      return true;
    }
    if (URL.canParse(decoded)) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}
function removeBase(path, base) {
  if (path.startsWith(base)) {
    return path.slice(removeTrailingForwardSlash(base).length);
  }
  return path;
}
const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position",
  "background"
];
function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}
class ImmutableDataStore {
  constructor() {
    __publicField(this, "_collections", /* @__PURE__ */ new Map());
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import("./_astro_data-layer-content-CHfj8Ntj.js");
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();
const __vite_import_meta_env__ = { "ASSETS_PREFIX": void 0, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://acmeinc.com", "SSR": true };
function createCollectionToGlobResultMap({
  globResult,
  contentDir: contentDir2
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir2}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ?? (collectionToGlobResultMap[collection] = {});
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  contentCollectionToEntryMap: contentCollectionToEntryMap2,
  dataCollectionToEntryMap: dataCollectionToEntryMap2,
  getRenderEntryImport,
  cacheEntriesByCollection: cacheEntriesByCollection2,
  liveCollections: liveCollections2
}) {
  return async function getCollection2(collection, filter) {
    if (collection in liveCollections2) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap2) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap2) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import("./content-assets-CPbsr5sg.js");
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap2[collection] : dataCollectionToEntryMap2[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { Path: process.env.Path })?.DEV && cacheEntriesByCollection2.has(collection)) {
      entries = cacheEntriesByCollection2.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection2.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport,
  collectionNames: collectionNames2,
  liveCollections: liveCollections2
}) {
  return async function getEntry2(collectionOrLookupObject, lookup) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!lookup)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = lookup;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    if (collection in liveCollections2) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
      });
    }
    if (typeof lookupId === "object") {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `The entry identifier must be a string. Received object.`
      });
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const entry2 = store.get(collection, lookupId);
      if (!entry2) {
        console.warn(`Entry ${collection} → ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await import("./content-assets-CPbsr5sg.js");
      entry2.data = updateImageReferencesInData(entry2.data, entry2.filePath, imageAssetMap);
      if (entry2.legacyId) {
        return emulateLegacyEntry({ ...entry2, collection });
      }
      return {
        ...entry2,
        collection
      };
    }
    if (!collectionNames2.has(collection)) {
      console.warn(
        `The collection ${JSON.stringify(collection)} does not exist. Please ensure it is defined in your content config.`
      );
      return void 0;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function") return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import("./content-assets-CPbsr5sg.js");
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import("./_astro_assets-ByuB_4IA.js").then((n) => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { Path: process.env.Path }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import("./content-modules-DSTobNK3.js");
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: isRemotePath(link) ? link : prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}
const liveCollections = {};
const contentDir = "/src/content/";
const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
  globResult: contentEntryGlob,
  contentDir
});
const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
  globResult: dataEntryGlob,
  contentDir
});
const collectionToEntryMap = createCollectionToGlobResultMap({
  globResult: { ...contentEntryGlob, ...dataEntryGlob },
  contentDir
});
let lookupMap = {};
lookupMap = {};
const collectionNames = new Set(Object.keys(lookupMap));
function createGlobLookup(glob) {
  return async (collection, lookupId) => {
    const filePath = lookupMap[collection]?.entries[lookupId];
    if (!filePath) return void 0;
    return glob[collection][filePath];
  };
}
const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
  globResult: renderEntryGlob,
  contentDir
});
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
const getCollection = createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
  cacheEntriesByCollection,
  liveCollections
});
const getEntry = createGetEntry({
  getEntryImport: createGlobLookup(collectionToEntryMap),
  getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
  collectionNames,
  liveCollections
});
const $$Astro$s = createAstro("https://acmeinc.com");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/rodriguez/TemplateHvac/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/rodriguez/TemplateHvac/node_modules/astro/components/ClientRouter.astro", void 0);
const utilityNavItems = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    children: [
      { title: "Specials and Offers", href: "/specials-and-offers" }
    ]
  },
  { title: "Reviews", href: "/reviews" },
  { title: "Contact Us", href: "/contact" },
  { title: "Careers", href: "/careers" },
  {
    title: "Service Areas",
    href: "/service-areas",
    children: [
      { title: "Santa Monica", href: "/santa-monica" },
      { title: "Pasadena", href: "/pasadena" },
      { title: "Glendale", href: "/glendale" }
    ]
  }
];
const quickActions = [
  { title: "Maintenance Plan", href: "/maintenance-plan", icon: "settings" },
  { title: "Financing", href: "/financing", icon: "dollar" }
];
const mainNavItems = [
  {
    title: "Air Conditioning Services",
    href: "/air-conditioning",
    categories: [
      {
        title: "AC Services",
        icon: "snowflake",
        items: [
          { title: "AC Repair", href: "/air-conditioning/ac-repair" },
          { title: "AC Tune-Up/ Maintenance", href: "/air-conditioning/ac-tune-up-maintenance" },
          { title: "AC Installation and Replacement", href: "/air-conditioning/ac-installation-replacement" },
          { title: "Mini-Split Systems", href: "/air-conditioning/mini-split-systems" },
          { title: "HVAC Brands", href: "/air-conditioning/hvac-brands" },
          { title: "HVAC Warranties", href: "/air-conditioning/hvac-warranties" },
          { title: "Thermostats", href: "/air-conditioning/thermostats" }
        ]
      }
    ]
  },
  {
    title: "Heating Services",
    href: "/heating",
    categories: [
      {
        title: "Heating Services",
        icon: "flame",
        items: [
          { title: "Furnace Repair", href: "/heating/furnace-repair" },
          { title: "Furnace Tune Up/ Maintenance", href: "/heating/furnace-tune-up-maintenance" },
          { title: "Furnace Installation and Replacement", href: "/heating/furnace-installation-replacement" },
          { title: "Boilers Installation and Replacement", href: "/heating/boilers-installation-replacement" }
        ]
      }
    ]
  },
  {
    title: "Indoor Air Quality",
    href: "/indoor-air-quality",
    categories: [
      {
        title: "Indoor Air Quality Services",
        icon: "wind",
        items: [
          { title: "Air Filtration Systems", href: "/indoor-air-quality/air-filtration-systems" },
          { title: "Duct Cleaning and Sealing", href: "/indoor-air-quality/duct-cleaning-sealing" },
          { title: "Duct Repair and Replacement", href: "/indoor-air-quality/duct-repair-replacement" },
          { title: "Attic Insulation and Ventilation", href: "/indoor-air-quality/attic-insulation-ventilation" }
        ]
      }
    ]
  },
  {
    title: "Emergency HVAC",
    href: "/emergency",
    categories: [
      {
        title: "Emergency HVAC Services",
        icon: "alert",
        items: [
          { title: "24/7 AC Repairs", href: "/emergency/24-7-ac-repairs" },
          { title: "24/7 Heating and Cooling Repairs", href: "/emergency/24-7-heating-cooling-repairs" },
          { title: "24/7 Emergency Repairs", href: "/emergency/24-7-emergency-repairs" }
        ]
      }
    ]
  },
  {
    title: "Commercial",
    href: "/commercial",
    categories: [
      {
        title: "Commercial HVAC Services",
        icon: "building",
        items: [
          { title: "HVAC Repair", href: "/commercial/hvac-repair" },
          { title: "HVAC Maintenance", href: "/commercial/hvac-maintenance" },
          { title: "HVAC Installation", href: "/commercial/hvac-installation" },
          { title: "HVAC Warranty", href: "/commercial/hvac-warranty" }
        ]
      }
    ]
  }
];
const $$NavbarStatic = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Hidden checkbox — CSS-only mobile drawer toggle, zero JS -->${maybeRenderHead()}<input type="checkbox" id="nb-mobile-toggle" class="nb-mobile-toggle-input" aria-hidden="true" data-astro-cid-j3fozgzk> <header class="nb-header" data-astro-cid-j3fozgzk> <!-- ── Row 1: Dark top bar (desktop only) ── --> <div class="nb-top" data-astro-cid-j3fozgzk> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-j3fozgzk> <div class="nb-top-inner" data-astro-cid-j3fozgzk> <a href="/" class="nb-logo"${addAttribute(`${siteConfig.business.name} - Home`, "aria-label")} data-astro-cid-j3fozgzk> <div class="nb-logo-icon" data-astro-cid-j3fozgzk> <img${addAttribute(siteConfig.logo.src, "src")}${addAttribute(siteConfig.logo.alt, "alt")} class="nb-logo-img" width="32" height="32" decoding="async" loading="eager" data-astro-cid-j3fozgzk> </div> <div class="nb-logo-text" data-astro-cid-j3fozgzk> <span class="nb-logo-name" data-astro-cid-j3fozgzk>${siteConfig.business.name}</span> <span class="nb-logo-tagline" data-astro-cid-j3fozgzk>Professional HVAC Services</span> </div> </a> <div class="nb-top-right" data-astro-cid-j3fozgzk> <nav class="nb-utility" aria-label="Utility navigation" data-astro-cid-j3fozgzk> ${utilityNavItems.map((item) => item.children ? renderTemplate`<div class="nb-util-dropdown" data-astro-cid-j3fozgzk> <a${addAttribute(item.href, "href")} class="nb-util-link" data-astro-cid-j3fozgzk> ${item.title} <svg class="nb-util-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk> <path d="M6 9l6 6 6-6" data-astro-cid-j3fozgzk></path> </svg> </a> <div class="nb-util-panel" data-astro-cid-j3fozgzk> ${item.children.map((child) => renderTemplate`<a${addAttribute(child.href, "href")} class="nb-util-child" data-astro-cid-j3fozgzk>${child.title}</a>`)} </div> </div>` : renderTemplate`<a${addAttribute(item.href, "href")} class="nb-util-link" data-astro-cid-j3fozgzk>${item.title}</a>`)} </nav> <div class="nb-top-divider" data-astro-cid-j3fozgzk></div> <a${addAttribute(`tel:${siteConfig.contact.phone}`, "href")} class="nb-top-phone" data-astro-cid-j3fozgzk> <svg class="nb-phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk> <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" data-astro-cid-j3fozgzk></path> </svg> <div class="nb-phone-text" data-astro-cid-j3fozgzk> <span class="nb-phone-label" data-astro-cid-j3fozgzk>Call Now</span> <span class="nb-phone-number" data-astro-cid-j3fozgzk>${siteConfig.contact.phoneFormatted}</span> </div> </a> </div> </div> </div> </div> <!-- ── Row 2: Service bar ── --> <div class="nb-bar" data-astro-cid-j3fozgzk> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-j3fozgzk> <div class="nb-bar-inner" data-astro-cid-j3fozgzk> <!-- Desktop service nav with dropdowns --> <nav class="nb-service-nav" aria-label="Service navigation" data-astro-cid-j3fozgzk> ${mainNavItems.map((item) => renderTemplate`<div class="nb-nav-item" data-astro-cid-j3fozgzk> <a${addAttribute(item.href, "href")} class="nb-nav-link" data-astro-cid-j3fozgzk> ${item.title} <svg class="nb-nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk> <path d="M6 9l6 6 6-6" data-astro-cid-j3fozgzk></path> </svg> </a> <div class="nb-dropdown" data-astro-cid-j3fozgzk> <div class="nb-dropdown-inner" data-astro-cid-j3fozgzk> ${item.categories.flatMap((cat) => cat.items).map((service) => renderTemplate`<a${addAttribute(service.href, "href")} class="nb-dropdown-link" data-astro-cid-j3fozgzk> <div class="nb-dropdown-dot" data-astro-cid-j3fozgzk></div> ${service.title} </a>`)} </div> <div class="nb-dropdown-footer" data-astro-cid-j3fozgzk> <a${addAttribute(item.href, "href")} class="nb-dropdown-all" data-astro-cid-j3fozgzk>
View all ${item.title.toLowerCase()} <svg class="nb-dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-j3fozgzk></path> </svg> </a> </div> </div> </div>`)} </nav> <!-- Desktop quick actions --> <div class="nb-actions" data-astro-cid-j3fozgzk> ${quickActions.map((action) => renderTemplate`<a${addAttribute(action.href, "href")} class="nb-action-btn"${addAttribute(action.title, "title")} data-astro-cid-j3fozgzk> ${action.icon === "settings" ? renderTemplate`<svg class="nb-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk> <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" data-astro-cid-j3fozgzk></path> </svg>` : renderTemplate`<svg class="nb-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk> <line x1="12" y1="1" x2="12" y2="23" data-astro-cid-j3fozgzk></line> <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" data-astro-cid-j3fozgzk></path> </svg>`} <span class="nb-action-text" data-astro-cid-j3fozgzk>${action.title}</span> </a>`)} </div> <!-- Mobile: logo + hamburger --> <a href="/" class="nb-mobile-logo"${addAttribute(`${siteConfig.business.name} - Home`, "aria-label")} data-astro-cid-j3fozgzk> <img${addAttribute(siteConfig.logo.src, "src")}${addAttribute(siteConfig.logo.alt, "alt")} class="nb-mobile-logo-img" width="36" height="36" decoding="async" loading="eager" data-astro-cid-j3fozgzk> <span class="nb-mobile-name" data-astro-cid-j3fozgzk>${siteConfig.business.name}</span> </a> <label for="nb-mobile-toggle" class="nb-hamburger" aria-label="Open menu" role="button" tabindex="0" data-astro-cid-j3fozgzk> <div class="nb-hamburger-box" data-astro-cid-j3fozgzk> <div class="nb-hamburger-inner" data-astro-cid-j3fozgzk></div> </div> </label> </div> </div> </div> </header> <!-- Mobile drawer — pure CSS, no JS, no React --> <div class="nb-mobile-drawer" id="mobile-nav" role="dialog" aria-label="Mobile navigation" data-astro-cid-j3fozgzk> <!-- Backdrop --> <label for="nb-mobile-toggle" class="nb-backdrop" aria-hidden="true" data-astro-cid-j3fozgzk></label> <!-- Drawer panel --> <div class="nb-drawer-panel" data-astro-cid-j3fozgzk> <!-- Phone CTA --> <a${addAttribute(`tel:${siteConfig.contact.phone}`, "href")} class="nb-drawer-phone" data-astro-cid-j3fozgzk> <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" data-astro-cid-j3fozgzk></path></svg> ${siteConfig.contact.phoneFormatted} </a> <!-- Utility links --> <div class="nb-drawer-section nb-drawer-section--muted" data-astro-cid-j3fozgzk> ${utilityNavItems.map((item) => item.children ? renderTemplate`<details class="nb-drawer-details" data-astro-cid-j3fozgzk> <summary class="nb-drawer-summary" data-astro-cid-j3fozgzk> ${item.title} <svg class="nb-drawer-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk><path d="M6 9l6 6 6-6" data-astro-cid-j3fozgzk></path></svg> </summary> <div class="nb-drawer-children" data-astro-cid-j3fozgzk> ${item.children.map((child) => renderTemplate`<a${addAttribute(child.href, "href")} class="nb-drawer-child" data-astro-cid-j3fozgzk>${child.title}</a>`)} </div> </details>` : renderTemplate`<a${addAttribute(item.href, "href")} class="nb-drawer-link" data-astro-cid-j3fozgzk>${item.title}</a>`)} </div> <!-- Services --> <div class="nb-drawer-section nb-drawer-section--white" data-astro-cid-j3fozgzk> <p class="nb-drawer-section-label" data-astro-cid-j3fozgzk>Services</p> ${mainNavItems.map((service) => renderTemplate`<details class="nb-drawer-details" data-astro-cid-j3fozgzk> <summary class="nb-drawer-summary" data-astro-cid-j3fozgzk> ${service.title} <svg class="nb-drawer-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk><path d="M6 9l6 6 6-6" data-astro-cid-j3fozgzk></path></svg> </summary> <div class="nb-drawer-children" data-astro-cid-j3fozgzk> ${service.categories.flatMap((cat) => cat.items).map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="nb-drawer-child" data-astro-cid-j3fozgzk>${link.title}</a>`)} </div> </details>`)} </div> <!-- Quick actions --> <div class="nb-drawer-actions" data-astro-cid-j3fozgzk> ${quickActions.map((action, i) => renderTemplate`<a${addAttribute(action.href, "href")}${addAttribute(`nb-drawer-action ${i > 0 ? "nb-drawer-action--border" : ""}`, "class")} data-astro-cid-j3fozgzk> ${action.icon === "settings" ? renderTemplate`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" data-astro-cid-j3fozgzk></path></svg>` : renderTemplate`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j3fozgzk><line x1="12" y1="1" x2="12" y2="23" data-astro-cid-j3fozgzk></line><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" data-astro-cid-j3fozgzk></path></svg>`} ${action.title} </a>`)} </div> </div> </div> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/NavbarStatic.astro", void 0);
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const quickLinks = [
    { title: "HOME", href: "/" },
    { title: "SERVICE AREAS", href: "/service-areas" },
    { title: "SCHEDULE NOW", href: "/contact" }
  ];
  const airConditioningServices = [
    { title: "AC Repair", href: "/air-conditioning/ac-repair" },
    { title: "AC Tune-Up/ Maintenance", href: "/air-conditioning/ac-tune-up-maintenance" },
    { title: "AC Installation and Replacement", href: "/air-conditioning/ac-installation-replacement" },
    { title: "Mini-Split Systems", href: "/air-conditioning/mini-split-systems" },
    { title: "HVAC Brands", href: "/air-conditioning/hvac-brands" },
    { title: "HVAC Warranties", href: "/air-conditioning/hvac-warranties" },
    { title: "Thermostats", href: "/air-conditioning/thermostats" }
  ];
  const heatingServices = [
    { title: "Furnace Repair", href: "/heating/furnace-repair" },
    { title: "Furnace Tune Up/ Maintenance", href: "/heating/furnace-tune-up-maintenance" },
    { title: "Furnace Installation and Replacement", href: "/heating/furnace-installation-replacement" },
    { title: "Boilers Installation and Replacement", href: "/heating/boilers-installation-replacement" }
  ];
  const indoorAirQualityServices = [
    { title: "Air Filtration Systems", href: "/indoor-air-quality/air-filtration-systems" },
    { title: "Duct Cleaning and Sealing", href: "/indoor-air-quality/duct-cleaning-sealing" },
    { title: "Duct Repair and Replacement", href: "/indoor-air-quality/duct-repair-replacement" },
    { title: "Attic Insulation and Ventilation", href: "/indoor-air-quality/attic-insulation-ventilation" }
  ];
  const emergencyServices = [
    { title: "24/7 AC Repairs", href: "/emergency/24-7-ac-repairs" },
    { title: "24/7 Heating and Cooling Repairs", href: "/emergency/24-7-heating-cooling-repairs" },
    { title: "24/7 Emergency Repairs", href: "/emergency/24-7-emergency-repairs" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="ft-footer" data-astro-cid-sz7xmlte> <!-- ─── Hero CTA section ─── --> <div class="ft-hero" data-astro-cid-sz7xmlte> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-sz7xmlte> <div class="ft-hero-inner" data-astro-cid-sz7xmlte> <div class="ft-hero-content" data-astro-cid-sz7xmlte> <div class="ft-hero-badge" data-astro-cid-sz7xmlte> <div class="ft-hero-badge-dot" data-astro-cid-sz7xmlte></div> <span data-astro-cid-sz7xmlte>24/7 Emergency Service</span> </div> <h2 class="ft-hero-title" data-astro-cid-sz7xmlte>Ready to Fix Your HVAC?</h2> <p class="ft-hero-desc" data-astro-cid-sz7xmlte>Professional service you can trust. Licensed, insured, and locally owned.</p> </div> <div class="ft-hero-actions" data-astro-cid-sz7xmlte> <a${addAttribute(`tel:${siteConfig.contact.phone}`, "href")} class="ft-phone-btn" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-sz7xmlte></path></svg> ${siteConfig.contact.phoneFormatted} </a> <a href="/contact" class="ft-schedule-btn" data-astro-cid-sz7xmlte>Schedule Service</a> </div> </div> </div> </div> <!-- ─── Main content ─── --> <div class="ft-main" data-astro-cid-sz7xmlte> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-sz7xmlte> <div class="ft-main-inner" data-astro-cid-sz7xmlte> <!-- Company info --> <div class="ft-company" data-astro-cid-sz7xmlte> <a href="/" class="ft-logo" data-astro-cid-sz7xmlte> <div class="ft-logo-icon" data-astro-cid-sz7xmlte> <img${addAttribute(siteConfig.logo.src, "src")}${addAttribute(siteConfig.logo.alt, "alt")} class="ft-logo-img" width="32" height="32" loading="lazy" decoding="async" data-astro-cid-sz7xmlte> </div> <div class="ft-logo-text" data-astro-cid-sz7xmlte> <span class="ft-logo-name" data-astro-cid-sz7xmlte>${siteConfig.business.name}</span> <span class="ft-logo-tagline" data-astro-cid-sz7xmlte>Professional HVAC Services</span> </div> </a> <div class="ft-contact-cards" data-astro-cid-sz7xmlte> <div class="ft-contact-card" data-astro-cid-sz7xmlte> <div class="ft-contact-icon" data-astro-cid-sz7xmlte> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" data-astro-cid-sz7xmlte></path> <circle cx="12" cy="10" r="3" data-astro-cid-sz7xmlte></circle> </svg> </div> <div class="ft-contact-info" data-astro-cid-sz7xmlte> <span class="ft-contact-label" data-astro-cid-sz7xmlte>Service Area</span> <span class="ft-contact-value" data-astro-cid-sz7xmlte>${siteConfig.location.city} & Surrounding Areas</span> </div> </div> <div class="ft-contact-card" data-astro-cid-sz7xmlte> <div class="ft-contact-icon" data-astro-cid-sz7xmlte> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <rect width="20" height="16" x="2" y="4" rx="2" data-astro-cid-sz7xmlte></rect> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" data-astro-cid-sz7xmlte></path> </svg> </div> <div class="ft-contact-info" data-astro-cid-sz7xmlte> <span class="ft-contact-label" data-astro-cid-sz7xmlte>Email Us</span> <span class="ft-contact-value" data-astro-cid-sz7xmlte>${siteConfig.contact.email}</span> </div> </div> </div> </div> <!-- Services grid --> <div class="ft-services" data-astro-cid-sz7xmlte> <div class="ft-service-col" data-astro-cid-sz7xmlte> <h3 class="ft-service-title" data-astro-cid-sz7xmlte>Air Conditioning</h3> <ul class="ft-service-list" data-astro-cid-sz7xmlte> ${airConditioningServices.slice(0, 4).map((service) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(service.href, "href")} class="ft-service-link" data-astro-cid-sz7xmlte>${service.title}</a></li>`)} </ul> <a href="/air-conditioning" class="ft-view-all" data-astro-cid-sz7xmlte>View All AC Services</a> </div> <div class="ft-service-col" data-astro-cid-sz7xmlte> <h3 class="ft-service-title" data-astro-cid-sz7xmlte>Heating</h3> <ul class="ft-service-list" data-astro-cid-sz7xmlte> ${heatingServices.map((service) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(service.href, "href")} class="ft-service-link" data-astro-cid-sz7xmlte>${service.title}</a></li>`)} </ul> <a href="/heating" class="ft-view-all" data-astro-cid-sz7xmlte>View All Heating Services</a> </div> <div class="ft-service-col" data-astro-cid-sz7xmlte> <h3 class="ft-service-title" data-astro-cid-sz7xmlte>Indoor Air Quality</h3> <ul class="ft-service-list" data-astro-cid-sz7xmlte> ${indoorAirQualityServices.map((service) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(service.href, "href")} class="ft-service-link" data-astro-cid-sz7xmlte>${service.title}</a></li>`)} </ul> <a href="/indoor-air-quality" class="ft-view-all" data-astro-cid-sz7xmlte>View All IAQ Services</a> </div> <div class="ft-service-col" data-astro-cid-sz7xmlte> <h3 class="ft-service-title" data-astro-cid-sz7xmlte>Emergency</h3> <ul class="ft-service-list" data-astro-cid-sz7xmlte> ${emergencyServices.map((service) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(service.href, "href")} class="ft-service-link" data-astro-cid-sz7xmlte>${service.title}</a></li>`)} </ul> <a href="/emergency" class="ft-view-all" data-astro-cid-sz7xmlte>24/7 Emergency Service</a> </div> </div> </div> </div> </div> <!-- ─── Bottom bar ─── --> <div class="ft-bottom" data-astro-cid-sz7xmlte> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-sz7xmlte> <div class="ft-bottom-inner" data-astro-cid-sz7xmlte> <div class="ft-bottom-left" data-astro-cid-sz7xmlte> <p class="ft-copyright" data-astro-cid-sz7xmlte>&copy; ${currentYear} ${siteConfig.business.name}. All rights reserved.</p> <div class="ft-quick-links" data-astro-cid-sz7xmlte> ${quickLinks.map((link, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(link.href, "href")} class="ft-quick-link" data-astro-cid-sz7xmlte>${link.title}</a> ${i < quickLinks.length - 1 && renderTemplate`<span class="ft-divider" data-astro-cid-sz7xmlte>•</span>`}` })}`)} </div> </div> <div class="ft-bottom-right" data-astro-cid-sz7xmlte> <a href="/privacy-policy" class="ft-legal-link" data-astro-cid-sz7xmlte>Privacy</a> <a href="/terms" class="ft-legal-link" data-astro-cid-sz7xmlte>Terms</a> <a href="https://lordicon.com/" class="ft-legal-link" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Icons by Lordicon.com</a> </div> </div> </div> </div> </footer> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/Footer.astro", void 0);
const $$ThemeProvider = createComponent(($$result, $$props, $$slots) => {
  const { primary, secondary, tertiary, quaternary, accent, highlight } = siteConfig.colors;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(`<style>:root{--brand-primary:${primary};--brand-secondary:${secondary};--brand-tertiary:${tertiary};--brand-quaternary:${quaternary};--brand-accent:${secondary};--brand-accent-secondary:${accent};--brand-highlight:${highlight};--background:${quaternary};--foreground:${primary};--card-foreground:${primary};--popover-foreground:${primary};--primary:${primary};--primary-foreground:#fefefe;--secondary:${secondary};--secondary-foreground:#fefefe;--muted:${tertiary};--accent:${secondary};--accent-foreground:#fefefe;--ring:${secondary};--border:color-mix(in srgb,${secondary} 25%,${tertiary});--input:color-mix(in srgb,${secondary} 25%,${tertiary});--chart-1:${primary};--chart-2:${secondary};--chart-4:${tertiary};--chart-5:${quaternary};--sidebar:${quaternary};--sidebar-foreground:${primary};--sidebar-primary:${primary};--sidebar-accent:${tertiary};--sidebar-accent-foreground:${primary};--sidebar-border:color-mix(in srgb,${secondary} 25%,${tertiary});--sidebar-ring:${secondary}}</style>`)}` })}`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/ThemeProvider.astro", void 0);
var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$r = createAstro("https://acmeinc.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title: rawTitle,
    description: rawDescription = siteConfig.seo.defaultDescription,
    keywords = siteConfig.seo.keywords,
    ogImage = siteConfig.seo.ogImage,
    noindex = false
  } = Astro2.props;
  const description = getLocationText(rawDescription);
  const fullTitle = rawTitle.includes(siteConfig.seo.siteName) ? rawTitle : `${rawTitle} | ${siteConfig.seo.siteName}`;
  const canonical = new URL(Astro2.url.pathname, siteConfig.seo.siteUrl).href;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>', '</title><meta name="description"', '><meta name="keywords"', ">", '<link rel="canonical"', '><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="theme-color"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Structured Data --><script type="application/ld+json">', `<\/script><!-- Preconnect to critical origins only --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Inter font — optimized loading with font-display swap --><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">`, '<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"></noscript>', "", "", '</head> <body class="min-h-screen flex flex-col"> ', ' <main class="flex-1"> ', " </main> ", " ", " ", " <script>\n      var scrollObserver = null;\n\n      function initScrollAnimations() {\n        if (scrollObserver) {\n          scrollObserver.disconnect();\n          scrollObserver = null;\n        }\n\n        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\n          document.querySelectorAll('[data-animate], [data-animate-stagger]').forEach(function(el) {\n            el.classList.add('is-visible');\n          });\n          return;\n        }\n\n        var isMobile = window.innerWidth < 768;\n        scrollObserver = new IntersectionObserver(\n          function(entries) {\n            entries.forEach(function(entry) {\n              if (entry.isIntersecting) {\n                entry.target.classList.add('is-visible');\n                scrollObserver && scrollObserver.unobserve(entry.target);\n              }\n            });\n          },\n          { threshold: isMobile ? 0.05 : 0.1, rootMargin: '0px 0px -30px 0px' }\n        );\n\n        document.querySelectorAll('[data-animate], [data-animate-stagger]').forEach(function(el) {\n          scrollObserver.observe(el);\n        });\n      }\n\n      initScrollAnimations();\n      document.addEventListener('astro:page-load', initScrollAnimations);\n    <\/script> </body> </html>"])), fullTitle, addAttribute(description, "content"), addAttribute(keywords, "content"), noindex ? renderTemplate`<meta name="robots" content="noindex, nofollow">` : renderTemplate`<meta name="robots" content="index, follow">`, addAttribute(canonical, "href"), addAttribute(canonical, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(siteConfig.colors.primary, "content"), addAttribute(siteConfig.seo.twitterHandle, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.business.name,
    "description": description,
    "url": siteConfig.seo.siteUrl,
    "telephone": siteConfig.contact.phoneFormatted,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.location.address,
      "addressLocality": siteConfig.location.city,
      "addressRegion": siteConfig.location.state
    }
  })), maybeRenderHead(), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderComponent($$result, "ThemeProvider", $$ThemeProvider, {}), renderHead(), renderComponent($$result, "NavbarStatic", $$NavbarStatic, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "FreeScanButton", $$FreeScanButton, {}), renderComponent($$result, "PopupModal", $$PopupModal, {}));
}, "C:/Users/rodriguez/TemplateHvac/src/layouts/BaseLayout.astro", void 0);
const $$Astro$q = createAstro("https://acmeinc.com");
const $$CareersCTASection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$CareersCTASection;
  const {
    title: rawTitle,
    description: rawDescription,
    buttonText = "APPLY TODAY",
    buttonHref = "/contact",
    image,
    imageAlt = "Join our team"
  } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = rawDescription ? getLocationText(rawDescription) : void 0;
  return renderTemplate`${maybeRenderHead()}<section class="cc-section" data-astro-cid-k2z4yt6j> <!-- Geometric slope accent --> <div class="cc-slope" data-astro-cid-k2z4yt6j> <svg class="h-full w-full" viewBox="0 0 200 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-k2z4yt6j> <polygon points="60,0 200,0 200,800 0,800" fill="white" opacity="0.03" data-astro-cid-k2z4yt6j></polygon> <polygon points="100,0 200,0 200,800 40,800" fill="white" opacity="0.02" data-astro-cid-k2z4yt6j></polygon> </svg> </div> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28 relative z-10" data-astro-cid-k2z4yt6j> <div class="cc-layout" data-astro-cid-k2z4yt6j> <!-- Text side --> <div class="cc-text" data-animate="fade-right" data-astro-cid-k2z4yt6j> <div class="cc-eyebrow" data-astro-cid-k2z4yt6j> <span class="cc-eyebrow-text" data-astro-cid-k2z4yt6j>Join Us</span> </div> <h2 class="cc-title" data-astro-cid-k2z4yt6j>${title}</h2> <div class="cc-divider" data-astro-cid-k2z4yt6j></div> ${description && renderTemplate`<p class="cc-desc" data-astro-cid-k2z4yt6j>${unescapeHTML(description)}</p>`} <a${addAttribute(buttonHref, "href")} class="cc-btn" data-astro-cid-k2z4yt6j> ${buttonText} <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-k2z4yt6j> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-k2z4yt6j></path> </svg> </a> </div> <!-- Image side --> <div class="cc-image-side" data-animate="fade-left" data-astro-cid-k2z4yt6j> ${image ? renderTemplate`<div class="cc-image-wrap" data-astro-cid-k2z4yt6j> <img${addAttribute(image, "src")}${addAttribute(imageAlt, "alt")} class="cc-image" loading="lazy" data-astro-cid-k2z4yt6j> <div class="cc-image-overlay" data-astro-cid-k2z4yt6j></div> <!-- Vertical highlight strip --> <div class="cc-image-strip" data-astro-cid-k2z4yt6j></div> </div>` : renderTemplate`<div class="cc-image-wrap cc-image-placeholder" data-astro-cid-k2z4yt6j> <span data-astro-cid-k2z4yt6j>Image</span> </div>`} </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/CareersCTASection.astro", void 0);
const $$Astro$p = createAstro("https://acmeinc.com");
const $$ContactFormSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$ContactFormSection;
  const {
    title: rawTitle = `Get in Touch with ${siteConfig.business.fullName}`,
    description: rawDescription = "Fill out the form, and a member of our team will get back to you promptly. Whether you're looking for a quick repair, a detailed quote, or general advice, we've got you covered.",
    image = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    phone = siteConfig.contact.phoneFormatted,
    email = siteConfig.contact.email,
    address = `${siteConfig.location.city}, ${siteConfig.location.state}`,
    serviceOptions = ["Air Conditioning", "Heating", "Indoor Air Quality", "Emergency Service", "Commercial HVAC", "Maintenance", "Other"],
    planOptions = ["Yes", "No", "Not Sure"]
  } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = getLocationText(rawDescription);
  return renderTemplate`<!-- Contact Info Header -->${maybeRenderHead()}<section class="cf-header-section" data-astro-cid-ca7uxiov> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-ca7uxiov> <div class="cf-header" data-animate="fade-up" data-astro-cid-ca7uxiov> <div class="cf-eyebrow" data-astro-cid-ca7uxiov> <span class="cf-eyebrow-text" data-astro-cid-ca7uxiov>Contact</span> </div> <h2 class="cf-title" data-astro-cid-ca7uxiov>${title}</h2> <div class="cf-divider" data-astro-cid-ca7uxiov></div> <p class="cf-desc" data-astro-cid-ca7uxiov>${description}</p> </div> <!-- Contact cards --> <div class="cf-cards" data-animate-stagger data-astro-cid-ca7uxiov> <a${addAttribute(`tel:${phone}`, "href")} class="cf-card group" data-astro-cid-ca7uxiov> <span class="cf-card-accent" data-astro-cid-ca7uxiov></span> <div class="cf-card-inner" data-astro-cid-ca7uxiov> <div class="cf-card-icon" data-astro-cid-ca7uxiov> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ca7uxiov> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-ca7uxiov></path> </svg> </div> <div data-astro-cid-ca7uxiov> <span class="cf-card-label" data-astro-cid-ca7uxiov>Phone</span> <span class="cf-card-value" data-astro-cid-ca7uxiov>${phone}</span> </div> </div> </a> <a${addAttribute(`mailto:${email}`, "href")} class="cf-card group" data-astro-cid-ca7uxiov> <span class="cf-card-accent" data-astro-cid-ca7uxiov></span> <div class="cf-card-inner" data-astro-cid-ca7uxiov> <div class="cf-card-icon" data-astro-cid-ca7uxiov> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ca7uxiov> <rect width="20" height="16" x="2" y="4" rx="2" data-astro-cid-ca7uxiov></rect> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" data-astro-cid-ca7uxiov></path> </svg> </div> <div data-astro-cid-ca7uxiov> <span class="cf-card-label" data-astro-cid-ca7uxiov>Email Address</span> <span class="cf-card-value" data-astro-cid-ca7uxiov>${email}</span> </div> </div> </a> <div class="cf-card group" data-astro-cid-ca7uxiov> <span class="cf-card-accent" data-astro-cid-ca7uxiov></span> <div class="cf-card-inner" data-astro-cid-ca7uxiov> <div class="cf-card-icon" data-astro-cid-ca7uxiov> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ca7uxiov> <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" data-astro-cid-ca7uxiov></path> <circle cx="12" cy="10" r="3" data-astro-cid-ca7uxiov></circle> </svg> </div> <div data-astro-cid-ca7uxiov> <span class="cf-card-label" data-astro-cid-ca7uxiov>Address</span> <span class="cf-card-value" data-astro-cid-ca7uxiov>${address}</span> </div> </div> </div> </div> </div> </section> <!-- Form Section with Image --> <section class="cf-form-section" id="contact-form" data-astro-cid-ca7uxiov> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28 relative z-10" data-astro-cid-ca7uxiov> <div class="cf-form-layout" data-astro-cid-ca7uxiov> <!-- Image Side --> <div class="cf-image-side" data-animate="fade-right" data-astro-cid-ca7uxiov> <div class="cf-image-wrap" data-astro-cid-ca7uxiov> <img${addAttribute(image, "src")} alt="Professional HVAC technician ready to help" class="cf-image" loading="lazy" data-astro-cid-ca7uxiov> <div class="cf-image-overlay" data-astro-cid-ca7uxiov></div> </div> </div> <!-- Form Side --> <div class="cf-form-side" data-animate="fade-left" data-astro-cid-ca7uxiov> <div class="cf-form-card" data-astro-cid-ca7uxiov> <div class="cf-form-inner" data-astro-cid-ca7uxiov> <div class="cf-form-header" data-astro-cid-ca7uxiov> <div class="cf-form-header-line" data-astro-cid-ca7uxiov></div> <h3 class="cf-form-heading" data-astro-cid-ca7uxiov>Contact Form</h3> </div> <form class="cf-form" data-astro-cid-ca7uxiov> <div class="cf-field" data-astro-cid-ca7uxiov> <label for="name" class="cf-label" data-astro-cid-ca7uxiov>Name*</label> <input type="text" id="name" name="name" required class="cf-input" placeholder="Your full name" data-astro-cid-ca7uxiov> </div> <div class="cf-field-row" data-astro-cid-ca7uxiov> <div class="cf-field" data-astro-cid-ca7uxiov> <label for="email" class="cf-label" data-astro-cid-ca7uxiov>Email Address*</label> <input type="email" id="email" name="email" required class="cf-input" placeholder="you@email.com" data-astro-cid-ca7uxiov> </div> <div class="cf-field" data-astro-cid-ca7uxiov> <label for="phone" class="cf-label" data-astro-cid-ca7uxiov>Phone</label> <input type="tel" id="phone" name="phone" class="cf-input" placeholder="(123) 456-7890" data-astro-cid-ca7uxiov> </div> </div> <div class="cf-field-row" data-astro-cid-ca7uxiov> <div class="cf-field" data-astro-cid-ca7uxiov> <label for="plan" class="cf-label" data-astro-cid-ca7uxiov>Are You Interested In A Plan?</label> <div class="cf-select-wrap" data-astro-cid-ca7uxiov> <select id="plan" name="plan" class="cf-input cf-select" data-astro-cid-ca7uxiov> <option value="" data-astro-cid-ca7uxiov>Select an option</option> ${planOptions.map((option) => renderTemplate`<option${addAttribute(option.toLowerCase(), "value")} data-astro-cid-ca7uxiov>${option}</option>`)} </select> <svg class="cf-select-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ca7uxiov> <path d="m6 9 6 6 6-6" data-astro-cid-ca7uxiov></path> </svg> </div> </div> <div class="cf-field" data-astro-cid-ca7uxiov> <label for="service" class="cf-label" data-astro-cid-ca7uxiov>Which Service Do You Need?</label> <div class="cf-select-wrap" data-astro-cid-ca7uxiov> <select id="service" name="service" class="cf-input cf-select" data-astro-cid-ca7uxiov> <option value="" data-astro-cid-ca7uxiov>Select a service</option> ${serviceOptions.map((option) => renderTemplate`<option${addAttribute(option.toLowerCase().replace(/\s+/g, "-"), "value")} data-astro-cid-ca7uxiov>${option}</option>`)} </select> <svg class="cf-select-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ca7uxiov> <path d="m6 9 6 6 6-6" data-astro-cid-ca7uxiov></path> </svg> </div> </div> </div> <div class="cf-field" data-astro-cid-ca7uxiov> <label for="message" class="cf-label" data-astro-cid-ca7uxiov>Message*</label> <textarea id="message" name="message" rows="3" required class="cf-input cf-textarea" placeholder="Tell us about your HVAC needs..." data-astro-cid-ca7uxiov></textarea> </div> <div class="cf-field" data-astro-cid-ca7uxiov> <label for="verification" class="cf-label" data-astro-cid-ca7uxiov>Verification*</label> <input type="text" id="verification" name="verification" placeholder="Enter the code shown" required class="cf-input" data-astro-cid-ca7uxiov> </div> <button type="submit" class="cf-submit" data-astro-cid-ca7uxiov>
Submit
<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-ca7uxiov> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-ca7uxiov></path> </svg> </button> </form> <!-- Trust indicators --> <div class="cf-trust" data-astro-cid-ca7uxiov> <span class="cf-trust-item" data-astro-cid-ca7uxiov> <span class="cf-trust-dot" data-astro-cid-ca7uxiov></span>
Secure Form
</span> <span class="cf-trust-item" data-astro-cid-ca7uxiov> <span class="cf-trust-dot" data-astro-cid-ca7uxiov></span>
Fast Response
</span> <span class="cf-trust-item" data-astro-cid-ca7uxiov> <span class="cf-trust-dot" data-astro-cid-ca7uxiov></span>
No Spam
</span> </div> </div> </div> </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ContactFormSection.astro", void 0);
const $$Astro$o = createAstro("https://acmeinc.com");
const $$ContentSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$ContentSection;
  const {
    badge,
    title: rawTitle,
    description: rawDescription,
    features: rawFeatures = [],
    buttonText,
    buttonHref,
    imagePosition = "left",
    images = [],
    imageAlts = []
  } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = getLocationText(rawDescription);
  const features = rawFeatures.map(getLocationText);
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80";
  const DEFAULT_SECONDARY = "https://cdn.prod.website-files.com/672c783eb245d962f945af09/67ac697f07002b03059c5cf4_hvac-service.jpeg";
  const mainImage = DEFAULT_IMAGE;
  const secondaryImage = DEFAULT_SECONDARY;
  const isRight = imagePosition === "right";
  return renderTemplate`${maybeRenderHead()}<section class="cs-wrapper" data-astro-cid-dmvz46zk> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-dmvz46zk> <div${addAttribute(["cs-section", { "cs-section--flipped": isRight }], "class:list")} data-astro-cid-dmvz46zk> <!-- Image side --> <div class="cs-image-side"${addAttribute(isRight ? "fade-left" : "fade-right", "data-animate")} data-astro-cid-dmvz46zk> <div class="cs-image-wrap" data-astro-cid-dmvz46zk> <!-- Left accent strip --> <div class="cs-image-accent" data-astro-cid-dmvz46zk></div> <!-- Main image --> <div class="cs-image-main-wrap" data-astro-cid-dmvz46zk> ${renderTemplate`<img${addAttribute(mainImage, "src")}${addAttribute(imageAlts[0] || title, "alt")} class="cs-image-main" loading="lazy" decoding="async" data-astro-cid-dmvz46zk>`} <!-- Corner badge --> <div class="cs-corner-badge" data-astro-cid-dmvz46zk> <svg xmlns="http://www.w3.org/2000/svg" class="cs-corner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-dmvz46zk> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-dmvz46zk></path> <polyline points="22 4 12 14.01 9 11.01" data-astro-cid-dmvz46zk></polyline> </svg> </div> </div> <!-- Secondary image --> ${renderTemplate`<div class="cs-image-secondary-wrap" data-astro-cid-dmvz46zk> <img${addAttribute(secondaryImage, "src")}${addAttribute(imageAlts[1] || `${title} - detail`, "alt")} class="cs-image-secondary" loading="lazy" decoding="async" data-astro-cid-dmvz46zk> </div>`} </div> </div> <!-- Text side --> <div class="cs-text-side"${addAttribute(isRight ? "fade-right" : "fade-left", "data-animate")} data-animate-delay="200" data-astro-cid-dmvz46zk> <div class="cs-text-inner" data-astro-cid-dmvz46zk> ${badge && renderTemplate`<div class="cs-badge" data-astro-cid-dmvz46zk> <span class="cs-badge-text" data-astro-cid-dmvz46zk>${badge}</span> </div>`} <h2 class="cs-title" data-astro-cid-dmvz46zk>${title}</h2> <p class="cs-desc" data-astro-cid-dmvz46zk>${unescapeHTML(description)}</p> ${features.length > 0 && renderTemplate`<div class="cs-features" data-astro-cid-dmvz46zk> ${features.map((feature, idx) => {
    const icons = [
      `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
      `<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>`,
      `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
      `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`
    ];
    return renderTemplate`<div class="cs-feature-card" data-astro-cid-dmvz46zk> <div class="cs-feature-icon" data-astro-cid-dmvz46zk> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-dmvz46zk> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(icons[idx % icons.length])}` })} </svg> </div> <span class="cs-feature-text" data-astro-cid-dmvz46zk>${unescapeHTML(feature)}</span> </div>`;
  })} </div>`} ${buttonText && buttonHref && renderTemplate`<a${addAttribute(buttonHref, "href")} class="cs-btn" data-astro-cid-dmvz46zk> ${buttonText} <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-dmvz46zk> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-dmvz46zk></path> </svg> </a>`} </div> </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ContentSection.astro", void 0);
const $$Astro$n = createAstro("https://acmeinc.com");
const $$ContentSectionAlt = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$ContentSectionAlt;
  const {
    badge,
    title: rawTitle,
    titleHighlight: rawTitleHighlight,
    description: rawDescription,
    featuresTitle,
    features: rawFeatures = [],
    buttonText,
    buttonHref,
    imagePosition = "left"
  } = Astro2.props;
  const title = getLocationText(rawTitle);
  const titleHighlight = rawTitleHighlight ? getLocationText(rawTitleHighlight) : void 0;
  const description = getLocationText(rawDescription);
  const features = rawFeatures.map((f) => ({
    ...f,
    title: getLocationText(f.title),
    description: getLocationText(f.description)
  }));
  const isRight = imagePosition === "right";
  const imageSrc = "https://www.brewersac.com/wp-content/uploads/2024/08/residential-hvac-service-in-phoenix-brewers-ac.png";
  const imageAlt = "HVAC Services";
  return renderTemplate`${maybeRenderHead()}<section class="csa-section" data-astro-cid-zvzb2qr2> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16" data-astro-cid-zvzb2qr2> <!-- Banner strip --> <div${addAttribute(["csa-banner", { "csa-banner--flipped": isRight }], "class:list")} data-animate="fade-up" data-astro-cid-zvzb2qr2> <!-- Dark text side --> <div class="csa-dark" data-astro-cid-zvzb2qr2> <!-- Decorative icon --> <div class="csa-icon" data-astro-cid-zvzb2qr2> <object data="/images/wired-outline-18-location-pin-loop-roll.svg" type="image/svg+xml" aria-hidden="true" data-astro-cid-zvzb2qr2></object> </div> <div class="csa-dark-content" data-astro-cid-zvzb2qr2> ${badge && renderTemplate`<div class="csa-badge-wrap" data-astro-cid-zvzb2qr2> <span class="csa-badge" data-astro-cid-zvzb2qr2>${badge}</span> </div>`} <h2 class="csa-title" data-astro-cid-zvzb2qr2> ${title}${" "} ${titleHighlight && renderTemplate`<span class="csa-title-hl" data-astro-cid-zvzb2qr2>${titleHighlight}</span>`} </h2> <p class="csa-desc" data-astro-cid-zvzb2qr2>${unescapeHTML(description)}</p> ${buttonHref && renderTemplate`<a${addAttribute(buttonHref, "href")} class="csa-btn" data-astro-cid-zvzb2qr2> ${buttonText || "Read More"} <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-zvzb2qr2> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-zvzb2qr2></path> </svg> </a>`} </div> </div> <!-- Image side --> <div class="csa-img-side" data-astro-cid-zvzb2qr2> <img${addAttribute(imageSrc, "src")}${addAttribute(imageAlt, "alt")} class="csa-img" loading="lazy" decoding="async" data-astro-cid-zvzb2qr2> </div> </div> <!-- Features below the banner (if any) --> ${features.length > 0 && renderTemplate`<div class="csa-features" data-animate-stagger data-astro-cid-zvzb2qr2> ${featuresTitle && renderTemplate`<h3 class="csa-features-heading" data-astro-cid-zvzb2qr2>${featuresTitle}</h3>`} <div class="csa-features-grid" data-astro-cid-zvzb2qr2> ${features.map((feature, i) => renderTemplate`<div class="csa-feature" data-astro-cid-zvzb2qr2> <div class="csa-feature-num" data-astro-cid-zvzb2qr2>${String(i + 1).padStart(2, "0")}</div> <h4 class="csa-feature-title" data-astro-cid-zvzb2qr2>${feature.title}</h4> <p class="csa-feature-desc" data-astro-cid-zvzb2qr2>${unescapeHTML(feature.description)}</p> </div>`)} </div> </div>`} </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ContentSectionAlt.astro", void 0);
const $$Astro$m = createAstro("https://acmeinc.com");
const $$CouponsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$CouponsSection;
  const {
    title: rawTitle = "Specials and Offers",
    coupons,
    backgroundImage
  } = Astro2.props;
  const title = getLocationText(rawTitle);
  Math.floor(coupons.length / 2);
  return renderTemplate`${maybeRenderHead()}<section class="cpn-section relative overflow-hidden py-24 md:py-32" data-astro-cid-4f4jnmqs> <!-- Light background with subtle pattern --> <div class="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50" data-astro-cid-4f4jnmqs></div> <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, rgba(10,37,64,0.15) 1px, transparent 0); background-size: 20px 20px;" data-astro-cid-4f4jnmqs></div> <div class="relative z-[1] container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-4f4jnmqs> <!-- Section header --> <div class="mb-16 text-center" data-animate="fade-scale" data-astro-cid-4f4jnmqs> <div class="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-brand-primary/5 backdrop-blur-sm rounded-full border border-brand-highlight/20" data-astro-cid-4f4jnmqs> <svg class="w-4 h-4 text-brand-highlight" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-4f4jnmqs> <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" data-astro-cid-4f4jnmqs></path> </svg> <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-highlight" data-astro-cid-4f4jnmqs>Limited Time Offers</span> </div> <h2 class="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-brand-primary mb-3" data-astro-cid-4f4jnmqs>${title}</h2> </div> <!-- Coupons grid --> <div class="cpn-grid" data-animate-stagger data-astro-cid-4f4jnmqs> ${coupons.map((coupon, i) => {
    const colors = [
      { bg: "var(--brand-highlight)", text: "#FFFFFF" },
      // orange
      { bg: "#1E88E5", text: "#FFFFFF" }
      // bright blue
    ];
    const color = colors[i % colors.length];
    return renderTemplate`<div class="cpn-ticket-wrapper" data-astro-cid-4f4jnmqs> <div class="cpn-ticket"${addAttribute(`--ticket-bg: ${color.bg}; --ticket-text: ${color.text};`, "style")} data-astro-cid-4f4jnmqs> <!-- Left section: main content --> <div class="cpn-ticket-main" data-astro-cid-4f4jnmqs> <!-- Main content area --> <div class="cpn-ticket-content" data-astro-cid-4f4jnmqs> <!-- Vertical "GIFT FOR YOU" text --> <div class="cpn-ticket-side-text" data-astro-cid-4f4jnmqs> <span data-astro-cid-4f4jnmqs>GIFT FOR YOU</span> </div> <div data-astro-cid-4f4jnmqs> <div class="cpn-ticket-inner" data-astro-cid-4f4jnmqs> <!-- Discount box --> <div class="cpn-ticket-discount-box" data-astro-cid-4f4jnmqs> <span class="cpn-ticket-discount" data-astro-cid-4f4jnmqs>${coupon.discount}</span> </div> <!-- Coupon label --> <div class="cpn-ticket-label" data-astro-cid-4f4jnmqs>COUPON</div> </div> <p class="coupon-desc" data-astro-cid-4f4jnmqs>${coupon.description}</p> </div> </div> </div> <!-- Right section: barcode stub (clickable) --> <a${addAttribute(coupon.buttonHref || "/contact", "href")} class="cpn-ticket-stub" data-astro-cid-4f4jnmqs> <!-- Barcode --> <div class="cpn-ticket-barcode" data-astro-cid-4f4jnmqs> <div class="cpn-barcode-lines" data-astro-cid-4f4jnmqs> <div class="cpn-barcode-line" style="height: 2px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 3px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 2px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 4px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 3px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 2px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 4px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 2px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 3px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 2px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 4px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 3px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 2px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 3px;" data-astro-cid-4f4jnmqs></div> <div class="cpn-barcode-line" style="height: 4px;" data-astro-cid-4f4jnmqs></div> </div> </div> <div class="cpn-ticket-code" data-astro-cid-4f4jnmqs>${coupon.buttonText || "CLAIM"}</div> </a> </div> </div>`;
  })} </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/CouponsSection.astro", void 0);
const $$Astro$l = createAstro("https://acmeinc.com");
const $$CTAStrip = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$CTAStrip;
  const {
    buttonText = "SCHEDULE NOW",
    buttonHref = "/contact",
    phoneLabel = "Call or Text for Great Service",
    phone = siteConfig.contact.phoneFormatted,
    features = [
      { icon: "siren", text: "24/7 Emergency Service" },
      { icon: "award", text: "Experienced & Certified Technicians" },
      { icon: "shield", text: "Licensed & Insured" }
    ],
    borderColor
  } = Astro2.props;
  const iconSvgs = {
    siren: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18v-6a5 5 0 1 1 10 0v6"></path><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"></path><path d="M21 12h1"></path><path d="M18.5 4.5 18 5"></path><path d="M2 12h1"></path><path d="M12 2v1"></path><path d="m4.929 4.929.707.707"></path><path d="M12 12v6"></path></svg>`,
    award: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
  };
  const borderStyle = borderColor ? `border-top-color: ${borderColor}; border-bottom-color: ${borderColor};` : "";
  return renderTemplate`${maybeRenderHead()}<section class="cta-strip"${addAttribute(borderStyle, "style")} data-astro-cid-7pjqv5r3> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-7pjqv5r3> <div class="cta-inner" data-animate="fade-up" data-astro-cid-7pjqv5r3> <!-- Left: button + phone --> <div class="cta-left" data-astro-cid-7pjqv5r3> <a${addAttribute(buttonHref, "href")} class="cta-btn" data-astro-cid-7pjqv5r3> ${buttonText} </a> <div class="cta-phone" data-astro-cid-7pjqv5r3> <span class="cta-phone-label" data-astro-cid-7pjqv5r3>${phoneLabel}</span> <a${addAttribute(`tel:${phone}`, "href")} class="cta-phone-number" data-astro-cid-7pjqv5r3>${phone}</a> </div> </div> <!-- Right: features --> <div class="cta-features" data-animate-stagger data-astro-cid-7pjqv5r3> ${features.map((feature) => {
    const iconSvg = iconSvgs[feature.icon];
    return renderTemplate`<div class="cta-feature" data-astro-cid-7pjqv5r3> ${iconSvg && renderTemplate`<span class="cta-feature-icon" data-astro-cid-7pjqv5r3> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(iconSvg)}` })} </span>`} <span class="cta-feature-text" data-astro-cid-7pjqv5r3>${feature.text}</span> </div>`;
  })} </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/CTAStrip.astro", void 0);
const $$Astro$k = createAstro("https://acmeinc.com");
const $$ExpertServicesSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$ExpertServicesSection;
  const {
    title,
    highlightedText,
    description,
    image,
    imageAlt = "Service image",
    features
  } = Astro2.props;
  const iconMap = {
    wrench: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    dollar: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`
  };
  return renderTemplate`${maybeRenderHead()}<section class="py-16 md:py-24 bg-background"> <div class="container mx-auto px-4"> <div class="grid md:grid-cols-2 gap-12 items-start"> <!-- Image with border --> <div class="relative" data-animate="fade-right"> <div class="border-4 border-secondary rounded-lg overflow-hidden max-h-[350px]"> <img${addAttribute(image, "src")}${addAttribute(imageAlt, "alt")} class="w-full h-full object-cover" width="665" height="350" loading="lazy" decoding="async"> </div> </div> <!-- Content --> <div data-animate="fade-left"> <h2 class="text-3xl md:text-4xl font-bold mb-4"> ${title} ${highlightedText && renderTemplate`<span class="text-secondary"> ${highlightedText}</span>`} </h2> <p class="text-muted-foreground mb-8 leading-relaxed text-lg">
At <span class="font-semibold text-foreground">${siteConfig.business.fullName}</span>, <span>${unescapeHTML(description)}</span> </p> <!-- Feature boxes grid --> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> ${features.map((feature) => renderTemplate`<div class="flex gap-3"> <div class="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(iconMap[feature.icon] || iconMap.wrench)}` })} </div> <div> <h4 class="font-semibold text-foreground text-lg">${feature.title}</h4> <p class="text-muted-foreground text-base mt-1">${unescapeHTML(feature.description)}</p> </div> </div>`)} </div> </div> </div> </div> </section>`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ExpertServicesSection.astro", void 0);
const $$Astro$j = createAstro("https://acmeinc.com");
const $$FAQSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$FAQSection;
  const { title: rawTitle, subtitle: rawSubtitle, badge = "FAQ", faqs: rawFaqs } = Astro2.props;
  const title = getLocationText(rawTitle);
  const subtitle = rawSubtitle ? getLocationText(rawSubtitle) : void 0;
  const faqs = rawFaqs.map((faq) => ({
    ...faq,
    question: getLocationText(faq.question),
    answer: faq.answer ? getLocationText(faq.answer) : void 0
  }));
  return renderTemplate`${maybeRenderHead()}<section class="fq-section" data-astro-cid-h4zmggu3> <div class="fq-body" data-astro-cid-h4zmggu3> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-h4zmggu3> <!-- Header --> <div class="fq-header" data-animate="fade-up" data-astro-cid-h4zmggu3> <div class="fq-eyebrow" data-astro-cid-h4zmggu3> <span class="fq-eyebrow-text" data-astro-cid-h4zmggu3>${badge}</span> </div> <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start" data-astro-cid-h4zmggu3> <h2 class="fq-title" data-astro-cid-h4zmggu3>${title}</h2> ${subtitle && renderTemplate`<p class="fq-subtitle" data-astro-cid-h4zmggu3>${subtitle}</p>`} </div> </div> <!-- Two-column layout --> <div class="fq-layout" data-astro-cid-h4zmggu3> <!-- Left: Side card --> <div class="fq-side" data-animate="fade-up" data-animate-delay="100" data-astro-cid-h4zmggu3> <div class="fq-side-card" data-astro-cid-h4zmggu3> <span class="fq-side-strip" data-astro-cid-h4zmggu3></span> <div class="fq-side-inner" data-astro-cid-h4zmggu3> <div class="fq-side-icon" data-astro-cid-h4zmggu3> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-h4zmggu3> <circle cx="12" cy="12" r="10" data-astro-cid-h4zmggu3></circle> <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" data-astro-cid-h4zmggu3></path> <line x1="12" y1="17" x2="12.01" y2="17" data-astro-cid-h4zmggu3></line> </svg> </div> <h3 class="fq-side-heading" data-astro-cid-h4zmggu3>Have Questions?</h3> <p class="fq-side-text" data-astro-cid-h4zmggu3>
We're here to help. If you don't find your answer below, reach out to our team directly.
</p> <a href="/contact" class="fq-side-btn" data-astro-cid-h4zmggu3>
Contact Us
<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-h4zmggu3> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-h4zmggu3></path> </svg> </a> </div> </div> </div> <!-- Right: Accordion --> <div class="fq-accordion" data-animate-stagger data-astro-cid-h4zmggu3> ${faqs.filter((faq) => faq.question && faq.answer).map((faq, index) => renderTemplate`<div class="fq-item" data-astro-cid-h4zmggu3> <button class="fq-trigger" aria-expanded="false"${addAttribute(`fq-panel-${index}`, "aria-controls")}${addAttribute(`fq-btn-${index}`, "id")} data-astro-cid-h4zmggu3> <span class="fq-number" data-astro-cid-h4zmggu3>${String(index + 1).padStart(2, "0")}</span> <span class="fq-question" data-astro-cid-h4zmggu3>${faq.question}</span> <span class="fq-chevron" data-astro-cid-h4zmggu3> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-h4zmggu3> <path d="M12 5v14M5 12h14" data-astro-cid-h4zmggu3></path> </svg> </span> </button> <div class="fq-panel"${addAttribute(`fq-panel-${index}`, "id")} role="region"${addAttribute(`fq-btn-${index}`, "aria-labelledby")} data-astro-cid-h4zmggu3> <div class="fq-answer" data-astro-cid-h4zmggu3>${unescapeHTML(faq.answer)}</div> </div> </div>`)} </div> </div> </div> </div> </section> ${renderScript($$result, "C:/Users/rodriguez/TemplateHvac/src/components/sections/FAQSection.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/FAQSection.astro", void 0);
const $$Astro$i = createAstro("https://acmeinc.com");
const $$FinancingIntroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$FinancingIntroSection;
  const { title: rawTitle, description: rawDescription, subtitle: rawSubtitle, benefits: rawBenefits = [] } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = getLocationText(rawDescription);
  const subtitle = rawSubtitle ? getLocationText(rawSubtitle) : void 0;
  const benefits = rawBenefits.map(getLocationText);
  return renderTemplate`${maybeRenderHead()}<section class="fi-section" data-astro-cid-gb47725o> <!-- Airflow pattern background --> <svg class="fi-airflow-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-astro-cid-gb47725o> <defs data-astro-cid-gb47725o> <pattern id="fi-airflow-grid" width="200" height="200" patternUnits="userSpaceOnUse" data-astro-cid-gb47725o> <path d="M 0 100 Q 50 80, 100 100 T 200 100" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4" data-astro-cid-gb47725o></path> <path d="M 0 150 Q 50 130, 100 150 T 200 150" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3" data-astro-cid-gb47725o></path> <path d="M 100 0 Q 80 50, 100 100 T 100 200" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.35" data-astro-cid-gb47725o></path> </pattern> </defs> <rect width="100%" height="100%" fill="url(#fi-airflow-grid)" data-astro-cid-gb47725o></rect> <path d="M 0 200 Q 300 150, 600 200 T 1200 200" stroke="currentColor" stroke-width="2" fill="none" opacity="0.25" data-astro-cid-gb47725o></path> <path d="M 0 400 Q 300 350, 600 400 T 1200 400" stroke="currentColor" stroke-width="2" fill="none" opacity="0.2" data-astro-cid-gb47725o></path> <path d="M 0 600 Q 300 550, 600 600 T 1200 600" stroke="currentColor" stroke-width="2" fill="none" opacity="0.15" data-astro-cid-gb47725o></path> </svg> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-gb47725o> <!-- Header --> <div class="fi-header" data-animate="fade-up" data-astro-cid-gb47725o> <div class="fi-eyebrow" data-astro-cid-gb47725o> <span class="fi-eyebrow-text" data-astro-cid-gb47725o>Financing</span> </div> <h2 class="fi-title" data-astro-cid-gb47725o>${title}</h2> <div class="fi-divider" data-astro-cid-gb47725o></div> <p class="fi-desc" data-astro-cid-gb47725o>${unescapeHTML(description)}</p> </div> <!-- Benefits card --> ${subtitle && benefits.length > 0 && renderTemplate`<div class="fi-card" data-animate="fade-up" data-animate-delay="200" data-astro-cid-gb47725o> <span class="fi-card-accent" data-astro-cid-gb47725o></span> <div class="fi-card-inner" data-astro-cid-gb47725o> <div class="fi-card-header" data-astro-cid-gb47725o> <div class="fi-card-header-line" data-astro-cid-gb47725o></div> <h3 class="fi-card-heading" data-astro-cid-gb47725o>${subtitle}</h3> </div> <div class="fi-benefits" data-astro-cid-gb47725o> ${benefits.map((benefit) => renderTemplate`<div class="fi-benefit" data-astro-cid-gb47725o> <span class="fi-benefit-dot" data-astro-cid-gb47725o></span> <span class="fi-benefit-text" data-astro-cid-gb47725o>${benefit}</span> </div>`)} </div> </div> </div>`} </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/FinancingIntroSection.astro", void 0);
const $$Astro$h = createAstro("https://acmeinc.com");
const $$FinancingPlansSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$FinancingPlansSection;
  const { badge, title, subtitle, items, variant = "plans" } = Astro2.props;
  const serviceImages = [
    "https://trusteyman.com/wp-content/uploads/2020/06/AdobeStock_162711692-1024x683.jpeg",
    "https://mrhomeservicesnj.com/wp-content/uploads/2016/12/Heating-Services.jpg",
    "https://saguaroairsolutions.com/wp-content/uploads/2026/01/about-us-image.jpg-2.png",
    "https://all-spec.net/wp-content/uploads/2024/05/emergency-hvac.jpg"
  ];
  const iconSvgs = {
    percent: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
    zero: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>`,
    calendar: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    building: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
    wrench: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    map: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  };
  const defaultIconKey = variant === "services" ? "wrench" : "check";
  function getIcon(key) {
    return iconSvgs[key || ""] || iconSvgs[defaultIconKey];
  }
  return renderTemplate`<!-- ============ FEATURES VARIANT ============ -->${variant === "features" && renderTemplate`${maybeRenderHead()}<section class="fps-feat" data-astro-cid-my45vyv5><div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-my45vyv5><div class="fps-feat-header" data-animate="fade-up" data-astro-cid-my45vyv5>${badge && renderTemplate`<div class="fps-feat-eyebrow" data-astro-cid-my45vyv5><span class="fps-feat-eyebrow-text" data-astro-cid-my45vyv5>${badge}</span></div>`}<h2 class="fps-feat-title" data-astro-cid-my45vyv5>${title}</h2><div class="fps-feat-divider" data-astro-cid-my45vyv5></div>${subtitle && renderTemplate`<p class="fps-feat-subtitle" data-astro-cid-my45vyv5>${subtitle}</p>`}</div><div class="fps-feat-grid" data-animate-stagger data-astro-cid-my45vyv5>${items.map((item, i) => renderTemplate`<div class="fps-feat-card group" data-astro-cid-my45vyv5><div class="fps-feat-step-wrap" data-astro-cid-my45vyv5><div class="fps-feat-step" data-astro-cid-my45vyv5>${String(i + 1).padStart(2, "0")}</div>${i < items.length - 1 && renderTemplate`<div class="fps-feat-line" aria-hidden="true" data-astro-cid-my45vyv5></div>`}</div><div class="fps-feat-body" data-astro-cid-my45vyv5><span class="fps-feat-accent" data-astro-cid-my45vyv5></span><div class="fps-feat-inner" data-astro-cid-my45vyv5><div class="fps-feat-icon" data-astro-cid-my45vyv5>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(getIcon(item.icon))}` })}</div><h3 class="fps-feat-card-title" data-astro-cid-my45vyv5>${item.title}</h3>${item.text && renderTemplate`<p class="fps-feat-card-text" data-astro-cid-my45vyv5>${item.text}</p>`}</div></div></div>`)}</div></div></section>`}<!-- ============ SERVICES VARIANT ============ -->${variant === "services" && renderTemplate`<section class="fps-svc" data-astro-cid-my45vyv5><div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-my45vyv5><div class="fps-svc-header" data-animate="fade-up" data-astro-cid-my45vyv5>${badge && renderTemplate`<div class="fps-svc-eyebrow" data-astro-cid-my45vyv5><span class="fps-svc-eyebrow-text" data-astro-cid-my45vyv5>${badge}</span></div>`}<h2 class="fps-svc-title" data-astro-cid-my45vyv5>${title}</h2><div class="fps-svc-divider" data-astro-cid-my45vyv5></div>${subtitle && renderTemplate`<p class="fps-svc-subtitle" data-astro-cid-my45vyv5>${subtitle}</p>`}</div><div${addAttribute([
    "fps-svc-grid",
    items.length <= 3 ? "fps-svc-grid--narrow" : ""
  ], "class:list")} data-animate-stagger data-astro-cid-my45vyv5>${items.map((item, index) => {
    const isLink = !!item.href;
    const Tag = isLink ? "a" : "div";
    const cardImage = serviceImages[index % serviceImages.length];
    return renderTemplate`${renderComponent($$result, "Tag", Tag, { "href": isLink ? item.href : void 0, "class": "fps-svc-card group", "data-astro-cid-my45vyv5": true }, { "default": ($$result2) => renderTemplate`<div class="fps-svc-img" data-astro-cid-my45vyv5><img${addAttribute(cardImage, "src")}${addAttribute(item.title, "alt")} class="fps-svc-img-el" width="740" height="494" loading="lazy" decoding="async" data-astro-cid-my45vyv5><div class="fps-svc-img-overlay" data-astro-cid-my45vyv5></div></div><span class="fps-svc-strip" data-astro-cid-my45vyv5></span><div class="fps-svc-body" data-astro-cid-my45vyv5><h3 class="fps-svc-card-title" data-astro-cid-my45vyv5>${item.title}</h3>${item.text && renderTemplate`<p class="fps-svc-card-text" data-astro-cid-my45vyv5>${item.text}</p>`}${isLink && renderTemplate`<div class="fps-svc-arrow" data-astro-cid-my45vyv5><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-my45vyv5><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-my45vyv5></path></svg></div>`}</div>` })}`;
  })}</div></div></section>`}<!-- ============ PLANS VARIANT (default) ============ -->${variant === "plans" && renderTemplate`<section class="fps-plan" data-astro-cid-my45vyv5><div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-my45vyv5><div class="fps-plan-header" data-animate="fade-up" data-astro-cid-my45vyv5>${badge && renderTemplate`<div class="fps-plan-eyebrow" data-astro-cid-my45vyv5><span class="fps-plan-eyebrow-text" data-astro-cid-my45vyv5>${badge}</span></div>`}<h2 class="fps-plan-title" data-astro-cid-my45vyv5>${title}</h2><div class="fps-plan-divider" data-astro-cid-my45vyv5></div>${subtitle && renderTemplate`<p class="fps-plan-subtitle" data-astro-cid-my45vyv5>${subtitle}</p>`}</div><div${addAttribute([
    "fps-plan-grid",
    items.length <= 3 ? "fps-plan-grid--narrow" : ""
  ], "class:list")} data-animate-stagger data-astro-cid-my45vyv5>${items.map((item, i) => renderTemplate`<div class="fps-plan-card group" data-astro-cid-my45vyv5><span class="fps-plan-accent" data-astro-cid-my45vyv5></span><div class="fps-plan-bg-num" aria-hidden="true" data-astro-cid-my45vyv5>${String(i + 1).padStart(2, "0")}</div><div class="fps-plan-inner" data-astro-cid-my45vyv5><div class="fps-plan-icon" data-astro-cid-my45vyv5>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(getIcon(item.icon))}` })}</div><h3 class="fps-plan-card-title" data-astro-cid-my45vyv5>${item.title}</h3>${item.text && renderTemplate`<p class="fps-plan-card-text" data-astro-cid-my45vyv5>${item.text}</p>`}</div></div>`)}</div></div></section>`}`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/FinancingPlansSection.astro", void 0);
const $$Astro$g = createAstro("https://acmeinc.com");
const $$FinancingSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$FinancingSection;
  const {
    badge,
    title,
    description,
    paymentPlans,
    financingOptions,
    steps,
    buttonText = "Apply Now",
    buttonHref = "/financing"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="fin-section" data-astro-cid-vuqd6vaf> <!-- Airflow pattern background --> <svg class="fin-airflow-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-astro-cid-vuqd6vaf> <defs data-astro-cid-vuqd6vaf> <pattern id="airflow-grid" width="200" height="200" patternUnits="userSpaceOnUse" data-astro-cid-vuqd6vaf> <path d="M 0 100 Q 50 80, 100 100 T 200 100" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4" data-astro-cid-vuqd6vaf></path> <path d="M 0 150 Q 50 130, 100 150 T 200 150" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3" data-astro-cid-vuqd6vaf></path> <path d="M 100 0 Q 80 50, 100 100 T 100 200" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.35" data-astro-cid-vuqd6vaf></path> </pattern> </defs> <rect width="100%" height="100%" fill="url(#airflow-grid)" data-astro-cid-vuqd6vaf></rect> <path d="M 0 200 Q 300 150, 600 200 T 1200 200" stroke="currentColor" stroke-width="2" fill="none" opacity="0.25" data-astro-cid-vuqd6vaf></path> <path d="M 0 400 Q 300 350, 600 400 T 1200 400" stroke="currentColor" stroke-width="2" fill="none" opacity="0.2" data-astro-cid-vuqd6vaf></path> <path d="M 0 600 Q 300 550, 600 600 T 1200 600" stroke="currentColor" stroke-width="2" fill="none" opacity="0.15" data-astro-cid-vuqd6vaf></path> </svg> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-vuqd6vaf> <!-- Header --> <div class="fin-header" data-animate="fade-scale" data-astro-cid-vuqd6vaf> <div class="fin-eyebrow" data-astro-cid-vuqd6vaf> <span class="fin-eyebrow-text" data-astro-cid-vuqd6vaf>Financing</span> </div> <h2 class="fin-title" data-astro-cid-vuqd6vaf>${title}</h2> <p class="fin-desc" data-astro-cid-vuqd6vaf>${unescapeHTML(description)}</p> </div> <!-- Two-column lists --> <div class="fin-lists" data-astro-cid-vuqd6vaf> <div class="fin-list-card" data-animate="fade-right" data-astro-cid-vuqd6vaf> <div class="fin-list-header" data-astro-cid-vuqd6vaf> <span class="fin-list-accent" data-astro-cid-vuqd6vaf></span> <h3 class="fin-list-heading" data-astro-cid-vuqd6vaf>Why Choose Our Financing?</h3> </div> <ul class="fin-list" data-astro-cid-vuqd6vaf> ${paymentPlans.map((plan) => renderTemplate`<li class="fin-list-item" data-astro-cid-vuqd6vaf> <span class="fin-check-dot" data-astro-cid-vuqd6vaf></span> <span data-astro-cid-vuqd6vaf>${plan}</span> </li>`)} </ul> </div> <div class="fin-list-card" data-animate="fade-left" data-animate-delay="200" data-astro-cid-vuqd6vaf> <div class="fin-list-header" data-astro-cid-vuqd6vaf> <span class="fin-list-accent" data-astro-cid-vuqd6vaf></span> <h3 class="fin-list-heading" data-astro-cid-vuqd6vaf>What Can You Finance?</h3> </div> <ul class="fin-list" data-astro-cid-vuqd6vaf> ${financingOptions.map((option) => renderTemplate`<li class="fin-list-item" data-astro-cid-vuqd6vaf> <span class="fin-check-dot" data-astro-cid-vuqd6vaf></span> <span data-astro-cid-vuqd6vaf>${option}</span> </li>`)} </ul> </div> </div> <!-- Steps --> <div class="fin-steps" data-animate-stagger data-astro-cid-vuqd6vaf> ${steps.map((step, i) => renderTemplate`<div class="fin-step" data-astro-cid-vuqd6vaf> <div class="fin-step-top" data-astro-cid-vuqd6vaf> <div class="fin-step-num" data-astro-cid-vuqd6vaf>${String(i + 1).padStart(2, "0")}</div> ${i < steps.length - 1 && renderTemplate`<div class="fin-step-line" aria-hidden="true" data-astro-cid-vuqd6vaf></div>`} </div> <h4 class="fin-step-title" data-astro-cid-vuqd6vaf>${step.title}</h4> <p class="fin-step-text" data-astro-cid-vuqd6vaf>${unescapeHTML(step.description)}</p> </div>`)} </div> <!-- CTA --> <div class="fin-cta" data-animate="fade-up" data-astro-cid-vuqd6vaf> <a${addAttribute(buttonHref, "href")} class="fin-btn" data-astro-cid-vuqd6vaf> ${buttonText} <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-vuqd6vaf><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-vuqd6vaf></path></svg> </a> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/FinancingSection.astro", void 0);
const $$Astro$f = createAstro("https://acmeinc.com");
const $$HeroPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$HeroPage;
  const {
    title: rawTitle,
    subtitle: rawSubtitle,
    buttonText = "Get a Quote",
    buttonHref = "/contact",
    image = "/images/bg2.jpg",
    imageAlt = "Service background",
    backgroundImage,
    trustIndicators: rawTrustIndicators = []
  } = Astro2.props;
  const title = getLocationText(rawTitle);
  const subtitle = rawSubtitle ? getLocationText(rawSubtitle) : void 0;
  const trustIndicators = rawTrustIndicators.map(getLocationText);
  const bgSrc = backgroundImage || image;
  bgSrc.startsWith("http://") || bgSrc.startsWith("https://");
  return renderTemplate`${maybeRenderHead()}<section class="hp-hero" data-astro-cid-gletljog> <!-- Top highlight bar --> <div class="hp-bar" data-astro-cid-gletljog></div> <!-- Background image --> <div class="hp-bg" data-astro-cid-gletljog> <img${addAttribute(bgSrc, "src")}${addAttribute(imageAlt, "alt")} class="hp-bg-img" loading="eager" fetchpriority="high" width="1440" height="810" data-astro-cid-gletljog> <div class="hp-overlay" data-astro-cid-gletljog></div> </div> <!-- Content --> <div class="hp-content" data-astro-cid-gletljog> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-gletljog> <div class="hp-inner" data-astro-cid-gletljog> <!-- Left: text --> <div class="hp-text" data-astro-cid-gletljog> <!-- Eyebrow --> ${subtitle && renderTemplate`<div class="hp-eyebrow-wrap" data-animate="fade-up" data-astro-cid-gletljog> <div class="hp-eyebrow-line" data-astro-cid-gletljog></div> <span class="hp-eyebrow" data-astro-cid-gletljog>${subtitle}</span> </div>`} <h1 class="hp-title" data-animate="fade-up" data-animate-delay="100" data-astro-cid-gletljog> ${title.split(" ").map((word, idx) => renderTemplate`<span class="hp-title-word"${addAttribute(`--word-index: ${idx}`, "style")} data-astro-cid-gletljog> <span class="hp-title-bg-word" data-astro-cid-gletljog></span> <span class="hp-title-text" data-astro-cid-gletljog>${word}</span> </span>`).reduce((acc, curr, idx) => {
    if (idx === 0) return [curr];
    return [...acc, " ", curr];
  }, [])} </h1> <!-- Trust indicators --> ${trustIndicators.length > 0 && renderTemplate`<div class="hp-trust" data-animate="fade-up" data-animate-delay="200" data-astro-cid-gletljog> ${trustIndicators.map((item) => renderTemplate`<span class="hp-trust-item" data-astro-cid-gletljog> <svg xmlns="http://www.w3.org/2000/svg" class="hp-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-gletljog> <path d="M20 6 9 17l-5-5" data-astro-cid-gletljog></path> </svg> ${item} </span>`)} </div>`} <!-- CTAs --> <div class="hp-actions" data-animate="fade-up" data-animate-delay="300" data-astro-cid-gletljog> <a${addAttribute(buttonHref, "href")} class="hp-btn hp-btn-highlight" data-astro-cid-gletljog> ${buttonText} <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-gletljog> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-gletljog></path> </svg> </a> <a${addAttribute(`tel:${siteConfig.contact.phone}`, "href")} class="hp-btn hp-btn-outline" data-astro-cid-gletljog> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-gletljog> <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" data-astro-cid-gletljog></path> </svg> ${siteConfig.contact.phoneFormatted} </a> </div> </div> </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/HeroPage.astro", void 0);
function getOptimizedImageUrl(url, options = {}) {
  const { width = 1920, quality = 80, format = "webp" } = options;
  if (url.startsWith("/")) {
    return url;
  }
  try {
    const urlObj = new URL(url);
    if (urlObj.search) {
      return url;
    }
    if (urlObj.hostname.includes("unsplash.com")) {
      urlObj.searchParams.set("w", width.toString());
      urlObj.searchParams.set("q", quality.toString());
      urlObj.searchParams.set("fm", format);
      return urlObj.toString();
    }
    if (urlObj.hostname.includes("pexels.com")) {
      urlObj.searchParams.set("w", width.toString());
      urlObj.searchParams.set("auto", "compress");
      return urlObj.toString();
    }
    return url;
  } catch {
    return url;
  }
}
var __freeze = Object.freeze;
var __defProp2 = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp2(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$e = createAstro("https://acmeinc.com");
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const bg2Img = "/images/bg2.jpg";
  const defaultHeroImages = [
    "https://f.hubspotusercontent40.net/hubfs/9492292/AdobeStock_290366802.jpeg",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80",
    "https://images.pexels.com/photos/34069/pexels-photo.jpg?auto=compress&w=1920"
  ];
  const {
    variant = "slider",
    buttonHref = "#",
    images,
    badge,
    title: subpageTitle,
    subtitle: subpageSubtitle,
    buttonText: subpageButtonText = "SCHEDULE SERVICE",
    image: subpageImage,
    imageAlt = "HVAC service",
    trustIndicators
  } = Astro2.props;
  const heroImages = images && images.length > 0 ? images : defaultHeroImages;
  const slides = [
    {
      title: "Fast, Reliable, & Affordable Service",
      subtitle: "Need HVAC Repair or New Installation? We've Got You Covered!",
      buttonText: "Schedule a Call",
      statNumber: "$99",
      statLabel: "Service Call",
      statDescription: "Expert Repairs & Installation included with every visit.",
      bgImage: getOptimizedImageUrl(heroImages[0 % heroImages.length], { width: 1920, quality: 75 })
    },
    {
      title: "Flexible Financing Available",
      subtitle: "No Interest. No Payments. Until 2026!",
      buttonText: "Learn More",
      statNumber: "0%",
      statLabel: "Interest",
      statDescription: "With approved financing. Ask us about our flexible plans.",
      bgImage: getOptimizedImageUrl(heroImages[1 % heroImages.length], { width: 1920, quality: 75 })
    },
    {
      title: "Limited Time Offer — Don't Miss Out!",
      subtitle: "Furnace Tune-Up Special! Only $95 with Coupon!",
      buttonText: "Call Now",
      statNumber: "1yr",
      statLabel: "Warranty",
      statDescription: "Warranty on furnace repair. Expert maintenance for peak efficiency.",
      bgImage: getOptimizedImageUrl(heroImages[2 % heroImages.length], { width: 1920, quality: 75 })
    }
  ];
  const isSlider = variant === "slider";
  return renderTemplate(_a || (_a = __template(["", "<script>\n  var HERO_INTERVAL = 5000;\n  var heroTimer;\n\n  function initHeroSlider() {\n    if (heroTimer) { clearInterval(heroTimer); heroTimer = undefined; }\n\n    var slides    = document.querySelectorAll('.hero-slide');\n    var dots      = document.querySelectorAll('.hero-dot');\n    var bgs       = document.querySelectorAll('.hero-bg');\n    var slopeSets = document.querySelectorAll('[data-slope-set]');\n    var fill      = document.querySelector('.progress-fill');\n\n    if (!slides.length || !dots.length) return;\n\n    var current = 0;\n\n    function goTo(index) {\n      // Batch all DOM reads first (avoid layout thrashing)\n      var prevSlide = slides[current];\n      var prevDot = dots[current];\n      var prevBg = bgs[current];\n      var prevSlopeSet = slopeSets[current];\n      \n      // Then batch all DOM writes\n      prevSlide.classList.remove('active');\n      prevSlide.style.position = 'absolute';\n      prevSlide.style.width = '100%';\n      prevDot.classList.remove('active');\n      if (prevBg) prevBg.classList.replace('opacity-100', 'opacity-0');\n      if (prevSlopeSet) prevSlopeSet.classList.remove('active');\n\n      current = index;\n\n      var nextSlide = slides[current];\n      var nextDot = dots[current];\n      var nextBg = bgs[current];\n      var nextSlopeSet = slopeSets[current];\n\n      nextSlide.classList.add('active');\n      nextSlide.style.position = '';\n      nextSlide.style.width = '';\n      nextDot.classList.add('active');\n      if (nextBg) nextBg.classList.replace('opacity-0', 'opacity-100');\n\n      // Retrigger slope entrance animation using requestAnimationFrame (no forced reflow)\n      if (nextSlopeSet) {\n        requestAnimationFrame(function() {\n          nextSlopeSet.classList.add('active');\n        });\n      }\n\n      startProgress();\n    }\n\n    function startProgress() {\n      if (fill) {\n        fill.style.transition = 'none';\n        fill.style.width = '0%';\n        requestAnimationFrame(function () {\n          requestAnimationFrame(function () {\n            fill.style.transition = 'width ' + HERO_INTERVAL + 'ms linear';\n            fill.style.width = '100%';\n          });\n        });\n      }\n      if (heroTimer) clearInterval(heroTimer);\n      heroTimer = setInterval(function () { goTo((current + 1) % slides.length); }, HERO_INTERVAL);\n    }\n\n    dots.forEach(function (dot, i) {\n      dot.addEventListener('click', function () { goTo(i); });\n    });\n\n    startProgress();\n  }\n\n  initHeroSlider();\n  document.addEventListener('astro:page-load', initHeroSlider);\n<\/script>"])), isSlider ? renderTemplate`${maybeRenderHead()}<section class="hero-section relative w-full overflow-hidden" data-astro-cid-7nmnspah><!-- Full background images (behind everything) -->${slides.map((slide, i) => renderTemplate`<div${addAttribute(`hero-bg absolute inset-0 transition-opacity duration-700 ${i === 0 ? "opacity-100" : "opacity-0"}`, "class")}${addAttribute(i, "data-bg")} data-astro-cid-7nmnspah><img${addAttribute(slide.bgImage, "src")} alt="HVAC background" class="absolute inset-0 w-full h-full object-cover"${addAttribute(i === 0 ? "eager" : "lazy", "loading")}${addAttribute(i === 0 ? "high" : "low", "fetchpriority")} decoding="async" width="1920" height="1080" data-astro-cid-7nmnspah></div>`)}<!-- Accent bar --><div class="absolute top-0 left-0 w-full h-1 bg-brand-highlight z-[5]" data-astro-cid-7nmnspah></div><!--
    SLOPE LAYERS
    ─────────────────────────────────────────────────────────────
    The root problem with the original code: SVG <pattern> +
    polygon opacity renders inconsistently across browsers.
    The pattern image draws at full opacity; the polygon opacity
    only tints the geometry, NOT the image fill inside it.

    Fix: replace SVG patterns with CSS clip-path divs.
    Each slope is a full-size absolutely-positioned div whose
    <img> is clipped to the desired polygon using clip-path.
    Opacity is applied to the wrapper div — this correctly
    composites the image at the intended transparency.

    Polygon % values derived from original SVG (viewBox 0 0 1440 800):
      White solid : 0,0  →  480,0  →  820,800  →  0,800
                    0%      33.3%     56.9%        0%

      Slope A (100%):  480,0 → 600,0 → 940,800 → 820,800
                       33.3%   41.7%   65.3%      56.9%

      Slope B (55%):   580,0 → 700,0 → 1040,800 → 920,800
                       40.3%   48.6%   72.2%       63.9%

      Slope C (25%):   680,0 → 1440,0 → 1440,800 → 1020,800
                       47.2%   100%      100%        70.8%
    ─────────────────────────────────────────────────────────────
  --><!-- Static solid white polygon with blur edge --><div class="slope-white absolute inset-0 z-[1] pointer-events-none" data-astro-cid-7nmnspah><svg class="h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-7nmnspah><defs data-astro-cid-7nmnspah><linearGradient id="edge-fade" x1="0%" y1="0%" x2="100%" y2="0%" data-astro-cid-7nmnspah><stop offset="0%" style="stop-color:white;stop-opacity:1" data-astro-cid-7nmnspah></stop><stop offset="70%" style="stop-color:white;stop-opacity:1" data-astro-cid-7nmnspah></stop><stop offset="85%" style="stop-color:white;stop-opacity:0.6" data-astro-cid-7nmnspah></stop><stop offset="100%" style="stop-color:white;stop-opacity:0" data-astro-cid-7nmnspah></stop></linearGradient></defs><polygon points="0,0 480,0 820,800 0,800" fill="url(#edge-fade)" data-astro-cid-7nmnspah></polygon></svg></div><!-- Per-slide image slope sets --><div class="absolute inset-0 z-[2] pointer-events-none" data-astro-cid-7nmnspah>${slides.map((slide, i) => renderTemplate`<div${addAttribute(`slope-set absolute inset-0 ${i === 0 ? "active" : ""}`, "class")}${addAttribute(i, "data-slope-set")} data-astro-cid-7nmnspah><!-- Slope A: full opacity --><div class="slope-wrap slope-a" data-astro-cid-7nmnspah><img${addAttribute(slide.bgImage, "src")} alt="" aria-hidden="true" class="slope-img"${addAttribute(i === 0 ? "eager" : "lazy", "loading")}${addAttribute(i === 0 ? "high" : "low", "fetchpriority")} decoding="async" width="1920" height="1080" data-astro-cid-7nmnspah></div><!-- Slope B: 55% opacity --><div class="slope-wrap slope-b" data-astro-cid-7nmnspah><img${addAttribute(slide.bgImage, "src")} alt="" aria-hidden="true" class="slope-img" loading="lazy" fetchpriority="low" decoding="async" width="1920" height="1080" data-astro-cid-7nmnspah></div><!-- Slope C: 25% opacity --><div class="slope-wrap slope-c" data-astro-cid-7nmnspah><img${addAttribute(slide.bgImage, "src")} alt="" aria-hidden="true" class="slope-img" loading="lazy" fetchpriority="low" decoding="async" width="1920" height="1080" data-astro-cid-7nmnspah></div></div>`)}</div><!-- Content — pinned bottom-left --><div class="relative z-[3] container mx-auto px-6 md:px-12 lg:px-16 flex items-end min-h-[85vh]" data-astro-cid-7nmnspah><div class="hero-content max-w-2xl pb-16 md:pb-20 lg:pb-24" data-astro-cid-7nmnspah><div class="slides-container relative" data-astro-cid-7nmnspah>${slides.map((slide, i) => renderTemplate`<div${addAttribute(`hero-slide ${i === 0 ? "active" : ""}`, "class")}${addAttribute(i, "data-slide")} data-astro-cid-7nmnspah><!-- Eyebrow badge with modern styling --><div class="mb-6" data-astro-cid-7nmnspah><div class="border-l-4 border-l-[#FF6F00] inline-flex items-center gap-3 px-5 py-3 bg-[#0A2540]/95 backdrop-blur-sm shadow-xl border border-[#1E3A5F]" data-astro-cid-7nmnspah><span class="flex items-center justify-center" data-astro-cid-7nmnspah><span class="text-[#FF6F00] font-black text-lg" data-astro-cid-7nmnspah>${slide.statNumber}</span></span><span class="text-xs font-bold tracking-[0.12em] uppercase text-white" data-astro-cid-7nmnspah>${slide.statLabel}</span></div></div><!-- Title with enhanced typography --><div class="relative mb-6" data-astro-cid-7nmnspah><h1 class="hero-title text-[2.5rem] md:text-6xl lg:text-7xl font-black leading-[0.95] uppercase tracking-[-0.02em] relative" data-astro-cid-7nmnspah>${getLocationText(slide.title).split(" ").map((word, idx) => renderTemplate`<span class="hero-title-word inline-block"${addAttribute(`--word-index: ${idx}`, "style")} data-astro-cid-7nmnspah><span class="hero-title-bg-word absolute inset-0 -z-10" data-astro-cid-7nmnspah></span><span class="relative" data-astro-cid-7nmnspah>${word}</span></span>`)}</h1></div><!-- Subtitle with better spacing --><p class="hero-subtitle text-base md:text-lg leading-relaxed max-w-lg mb-8 font-medium" data-astro-cid-7nmnspah>${slide.subtitle}</p><!-- CTA button --><a${addAttribute(buttonHref, "href")} class="hero-cta" data-astro-cid-7nmnspah>${slide.buttonText}<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-7nmnspah><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-7nmnspah></path></svg></a></div>`)}</div><!-- Dots with modern design --><div class="flex items-center gap-4 mt-12" data-astro-cid-7nmnspah><div class="flex items-center gap-2" data-astro-cid-7nmnspah>${slides.map((_, i) => renderTemplate`<button${addAttribute(`hero-dot transition-all duration-300 ${i === 0 ? "active" : ""}`, "class")}${addAttribute(i, "data-index")}${addAttribute(`Slide ${i + 1}`, "aria-label")} data-astro-cid-7nmnspah></button>`)}</div><div class="progress-track flex-1 max-w-24 h-1 bg-[#0A2540]/40 rounded-full overflow-hidden backdrop-blur-sm border border-[#0A2540]/20" data-astro-cid-7nmnspah><div class="progress-fill h-full rounded-full bg-brand-highlight" data-astro-cid-7nmnspah></div></div></div></div></div></section>` : renderTemplate`<!-- SUBPAGE VARIANT -->
<section class="hero-section relative w-full overflow-hidden" data-astro-cid-7nmnspah><!-- Full background image --><div class="absolute inset-0" data-astro-cid-7nmnspah><img${addAttribute(subpageImage || bg2Img, "src")}${addAttribute(imageAlt, "alt")} class="absolute inset-0 w-full h-full object-cover" loading="eager" fetchpriority="high" decoding="async" width="1920" height="1080" data-astro-cid-7nmnspah></div><!-- Accent bar --><div class="absolute top-0 left-0 w-full h-1 bg-brand-highlight z-[5]" data-astro-cid-7nmnspah></div><!-- Static solid white polygon with blur edge --><div class="slope-white absolute inset-0 z-[1] pointer-events-none" data-astro-cid-7nmnspah><svg class="h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-7nmnspah><defs data-astro-cid-7nmnspah><linearGradient id="edge-fade-subpage" x1="0%" y1="0%" x2="100%" y2="0%" data-astro-cid-7nmnspah><stop offset="0%" style="stop-color:white;stop-opacity:1" data-astro-cid-7nmnspah></stop><stop offset="70%" style="stop-color:white;stop-opacity:1" data-astro-cid-7nmnspah></stop><stop offset="85%" style="stop-color:white;stop-opacity:0.6" data-astro-cid-7nmnspah></stop><stop offset="100%" style="stop-color:white;stop-opacity:0" data-astro-cid-7nmnspah></stop></linearGradient></defs><polygon points="0,0 480,0 820,800 0,800" fill="url(#edge-fade-subpage)" data-astro-cid-7nmnspah></polygon></svg></div><!-- Slope layers with image --><div class="absolute inset-0 z-[2] pointer-events-none" data-astro-cid-7nmnspah><div class="slope-set-subpage absolute inset-0" data-astro-cid-7nmnspah><!-- Slope A: full opacity --><div class="slope-wrap slope-a" data-astro-cid-7nmnspah><img${addAttribute(subpageImage || bg2Img, "src")} alt="" aria-hidden="true" class="slope-img" loading="eager" fetchpriority="high" decoding="async" width="1920" height="1080" data-astro-cid-7nmnspah></div><!-- Slope B: 55% opacity --><div class="slope-wrap slope-b" data-astro-cid-7nmnspah><img${addAttribute(subpageImage || bg2Img, "src")} alt="" aria-hidden="true" class="slope-img" loading="lazy" fetchpriority="low" decoding="async" width="1920" height="1080" data-astro-cid-7nmnspah></div><!-- Slope C: 25% opacity --><div class="slope-wrap slope-c" data-astro-cid-7nmnspah><img${addAttribute(subpageImage || bg2Img, "src")} alt="" aria-hidden="true" class="slope-img" loading="lazy" fetchpriority="low" decoding="async" width="1920" height="1080" data-astro-cid-7nmnspah></div></div></div><!-- Content — pinned bottom-left --><div class="relative z-[3] container mx-auto px-6 md:px-12 lg:px-16 flex items-end min-h-[85vh]" data-astro-cid-7nmnspah><div class="hero-content max-w-2xl pb-16 md:pb-20 lg:pb-24" data-astro-cid-7nmnspah>${badge && renderTemplate`<div class="mb-6" data-astro-cid-7nmnspah><div class="border-l-4 border-l-[#FF6F00] inline-flex items-center gap-3 px-5 py-3 bg-[#0A2540]/95 backdrop-blur-sm shadow-xl border border-[#1E3A5F]" data-astro-cid-7nmnspah><span class="text-xs font-bold tracking-[0.12em] uppercase text-white" data-astro-cid-7nmnspah>${getLocationText(badge)}</span></div></div>`}<div class="relative mb-6" data-astro-cid-7nmnspah><h1 class="hero-title text-[2.5rem] md:text-6xl lg:text-7xl font-black leading-[0.95] uppercase tracking-[-0.02em] relative" data-astro-cid-7nmnspah>${subpageTitle && getLocationText(subpageTitle).split(" ").map((word, idx) => renderTemplate`<span class="hero-title-word inline-block"${addAttribute(`--word-index: ${idx}`, "style")} data-astro-cid-7nmnspah><span class="hero-title-bg-word absolute inset-0 -z-10" data-astro-cid-7nmnspah></span><span class="relative" data-astro-cid-7nmnspah>${word}</span></span>`)}</h1></div>${subpageSubtitle && renderTemplate`<p class="hero-subtitle text-base md:text-lg leading-relaxed max-w-lg mb-8 font-medium" data-astro-cid-7nmnspah>${getLocationText(subpageSubtitle)}</p>`}${trustIndicators && trustIndicators.length > 0 && renderTemplate`<div class="flex flex-wrap gap-4 mb-8" data-astro-cid-7nmnspah>${trustIndicators.map((indicator) => renderTemplate`<span class="inline-flex items-center gap-2 text-sm font-medium" style="color: #1a1a1a; text-shadow: 0 1px 10px rgba(255, 255, 255, 0.5);" data-astro-cid-7nmnspah><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-brand-highlight" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7nmnspah><path d="M20 6 9 17l-5-5" data-astro-cid-7nmnspah></path></svg>${getLocationText(indicator)}</span>`)}</div>`}${subpageButtonText && renderTemplate`<a${addAttribute(buttonHref, "href")} class="hero-cta" data-astro-cid-7nmnspah>${subpageButtonText}<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-7nmnspah><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-7nmnspah></path></svg></a>`}</div></div></section>`);
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/HeroSection.astro", void 0);
const $$Astro$d = createAstro("https://acmeinc.com");
const $$ImageCardsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$ImageCardsSection;
  const { cards } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-12 md:py-16"> <div class="container mx-auto px-4"> <div class="grid md:grid-cols-3 gap-6" data-animate-stagger> ${cards.map((card) => renderTemplate`<div class="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-card border-2 border-transparent hover:border-brand-highlight"> <div class="aspect-[4/3] overflow-hidden"> <img${addAttribute(card.image, "src")}${addAttribute(card.title || "Service image", "alt")} class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" width="740" height="555" loading="lazy" decoding="async"> </div> ${(card.title || card.description) && renderTemplate`<div class="p-4"> ${card.title && renderTemplate`<h3 class="font-semibold text-lg mb-2">${card.title}</h3>`} ${card.description && renderTemplate`<p class="text-muted-foreground text-lg">${unescapeHTML(card.description)}</p>`} </div>`} </div>`)} </div> </div> </section>`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ImageCardsSection.astro", void 0);
const $$Astro$c = createAstro("https://acmeinc.com");
const $$JobOpeningsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$JobOpeningsSection;
  const { badge, title, description, jobs, introTitle: rawIntroTitle, introDescription: rawIntroDescription } = Astro2.props;
  const introTitle = rawIntroTitle ? getLocationText(rawIntroTitle) : void 0;
  const introDescription = rawIntroDescription ? getLocationText(rawIntroDescription) : void 0;
  return renderTemplate`${maybeRenderHead()}<section class="jo-section" id="openings" data-astro-cid-ah6yd4uy> <div class="jo-body" data-astro-cid-ah6yd4uy> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-ah6yd4uy>  ${introTitle && renderTemplate`<div class="jo-intro" data-animate="fade-up" data-astro-cid-ah6yd4uy> <div class="jo-eyebrow" data-astro-cid-ah6yd4uy> <span class="jo-eyebrow-text" data-astro-cid-ah6yd4uy>Careers</span> </div> <h2 class="jo-intro-title" data-astro-cid-ah6yd4uy>${introTitle}</h2> <div class="jo-divider" data-astro-cid-ah6yd4uy></div> ${introDescription && renderTemplate`<p class="jo-intro-desc" data-astro-cid-ah6yd4uy>${introDescription}</p>`} </div>`}  <div class="jo-subheader" data-animate="fade-up" data-astro-cid-ah6yd4uy> <div class="jo-subheader-inner" data-astro-cid-ah6yd4uy> <div class="jo-subheader-line" data-astro-cid-ah6yd4uy></div> <h3 class="jo-subheader-title" data-astro-cid-ah6yd4uy>${title}</h3> </div> ${description && renderTemplate`<p class="jo-subheader-desc" data-astro-cid-ah6yd4uy>${unescapeHTML(description)}</p>`} </div>  <div class="jo-grid" data-animate-stagger data-astro-cid-ah6yd4uy> ${jobs.map((job, i) => renderTemplate`<div class="jo-card group" data-astro-cid-ah6yd4uy> <span class="jo-card-strip" data-astro-cid-ah6yd4uy></span>  <div class="jo-card-bg-num" aria-hidden="true" data-astro-cid-ah6yd4uy> ${String(i + 1).padStart(2, "0")} </div> <div class="jo-card-inner" data-astro-cid-ah6yd4uy> <h3 class="jo-card-title" data-astro-cid-ah6yd4uy>${job.title}</h3> <span class="jo-card-type" data-astro-cid-ah6yd4uy>${job.type || "Full-time position"}</span> <div class="jo-card-sep" data-astro-cid-ah6yd4uy></div> <p class="jo-card-resp" data-astro-cid-ah6yd4uy> <span class="jo-card-resp-label" data-astro-cid-ah6yd4uy>Responsibilities:</span> ${job.responsibilities} </p> <a${addAttribute(job.buttonHref || "/contact", "href")} class="jo-btn" data-astro-cid-ah6yd4uy> ${job.buttonText || "APPLY NOW"} <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-ah6yd4uy> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-ah6yd4uy></path> </svg> </a> </div> </div>`)} </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/JobOpeningsSection.astro", void 0);
const $$Astro$b = createAstro("https://acmeinc.com");
const $$MaintenancePlanSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$MaintenancePlanSection;
  const { title, description, includedItems, benefits, buttonText = "VIEW PLANS", buttonHref = "/maintenance-plans", eyebrow } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mp-section" data-astro-cid-q6ye34nk> <!-- Airflow pattern background --> <svg class="mp-airflow-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-astro-cid-q6ye34nk> <defs data-astro-cid-q6ye34nk> <pattern id="maintenance-airflow-grid" width="200" height="200" patternUnits="userSpaceOnUse" data-astro-cid-q6ye34nk> <path d="M 0 100 Q 50 80, 100 100 T 200 100" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4" data-astro-cid-q6ye34nk></path> <path d="M 0 150 Q 50 130, 100 150 T 200 150" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3" data-astro-cid-q6ye34nk></path> <path d="M 100 0 Q 80 50, 100 100 T 100 200" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.35" data-astro-cid-q6ye34nk></path> </pattern> </defs> <rect width="100%" height="100%" fill="url(#maintenance-airflow-grid)" data-astro-cid-q6ye34nk></rect> <path d="M 0 200 Q 300 150, 600 200 T 1200 200" stroke="currentColor" stroke-width="2" fill="none" opacity="0.25" data-astro-cid-q6ye34nk></path> <path d="M 0 400 Q 300 350, 600 400 T 1200 400" stroke="currentColor" stroke-width="2" fill="none" opacity="0.2" data-astro-cid-q6ye34nk></path> <path d="M 0 600 Q 300 550, 600 600 T 1200 600" stroke="currentColor" stroke-width="2" fill="none" opacity="0.15" data-astro-cid-q6ye34nk></path> </svg> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-q6ye34nk> <!-- Header --> <div class="mp-header" data-animate="fade-scale" data-astro-cid-q6ye34nk> ${eyebrow && renderTemplate`<div class="mp-badge" data-astro-cid-q6ye34nk> <span class="mp-badge-text" data-astro-cid-q6ye34nk>${eyebrow}</span> </div>`} <h2 class="mp-title" data-astro-cid-q6ye34nk>${title}</h2> <p class="mp-desc" data-astro-cid-q6ye34nk>${unescapeHTML(description)}</p> </div> <!-- Cards grid --> <div class="mp-grid" data-animate-stagger data-astro-cid-q6ye34nk> ${includedItems.map((item, index) => {
    const icons = [
      `<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
           <circle cx="12" cy="12" r="3"/>`,
      `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`,
      `<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>`,
      `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`
    ];
    return renderTemplate`<div class="mp-card" data-astro-cid-q6ye34nk> <div class="mp-card-accent" data-astro-cid-q6ye34nk></div> <div class="mp-card-left" data-astro-cid-q6ye34nk> <div class="mp-number" data-astro-cid-q6ye34nk>${String(index + 1).padStart(2, "0")}</div> <div class="mp-icon-wrap" data-astro-cid-q6ye34nk> <svg xmlns="http://www.w3.org/2000/svg" class="mp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-q6ye34nk> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(icons[index])}` })} </svg> </div> </div> <div class="mp-card-right" data-astro-cid-q6ye34nk> <h3 class="mp-card-title" data-astro-cid-q6ye34nk>${item.title}</h3> <p class="mp-card-desc" data-astro-cid-q6ye34nk>${unescapeHTML(item.description)}</p> <a${addAttribute(buttonHref, "href")} class="mp-card-link"${addAttribute(`View details about ${item.title}`, "aria-label")} data-astro-cid-q6ye34nk>
Learn More
<svg xmlns="http://www.w3.org/2000/svg" class="mp-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-q6ye34nk> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-q6ye34nk></path> </svg> </a> </div> </div>`;
  })} </div> <!-- CTA Button --> <div class="mp-cta-center" data-astro-cid-q6ye34nk> <a${addAttribute(buttonHref, "href")} class="mp-btn" data-astro-cid-q6ye34nk> ${buttonText} <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-q6ye34nk> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-q6ye34nk></path> </svg> </a> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/MaintenancePlanSection.astro", void 0);
const $$Astro$a = createAstro("https://acmeinc.com");
const $$PlaceholderContentSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$PlaceholderContentSection;
  const {
    title = "TO BE DETERMINED",
    subtitle = "BASED ON THE CLIENT DISCOVERY CONVERSATION",
    bgImage
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="pcs-section" data-astro-cid-j2tszz3w> ${bgImage && renderTemplate`<div class="pcs-bg" data-astro-cid-j2tszz3w> <img${addAttribute(bgImage, "src")} alt="" class="pcs-bg-img" data-astro-cid-j2tszz3w> <div class="pcs-overlay" data-astro-cid-j2tszz3w></div> </div>`} <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-j2tszz3w> <div class="pcs-content" data-animate="fade-up" data-astro-cid-j2tszz3w> <!-- Accent line --> <div class="pcs-accent-line" data-astro-cid-j2tszz3w></div> <!-- Title --> <h2 class="pcs-title" data-astro-cid-j2tszz3w>${title}</h2> ${subtitle && renderTemplate`<p class="pcs-subtitle" data-astro-cid-j2tszz3w>${subtitle}</p>`} <!-- Decorative elements --> <div class="pcs-decorative" data-astro-cid-j2tszz3w> <span class="pcs-dot" data-astro-cid-j2tszz3w></span> <span class="pcs-dot" data-astro-cid-j2tszz3w></span> <span class="pcs-dot" data-astro-cid-j2tszz3w></span> </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/PlaceholderContentSection.astro", void 0);
const $$Astro$9 = createAstro("https://acmeinc.com");
const $$PortfolioSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$PortfolioSection;
  const defaultImages = [
    "https://airetechac.com/wp-content/uploads/2025/02/What-Is-HVAC-Service.jpg",
    "https://www.delcohvac.com/wp-content/uploads/2024/05/Untitled-design-2024-05-09T020707.906.png",
    "https://www.brewersac.com/wp-content/uploads/2024/08/residential-hvac-service-in-phoenix-brewers-ac.png",
    "https://apolloheatingandair.com/wp-content/uploads/2022/09/What-are-the-Top-Rasons-for-HVAC-Repair.png",
    "https://mgcs.net.in/wp-content/uploads/2023/03/hvac_services.jpg",
    "https://reganandsonheatingandair.com/wp-content/uploads/2022/08/light-commercial.jpg",
    "https://www.hunker.com/hunker/mlt2a54758688164b88ba2786c6385bdac7",
    "https://cdn.prod.website-files.com/643dd13153ce80ea0a9ceae9/68deabb139c6575485a52a06_678ab8e8b11d403818be5aa8_heating-repair.jpeg"
  ];
  const { badge = "Portfolio", title, columns = 4 } = Astro2.props;
  const images = defaultImages;
  const topRow = images.slice(0, 4);
  const bottomRow = images.slice(4);
  return renderTemplate`${maybeRenderHead()}<section class="pf-section" data-astro-cid-vfwvykj6> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-vfwvykj6> <!-- Header --> <div class="pf-header" data-animate="fade-scale" data-astro-cid-vfwvykj6> <div class="pf-eyebrow" data-astro-cid-vfwvykj6> <span class="pf-eyebrow-text" data-astro-cid-vfwvykj6>${badge}</span> </div> <h2 class="pf-title" data-astro-cid-vfwvykj6>${title}</h2> <div class="pf-divider" data-astro-cid-vfwvykj6></div> </div> <div class="pf-gallery" data-astro-cid-vfwvykj6> <!-- Top row --> <div class="pf-row pf-row--top" data-animate-stagger data-astro-cid-vfwvykj6> ${topRow.map((img, i) => renderTemplate`<div class="pf-item group" data-astro-cid-vfwvykj6> <img${addAttribute(img, "src")}${addAttribute(`${title} - project ${i + 1}`, "alt")} class="pf-img" loading="lazy" decoding="async" data-astro-cid-vfwvykj6> <div class="pf-hover" data-astro-cid-vfwvykj6> <div class="pf-hover-content" data-astro-cid-vfwvykj6> <span class="pf-hover-accent" data-astro-cid-vfwvykj6></span> <span class="pf-hover-label" data-astro-cid-vfwvykj6>Project ${i + 1}</span> </div> </div>  <span class="pf-item-strip" data-astro-cid-vfwvykj6></span> </div>`)} </div> <!-- Bottom row --> ${bottomRow.length > 0 && renderTemplate`<div class="pf-row pf-row--bottom"${addAttribute(`--pf-bottom-count: ${bottomRow.length}`, "style")} data-animate-stagger data-astro-cid-vfwvykj6> ${bottomRow.map((img, i) => renderTemplate`<div class="pf-item group" data-astro-cid-vfwvykj6> <img${addAttribute(img, "src")}${addAttribute(`${title} - project ${topRow.length + i + 1}`, "alt")} class="pf-img" loading="lazy" decoding="async" data-astro-cid-vfwvykj6> <div class="pf-hover" data-astro-cid-vfwvykj6> <div class="pf-hover-content" data-astro-cid-vfwvykj6> <span class="pf-hover-accent" data-astro-cid-vfwvykj6></span> <span class="pf-hover-label" data-astro-cid-vfwvykj6>Project ${topRow.length + i + 1}</span> </div> </div> <span class="pf-item-strip" data-astro-cid-vfwvykj6></span> </div>`)} </div>`} </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/PortfolioSection.astro", void 0);
const $$Astro$8 = createAstro("https://acmeinc.com");
const $$PricingPlansSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$PricingPlansSection;
  const { title: rawTitle, description: rawDescription, plans } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = getLocationText(rawDescription);
  const bestIndex = plans.findIndex((p) => p.ribbonColor === "best");
  return renderTemplate`${maybeRenderHead()}<section class="pp-section" data-astro-cid-mlrzhdkg> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-mlrzhdkg> <!-- Header --> <div class="pp-header" data-animate="fade-up" data-astro-cid-mlrzhdkg> <div class="pp-eyebrow" data-astro-cid-mlrzhdkg> <span class="pp-eyebrow-text" data-astro-cid-mlrzhdkg>Plans</span> </div> <h2 class="pp-title" data-astro-cid-mlrzhdkg>${title}</h2> <div class="pp-divider" data-astro-cid-mlrzhdkg></div> <p class="pp-desc" data-astro-cid-mlrzhdkg>${unescapeHTML(description)}</p> </div> <!-- Plans grid --> <div class="pp-grid" data-animate-stagger data-astro-cid-mlrzhdkg> ${plans.map((plan, i) => renderTemplate`<div${addAttribute(["pp-card", { "pp-card--featured": i === bestIndex }], "class:list")} data-astro-cid-mlrzhdkg>  <div class="pp-corner" data-astro-cid-mlrzhdkg> <span class="pp-corner-label" data-astro-cid-mlrzhdkg>${plan.ribbon}</span> </div>  <div class="pp-card-inner" data-astro-cid-mlrzhdkg>  <div class="pp-content" data-astro-cid-mlrzhdkg> <h3 class="pp-plan-title" data-astro-cid-mlrzhdkg>${plan.title}</h3>  <div class="pp-price-block" data-astro-cid-mlrzhdkg> <span class="pp-price" data-astro-cid-mlrzhdkg>${plan.price}</span> ${plan.period && renderTemplate`<span class="pp-period" data-astro-cid-mlrzhdkg>${plan.period}</span>`} </div> <div class="pp-sep" data-astro-cid-mlrzhdkg></div>  <ul class="pp-features" data-astro-cid-mlrzhdkg> ${plan.features.map((feature) => renderTemplate`<li class="pp-feature" data-astro-cid-mlrzhdkg> <span class="pp-feature-dot" data-astro-cid-mlrzhdkg></span> <span data-astro-cid-mlrzhdkg>${feature}</span> </li>`)} </ul> </div> </div>  <div class="pp-bottom-label" data-astro-cid-mlrzhdkg> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="pp-scissors-icon" data-astro-cid-mlrzhdkg> <circle cx="6" cy="6" r="3" data-astro-cid-mlrzhdkg></circle><circle cx="6" cy="18" r="3" data-astro-cid-mlrzhdkg></circle><line x1="20" y1="4" x2="8.12" y2="15.88" data-astro-cid-mlrzhdkg></line><line x1="14.47" y1="14.48" x2="20" y2="20" data-astro-cid-mlrzhdkg></line><line x1="8.12" y1="8.12" x2="12" y2="12" data-astro-cid-mlrzhdkg></line> </svg> <span class="pp-bottom-text" data-astro-cid-mlrzhdkg>GREAT VALUE</span> </div> </div>`)} </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/PricingPlansSection.astro", void 0);
const $$Astro$7 = createAstro("https://acmeinc.com");
const $$PromoTilesSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$PromoTilesSection;
  const { tiles: rawTiles } = Astro2.props;
  const tiles = rawTiles.map((tile) => ({
    ...tile,
    phone: tile.phone || siteConfig.contact.phoneFormatted,
    title: tile.title ? getLocationText(tile.title) : tile.title
  }));
  return renderTemplate`${maybeRenderHead()}<section class="pt-section" data-astro-cid-grpv7bms> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-grpv7bms> <div class="pt-grid" data-animate-stagger data-astro-cid-grpv7bms> ${tiles.map((tile, index) => renderTemplate`<div${addAttribute(["pt-card", { "pt-card--featured": index === 1 }], "class:list")} data-astro-cid-grpv7bms>  <div class="pt-corner" data-astro-cid-grpv7bms> <span class="pt-corner-label" data-astro-cid-grpv7bms> ${tile.tag || tile.type === "maintenance" && "PLAN" || tile.type === "financing" && "FINANCING" || tile.type === "emergency" && "24/7 SERVICE"} </span> </div>  <div class="pt-card-inner" data-astro-cid-grpv7bms>  <div class="pt-content" data-astro-cid-grpv7bms> ${tile.type === "maintenance" && renderTemplate`<div data-astro-cid-grpv7bms> ${tile.title && renderTemplate`<h3 class="pt-title pt-bars-target" data-astro-cid-grpv7bms>${tile.title}</h3>`} ${tile.priceLabel && renderTemplate`<div class="pt-price-block" data-astro-cid-grpv7bms> <span class="pt-price-label" data-astro-cid-grpv7bms>${tile.priceLabel[0]}</span> <span class="pt-price-value" data-astro-cid-grpv7bms>${tile.priceLabel[1]}</span> <span class="pt-price-label" data-astro-cid-grpv7bms>${tile.priceLabel[2]}</span> </div>`} <p class="pt-note" data-astro-cid-grpv7bms>Priority scheduling included</p> </div>`} ${tile.type === "financing" && renderTemplate`<div data-astro-cid-grpv7bms> ${tile.headline && renderTemplate`<div class="pt-headline-group pt-bars-target" data-astro-cid-grpv7bms> ${tile.headline.map((line) => renderTemplate`<p class="pt-headline" data-astro-cid-grpv7bms>${line}</p>`)} </div>`} ${tile.subtext && renderTemplate`<p class="pt-subtext" data-astro-cid-grpv7bms>${tile.subtext}</p>`} <div class="pt-features" data-astro-cid-grpv7bms> <div class="pt-feature" data-astro-cid-grpv7bms> <span class="pt-feature-dot" data-astro-cid-grpv7bms></span> <span data-astro-cid-grpv7bms>Quick approval process</span> </div> <div class="pt-feature" data-astro-cid-grpv7bms> <span class="pt-feature-dot" data-astro-cid-grpv7bms></span> <span data-astro-cid-grpv7bms>Flexible payment options</span> </div> </div> </div>`} ${tile.type === "emergency" && renderTemplate`<div data-astro-cid-grpv7bms> ${tile.discount && renderTemplate`<p class="pt-discount pt-bars-target" data-astro-cid-grpv7bms>${tile.discount}</p>`} ${tile.subheadline && renderTemplate`<div class="pt-subheadline-group" data-astro-cid-grpv7bms> ${tile.subheadline.map((line) => renderTemplate`<p class="pt-subheadline" data-astro-cid-grpv7bms>${line}</p>`)} </div>`} <div class="pt-checklist" data-astro-cid-grpv7bms> <div class="pt-check-item" data-astro-cid-grpv7bms> <span class="pt-feature-dot" data-astro-cid-grpv7bms></span> <span data-astro-cid-grpv7bms>System inspection</span> </div> <div class="pt-check-item" data-astro-cid-grpv7bms> <span class="pt-feature-dot" data-astro-cid-grpv7bms></span> <span data-astro-cid-grpv7bms>Filter replacement</span> </div> <div class="pt-check-item" data-astro-cid-grpv7bms> <span class="pt-feature-dot" data-astro-cid-grpv7bms></span> <span data-astro-cid-grpv7bms>Performance report</span> </div> </div> <p class="pt-note" data-astro-cid-grpv7bms>Limited time offer</p> </div>`} </div>  <div class="pt-cta" data-astro-cid-grpv7bms> <a${addAttribute(tile.buttonHref || "/contact", "href")} class="pt-btn"${addAttribute(`${tile.buttonText} - ${tile.title || tile.headline?.join(" ") || tile.discount || "promo"}`, "aria-label")} data-astro-cid-grpv7bms> ${tile.buttonText} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-grpv7bms> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-grpv7bms></path> </svg> </a> <a${addAttribute(`tel:${tile.phone.replace(/[^0-9]/g, "")}`, "href")} class="pt-phone" data-astro-cid-grpv7bms> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-grpv7bms> <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" data-astro-cid-grpv7bms></path> </svg> ${tile.phone} </a> </div> </div>  <div class="pt-bottom-label" data-astro-cid-grpv7bms> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="pt-scissors-icon" data-astro-cid-grpv7bms> <circle cx="6" cy="6" r="3" data-astro-cid-grpv7bms></circle><circle cx="6" cy="18" r="3" data-astro-cid-grpv7bms></circle><line x1="20" y1="4" x2="8.12" y2="15.88" data-astro-cid-grpv7bms></line><line x1="14.47" y1="14.48" x2="20" y2="20" data-astro-cid-grpv7bms></line><line x1="8.12" y1="8.12" x2="12" y2="12" data-astro-cid-grpv7bms></line> </svg> <span class="pt-bottom-text" data-astro-cid-grpv7bms>GREAT DISCOUNT</span> </div> </div>`)} </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/PromoTilesSection.astro", void 0);
const $$Astro$6 = createAstro("https://acmeinc.com");
const $$ReviewsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ReviewsSection;
  const { badge = "GOOGLE REVIEW", title: rawTitle, description: rawDescription, reviews: rawReviews } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = rawDescription ? getLocationText(rawDescription) : void 0;
  const reviews = rawReviews.map((r) => ({ ...r, content: getLocationText(r.content) }));
  return renderTemplate`${maybeRenderHead()}<section class="rv-section" data-astro-cid-cb5vetvs> <div class="rv-body" data-astro-cid-cb5vetvs> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-cb5vetvs> <!-- Header --> <div class="rv-header" data-animate="fade-up" data-astro-cid-cb5vetvs> <div class="rv-eyebrow" data-astro-cid-cb5vetvs> <span class="rv-eyebrow-text" data-astro-cid-cb5vetvs>${badge}</span> </div> <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start" data-astro-cid-cb5vetvs> <h2 class="rv-title" data-astro-cid-cb5vetvs>${title}</h2> ${description && renderTemplate`<p class="rv-desc" data-astro-cid-cb5vetvs>${unescapeHTML(description)}</p>`} </div> </div> <!-- Carousel --> <div class="rv-carousel" data-animate="fade-up" data-animate-delay="100" data-astro-cid-cb5vetvs> <div class="rv-viewport" data-astro-cid-cb5vetvs> <div class="rv-track" data-astro-cid-cb5vetvs> ${reviews.map((review) => renderTemplate`<div class="rv-slide" data-astro-cid-cb5vetvs> <div class="rv-card group" data-astro-cid-cb5vetvs> <span class="rv-card-strip" data-astro-cid-cb5vetvs></span> <div class="rv-card-inner" data-astro-cid-cb5vetvs> <!-- Top: quote + stars --> <div class="rv-card-top" data-astro-cid-cb5vetvs> <div class="rv-quote" aria-hidden="true" data-astro-cid-cb5vetvs> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-cb5vetvs><path d="M11.3 2.6C6.1 5.1 3 9.7 3 15v6h8v-8H7c0-3.3 1.7-6 4.6-7.4L11.3 2.6zM23.3 2.6C18.1 5.1 15 9.7 15 15v6h8v-8h-4c0-3.3 1.7-6 4.6-7.4L23.3 2.6z" data-astro-cid-cb5vetvs></path></svg> </div> <div class="rv-stars" role="img" aria-label="5 out of 5 stars" data-astro-cid-cb5vetvs> ${Array.from({ length: 5 }).map(() => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="rv-star" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" data-astro-cid-cb5vetvs> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-astro-cid-cb5vetvs></path> </svg>`)} </div> </div> <!-- Content --> <p class="rv-content" data-astro-cid-cb5vetvs>${unescapeHTML(review.content)}</p> <!-- Author --> <div class="rv-author" data-astro-cid-cb5vetvs> <div class="rv-avatar" data-astro-cid-cb5vetvs> <span data-astro-cid-cb5vetvs>${review.name.split(" ").map((n) => n[0]).join("")}</span> </div> <div class="rv-author-info" data-astro-cid-cb5vetvs> <span class="rv-name" data-astro-cid-cb5vetvs>${review.name}</span> <span class="rv-date" data-astro-cid-cb5vetvs>${review.time}</span> </div> </div> </div> </div> </div>`)} </div> </div> <!-- Controls --> <div class="rv-controls" data-astro-cid-cb5vetvs> <button class="rv-arrow rv-arrow--prev" aria-label="Previous reviews" data-astro-cid-cb5vetvs> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-cb5vetvs><path d="M19 12H5M12 19l-7-7 7-7" data-astro-cid-cb5vetvs></path></svg> </button> <div class="rv-dots" data-astro-cid-cb5vetvs></div> <button class="rv-arrow rv-arrow--next" aria-label="Next reviews" data-astro-cid-cb5vetvs> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-cb5vetvs><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-cb5vetvs></path></svg> </button> </div> </div> </div> </div> </section>  ${renderScript($$result, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ReviewsSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ReviewsSection.astro", void 0);
const $$Astro$5 = createAstro("https://acmeinc.com");
const $$ServiceAreaSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ServiceAreaSection;
  const {
    title: rawTitle,
    description: rawDescription,
    areas: rawAreas,
    mapImage,
    mapEmbed,
    mapAddress = `${siteConfig.location.city}, ${siteConfig.location.state}`,
    variant = "full",
    buttonText = "SERVICE AREAS",
    buttonHref = "/service-areas"
  } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = getLocationText(rawDescription);
  const areas = rawAreas ? rawAreas.map(getLocationText) : void 0;
  const getMapEmbedUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  };
  const embedUrl = mapEmbed || (mapAddress ? getMapEmbedUrl(mapAddress) : null);
  return renderTemplate`${variant === "compact" ? renderTemplate`<!-- ============ COMPACT ============ -->
  ${maybeRenderHead()}<section class="sa-section py-16 md:py-24" data-astro-cid-etltsmpk><div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-etltsmpk><div class="sa-compact-wrap overflow-hidden max-w-[1100px] mx-auto" data-animate="fade-up" data-astro-cid-etltsmpk><div class="grid md:grid-cols-2" data-astro-cid-etltsmpk><!-- Map side --><div class="sa-map-side relative min-h-[280px] md:min-h-[360px]" data-astro-cid-etltsmpk>${embedUrl ? renderTemplate`<iframe${addAttribute(embedUrl, "src")} width="100%" height="100%" style="border:0; position:absolute; inset:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Service Area Map" data-astro-cid-etltsmpk></iframe>` : mapImage ? renderTemplate`<img${addAttribute(mapImage, "src")} alt="Service Area Map" class="absolute inset-0 w-full h-full object-cover" data-astro-cid-etltsmpk>` : renderTemplate`<div class="absolute inset-0 bg-brand-tertiary flex items-center justify-center" data-astro-cid-etltsmpk><svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-brand-secondary/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-etltsmpk><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" data-astro-cid-etltsmpk></path><circle cx="12" cy="10" r="3" data-astro-cid-etltsmpk></circle></svg></div>`}</div><!-- Content side --><div class="p-8 md:p-10 flex flex-col justify-center bg-white" data-astro-cid-etltsmpk><div class="sa-eyebrow mb-5" data-astro-cid-etltsmpk><span class="sa-eyebrow-text" data-astro-cid-etltsmpk>Service Area</span></div><h2 class="sa-title text-2xl md:text-3xl" data-astro-cid-etltsmpk>${title}</h2><p class="sa-desc" data-astro-cid-etltsmpk>${unescapeHTML(description)}</p><a${addAttribute(buttonHref, "href")} class="sa-btn" data-astro-cid-etltsmpk>${buttonText}<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-etltsmpk><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-etltsmpk></path></svg></a></div></div></div></div></section>` : renderTemplate`<!-- ============ FULL ============ -->
  <section class="sa-section sa-full" data-astro-cid-etltsmpk><div class="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24" data-astro-cid-etltsmpk><!-- Header --><div class="sa-header" data-animate="fade-up" data-astro-cid-etltsmpk><div class="sa-eyebrow mb-5" data-astro-cid-etltsmpk><span class="sa-eyebrow-text" data-astro-cid-etltsmpk>Service Area</span></div><div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12" data-astro-cid-etltsmpk><h2 class="sa-title" data-astro-cid-etltsmpk>${title}</h2><div data-astro-cid-etltsmpk><p class="sa-desc" data-astro-cid-etltsmpk>${unescapeHTML(description)}</p></div></div></div><!-- Map + Areas Grid Layout --><div class="sa-main-grid" data-animate="fade-up" data-animate-delay="100" data-astro-cid-etltsmpk><!-- Map Card --><div class="sa-map-card" data-astro-cid-etltsmpk>${embedUrl ? renderTemplate`<div class="sa-map-frame" data-astro-cid-etltsmpk><iframe${addAttribute(embedUrl, "src")} width="100%" height="100%" style="border:0; position:absolute; inset:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Service Area Map" data-astro-cid-etltsmpk></iframe></div>` : mapImage ? renderTemplate`<div class="sa-map-frame" data-astro-cid-etltsmpk><img${addAttribute(mapImage, "src")} alt="Service Area Map" class="absolute inset-0 w-full h-full object-cover" data-astro-cid-etltsmpk></div>` : renderTemplate`<div class="sa-map-frame bg-brand-tertiary flex items-center justify-center" data-astro-cid-etltsmpk><svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-brand-secondary/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-etltsmpk><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" data-astro-cid-etltsmpk></path><circle cx="12" cy="10" r="3" data-astro-cid-etltsmpk></circle></svg></div>`}</div><!-- Areas List Card -->${areas && areas.length > 0 && renderTemplate`<div class="sa-areas-card" data-astro-cid-etltsmpk><div class="sa-areas-header" data-astro-cid-etltsmpk><span class="sa-areas-accent" data-astro-cid-etltsmpk></span><h3 class="sa-areas-title" data-astro-cid-etltsmpk>Areas We Serve</h3><span class="sa-areas-count" data-astro-cid-etltsmpk>${areas.length}</span></div><div class="sa-areas-list" data-astro-cid-etltsmpk>${areas.map((area) => renderTemplate`<div class="sa-area-item" data-astro-cid-etltsmpk><span class="sa-area-dot" data-astro-cid-etltsmpk></span><span data-astro-cid-etltsmpk>${area}</span></div>`)}</div></div>`}</div><!-- CTA --><div class="sa-cta" data-animate="fade-up" data-animate-delay="200" data-astro-cid-etltsmpk><a${addAttribute(buttonHref, "href")} class="sa-btn" data-astro-cid-etltsmpk>${buttonText}<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-etltsmpk><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-etltsmpk></path></svg></a></div></div></section>`}`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ServiceAreaSection.astro", void 0);
const $$Astro$4 = createAstro("https://acmeinc.com");
const $$ServiceCardsGridSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ServiceCardsGridSection;
  const { badge = "OUR SERVICES", title, description, categories } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="svc-section" data-astro-cid-45baogmk> <div class="svc-body" data-astro-cid-45baogmk> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-45baogmk> <!-- Header --> <div class="svc-header" data-animate="fade-up" data-astro-cid-45baogmk> <div class="svc-eyebrow" data-astro-cid-45baogmk> <span class="svc-eyebrow-text" data-astro-cid-45baogmk>${badge}</span> </div> <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start" data-astro-cid-45baogmk> <h2 class="svc-title" data-astro-cid-45baogmk>${title}</h2> <p class="svc-desc" data-astro-cid-45baogmk>${unescapeHTML(description)}</p> </div> </div> <!-- Category Tabs --> <div class="svc-tabs" data-animate="fade-up" data-animate-delay="100" data-astro-cid-45baogmk> ${categories.map((category, index) => renderTemplate`<button class="svc-tab"${addAttribute(index, "data-tab")}${addAttribute(index === 0 ? "true" : "false", "data-active")} data-astro-cid-45baogmk> <span class="svc-tab-text" data-astro-cid-45baogmk>${category.title}</span> <span class="svc-tab-bar" data-astro-cid-45baogmk></span> </button>`)} </div> <!-- Service Cards Grid --> <div class="relative" style="padding-bottom: 3rem;" data-astro-cid-45baogmk> ${categories.map((category, catIndex) => renderTemplate`<div class="service-content absolute inset-0 transition-opacity duration-500"${addAttribute(catIndex, "data-content")}${addAttribute(catIndex === 0 ? "opacity: 1; pointer-events: auto; position: relative;" : "opacity: 0; pointer-events: none;", "style")} data-astro-cid-45baogmk> <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" data-animate-stagger data-astro-cid-45baogmk> ${category.services.map((service, serviceIndex) => {
    const Tag = service.href ? "a" : "div";
    const cardNumber = String(serviceIndex + 1).padStart(2, "0");
    return renderTemplate`${renderComponent($$result, "Tag", Tag, { ...service.href ? { href: service.href } : {}, "class": "svc-card group", "style": `transition-delay: ${serviceIndex * 70}ms`, "data-astro-cid-45baogmk": true }, { "default": ($$result2) => renderTemplate`<span class="svc-card-strip" data-astro-cid-45baogmk></span> <div class="svc-card-inner" data-astro-cid-45baogmk> <div class="svc-icon" data-astro-cid-45baogmk> <span data-astro-cid-45baogmk>${unescapeHTML(service.icon)}</span> </div> <h3 class="svc-card-title" data-astro-cid-45baogmk>${service.title}</h3> <p class="svc-card-desc" data-astro-cid-45baogmk>${unescapeHTML(service.description)}</p> ${service.href && renderTemplate`<div class="svc-arrow" data-astro-cid-45baogmk> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-45baogmk> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-45baogmk></path> </svg> </div>`} </div> <span class="svc-card-number" data-astro-cid-45baogmk>${cardNumber}</span> ` })}`;
  })} </div> </div>`)} </div> </div> </div> </section>  ${renderScript($$result, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ServiceCardsGridSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/ServiceCardsGridSection.astro", void 0);
const serviceIcons = [
  {
    keywords: ["kitchen"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" }),
      /* @__PURE__ */ jsx("path", { d: "M7 2v20" }),
      /* @__PURE__ */ jsx("path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" })
    ] })
  },
  {
    keywords: ["bathroom", "bath"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" }),
      /* @__PURE__ */ jsx("line", { x1: "10", y1: "5", x2: "8", y2: "7" }),
      /* @__PURE__ */ jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
      /* @__PURE__ */ jsx("line", { x1: "7", y1: "19", x2: "7", y2: "21" }),
      /* @__PURE__ */ jsx("line", { x1: "17", y1: "19", x2: "17", y2: "21" })
    ] })
  },
  {
    keywords: ["leak detection", "leak repair", "leak prevention", "leak"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" }),
      /* @__PURE__ */ jsx("path", { d: "M9.5 15.5a3 3 0 0 0 4.5 2" })
    ] })
  },
  {
    keywords: ["water heater", "water heating"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "17", r: "1" })
    ] })
  },
  {
    keywords: ["drain", "sewer", "hydro jetting", "jetting"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M12 3v3" }),
      /* @__PURE__ */ jsx("path", { d: "M18.5 5.5 16.4 7.6" }),
      /* @__PURE__ */ jsx("path", { d: "M21 12h-3" }),
      /* @__PURE__ */ jsx("path", { d: "M18.5 18.5 16.4 16.4" }),
      /* @__PURE__ */ jsx("path", { d: "M12 21v-3" }),
      /* @__PURE__ */ jsx("path", { d: "M5.5 18.5 7.6 16.4" }),
      /* @__PURE__ */ jsx("path", { d: "M3 12h3" }),
      /* @__PURE__ */ jsx("path", { d: "M5.5 5.5 7.6 7.6" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" })
    ] })
  },
  {
    keywords: ["gas", "gas line", "gas piping"],
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" }) })
  },
  {
    keywords: ["backflow", "filtration", "filter", "purification", "purif", "indoor air", "air quality"],
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z" }) })
  },
  {
    keywords: ["maintenance", "preventative", "appliance", "tune-up", "tune up"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
    ] })
  },
  {
    keywords: ["pipe", "repiping", "repipe", "sewer line", "trenchless"],
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }) })
  },
  {
    keywords: ["building", "commercial", "green", "eco"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M3 21h18" }),
      /* @__PURE__ */ jsx("path", { d: "M5 21V7l8-4v18" }),
      /* @__PURE__ */ jsx("path", { d: "M19 21V11l-6-4" }),
      /* @__PURE__ */ jsx("path", { d: "M9 9v.01" }),
      /* @__PURE__ */ jsx("path", { d: "M9 12v.01" }),
      /* @__PURE__ */ jsx("path", { d: "M9 15v.01" })
    ] })
  },
  {
    keywords: ["ac", "air conditioning", "cooling", "cool"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
    ] })
  },
  {
    keywords: ["heat", "furnace", "boiler", "warm"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "17", r: "1" })
    ] })
  },
  {
    keywords: ["thermostat", "smart"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "14", r: "4" }),
      /* @__PURE__ */ jsx("path", { d: "M12 6v4" })
    ] })
  },
  {
    keywords: ["mini-split", "ductless", "split"],
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("rect", { x: "2", y: "4", width: "20", height: "8", rx: "1" }),
      /* @__PURE__ */ jsx("path", { d: "M12 12v4" }),
      /* @__PURE__ */ jsx("path", { d: "M8 16h8" }),
      /* @__PURE__ */ jsx("path", { d: "M6 20h12" })
    ] })
  },
  {
    keywords: ["install", "replacement", "replace"],
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) })
  }
];
const fallbackIcon = /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) });
function getIconForService(title) {
  const lower = title.toLowerCase();
  for (const entry of serviceIcons) {
    if (entry.keywords.some((kw) => lower.includes(kw))) return entry.icon;
  }
  return fallbackIcon;
}
function getServiceUrl(title, providedHref) {
  if (providedHref) return providedHref;
  const lower = title.toLowerCase();
  const serviceMap = {
    // AC Services
    "ac repair": "/air-conditioning/ac-repair",
    "ac tune-up": "/air-conditioning/ac-tune-up-maintenance",
    "ac maintenance": "/air-conditioning/ac-tune-up-maintenance",
    "ac installation": "/air-conditioning/ac-installation-replacement",
    "ac replacement": "/air-conditioning/ac-installation-replacement",
    "mini-split": "/air-conditioning/mini-split-systems",
    "thermostat": "/air-conditioning/thermostats",
    // Heating Services
    "furnace repair": "/heating/furnace-repair",
    "furnace tune-up": "/heating/furnace-tune-up-maintenance",
    "furnace maintenance": "/heating/furnace-tune-up-maintenance",
    "furnace installation": "/heating/furnace-installation-replacement",
    "furnace replacement": "/heating/furnace-installation-replacement",
    "boiler": "/heating/boilers-installation-replacement",
    "heat pump": "/heating",
    // Indoor Air Quality
    "air filtration": "/indoor-air-quality/air-filtration-systems",
    "duct cleaning": "/indoor-air-quality/duct-cleaning-sealing",
    "duct sealing": "/indoor-air-quality/duct-cleaning-sealing",
    "duct repair": "/indoor-air-quality/duct-repair-replacement",
    "duct replacement": "/indoor-air-quality/duct-repair-replacement",
    "attic insulation": "/indoor-air-quality/attic-insulation-ventilation",
    "humidity": "/indoor-air-quality",
    // View All links
    "view all ac": "/air-conditioning",
    "view all heating": "/heating",
    "view all iaq": "/indoor-air-quality",
    "view all commercial": "/commercial"
  };
  for (const [key, url] of Object.entries(serviceMap)) {
    if (lower.includes(key)) return url;
  }
  if (lower.includes("commercial")) return "/commercial";
  return "/contact";
}
function ServicesSection({ title, description, categories }) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const activeCategory = categories[activeTab];
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: "ss-r-section", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16", children: [
      /* @__PURE__ */ jsxs("div", { className: `ss-r-header transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: [
        /* @__PURE__ */ jsx("div", { className: "ss-r-eyebrow", children: /* @__PURE__ */ jsx("span", { className: "ss-r-eyebrow-text", children: "Our Services" }) }),
        /* @__PURE__ */ jsxs("div", { className: "ss-r-header-grid", children: [
          /* @__PURE__ */ jsx("h2", { className: "ss-r-title", children: title }),
          /* @__PURE__ */ jsx("p", { className: "ss-r-desc", children: description })
        ] })
      ] }),
      categories.length > 1 && /* @__PURE__ */ jsx("div", { className: `ss-r-tabs transition-all duration-700 delay-100 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`, children: categories.map((cat, i) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setActiveTab(i),
          className: `ss-r-tab ${activeTab === i ? "ss-r-tab--active" : ""}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "ss-r-tab-text", children: cat.title }),
            /* @__PURE__ */ jsx("span", { className: "ss-r-tab-bar" })
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsx("div", { className: "ss-r-grid", children: activeCategory.services.map((service, i) => {
        const href = getServiceUrl(service.title, service.href);
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href,
            className: `ss-r-card group transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
            style: { transitionDelay: `${i * 70}ms` },
            children: [
              /* @__PURE__ */ jsx("span", { className: "ss-r-card-strip" }),
              /* @__PURE__ */ jsxs("div", { className: "ss-r-card-inner", children: [
                /* @__PURE__ */ jsx("div", { className: "ss-r-icon", children: getIconForService(service.title) }),
                /* @__PURE__ */ jsx("h3", { className: "ss-r-card-title", children: service.title }),
                /* @__PURE__ */ jsx("p", { className: "ss-r-card-desc", children: service.description }),
                /* @__PURE__ */ jsx("div", { className: "ss-r-arrow", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) }) })
              ] })
            ]
          },
          `${activeTab}-${i}`
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .ss-r-section {
          background: var(--background);
          padding: 5rem 0 7rem;
        }
        @media (min-width: 768px) {
          .ss-r-section {
            padding: 7rem 0;
          }
        }

        /* ─── Header ─── */
        .ss-r-header {
          margin-bottom: 2.5rem;
        }
        .ss-r-eyebrow {
          margin-bottom: 1.5rem;
        }
        .ss-r-eyebrow-text {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--brand-highlight);
          display: inline-block;
          padding: 0.4rem 1rem;
          background: var(--brand-primary);
        }

        .ss-r-header-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 1024px) {
          .ss-r-header-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
          }
        }

        .ss-r-title {
          font-size: 2rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 1.1;
          color: var(--brand-primary);
        }
        @media (min-width: 768px) {
          .ss-r-title { font-size: 2.5rem; }
        }

        .ss-r-desc {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--brand-secondary);
        }

        /* ─── Tabs ─── */
        .ss-r-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-bottom: 2.5rem;
          border-bottom: 2px solid rgba(0, 0, 0, 0.18);
        }

        .ss-r-tab {
          position: relative;
          padding: 0.85rem 1.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--brand-secondary);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .ss-r-tab:hover {
          color: var(--brand-primary);
        }
        .ss-r-tab--active {
          color: var(--brand-primary);
        }

        .ss-r-tab-bar {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: transparent;
          transition: background 0.3s ease;
        }
        .ss-r-tab--active .ss-r-tab-bar {
          background: var(--brand-highlight);
        }

        /* ─── Cards Grid ─── */
        .ss-r-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .ss-r-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 640px) {
          .ss-r-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ─── Card ─── */
        .ss-r-card {
          position: relative;
          display: block;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: all 0.35s ease;
        }
        .ss-r-card:hover {
          border-color: var(--brand-highlight);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
        }

        /* Left accent strip */
        .ss-r-card-strip {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 0;
          background: var(--brand-highlight);
          transition: height 0.35s ease;
        }
        .ss-r-card:hover .ss-r-card-strip {
          height: 100%;
        }

        .ss-r-card-inner {
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          min-height: 180px;
        }

        /* Icon */
        .ss-r-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--brand-tertiary);
          border: 1px solid rgba(0, 0, 0, 0.06);
          color: var(--brand-primary);
          margin-bottom: 1.25rem;
          transition: all 0.3s ease;
        }
        .ss-r-card:hover .ss-r-icon {
          background: var(--brand-highlight);
          border-color: var(--brand-highlight);
          color: var(--brand-primary);
        }

        .ss-r-card-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          color: var(--brand-primary);
          margin-bottom: 0.5rem;
          line-height: 1.25;
          transition: color 0.3s ease;
        }

        .ss-r-card-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--brand-secondary);
          flex: 1;
          margin-bottom: 1rem;
        }

        /* Arrow */
        .ss-r-arrow {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--brand-tertiary);
          color: var(--brand-secondary);
          transition: all 0.3s ease;
        }
        .ss-r-card:hover .ss-r-arrow {
          background: var(--brand-highlight);
          color: var(--brand-primary);
          transform: translateX(4px);
        }
      ` })
  ] });
}
const $$Astro$3 = createAstro("https://acmeinc.com");
const $$SignupBannerSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SignupBannerSection;
  const {
    title: rawTitle,
    description: rawDescription,
    calloutText: rawCalloutText,
    phone = siteConfig.contact.phoneFormatted,
    buttonText = "Sign Up Online",
    buttonHref = "/contact"
  } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = getLocationText(rawDescription);
  const calloutText = getLocationText(rawCalloutText);
  return renderTemplate`${maybeRenderHead()}<section class="sb-section" data-astro-cid-br46bgk3> <div class="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28" data-astro-cid-br46bgk3> <div class="sb-wrapper" data-animate="fade-up" data-astro-cid-br46bgk3> <!-- Left Panel: Dark with Icon --> <div class="sb-left-panel" data-astro-cid-br46bgk3> <div class="sb-icon-container" data-astro-cid-br46bgk3> <div class="sb-icon-circle" data-astro-cid-br46bgk3> <svg xmlns="http://www.w3.org/2000/svg" class="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-br46bgk3> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-astro-cid-br46bgk3></path> <circle cx="9" cy="7" r="4" data-astro-cid-br46bgk3></circle> <line x1="23" y1="11" x2="17" y2="11" data-astro-cid-br46bgk3></line> <line x1="23" y1="4" x2="17" y2="4" data-astro-cid-br46bgk3></line> <line x1="23" y1="18" x2="17" y2="18" data-astro-cid-br46bgk3></line> </svg> </div> <div class="sb-label" data-astro-cid-br46bgk3> <span class="sb-label-text" data-astro-cid-br46bgk3>New Member</span> <span class="sb-label-sub" data-astro-cid-br46bgk3>Registration</span> </div> </div> <!-- Decorative lines --> <div class="sb-deco-lines" data-astro-cid-br46bgk3> <div class="sb-deco-line" data-astro-cid-br46bgk3></div> <div class="sb-deco-line" data-astro-cid-br46bgk3></div> <div class="sb-deco-line" data-astro-cid-br46bgk3></div> </div> </div> <!-- Right Panel: White with Content --> <div class="sb-right-panel" data-astro-cid-br46bgk3> <div class="sb-content" data-astro-cid-br46bgk3> <h2 class="sb-title" data-astro-cid-br46bgk3>${title}</h2> <p class="sb-desc" data-astro-cid-br46bgk3>${unescapeHTML(description)}</p> <!-- Highlight callout --> <div class="sb-highlight" data-astro-cid-br46bgk3> <svg xmlns="http://www.w3.org/2000/svg" class="sb-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-br46bgk3> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-br46bgk3></path> <polyline points="22 4 12 14.01 9 11.01" data-astro-cid-br46bgk3></polyline> </svg> <span class="sb-highlight-text" data-astro-cid-br46bgk3>${calloutText}</span> </div> <!-- Actions --> <div class="sb-actions" data-astro-cid-br46bgk3> <a${addAttribute(buttonHref, "href")} class="sb-btn sb-btn--primary" data-astro-cid-br46bgk3> ${buttonText} <svg xmlns="http://www.w3.org/2000/svg" class="sb-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-br46bgk3> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-br46bgk3></path> </svg> </a> <a${addAttribute(`tel:${phone.replace(/[^0-9]/g, "")}`, "href")} class="sb-btn sb-btn--outline" data-astro-cid-br46bgk3> <svg xmlns="http://www.w3.org/2000/svg" class="sb-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-br46bgk3> <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" data-astro-cid-br46bgk3></path> </svg> ${phone} </a> </div> </div> </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/SignupBannerSection.astro", void 0);
const $$Astro$2 = createAstro("https://acmeinc.com");
const $$TestimonialsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TestimonialsSection;
  const { badge = "Testimonials", title: rawTitle, description: rawDescription, testimonials: rawTestimonials } = Astro2.props;
  const title = getLocationText(rawTitle);
  const description = rawDescription ? getLocationText(rawDescription) : void 0;
  const testimonials = rawTestimonials.map((t) => ({ ...t, content: getLocationText(t.content) }));
  return renderTemplate`${maybeRenderHead()}<section class="tm-section" data-astro-cid-wgrcrutd> <div class="tm-body" data-astro-cid-wgrcrutd> <div class="container mx-auto px-6 md:px-12 lg:px-16" data-astro-cid-wgrcrutd> <!-- Header --> <div class="tm-header" data-animate="fade-up" data-astro-cid-wgrcrutd> <div class="tm-eyebrow" data-astro-cid-wgrcrutd> <span class="tm-eyebrow-text" data-astro-cid-wgrcrutd>${badge}</span> </div> <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start" data-astro-cid-wgrcrutd> <h2 class="tm-title" data-astro-cid-wgrcrutd>${title}</h2> ${description && renderTemplate`<p class="tm-desc" data-astro-cid-wgrcrutd>${unescapeHTML(description)}</p>`} </div> </div> <!-- Carousel --> <div class="tm-carousel" data-animate="fade-up" data-animate-delay="100" data-astro-cid-wgrcrutd> <div class="tm-viewport" data-astro-cid-wgrcrutd> <div class="tm-track" data-astro-cid-wgrcrutd> ${testimonials.map((t) => renderTemplate`<div class="tm-slide" data-astro-cid-wgrcrutd> <div class="tm-card group" data-astro-cid-wgrcrutd>  <span class="tm-card-strip" data-astro-cid-wgrcrutd></span> <div class="tm-card-inner" data-astro-cid-wgrcrutd>  <div class="tm-card-top" data-astro-cid-wgrcrutd> <div class="tm-quote" aria-hidden="true" data-astro-cid-wgrcrutd> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-wgrcrutd><path d="M11.3 2.6C6.1 5.1 3 9.7 3 15v6h8v-8H7c0-3.3 1.7-6 4.6-7.4L11.3 2.6zM23.3 2.6C18.1 5.1 15 9.7 15 15v6h8v-8h-4c0-3.3 1.7-6 4.6-7.4L23.3 2.6z" data-astro-cid-wgrcrutd></path></svg> </div> <div class="tm-stars" role="img"${addAttribute(`${t.rating} out of 5 stars`, "aria-label")} data-astro-cid-wgrcrutd> ${Array.from({ length: 5 }).map((_, i) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg"${addAttribute(["tm-star", { "tm-star--filled": i < t.rating }], "class:list")} viewBox="0 0 24 24" fill="currentColor" width="14" height="14" data-astro-cid-wgrcrutd> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-astro-cid-wgrcrutd></path> </svg>`)} </div> </div> <p class="tm-content" data-astro-cid-wgrcrutd>${unescapeHTML(t.content)}</p>  <div class="tm-author" data-astro-cid-wgrcrutd> <div class="tm-avatar" data-astro-cid-wgrcrutd><span data-astro-cid-wgrcrutd>${t.initials}</span></div> <div class="tm-author-info" data-astro-cid-wgrcrutd> <span class="tm-name" data-astro-cid-wgrcrutd>${t.name}</span> <span class="tm-date" data-astro-cid-wgrcrutd>${t.date}</span> </div> </div> </div> </div> </div>`)} </div> </div> <!-- Controls --> <div class="tm-controls" data-astro-cid-wgrcrutd> <button class="tm-arrow tm-arrow--prev" aria-label="Previous testimonials" data-astro-cid-wgrcrutd> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-wgrcrutd><path d="M19 12H5M12 19l-7-7 7-7" data-astro-cid-wgrcrutd></path></svg> </button> <div class="tm-dots" data-astro-cid-wgrcrutd></div> <button class="tm-arrow tm-arrow--next" aria-label="Next testimonials" data-astro-cid-wgrcrutd> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-wgrcrutd><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-wgrcrutd></path></svg> </button> </div> </div> </div> </div> </section>  ${renderScript($$result, "C:/Users/rodriguez/TemplateHvac/src/components/sections/TestimonialsSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/TestimonialsSection.astro", void 0);
const $$Astro$1 = createAstro("https://acmeinc.com");
const $$TrustBadges = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TrustBadges;
  const {
    badges = [
      { name: "HomeAdvisor", image: "https://conradsroofing.com/wp-content/uploads/2020/06/Conrads-Badges-3.png" },
      { name: "BBB Accredited", image: "https://www.chamberbloomington.org/uploads/1/2/4/4/124469143/published/bbb-logo.png?1750253404" },
      { name: "Google Reviews", image: "https://www.sgpcredit.com.sg/wp-content/uploads/2019/09/google-review-badge.png" },
      { name: "Angi", image: "https://media.angi.com/s3fs-public/SSA%20Badge%202024_530x438px.png?impolicy=infographic" },
      { name: "Yelp", image: "https://www.rahmanlawsf.com/wp-content/uploads/yelp-Badge-21.png" }
    ],
    heading = "Achievement Starts with Action."
  } = Astro2.props;
  const duplicatedBadges = [...badges, ...badges, ...badges];
  return renderTemplate`${maybeRenderHead()}<section class="trust-section relative overflow-hidden" data-astro-cid-ju3ceqax> <!-- Dark background --> <div class="absolute inset-0 bg-brand-primary" data-astro-cid-ju3ceqax></div> <div class="relative z-[1] container mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-10" data-astro-cid-ju3ceqax> <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12" data-astro-cid-ju3ceqax> <!-- Left: heading with modern accent --> <div class="flex items-center gap-5 flex-shrink-0" data-animate="fade-right" data-astro-cid-ju3ceqax> <div class="relative" data-astro-cid-ju3ceqax> <div class="absolute inset-0 bg-brand-highlight blur-xl opacity-50" data-astro-cid-ju3ceqax></div> <div class="relative h-16 w-1 bg-gradient-to-b from-brand-highlight via-[#FF8A65] to-brand-highlight rounded-full" data-astro-cid-ju3ceqax></div> </div> <div data-astro-cid-ju3ceqax> <p class="text-[11px] tracking-[0.25em] uppercase text-brand-highlight font-bold mb-1 flex items-center gap-2" data-astro-cid-ju3ceqax> <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-ju3ceqax> <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" data-astro-cid-ju3ceqax></path> </svg>
Trusted By Thousands
</p> <h2 class="text-base md:text-lg font-black text-white uppercase tracking-[0.05em] leading-tight" data-astro-cid-ju3ceqax>${heading}</h2> </div> </div> <!-- Divider with glow --> <div class="hidden md:block relative flex-shrink-0" data-astro-cid-ju3ceqax> <div class="absolute inset-0 bg-brand-highlight blur-md opacity-20" data-astro-cid-ju3ceqax></div> <div class="relative w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" data-astro-cid-ju3ceqax></div> </div> <!-- Right: scrolling badges with backdrop --> <div class="carousel-container flex-1 max-w-5xl" data-animate="fade-left" data-astro-cid-ju3ceqax> <div class="carousel-track" data-astro-cid-ju3ceqax> ${duplicatedBadges.map((badge) => renderTemplate`<div class="carousel-item" data-astro-cid-ju3ceqax> <img${addAttribute(badge.image, "src")}${addAttribute(badge.alt || badge.name, "alt")} class="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 filter brightness-110 contrast-110 badge-outline" width="156" height="80" loading="lazy" decoding="async" data-astro-cid-ju3ceqax> </div>`)} </div> </div> </div> </div> </section> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/sections/TrustBadges.astro", void 0);
const $$Astro = createAstro("https://acmeinc.com");
const $$SectionRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SectionRenderer;
  const componentMap = {
    CareersCTASection: $$CareersCTASection,
    ContactFormSection: $$ContactFormSection,
    ContentSection: $$ContentSection,
    ContentSectionAlt: $$ContentSectionAlt,
    CouponsSection: $$CouponsSection,
    CTAStrip: $$CTAStrip,
    ExpertServicesSection: $$ExpertServicesSection,
    FAQSection: $$FAQSection,
    FinancingIntroSection: $$FinancingIntroSection,
    FinancingPlansSection: $$FinancingPlansSection,
    FinancingSection: $$FinancingSection,
    HeroPage: $$HeroPage,
    HeroSection: $$HeroSection,
    ImageCardsSection: $$ImageCardsSection,
    JobOpeningsSection: $$JobOpeningsSection,
    MaintenancePlanSection: $$MaintenancePlanSection,
    PlaceholderContentSection: $$PlaceholderContentSection,
    PortfolioSection: $$PortfolioSection,
    PricingPlansSection: $$PricingPlansSection,
    PromoTilesSection: $$PromoTilesSection,
    ReviewsSection: $$ReviewsSection,
    ServiceAreaSection: $$ServiceAreaSection,
    ServiceCardsGridSection: $$ServiceCardsGridSection,
    ServicesSection,
    SignupBannerSection: $$SignupBannerSection,
    TestimonialsSection: $$TestimonialsSection,
    TrustBadges: $$TrustBadges
  };
  const { sections = [] } = Astro2.props;
  return renderTemplate`${sections.map(({ component, props = {} }) => {
    if (component === "ServicesSection") {
      return renderTemplate`${renderComponent($$result, "ServicesSection", ServicesSection, { "client:visible": true, ...props, "client:component-hydration": "visible", "client:component-path": "@/components/sections/ServicesSection.tsx", "client:component-export": "default" })}`;
    }
    const Comp = componentMap[component];
    if (!Comp) {
      console.warn(`[SectionRenderer] Unknown component: ${component}`);
      return null;
    }
    return renderTemplate`${renderComponent($$result, "Comp", Comp, { ...props })}`;
  })}`;
}, "C:/Users/rodriguez/TemplateHvac/src/components/SectionRenderer.astro", void 0);
export {
  $$BaseLayout as $,
  DEFAULT_OUTPUT_FORMAT as D,
  VALID_SUPPORTED_FORMATS as V,
  $$SectionRenderer as a,
  getEntry as b,
  DEFAULT_HASH_PROPS as c,
  getCollection as g,
  isRemotePath as i,
  joinPaths as j
};
