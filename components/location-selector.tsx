"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countries } from "@/lib/country-data"

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
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger className="w-40 bg-white border-slate-200 h-11">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center">
                <span>{country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Location Input */}
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Enter city or location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className={`w-full bg-white border-slate-200 pl-9 h-11 ${error ? "border-red-500" : ""}`}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>
    </div>
  )
}
