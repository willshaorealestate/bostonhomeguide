/*
 * Market.tsx — BostonHomeGuide.com
 * Monthly Greater Boston Market Reports with charts and email signup
 */
import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Link } from "wouter";
import { TrendingUp, Mail, BarChart2, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import PullQuote from "@/components/PullQuote";
import TownCompareTable from "@/components/TownCompareTable";
import { toast } from "sonner";
import { submitToFub } from "@/lib/fub";
import { useSEO } from "@/lib/seo";
import { trackLead } from "@/lib/analytics";

const HERO_IMAGE = "/images/towns/newton.jpeg";

// Last updated: September 2026 — Source: MLSPIN Area Market Survey (SF + CC), individual town reports
const priceData = [
  { month: "Oct '25", median: 810000, sales: 1871 },
  { month: "Nov '25", median: 810000, sales: 1577 },
  { month: "Dec '25", median: 775000, sales: 1780 },
  { month: "Jan '26", median: 800000, sales: 1111 },
  { month: "Feb '26", median: 750000, sales: 950 },
  { month: "Mar '26", median: 805000, sales: 1258 },
  { month: "Apr '26", median: 857500, sales: 1597 },
  { month: "May '26", median: 850000, sales: 2116 },
  { month: "Jun '26", median: 860000, sales: 2761 },
  { month: "Jul '26", median: 850000, sales: 2709 },
  { month: "Aug '26", median: 857000, sales: 2083 },
  { month: "Sep '26", median: 790000, sales: 1647 },
];

const domData = [
  { month: "Oct '25", dom: 42 },
  { month: "Nov '25", dom: 43 },
  { month: "Dec '25", dom: 51 },
  { month: "Jan '26", dom: 61 },
  { month: "Feb '26", dom: 64 },
  { month: "Mar '26", dom: 57 },
  { month: "Apr '26", dom: 44 },
  { month: "May '26", dom: 35 },
  { month: "Jun '26", dom: 33 },
  { month: "Jul '26", dom: 35 },
  { month: "Aug '26", dom: 40 },
  { month: "Sep '26", dom: 46 },
];

const townData = [
  { town: "Boston",    medianPrice:  787500, dom: 61, listToSale: 98.0 },
  { town: "Cambridge", medianPrice:  862500, dom: 50, listToSale: 99.0 },
  { town: "Somerville", medianPrice:  879000, dom: 44, listToSale: 101.0 },
  { town: "Brookline", medianPrice: 1275000, dom: 83, listToSale: 97.0 },
  { town: "Medford",   medianPrice:  745000, dom: 57, listToSale: 100.0 },
  { town: "Malden",    medianPrice:  645000, dom: 39, listToSale: 100.0 },
  { town: "Quincy",    medianPrice:  732000, dom: 36, listToSale: 99.0 },
  { town: "Arlington", medianPrice: 1340000, dom: 33, listToSale: 103.0 },
  { town: "Belmont",   medianPrice: 1525000, dom: 61, listToSale: 97.0 },
  { town: "Waltham",   medianPrice:  767500, dom: 42, listToSale: 99.0 },
  { town: "Newton",    medianPrice: 1647500, dom: 47, listToSale: 99.0 },
  { town: "Wellesley", medianPrice: 2950000, dom: 62, listToSale: 97.0 },
  { town: "Natick",    medianPrice:  873500, dom: 41, listToSale: 100.0 },
  { town: "Framingham", medianPrice:  705000, dom: 34, listToSale: 100.0 },
  { town: "Wayland",   medianPrice:  827500, dom: 42, listToSale: 100.0 },
  { town: "Needham",   medianPrice: 1570000, dom: 80, listToSale: 98.0 },
  { town: "Dedham",    medianPrice:  830000, dom: 33, listToSale: 101.0 },
  { town: "Westwood",  medianPrice: 1255000, dom: 81, listToSale: 99.0 },
  { town: "Weston",    medianPrice: 1742925, dom: 91, listToSale: 96.0 },
  { town: "Sudbury",   medianPrice:  957500, dom: 41, listToSale: 99.0 },
  { town: "Shrewsbury", medianPrice:  670000, dom: 37, listToSale: 101.0 },
  { town: "Lexington", medianPrice: 1422000, dom: 48, listToSale: 98.0 },
  { town: "Concord",   medianPrice: 1437500, dom: 59, listToSale: 102.0 },
  { town: "Winchester", medianPrice: 2021000, dom: 64, listToSale: 99.0 },
  { town: "Bedford",   medianPrice: 1088000, dom: 47, listToSale: 101.0 },
  { town: "Carlisle",  medianPrice: 1080000, dom: 91, listToSale: 94.0 },
  { town: "Acton",     medianPrice:  850000, dom: 50, listToSale: 100.0 },
  { town: "Stow",      medianPrice:  724500, dom: 62, listToSale: 100.0 },
  { town: "Boxborough", medianPrice: 1200000, dom: 46, listToSale: 99.0 },
  { town: "Bolton",    medianPrice:  811000, dom: 71, listToSale: 100.0 },
  { town: "Harvard",   medianPrice: 1335000, dom: 80, listToSale: 97.0 },
  { town: "Maynard",   medianPrice:  575000, dom: 25, listToSale: 100.0 },
  { town: "Littleton", medianPrice:  890000, dom: 28, listToSale: 102.0 },
  { town: "Groton",    medianPrice:  803777, dom: 27, listToSale: 102.0 },
  { town: "Ayer",      medianPrice:  336000, dom: 21, listToSale: 105.0 },
  { town: "Westford",  medianPrice:  894500, dom: 32, listToSale: 100.0 },
  { town: "Chelmsford", medianPrice:  670000, dom: 36, listToSale: 101.0 },
  { town: "Billerica", medianPrice:  677500, dom: 35, listToSale: 101.0 },
  { town: "Tewksbury", medianPrice:  616700, dom: 27, listToSale: 102.0 },
  { town: "Wilmington", medianPrice:  775000, dom: 26, listToSale: 103.0 },
  { town: "Woburn",    medianPrice:  710000, dom: 28, listToSale: 100.0 },
  { town: "Stoneham",  medianPrice:  875000, dom: 33, listToSale: 101.0 },
  { town: "Melrose",   medianPrice:  870000, dom: 41, listToSale: 103.0 },
  { town: "Wakefield", medianPrice:  810000, dom: 38, listToSale: 101.0 },
  { town: "Reading",   medianPrice:  860000, dom: 32, listToSale: 100.0 },
  { town: "North Reading", medianPrice:  732500, dom: 39, listToSale: 99.0 },
  { town: "Lynnfield", medianPrice: 1353500, dom: 33, listToSale: 104.0 },
  { town: "Andover",   medianPrice:  932500, dom: 34, listToSale: 100.0 },
  { town: "North Andover", medianPrice:  675000, dom: 50, listToSale: 100.0 },
  { town: "Ashland",   medianPrice:  669500, dom: 21, listToSale: 102.0 },
  { town: "Hopkinton", medianPrice: 1000000, dom: 50, listToSale: 100.0 },
  { town: "Sherborn",  medianPrice:  800000, dom: 94, listToSale: 94.0 },
  { town: "Holliston", medianPrice:  967500, dom: 34, listToSale: 97.0 },
  { town: "Medway",    medianPrice:  720000, dom: 50, listToSale: 99.0 },
  { town: "Millis",    medianPrice:  532500, dom: 47, listToSale: 99.0 },
  { town: "Milford",   medianPrice:  570000, dom: 44, listToSale: 100.0 },
  { town: "Hudson",    medianPrice:  599950, dom: 31, listToSale: 101.0 },
  { town: "Marlborough", medianPrice:  612500, dom: 51, listToSale: 99.0 },
  { town: "Southborough", medianPrice:  940000, dom: 46, listToSale: 97.0 },
  { town: "Westborough", medianPrice:  607450, dom: 55, listToSale: 98.0 },
  { town: "Northborough", medianPrice:  750000, dom: 73, listToSale: 96.0 },
  { town: "Dover",     medianPrice: 1782500, dom: 59, listToSale: 98.0 },
  { town: "Medfield",  medianPrice: 1085000, dom: 44, listToSale: 100.0 },
  { town: "Canton",    medianPrice:  792500, dom: 49, listToSale: 100.0 },
  { town: "Sharon",    medianPrice: 1002000, dom: 42, listToSale: 99.0 },
  { town: "Stoughton", medianPrice:  607500, dom: 29, listToSale: 99.0 },
  { town: "Norwood",   medianPrice:  675000, dom: 35, listToSale: 99.0 },
  { town: "Milton",    medianPrice: 1170000, dom: 28, listToSale: 100.0 },
  { town: "Braintree", medianPrice:  745000, dom: 37, listToSale: 101.0 },
  { town: "Watertown", medianPrice:  716250, dom: 43, listToSale: 102.0 },
  { town: "Burlington", medianPrice:  899900, dom: 56, listToSale: 102.0 },
];

// Per-town rolling 12-month history — scraper appends each month
const townHistoryData: Record<string, Array<{ month: string; median: number; dom: number; listToSale: number; sold: number; pending: number }>> = {
  "Boston": [
    { month: "Oct '25", median:  785000, dom: 61, listToSale: 99, sold: 324, pending: 2 },
    { month: "Nov '25", median:  792000, dom: 51, listToSale: 99, sold: 308, pending: 2 },
    { month: "Dec '25", median:  785000, dom: 66, listToSale: 98, sold: 337, pending: 2 },
    { month: "Jan '26", median:  762500, dom: 75, listToSale: 98, sold: 230, pending: 2 },
    { month: "Feb '26", median:  739500, dom: 73, listToSale: 99, sold: 194, pending: 2 },
    { month: "Mar '26", median:  775000, dom: 67, listToSale: 98, sold: 305, pending: 2 },
    { month: "Apr '26", median:  813000, dom: 61, listToSale: 99, sold: 351, pending: 8 },
    { month: "May '26", median:  820000, dom: 44, listToSale: 100, sold: 451, pending: 18 },
    { month: "Jun '26", median:  850000, dom: 40, listToSale: 100, sold: 532, pending: 17 },
    { month: "Jul '26", median:  805000, dom: 45, listToSale: 100, sold: 542, pending: 28 },
    { month: "Aug '26", median:  815000, dom: 51, listToSale: 99, sold: 391, pending: 52 },
    { month: "Sep '26", median:  787500, dom: 61, listToSale: 98, sold: 310, pending: 220 },
  ],
  "Newton": [
    { month: "Oct '25", median: 1390000, dom: 51, listToSale: 100, sold: 77, pending: 0 },
    { month: "Nov '25", median: 1452500, dom: 52, listToSale: 98, sold: 74, pending: 4 },
    { month: "Dec '25", median: 1475000, dom: 57, listToSale: 99, sold: 64, pending: 0 },
    { month: "Jan '26", median: 1665000, dom: 46, listToSale: 99, sold: 44, pending: 0 },
    { month: "Feb '26", median: 1550000, dom: 74, listToSale: 99, sold: 36, pending: 0 },
    { month: "Mar '26", median: 1475000, dom: 56, listToSale: 99, sold: 50, pending: 0 },
    { month: "Apr '26", median: 1763900, dom: 44, listToSale: 100, sold: 67, pending: 1 },
    { month: "May '26", median: 1695000, dom: 40, listToSale: 102, sold: 85, pending: 0 },
    { month: "Jun '26", median: 1553180, dom: 41, listToSale: 101, sold: 111, pending: 4 },
    { month: "Jul '26", median: 1402655, dom: 35, listToSale: 102, sold: 116, pending: 2 },
    { month: "Aug '26", median: 1728250, dom: 47, listToSale: 99, sold: 66, pending: 11 },
    { month: "Sep '26", median: 1647500, dom: 47, listToSale: 99, sold: 38, pending: 54 },
  ],
  "Wellesley": [
    { month: "Oct '25", median: 2000000, dom: 34, listToSale: 99, sold: 25, pending: 0 },
    { month: "Nov '25", median: 1755000, dom: 31, listToSale: 99, sold: 23, pending: 1 },
    { month: "Dec '25", median: 1975000, dom: 58, listToSale: 98, sold: 25, pending: 0 },
    { month: "Jan '26", median: 1970000, dom: 82, listToSale: 97, sold: 14, pending: 0 },
    { month: "Feb '26", median: 1180000, dom: 87, listToSale: 100, sold: 7, pending: 0 },
    { month: "Mar '26", median: 1825000, dom: 85, listToSale: 98, sold: 11, pending: 1 },
    { month: "Apr '26", median: 1902500, dom: 34, listToSale: 102, sold: 33, pending: 1 },
    { month: "May '26", median: 2628000, dom: 62, listToSale: 102, sold: 23, pending: 2 },
    { month: "Jun '26", median: 2225000, dom: 28, listToSale: 101, sold: 51, pending: 1 },
    { month: "Jul '26", median: 2595000, dom: 28, listToSale: 101, sold: 36, pending: 1 },
    { month: "Aug '26", median: 2165000, dom: 33, listToSale: 97, sold: 42, pending: 2 },
    { month: "Sep '26", median: 2950000, dom: 62, listToSale: 97, sold: 19, pending: 28 },
  ],
  "Brookline": [
    { month: "Oct '25", median:  942500, dom: 47, listToSale: 99, sold: 42, pending: 0 },
    { month: "Nov '25", median: 1220000, dom: 50, listToSale: 99, sold: 32, pending: 0 },
    { month: "Dec '25", median: 1405000, dom: 80, listToSale: 97, sold: 37, pending: 0 },
    { month: "Jan '26", median: 1510000, dom: 94, listToSale: 99, sold: 29, pending: 1 },
    { month: "Feb '26", median: 1325000, dom: 67, listToSale: 100, sold: 16, pending: 0 },
    { month: "Mar '26", median: 1675000, dom: 60, listToSale: 100, sold: 36, pending: 0 },
    { month: "Apr '26", median: 1350000, dom: 46, listToSale: 101, sold: 51, pending: 0 },
    { month: "May '26", median: 1280000, dom: 43, listToSale: 100, sold: 63, pending: 2 },
    { month: "Jun '26", median: 1127500, dom: 36, listToSale: 99, sold: 72, pending: 5 },
    { month: "Jul '26", median: 1440000, dom: 40, listToSale: 100, sold: 56, pending: 2 },
    { month: "Aug '26", median: 1140000, dom: 52, listToSale: 98, sold: 47, pending: 8 },
    { month: "Sep '26", median: 1275000, dom: 83, listToSale: 97, sold: 27, pending: 32 },
  ],
  "Natick": [
    { month: "Oct '25", median:  975000, dom: 33, listToSale: 100, sold: 37, pending: 0 },
    { month: "Nov '25", median:  890000, dom: 39, listToSale: 99, sold: 24, pending: 0 },
    { month: "Dec '25", median: 1016250, dom: 49, listToSale: 98, sold: 24, pending: 0 },
    { month: "Jan '26", median:  899000, dom: 69, listToSale: 100, sold: 27, pending: 0 },
    { month: "Feb '26", median:  950000, dom: 46, listToSale: 99, sold: 17, pending: 0 },
    { month: "Mar '26", median:  914678, dom: 53, listToSale: 101, sold: 39, pending: 0 },
    { month: "Apr '26", median:  960000, dom: 32, listToSale: 103, sold: 41, pending: 0 },
    { month: "May '26", median:  775000, dom: 38, listToSale: 99, sold: 39, pending: 0 },
    { month: "Jun '26", median:  942500, dom: 29, listToSale: 101, sold: 62, pending: 0 },
    { month: "Jul '26", median:  900000, dom: 24, listToSale: 100, sold: 55, pending: 0 },
    { month: "Aug '26", median:  857500, dom: 27, listToSale: 100, sold: 36, pending: 6 },
    { month: "Sep '26", median:  873500, dom: 41, listToSale: 100, sold: 31, pending: 20 },
  ],
  "Lexington": [
    { month: "Oct '25", median: 1500000, dom: 34, listToSale: 103, sold: 28, pending: 0 },
    { month: "Nov '25", median: 2068000, dom: 53, listToSale: 101, sold: 23, pending: 0 },
    { month: "Dec '25", median: 1687500, dom: 81, listToSale: 100, sold: 20, pending: 0 },
    { month: "Jan '26", median: 1267500, dom: 56, listToSale: 97, sold: 7, pending: 0 },
    { month: "Feb '26", median: 1065300, dom: 61, listToSale: 99, sold: 9, pending: 0 },
    { month: "Mar '26", median: 1715000, dom: 39, listToSale: 102, sold: 18, pending: 0 },
    { month: "Apr '26", median: 2005000, dom: 61, listToSale: 100, sold: 30, pending: 0 },
    { month: "May '26", median: 1685000, dom: 29, listToSale: 104, sold: 31, pending: 2 },
    { month: "Jun '26", median: 1570000, dom: 37, listToSale: 101, sold: 52, pending: 0 },
    { month: "Jul '26", median: 1580000, dom: 62, listToSale: 101, sold: 51, pending: 3 },
    { month: "Aug '26", median: 1750000, dom: 57, listToSale: 99, sold: 39, pending: 6 },
    { month: "Sep '26", median: 1422000, dom: 48, listToSale: 98, sold: 18, pending: 20 },
  ],
  "Needham": [
    { month: "Oct '25", median: 1362500, dom: 45, listToSale: 100, sold: 22, pending: 0 },
    { month: "Nov '25", median: 1700000, dom: 49, listToSale: 101, sold: 17, pending: 0 },
    { month: "Dec '25", median: 1602000, dom: 76, listToSale: 99, sold: 17, pending: 0 },
    { month: "Jan '26", median: 2574500, dom: 59, listToSale: 98, sold: 17, pending: 1 },
    { month: "Feb '26", median: 2025000, dom: 58, listToSale: 98, sold: 15, pending: 0 },
    { month: "Mar '26", median: 2259500, dom: 80, listToSale: 99, sold: 12, pending: 0 },
    { month: "Apr '26", median: 1800000, dom: 38, listToSale: 101, sold: 32, pending: 0 },
    { month: "May '26", median: 1615000, dom: 36, listToSale: 101, sold: 33, pending: 0 },
    { month: "Jun '26", median: 1758000, dom: 38, listToSale: 102, sold: 35, pending: 0 },
    { month: "Jul '26", median: 1700000, dom: 36, listToSale: 100, sold: 41, pending: 1 },
    { month: "Aug '26", median: 1490750, dom: 38, listToSale: 99, sold: 40, pending: 5 },
    { month: "Sep '26", median: 1570000, dom: 80, listToSale: 98, sold: 21, pending: 17 },
  ],
  "Framingham": [
    { month: "Oct '25", median:  640000, dom: 32, listToSale: 100, sold: 49, pending: 0 },
    { month: "Nov '25", median:  585700, dom: 32, listToSale: 101, sold: 35, pending: 1 },
    { month: "Dec '25", median:  660000, dom: 52, listToSale: 100, sold: 49, pending: 0 },
    { month: "Jan '26", median:  630000, dom: 50, listToSale: 99, sold: 25, pending: 0 },
    { month: "Feb '26", median:  676000, dom: 48, listToSale: 99, sold: 29, pending: 0 },
    { month: "Mar '26", median:  728000, dom: 36, listToSale: 103, sold: 36, pending: 1 },
    { month: "Apr '26", median:  720000, dom: 52, listToSale: 102, sold: 31, pending: 0 },
    { month: "May '26", median:  700000, dom: 26, listToSale: 103, sold: 46, pending: 0 },
    { month: "Jun '26", median:  660000, dom: 36, listToSale: 101, sold: 84, pending: 0 },
    { month: "Jul '26", median:  675000, dom: 24, listToSale: 101, sold: 57, pending: 1 },
    { month: "Aug '26", median:  670000, dom: 30, listToSale: 101, sold: 50, pending: 5 },
    { month: "Sep '26", median:  705000, dom: 34, listToSale: 100, sold: 51, pending: 38 },
  ],
  "Waltham": [
    { month: "Oct '25", median:  800000, dom: 23, listToSale: 102, sold: 46, pending: 0 },
    { month: "Nov '25", median:  792250, dom: 36, listToSale: 100, sold: 26, pending: 0 },
    { month: "Dec '25", median:  740000, dom: 40, listToSale: 100, sold: 30, pending: 0 },
    { month: "Jan '26", median:  687500, dom: 44, listToSale: 100, sold: 14, pending: 0 },
    { month: "Feb '26", median:  774383, dom: 69, listToSale: 99, sold: 17, pending: 0 },
    { month: "Mar '26", median:  825500, dom: 65, listToSale: 99, sold: 20, pending: 0 },
    { month: "Apr '26", median:  822500, dom: 47, listToSale: 101, sold: 24, pending: 0 },
    { month: "May '26", median:  813300, dom: 32, listToSale: 100, sold: 33, pending: 0 },
    { month: "Jun '26", median:  780000, dom: 23, listToSale: 101, sold: 47, pending: 0 },
    { month: "Jul '26", median:  800000, dom: 30, listToSale: 102, sold: 31, pending: 1 },
    { month: "Aug '26", median:  830000, dom: 39, listToSale: 100, sold: 39, pending: 5 },
    { month: "Sep '26", median:  767500, dom: 42, listToSale: 99, sold: 22, pending: 21 },
  ],
  "Cambridge": [
    { month: "Oct '25", median: 1212500, dom: 37, listToSale: 102, sold: 60, pending: 0 },
    { month: "Nov '25", median: 1190000, dom: 43, listToSale: 100, sold: 48, pending: 0 },
    { month: "Dec '25", median:  972500, dom: 64, listToSale: 100, sold: 54, pending: 0 },
    { month: "Jan '26", median: 1500000, dom: 90, listToSale: 98, sold: 29, pending: 0 },
    { month: "Feb '26", median:  817500, dom: 65, listToSale: 99, sold: 32, pending: 1 },
    { month: "Mar '26", median: 1190000, dom: 85, listToSale: 101, sold: 23, pending: 2 },
    { month: "Apr '26", median: 1025000, dom: 44, listToSale: 104, sold: 51, pending: 0 },
    { month: "May '26", median: 1150000, dom: 40, listToSale: 103, sold: 83, pending: 1 },
    { month: "Jun '26", median: 1050000, dom: 34, listToSale: 102, sold: 102, pending: 1 },
    { month: "Jul '26", median: 1287500, dom: 36, listToSale: 103, sold: 86, pending: 2 },
    { month: "Aug '26", median: 1045000, dom: 42, listToSale: 102, sold: 67, pending: 5 },
    { month: "Sep '26", median:  862500, dom: 50, listToSale: 99, sold: 28, pending: 46 },
  ],
  "Arlington": [
    { month: "Oct '25", median: 1073412, dom: 28, listToSale: 103, sold: 40, pending: 0 },
    { month: "Nov '25", median: 1200000, dom: 38, listToSale: 100, sold: 36, pending: 0 },
    { month: "Dec '25", median:  851000, dom: 38, listToSale: 100, sold: 29, pending: 0 },
    { month: "Jan '26", median: 1061775, dom: 36, listToSale: 100, sold: 41, pending: 0 },
    { month: "Feb '26", median:  863000, dom: 29, listToSale: 104, sold: 15, pending: 0 },
    { month: "Mar '26", median: 1107500, dom: 44, listToSale: 103, sold: 18, pending: 0 },
    { month: "Apr '26", median: 1204500, dom: 24, listToSale: 105, sold: 34, pending: 0 },
    { month: "May '26", median: 1072500, dom: 27, listToSale: 105, sold: 46, pending: 1 },
    { month: "Jun '26", median:  986000, dom: 24, listToSale: 105, sold: 53, pending: 0 },
    { month: "Jul '26", median: 1160000, dom: 28, listToSale: 103, sold: 49, pending: 0 },
    { month: "Aug '26", median: 1145000, dom: 31, listToSale: 102, sold: 39, pending: 0 },
    { month: "Sep '26", median: 1340000, dom: 33, listToSale: 103, sold: 21, pending: 18 },
  ],
  "Belmont": [
    { month: "Oct '25", median: 1136000, dom: 33, listToSale: 99, sold: 17, pending: 0 },
    { month: "Nov '25", median: 1247500, dom: 48, listToSale: 97, sold: 20, pending: 0 },
    { month: "Dec '25", median: 1175000, dom: 45, listToSale: 97, sold: 11, pending: 0 },
    { month: "Jan '26", median: 1600000, dom: 80, listToSale: 102, sold: 9, pending: 0 },
    { month: "Feb '26", median: 1310000, dom: 85, listToSale: 99, sold: 10, pending: 0 },
    { month: "Mar '26", median: 1580000, dom: 41, listToSale: 101, sold: 10, pending: 0 },
    { month: "Apr '26", median: 1678500, dom: 32, listToSale: 102, sold: 10, pending: 0 },
    { month: "May '26", median: 1317500, dom: 18, listToSale: 102, sold: 14, pending: 1 },
    { month: "Jun '26", median: 1516000, dom: 24, listToSale: 103, sold: 18, pending: 0 },
    { month: "Jul '26", median: 1540000, dom: 23, listToSale: 101, sold: 23, pending: 0 },
    { month: "Aug '26", median: 1410000, dom: 21, listToSale: 101, sold: 15, pending: 1 },
    { month: "Sep '26", median: 1525000, dom: 61, listToSale: 97, sold: 18, pending: 14 },
  ],
  "Somerville": [
    { month: "Oct '25", median:  960000, dom: 26, listToSale: 100, sold: 39, pending: 0 },
    { month: "Nov '25", median:  880000, dom: 29, listToSale: 100, sold: 35, pending: 0 },
    { month: "Dec '25", median:  767500, dom: 61, listToSale: 99, sold: 32, pending: 0 },
    { month: "Jan '26", median:  877500, dom: 66, listToSale: 99, sold: 28, pending: 0 },
    { month: "Feb '26", median: 1006000, dom: 51, listToSale: 100, sold: 31, pending: 0 },
    { month: "Mar '26", median:  752745, dom: 60, listToSale: 100, sold: 27, pending: 0 },
    { month: "Apr '26", median:  945000, dom: 41, listToSale: 101, sold: 45, pending: 0 },
    { month: "May '26", median: 1027500, dom: 36, listToSale: 101, sold: 50, pending: 0 },
    { month: "Jun '26", median: 1000000, dom: 34, listToSale: 101, sold: 72, pending: 1 },
    { month: "Jul '26", median:  805000, dom: 41, listToSale: 100, sold: 61, pending: 6 },
    { month: "Aug '26", median:  854000, dom: 35, listToSale: 100, sold: 39, pending: 2 },
    { month: "Sep '26", median:  879000, dom: 44, listToSale: 101, sold: 29, pending: 26 },
  ],
  "Medford": [
    { month: "Oct '25", median:  850000, dom: 31, listToSale: 103, sold: 39, pending: 0 },
    { month: "Nov '25", median:  975000, dom: 40, listToSale: 99, sold: 19, pending: 0 },
    { month: "Dec '25", median:  748000, dom: 43, listToSale: 99, sold: 37, pending: 0 },
    { month: "Jan '26", median:  775000, dom: 54, listToSale: 99, sold: 23, pending: 0 },
    { month: "Feb '26", median:  762500, dom: 87, listToSale: 101, sold: 24, pending: 0 },
    { month: "Mar '26", median:  850000, dom: 48, listToSale: 101, sold: 30, pending: 0 },
    { month: "Apr '26", median:  738500, dom: 43, listToSale: 101, sold: 24, pending: 2 },
    { month: "May '26", median:  835000, dom: 37, listToSale: 102, sold: 36, pending: 0 },
    { month: "Jun '26", median:  780000, dom: 23, listToSale: 102, sold: 41, pending: 1 },
    { month: "Jul '26", median:  873000, dom: 28, listToSale: 103, sold: 44, pending: 2 },
    { month: "Aug '26", median:  862500, dom: 51, listToSale: 100, sold: 47, pending: 2 },
    { month: "Sep '26", median:  745000, dom: 57, listToSale: 100, sold: 29, pending: 28 },
  ],
  "Watertown": [
    { month: "Oct '25", median:  880000, dom: 38, listToSale: 101, sold: 19, pending: 0 },
    { month: "Nov '25", median:  840000, dom: 49, listToSale: 99, sold: 18, pending: 0 },
    { month: "Dec '25", median:  719000, dom: 45, listToSale: 99, sold: 27, pending: 0 },
    { month: "Jan '26", median:  800000, dom: 57, listToSale: 100, sold: 11, pending: 0 },
    { month: "Feb '26", median:  780000, dom: 55, listToSale: 101, sold: 15, pending: 0 },
    { month: "Mar '26", median:  940000, dom: 30, listToSale: 100, sold: 23, pending: 0 },
    { month: "Apr '26", median:  785000, dom: 28, listToSale: 102, sold: 33, pending: 0 },
    { month: "May '26", median:  775000, dom: 38, listToSale: 100, sold: 31, pending: 0 },
    { month: "Jun '26", median:  825000, dom: 41, listToSale: 100, sold: 29, pending: 0 },
    { month: "Jul '26", median:  825000, dom: 35, listToSale: 100, sold: 37, pending: 3 },
    { month: "Aug '26", median:  561000, dom: 32, listToSale: 101, sold: 23, pending: 1 },
    { month: "Sep '26", median:  716250, dom: 43, listToSale: 102, sold: 14, pending: 18 },
  ],
  "Winchester": [
    { month: "Oct '25", median: 1656000, dom: 30, listToSale: 98, sold: 25, pending: 0 },
    { month: "Nov '25", median: 1302500, dom: 68, listToSale: 101, sold: 14, pending: 0 },
    { month: "Dec '25", median: 1524000, dom: 63, listToSale: 101, sold: 24, pending: 0 },
    { month: "Jan '26", median: 1450750, dom: 75, listToSale: 99, sold: 16, pending: 0 },
    { month: "Feb '26", median: 1335000, dom: 32, listToSale: 101, sold: 15, pending: 0 },
    { month: "Mar '26", median: 1362500, dom: 46, listToSale: 99, sold: 16, pending: 0 },
    { month: "Apr '26", median: 1530000, dom: 44, listToSale: 102, sold: 13, pending: 0 },
    { month: "May '26", median: 1400000, dom: 34, listToSale: 102, sold: 29, pending: 0 },
    { month: "Jun '26", median: 1608500, dom: 32, listToSale: 100, sold: 28, pending: 0 },
    { month: "Jul '26", median: 1924500, dom: 30, listToSale: 101, sold: 30, pending: 0 },
    { month: "Aug '26", median: 1737000, dom: 36, listToSale: 99, sold: 18, pending: 3 },
    { month: "Sep '26", median: 2021000, dom: 64, listToSale: 99, sold: 12, pending: 10 },
  ],
  "Woburn": [
    { month: "Oct '25", median:  777500, dom: 39, listToSale: 100, sold: 20, pending: 0 },
    { month: "Nov '25", median:  775000, dom: 29, listToSale: 101, sold: 24, pending: 0 },
    { month: "Dec '25", median:  717000, dom: 39, listToSale: 99, sold: 31, pending: 0 },
    { month: "Jan '26", median:  689138, dom: 49, listToSale: 99, sold: 20, pending: 0 },
    { month: "Feb '26", median:  810000, dom: 55, listToSale: 100, sold: 19, pending: 0 },
    { month: "Mar '26", median:  750000, dom: 41, listToSale: 99, sold: 12, pending: 0 },
    { month: "Apr '26", median:  707498, dom: 44, listToSale: 102, sold: 20, pending: 0 },
    { month: "May '26", median:  870000, dom: 23, listToSale: 104, sold: 30, pending: 0 },
    { month: "Jun '26", median:  775000, dom: 30, listToSale: 104, sold: 35, pending: 1 },
    { month: "Jul '26", median:  770000, dom: 29, listToSale: 101, sold: 39, pending: 0 },
    { month: "Aug '26", median:  749500, dom: 29, listToSale: 102, sold: 32, pending: 0 },
    { month: "Sep '26", median:  710000, dom: 28, listToSale: 100, sold: 26, pending: 19 },
  ],
  "Burlington": [
    { month: "Oct '25", median: 1095000, dom: 77, listToSale: 100, sold: 11, pending: 0 },
    { month: "Nov '25", median:  760000, dom: 19, listToSale: 100, sold: 13, pending: 0 },
    { month: "Dec '25", median:  840000, dom: 35, listToSale: 101, sold: 17, pending: 0 },
    { month: "Jan '26", median:  805000, dom: 32, listToSale: 102, sold: 9, pending: 0 },
    { month: "Feb '26", median:  859944, dom: 72, listToSale: 98, sold: 6, pending: 0 },
    { month: "Mar '26", median:  817500, dom: 44, listToSale: 101, sold: 11, pending: 1 },
    { month: "Apr '26", median:  876111, dom: 40, listToSale: 101, sold: 14, pending: 0 },
    { month: "May '26", median:  870000, dom: 25, listToSale: 104, sold: 20, pending: 0 },
    { month: "Jun '26", median:  879500, dom: 29, listToSale: 103, sold: 28, pending: 0 },
    { month: "Jul '26", median:  932500, dom: 32, listToSale: 103, sold: 28, pending: 0 },
    { month: "Aug '26", median:  815000, dom: 35, listToSale: 102, sold: 14, pending: 3 },
    { month: "Sep '26", median:  899900, dom: 56, listToSale: 102, sold: 15, pending: 9 },
  ],
  "Chelmsford": [
    { month: "Oct '25", median:  660000, dom: 29, listToSale: 101, sold: 22, pending: 0 },
    { month: "Nov '25", median:  550000, dom: 28, listToSale: 101, sold: 23, pending: 0 },
    { month: "Dec '25", median:  570000, dom: 35, listToSale: 100, sold: 29, pending: 0 },
    { month: "Jan '26", median:  583953, dom: 48, listToSale: 99, sold: 20, pending: 0 },
    { month: "Feb '26", median:  690000, dom: 59, listToSale: 100, sold: 11, pending: 0 },
    { month: "Mar '26", median:  672000, dom: 39, listToSale: 102, sold: 25, pending: 0 },
    { month: "Apr '26", median:  586500, dom: 36, listToSale: 101, sold: 28, pending: 0 },
    { month: "May '26", median:  632500, dom: 26, listToSale: 104, sold: 38, pending: 0 },
    { month: "Jun '26", median:  670000, dom: 24, listToSale: 104, sold: 46, pending: 0 },
    { month: "Jul '26", median:  677500, dom: 28, listToSale: 102, sold: 40, pending: 0 },
    { month: "Aug '26", median:  624500, dom: 31, listToSale: 100, sold: 38, pending: 0 },
    { month: "Sep '26", median:  670000, dom: 36, listToSale: 101, sold: 33, pending: 18 },
  ],
  "Acton": [
    { month: "Oct '25", median:  900000, dom: 32, listToSale: 102, sold: 31, pending: 0 },
    { month: "Nov '25", median:  765000, dom: 52, listToSale: 100, sold: 26, pending: 0 },
    { month: "Dec '25", median:  657500, dom: 35, listToSale: 102, sold: 24, pending: 0 },
    { month: "Jan '26", median:  637500, dom: 38, listToSale: 100, sold: 8, pending: 0 },
    { month: "Feb '26", median:  500000, dom: 34, listToSale: 102, sold: 7, pending: 0 },
    { month: "Mar '26", median:  595000, dom: 56, listToSale: 102, sold: 21, pending: 0 },
    { month: "Apr '26", median:  900000, dom: 43, listToSale: 102, sold: 23, pending: 2 },
    { month: "May '26", median:  950000, dom: 23, listToSale: 104, sold: 27, pending: 0 },
    { month: "Jun '26", median:  982500, dom: 30, listToSale: 104, sold: 40, pending: 2 },
    { month: "Jul '26", median:  805000, dom: 30, listToSale: 102, sold: 39, pending: 1 },
    { month: "Aug '26", median:  870000, dom: 32, listToSale: 100, sold: 19, pending: 1 },
    { month: "Sep '26", median:  850000, dom: 50, listToSale: 100, sold: 17, pending: 16 },
  ],
  "Bedford": [
    { month: "Oct '25", median:  952500, dom: 45, listToSale: 102, sold: 10, pending: 0 },
    { month: "Nov '25", median:  962250, dom: 47, listToSale: 101, sold: 10, pending: 0 },
    { month: "Dec '25", median:  972500, dom: 67, listToSale: 98, sold: 12, pending: 0 },
    { month: "Jan '26", median:  926500, dom: 54, listToSale: 101, sold: 10, pending: 0 },
    { month: "Feb '26", median:  605000, dom: 26, listToSale: 99, sold: 5, pending: 0 },
    { month: "Mar '26", median: 1165000, dom: 66, listToSale: 100, sold: 14, pending: 0 },
    { month: "Apr '26", median:  999900, dom: 16, listToSale: 101, sold: 7, pending: 0 },
    { month: "May '26", median: 1058000, dom: 39, listToSale: 101, sold: 14, pending: 0 },
    { month: "Jun '26", median: 1150000, dom: 26, listToSale: 103, sold: 11, pending: 1 },
    { month: "Jul '26", median: 1068000, dom: 44, listToSale: 103, sold: 21, pending: 0 },
    { month: "Aug '26", median:  955000, dom: 31, listToSale: 101, sold: 12, pending: 2 },
    { month: "Sep '26", median: 1088000, dom: 47, listToSale: 101, sold: 13, pending: 8 },
  ],
  "Concord": [
    { month: "Oct '25", median: 1342500, dom: 44, listToSale: 100, sold: 12, pending: 0 },
    { month: "Nov '25", median: 1757500, dom: 74, listToSale: 101, sold: 10, pending: 0 },
    { month: "Dec '25", median: 1355000, dom: 48, listToSale: 98, sold: 15, pending: 0 },
    { month: "Jan '26", median: 1350000, dom: 56, listToSale: 101, sold: 10, pending: 0 },
    { month: "Feb '26", median: 1495000, dom: 77, listToSale: 97, sold: 10, pending: 0 },
    { month: "Mar '26", median: 1405000, dom: 50, listToSale: 104, sold: 16, pending: 0 },
    { month: "Apr '26", median: 1741250, dom: 63, listToSale: 102, sold: 20, pending: 1 },
    { month: "May '26", median: 1767500, dom: 49, listToSale: 101, sold: 26, pending: 0 },
    { month: "Jun '26", median: 1650000, dom: 56, listToSale: 100, sold: 23, pending: 0 },
    { month: "Jul '26", median: 1775000, dom: 54, listToSale: 99, sold: 12, pending: 2 },
    { month: "Aug '26", median: 1725000, dom: 64, listToSale: 98, sold: 23, pending: 1 },
    { month: "Sep '26", median: 1437500, dom: 59, listToSale: 102, sold: 12, pending: 15 },
  ],
  "Westford": [
    { month: "Oct '25", median:  800000, dom: 58, listToSale: 100, sold: 27, pending: 0 },
    { month: "Nov '25", median:  960000, dom: 68, listToSale: 98, sold: 12, pending: 0 },
    { month: "Dec '25", median:  877500, dom: 40, listToSale: 100, sold: 18, pending: 0 },
    { month: "Jan '26", median:  946500, dom: 49, listToSale: 99, sold: 14, pending: 0 },
    { month: "Feb '26", median:  730000, dom: 40, listToSale: 100, sold: 13, pending: 2 },
    { month: "Mar '26", median:  874950, dom: 97, listToSale: 100, sold: 12, pending: 0 },
    { month: "Apr '26", median:  722500, dom: 42, listToSale: 99, sold: 19, pending: 0 },
    { month: "May '26", median:  805000, dom: 38, listToSale: 102, sold: 12, pending: 0 },
    { month: "Jun '26", median:  828400, dom: 46, listToSale: 101, sold: 27, pending: 0 },
    { month: "Jul '26", median:  942500, dom: 24, listToSale: 102, sold: 30, pending: 1 },
    { month: "Aug '26", median:  799900, dom: 28, listToSale: 101, sold: 33, pending: 0 },
    { month: "Sep '26", median:  894500, dom: 32, listToSale: 100, sold: 26, pending: 9 },
  ],
  "Hopkinton": [
    { month: "Oct '25", median: 1062500, dom: 46, listToSale: 98, sold: 18, pending: 1 },
    { month: "Nov '25", median: 1040000, dom: 58, listToSale: 97, sold: 9, pending: 0 },
    { month: "Dec '25", median:  875000, dom: 56, listToSale: 98, sold: 9, pending: 1 },
    { month: "Jan '26", median:  912000, dom: 83, listToSale: 99, sold: 6, pending: 0 },
    { month: "Feb '26", median:  995000, dom: 129, listToSale: 98, sold: 7, pending: 0 },
    { month: "Mar '26", median: 1289000, dom: 137, listToSale: 99, sold: 6, pending: 0 },
    { month: "Apr '26", median: 1187000, dom: 17, listToSale: 104, sold: 10, pending: 0 },
    { month: "May '26", median:  857500, dom: 36, listToSale: 101, sold: 24, pending: 0 },
    { month: "Jun '26", median: 1215000, dom: 34, listToSale: 101, sold: 35, pending: 0 },
    { month: "Jul '26", median: 1156000, dom: 40, listToSale: 102, sold: 38, pending: 1 },
    { month: "Aug '26", median: 1030000, dom: 59, listToSale: 102, sold: 27, pending: 4 },
    { month: "Sep '26", median: 1000000, dom: 50, listToSale: 100, sold: 20, pending: 11 },
  ],
  "Milton": [
    { month: "Oct '25", median:  850833, dom: 53, listToSale: 100, sold: 28, pending: 0 },
    { month: "Nov '25", median: 1100000, dom: 26, listToSale: 101, sold: 21, pending: 0 },
    { month: "Dec '25", median:  909900, dom: 51, listToSale: 99, sold: 21, pending: 0 },
    { month: "Jan '26", median:  959500, dom: 42, listToSale: 99, sold: 20, pending: 0 },
    { month: "Feb '26", median: 1200000, dom: 30, listToSale: 105, sold: 10, pending: 0 },
    { month: "Mar '26", median:  927500, dom: 73, listToSale: 103, sold: 16, pending: 0 },
    { month: "Apr '26", median: 1280000, dom: 50, listToSale: 106, sold: 11, pending: 0 },
    { month: "May '26", median: 1010000, dom: 57, listToSale: 106, sold: 20, pending: 0 },
    { month: "Jun '26", median: 1027500, dom: 29, listToSale: 104, sold: 28, pending: 0 },
    { month: "Jul '26", median: 1010000, dom: 25, listToSale: 105, sold: 21, pending: 0 },
    { month: "Aug '26", median: 1015000, dom: 34, listToSale: 100, sold: 27, pending: 3 },
    { month: "Sep '26", median: 1170000, dom: 28, listToSale: 100, sold: 18, pending: 16 },
  ],
  "Westwood": [
    { month: "Oct '25", median: 1212500, dom: 86, listToSale: 101, sold: 14, pending: 1 },
    { month: "Nov '25", median: 1420000, dom: 37, listToSale: 97, sold: 8, pending: 0 },
    { month: "Dec '25", median: 1055000, dom: 71, listToSale: 102, sold: 11, pending: 0 },
    { month: "Jan '26", median:  830000, dom: 56, listToSale: 98, sold: 5, pending: 0 },
    { month: "Mar '26", median: 1157663, dom: 41, listToSale: 104, sold: 6, pending: 0 },
    { month: "Apr '26", median: 1146000, dom: 42, listToSale: 104, sold: 11, pending: 0 },
    { month: "May '26", median: 1150000, dom: 42, listToSale: 105, sold: 13, pending: 0 },
    { month: "Jun '26", median: 1526000, dom: 30, listToSale: 103, sold: 18, pending: 0 },
    { month: "Jul '26", median: 1200000, dom: 94, listToSale: 101, sold: 11, pending: 0 },
    { month: "Aug '26", median: 1395000, dom: 32, listToSale: 100, sold: 20, pending: 1 },
    { month: "Sep '26", median: 1255000, dom: 81, listToSale: 99, sold: 10, pending: 8 },
  ],
  "Dedham": [
    { month: "Oct '25", median:  755000, dom: 45, listToSale: 102, sold: 18, pending: 0 },
    { month: "Nov '25", median:  775000, dom: 53, listToSale: 100, sold: 23, pending: 1 },
    { month: "Dec '25", median:  741000, dom: 33, listToSale: 102, sold: 18, pending: 2 },
    { month: "Jan '26", median:  626000, dom: 48, listToSale: 99, sold: 15, pending: 1 },
    { month: "Feb '26", median:  677500, dom: 53, listToSale: 102, sold: 13, pending: 0 },
    { month: "Mar '26", median:  700000, dom: 50, listToSale: 101, sold: 12, pending: 0 },
    { month: "Apr '26", median:  820000, dom: 44, listToSale: 103, sold: 18, pending: 0 },
    { month: "May '26", median:  746000, dom: 21, listToSale: 102, sold: 16, pending: 0 },
    { month: "Jun '26", median:  755000, dom: 29, listToSale: 103, sold: 37, pending: 2 },
    { month: "Jul '26", median:  778000, dom: 37, listToSale: 101, sold: 38, pending: 0 },
    { month: "Aug '26", median:  682000, dom: 37, listToSale: 102, sold: 30, pending: 2 },
    { month: "Sep '26", median:  830000, dom: 33, listToSale: 101, sold: 21, pending: 17 },
  ],
  "Canton": [
    { month: "Oct '25", median:  766975, dom: 28, listToSale: 99, sold: 36, pending: 12 },
    { month: "Nov '25", median:  689500, dom: 45, listToSale: 99, sold: 10, pending: 4 },
    { month: "Dec '25", median:  710000, dom: 42, listToSale: 99, sold: 17, pending: 2 },
    { month: "Jan '26", median:  845000, dom: 41, listToSale: 100, sold: 5, pending: 3 },
    { month: "Feb '26", median:  712500, dom: 26, listToSale: 101, sold: 17, pending: 4 },
    { month: "Mar '26", median:  820000, dom: 44, listToSale: 100, sold: 17, pending: 6 },
    { month: "Apr '26", median:  745900, dom: 40, listToSale: 100, sold: 17, pending: 8 },
    { month: "May '26", median:  665000, dom: 30, listToSale: 102, sold: 21, pending: 4 },
    { month: "Jun '26", median:  750000, dom: 42, listToSale: 101, sold: 31, pending: 9 },
    { month: "Jul '26", median:  715000, dom: 24, listToSale: 102, sold: 25, pending: 5 },
    { month: "Aug '26", median:  685850, dom: 40, listToSale: 101, sold: 30, pending: 5 },
    { month: "Sep '26", median:  792500, dom: 49, listToSale: 100, sold: 22, pending: 14 },
  ],
  "Quincy": [
    { month: "Oct '25", median:  640000, dom: 41, listToSale: 100, sold: 54, pending: 0 },
    { month: "Nov '25", median:  697500, dom: 38, listToSale: 99, sold: 58, pending: 0 },
    { month: "Dec '25", median:  659000, dom: 40, listToSale: 100, sold: 64, pending: 0 },
    { month: "Jan '26", median:  705000, dom: 58, listToSale: 99, sold: 32, pending: 0 },
    { month: "Feb '26", median:  577350, dom: 47, listToSale: 99, sold: 26, pending: 1 },
    { month: "Mar '26", median:  585000, dom: 42, listToSale: 100, sold: 37, pending: 1 },
    { month: "Apr '26", median:  664000, dom: 37, listToSale: 101, sold: 48, pending: 0 },
    { month: "May '26", median:  630000, dom: 36, listToSale: 102, sold: 54, pending: 2 },
    { month: "Jun '26", median:  659500, dom: 31, listToSale: 102, sold: 74, pending: 5 },
    { month: "Jul '26", median:  642500, dom: 27, listToSale: 101, sold: 64, pending: 2 },
    { month: "Aug '26", median:  670000, dom: 35, listToSale: 100, sold: 58, pending: 7 },
    { month: "Sep '26", median:  732000, dom: 36, listToSale: 99, sold: 69, pending: 43 },
  ],
  "Malden": [
    { month: "Oct '25", median:  650000, dom: 29, listToSale: 102, sold: 23, pending: 0 },
    { month: "Nov '25", median:  720000, dom: 29, listToSale: 103, sold: 19, pending: 0 },
    { month: "Dec '25", median:  517500, dom: 48, listToSale: 100, sold: 16, pending: 0 },
    { month: "Jan '26", median:  520000, dom: 73, listToSale: 102, sold: 9, pending: 0 },
    { month: "Feb '26", median:  475750, dom: 73, listToSale: 100, sold: 12, pending: 0 },
    { month: "Mar '26", median:  689950, dom: 55, listToSale: 100, sold: 12, pending: 0 },
    { month: "Apr '26", median:  692500, dom: 46, listToSale: 105, sold: 14, pending: 0 },
    { month: "May '26", median:  700000, dom: 30, listToSale: 103, sold: 19, pending: 0 },
    { month: "Jun '26", median:  600000, dom: 25, listToSale: 102, sold: 26, pending: 1 },
    { month: "Jul '26", median:  602500, dom: 41, listToSale: 102, sold: 28, pending: 0 },
    { month: "Aug '26", median:  492500, dom: 29, listToSale: 100, sold: 16, pending: 2 },
    { month: "Sep '26", median:  645000, dom: 39, listToSale: 100, sold: 22, pending: 18 },
  ],
  "Wayland": [
    { month: "Oct '25", median: 1195000, dom: 34, listToSale: 101, sold: 12, pending: 0 },
    { month: "Nov '25", median: 1132500, dom: 41, listToSale: 99, sold: 20, pending: 0 },
    { month: "Dec '25", median: 1073625, dom: 64, listToSale: 98, sold: 17, pending: 0 },
    { month: "Jan '26", median: 1305000, dom: 36, listToSale: 98, sold: 8, pending: 0 },
    { month: "Feb '26", median: 1025000, dom: 31, listToSale: 102, sold: 6, pending: 0 },
    { month: "Mar '26", median: 1095000, dom: 57, listToSale: 100, sold: 11, pending: 0 },
    { month: "Apr '26", median: 1133750, dom: 33, listToSale: 102, sold: 20, pending: 0 },
    { month: "May '26", median: 1385563, dom: 26, listToSale: 103, sold: 18, pending: 0 },
    { month: "Jun '26", median: 1460000, dom: 35, listToSale: 102, sold: 17, pending: 0 },
    { month: "Jul '26", median: 1185000, dom: 37, listToSale: 100, sold: 20, pending: 0 },
    { month: "Aug '26", median: 1150000, dom: 37, listToSale: 100, sold: 19, pending: 0 },
    { month: "Sep '26", median:  827500, dom: 42, listToSale: 100, sold: 10, pending: 13 },
  ],
  "Weston": [
    { month: "Oct '25", median: 2725000, dom: 72, listToSale: 96, sold: 14, pending: 0 },
    { month: "Nov '25", median: 1757500, dom: 95, listToSale: 96, sold: 12, pending: 0 },
    { month: "Dec '25", median: 1705000, dom: 98, listToSale: 95, sold: 13, pending: 0 },
    { month: "Jan '26", median: 1517500, dom: 121, listToSale: 94, sold: 10, pending: 0 },
    { month: "Feb '26", median: 2367500, dom: 147, listToSale: 98, sold: 6, pending: 0 },
    { month: "Mar '26", median: 2308000, dom: 91, listToSale: 95, sold: 10, pending: 1 },
    { month: "Apr '26", median: 3173000, dom: 62, listToSale: 98, sold: 8, pending: 1 },
    { month: "May '26", median: 2725000, dom: 41, listToSale: 99, sold: 14, pending: 3 },
    { month: "Jun '26", median: 2665000, dom: 38, listToSale: 101, sold: 12, pending: 0 },
    { month: "Jul '26", median: 2600000, dom: 76, listToSale: 98, sold: 15, pending: 1 },
    { month: "Aug '26", median: 2250000, dom: 62, listToSale: 95, sold: 9, pending: 4 },
    { month: "Sep '26", median: 1742925, dom: 91, listToSale: 96, sold: 14, pending: 7 },
  ],
  "Sudbury": [
    { month: "Oct '25", median: 1300000, dom: 42, listToSale: 99, sold: 17, pending: 0 },
    { month: "Nov '25", median: 1052500, dom: 44, listToSale: 101, sold: 22, pending: 0 },
    { month: "Dec '25", median: 1092500, dom: 48, listToSale: 100, sold: 16, pending: 0 },
    { month: "Jan '26", median: 1160000, dom: 90, listToSale: 98, sold: 13, pending: 0 },
    { month: "Feb '26", median:  950000, dom: 132, listToSale: 95, sold: 5, pending: 0 },
    { month: "Mar '26", median: 1080000, dom: 79, listToSale: 100, sold: 11, pending: 0 },
    { month: "Apr '26", median: 1157500, dom: 21, listToSale: 99, sold: 12, pending: 0 },
    { month: "May '26", median: 1260000, dom: 20, listToSale: 101, sold: 23, pending: 0 },
    { month: "Jun '26", median: 1229000, dom: 35, listToSale: 103, sold: 27, pending: 0 },
    { month: "Jul '26", median: 1137500, dom: 28, listToSale: 102, sold: 34, pending: 0 },
    { month: "Aug '26", median: 1197500, dom: 36, listToSale: 100, sold: 28, pending: 2 },
    { month: "Sep '26", median:  957500, dom: 41, listToSale: 99, sold: 14, pending: 14 },
  ],
  "Shrewsbury": [
    { month: "Oct '25", median:  656000, dom: 40, listToSale: 100, sold: 32, pending: 0 },
    { month: "Nov '25", median:  691500, dom: 46, listToSale: 98, sold: 22, pending: 0 },
    { month: "Dec '25", median:  625000, dom: 43, listToSale: 99, sold: 19, pending: 7 },
    { month: "Jan '26", median:  515000, dom: 65, listToSale: 98, sold: 18, pending: 4 },
    { month: "Feb '26", median:  637500, dom: 83, listToSale: 97, sold: 12, pending: 0 },
    { month: "Mar '26", median:  670000, dom: 60, listToSale: 100, sold: 13, pending: 1 },
    { month: "Apr '26", median:  665000, dom: 44, listToSale: 102, sold: 17, pending: 0 },
    { month: "May '26", median:  678375, dom: 33, listToSale: 101, sold: 37, pending: 4 },
    { month: "Jun '26", median:  731000, dom: 31, listToSale: 101, sold: 52, pending: 1 },
    { month: "Jul '26", median:  639950, dom: 34, listToSale: 99, sold: 48, pending: 1 },
    { month: "Aug '26", median:  635000, dom: 39, listToSale: 102, sold: 35, pending: 5 },
    { month: "Sep '26", median:  670000, dom: 37, listToSale: 101, sold: 35, pending: 23 },
  ],
  "Carlisle": [
    { month: "Oct '25", median:  955000, dom: 51, listToSale: 96, sold: 8, pending: 0 },
    { month: "Nov '25", median: 1289000, dom: 19, listToSale: 101, sold: 3, pending: 0 },
    { month: "Dec '25", median: 1200000, dom: 88, listToSale: 96, sold: 3, pending: 0 },
    { month: "Jan '26", median: 1235000, dom: 231, listToSale: 97, sold: 3, pending: 0 },
    { month: "Mar '26", median: 2131000, dom: 100, listToSale: 99, sold: 3, pending: 0 },
    { month: "Apr '26", median: 1460000, dom: 16, listToSale: 103, sold: 7, pending: 1 },
    { month: "May '26", median: 1581215, dom: 33, listToSale: 103, sold: 6, pending: 0 },
    { month: "Jun '26", median: 1497500, dom: 30, listToSale: 97, sold: 4, pending: 0 },
    { month: "Jul '26", median: 1250000, dom: 27, listToSale: 102, sold: 7, pending: 1 },
    { month: "Aug '26", median: 1325000, dom: 20, listToSale: 104, sold: 5, pending: 0 },
    { month: "Sep '26", median: 1080000, dom: 91, listToSale: 94, sold: 1, pending: 3 },
  ],
  "Stow": [
    { month: "Oct '25", median: 1064000, dom: 44, listToSale: 101, sold: 6, pending: 0 },
    { month: "Nov '25", median:  605000, dom: 27, listToSale: 97, sold: 3, pending: 0 },
    { month: "Dec '25", median:  652500, dom: 22, listToSale: 101, sold: 4, pending: 0 },
    { month: "Jan '26", median:  635000, dom: 22, listToSale: 99, sold: 3, pending: 0 },
    { month: "Feb '26", median:  640000, dom: 176, listToSale: 97, sold: 1, pending: 0 },
    { month: "Mar '26", median:  612500, dom: 60, listToSale: 104, sold: 4, pending: 0 },
    { month: "Apr '26", median:  890000, dom: 54, listToSale: 103, sold: 8, pending: 0 },
    { month: "May '26", median:  885000, dom: 36, listToSale: 101, sold: 11, pending: 0 },
    { month: "Jun '26", median:  980000, dom: 21, listToSale: 102, sold: 12, pending: 1 },
    { month: "Jul '26", median: 1085000, dom: 26, listToSale: 103, sold: 9, pending: 0 },
    { month: "Aug '26", median:  605000, dom: 37, listToSale: 101, sold: 6, pending: 0 },
    { month: "Sep '26", median:  724500, dom: 62, listToSale: 100, sold: 8, pending: 4 },
  ],
  "Boxborough": [
    { month: "Oct '25", median:  805000, dom: 30, listToSale: 103, sold: 4, pending: 0 },
    { month: "Nov '25", median:  777500, dom: 46, listToSale: 98, sold: 4, pending: 0 },
    { month: "Dec '25", median:  840000, dom: 26, listToSale: 95, sold: 3, pending: 0 },
    { month: "Jan '26", median:  750000, dom: 93, listToSale: 98, sold: 5, pending: 0 },
    { month: "Feb '26", median:  184000, dom: 54, listToSale: 96, sold: 4, pending: 0 },
    { month: "Mar '26", median:  190000, dom: 48, listToSale: 95, sold: 1, pending: 0 },
    { month: "Apr '26", median: 1075000, dom: 38, listToSale: 99, sold: 5, pending: 0 },
    { month: "May '26", median:  560000, dom: 17, listToSale: 102, sold: 10, pending: 0 },
    { month: "Jun '26", median:  572000, dom: 15, listToSale: 99, sold: 6, pending: 1 },
    { month: "Jul '26", median: 1080000, dom: 25, listToSale: 102, sold: 7, pending: 0 },
    { month: "Aug '26", median:  800000, dom: 41, listToSale: 101, sold: 7, pending: 1 },
    { month: "Sep '26", median: 1200000, dom: 46, listToSale: 99, sold: 7, pending: 5 },
  ],
  "Bolton": [
    { month: "Oct '25", median:  910000, dom: 49, listToSale: 99, sold: 9, pending: 0 },
    { month: "Nov '25", median:  787500, dom: 47, listToSale: 101, sold: 8, pending: 0 },
    { month: "Dec '25", median:  832500, dom: 96, listToSale: 98, sold: 8, pending: 0 },
    { month: "Jan '26", median:  706500, dom: 96, listToSale: 108, sold: 4, pending: 0 },
    { month: "Feb '26", median:  625000, dom: 398, listToSale: 99, sold: 7, pending: 0 },
    { month: "Mar '26", median:  730000, dom: 49, listToSale: 106, sold: 5, pending: 0 },
    { month: "Apr '26", median:  920000, dom: 14, listToSale: 108, sold: 3, pending: 0 },
    { month: "May '26", median:  820500, dom: 56, listToSale: 100, sold: 4, pending: 0 },
    { month: "Jun '26", median: 1055000, dom: 37, listToSale: 103, sold: 6, pending: 0 },
    { month: "Jul '26", median: 1035000, dom: 25, listToSale: 103, sold: 12, pending: 0 },
    { month: "Aug '26", median:  850000, dom: 30, listToSale: 106, sold: 9, pending: 1 },
    { month: "Sep '26", median:  811000, dom: 71, listToSale: 100, sold: 5, pending: 8 },
  ],
  "Harvard": [
    { month: "Oct '25", median:  900000, dom: 25, listToSale: 100, sold: 3, pending: 0 },
    { month: "Nov '25", median:  630000, dom: 31, listToSale: 98, sold: 8, pending: 0 },
    { month: "Dec '25", median:  780750, dom: 79, listToSale: 98, sold: 6, pending: 0 },
    { month: "Jan '26", median:  875000, dom: 50, listToSale: 100, sold: 2, pending: 0 },
    { month: "Mar '26", median:  726900, dom: 130, listToSale: 100, sold: 3, pending: 0 },
    { month: "Apr '26", median: 1094000, dom: 23, listToSale: 101, sold: 3, pending: 0 },
    { month: "May '26", median: 1080000, dom: 24, listToSale: 106, sold: 3, pending: 0 },
    { month: "Jun '26", median:  789000, dom: 85, listToSale: 99, sold: 10, pending: 0 },
    { month: "Jul '26", median:  837500, dom: 30, listToSale: 102, sold: 8, pending: 0 },
    { month: "Aug '26", median:  947500, dom: 77, listToSale: 98, sold: 8, pending: 1 },
    { month: "Sep '26", median: 1335000, dom: 80, listToSale: 97, sold: 7, pending: 1 },
  ],
  "Maynard": [
    { month: "Oct '25", median:  515000, dom: 21, listToSale: 104, sold: 9, pending: 0 },
    { month: "Nov '25", median:  650450, dom: 31, listToSale: 101, sold: 12, pending: 0 },
    { month: "Dec '25", median:  562500, dom: 26, listToSale: 101, sold: 12, pending: 0 },
    { month: "Jan '26", median:  519000, dom: 48, listToSale: 99, sold: 6, pending: 0 },
    { month: "Feb '26", median:  497000, dom: 52, listToSale: 100, sold: 9, pending: 0 },
    { month: "Mar '26", median:  500000, dom: 43, listToSale: 101, sold: 7, pending: 0 },
    { month: "Apr '26", median:  555000, dom: 40, listToSale: 105, sold: 5, pending: 0 },
    { month: "May '26", median:  550000, dom: 21, listToSale: 101, sold: 15, pending: 0 },
    { month: "Jun '26", median:  575000, dom: 32, listToSale: 102, sold: 10, pending: 0 },
    { month: "Jul '26", median:  691000, dom: 25, listToSale: 103, sold: 14, pending: 0 },
    { month: "Aug '26", median:  499950, dom: 42, listToSale: 101, sold: 10, pending: 1 },
    { month: "Sep '26", median:  575000, dom: 25, listToSale: 100, sold: 7, pending: 4 },
  ],
  "Littleton": [
    { month: "Oct '25", median:  775000, dom: 73, listToSale: 100, sold: 7, pending: 0 },
    { month: "Nov '25", median:  675000, dom: 90, listToSale: 99, sold: 7, pending: 0 },
    { month: "Dec '25", median:  835000, dom: 34, listToSale: 102, sold: 4, pending: 0 },
    { month: "Jan '26", median:  617000, dom: 44, listToSale: 99, sold: 6, pending: 0 },
    { month: "Feb '26", median:  751500, dom: 18, listToSale: 102, sold: 4, pending: 0 },
    { month: "Mar '26", median: 1275781, dom: 31, listToSale: 102, sold: 6, pending: 0 },
    { month: "Apr '26", median:  827000, dom: 26, listToSale: 102, sold: 6, pending: 0 },
    { month: "May '26", median:  951000, dom: 16, listToSale: 104, sold: 5, pending: 0 },
    { month: "Jun '26", median:  645000, dom: 24, listToSale: 104, sold: 13, pending: 1 },
    { month: "Jul '26", median:  851000, dom: 21, listToSale: 103, sold: 19, pending: 0 },
    { month: "Aug '26", median:  870000, dom: 29, listToSale: 101, sold: 12, pending: 0 },
    { month: "Sep '26", median:  890000, dom: 28, listToSale: 102, sold: 11, pending: 4 },
  ],
  "Groton": [
    { month: "Oct '25", median: 1064213, dom: 112, listToSale: 105, sold: 7, pending: 0 },
    { month: "Nov '25", median:  892500, dom: 41, listToSale: 101, sold: 10, pending: 0 },
    { month: "Dec '25", median:  730000, dom: 30, listToSale: 104, sold: 8, pending: 0 },
    { month: "Jan '26", median:  544950, dom: 70, listToSale: 98, sold: 8, pending: 0 },
    { month: "Feb '26", median:  919950, dom: 36, listToSale: 105, sold: 6, pending: 0 },
    { month: "Mar '26", median:  920000, dom: 72, listToSale: 99, sold: 11, pending: 0 },
    { month: "Apr '26", median:  840750, dom: 73, listToSale: 103, sold: 10, pending: 0 },
    { month: "May '26", median:  807500, dom: 39, listToSale: 105, sold: 12, pending: 0 },
    { month: "Jun '26", median:  925000, dom: 48, listToSale: 100, sold: 21, pending: 0 },
    { month: "Jul '26", median:  950000, dom: 40, listToSale: 101, sold: 19, pending: 1 },
    { month: "Aug '26", median:  805000, dom: 53, listToSale: 99, sold: 12, pending: 1 },
    { month: "Sep '26", median:  803777, dom: 27, listToSale: 102, sold: 11, pending: 6 },
  ],
  "Ayer": [
    { month: "Oct '25", median:  512000, dom: 54, listToSale: 99, sold: 9, pending: 0 },
    { month: "Nov '25", median:  520000, dom: 33, listToSale: 105, sold: 7, pending: 0 },
    { month: "Dec '25", median:  440000, dom: 34, listToSale: 99, sold: 8, pending: 0 },
    { month: "Jan '26", median:  697500, dom: 97, listToSale: 98, sold: 2, pending: 0 },
    { month: "Feb '26", median:  625000, dom: 24, listToSale: 102, sold: 3, pending: 0 },
    { month: "Mar '26", median:  737500, dom: 68, listToSale: 97, sold: 2, pending: 0 },
    { month: "Apr '26", median:  521340, dom: 32, listToSale: 101, sold: 11, pending: 0 },
    { month: "May '26", median:  550000, dom: 19, listToSale: 100, sold: 7, pending: 0 },
    { month: "Jun '26", median:  560000, dom: 22, listToSale: 105, sold: 17, pending: 0 },
    { month: "Jul '26", median:  590000, dom: 45, listToSale: 101, sold: 16, pending: 1 },
    { month: "Aug '26", median:  555000, dom: 31, listToSale: 100, sold: 6, pending: 0 },
    { month: "Sep '26", median:  336000, dom: 21, listToSale: 105, sold: 5, pending: 6 },
  ],
  "Billerica": [
    { month: "Oct '25", median:  720000, dom: 33, listToSale: 101, sold: 35, pending: 0 },
    { month: "Nov '25", median:  709500, dom: 43, listToSale: 99, sold: 20, pending: 0 },
    { month: "Dec '25", median:  647500, dom: 37, listToSale: 99, sold: 32, pending: 0 },
    { month: "Jan '26", median:  739900, dom: 61, listToSale: 99, sold: 18, pending: 0 },
    { month: "Feb '26", median:  603000, dom: 47, listToSale: 101, sold: 18, pending: 0 },
    { month: "Mar '26", median:  650000, dom: 43, listToSale: 101, sold: 19, pending: 0 },
    { month: "Apr '26", median:  690000, dom: 36, listToSale: 105, sold: 19, pending: 0 },
    { month: "May '26", median:  697000, dom: 46, listToSale: 104, sold: 33, pending: 0 },
    { month: "Jun '26", median:  680500, dom: 23, listToSale: 103, sold: 38, pending: 0 },
    { month: "Jul '26", median:  703500, dom: 31, listToSale: 104, sold: 40, pending: 2 },
    { month: "Aug '26", median:  720000, dom: 38, listToSale: 100, sold: 42, pending: 3 },
    { month: "Sep '26", median:  677500, dom: 35, listToSale: 101, sold: 28, pending: 25 },
  ],
  "Tewksbury": [
    { month: "Oct '25", median:  652500, dom: 25, listToSale: 103, sold: 24, pending: 0 },
    { month: "Nov '25", median:  645000, dom: 32, listToSale: 102, sold: 31, pending: 0 },
    { month: "Dec '25", median:  632500, dom: 26, listToSale: 101, sold: 27, pending: 0 },
    { month: "Jan '26", median:  660000, dom: 39, listToSale: 101, sold: 15, pending: 0 },
    { month: "Feb '26", median:  720000, dom: 57, listToSale: 101, sold: 10, pending: 0 },
    { month: "Mar '26", median:  666786, dom: 51, listToSale: 102, sold: 14, pending: 0 },
    { month: "Apr '26", median:  660000, dom: 37, listToSale: 102, sold: 27, pending: 0 },
    { month: "May '26", median:  750000, dom: 22, listToSale: 103, sold: 29, pending: 0 },
    { month: "Jun '26", median:  677000, dom: 31, listToSale: 103, sold: 38, pending: 0 },
    { month: "Jul '26", median:  662500, dom: 31, listToSale: 102, sold: 44, pending: 2 },
    { month: "Aug '26", median:  735000, dom: 39, listToSale: 102, sold: 32, pending: 2 },
    { month: "Sep '26", median:  616700, dom: 27, listToSale: 102, sold: 28, pending: 22 },
  ],
  "Wilmington": [
    { month: "Oct '25", median:  723500, dom: 29, listToSale: 101, sold: 12, pending: 0 },
    { month: "Nov '25", median:  627500, dom: 22, listToSale: 103, sold: 13, pending: 0 },
    { month: "Dec '25", median:  787500, dom: 36, listToSale: 100, sold: 19, pending: 0 },
    { month: "Jan '26", median:  723000, dom: 27, listToSale: 101, sold: 11, pending: 0 },
    { month: "Feb '26", median:  700000, dom: 37, listToSale: 99, sold: 4, pending: 0 },
    { month: "Mar '26", median:  795000, dom: 64, listToSale: 104, sold: 7, pending: 0 },
    { month: "Apr '26", median:  730000, dom: 40, listToSale: 103, sold: 12, pending: 0 },
    { month: "May '26", median:  730000, dom: 17, listToSale: 105, sold: 17, pending: 0 },
    { month: "Jun '26", median:  813500, dom: 21, listToSale: 104, sold: 28, pending: 0 },
    { month: "Jul '26", median:  763000, dom: 28, listToSale: 105, sold: 38, pending: 0 },
    { month: "Aug '26", median:  730000, dom: 35, listToSale: 100, sold: 19, pending: 6 },
    { month: "Sep '26", median:  775000, dom: 26, listToSale: 103, sold: 15, pending: 12 },
  ],
  "Stoneham": [
    { month: "Oct '25", median:  798000, dom: 22, listToSale: 102, sold: 22, pending: 0 },
    { month: "Nov '25", median:  733000, dom: 19, listToSale: 102, sold: 21, pending: 0 },
    { month: "Dec '25", median:  772500, dom: 24, listToSale: 100, sold: 22, pending: 0 },
    { month: "Jan '26", median:  515000, dom: 45, listToSale: 99, sold: 7, pending: 0 },
    { month: "Feb '26", median:  675000, dom: 35, listToSale: 103, sold: 14, pending: 0 },
    { month: "Mar '26", median:  573500, dom: 34, listToSale: 104, sold: 12, pending: 0 },
    { month: "Apr '26", median:  729000, dom: 24, listToSale: 103, sold: 13, pending: 0 },
    { month: "May '26", median:  817500, dom: 33, listToSale: 104, sold: 22, pending: 0 },
    { month: "Jun '26", median:  752000, dom: 24, listToSale: 102, sold: 37, pending: 0 },
    { month: "Jul '26", median:  790000, dom: 23, listToSale: 105, sold: 26, pending: 1 },
    { month: "Aug '26", median:  825000, dom: 31, listToSale: 101, sold: 19, pending: 0 },
    { month: "Sep '26", median:  875000, dom: 33, listToSale: 101, sold: 25, pending: 15 },
  ],
  "Melrose": [
    { month: "Oct '25", median:  877500, dom: 20, listToSale: 105, sold: 20, pending: 0 },
    { month: "Nov '25", median:  842500, dom: 28, listToSale: 101, sold: 16, pending: 1 },
    { month: "Dec '25", median:  797500, dom: 24, listToSale: 103, sold: 22, pending: 0 },
    { month: "Jan '26", median:  925000, dom: 28, listToSale: 103, sold: 13, pending: 0 },
    { month: "Feb '26", median:  823000, dom: 44, listToSale: 100, sold: 19, pending: 0 },
    { month: "Mar '26", median:  890000, dom: 15, listToSale: 104, sold: 19, pending: 0 },
    { month: "Apr '26", median:  930000, dom: 24, listToSale: 112, sold: 15, pending: 0 },
    { month: "May '26", median:  891500, dom: 19, listToSale: 108, sold: 26, pending: 0 },
    { month: "Jun '26", median:  975000, dom: 23, listToSale: 108, sold: 32, pending: 1 },
    { month: "Jul '26", median:  995000, dom: 25, listToSale: 106, sold: 37, pending: 1 },
    { month: "Aug '26", median:  855000, dom: 22, listToSale: 106, sold: 21, pending: 0 },
    { month: "Sep '26", median:  870000, dom: 41, listToSale: 103, sold: 24, pending: 24 },
  ],
  "Wakefield": [
    { month: "Oct '25", median:  810000, dom: 39, listToSale: 102, sold: 31, pending: 0 },
    { month: "Nov '25", median:  700000, dom: 25, listToSale: 102, sold: 23, pending: 0 },
    { month: "Dec '25", median:  777500, dom: 38, listToSale: 101, sold: 40, pending: 0 },
    { month: "Jan '26", median:  870000, dom: 64, listToSale: 100, sold: 17, pending: 0 },
    { month: "Feb '26", median:  785000, dom: 40, listToSale: 103, sold: 7, pending: 0 },
    { month: "Mar '26", median:  810500, dom: 59, listToSale: 99, sold: 12, pending: 0 },
    { month: "Apr '26", median:  825000, dom: 27, listToSale: 104, sold: 21, pending: 0 },
    { month: "May '26", median:  820000, dom: 48, listToSale: 105, sold: 17, pending: 0 },
    { month: "Jun '26", median:  801000, dom: 31, listToSale: 105, sold: 29, pending: 0 },
    { month: "Jul '26", median:  695000, dom: 25, listToSale: 103, sold: 22, pending: 0 },
    { month: "Aug '26", median:  792500, dom: 33, listToSale: 103, sold: 26, pending: 1 },
    { month: "Sep '26", median:  810000, dom: 38, listToSale: 101, sold: 22, pending: 20 },
  ],
  "Reading": [
    { month: "Oct '25", median:  852500, dom: 26, listToSale: 103, sold: 27, pending: 0 },
    { month: "Nov '25", median:  815000, dom: 52, listToSale: 101, sold: 17, pending: 0 },
    { month: "Dec '25", median:  675000, dom: 41, listToSale: 100, sold: 19, pending: 0 },
    { month: "Jan '26", median:  765000, dom: 33, listToSale: 100, sold: 9, pending: 0 },
    { month: "Feb '26", median:  857500, dom: 45, listToSale: 103, sold: 8, pending: 0 },
    { month: "Mar '26", median:  987500, dom: 18, listToSale: 104, sold: 14, pending: 0 },
    { month: "Apr '26", median:  881000, dom: 31, listToSale: 104, sold: 18, pending: 0 },
    { month: "May '26", median:  962750, dom: 16, listToSale: 108, sold: 32, pending: 1 },
    { month: "Jun '26", median:  830000, dom: 33, listToSale: 105, sold: 39, pending: 0 },
    { month: "Jul '26", median:  990000, dom: 30, listToSale: 103, sold: 45, pending: 1 },
    { month: "Aug '26", median:  937500, dom: 35, listToSale: 104, sold: 19, pending: 0 },
    { month: "Sep '26", median:  860000, dom: 32, listToSale: 100, sold: 15, pending: 16 },
  ],
  "North Reading": [
    { month: "Oct '25", median:  740150, dom: 31, listToSale: 102, sold: 14, pending: 0 },
    { month: "Nov '25", median:  806180, dom: 24, listToSale: 101, sold: 15, pending: 0 },
    { month: "Dec '25", median:  747250, dom: 28, listToSale: 101, sold: 30, pending: 0 },
    { month: "Jan '26", median:  585200, dom: 33, listToSale: 101, sold: 12, pending: 0 },
    { month: "Feb '26", median:  757500, dom: 100, listToSale: 100, sold: 2, pending: 0 },
    { month: "Mar '26", median:  749000, dom: 59, listToSale: 102, sold: 11, pending: 0 },
    { month: "Apr '26", median:  665000, dom: 48, listToSale: 99, sold: 13, pending: 1 },
    { month: "May '26", median:  730000, dom: 25, listToSale: 104, sold: 17, pending: 0 },
    { month: "Jun '26", median:  777498, dom: 55, listToSale: 100, sold: 24, pending: 0 },
    { month: "Jul '26", median:  869995, dom: 20, listToSale: 102, sold: 31, pending: 1 },
    { month: "Aug '26", median: 1348000, dom: 32, listToSale: 102, sold: 26, pending: 1 },
    { month: "Sep '26", median:  732500, dom: 39, listToSale: 99, sold: 23, pending: 15 },
  ],
  "Lynnfield": [
    { month: "Oct '25", median: 1035000, dom: 32, listToSale: 102, sold: 19, pending: 0 },
    { month: "Nov '25", median:  935000, dom: 42, listToSale: 99, sold: 9, pending: 0 },
    { month: "Dec '25", median:  880000, dom: 51, listToSale: 99, sold: 13, pending: 0 },
    { month: "Jan '26", median:  770000, dom: 24, listToSale: 100, sold: 5, pending: 0 },
    { month: "Feb '26", median: 1387500, dom: 74, listToSale: 95, sold: 6, pending: 0 },
    { month: "Mar '26", median:  650000, dom: 26, listToSale: 98, sold: 5, pending: 0 },
    { month: "Apr '26", median: 1102500, dom: 19, listToSale: 105, sold: 4, pending: 1 },
    { month: "May '26", median: 1160000, dom: 21, listToSale: 98, sold: 11, pending: 1 },
    { month: "Jun '26", median: 1046250, dom: 25, listToSale: 103, sold: 22, pending: 0 },
    { month: "Jul '26", median: 1249000, dom: 31, listToSale: 103, sold: 21, pending: 3 },
    { month: "Aug '26", median: 1001250, dom: 32, listToSale: 100, sold: 10, pending: 2 },
    { month: "Sep '26", median: 1353500, dom: 33, listToSale: 104, sold: 10, pending: 16 },
  ],
  "Andover": [
    { month: "Oct '25", median: 1175000, dom: 37, listToSale: 104, sold: 33, pending: 0 },
    { month: "Nov '25", median:  869500, dom: 43, listToSale: 102, sold: 20, pending: 0 },
    { month: "Dec '25", median:  965500, dom: 50, listToSale: 103, sold: 36, pending: 0 },
    { month: "Jan '26", median:  700000, dom: 45, listToSale: 101, sold: 13, pending: 0 },
    { month: "Feb '26", median:  950000, dom: 55, listToSale: 102, sold: 13, pending: 0 },
    { month: "Mar '26", median:  883000, dom: 34, listToSale: 105, sold: 12, pending: 1 },
    { month: "Apr '26", median: 1010000, dom: 23, listToSale: 106, sold: 13, pending: 0 },
    { month: "May '26", median: 1070000, dom: 35, listToSale: 102, sold: 40, pending: 0 },
    { month: "Jun '26", median: 1225000, dom: 35, listToSale: 104, sold: 51, pending: 0 },
    { month: "Jul '26", median: 1009900, dom: 34, listToSale: 103, sold: 53, pending: 0 },
    { month: "Aug '26", median:  980000, dom: 38, listToSale: 101, sold: 35, pending: 1 },
    { month: "Sep '26", median:  932500, dom: 34, listToSale: 100, sold: 44, pending: 30 },
  ],
  "North Andover": [
    { month: "Oct '25", median:  550000, dom: 34, listToSale: 100, sold: 33, pending: 0 },
    { month: "Nov '25", median:  570000, dom: 48, listToSale: 101, sold: 28, pending: 0 },
    { month: "Dec '25", median:  590000, dom: 43, listToSale: 100, sold: 27, pending: 0 },
    { month: "Jan '26", median:  660000, dom: 36, listToSale: 100, sold: 11, pending: 0 },
    { month: "Feb '26", median:  420000, dom: 59, listToSale: 101, sold: 13, pending: 0 },
    { month: "Mar '26", median:  570000, dom: 83, listToSale: 97, sold: 22, pending: 0 },
    { month: "Apr '26", median:  855000, dom: 37, listToSale: 107, sold: 18, pending: 0 },
    { month: "May '26", median:  882500, dom: 28, listToSale: 104, sold: 28, pending: 0 },
    { month: "Jun '26", median:  670000, dom: 34, listToSale: 103, sold: 43, pending: 1 },
    { month: "Jul '26", median:  860000, dom: 20, listToSale: 105, sold: 26, pending: 0 },
    { month: "Aug '26", median:  813889, dom: 30, listToSale: 103, sold: 28, pending: 2 },
    { month: "Sep '26", median:  675000, dom: 50, listToSale: 100, sold: 29, pending: 21 },
  ],
  "Ashland": [
    { month: "Oct '25", median:  735000, dom: 26, listToSale: 100, sold: 19, pending: 0 },
    { month: "Nov '25", median:  610000, dom: 41, listToSale: 99, sold: 13, pending: 0 },
    { month: "Dec '25", median:  630000, dom: 31, listToSale: 98, sold: 9, pending: 0 },
    { month: "Jan '26", median:  519000, dom: 56, listToSale: 99, sold: 8, pending: 0 },
    { month: "Feb '26", median:  617500, dom: 54, listToSale: 101, sold: 12, pending: 0 },
    { month: "Mar '26", median:  607000, dom: 60, listToSale: 99, sold: 10, pending: 0 },
    { month: "Apr '26", median:  553900, dom: 48, listToSale: 102, sold: 11, pending: 0 },
    { month: "May '26", median:  580000, dom: 19, listToSale: 103, sold: 23, pending: 0 },
    { month: "Jun '26", median:  762500, dom: 18, listToSale: 104, sold: 20, pending: 0 },
    { month: "Jul '26", median:  661000, dom: 22, listToSale: 102, sold: 30, pending: 0 },
    { month: "Aug '26", median:  667500, dom: 38, listToSale: 98, sold: 8, pending: 3 },
    { month: "Sep '26", median:  669500, dom: 21, listToSale: 102, sold: 22, pending: 16 },
  ],
  "Sherborn": [
    { month: "Oct '25", median:  927500, dom: 29, listToSale: 99, sold: 5, pending: 0 },
    { month: "Nov '25", median: 1400000, dom: 74, listToSale: 100, sold: 5, pending: 0 },
    { month: "Dec '25", median: 1185000, dom: 36, listToSale: 100, sold: 6, pending: 0 },
    { month: "Jan '26", median: 1031500, dom: 75, listToSale: 96, sold: 1, pending: 0 },
    { month: "Feb '26", median: 1072500, dom: 134, listToSale: 92, sold: 2, pending: 0 },
    { month: "Mar '26", median:  925000, dom: 50, listToSale: 100, sold: 3, pending: 0 },
    { month: "Apr '26", median: 1143750, dom: 67, listToSale: 97, sold: 4, pending: 0 },
    { month: "May '26", median: 1192500, dom: 7, listToSale: 101, sold: 6, pending: 0 },
    { month: "Jun '26", median: 1392000, dom: 22, listToSale: 102, sold: 11, pending: 0 },
    { month: "Jul '26", median: 1297750, dom: 19, listToSale: 103, sold: 10, pending: 1 },
    { month: "Aug '26", median: 2061320, dom: 53, listToSale: 103, sold: 8, pending: 3 },
    { month: "Sep '26", median:  800000, dom: 94, listToSale: 94, sold: 3, pending: 1 },
  ],
  "Holliston": [
    { month: "Oct '25", median:  650000, dom: 67, listToSale: 100, sold: 7, pending: 0 },
    { month: "Nov '25", median:  687500, dom: 24, listToSale: 101, sold: 14, pending: 0 },
    { month: "Dec '25", median:  626250, dom: 40, listToSale: 99, sold: 18, pending: 0 },
    { month: "Jan '26", median:  743800, dom: 29, listToSale: 101, sold: 7, pending: 0 },
    { month: "Feb '26", median:  642500, dom: 113, listToSale: 98, sold: 7, pending: 0 },
    { month: "Mar '26", median:  730000, dom: 27, listToSale: 103, sold: 9, pending: 0 },
    { month: "Apr '26", median:  700000, dom: 22, listToSale: 100, sold: 15, pending: 0 },
    { month: "May '26", median:  729000, dom: 23, listToSale: 104, sold: 15, pending: 0 },
    { month: "Jun '26", median:  710000, dom: 21, listToSale: 103, sold: 15, pending: 0 },
    { month: "Jul '26", median:  820000, dom: 31, listToSale: 101, sold: 29, pending: 0 },
    { month: "Aug '26", median:  730000, dom: 22, listToSale: 101, sold: 15, pending: 2 },
    { month: "Sep '26", median:  967500, dom: 34, listToSale: 97, sold: 10, pending: 13 },
  ],
  "Medway": [
    { month: "Oct '25", median:  629500, dom: 51, listToSale: 98, sold: 14, pending: 0 },
    { month: "Nov '25", median:  527500, dom: 35, listToSale: 99, sold: 4, pending: 0 },
    { month: "Dec '25", median:  550000, dom: 39, listToSale: 99, sold: 11, pending: 0 },
    { month: "Jan '26", median:  912500, dom: 65, listToSale: 100, sold: 6, pending: 0 },
    { month: "Feb '26", median:  580000, dom: 30, listToSale: 99, sold: 9, pending: 0 },
    { month: "Mar '26", median:  612500, dom: 40, listToSale: 100, sold: 11, pending: 0 },
    { month: "Apr '26", median:  727500, dom: 26, listToSale: 104, sold: 11, pending: 0 },
    { month: "May '26", median:  612500, dom: 45, listToSale: 101, sold: 15, pending: 0 },
    { month: "Jun '26", median:  715000, dom: 27, listToSale: 102, sold: 21, pending: 0 },
    { month: "Jul '26", median:  715500, dom: 28, listToSale: 104, sold: 14, pending: 0 },
    { month: "Aug '26", median:  797500, dom: 30, listToSale: 101, sold: 20, pending: 3 },
    { month: "Sep '26", median:  720000, dom: 50, listToSale: 99, sold: 11, pending: 4 },
  ],
  "Millis": [
    { month: "Oct '25", median:  804000, dom: 55, listToSale: 99, sold: 13, pending: 0 },
    { month: "Nov '25", median:  727500, dom: 32, listToSale: 100, sold: 6, pending: 0 },
    { month: "Dec '25", median:  710000, dom: 45, listToSale: 98, sold: 11, pending: 0 },
    { month: "Jan '26", median:  770000, dom: 70, listToSale: 98, sold: 6, pending: 0 },
    { month: "Feb '26", median:  702500, dom: 61, listToSale: 102, sold: 4, pending: 0 },
    { month: "Mar '26", median:  620000, dom: 85, listToSale: 100, sold: 7, pending: 0 },
    { month: "Apr '26", median:  725000, dom: 45, listToSale: 104, sold: 7, pending: 0 },
    { month: "May '26", median:  699000, dom: 30, listToSale: 103, sold: 11, pending: 0 },
    { month: "Jun '26", median: 1100000, dom: 59, listToSale: 102, sold: 11, pending: 0 },
    { month: "Jul '26", median:  739500, dom: 41, listToSale: 101, sold: 10, pending: 2 },
    { month: "Aug '26", median:  885000, dom: 40, listToSale: 100, sold: 9, pending: 1 },
    { month: "Sep '26", median:  532500, dom: 47, listToSale: 99, sold: 8, pending: 5 },
  ],
  "Milford": [
    { month: "Oct '25", median:  560950, dom: 33, listToSale: 100, sold: 32, pending: 0 },
    { month: "Nov '25", median:  487500, dom: 31, listToSale: 100, sold: 21, pending: 1 },
    { month: "Dec '25", median:  535000, dom: 56, listToSale: 99, sold: 19, pending: 0 },
    { month: "Jan '26", median:  590000, dom: 39, listToSale: 100, sold: 11, pending: 0 },
    { month: "Feb '26", median:  521000, dom: 32, listToSale: 100, sold: 16, pending: 0 },
    { month: "Mar '26", median:  454900, dom: 56, listToSale: 101, sold: 17, pending: 0 },
    { month: "Apr '26", median:  556000, dom: 38, listToSale: 103, sold: 18, pending: 0 },
    { month: "May '26", median:  545000, dom: 23, listToSale: 101, sold: 30, pending: 0 },
    { month: "Jun '26", median:  570000, dom: 30, listToSale: 102, sold: 37, pending: 1 },
    { month: "Jul '26", median:  580000, dom: 27, listToSale: 101, sold: 35, pending: 0 },
    { month: "Aug '26", median:  580000, dom: 32, listToSale: 101, sold: 25, pending: 2 },
    { month: "Sep '26", median:  570000, dom: 44, listToSale: 100, sold: 29, pending: 13 },
  ],
  "Hudson": [
    { month: "Oct '25", median:  635000, dom: 41, listToSale: 100, sold: 25, pending: 0 },
    { month: "Nov '25", median:  575000, dom: 30, listToSale: 101, sold: 17, pending: 0 },
    { month: "Dec '25", median:  602500, dom: 58, listToSale: 101, sold: 17, pending: 0 },
    { month: "Jan '26", median:  569000, dom: 24, listToSale: 98, sold: 9, pending: 0 },
    { month: "Feb '26", median:  512450, dom: 54, listToSale: 100, sold: 10, pending: 0 },
    { month: "Mar '26", median:  599900, dom: 80, listToSale: 101, sold: 11, pending: 0 },
    { month: "Apr '26", median:  459900, dom: 38, listToSale: 102, sold: 19, pending: 0 },
    { month: "May '26", median:  665000, dom: 54, listToSale: 101, sold: 21, pending: 0 },
    { month: "Jun '26", median:  675000, dom: 44, listToSale: 103, sold: 23, pending: 0 },
    { month: "Jul '26", median:  710000, dom: 37, listToSale: 103, sold: 35, pending: 0 },
    { month: "Aug '26", median:  642500, dom: 37, listToSale: 101, sold: 10, pending: 1 },
    { month: "Sep '26", median:  599950, dom: 31, listToSale: 101, sold: 14, pending: 11 },
  ],
  "Marlborough": [
    { month: "Oct '25", median:  505000, dom: 34, listToSale: 100, sold: 29, pending: 0 },
    { month: "Nov '25", median:  605000, dom: 40, listToSale: 100, sold: 25, pending: 0 },
    { month: "Dec '25", median:  565000, dom: 32, listToSale: 100, sold: 27, pending: 0 },
    { month: "Jan '26", median:  538500, dom: 51, listToSale: 99, sold: 20, pending: 0 },
    { month: "Feb '26", median:  557500, dom: 79, listToSale: 97, sold: 20, pending: 0 },
    { month: "Mar '26", median:  637500, dom: 36, listToSale: 99, sold: 10, pending: 0 },
    { month: "Apr '26", median:  497000, dom: 43, listToSale: 100, sold: 19, pending: 0 },
    { month: "May '26", median:  570000, dom: 39, listToSale: 102, sold: 37, pending: 0 },
    { month: "Jun '26", median:  575000, dom: 40, listToSale: 100, sold: 33, pending: 0 },
    { month: "Jul '26", median:  700000, dom: 32, listToSale: 101, sold: 27, pending: 0 },
    { month: "Aug '26", median:  560000, dom: 33, listToSale: 100, sold: 27, pending: 4 },
    { month: "Sep '26", median:  612500, dom: 51, listToSale: 99, sold: 27, pending: 20 },
  ],
  "Southborough": [
    { month: "Oct '25", median:  726944, dom: 28, listToSale: 100, sold: 4, pending: 0 },
    { month: "Nov '25", median: 1130000, dom: 37, listToSale: 106, sold: 4, pending: 0 },
    { month: "Dec '25", median:  552500, dom: 35, listToSale: 99, sold: 10, pending: 0 },
    { month: "Jan '26", median:  955000, dom: 62, listToSale: 99, sold: 6, pending: 0 },
    { month: "Feb '26", median:  790000, dom: 102, listToSale: 98, sold: 5, pending: 1 },
    { month: "Apr '26", median:  795000, dom: 30, listToSale: 103, sold: 11, pending: 0 },
    { month: "May '26", median:  937000, dom: 60, listToSale: 102, sold: 7, pending: 0 },
    { month: "Jun '26", median:  985000, dom: 24, listToSale: 102, sold: 9, pending: 1 },
    { month: "Jul '26", median:  852450, dom: 39, listToSale: 98, sold: 12, pending: 0 },
    { month: "Aug '26", median:  960000, dom: 31, listToSale: 100, sold: 15, pending: 3 },
    { month: "Sep '26", median:  940000, dom: 46, listToSale: 97, sold: 7, pending: 4 },
  ],
  "Westborough": [
    { month: "Oct '25", median:  607500, dom: 27, listToSale: 101, sold: 18, pending: 0 },
    { month: "Nov '25", median:  565000, dom: 26, listToSale: 100, sold: 29, pending: 0 },
    { month: "Dec '25", median:  550000, dom: 50, listToSale: 100, sold: 29, pending: 0 },
    { month: "Jan '26", median:  627500, dom: 65, listToSale: 99, sold: 12, pending: 0 },
    { month: "Feb '26", median:  680000, dom: 104, listToSale: 100, sold: 11, pending: 0 },
    { month: "Mar '26", median:  697000, dom: 49, listToSale: 100, sold: 12, pending: 0 },
    { month: "Apr '26", median:  650000, dom: 41, listToSale: 102, sold: 11, pending: 0 },
    { month: "May '26", median:  787000, dom: 41, listToSale: 101, sold: 15, pending: 1 },
    { month: "Jun '26", median:  701995, dom: 27, listToSale: 101, sold: 33, pending: 0 },
    { month: "Jul '26", median:  574000, dom: 39, listToSale: 100, sold: 32, pending: 2 },
    { month: "Aug '26", median:  719995, dom: 89, listToSale: 98, sold: 19, pending: 6 },
    { month: "Sep '26", median:  607450, dom: 55, listToSale: 98, sold: 16, pending: 9 },
  ],
  "Northborough": [
    { month: "Oct '25", median:  940000, dom: 101, listToSale: 98, sold: 13, pending: 0 },
    { month: "Nov '25", median:  657500, dom: 32, listToSale: 102, sold: 10, pending: 0 },
    { month: "Dec '25", median:  585000, dom: 49, listToSale: 99, sold: 14, pending: 0 },
    { month: "Jan '26", median:  680000, dom: 51, listToSale: 99, sold: 9, pending: 0 },
    { month: "Feb '26", median:  572500, dom: 97, listToSale: 98, sold: 8, pending: 0 },
    { month: "Mar '26", median:  835000, dom: 63, listToSale: 102, sold: 11, pending: 0 },
    { month: "Apr '26", median:  656000, dom: 20, listToSale: 102, sold: 9, pending: 2 },
    { month: "May '26", median:  705000, dom: 27, listToSale: 101, sold: 12, pending: 0 },
    { month: "Jun '26", median:  784000, dom: 35, listToSale: 101, sold: 18, pending: 0 },
    { month: "Jul '26", median:  725000, dom: 28, listToSale: 102, sold: 23, pending: 1 },
    { month: "Aug '26", median:  725000, dom: 32, listToSale: 100, sold: 29, pending: 2 },
    { month: "Sep '26", median:  750000, dom: 73, listToSale: 96, sold: 13, pending: 8 },
  ],
  "Dover": [
    { month: "Oct '25", median: 1925000, dom: 96, listToSale: 94, sold: 6, pending: 0 },
    { month: "Nov '25", median: 1380000, dom: 25, listToSale: 97, sold: 3, pending: 0 },
    { month: "Dec '25", median: 1750000, dom: 79, listToSale: 95, sold: 7, pending: 0 },
    { month: "Jan '26", median: 2652500, dom: 117, listToSale: 95, sold: 6, pending: 0 },
    { month: "Feb '26", median: 2050000, dom: 84, listToSale: 98, sold: 3, pending: 0 },
    { month: "Mar '26", median: 4027500, dom: 124, listToSale: 94, sold: 2, pending: 0 },
    { month: "Apr '26", median: 2112500, dom: 71, listToSale: 98, sold: 8, pending: 0 },
    { month: "May '26", median: 2125000, dom: 16, listToSale: 100, sold: 9, pending: 0 },
    { month: "Jun '26", median: 1525000, dom: 74, listToSale: 95, sold: 5, pending: 0 },
    { month: "Jul '26", median: 2000000, dom: 59, listToSale: 98, sold: 12, pending: 0 },
    { month: "Aug '26", median: 2150000, dom: 71, listToSale: 96, sold: 3, pending: 1 },
    { month: "Sep '26", median: 1782500, dom: 59, listToSale: 98, sold: 6, pending: 3 },
  ],
  "Medfield": [
    { month: "Oct '25", median: 1109250, dom: 67, listToSale: 99, sold: 8, pending: 0 },
    { month: "Nov '25", median:  932000, dom: 30, listToSale: 98, sold: 4, pending: 0 },
    { month: "Dec '25", median:  962500, dom: 35, listToSale: 102, sold: 8, pending: 0 },
    { month: "Jan '26", median: 1010000, dom: 45, listToSale: 100, sold: 8, pending: 0 },
    { month: "Feb '26", median: 1125000, dom: 54, listToSale: 100, sold: 5, pending: 0 },
    { month: "Mar '26", median: 1253000, dom: 39, listToSale: 103, sold: 8, pending: 0 },
    { month: "Apr '26", median: 1100000, dom: 19, listToSale: 103, sold: 15, pending: 0 },
    { month: "May '26", median: 1010000, dom: 25, listToSale: 102, sold: 11, pending: 0 },
    { month: "Jun '26", median: 1162500, dom: 19, listToSale: 104, sold: 26, pending: 0 },
    { month: "Jul '26", median: 1216000, dom: 24, listToSale: 102, sold: 22, pending: 0 },
    { month: "Aug '26", median: 1215000, dom: 39, listToSale: 101, sold: 12, pending: 1 },
    { month: "Sep '26", median: 1085000, dom: 44, listToSale: 100, sold: 4, pending: 5 },
  ],
  "Sharon": [
    { month: "Oct '25", median:  967000, dom: 65, listToSale: 101, sold: 12, pending: 0 },
    { month: "Nov '25", median:  677800, dom: 61, listToSale: 98, sold: 12, pending: 0 },
    { month: "Dec '25", median:  726000, dom: 38, listToSale: 100, sold: 22, pending: 1 },
    { month: "Jan '26", median:  681500, dom: 29, listToSale: 100, sold: 6, pending: 1 },
    { month: "Feb '26", median:  785000, dom: 105, listToSale: 99, sold: 5, pending: 0 },
    { month: "Mar '26", median:  887000, dom: 47, listToSale: 102, sold: 7, pending: 2 },
    { month: "Apr '26", median: 1115000, dom: 31, listToSale: 101, sold: 13, pending: 0 },
    { month: "May '26", median:  725000, dom: 31, listToSale: 101, sold: 17, pending: 0 },
    { month: "Jun '26", median:  828500, dom: 22, listToSale: 101, sold: 20, pending: 0 },
    { month: "Jul '26", median: 1025000, dom: 38, listToSale: 100, sold: 25, pending: 0 },
    { month: "Aug '26", median:  921000, dom: 27, listToSale: 100, sold: 22, pending: 3 },
    { month: "Sep '26", median: 1002000, dom: 42, listToSale: 99, sold: 17, pending: 12 },
  ],
  "Stoughton": [
    { month: "Oct '25", median:  565000, dom: 35, listToSale: 100, sold: 30, pending: 0 },
    { month: "Nov '25", median:  500000, dom: 36, listToSale: 100, sold: 23, pending: 0 },
    { month: "Dec '25", median:  510000, dom: 45, listToSale: 99, sold: 27, pending: 0 },
    { month: "Jan '26", median:  540000, dom: 44, listToSale: 99, sold: 18, pending: 0 },
    { month: "Feb '26", median:  610000, dom: 31, listToSale: 101, sold: 13, pending: 0 },
    { month: "Mar '26", median:  524500, dom: 32, listToSale: 102, sold: 10, pending: 0 },
    { month: "Apr '26", median:  510000, dom: 31, listToSale: 102, sold: 25, pending: 0 },
    { month: "May '26", median:  477500, dom: 40, listToSale: 102, sold: 24, pending: 0 },
    { month: "Jun '26", median:  565000, dom: 23, listToSale: 104, sold: 26, pending: 0 },
    { month: "Jul '26", median:  592500, dom: 37, listToSale: 102, sold: 36, pending: 0 },
    { month: "Aug '26", median:  551000, dom: 24, listToSale: 102, sold: 28, pending: 1 },
    { month: "Sep '26", median:  607500, dom: 29, listToSale: 99, sold: 30, pending: 8 },
  ],
  "Norwood": [
    { month: "Oct '25", median:  628200, dom: 24, listToSale: 101, sold: 10, pending: 0 },
    { month: "Nov '25", median:  686400, dom: 45, listToSale: 100, sold: 17, pending: 0 },
    { month: "Dec '25", median:  715000, dom: 42, listToSale: 99, sold: 17, pending: 0 },
    { month: "Jan '26", median:  697250, dom: 36, listToSale: 104, sold: 14, pending: 0 },
    { month: "Feb '26", median:  630000, dom: 29, listToSale: 101, sold: 12, pending: 0 },
    { month: "Mar '26", median:  673500, dom: 35, listToSale: 104, sold: 16, pending: 1 },
    { month: "Apr '26", median:  770000, dom: 29, listToSale: 104, sold: 9, pending: 0 },
    { month: "May '26", median:  777500, dom: 24, listToSale: 104, sold: 18, pending: 0 },
    { month: "Jun '26", median:  750000, dom: 22, listToSale: 107, sold: 19, pending: 0 },
    { month: "Jul '26", median:  625000, dom: 26, listToSale: 102, sold: 23, pending: 0 },
    { month: "Aug '26", median:  777500, dom: 38, listToSale: 103, sold: 20, pending: 2 },
    { month: "Sep '26", median:  675000, dom: 35, listToSale: 99, sold: 20, pending: 13 },
  ],
  "Braintree": [
    { month: "Oct '25", median:  625000, dom: 24, listToSale: 100, sold: 31, pending: 0 },
    { month: "Nov '25", median:  730000, dom: 41, listToSale: 100, sold: 25, pending: 0 },
    { month: "Dec '25", median:  655000, dom: 43, listToSale: 100, sold: 39, pending: 0 },
    { month: "Jan '26", median:  660000, dom: 35, listToSale: 99, sold: 14, pending: 0 },
    { month: "Feb '26", median:  650000, dom: 36, listToSale: 100, sold: 11, pending: 0 },
    { month: "Mar '26", median:  672000, dom: 56, listToSale: 98, sold: 19, pending: 0 },
    { month: "Apr '26", median:  660000, dom: 30, listToSale: 101, sold: 17, pending: 0 },
    { month: "May '26", median:  750000, dom: 19, listToSale: 103, sold: 29, pending: 0 },
    { month: "Jun '26", median:  700000, dom: 25, listToSale: 102, sold: 43, pending: 0 },
    { month: "Jul '26", median:  755000, dom: 33, listToSale: 102, sold: 33, pending: 0 },
    { month: "Aug '26", median:  705000, dom: 31, listToSale: 101, sold: 27, pending: 5 },
    { month: "Sep '26", median:  745000, dom: 37, listToSale: 101, sold: 29, pending: 31 },
  ],
  "Lincoln": [
    { month: "Oct '25", median: 1595000, dom: 34, listToSale: 100, sold: 5, pending: 0 },
    { month: "Nov '25", median: 1456000, dom: 63, listToSale: 100, sold: 7, pending: 0 },
    { month: "Dec '25", median: 1025000, dom: 59, listToSale: 99, sold: 6, pending: 0 },
    { month: "Jan '26", median: 1049500, dom: 157, listToSale: 103, sold: 4, pending: 0 },
    { month: "Feb '26", median: 2350000, dom: 39, listToSale: 100, sold: 3, pending: 0 },
    { month: "Mar '26", median:  772500, dom: 44, listToSale: 101, sold: 4, pending: 0 },
    { month: "Apr '26", median: 1131250, dom: 85, listToSale: 101, sold: 4, pending: 1 },
    { month: "May '26", median:  885000, dom: 79, listToSale: 102, sold: 3, pending: 0 },
    { month: "Jun '26", median: 1907500, dom: 28, listToSale: 101, sold: 12, pending: 0 },
    { month: "Jul '26", median: 1452500, dom: 23, listToSale: 102, sold: 6, pending: 0 },
    { month: "Aug '26", median: 1346750, dom: 17, listToSale: 104, sold: 3, pending: 0 },
  ],
};

const formatPrice = (v: number) => `$${(v / 1000).toFixed(0)}K`;
const formatFullPrice = (v: number) => `$${v.toLocaleString()}`;

export default function MarketPage() {
  useSEO({
    title: "Greater Boston Market Report: September 2026 | Will Shao",
    description: "Monthly market data for Greater Boston and MetroWest MA. Median prices, days on market, and list-to-sale ratios for Newton, Wellesley, Natick, Lexington, and more.",
    canonical: "https://bostonhomeguide.com/market",
  });
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"price" | "dom" | "towns">("price");
  const [townA, setTownA] = useState("Lexington");
  const [townB, setTownB] = useState("Newton");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await submitToFub({
        source: "Website — Market Reports",
        firstName: email.split("@")[0],
        email,
        interest: "market-report",
      });
      toast.success("You're subscribed! The next market report will be in your inbox.");
      trackLead("market-report-signup");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again or call (781) 456-3541.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[40vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/65" />
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-white/85 mb-3">Market Intelligence</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Greater Boston Real Estate Market Report
            </h1>
            <p className="text-white/80 font-body text-lg mb-6">
              Monthly data-driven insights on prices, days on market, and trends across Greater Boston's most sought-after towns.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm font-body">
              <Calendar className="w-4 h-4" />
              <span>Updated September 2026 · Next report: October 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-[#F4F6F8] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$790,000", label: "Median Sale Price", change: "MLSPIN, Sep 2026" },
              { value: "46 days", label: "Avg. Days on Market", change: "SF + Condo, Greater Boston" },
              { value: "100%", label: "List-to-Sale Ratio", change: "At asking, on average" },
              { value: "1,647", label: "Closed Sales", change: "MLSPIN, Sep 2026" },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-3xl font-bold text-[#0D2137]">{m.value}</p>
                <p className="text-sm text-[#5B6270] font-body mt-0.5">{m.label}</p>
                <p className="text-sm font-semibold text-[#5B6270] font-body mt-0.5">{m.change}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mb-8">
            <span className="gold-rule" />
            <h2 className="text-2xl font-bold text-[#0D2137]">
              Market Trends — Greater Boston
            </h2>
          </div>

          {/* Tab nav */}
          <div className="flex gap-2 mb-8 border-b border-gray-100">
            {[
              { key: "price", label: "Median Price" },
              { key: "dom", label: "Days on Market" },
              { key: "towns", label: "By Town" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-2.5 text-sm font-body font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-[#0D2137] text-[#0D2137]"
                    : "border-transparent text-gray-500 hover:text-[#0D2137]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "price" && (
            <div>
              <p className="text-sm text-gray-500 font-body mb-6">
                Median sale price trend across Greater Boston — Oct '25 through Sep '26
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <YAxis tickFormatter={formatPrice} tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <Tooltip
                    formatter={(value: number) => [formatFullPrice(value), "Median Price"]}
                    contentStyle={{ fontFamily: "DM Sans", fontSize: 12, border: "1px solid #e5e7eb" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="median"
                    stroke="#C89B3C"
                    strokeWidth={2.5}
                    dot={{ fill: "#C89B3C", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "dom" && (
            <div>
              <p className="text-sm text-gray-500 font-body mb-6">
                Average days on market — lower is a hotter market
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={domData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <YAxis tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <Tooltip
                    formatter={(value: number) => [`${value} days`, "Days on Market"]}
                    contentStyle={{ fontFamily: "DM Sans", fontSize: 12 }}
                  />
                  <Bar dataKey="dom" fill="#0D2137" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "towns" && (() => {
            const histA = townHistoryData[townA] ?? [];
            const histB = townHistoryData[townB] ?? [];
            const dataA = townData.find(t => t.town === townA)!;
            const dataB = townData.find(t => t.town === townB)!;
            // Join the two towns' histories by month (a small town can be missing a month with no sales)
            const monthKey = (m: string) => { const [mon, yy] = m.split(" '"); return Number(yy) * 12 + "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(mon) / 3; };
            const months = Array.from(new Set([...histA, ...histB].map(e => e.month))).sort((a, b) => monthKey(a) - monthKey(b));
            const byMonth = (h: typeof histA) => new Map(h.map(e => [e.month, e]));
            const mA = byMonth(histA), mB = byMonth(histB);
            const priceChartData = months.map(month => ({ month, [townA]: mA.get(month)?.median, [townB]: mB.get(month)?.median }));
            const domChartData = months.map(month => ({ month, [townA]: mA.get(month)?.dom, [townB]: mB.get(month)?.dom }));
            const lastA = histA[histA.length - 1], lastB = histB[histB.length - 1];
            const soldA = lastA?.sold ?? 0;
            const soldB = lastB?.sold ?? 0;
            const pendingA = lastA?.pending ?? 0;
            const pendingB = lastB?.pending ?? 0;
            const latestMonth = months[months.length - 1] ?? "";
            const trendLabel = months.length > 1 ? `${months.length}-Month Trend` : "Trend";
            const tableRows = townData.map(t => ({ ...t, sold: townHistoryData[t.town]?.slice(-1)[0]?.sold }));

            return (
              <div>
                {/* Region tabs + sortable table; Town A / Town B picks work across regions */}
                <TownCompareTable rows={tableRows} townA={townA} townB={townB} setTownA={setTownA} setTownB={setTownB} />

                {/* Side-by-side key stats */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mb-2">
                  {latestMonth} — Key Stats
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { town: townA, data: dataA, sold: soldA, pending: pendingA, color: "#0D2137" },
                    { town: townB, data: dataB, sold: soldB, pending: pendingB, color: "#C89B3C" },
                  ].map(({ town, data, sold, pending, color }) => (
                    <div key={town} className="bg-[#F4F6F8] rounded-2xl p-5 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                        <p className="text-sm font-semibold text-gray-500 font-body uppercase tracking-wide">{town}</p>
                      </div>
                      <p className="text-2xl font-bold text-[#0D2137] mb-1">
                        {formatFullPrice(data.medianPrice)}
                      </p>
                      {sold < 8 && (
                        <p className="text-xs text-gray-400 font-body italic mb-2">Low volume — median may not reflect market</p>
                      )}
                      <div className="grid grid-cols-2 gap-3 text-sm font-body mt-3">
                        <div>
                          <p className="font-bold text-[#0D2137]">{data.dom} days</p>
                          <p className="text-gray-400 text-xs">Avg. Days on Market</p>
                        </div>
                        <div>
                          <p className={`font-bold ${data.listToSale >= 98 ? "text-green-600" : "text-orange-500"}`}>
                            {data.listToSale}%
                          </p>
                          <p className="text-gray-400 text-xs">Sale vs. Orig. Ask</p>
                        </div>
                        <div>
                          <p className={`font-bold ${sold < 8 ? "text-gray-400" : "text-[#0D2137]"}`}>{sold}</p>
                          <p className="text-gray-400 text-xs">Homes Sold</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#0D2137]">{pending}</p>
                          <p className="text-gray-400 text-xs">Under Agreement</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Median price trend chart */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mb-2">Median Sale Price — {trendLabel}</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={priceChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
                    <YAxis tickFormatter={formatPrice} tick={{ fontSize: 11, fontFamily: "DM Sans" }} width={55} />
                    <Tooltip
                      formatter={(value: number, name: string) => [formatFullPrice(value), name]}
                      contentStyle={{ fontFamily: "DM Sans", fontSize: 12, border: "1px solid #e5e7eb" }}
                    />
                    <Legend wrapperStyle={{ fontFamily: "DM Sans", fontSize: 12 }} />
                    <Line type="monotone" dataKey={townA} stroke="#0D2137" strokeWidth={2.5} dot={{ fill: "#0D2137", r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey={townB} stroke="#C89B3C" strokeWidth={2.5} dot={{ fill: "#C89B3C", r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>

                {/* DOM trend chart */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mt-6 mb-2">Days on Market — {trendLabel}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={domChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
                    <YAxis tick={{ fontSize: 11, fontFamily: "DM Sans" }} width={35} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value} days`, name]}
                      contentStyle={{ fontFamily: "DM Sans", fontSize: 12, border: "1px solid #e5e7eb" }}
                    />
                    <Legend wrapperStyle={{ fontFamily: "DM Sans", fontSize: 12 }} />
                    <Bar dataKey={townA} fill="#0D2137" radius={[4, 4, 0, 0]} />
                    <Bar dataKey={townB} fill="#C89B3C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <p className="text-xs text-gray-400 font-body mt-4">Source: MLSPIN. Data from live monthly reports.</p>
              </div>
            );
          })()}
        </div>
      </section>

      <PullQuote quote="jason" align="center" className="py-12 md:py-16" />

      {/* Will's Commentary */}
      <section className="py-16 bg-[#F7F8FA]">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#0D2137] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#0D2137] font-body font-semibold tracking-wider uppercase mb-1">Will's Market Commentary</p>
                <h3 className="text-xl font-bold text-[#0D2137]">
September 2026 — What This Means for You
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-base text-gray-600 font-body leading-relaxed">
              {/* COMMENTARY:START — generated by scripts/mlspin/commentary.mjs */}
              <p>
                September brought 1,647 closed sales across Greater Boston, down 21% from August. The median sale price came in at $790,000, down 8% from August, and homes took an average of 46 days to sell, up from 40 days in August. On average, sellers received 100% of their list price. Fall typically brings a seasonal slowdown after the busy spring and summer months.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Buyers:</strong> Homes are sitting a little longer than they were last month, which gives you more time to make decisions and a bit more room to negotiate. The most negotiating room right now is in Sherborn (94% of list, 94 days on market), Carlisle (94% of list, 91 days on market), and Weston (96% of list, 91 days on market). Across the region, homes are still selling at or above asking on average, so a strong first offer still matters.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Sellers:</strong> Ayer, Lynnfield, and Wilmington are the most competitive markets we track this month, with homes selling at 103% of list price or better. With homes taking a bit longer to sell overall, pricing your home right from day one matters more than usual. A listing that starts too high tends to sit, and buyers notice.
              </p>
              <p>
                <strong className="text-[#0D2137]">Notable Standout:</strong> Ashland was one of the fastest-moving markets we track, with homes selling in 21 days on average at 102% of list. On the other end, homes in Brookline averaged 83 days on market, so buyers there have more time to weigh their options.
              </p>
              {/* COMMENTARY:END */}
            </div>
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0D2137] text-base font-body">Will Shao</p>
                <p className="text-sm text-gray-400 font-body">REMAX Executive Realty · (781) 456-3541</p>
              </div>
              <Link href="/contact" className="btn-gold text-xs">
                Discuss the Market
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className="py-16 bg-[#0D2137]">
        <div className="container max-w-xl text-center">
          <Mail className="w-10 h-10 text-[#C89B3C] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Get the Monthly Market Report
          </h2>
          <p className="text-white/60 font-body text-base mb-6">
            Data-driven insights delivered to your inbox every month. Free, no spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-[#1A3A5C] border border-white/20 rounded-xl px-4 py-3 text-base font-body text-white placeholder-white/40 focus:outline-none focus:border-[#C89B3C]"
            />
            <button type="submit" disabled={submitting} className="btn-light text-sm whitespace-nowrap">
              {submitting ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
