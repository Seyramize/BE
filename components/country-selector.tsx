"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Search, X } from "lucide-react"
import { countries, type CountryData } from "@/lib/country-data"

interface CountrySelectorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CountrySelector({ value, onChange, className = "" }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Find the selected country data
  const selectedCountry =
    countries.find((country) => country.code === value) || countries.find((country) => country.code === "US")

  // Filter countries based on search query
  const filteredCountries = countries.filter((country) => {
    const query = searchQuery.toLowerCase()
    return (
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query) ||
      country.dialCode.toLowerCase().includes(query)
    )
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Get flag emoji from country code
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  const handleSelectCountry = (country: CountryData) => {
    onChange(country.code)
    setIsOpen(false)
    setSearchQuery("")
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSearchQuery("")
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected country button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full h-12 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <span className="mr-2 text-lg" aria-hidden="true">
            {getFlagEmoji(selectedCountry?.code || "US")}
          </span>
          <span className="mr-1">{selectedCountry?.dialCode}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-64 mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {/* Search input */}
          <div className="sticky top-0 p-2 bg-white border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries..."
                className="w-full pl-8 pr-8 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Country list */}
          <ul className="py-1" role="listbox">
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                role="option"
                aria-selected={country.code === value}
                className={`flex items-center px-3 py-2 cursor-pointer hover:bg-slate-100 ${
                  country.code === value ? "bg-slate-50" : ""
                }`}
                onClick={() => handleSelectCountry(country)}
              >
                <span className="mr-2 text-lg" aria-hidden="true">
                  {getFlagEmoji(country.code)}
                </span>
                <span className="flex-1 truncate">{country.name}</span>
                <span className="text-slate-500 text-sm">{country.dialCode}</span>
                {country.code === value && <Check className="w-4 h-4 ml-2 text-slate-600" />}
              </li>
            ))}
            {filteredCountries.length === 0 && <li className="px-3 py-2 text-slate-500 text-sm">No countries found</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
