/**
 * Canonical Vici Day Party table packages: used by join-guestlist-reservation API,
 * create-vici-table-checkout, and join-guestlist-reservation-modal.
 */

export type ViciTablePackage = {
  id: string;
  title: string;
  priceLabel: string;
  /** Amount in Ghana Cedis (GHS) — Paystack receives pesewas via multiply-by-100 in server helper */
  amountGhs: number;
  includes: string[];
};

export const VICI_TABLE_PACKAGES: ViciTablePackage[] = [
  // {
  //   id: "1",
  //   title: "Noah's Package",
  //   priceLabel: "₵ 1",
  //   amountGhs: 1,
  //   includes: ["Joy Daddy Bitters x1", "Plantain Chips x1"],
  // },
  {
    id: "5K",
    title: "Entry table",
    priceLabel: "₵ 5K",
    amountGhs: 5000,
    includes: ["Prosecco x1", "Agavita x1"],
  },
  {
    id: "10K",
    title: "Table For Three",
    priceLabel: "₵ 10K",
    amountGhs: 10000,
    includes: [
      "Veuve Rich x1",
      "Agavita x1",
      "Mini Platter x1",
      "Juice Pitcher x1",
    ],
  },
  {
    id: "15K",
    title: "Table For Four",
    priceLabel: "₵ 15K",
    amountGhs: 15000,
    includes: [
      "Veuve Rich x2",
      "Agavita x2",
      "Mini Platter x1",
      "Juice Pitcher x1",
    ],
  },
  {
    id: "20K",
    title: "Table For Six",
    priceLabel: "₵ 20K",
    amountGhs: 20000,
    includes: [
      "Veuve Rich x3",
      "Casamigos x2",
      "Mini Platter x1",
      "Juice Pitcher x1",
    ],
  },
];

export function getViciPackageById(
  id: string
): ViciTablePackage | undefined {
  return VICI_TABLE_PACKAGES.find((p) => p.id === id);
}

export function getViciPackageIncludesRecord(): Record<string, string[]> {
  return Object.fromEntries(
    VICI_TABLE_PACKAGES.map((p) => [p.id, p.includes])
  );
}

export function getIncludesForPackageId(packageId: string): string[] {
  return getViciPackageById(packageId)?.includes ?? [];
}

export const VICI_EXPERIENCE_SLUG = "vici-garden-party-chic";
