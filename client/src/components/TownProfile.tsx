/*
 * TownProfile.tsx — the visual "what it's like to live here" card at the top of a town page.
 * Content lives in data/townProfiles.ts. The tagline is shown in the page banner, not repeated here. Photos without a `src` show a labeled placeholder
 * until a licensed photo is added.
 */
import {
  Flag, Landmark, Bike, Trees, Store, School, Plane, Waves, Tractor, CalendarDays, Car,
  Users, Ruler, Navigation, Building2, Receipt, Quote, Camera, ExternalLink, Clock,
} from "lucide-react";
import type { TownProfile as Profile, ProfileHighlight } from "@/data/townProfiles";

const HIGHLIGHT_ICONS: Record<ProfileHighlight["icon"], typeof Flag> = {
  history: Flag, museum: Landmark, trail: Bike, tree: Trees, store: Store,
  school: School, plane: Plane, river: Waves, farm: Tractor,
};

const GLANCE_ICONS: Record<string, typeof Flag> = {
  Population: Users,
  Size: Ruler,
  "From Boston": Navigation,
  Incorporated: Clock,
  Government: Building2,
  "Property tax rate": Receipt,
};

export default function TownProfile({ name, profile }: { name: string; profile: Profile }) {
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

      {/* Photos: a compact row (2 across on phones, 4 on wider screens) */}
      {profile.photos.length > 0 && (
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {profile.photos.map((p) => (
              <figure key={p.caption}>
                {p.src ? (
                  <img src={p.src} alt={p.caption} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-lg" />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-[#E8ECF1] to-[#D5DCE5] flex flex-col items-center justify-center text-[#6F87A6]">
                    <Camera className="w-5 h-5" />
                    <span className="text-[10px] font-body mt-1">Photo to come</span>
                  </div>
                )}
                <figcaption className="mt-1 text-[11px] text-gray-600 font-body leading-snug">
                  {p.caption}
                  {p.credit && (
                    <span className="block text-gray-400">
                      {p.licenseUrl ? <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{p.credit}</a> : p.credit}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* What it's like */}
      <div className="px-6 pt-7">
        <h3 className="text-base font-bold text-[#0D2137] mb-2">What it's like</h3>
        <div className="space-y-3 text-base text-gray-600 font-body leading-relaxed">
          {profile.feel.map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
        </div>
      </div>

      {/* Local take */}
      {profile.localTake && (
        <div className="px-6 pt-6">
          <blockquote className="relative bg-[#0D2137] text-white rounded-xl p-5 pl-12">
            <Quote className="absolute left-4 top-5 w-5 h-5 text-[#C89B3C]" />
            <p className="text-base font-body leading-relaxed">{profile.localTake}</p>
            <footer className="text-sm text-white/60 font-body mt-2">Will Shao, REMAX Executive Realty</footer>
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
