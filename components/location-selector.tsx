"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CountrySelector } from "@/components/country-selector"

interface LocationSelectorProps {
  selectedCountry: string
  location: string
  onCountryChange: (country: string) => void
  onLocationChange: (location: string) => void
  error?: string
}

export function LocationSelector({
  selectedCountry,
  location,
  onCountryChange,
  onLocationChange,
  error,
}: LocationSelectorProps) {
  return (
    <div className="flex gap-2">
      {/* Country Selection */}
      <CountrySelector
        value={selectedCountry}
        onChange={(country) => onCountryChange(country.code)}
        className="w-24 sm:w-32"
        hideDialCode={true}
        showCountryName={false}
        hideFlag={true}
        displayMode="responsive-code-mobile"
      />

      {/* Location Input */}
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Enter city or town"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className={`w-full bg-white border-slate-200 pl-9 h-11 ${error ? "border-red-500" : ""}`}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>
    </div>
  )
}
