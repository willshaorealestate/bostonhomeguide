/*
 * TownProfile.tsx — the visual "what it's like to live here" card at the top of a town page.
 * Content lives in data/townProfiles.ts. The tagline is shown in the page banner, not repeated here.
 * Up to two small photos sit beside the "What it's like" text (side by side under it on phones),
 * so they never display larger than about 200px wide. A photo without a `src` is left out, except
 * in a preview build (VITE_PHOTO_PLACEHOLDERS=1), where it shows as a placeholder.
 */
import {
  Flag, Landmark, Bike, Trees, Store, School, Plane, Waves, Tractor, CalendarDays, Car,
  Users, Ruler, Navigation, Building2, Receipt, Quote, Camera, ExternalLink, Clock,
} from "lucide-react";
import type { TownProfile as Profile, ProfileHighlight, ProfilePhoto } from "@/data/townProfiles";

const HIGHLIGHT_ICONS: Record<ProfileHighlight["icon"], typeof Flag> = {
  history: Flag, museum: Landmark, trail: Bike, tree: Trees, store: Store,
  school: School, plane: Plane, river: Waves, farm: Tractor,
};

const SHOW_PLACEHOLDERS = import.meta.env.VITE_PHOTO_PLACEHOLDERS === "1";

/** A small photo with caption and credit, shown beside the text (never large, so modest-resolution photos still look sharp). */
function SidePhoto({ photo }: { photo: ProfilePhoto }) {
  return (
    <figure className="min-w-0">
      {photo.src ? (
        <div className="relative">
          <img src={photo.src} alt={photo.caption} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-lg" />
          {/* Photographer credit sits on the photo itself, so it reads as a credit rather than part of the caption */}
          {photo.credit && (
            <span className="absolute bottom-0 right-0 max-w-full truncate rounded-tl-md rounded-br-lg bg-black/55 px-1.5 py-0.5 text-[9px] leading-tight text-white/90 font-body" title={photo.credit}>
              {photo.licenseUrl
                ? <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{photo.credit}</a>
                : photo.credit}
            </span>
          )}
        </div>
      ) : (
        <div className="w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-[#E8ECF1] to-[#D5DCE5] flex flex-col items-center justify-center text-[#6F87A6] px-2 text-center">
          <Camera className="w-5 h-5" />
          <span className="text-[10px] font-body mt-1 leading-tight">Photo spot</span>
        </div>
      )}
      <figcaption className="mt-1 text-[11px] text-gray-500 font-body leading-snug">{photo.caption}</figcaption>
    </figure>
  );
}

const GLANCE_ICONS: Record<string, typeof Flag> = {
  Population: Users,
  Size: Ruler,
  "From Boston": Navigation,
  Incorporated: Clock,
  Government: Building2,
  "Property tax rate": Receipt,
};

export default function TownProfile({ name, profile }: { name: string; profile: Profile }) {
  // Photos without a src are left out on the site; a preview build shows where they go
  const photos = profile.photos.slice(0, 2).filter((p) => p.src || SHOW_PLACEHOLDERS);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#C89B3C] font-body">Town profile</p>
        <h2 className="text-2xl font-bold text-[#0D2137] mt-1">Living in {name}</h2>
      </div>

      {/* At a glance */}
      <div className="px-6 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {profile.glance.map((f) => {
            const Icon = GLANCE_ICONS[f.label] ?? Landmark;
            return (
              <div key={f.label} className="bg-[#F4F6F8] rounded-xl p-3 sm:p-3.5">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Icon className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span className="text-xs font-body">{f.label}</span>
                </div>
                <p className={`${f.value.length > 14 ? "text-sm sm:text-base" : "text-lg sm:text-xl"} font-bold text-[#0D2137] mt-1 leading-tight`}>{f.value}</p>
                {f.note && <p className="text-[11px] text-gray-400 font-body mt-0.5 leading-snug">{f.note}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* What it's like: text, with up to two small photos beside it (below it on phones) */}
      <div className="px-6 pt-7">
        <h3 className="text-base font-bold text-[#0D2137] mb-2">What it's like</h3>
        <div className={photos.length ? "grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_200px] gap-4 sm:gap-6" : ""}>
          <div className="space-y-3 text-base text-gray-600 font-body leading-relaxed min-w-0">
            {profile.feel.map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
          </div>
          {photos.length > 0 && (
            <div className={`grid ${photos.length === 1 ? "grid-cols-1" : "grid-cols-2"} sm:grid-cols-1 gap-3 content-start`}>
              {photos.map((p) => <SidePhoto key={p.caption} photo={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Local take: a short note in Will's words */}
      {profile.localTake && (
        <div className="px-6 pt-5">
          <blockquote className="flex gap-3 border-l-4 border-[#C89B3C] bg-[#FBF6EA] rounded-r-lg px-4 py-3">
            <Quote className="w-4 h-4 text-[#C89B3C] shrink-0 mt-1" />
            <div className="min-w-0">
              <p className="text-[15px] text-[#0D2137] font-body leading-relaxed">{profile.localTake}</p>
              <footer className="text-xs text-gray-500 font-body mt-1">Will Shao, REMAX Executive Realty</footer>
            </div>
          </blockquote>
        </div>
      )}

      {/* Highlights */}
      <div className="px-6 pt-7">
        <h3 className="text-base font-bold text-[#0D2137] mb-3">Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profile.highlights.map((h) => {
            const Icon = HIGHLIGHT_ICONS[h.icon];
            return (
              <div key={h.title} className="flex gap-3 rounded-xl border border-gray-100 p-3.5">
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#FBF6EA] flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-[#C89B3C]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0D2137] font-body">{h.title}</p>
                  <p className="text-sm text-gray-600 font-body leading-snug mt-0.5">{h.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events + getting around */}
      <div className="px-6 pt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {profile.events.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-[#0D2137] mb-2">
              <CalendarDays className="w-4 h-4 text-[#C89B3C]" /> Annual events
            </h3>
            <div className="space-y-3">
              {profile.events.map((e) => (
                <div key={e.name}>
                  <p className="text-sm font-semibold text-[#0D2137] font-body">
                    {e.name} <span className="font-normal text-gray-500">· {e.when}</span>
                  </p>
                  <p className="text-sm text-gray-600 font-body leading-snug mt-0.5">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-[#0D2137] mb-2">
            <Car className="w-4 h-4 text-[#C89B3C]" /> Getting around
          </h3>
          <ul className="space-y-1.5">
            {profile.gettingAround.map((g) => (
              <li key={g} className="flex gap-2 text-sm text-gray-600 font-body">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C89B3C] shrink-0" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sources */}
      <div className="px-6 pt-7 pb-6">
        <details className="text-xs text-gray-500 font-body">
          <summary className="cursor-pointer select-none hover:text-[#0D2137]">Sources</summary>
          <ul className="mt-2 space-y-1">
            {profile.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#0D2137] hover:underline">
                  {s.label} <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
