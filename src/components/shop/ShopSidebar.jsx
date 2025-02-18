"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const categories = [
  { id: "fresh-fruit", name: "Fresh Fruit", count: 154 },
  { id: "vegetables", name: "Vegetables", count: 150 },
  { id: "cooking", name: "Cooking", count: 123 },
  { id: "snacks", name: "Snacks", count: 47 },
  { id: "beverages", name: "Beverages", count: 43 },
  { id: "beauty-health", name: "Beauty & Health", count: 38 },
  { id: "bread-bakery", name: "Bread & Bakery", count: 15 },
]

const ratings = [
  { id: "5", stars: 5, label: "5.0" },
  { id: "4", stars: 4, label: "4.0 & up" },
  { id: "3", stars: 3, label: "3.0 & up" },
  { id: "2", stars: 2, label: "2.0 & up" },
  { id: "1", stars: 1, label: "1.0 & up" },
]

const tags = [
  "Healthy",
  "Low fat",
  "Vegetarian",
  "Kid foods",
  "Vitamins",
  "Bread",
  "Meat",
  "Snacks",
  "Tiffin",
  "Launch",
  "Dinner",
  "Breakfast",
  "Fruit",
]

export function ShopSidebar({ className }) {
  const [priceRange, setPriceRange] = useState([50, 1500])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRating, setSelectedRating] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  return (
    <aside className={cn("w-full", className)}>
      <div className="border-b pb-6 mb-6">
        <h3 className="font-semibold mb-4">All Categories</h3>
        <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id} className="text-sm ml-2 flex-1 cursor-pointer">
                  {category.name}
                  <span className="text-sm text-muted-foreground ml-1">({category.count})</span>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="border-b pb-6 mb-6">
        <h3 className="font-semibold mb-4">Price</h3>
        <Slider
          defaultValue={[50, 1500]}
          max={1500}
          min={0}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm">
          <span>
            Price: ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
      </div>

      <div className="border-b pb-6 mb-6">
        <h3 className="font-semibold mb-4">Rating</h3>
        <RadioGroup value={selectedRating} onValueChange={setSelectedRating}>
          <div className="space-y-3">
            {ratings.map((rating) => (
              <div key={rating.id} className="flex items-center">
                <RadioGroupItem value={rating.id} id={`rating-${rating.id}`} />
                <Label htmlFor={`rating-${rating.id}`} className="text-sm ml-2 flex items-center cursor-pointer">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={cn(
                          "h-4 w-4",
                          index < rating.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                  <span className="ml-2">{rating.label}</span>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Popular Tag</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className={cn("text-sm", selectedTag === tag && "bg-green-600 text-white hover:bg-green-700")}
              onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  )
}

