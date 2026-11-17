
const productSeed = [
  // APPAREL — 10 PRODUCTS
  { id: "GJ-001", name: "After Hours Oversized Tee", category: "apparel", price: 48, mark: "AFTER HOURS", label: "SIGNATURE DROP" },
  { id: "GJ-002", name: "No Ordinary Days Hoodie", category: "apparel", price: 110, mark: "NO ORDINARY", label: "BESTSELLER" },
  { id: "GJ-003", name: "Jiggy World Heavyweight Tee", category: "apparel", price: 58, mark: "JIGGY WORLD", label: "HEAVYWEIGHT" },
  { id: "GJ-004", name: "Off Script Utility Jacket", category: "apparel", price: 185, mark: "OFF SCRIPT", label: "LIMITED EDITION" },
  { id: "GJ-005", name: "Future Is Personal Sweatshirt", category: "apparel", price: 95, mark: "FUTURE / PERSONAL", label: "NEW ARRIVAL" },
  { id: "GJ-006", name: "The Unbothered Long Sleeve", category: "apparel", price: 68, mark: "UNBOTHERED", label: "STREET ESSENTIAL" },
  { id: "GJ-007", name: "Culture Club Varsity", category: "apparel", price: 220, mark: "CULTURE CLUB", label: "PREMIUM" },
  { id: "GJ-008", name: "Midnight Motion Track Jacket", category: "apparel", price: 135, mark: "MIDNIGHT MOTION", label: "NEW ARRIVAL" },
  { id: "GJ-009", name: "Nothing To Prove Polo", category: "apparel", price: 78, mark: "NOTHING TO PROVE", label: "CORE COLLECTION" },
  { id: "GJ-010", name: "Worldwide Energy Cargo Pants", category: "apparel", price: 125, mark: "WORLDWIDE", label: "UTILITY SERIES" },

  // FOOTWEAR — 8 PRODUCTS
  { id: "GJ-011", name: "Jiggy One Runner", category: "footwear", price: 165, mark: "J1 / RUNNER", label: "SIGNATURE FOOTWEAR" },
  { id: "GJ-012", name: "Orbit Street Sneaker", category: "footwear", price: 145, mark: "ORBIT", label: "NEW ARRIVAL" },
  { id: "GJ-013", name: "No Limits High Top", category: "footwear", price: 175, mark: "NO LIMITS", label: "LIMITED EDITION" },
  { id: "GJ-014", name: "Cloud Nine Minimal Trainer", category: "footwear", price: 155, mark: "CLOUD NINE", label: "EVERYDAY ICON" },
  { id: "GJ-015", name: "After Dark Leather Low", category: "footwear", price: 195, mark: "AFTER DARK", label: "PREMIUM LEATHER" },
  { id: "GJ-016", name: "Street Theory Skate Shoe", category: "footwear", price: 120, mark: "STREET THEORY", label: "SKATE SERIES" },
  { id: "GJ-017", name: "Velocity 88 Runner", category: "footwear", price: 180, mark: "VELOCITY 88", label: "PERFORMANCE" },
  { id: "GJ-018", name: "Jiggy Slide Studio", category: "footwear", price: 65, mark: "JG / SLIDE", label: "OFF-DUTY" },

  // BAGS — 7 PRODUCTS
  { id: "GJ-019", name: "The Everywhere Crossbody", category: "bags", price: 88, mark: "EVERYWHERE", label: "DAILY CARRY" },
  { id: "GJ-020", name: "Jiggy Transit Backpack", category: "bags", price: 145, mark: "TRANSIT", label: "UTILITY SERIES" },
  { id: "GJ-021", name: "Off Grid Mini Bag", category: "bags", price: 78, mark: "OFF GRID", label: "NEW ARRIVAL" },
  { id: "GJ-022", name: "World Tour Duffle", category: "bags", price: 185, mark: "WORLD TOUR", label: "TRAVEL EDIT" },
  { id: "GJ-023", name: "The Daily Form Tote", category: "bags", price: 58, mark: "DAILY FORM", label: "ESSENTIAL" },
  { id: "GJ-024", name: "After Hours Shoulder Bag", category: "bags", price: 115, mark: "AFTER HOURS", label: "LIMITED EDITION" },
  { id: "GJ-025", name: "Jiggy Utility Sling", category: "bags", price: 92, mark: "UTILITY / JG", label: "STREET SERIES" },

  // HEADWEAR — 6 PRODUCTS
  { id: "GJ-026", name: "Jiggy Worldwide Cap", category: "headwear", price: 42, mark: "WORLDWIDE", label: "SIGNATURE CAP" },
  { id: "GJ-027", name: "No Signal Beanie", category: "headwear", price: 38, mark: "NO SIGNAL", label: "COLD WEATHER" },
  { id: "GJ-028", name: "Off Script Five Panel", category: "headwear", price: 48, mark: "OFF SCRIPT", label: "NEW ARRIVAL" },
  { id: "GJ-029", name: "Culture Club Bucket Hat", category: "headwear", price: 45, mark: "CULTURE CLUB", label: "SUMMER EDIT" },
  { id: "GJ-030", name: "The JG Monogram Cap", category: "headwear", price: 55, mark: "JG / MONOGRAM", label: "PREMIUM" },
  { id: "GJ-031", name: "Midnight Runner Visor", category: "headwear", price: 35, mark: "MIDNIGHT", label: "SPORT SERIES" },

  // JEWELLERY — 6 PRODUCTS
  { id: "GJ-032", name: "Jiggy Identity Chain", category: "jewellery", price: 95, mark: "IDENTITY", label: "SIGNATURE METAL" },
  { id: "GJ-033", name: "Orbit Pendant Necklace", category: "jewellery", price: 78, mark: "ORBIT / 01", label: "NEW ARRIVAL" },
  { id: "GJ-034", name: "No Ordinary Ring", category: "jewellery", price: 65, mark: "NO ORDINARY", label: "MINIMAL SERIES" },
  { id: "GJ-035", name: "Jiggy Link Bracelet", category: "jewellery", price: 72, mark: "JG LINK", label: "CORE COLLECTION" },
  { id: "GJ-036", name: "After Hours Cuff", category: "jewellery", price: 88, mark: "AFTER HOURS", label: "LIMITED EDITION" },
  { id: "GJ-037", name: "Future Relic Earrings", category: "jewellery", price: 58, mark: "FUTURE RELIC", label: "STUDIO SERIES" },

  // ACCESSORIES — 7 PRODUCTS
  { id: "GJ-038", name: "Jiggy Archive Sunglasses", category: "accessories", price: 85, mark: "ARCHIVE", label: "EYEWEAR SERIES" },
  { id: "GJ-039", name: "No Limits Leather Belt", category: "accessories", price: 68, mark: "NO LIMITS", label: "DAILY ESSENTIAL" },
  { id: "GJ-040", name: "Worldwide Motion Socks", category: "accessories", price: 24, mark: "WORLDWIDE", label: "3-PACK" },
  { id: "GJ-041", name: "Off Grid Card Holder", category: "accessories", price: 52, mark: "OFF GRID", label: "CARRY GOODS" },
  { id: "GJ-042", name: "Jiggy Signal Phone Case", category: "accessories", price: 35, mark: "JG SIGNAL", label: "TECH ACCESSORY" },
  { id: "GJ-043", name: "The Everyday Bandana", category: "accessories", price: 28, mark: "EVERYDAY", label: "STYLE OBJECT" },
  { id: "GJ-044", name: "Jiggy Studio Keychain", category: "accessories", price: 22, mark: "JG STUDIO", label: "SMALL OBJECTS" },

  // LIFESTYLE — 6 PRODUCTS
  { id: "GJ-045", name: "The Jiggy Objects Bottle", category: "lifestyle", price: 42, mark: "OBJECTS / 01", label: "LIFESTYLE EDIT" },
  { id: "GJ-046", name: "No Ordinary Ceramic Cup", category: "lifestyle", price: 32, mark: "NO ORDINARY", label: "STUDIO OBJECT" },
  { id: "GJ-047", name: "World Tour Travel Journal", category: "lifestyle", price: 38, mark: "WORLD TOUR", label: "PAPER GOODS" },
  { id: "GJ-048", name: "After Hours Scent Candle", category: "lifestyle", price: 48, mark: "AFTER HOURS", label: "HOME COLLECTION" },
  { id: "GJ-049", name: "Jiggy Motion Yoga Mat", category: "lifestyle", price: 78, mark: "JIGGY MOTION", label: "MOVEMENT SERIES" },
  { id: "GJ-050", name: "The Culture Club Throw", category: "lifestyle", price: 95, mark: "CULTURE CLUB", label: "HOME EDITION" }
];

