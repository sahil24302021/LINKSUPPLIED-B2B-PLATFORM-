"use client";

import type { MatchingFilterState, MatchingSortOption } from "@/types";
import { SlidersHorizontal, ArrowsDownUp, X } from "@phosphor-icons/react";

interface MatchingFilterToolbarProps {
  filters: MatchingFilterState;
  sortOption: MatchingSortOption;
  onFilterChange: (filters: MatchingFilterState) => void;
  onSortChange: (sort: MatchingSortOption) => void;
  onResetFilters: () => void;
  totalMatches: number;
}

export function MatchingFilterToolbar({
  filters,
  sortOption,
  onFilterChange,
  onSortChange,
  onResetFilters,
  totalMatches,
}: MatchingFilterToolbarProps) {
  const isFiltered =
    filters.companyType !== "all" ||
    filters.verificationLevel !== "all" ||
    filters.region !== "all" ||
    filters.certification !== "all";

  return (
    <div className="bg-surface rounded-xl border border-ink/[0.08] p-4 shadow-xs space-y-3 text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-ink flex items-center gap-1.5 mr-1">
            <SlidersHorizontal size={14} className="text-copper" />
            Filter Capabilities ({totalMatches}):
          </span>

          {/* Company Type */}
          <select
            value={filters.companyType}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                companyType: e.target.value as MatchingFilterState["companyType"],
              })
            }
            className="px-2.5 py-1.5 rounded-lg border border-ink/[0.1] bg-paper text-ink outline-none"
            aria-label="Filter by company type"
          >
            <option value="all">All Entity Types</option>
            <option value="manufacturer">Manufacturers Only</option>
            <option value="distributor">Distributors / Stockists</option>
          </select>

          {/* Verification Tier */}
          <select
            value={filters.verificationLevel}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                verificationLevel: e.target.value as MatchingFilterState["verificationLevel"],
              })
            }
            className="px-2.5 py-1.5 rounded-lg border border-ink/[0.1] bg-paper text-ink outline-none"
            aria-label="Filter by verification level"
          >
            <option value="all">All Verification Tiers</option>
            <option value="audited">Physically Audited Plants</option>
            <option value="document">Document Verified</option>
          </select>

          {/* Region */}
          <select
            value={filters.region}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                region: e.target.value,
              })
            }
            className="px-2.5 py-1.5 rounded-lg border border-ink/[0.1] bg-paper text-ink outline-none"
            aria-label="Filter by location"
          >
            <option value="all">All Regions</option>
            <option value="India">India (Western / Southern Hubs)</option>
            <option value="Europe">Europe / Germany</option>
            <option value="USA">North America</option>
            <option value="Asia">East / Southeast Asia</option>
          </select>

          {/* Certification */}
          <select
            value={filters.certification}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                certification: e.target.value,
              })
            }
            className="px-2.5 py-1.5 rounded-lg border border-ink/[0.1] bg-paper text-ink outline-none"
            aria-label="Filter by quality certification"
          >
            <option value="all">All Certifications</option>
            <option value="ISO 9001">ISO 9001:2015</option>
            <option value="IATF 16949">IATF 16949 (Automotive)</option>
            <option value="AS9100D">AS9100D (Aerospace)</option>
            <option value="ISO 13485">ISO 13485 (Medical)</option>
          </select>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate hover:text-rose-600 transition-colors font-medium"
            >
              <X size={13} />
              Reset Filters
            </button>
          )}
        </div>

        {/* Right Sort Dropdown */}
        <div className="flex items-center gap-2 text-slate shrink-0">
          <span className="flex items-center gap-1">
            <ArrowsDownUp size={13} />
            Sort by:
          </span>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as MatchingSortOption)}
            className="px-2.5 py-1.5 rounded-lg border border-ink/[0.1] bg-paper text-ink outline-none font-semibold"
            aria-label="Sort matching suppliers"
          >
            <option value="fit">Best Requirement Fit</option>
            <option value="capacity">Open Capacity Available</option>
            <option value="lead_time">Fastest Lead Time</option>
            <option value="proximity">Logistics Proximity</option>
          </select>
        </div>
      </div>
    </div>
  );
}
