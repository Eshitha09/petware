/**
 * lib/products.ts
 *
 * Static product catalogue — used as the primary data source for the public
 * catalog pages and as a fallback when the Jiwa API is unavailable.
 *
 * When Jiwa is connected (/api/products calls lib/jiwa.ts), this data is
 * supplemented / overridden by live stock levels and customer-specific pricing.
 */

export type Product = {
  id: string
  sku: string
  name: string
  brand: string
  category: CategorySlug
  subcategory: string
  description: string
  /** Key selling points shown as pills/bullets */
  specs: string[]
  img: string
  featured?: boolean
  new?: boolean
}

export type CategorySlug =
  | 'dogs-cats'
  | 'food'
  | 'birds'
  | 'aquatic'
  | 'reptile'
  | 'small-animals'
  | 'grooming'
  | 'cat-litter'

export const CATEGORIES: Record<CategorySlug, { label: string; sub: string; desc: string; img: string }> = {
  'dogs-cats': {
    label: 'Dogs & Cats',
    sub: 'Essentials',
    desc: 'Food, accessories, health treatments, leads, collars, beds: your complete dog and cat range in one wholesale order.',
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1400&q=90&fit=crop',
  },
  food: {
    label: 'Food Range',
    sub: 'Cat & Dog',
    desc: 'Premium nutritionally-complete formulas at wholesale pricing. Bulk quantities for high-volume retailers.',
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=1400&q=90&fit=crop',
  },
  birds: {
    label: 'Bird Supplies',
    sub: 'All Species',
    desc: 'Seed, cages, perches, toys, and health products for parrots, canaries, finches, and all bird varieties.',
    img: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=1400&q=90&fit=crop',
  },
  aquatic: {
    label: 'Fish & Aquatic',
    sub: 'Tanks & More',
    desc: 'Tanks, filters, food, treatments, and décor from Juwel, Aqua Zonic, Red Sea Reefer, and Ocean Max.',
    img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=1400&q=90&fit=crop',
  },
  reptile: {
    label: 'Reptile',
    sub: 'Supplies',
    desc: 'Lighting, heating, habitats, and food for exotic pet retailers stocking bearded dragons, geckos, and more.',
    img: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=1400&q=90&fit=crop',
  },
  'small-animals': {
    label: 'Small Animals',
    sub: 'Rabbit, Guinea Pig & More',
    desc: 'Rabbits, guinea pigs, hamsters: food, bedding, housing, and enrichment from Pawise and more.',
    img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1400&q=90&fit=crop',
  },
  grooming: {
    label: 'Commercial Grooming',
    sub: 'Professional Range',
    desc: 'Professional shampoos, conditioners, tools, and equipment for grooming salons and mobile groomers.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=90&fit=crop',
  },
  'cat-litter': {
    label: 'Cat Litter',
    sub: 'Range',
    desc: 'Clumping, crystal, and natural litters in bulk cases for high-turnover pet stores.',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1400&q=90&fit=crop&crop=face',
  },
}

export const PRODUCTS: Product[] = [

  // ─── DOGS & CATS ────────────────────────────────────────────────────────────

  {
    id: 'pw-rl-5m',
    sku: 'PW-RL-5M',
    name: 'Pawise Retractable Lead 5m',
    brand: 'Pawise',
    category: 'dogs-cats',
    subcategory: 'Leads & Collars',
    description:
      'Heavy-duty retractable lead with one-handed brake-and-lock mechanism. Ergonomic non-slip grip, tangle-free nylon cord. Suitable for dogs up to 50kg.',
    specs: ['5m cord', 'Up to 50kg', '4 colour options', 'Ergonomic handle', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'pw-mem-bed-90',
    sku: 'PW-BED-90',
    name: 'Pawise Orthopaedic Memory Foam Dog Bed',
    brand: 'Pawise',
    category: 'dogs-cats',
    subcategory: 'Beds & Furniture',
    description:
      'High-density memory foam base with waterproof inner liner and removable machine-washable cover. Ideal for senior dogs and larger breeds.',
    specs: ['90cm × 60cm', 'Machine-washable cover', 'Waterproof inner liner', 'Non-slip base', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'pw-wf-25',
    sku: 'PW-WF-25',
    name: 'Pawise Stainless Steel Pet Water Fountain',
    brand: 'Pawise',
    category: 'dogs-cats',
    subcategory: 'Bowls & Feeders',
    description:
      'Continuously circulating filtered water keeps pets hydrated. Carbon filter included. Suitable for cats and small-to-medium dogs.',
    specs: ['2.5L capacity', 'Carbon filter included', '3-stage filtration', 'Low-noise pump', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-bs-750',
    sku: 'PW-BS-750',
    name: 'Pawise Stainless Feeder Bowl Set — Twin',
    brand: 'Pawise',
    category: 'dogs-cats',
    subcategory: 'Bowls & Feeders',
    description:
      'Twin stainless steel bowls in a no-tip rubber-base holder. Dishwasher safe, rust-proof, and hygienic. Available in 4 sizes.',
    specs: ['2 × 750ml bowls', 'Non-tip rubber base', 'Dishwasher safe', '4 size options', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=85&fit=crop',
  },
  {
    id: 'vc-ft-sd3',
    sku: 'VC-FT-SD3',
    name: 'Vetcare Flea & Tick Spot-On — 3-Pack',
    brand: 'Vetcare',
    category: 'dogs-cats',
    subcategory: 'Health & Treatments',
    description:
      'Fast-acting topical treatment providing up to 8 weeks protection against fleas, ticks, and lice. Waterproof after 48 hours.',
    specs: ['3 monthly doses', 'Up to 8-week protection', 'Waterproof after 48h', 'Small dog (up to 10kg)', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'pc-bs-200',
    sku: 'PC-BS-200',
    name: 'Pet Corrector Behaviour Spray 200ml',
    brand: 'Pet Corrector',
    category: 'dogs-cats',
    subcategory: 'Training & Behaviour',
    description:
      'Releases a harmless burst of compressed air that interrupts unwanted behaviour. Ideal for jumping, barking, and counter-surfing. Used and endorsed by professional trainers.',
    specs: ['200ml canister', '~100 bursts', 'CFC-free propellant', 'Safe & humane', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=85&fit=crop',
  },
  {
    id: 'vc-jc-120',
    sku: 'VC-JC-120',
    name: 'Vetcare Joint Care Chews — 120-pack',
    brand: 'Vetcare',
    category: 'dogs-cats',
    subcategory: 'Health & Treatments',
    description:
      'Palatable beef-flavoured soft chews with glucosamine, chondroitin, and omega-3. Supports joint health in active and senior dogs.',
    specs: ['120 chews per pack', 'Glucosamine & chondroitin', 'Omega-3 enriched', 'Suitable for all breeds', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=85&fit=crop',
    new: true,
  },
  {
    id: 'pw-tp-60',
    sku: 'PW-TP-60',
    name: 'Pawise Puppy Training Pads — 60-pack',
    brand: 'Pawise',
    category: 'dogs-cats',
    subcategory: 'Training & Behaviour',
    description:
      'Super-absorbent polymer core with 5-layer leak-proof construction. Quick-dry surface and adhesive tabs keep pads in position.',
    specs: ['60cm × 60cm', '5-layer construction', 'Adhesive corner tabs', 'Odour-neutralising', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-harness-m',
    sku: 'PW-HAR-M',
    name: 'Pawise No-Pull Step-In Harness — Medium',
    brand: 'Pawise',
    category: 'dogs-cats',
    subcategory: 'Leads & Collars',
    description:
      'Step-in design for easy fitting. Front and back D-rings for both anti-pull and regular use. Padded chest plate for comfort.',
    specs: ['Sizes XS–XL', 'Front & back D-rings', 'Padded chest panel', '4 colour options', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=85&fit=crop',
    new: true,
  },

  // ─── FOOD RANGE ─────────────────────────────────────────────────────────────

  {
    id: 'food-ad-15',
    sku: 'FD-ADG-15',
    name: 'Premium Adult Dog Dry Food — Chicken & Rice 15kg',
    brand: 'Petware Select',
    category: 'food',
    subcategory: 'Dog — Dry Food',
    description:
      'Nutritionally complete formula for adult dogs. High chicken inclusion, whole brown rice, omega-3 & 6 for coat health, and prebiotics for digestive support.',
    specs: ['15kg bag', 'No artificial colours', 'Chicken #1 ingredient', 'Joint support added', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'food-pup-3',
    sku: 'FD-PUP-3',
    name: 'Premium Puppy Dry Food — Large Breed 3kg',
    brand: 'Petware Select',
    category: 'food',
    subcategory: 'Dog — Dry Food',
    description:
      'Controlled calcium and phosphorus levels to support healthy bone development in large breed puppies. DHA from fish oil for brain development.',
    specs: ['3kg bag', 'Large breed formula', 'DHA enriched', 'For pups up to 18mo', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=85&fit=crop',
    new: true,
  },
  {
    id: 'food-gf-lamb-12',
    sku: 'FD-GFL-12',
    name: 'Grain-Free Dog Food — Lamb & Sweet Potato 12kg',
    brand: 'Petware Select',
    category: 'food',
    subcategory: 'Dog — Dry Food',
    description:
      'Single-protein grain-free formula for dogs with sensitivities. New Zealand lamb, sweet potato, and peas. No wheat, corn, or soy.',
    specs: ['12kg bag', 'NZ lamb', 'Grain & gluten free', 'Single protein source', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'food-cat-kit-24',
    sku: 'FD-KIT-24',
    name: 'Premium Kitten Wet Food — Chicken 24× 85g Pouches',
    brand: 'Petware Select',
    category: 'food',
    subcategory: 'Cat — Wet Food',
    description:
      'Tender chicken pieces in a rich gravy. DHA for healthy brain development. Complete and balanced for kittens from weaning to 12 months.',
    specs: ['24 × 85g pouches', 'Chicken in gravy', 'DHA enriched', 'For kittens 0–12mo', 'MOQ: 1 case'],
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'food-cat-ind-8',
    sku: 'FD-IND-8',
    name: 'Indoor Cat Dry Food — Hairball Control 8kg',
    brand: 'Petware Select',
    category: 'food',
    subcategory: 'Cat — Dry Food',
    description:
      'Specially formulated for indoor cats. High fibre content aids hairball elimination. L-Carnitine supports lean body weight.',
    specs: ['8kg bag', 'Hairball control', 'L-Carnitine enriched', 'Indoor cat formula', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e30?w=800&q=85&fit=crop',
  },
  {
    id: 'food-senior-7',
    sku: 'FD-SNR-7',
    name: 'Senior Dog Food — Gentle Digestion 7kg',
    brand: 'Petware Select',
    category: 'food',
    subcategory: 'Dog — Dry Food',
    description:
      'Tailored nutrition for dogs 7 years and older. Reduced fat, added glucosamine & chondroitin, and highly digestible chicken protein.',
    specs: ['7kg bag', 'For 7+ years', 'Joint care added', 'Reduced fat formula', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=85&fit=crop',
  },
  {
    id: 'food-wd-20',
    sku: 'FD-WD-20',
    name: 'Working Dog Dry Food — High Energy 20kg',
    brand: 'Petware Select',
    category: 'food',
    subcategory: 'Dog — Dry Food',
    description:
      'High-protein, high-fat formula for working and active dogs. 30% protein, 18% fat from quality animal sources. Cold-pressed for maximum nutrient retention.',
    specs: ['20kg bag', '30% protein', '18% fat', 'Cold-pressed', 'MOQ: 2'],
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=85&fit=crop',
  },
  {
    id: 'food-cat-urinary-4',
    sku: 'FD-URI-4',
    name: 'Cat Urinary Care Dry Food 4kg',
    brand: 'Petware Select',
    category: 'food',
    subcategory: 'Cat — Dry Food',
    description:
      'Controlled mineral levels to support urinary tract health. Promotes urine dilution and helps maintain optimal urinary pH.',
    specs: ['4kg bag', 'pH balanced', 'Low magnesium', 'Urinary health formula', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e30?w=800&q=85&fit=crop',
    new: true,
  },

  // ─── BIRD SUPPLIES ──────────────────────────────────────────────────────────

  {
    id: 'pw-cage-40',
    sku: 'PW-CAG-40',
    name: 'Pawise Stainless Wire Bird Cage — Medium',
    brand: 'Pawise',
    category: 'birds',
    subcategory: 'Cages & Aviaries',
    description:
      'Durable powder-coated wire cage with pull-out tray for easy cleaning. Includes 2 stainless feeders, 2 perches, and a swing. Suitable for canaries, finches, and small parrots.',
    specs: ['40cm × 30cm × 50cm', 'Powder-coated steel', 'Pull-out base tray', 'Includes accessories', 'MOQ: 2'],
    img: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'pw-seed-5',
    sku: 'PW-BRD-SEED5',
    name: 'Pawise Canary & Finch Seed Mix 5kg',
    brand: 'Pawise',
    category: 'birds',
    subcategory: 'Food & Treats',
    description:
      'Carefully balanced blend of canary seed, millet, thistle, linseed, and hemp seed. No artificial preservatives. Supports vibrant plumage and high-energy activity.',
    specs: ['5kg resealable bag', '6-seed blend', 'No preservatives', 'For canaries & finches', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-parrot-pellet-2',
    sku: 'PW-BRD-PP2',
    name: 'Pawise Parrot Pellet Formula 2kg',
    brand: 'Pawise',
    category: 'birds',
    subcategory: 'Food & Treats',
    description:
      'Nutritionally complete extruded pellets for medium-to-large parrots. Formulated to provide balanced vitamins and minerals without the selectivity of seed-only diets.',
    specs: ['2kg bag', 'Extruded pellets', 'Vitamin & mineral fortified', 'For African Greys, Amazons, etc.', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1552728366-f6fde655dc10?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'vc-bird-mite-300',
    sku: 'VC-BRD-MTE',
    name: 'Vetcare Bird Mite & Lice Spray 300ml',
    brand: 'Vetcare',
    category: 'birds',
    subcategory: 'Health & Treatments',
    description:
      'Fast-acting treatment for red mite, lice, and feather mites. Safe for use on the bird and in the cage environment. Pleasant lavender scent.',
    specs: ['300ml trigger spray', 'Kills on contact', 'Cage-safe formula', 'Lavender scented', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-cuttlebone-2',
    sku: 'PW-BRD-CTB',
    name: 'Pawise Natural Cuttlebone — 2-Pack',
    brand: 'Pawise',
    category: 'birds',
    subcategory: 'Accessories',
    description:
      'Natural source of calcium and trace minerals. Helps maintain beak health and provides foraging enrichment. Includes cage clip for easy attachment.',
    specs: ['2 cuttlebones per pack', '~15cm length', 'Cage clip included', 'For all cage birds', 'MOQ: 24'],
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-bird-bath',
    sku: 'PW-BRD-BTH',
    name: 'Pawise Bird Bathing House',
    brand: 'Pawise',
    category: 'birds',
    subcategory: 'Accessories',
    description:
      'Transparent enclosed bathing house that attaches to most standard cage doors. Keeps water inside the bath and off the cage floor. Easy to fill and clean.',
    specs: ['Clip-on design', 'Transparent body', 'Universal cage fit', 'Easy-fill lid', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1552728366-f6fde655dc10?w=800&q=85&fit=crop',
    new: true,
  },
  {
    id: 'pw-perch-set',
    sku: 'PW-BRD-PRC',
    name: 'Pawise Natural Wood Perch Set — 3-Pack',
    brand: 'Pawise',
    category: 'birds',
    subcategory: 'Accessories',
    description:
      'Irregular-diameter natural wood perches promote foot health by varying grip position. Non-toxic wood, sand-coated ends for nail maintenance. Fits standard cages.',
    specs: ['3 perches per set', 'Varying diameters', 'Sand-coated tips', 'Natural wood', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=85&fit=crop',
  },

  // ─── FISH & AQUATIC ─────────────────────────────────────────────────────────

  {
    id: 'juwel-rio-240',
    sku: 'JW-RIO-240',
    name: 'Juwel Rio 240 Aquarium Set',
    brand: 'Juwel',
    category: 'aquatic',
    subcategory: 'Aquariums',
    description:
      'Complete aquarium set with built-in Juwel Bioflow 8.0 internal filter, Multilux LED lighting, and lid. The Rio 240 is one of the best-selling tanks in New Zealand.',
    specs: ['240L capacity', '121cm × 41cm × 55cm', 'Bioflow 8.0 filter', 'Multilux LED included', 'MOQ: 1'],
    img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'juwel-rio-125',
    sku: 'JW-RIO-125',
    name: 'Juwel Rio 125 Aquarium Set',
    brand: 'Juwel',
    category: 'aquatic',
    subcategory: 'Aquariums',
    description:
      'The compact all-in-one freshwater aquarium for smaller spaces. Includes Bioflow 3.0 internal filter and Multilux LED bar. Available in 3 cabinet colours.',
    specs: ['125L capacity', '81cm × 36cm × 50cm', 'Bioflow 3.0 filter', 'LED lighting', 'MOQ: 1'],
    img: 'https://images.unsplash.com/photo-1547519582-09b5ddede040?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'rs-reefer-350',
    sku: 'RS-REF-350',
    name: 'Red Sea Reefer 350 System',
    brand: 'Red Sea Reefer',
    category: 'aquatic',
    subcategory: 'Marine & Reef',
    description:
      'Premium all-in-one reef system with sumped cabinet and innovative ReefMat roll filter. The Reefer 350 provides the ultimate marine experience for intermediate-to-advanced reef keepers.',
    specs: ['350L display', 'ReefMat filter included', 'Sumped cabinet', 'Rimless ultra-clear glass', 'MOQ: 1'],
    img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'az-heater-25',
    sku: 'AZ-HTR-25',
    name: 'Aqua Zonic Nano Heater 25W',
    brand: 'Aqua Zonic',
    category: 'aquatic',
    subcategory: 'Heating & Filtration',
    description:
      'Compact submersible heater with integrated thermostat and LED indicator. Shatterproof housing. Suitable for tanks from 10 to 30 litres.',
    specs: ['25W output', '10–30L tank size', 'Shatterproof housing', 'LED indicator', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1547519582-09b5ddede040?w=800&q=85&fit=crop',
  },
  {
    id: 'om-salt-25',
    sku: 'OM-SLT-25',
    name: 'Ocean Max Marine Salt 25kg',
    brand: 'Ocean Max',
    category: 'aquatic',
    subcategory: 'Marine & Reef',
    description:
      'Pharmaceutical-grade sea salt formulated to achieve natural seawater parameters. Mixes clear with no excess nitrates, phosphates, or ammonia.',
    specs: ['25kg bucket', 'No nitrates/phosphates', 'Mixes 750L at 1.025', 'Consistent batch quality', 'MOQ: 1'],
    img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&q=85&fit=crop',
  },
  {
    id: 'az-skimmer-300',
    sku: 'AZ-SKM-300',
    name: 'Aqua Zonic Protein Skimmer — up to 300L',
    brand: 'Aqua Zonic',
    category: 'aquatic',
    subcategory: 'Heating & Filtration',
    description:
      'Needle-wheel impeller protein skimmer for efficient organic waste removal in marine aquariums. Easy-twist neck adjustment for fine-tuning skimmate.',
    specs: ['Rated to 300L', 'Needle-wheel impeller', 'Easy-adjust neck', 'Collection cup alarm', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1547519582-09b5ddede040?w=800&q=85&fit=crop',
    new: true,
  },
  {
    id: 'juwel-bioplus',
    sku: 'JW-BIO-FLT',
    name: 'Juwel BioPlus Filter Media — Large',
    brand: 'Juwel',
    category: 'aquatic',
    subcategory: 'Heating & Filtration',
    description:
      'Original Juwel foam block set for Bioflow M, 3.0, and 6.0 filters. High surface area for beneficial bacteria colonisation. Replace every 3–6 months.',
    specs: ['Coarse & fine foam set', 'Suits Bioflow M/3.0/6.0', 'High surface area', 'Replace 3–6 monthly', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&q=85&fit=crop',
  },
  {
    id: 'az-led-90',
    sku: 'AZ-LED-90',
    name: 'Aqua Zonic LED Strip Light — 90cm',
    brand: 'Aqua Zonic',
    category: 'aquatic',
    subcategory: 'Lighting',
    description:
      'Slim aluminium LED strip with 6500K white and plant-growth spectrum LEDs. Extendable arm fits tanks from 75cm to 95cm. Low heat output.',
    specs: ['90cm (fits 75–95cm tanks)', '6500K + plant spectrum', 'Slim aluminium body', 'Low heat', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1547519582-09b5ddede040?w=800&q=85&fit=crop',
    new: true,
  },

  // ─── REPTILE ────────────────────────────────────────────────────────────────

  {
    id: 'rep-uvb-t8-15w',
    sku: 'REP-UVB-15',
    name: 'T8 UVB 10.0 Lamp — 15W',
    brand: 'Vetcare',
    category: 'reptile',
    subcategory: 'Lighting & Heating',
    description:
      'High-output 10% UVB fluorescent lamp essential for metabolising calcium in desert reptiles. Promotes D3 synthesis, prevents metabolic bone disease. Standard T8 fitting.',
    specs: ['15W T8 tube', '10% UVB output', '6 month effective life', 'For desert reptiles', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'rep-dhp-50',
    sku: 'REP-DHP-50',
    name: 'Deep Heat Projector 50W',
    brand: 'Vetcare',
    category: 'reptile',
    subcategory: 'Lighting & Heating',
    description:
      'Radiant heat projector that penetrates tissue to warm deep muscle — replicating the sun's thermal infrared radiation. Can be used 24/7 without disrupting day-night cycles.',
    specs: ['50W output', 'Penetrates muscle tissue', 'Safe 24/7 use', 'ES/E27 fitting', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'rep-leo-kit',
    sku: 'REP-LEO-KIT',
    name: 'Leopard Gecko Starter Habitat Kit',
    brand: 'Petware Select',
    category: 'reptile',
    subcategory: 'Habitats & Terrariums',
    description:
      'Everything needed for a first leopard gecko setup. Includes glass terrarium, heating mat, thermometer/hygrometer, water dish, hide, and substrate.',
    specs: ['45cm × 45cm × 30cm tank', 'Heat mat included', 'Thermometer/hygrometer', 'Hides × 2', 'MOQ: 2'],
    img: 'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?w=800&q=85&fit=crop',
    new: true,
  },
  {
    id: 'rep-beard-kit',
    sku: 'REP-BRD-KIT',
    name: 'Bearded Dragon Complete Setup',
    brand: 'Petware Select',
    category: 'reptile',
    subcategory: 'Habitats & Terrariums',
    description:
      'Full-size bearded dragon starter package. Includes 120cm terrarium with mesh lid, basking lamp, UVB lamp, thermostat, thermometer, water dish, and enrichment décor.',
    specs: ['120cm × 60cm × 60cm', 'Basking & UVB lamps', 'Thermostat included', 'Enrichment décor', 'MOQ: 1'],
    img: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'rep-cal-100',
    sku: 'REP-CAL-100',
    name: 'Reptile Calcium Supplement — Vitamin D3 100g',
    brand: 'Vetcare',
    category: 'reptile',
    subcategory: 'Nutrition & Supplements',
    description:
      'Finely ground calcium carbonate with added Vitamin D3. Dust onto live or frozen prey items to prevent metabolic bone disease in lizards, geckos, and turtles.',
    specs: ['100g powder', 'Added Vitamin D3', 'Fine dust consistency', 'For all reptiles', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?w=800&q=85&fit=crop',
  },
  {
    id: 'rep-crick-500',
    sku: 'REP-CRK-500',
    name: 'Vetcare Cricket Food — Gut-Load Formula 500g',
    brand: 'Vetcare',
    category: 'reptile',
    subcategory: 'Nutrition & Supplements',
    description:
      'Nutrient-rich gut-loading food for crickets and mealworms before feeding to reptiles. Packed with calcium, vitamins, and minerals to improve prey item nutritional value.',
    specs: ['500g bag', 'High calcium formula', 'Vitamin enriched', 'For crickets & mealworms', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?w=800&q=85&fit=crop',
  },

  // ─── SMALL ANIMALS ──────────────────────────────────────────────────────────

  {
    id: 'pw-hutch-120',
    sku: 'PW-HTC-120',
    name: 'Pawise 2-Storey Rabbit Hutch 120cm',
    brand: 'Pawise',
    category: 'small-animals',
    subcategory: 'Housing',
    description:
      'Solid pine hutch with waterproof asphalt-tile roof. Upper sleeping compartment with drop-down front access, lower exercise run with wire floor panels. UV-resistant paint finish.',
    specs: ['120cm × 55cm × 80cm', 'Solid pine construction', 'Waterproof roof', 'Drop-down access', 'MOQ: 1'],
    img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'pw-gp-hide',
    sku: 'PW-SA-HIDE',
    name: 'Pawise Guinea Pig Corner Hideout',
    brand: 'Pawise',
    category: 'small-animals',
    subcategory: 'Accessories & Enrichment',
    description:
      'Timber corner hide provides a secure retreat for guinea pigs and dwarf rabbits. Slotted design allows airflow. Untreated natural pine, safe for gnawing.',
    specs: ['25cm × 25cm × 20cm', 'Untreated pine', 'Corner-fitting design', 'Safe to gnaw', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1584553421349-3557471bed79?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-wheel-20',
    sku: 'PW-SA-WHL20',
    name: 'Pawise Silent Runner Wheel — 20cm',
    brand: 'Pawise',
    category: 'small-animals',
    subcategory: 'Accessories & Enrichment',
    description:
      'Ball-bearing silent runner wheel for hamsters, mice, and gerbils. Solid running surface (no foot entrapment risk), freestanding or cage-attachable.',
    specs: ['20cm diameter', 'Ball-bearing mechanism', 'Solid surface track', 'Freestanding or clip-on', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'pw-bottle-250',
    sku: 'PW-SA-BTL250',
    name: 'Pawise Small Animal Water Bottle 250ml',
    brand: 'Pawise',
    category: 'small-animals',
    subcategory: 'Feeding',
    description:
      'Stainless steel spout water bottle with anti-drip ball bearing. BPA-free transparent body for water level monitoring. Includes cage clip.',
    specs: ['250ml capacity', 'Stainless steel spout', 'Anti-drip ball bearing', 'BPA-free body', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1584553421349-3557471bed79?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-sa-hay-1',
    sku: 'PW-SA-HAY1',
    name: 'Compressed Timothy Hay — 1kg Block',
    brand: 'Petware Select',
    category: 'small-animals',
    subcategory: 'Food & Bedding',
    description:
      'Premium sun-dried Timothy hay compressed into a convenient block. Essential roughage for rabbits and guinea pigs. Free of dust, mould, and artificial preservatives.',
    specs: ['1kg compressed block', 'Sun-dried Timothy hay', 'Dust-free', 'No preservatives', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=85&fit=crop',
    new: true,
  },
  {
    id: 'vc-sa-worm',
    sku: 'VC-SA-WORM',
    name: 'Vetcare Small Animal Wormer — Suspension 50ml',
    brand: 'Vetcare',
    category: 'small-animals',
    subcategory: 'Health & Treatments',
    description:
      'Palatable liquid suspension effective against roundworm and pinworm in rabbits and guinea pigs. Easy to administer via syringe. Single-dose convenience.',
    specs: ['50ml bottle', 'Syringe included', 'Roundworm & pinworm', 'For rabbits & guinea pigs', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1584553421349-3557471bed79?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-sa-bedding',
    sku: 'PW-SA-BED',
    name: 'Pawise Ultra-Absorbent Bedding — 60L Bag',
    brand: 'Pawise',
    category: 'small-animals',
    subcategory: 'Food & Bedding',
    description:
      'Kiln-dried paper pulp bedding. Odour-absorbing, dust-extracted, and highly absorbent — up to 6× its weight in moisture. Safe for all small animals.',
    specs: ['60L bale', 'Paper pulp', 'Dust extracted', '6× absorption', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=85&fit=crop',
  },

  // ─── COMMERCIAL GROOMING ───────────────────────────────────────────────────

  {
    id: 'pw-slicker-l',
    sku: 'PW-GRM-SLK',
    name: 'Pawise Pro Double-Sided Slicker Brush — Large',
    brand: 'Pawise',
    category: 'grooming',
    subcategory: 'Brushes & Combs',
    description:
      'Dual-sided brush with fine steel pins on one face and flexible bristles on the other. Ergonomic soft-grip handle. Suitable for short-to-long coat breeds.',
    specs: ['Large — for medium-large breeds', 'Dual-sided', 'Steel pins + bristles', 'Soft-grip handle', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'pw-dematting-23',
    sku: 'PW-GRM-DEM',
    name: 'Pawise Dematting Comb — 23 Blade',
    brand: 'Pawise',
    category: 'grooming',
    subcategory: 'Brushes & Combs',
    description:
      'Stainless steel serrated blade comb cuts through mats and tangles without pulling. Ergonomic non-slip handle. Suitable for cats and dogs with medium-to-long coats.',
    specs: ['23 serrated blades', 'Stainless steel', 'Non-slip handle', 'Cats & dogs', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=85&fit=crop',
  },
  {
    id: 'pw-nail-scissors',
    sku: 'PW-GRM-NSC',
    name: 'Pawise Safety Nail Scissors',
    brand: 'Pawise',
    category: 'grooming',
    subcategory: 'Nail Care',
    description:
      'Precision stainless steel scissors with safety guard to prevent over-cutting. Comfort loop handles with rubber grip. Suitable for cats and small dogs.',
    specs: ['Safety guard included', 'Stainless steel blades', 'Comfort-loop handle', 'For cats & small dogs', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=85&fit=crop',
  },
  {
    id: 'ear-clean-250',
    sku: 'GRM-EAR-250',
    name: 'Professional Dog Ear Cleaner 250ml',
    brand: 'Petware Select',
    category: 'grooming',
    subcategory: 'Ear & Eye Care',
    description:
      'Alcohol-free ear cleaning solution with eucalyptus and tea tree extracts. Gently removes wax build-up, reduces odour, and soothes irritated ear canals.',
    specs: ['250ml bottle', 'Alcohol-free', 'Tea tree & eucalyptus', 'Reduces odour', 'MOQ: 12'],
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=85&fit=crop',
  },
  {
    id: 'pc-groom-spray-500',
    sku: 'PC-GRM-500',
    name: 'Pet Corrector Finishing Spray 500ml',
    brand: 'Pet Corrector',
    category: 'grooming',
    subcategory: 'Shampoos & Sprays',
    description:
      'Lightweight detangling and shine spray for post-groom finishing. Reduces static, repels dust, and leaves coats with a healthy sheen. Suitable for all coat types.',
    specs: ['500ml pump spray', 'Anti-static formula', 'Adds shine', 'All coat types', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=85&fit=crop',
    new: true,
  },
  {
    id: 'grm-shampoo-5l',
    sku: 'GRM-SHP-5L',
    name: 'Professional Oatmeal Shampoo — 5L',
    brand: 'Petware Select',
    category: 'grooming',
    subcategory: 'Shampoos & Sprays',
    description:
      'Colloidal oatmeal shampoo for sensitive and itchy skin. Soap-free, pH balanced to dog skin. Concentrates 10:1 for professional salon use. Fragrance-free option available.',
    specs: ['5L professional concentrate', '10:1 dilution ratio', 'Colloidal oatmeal', 'pH balanced', 'MOQ: 2'],
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=85&fit=crop',
    featured: true,
  },

  // ─── CAT LITTER ─────────────────────────────────────────────────────────────

  {
    id: 'lit-clump-10',
    sku: 'LIT-CLM-10',
    name: 'Premium Clumping Bentonite Litter 10kg',
    brand: 'Petware Select',
    category: 'cat-litter',
    subcategory: 'Clumping',
    description:
      'Fine-grain sodium bentonite clay with ultra-fast clumping action. 99% dust-free. Neutralises ammonia odour for up to 4 weeks. Case pricing available for bulk buyers.',
    specs: ['10kg bag', '99% dust-free', 'Ultra-fast clumping', '4-week odour control', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=85&fit=crop&crop=face',
    featured: true,
  },
  {
    id: 'lit-crystal-7',
    sku: 'LIT-CRY-7',
    name: 'Silica Crystal Litter 7.6L',
    brand: 'Petware Select',
    category: 'cat-litter',
    subcategory: 'Crystal & Silica',
    description:
      'Premium silica gel crystals absorb moisture on contact and control odour for up to 30 days. Non-tracking, low-dust, and lightweight compared to clay alternatives.',
    specs: ['7.6L bag (~3.6kg)', 'Up to 30 days odour control', 'Non-tracking', 'Low dust', 'MOQ: 6'],
    img: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e30?w=800&q=85&fit=crop',
  },
  {
    id: 'lit-pine-5',
    sku: 'LIT-PNE-5',
    name: 'Natural Pine Pellet Litter 5kg',
    brand: 'Petware Select',
    category: 'cat-litter',
    subcategory: 'Natural & Eco',
    description:
      'Kiln-dried pine pellets with natural pine scent for odour control. Biodegradable and compostable. Pellets absorb urine and break down to sawdust for easy tray cleaning.',
    specs: ['5kg bag', 'Natural pine scent', 'Biodegradable', 'Compostable', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=85&fit=crop&crop=face',
    new: true,
  },
  {
    id: 'lit-ultra-10',
    sku: 'LIT-ULT-10',
    name: 'Ultra-Clumping Premium Litter — Unscented 10kg',
    brand: 'Petware Select',
    category: 'cat-litter',
    subcategory: 'Clumping',
    description:
      'Multi-cat household formula with extra-strong clumping and activated carbon odour absorption. Fragrance-free for cats sensitive to perfumed litters.',
    specs: ['10kg bag', 'Activated carbon', 'Multi-cat formula', 'Fragrance-free', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e30?w=800&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'lit-paper-6',
    sku: 'LIT-PAP-6',
    name: 'Recycled Paper Pellet Litter 6kg',
    brand: 'Petware Select',
    category: 'cat-litter',
    subcategory: 'Natural & Eco',
    description:
      'Made from 100% recycled paper. Soft pellets are ideal for post-surgical cats or those with sensitive paws. Virtually dust-free and highly absorbent.',
    specs: ['6kg bag', '100% recycled paper', 'Virtually dust-free', 'Post-surgery safe', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=85&fit=crop&crop=face',
    new: true,
  },
  {
    id: 'lit-tofu-6',
    sku: 'LIT-TFU-6',
    name: 'Tofu & Corn Cat Litter — Flushable 6kg',
    brand: 'Petware Select',
    category: 'cat-litter',
    subcategory: 'Natural & Eco',
    description:
      'Plant-based tofu and corn fibre litter. Odour-absorbing, fast-clumping, and flushable in small quantities. Completely biodegradable. Popular with eco-conscious pet owners.',
    specs: ['6kg bag', 'Plant-based formula', 'Flushable', 'Fast-clumping', 'MOQ: 4'],
    img: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e30?w=800&q=85&fit=crop',
    featured: true,
    new: true,
  },
]

/** Get all products for a given category */
export function getProductsByCategory(category: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

/** Get a product by its ID */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

/** Get featured products across all categories */
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured)
}
