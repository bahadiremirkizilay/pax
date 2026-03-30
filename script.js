// Sample event data
let eventsData = [
  {
    id: 1,
    title: "Neon Nights Music Festival",
    category: "Music Festival",
    date: "2026-03-15",
    time: "8:00 PM",
    venue: "Electric Arena",
    city: "New York",
    priceLevel: 4,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 245,
    description: "Experience the ultimate fusion of electronic beats and visual artistry at Neon Nights Music Festival. This electrifying event brings together world-renowned DJs and emerging artists for an unforgettable night of music, lights, and pure energy.",
    highlights: [
      "10+ International DJs",
      "State-of-the-art sound system",
      "Immersive light shows",
      "Multiple stages",
      "VIP lounge access"
    ],
    venueAddress: "123 Electric Avenue, New York, NY 10001",
    locationLink: "https://www.google.com/maps/place/Madison+Square+Garden/@40.7505,-73.9934,17z",
    genres: "House, Techno, Progressive",
    ageRequirement: "21+",
    dressCode: "Club wear / Smart casual",
    artists: [
      { name: "DJ Shadow", genre: "Progressive House" },
      { name: "Luna Beats", genre: "Techno" },
      { name: "Neon Pulse", genre: "House" }
    ]
  },
  {
    id: 2,
    title: "Underground Bass Sessions",
    category: "Club Night",
    date: "2026-03-18",
    time: "10:00 PM",
    venue: "Pulse Club",
    city: "Los Angeles",
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 189,
    description: "Dive deep into the underground bass music scene. Heavy basslines, cutting-edge production, and an intimate club atmosphere.",
    highlights: [
      "Heavy bass sound system",
      "Local DJ lineup",
      "Intimate venue"
    ],
    venueAddress: "456 Bass Street, Los Angeles, CA 90001",
    locationLink: "https://www.google.com/maps/place/The+Novo/@34.0439,-118.267,17z",
    genres: "Drum & Bass, Dubstep",
    ageRequirement: "18+",
    dressCode: "Casual",
    artists: [
      { name: "Bass King", genre: "Drum & Bass" }
    ]
  },
  {
    id: 3,
    title: "Rooftop Electronic Dreams",
    category: "Rooftop Party",
    date: "2026-03-22",
    time: "6:00 PM",
    venue: "Sky Terrace",
    city: "Miami",
    priceLevel: 3,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 312,
    description: "Dance under the stars at Miami's premier rooftop venue. Enjoy sunset views and electronic beats.",
    highlights: [
      "Stunning skyline views",
      "Sunset DJ set",
      "Premium cocktails"
    ],
    venueAddress: "789 Sky Road, Miami, FL 33101",
    locationLink: "https://www.google.com/maps/place/Bayside+Marketplace/@25.7784,-80.1868,17z",
    genres: "Deep House, Melodic Techno",
    ageRequirement: "21+",
    dressCode: "Smart casual",
    artists: []
  },
  {
    id: 4,
    title: "Warehouse Techno Experience",
    category: "Techno Event",
    date: "2026-03-25",
    time: "11:00 PM",
    venue: "Industrial Complex",
    city: "Chicago",
    priceLevel: 3,
    image: "https://images.unsplash.com/photo-1571266028243-d220bbfff63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 276,
    description: "Raw techno energy in an authentic warehouse setting. Experience hard-hitting beats and industrial vibes in Chicago's underground scene.",
    highlights: [
      "Underground atmosphere",
      "World-class sound system",
      "Late night vibes until 6 AM"
    ],
    venueAddress: "Industrial Complex, 456 Warehouse District, Chicago, IL",
    locationLink: "https://www.google.com/maps/place/Smartbar/@41.9594,-87.6551,17z",
    genres: "Techno, Industrial Techno",
    ageRequirement: "21+",
    dressCode: "Casual / All Black",
    artists: [
      { name: "Techno Master", genre: "Hard Techno" }
    ]
  },
  {
    id: 5,
    title: "Sunset Beach Rave",
    category: "Beach Party",
    date: "2026-03-28",
    time: "4:00 PM",
    venue: "Ocean Vista",
    city: "San Diego",
    priceLevel: 5,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 423,
    description: "Dance barefoot in the sand as the sun sets over the Pacific. Premium beach party experience with top DJs and ocean views.",
    highlights: [
      "Beachfront location",
      "Sunset DJ sets",
      "Premium bar service",
      "Fire performers"
    ],
    venueAddress: "Ocean Vista Beach Club, San Diego, CA",
    locationLink: "https://www.google.com/maps/place/Pacific+Beach/@32.7940,-117.2395,17z",
    genres: "House, Tropical House",
    ageRequirement: "21+",
    dressCode: "Beach Casual",
    artists: []
  },
  {
    id: 6,
    title: "Neon City Festival",
    category: "Music Festival",
    date: "2026-04-02",
    time: "7:00 PM",
    venue: "Central Park",
    city: "Seattle",
    priceLevel: 4,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 198,
    description: "Seattle's premier electronic music festival returns with multiple stages, art installations, and top-tier international artists.",
    highlights: [
      "3 stages with different genres",
      "Art installations",
      "Food trucks",
      "VIP areas available"
    ],
    venueAddress: "Central Park Grounds, Seattle, WA",
    locationLink: "https://www.google.com/maps/place/Gas+Works+Park/@47.6456,-122.3344,17z",
    genres: "House, Techno, Trance",
    ageRequirement: "All Ages",
    dressCode: "Festival Wear",
    artists: []
  },
  {
    id: 7,
    title: "Midnight Pulse",
    category: "Club Night",
    date: "2026-04-05",
    time: "11:30 PM",
    venue: "Rhythm Factory",
    city: "Austin",
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 167,
    description: "Late night house music session in Austin's best underground club. Deep grooves and intimate vibes.",
    highlights: [
      "Deep house all night",
      "Intimate club setting",
      "Late night energy"
    ],
    venueAddress: "Rhythm Factory Club, Austin, TX",
    locationLink: "https://www.google.com/maps/place/Stubb's+Bar-B-Q/@30.2679,-97.7356,17z",
    genres: "Deep House, Tech House",
    ageRequirement: "21+",
    dressCode: "Casual",
    artists: []
  },
  {
    id: 8,
    title: "Skyline Sessions",
    category: "Rooftop Party",
    date: "2026-04-08",
    time: "7:30 PM",
    venue: "Heights Lounge",
    city: "Denver",
    priceLevel: 4,
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 289,
    description: "Elevated nightlife experience with panoramic city views, premium cocktails, and sophisticated house music.",
    highlights: [
      "360° city views",
      "Premium cocktail bar",
      "Heated rooftop area"
    ],
    venueAddress: "Heights Lounge Rooftop, Denver, CO",
    locationLink: "https://www.google.com/maps/place/Union+Station/@39.7531,-104.9995,17z",
    genres: "House, Lounge",
    ageRequirement: "21+",
    dressCode: "Smart Casual",
    artists: []
  },
  {
    id: 9,
    title: "Deep House Underground",
    category: "Club Night",
    date: "2026-04-12",
    time: "10:00 PM",
    venue: "Basement Club",
    city: "Portland",
    priceLevel: 1,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 203,
    description: "Underground deep house vibes in Portland's most authentic basement venue. True house music lovers unite.",
    highlights: [
      "Pure deep house sound",
      "Underground atmosphere",
      "No phones policy"
    ],
    venueAddress: "Basement Club, Portland, OR",
    locationLink: "https://www.google.com/maps/place/Crystal+Ballroom/@45.5216,-122.6836,17z",
    genres: "Deep House",
    ageRequirement: "21+",
    dressCode: "Casual",
    artists: []
  },
  {
    id: 10,
    title: "Electric Paradise Festival",
    category: "Music Festival",
    date: "2026-04-15",
    time: "2:00 PM",
    venue: "Lakeside Arena",
    city: "Orlando",
    priceLevel: 5,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 512,
    description: "Florida's biggest electronic music festival featuring world-class DJs, massive production, and unforgettable experiences.",
    highlights: [
      "World-class DJ lineup",
      "Massive production",
      "Multiple stages",
      "VIP experiences available"
    ],
    venueAddress: "Lakeside Arena Complex, Orlando, FL",
    locationLink: "https://www.google.com/maps/place/Camping+World+Stadium/@28.5394,-81.4026,17z",
    genres: "EDM, House, Trance, Dubstep",
    ageRequirement: "18+",
    dressCode: "Festival Wear",
    artists: []
  },
  {
    id: 11,
    title: "Cosmic Beach Gathering",
    category: "Beach Party",
    date: "2026-04-18",
    time: "5:00 PM",
    venue: "Crystal Sands",
    city: "Santa Monica",
    priceLevel: 3,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 345,
    description: "Beachside electronic music party with cosmic themes, ocean vibes, and spectacular sunset performances.",
    highlights: [
      "Beach party vibes",
      "Sunset DJ sets",
      "Fire performers",
      "Beach bar"
    ],
    venueAddress: "Crystal Sands Beach, Santa Monica, CA",
    locationLink: "https://www.google.com/maps/place/Santa+Monica+Beach/@34.0094,-118.4977,17z",
    genres: "House, Downtempo, Chill",
    ageRequirement: "21+",
    dressCode: "Beach Casual",
    artists: []
  },
  {
    id: 12,
    title: "Industrial Techno Nights",
    category: "Techno Event",
    date: "2026-04-20",
    time: "11:00 PM",
    venue: "Factory 808",
    city: "Detroit",
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 278,
    description: "Detroit techno at its finest in a historic factory venue. Raw, authentic, and uncompromising electronic music.",
    highlights: [
      "Detroit techno legends",
      "Historic factory venue",
      "Underground atmosphere",
      "All night sessions"
    ],
    venueAddress: "Factory 808, Detroit, MI",
    locationLink: "https://www.google.com/maps/place/TV+Lounge/@42.3495,-83.0625,17z",
    genres: "Techno, Industrial Techno",
    ageRequirement: "21+",
    dressCode: "Casual / All Black",
    artists: []
  },
  {
    id: 13,
    title: "Summer Rooftop Vibes",
    category: "Rooftop Party",
    date: "2026-04-23",
    time: "6:00 PM",
    venue: "Urban Sky Garden",
    city: "Boston",
    priceLevel: 4,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 261,
    description: "Summer rooftop party with stunning Boston skyline views, tropical cocktails, and sunset house music.",
    highlights: [
      "Panoramic skyline views",
      "Tropical cocktails",
      "Outdoor heated area",
      "Sunset DJ set"
    ],
    venueAddress: "Urban Sky Garden Rooftop, Boston, MA",
    locationLink: "https://www.google.com/maps/place/Royale+Boston/@42.3478,-71.0704,17z",
    genres: "House, Tropical House",
    ageRequirement: "21+",
    dressCode: "Summer Casual",
    artists: []
  },
  {
    id: 14,
    title: "Neon Wave Festival",
    category: "Music Festival",
    date: "2026-04-26",
    time: "8:00 PM",
    venue: "Metro Stadium",
    city: "Las Vegas",
    priceLevel: 5,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 634,
    description: "Las Vegas mega festival with the biggest names in electronic music, spectacular production, and non-stop energy.",
    highlights: [
      "Top international DJs",
      "Massive LED screens",
      "Multiple stages",
      "Las Vegas strip location",
      "VIP luxury packages"
    ],
    venueAddress: "Metro Stadium, Las Vegas Strip, NV",
    locationLink: "https://www.google.com/maps/place/Allegiant+Stadium/@36.0907,-115.1833,17z",
    genres: "EDM, Progressive House, Trance",
    ageRequirement: "18+",
    dressCode: "Festival Wear / EDM Fashion",
    artists: []
  },
  {
    id: 15,
    title: "Tropicana Beach Sunset",
    category: "Beach Party",
    date: "2026-04-29",
    time: "4:30 PM",
    venue: "Paradise Cove",
    city: "Honolulu",
    priceLevel: 5,
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c835?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 478,
    description: "Exclusive Hawaiian beach party experience with stunning sunset views, tropical vibes, and island house music.",
    highlights: [
      "Hawaiian sunset views",
      "Exclusive beachfront venue",
      "Tropical cocktails",
      "Island vibes",
      "Fire dancers"
    ],
    venueAddress: "Paradise Cove Beach, Honolulu, HI",
    locationLink: "https://www.google.com/maps/place/Waikiki+Beach/@21.2793,-157.8294,17z",
    genres: "House, Tropical House, Island Beats",
    ageRequirement: "21+",
    dressCode: "Beach Formal / Tropical",
    artists: []
  },
  {
    id: 16,
    title: "Afterhours Underground",
    category: "Techno Event",
    date: "2026-05-02",
    time: "1:00 AM",
    venue: "Subterranean",
    city: "Berlin",
    priceLevel: 3,
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 392,
    description: "Berlin's legendary afterhours techno experience. Pure underground club culture with no-nonsense techno until sunrise.",
    highlights: [
      "Berlin techno legends",
      "Afterhours until 10 AM",
      "Underground atmosphere",
      "World-famous sound system"
    ],
    venueAddress: "Subterranean Club, Berlin, Germany",
    locationLink: "https://www.google.com/maps/place/Berghain/@52.5109,13.4429,17z",
    genres: "Techno, Minimal Techno",
    ageRequirement: "18+",
    dressCode: "All Black",
    artists: []
  },
  {
    id: 17,
    title: "Euphoria Dance Festival",
    category: "Music Festival",
    date: "2026-05-05",
    time: "7:00 PM",
    venue: "Grand Arena",
    city: "Phoenix",
    priceLevel: 4,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 421,
    description: "Arizona's premier electronic dance festival featuring multiple stages, incredible visuals, and top-tier DJ performances.",
    highlights: [
      "5 unique stages",
      "Laser light shows",
      "Food and beverage areas",
      "Art installations",
      "VIP skybox access"
    ],
    venueAddress: "Grand Arena Complex, Phoenix, AZ",
    locationLink: "https://www.google.com/maps/place/Talking+Stick+Resort+Arena/@33.4458,-112.0712,17z",
    genres: "EDM, House, Trance, Dubstep",
    ageRequirement: "18+",
    dressCode: "Festival Wear",
    artists: []
  },
  {
    id: 18,
    title: "Midnight Groove Sessions",
    category: "Club Night",
    date: "2026-05-08",
    time: "11:00 PM",
    venue: "The Underground",
    city: "Philadelphia",
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1571266028243-d220bbfff63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer2@pax.com",
    views: 156,
    description: "Late night house and techno sessions in Philly's most authentic underground venue. Deep grooves and raw energy.",
    highlights: [
      "Underground atmosphere",
      "Resident DJ lineup",
      "Intimate dance floor",
      "Late night vibes"
    ],
    venueAddress: "The Underground Club, Philadelphia, PA",
    locationLink: "https://www.google.com/maps/place/The+Fillmore+Philadelphia/@39.9653,-75.1364,17z",
    genres: "House, Tech House, Techno",
    ageRequirement: "21+",
    dressCode: "Casual",
    artists: []
  },
  {
    id: 19,
    title: "Sunset Terrace Party",
    category: "Rooftop Party",
    date: "2026-05-11",
    time: "6:30 PM",
    venue: "Vista Heights",
    city: "San Francisco",
    priceLevel: 5,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 389,
    description: "Exclusive rooftop experience with breathtaking San Francisco bay views, craft cocktails, and sophisticated house music.",
    highlights: [
      "Golden Gate Bridge views",
      "Craft cocktail bar",
      "Heated outdoor space",
      "Sunset performances",
      "Premium sound system"
    ],
    venueAddress: "Vista Heights Rooftop, San Francisco, CA",
    locationLink: "https://www.google.com/maps/place/The+Warfield/@37.7821,-122.4122,17z",
    genres: "Deep House, Nu Disco, Melodic House",
    ageRequirement: "21+",
    dressCode: "Upscale Casual",
    artists: []
  },
  {
    id: 20,
    title: "Bass Factory",
    category: "Club Night",
    date: "2026-05-14",
    time: "10:30 PM",
    venue: "Frequency",
    city: "Atlanta",
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 234,
    description: "Heavy bass music night featuring dubstep, drum and bass, and trap. Atlanta's underground bass scene at its finest.",
    highlights: [
      "Massive bass system",
      "Local and touring DJs",
      "Underground vibe",
      "Late night sessions"
    ],
    venueAddress: "Frequency Club, Atlanta, GA",
    locationLink: "https://www.google.com/maps/place/Believe+Music+Hall/@33.7870,-84.3858,17z",
    genres: "Dubstep, Drum & Bass, Trap",
    ageRequirement: "18+",
    dressCode: "Casual / Streetwear",
    artists: []
  },
  {
    id: 21,
    title: "Coastal Rave Experience",
    category: "Beach Party",
    date: "2026-05-17",
    time: "3:00 PM",
    venue: "Sunset Beach",
    city: "Malibu",
    priceLevel: 4,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer2@pax.com",
    views: 502,
    description: "Epic beach rave on Malibu's stunning coastline. Dance in the sand from afternoon through sunset with world-class DJs.",
    highlights: [
      "Beachfront stage",
      "Sunset DJ performances",
      "Beach bar service",
      "Fire shows at dusk",
      "Ocean views"
    ],
    venueAddress: "Sunset Beach, Malibu, CA",
    locationLink: "https://www.google.com/maps/place/Malibu+Beach/@34.0259,-118.6998,17z",
    genres: "Progressive House, Trance, Beach House",
    ageRequirement: "21+",
    dressCode: "Beach Festival Wear",
    artists: []
  },
  {
    id: 22,
    title: "Techno Warehouse Alliance",
    category: "Techno Event",
    date: "2026-05-20",
    time: "11:30 PM",
    venue: "District 9",
    city: "Brooklyn",
    priceLevel: 3,
    image: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 318,
    description: "Brooklyn's premier techno warehouse party. Raw industrial space, cutting-edge sound system, and uncompromising techno music.",
    highlights: [
      "Warehouse atmosphere",
      "World-class Funktion-One system",
      "International DJ lineup",
      "All night dancing until 8 AM"
    ],
    venueAddress: "District 9 Warehouse, Brooklyn, NY",
    locationLink: "https://www.google.com/maps/place/Brooklyn+Steel/@40.7205,-73.9565,17z",
    genres: "Techno, Industrial Techno, Hard Techno",
    ageRequirement: "21+",
    dressCode: "All Black / Industrial",
    artists: []
  },
  {
    id: 23,
    title: "Lunar Festival",
    category: "Music Festival",
    date: "2026-05-23",
    time: "6:00 PM",
    venue: "Moonlight Grounds",
    city: "Nashville",
    priceLevel: 4,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 445,
    description: "Multi-stage electronic music festival under the stars. Nashville's biggest EDM event with camping options and 24-hour music.",
    highlights: [
      "3 main stages",
      "Camping available",
      "24-hour music zones",
      "Art installations",
      "Food truck village"
    ],
    venueAddress: "Moonlight Festival Grounds, Nashville, TN",
    locationLink: "https://www.google.com/maps/place/Bridgestone+Arena/@36.1591,-86.7785,17z",
    genres: "House, Techno, Trance, Bass Music",
    ageRequirement: "18+",
    dressCode: "Festival Gear",
    artists: []
  },
  {
    id: 24,
    title: "Skyline After Dark",
    category: "Rooftop Party",
    date: "2026-05-26",
    time: "9:00 PM",
    venue: "Cloud Nine",
    city: "Dallas",
    priceLevel: 3,
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer2@pax.com",
    views: 276,
    description: "Dallas skyline views meet sophisticated house music. Premium rooftop venue with upscale atmosphere and top local DJs.",
    highlights: [
      "Downtown skyline views",
      "VIP bottle service",
      "Premium cocktails",
      "Heated rooftop lounge"
    ],
    venueAddress: "Cloud Nine Rooftop, Dallas, TX",
    locationLink: "https://www.google.com/maps/place/Stereo+Live+Dallas/@32.8424,-96.8366,17z",
    genres: "Deep House, Tech House, Melodic Techno",
    ageRequirement: "21+",
    dressCode: "Smart Casual / Upscale",
    artists: []
  },
  {
    id: 25,
    title: "Paradise Island Festival",
    category: "Beach Party",
    date: "2026-05-29",
    time: "2:00 PM",
    venue: "Lagoon Beach",
    city: "Key West",
    priceLevel: 5,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "admin@pax.com",
    views: 567,
    description: "Ultimate tropical beach festival experience in Key West. Crystal waters, white sand, and non-stop electronic music from day to night.",
    highlights: [
      "Beachfront stages",
      "Tropical cocktail bars",
      "Water activities",
      "Sunset performances",
      "After-party venues"
    ],
    venueAddress: "Lagoon Beach Resort, Key West, FL",
    locationLink: "https://www.google.com/maps/place/Smathers+Beach/@24.5515,-81.7621,17z",
    genres: "Tropical House, Deep House, Chill Electronic",
    ageRequirement: "21+",
    dressCode: "Beach Festival / Tropical",
    artists: []
  },
  {
    id: 26,
    title: "Underground Movement",
    category: "Techno Event",
    date: "2026-06-01",
    time: "12:00 AM",
    venue: "The Bunker",
    city: "Minneapolis",
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdBy: "organizer@pax.com",
    views: 198,
    description: "Minneapolis underground techno collective presents a night of deep, hypnotic techno in an intimate basement venue.",
    highlights: [
      "Underground collective",
      "Intimate basement venue",
      "No photos policy",
      "Pure techno focus",
      "Dawn sessions"
    ],
    venueAddress: "The Bunker, Minneapolis, MN",
    locationLink: "https://www.google.com/maps/place/First+Avenue/@44.9799,-93.2765,17z",
    genres: "Minimal Techno, Deep Techno, Dub Techno",
    ageRequirement: "21+",
    dressCode: "Casual / All Black",
    artists: []
  }
];

// Initialize organizer info for demo events
eventsData = eventsData.map(event => {
  if (!event.organizer) {
    let organizerInfo = {
      email: event.createdBy
    };
    
    if (event.createdBy === 'organizer@pax.com') {
      organizerInfo = {
        name: 'PAX Events',
        bio: 'Professional event organizer bringing the best nightlife experiences',
        email: 'organizer@pax.com',
        phone: '+1 (555) 123-4567',
        instagram: 'paxevents',
        events: '50'
      };
    } else if (event.createdBy === 'admin@pax.com') {
      organizerInfo = {
        name: 'PAX Official',
        bio: 'Official PAX platform events and featured experiences',
        email: 'admin@pax.com',
        phone: '+1 (555) 999-0000',
        instagram: 'paxofficial',
        events: '100'
      };
    } else if (event.createdBy === 'organizer2@pax.com') {
      organizerInfo = {
        name: 'Night Events Co',
        bio: 'Nightlife event specialist and party curator',
        email: 'organizer2@pax.com',
        phone: '+1 (555) 777-8888',
        instagram: 'nighteventsco',
        events: '30'
      };
    }
    
    return { ...event, organizer: organizerInfo };
  }
  return event;
});

// ==========================================
// PERFORMANCE UTILITIES
// ==========================================

// Throttle function to limit execution rate of scroll handlers
function throttle(func, delay = 16) {
  let lastCall = 0;
  let timeoutId = null;
  
  return function(...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
      }, delay - timeSinceLastCall);
    }
  };
}

// Debounce function for input handlers
function debounce(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ==========================================
// DOM ELEMENTS CACHE
// ==========================================

const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const eventsGrid = document.getElementById('events-grid');
const dateStartFilter = document.getElementById('date-start');
const dateEndFilter = document.getElementById('date-end');
const priceCheckboxes = document.querySelectorAll('.price-checkbox');
const clearFiltersBtn = document.getElementById('clear-filters');
const filterResults = document.getElementById('filter-results');

// Filter Drawer Elements
const openFilterDrawerBtn = document.getElementById('open-filter-drawer');
const openFilterDrawerMobileBtn = document.getElementById('open-filter-drawer-mobile');
const closeFilterDrawerBtn = document.getElementById('close-filter-drawer');
const filterDrawer = document.getElementById('filter-drawer');
const filterDrawerOverlay = document.getElementById('filter-drawer-overlay');
const applyFiltersBtn = document.getElementById('apply-filters');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeFilterDrawer();
  initializeSearch();
  renderEvents(eventsData);
  initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
      const isExpanded = navMenu.classList.contains('active');
      navMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      mobileMenu.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        // Close mobile menu if open
        if (navMenu) {
          navMenu.classList.remove('active');
        }
      }
    });
  });

  // Update active nav link based on scroll position (throttled)
  window.addEventListener('scroll', throttle(updateActiveNavLink, 100), { passive: true });

  // Homepage logo click: jump back to top smoothly
  const heroLanding = document.getElementById('hero-landing');
  const logoTrigger = document.querySelector('.nav-center .logo');
  const pageEventsSection = document.querySelector('.events-section');

  if (heroLanding && logoTrigger) {
    logoTrigger.style.cursor = 'pointer';
    logoTrigger.addEventListener('click', () => {
      if (pageEventsSection && pageEventsSection.scrollTop > 0) {
        pageEventsSection.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  } else if (logoTrigger && window.location.pathname.includes('event-detail.html')) {
    logoTrigger.style.cursor = 'pointer';
    logoTrigger.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
}

// Cache for nav elements
let cachedNavLinks = null;
let cachedSections = null;

function updateActiveNavLink() {
  // Cache DOM queries
  if (!cachedNavLinks) {
    cachedNavLinks = document.querySelectorAll('.nav-link');
    cachedSections = ['home', 'about', 'events', 'contact'].map(id => ({
      id,
      element: document.getElementById(id)
    })).filter(s => s.element);
  }
  
  let current = '';
  cachedSections.forEach(section => {
    const rect = section.element.getBoundingClientRect();
    if (rect.top <= 100) {
      current = section.id;
    }
  });

  cachedNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Event rendering
function renderEvents(events) {
  if (!eventsGrid) return;

  eventsGrid.innerHTML = events.map(event => {
    const viewCount = getEventViewCount(event.id);
    const priceDisplay = formatPriceLevel(event.priceLevel);
    return `
    <div class="event-card" data-event-id="${event.id}" onclick="handleEventClick(${event.id})">
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}" loading="lazy">
        <div class="event-category">${event.category}</div>
      </div>
      <div class="event-info">
        <h3 class="event-title">${event.title}</h3>
        <div class="event-meta">
          <div class="event-date">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${formatDate(event.date)} • ${event.time}
          </div>
          <div class="event-location">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="event-venue">${event.venue}</span>, ${event.city}
          </div>
          <div class="event-views">
            <span>👁</span>
            <span>${viewCount} view${viewCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div class="event-price">${priceDisplay}</div>
      </div>
    </div>
  `;
  }).join('');
}

// Event click handler
function handleEventClick(eventId) {
  const clickedCard = document.querySelector(`.event-card[data-event-id="${eventId}"]`);
  if (clickedCard) {
    clickedCard.classList.add('is-opening');
  }

  // Increment view count
  incrementEventViewCount(eventId);
  // Store event ID for the detail page
  localStorage.setItem('selectedEventId', eventId);
  // Navigate to event detail page
  setTimeout(() => {
    window.location.href = 'event-detail.html';
  }, 80);
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const searchResultsInfo = document.getElementById('search-results-info');
  const searchWrapper = document.querySelector('.search-bar-wrapper');
  
  if (!searchInput) return;
  
  let activeFilters = {
    search: '',
    categories: [],
    cities: [],
    priceLevel: [],
    dateRange: { start: null, end: null }
  };
  
  // Expand search bar on focus
  searchInput.addEventListener('focus', function() {
    if (searchWrapper) {
      searchWrapper.classList.add('expanded');
    }
  });
  
  // Collapse search bar on blur if empty
  searchInput.addEventListener('blur', function() {
    if (searchWrapper && !searchInput.value.trim()) {
      searchWrapper.classList.remove('expanded');
    }
  });
  
  // Search input handler
  searchInput.addEventListener('input', debounce(function(e) {
    const searchTerm = e.target.value.trim();
    activeFilters.search = searchTerm;
    
    // Show/hide clear button
    if (searchTerm) {
      searchClearBtn.style.display = 'flex';
    } else {
      searchClearBtn.style.display = 'none';
    }
    
    applyFilters();
  }, 300));
  
  // Clear button handler
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', function() {
      searchInput.value = '';
      activeFilters.search = '';
      searchClearBtn.style.display = 'none';
      searchResultsInfo.style.display = 'none';
      if (searchWrapper) {
        searchWrapper.classList.remove('expanded');
      }
      applyFilters();
      searchInput.focus();
    });
  }
  
  // Function to apply all filters (search + drawer filters)
  function applyFilters() {
    let filteredEvents = [...eventsData];
    let filterCount = 0;
    
    // Apply search filter
    if (activeFilters.search) {
      const searchLower = activeFilters.search.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower) ||
        event.venue.toLowerCase().includes(searchLower) ||
        event.city.toLowerCase().includes(searchLower) ||
        (event.description && event.description.toLowerCase().includes(searchLower))
      );
      filterCount++;
    }
    
    // Apply category filter from drawer
    const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked'))
      .map(cb => cb.value);
    if (selectedCategories.length > 0) {
      filteredEvents = filteredEvents.filter(event => 
        selectedCategories.includes(event.category)
      );
      activeFilters.categories = selectedCategories;
      filterCount++;
    }
    
    // Apply city filter from drawer
    const selectedCities = Array.from(document.querySelectorAll('.city-checkbox:checked'))
      .map(cb => cb.value);
    if (selectedCities.length > 0) {
      filteredEvents = filteredEvents.filter(event => 
        selectedCities.includes(event.city)
      );
      activeFilters.cities = selectedCities;
      filterCount++;
    }
    
    // Apply price filter from drawer
    const selectedPrices = Array.from(document.querySelectorAll('.price-checkbox:checked'))
      .map(cb => parseInt(cb.value));
    if (selectedPrices.length > 0 && selectedPrices.length < 5) {
      filteredEvents = filteredEvents.filter(event => 
        selectedPrices.includes(event.priceLevel)
      );
      activeFilters.priceLevel = selectedPrices;
      filterCount++;
    }
    
    // Apply date range filter from drawer
    const dateStart = document.getElementById('date-start')?.value;
    const dateEnd = document.getElementById('date-end')?.value;
    if (dateStart || dateEnd) {
      filteredEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        if (dateStart && dateEnd) {
          return eventDate >= new Date(dateStart) && eventDate <= new Date(dateEnd);
        } else if (dateStart) {
          return eventDate >= new Date(dateStart);
        } else if (dateEnd) {
          return eventDate <= new Date(dateEnd);
        }
        return true;
      });
      activeFilters.dateRange = { start: dateStart, end: dateEnd };
      if (dateStart || dateEnd) filterCount++;
    }
    
    // Show results info
    if (filterCount > 0) {
      searchResultsInfo.style.display = 'block';
      if (filteredEvents.length === 0) {
        searchResultsInfo.textContent = 'Hiçbir sonuç bulunamadı. Filtreleri değiştirmeyi deneyin.';
        searchResultsInfo.style.background = 'rgba(239, 68, 68, 0.1)';
        searchResultsInfo.style.color = 'rgba(239, 68, 68, 1)';
      } else {
        searchResultsInfo.textContent = `${filteredEvents.length} etkinlik bulundu`;
        searchResultsInfo.style.background = 'rgba(17, 156, 195, 0.1)';
        searchResultsInfo.style.color = 'rgba(17, 156, 195, 1)';
      }
    } else {
      searchResultsInfo.style.display = 'none';
    }
    
    // Render filtered events
    renderEvents(filteredEvents);
  }
  
  // Make applyFilters available globally for drawer filters
  window.applySearchFilters = applyFilters;
  
  // Listen to filter changes from drawer
  document.querySelectorAll('.category-checkbox, .city-checkbox, .price-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });
  
  const dateStartInput = document.getElementById('date-start');
  const dateEndInput = document.getElementById('date-end');
  if (dateStartInput) dateStartInput.addEventListener('change', applyFilters);
  if (dateEndInput) dateEndInput.addEventListener('change', applyFilters);
}

// ==========================================
// ADVANCED FILTER SYSTEM
// ==========================================

// Filter Drawer Functions
function initializeFilterDrawer() {
  // Open drawer
  if (openFilterDrawerBtn) {
    openFilterDrawerBtn.addEventListener('click', openFilterDrawer);
  }
  if (openFilterDrawerMobileBtn) {
    openFilterDrawerMobileBtn.addEventListener('click', openFilterDrawer);
  }
  
  // Close drawer
  if (closeFilterDrawerBtn) {
    closeFilterDrawerBtn.addEventListener('click', closeFilterDrawer);
  }
  
  // Close drawer when clicking overlay
  if (filterDrawerOverlay) {
    filterDrawerOverlay.addEventListener('click', closeFilterDrawer);
  }
  
  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filterDrawer && filterDrawer.classList.contains('active')) {
      closeFilterDrawer();
    }
  });
  
  // Apply filters button
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
      applyFilters();
      closeFilterDrawer();
    });
  }
  
  // Date filters - apply on change
  if (dateStartFilter) {
    dateStartFilter.addEventListener('change', applyFilters);
  }
  if (dateEndFilter) {
    dateEndFilter.addEventListener('change', applyFilters);
  }
  
  // Price checkboxes - apply on change
  priceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });
  
  // Clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }
}

function openFilterDrawer() {
  if (filterDrawer) {
    filterDrawer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when drawer is open
    if (openFilterDrawerBtn) {
      openFilterDrawerBtn.setAttribute('aria-expanded', 'true');
    }
    if (openFilterDrawerMobileBtn) {
      openFilterDrawerMobileBtn.setAttribute('aria-expanded', 'true');
    }
  }
}

function closeFilterDrawer() {
  if (filterDrawer) {
    filterDrawer.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    if (openFilterDrawerBtn) {
      openFilterDrawerBtn.setAttribute('aria-expanded', 'false');
    }
    if (openFilterDrawerMobileBtn) {
      openFilterDrawerMobileBtn.setAttribute('aria-expanded', 'false');
    }
  }
}

function initializeFilters() {
  // Deprecated - keeping for compatibility
  // New drawer system handles initialization
}

function populateLocationFilter() {
  // Deprecated - location filter removed
}

function applyFilters() {
  let filteredEvents = [...eventsData];
  
  // Date range filter
  if (dateStartFilter && dateStartFilter.value) {
    const startDate = new Date(dateStartFilter.value);
    filteredEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate;
    });
  }
  
  if (dateEndFilter && dateEndFilter.value) {
    const endDate = new Date(dateEndFilter.value);
    filteredEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate <= endDate;
    });
  }
  
  // Price level filter
  const selectedPrices = Array.from(priceCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => parseInt(cb.value));
  
  if (selectedPrices.length > 0 && selectedPrices.length < 5) {
    filteredEvents = filteredEvents.filter(event =>
      selectedPrices.includes(event.priceLevel || 1)
    );
  }
  
  // Update results count
  updateFilterResults(filteredEvents.length, eventsData.length);
  
  // Render filtered events
  renderEvents(filteredEvents);
}

function updateFilterResults(filtered, total) {
  if (!filterResults) return;
  
  if (filtered === total) {
    filterResults.textContent = `Showing all ${total} events`;
  } else {
    filterResults.textContent = `Showing ${filtered} of ${total} events`;
  }
}

function clearAllFilters() {
  // Clear dates
  if (dateStartFilter) dateStartFilter.value = '';
  if (dateEndFilter) dateEndFilter.value = '';
  
  // Check all price checkboxes
  priceCheckboxes.forEach(checkbox => {
    checkbox.checked = true;
  });
  
  // Reapply filters (will show all)
  applyFilters();
}

// Legacy search functionality - kept for compatibility
function initializeSearchLegacy() {
  if (!searchInput) return;

  searchInput.addEventListener('input', debounce((e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEvents = eventsData.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm) ||
      event.venue.toLowerCase().includes(searchTerm) ||
      event.city.toLowerCase().includes(searchTerm)
    );
    renderEvents(filteredEvents);
  }, 300));
}

// ==========================================
// LOGIN MODAL SYSTEM
// ==========================================

// Scroll effects
function initializeScrollEffects() {
  // Fade in animation for event cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Removed event card animations - cards now load instantly
  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       entry.target.style.opacity = '1';
  //       entry.target.style.transform = 'translateY(0)';
  //     }
  //   });
  // }, observerOptions);

  // // Apply observer to event cards with delay
  // setTimeout(() => {
  //   const eventCards = document.querySelectorAll('.event-card');
  //   eventCards.forEach((card, index) => {
  //     card.style.opacity = '0';
  //     card.style.transform = 'translateY(30px)';
  //     card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  //     card.style.transitionDelay = `${index * 0.1}s`;
  //     observer.observe(card);
  //   });
  // }, 100);

  // Parallax effect for floating elements (throttled with RAF)
  let floatingElements = null;
  let ticking = false;
  
  function updateParallax() {
    const scrollY = window.scrollY;
    
    if (!floatingElements) {
      floatingElements = document.querySelectorAll('.floating-element');
    }
    
    floatingElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.2);
      const yPos = -(scrollY * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

// Event detail page functionality
if (window.location.pathname.includes('event-detail.html')) {
  // Safety check: ensure dark background class is present
  if (document.body && !document.body.classList.contains('event-detail-body')) {
    document.body.classList.add('event-detail-body');
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    loadEventDetails();
    initializeGallery();
    initializeEventDetailPage();
    initializeAddToCalendar();
    initializeShareButtons();
    updateDetailPageViewCount();
  });
}

function loadEventDetails() {
  const eventId = localStorage.getItem('selectedEventId');
  if (!eventId) return;

  const event = eventsData.find(e => e.id == eventId);
  if (!event) return;
  
  console.log('=== EVENT DETAILS PAGE ===');
  console.log('Event ID:', eventId);
  console.log('Event object:', event);
  console.log('Event locationLink:', event.locationLink);
  console.log('Event venueAddress:', event.venueAddress);

  // Check if user is organizer and can edit this event
  checkOrganizerEditPermission(event);

  // Update page title and meta
  document.title = `${event.title} - PAX`;
  
  // Update meta tags for social media sharing
  updateMetaTags(event);
  
  // Add JSON-LD structured data for SEO
  addStructuredData(event);
  
  // Update event details
  const eventTitle = document.getElementById('event-title');
  const eventCategory = document.getElementById('event-category');
  const eventDate = document.getElementById('event-date');
  const eventLocation = document.getElementById('event-location');
  const mainEventImage = document.getElementById('main-event-image');
  const userRole = localStorage.getItem('paxUserRole');
  const isOrganizerOrAdmin = userRole === 'organizer' || userRole === 'admin';

  if (eventTitle) eventTitle.textContent = event.title;
  if (eventCategory) {
    eventCategory.textContent = event.category;
    eventCategory.style.display = isOrganizerOrAdmin ? '' : 'none';
  }
  
  if (eventDate) eventDate.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
    <span>${formatDate(event.date)} • ${event.time}</span>
  `;
  
  if (eventLocation) eventLocation.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
    <span>${event.venue}, ${event.city}</span>
  `;
  
  // Update price level
  const eventPriceLevel = document.getElementById('event-price-level');
  if (eventPriceLevel && event.priceLevel) {
    eventPriceLevel.textContent = formatPriceLevel(event.priceLevel);
  }
  
  if (mainEventImage) {
    mainEventImage.src = event.image;
    
    // Color extraction disabled - using shared dark theme for all events
    // Event detail page uses consistent background defined in CSS
  }
  
  // Load dynamic description and highlights
  loadEventDescription(event);
  loadEventHighlights(event);
  loadEventMetadata(event);
  loadEventArtists(event);
  loadEventGallery(event);
  loadEventVideo(event);
  loadEventInstagram(event);
  loadEventOrganizer(event);
}

// Load event description dynamically
function loadEventDescription(event) {
  const descriptionContainer = document.querySelector('.event-description-text');
  if (!descriptionContainer) return;
  
  // Build HTML for description
  let html = '';
  
  if (event.description) {
    // Split description by newlines or keep as single paragraph
    const paragraphs = event.description.split('\n\n');
    paragraphs.forEach(para => {
      if (para.trim()) {
        html += `<p>${para.trim()}</p>\n`;
      }
    });
  }
  
  // Add highlights section if available
  if (event.highlights && event.highlights.length > 0) {
    html += `<h3>What to Expect</h3>
    <ul class="event-highlights">
      ${event.highlights.map(h => `<li>${h}</li>`).join('\n      ')}
    </ul>`;
  }
  
  descriptionContainer.innerHTML = html;
}

// Load event highlights
function loadEventHighlights(event) {
  // Already handled in loadEventDescription
}

// Load event metadata in sidebar
function loadEventMetadata(event) {
  // Update date & time in sidebar
  const formattedDateTime = `${formatDate(event.date)} • ${event.time}`;
  
  // Update accordion preview
  const accordionPreview = document.querySelector('.accordion-preview');
  if (accordionPreview) {
    accordionPreview.textContent = formattedDateTime;
  }
  
  // Update Date & Time in sidebar info
  const dateInfo = Array.from(document.querySelectorAll('.sidebar-info-item'))
    .find(item => item.textContent.includes('Date & Time'));
  if (dateInfo) {
    const valueEl = dateInfo.querySelector('.info-value-text');
    if (valueEl) valueEl.textContent = formattedDateTime;
  }
  
  // Update venue in sidebar info
  const venueInfo = Array.from(document.querySelectorAll('.sidebar-info-item'))
    .find(item => item.textContent.includes('Venue'));
  if (venueInfo) {
    const valueEl = venueInfo.querySelector('.info-value-text');
    if (valueEl) valueEl.textContent = `${event.venue}, ${event.city}`;
  }
  
  // Update genres
  const genresElement = document.querySelector('.info-value-text');
  if (genresElement && event.genres) {
    // Find the genres info item
    const genresInfo = Array.from(document.querySelectorAll('.sidebar-info-item'))
      .find(item => item.textContent.includes('Music Genres'));
    if (genresInfo) {
      const valueEl = genresInfo.querySelector('.info-value-text');
      if (valueEl) valueEl.textContent = event.genres;
    }
  }
  
  // Update age requirement
  const ageInfo = Array.from(document.querySelectorAll('.sidebar-info-item'))
    .find(item => item.textContent.includes('Age Requirement'));
  if (ageInfo && event.ageRequirement) {
    const valueEl = ageInfo.querySelector('.info-value-text');
    if (valueEl) valueEl.textContent = event.ageRequirement;
  }
  
  // Update dress code
  const dressInfo = Array.from(document.querySelectorAll('.sidebar-info-item'))
    .find(item => item.textContent.includes('Dress Code'));
  if (dressInfo && event.dressCode) {
    const valueEl = dressInfo.querySelector('.info-value-text');
    if (valueEl) valueEl.textContent = event.dressCode;
  }
  
  // Update venue name
  const venueNameEl = document.querySelector('.venue-name-display');
  if (venueNameEl && event.venue) {
    venueNameEl.textContent = event.venue;
  }
  
  // Update venue address
  const venueAddressEl = document.querySelector('.venue-address-display');
  if (venueAddressEl) {
    if (event.venueAddress) {
      venueAddressEl.textContent = event.venueAddress;
    } else {
      // Fallback to venue + city if no specific address
      venueAddressEl.textContent = `${event.venue}, ${event.city}`;
    }
  }

  // Update directions link near address
  const venueDirectionsLink = document.getElementById('venue-directions-link');
  if (venueDirectionsLink) {
    if (event.locationLink && event.locationLink.trim()) {
      venueDirectionsLink.href = event.locationLink;
      venueDirectionsLink.style.display = 'inline-flex';
    } else {
      venueDirectionsLink.style.display = 'none';
    }
  }
  
  // Load Google Maps
  loadVenueMap(event);
}

// Load event artists
function loadEventArtists(event) {
  const artistCard = document.querySelector('.lineup-sidebar-card');
  if (!artistCard) return;
  
  // If no artists, hide the entire artist card
  if (!event.artists || event.artists.length === 0) {
    artistCard.style.display = 'none';
    return;
  }
  
  artistCard.style.display = 'block';
  
  // Update preview text
  const previewText = artistCard.querySelector('.accordion-preview');
  if (previewText) {
    const firstTwo = event.artists.slice(0, 2).map(a => a.name).join(', ');
    const remaining = event.artists.length > 2 ? ` +${event.artists.length - 2} more` : '';
    previewText.textContent = firstTwo + remaining;
  }
  
  // Update artist list
  const accordionContent = artistCard.querySelector('.accordion-content');
  if (!accordionContent) return;
  
  let html = '';
  event.artists.forEach(artist => {
    html += `
                                <div class="lineup-artist-item">
                                    <div class="artist-image">
                                        <img src="${artist.image || 'https://images.unsplash.com/photo-1571266028243-d220bbfff63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'}" alt="${artist.name}" loading="lazy">
                                    </div>
                                    <div class="artist-info">
                                        <h4>${artist.name}</h4>
                                        <p>${artist.genre || ''}</p>
                                        <div class="artist-social-links">
                                            <span class="social-emoji">🎵</span>
                                            <span class="social-emoji">📷</span>
                                        </div>
                                    </div>
                                </div>`;
  });
  
  accordionContent.innerHTML = html;
}

// Load event gallery dynamically
function loadEventGallery(event) {
  const heroTrack = document.getElementById('hero-carousel-track');
  const heroDots = document.getElementById('hero-carousel-dots');
  const heroCarousel = document.getElementById('hero-image-carousel');
  if (!heroTrack || !heroDots || !heroCarousel) return;

  const defaultGallery = [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571266028243-d220bbfff63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const eventGallery = Array.isArray(event.gallery) ? event.gallery : [];
  const galleryImages = [event.image, ...(eventGallery.length ? eventGallery : defaultGallery)]
    .filter(Boolean)
    .filter((url, index, arr) => arr.indexOf(url) === index);

  window.currentEventGallery = galleryImages;

  heroTrack.innerHTML = galleryImages.map((imageUrl, index) => `
    <img
      src="${imageUrl}"
      alt="Event image ${index + 1}"
      class="hero-carousel-image"
      ${index === 0 ? 'id="main-event-image"' : ''}
      loading="lazy"
      crossorigin="anonymous"
      onclick="openGalleryLightbox(${index})"
    >
  `).join('');

  heroDots.innerHTML = galleryImages.map((_, index) => `
    <button class="hero-carousel-dot ${index === 0 ? 'is-active' : ''}" data-index="${index}" aria-label="Go to image ${index + 1}"></button>
  `).join('');

  const dots = heroDots.querySelectorAll('.hero-carousel-dot');

  const setActiveDot = (activeIndex) => {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeIndex);
    });
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index || 0);
      heroCarousel.scrollTo({ left: heroCarousel.clientWidth * index, behavior: 'smooth' });
      setActiveDot(index);
    });
  });

  const updateActiveFromScroll = () => {
    const width = heroCarousel.clientWidth || 1;
    const activeIndex = Math.round(heroCarousel.scrollLeft / width);
    setActiveDot(activeIndex);
  };

  heroCarousel.addEventListener('scroll', updateActiveFromScroll, { passive: true });
  window.addEventListener('resize', updateActiveFromScroll, { passive: true });
  updateActiveFromScroll();
}

// Load event video (YouTube/Vimeo)
function loadEventVideo(event) {
  const videoCard = document.getElementById('video-card');
  const videoContainer = document.getElementById('video-container');
  
  if (!videoCard || !videoContainer) return;
  
  if (event.youtubeUrl) {
    // Extract video ID and create embed
    const videoId = extractYouTubeId(event.youtubeUrl);
    if (videoId) {
      videoCard.style.display = 'block';
      videoContainer.innerHTML = `
        <div class="video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            title="Event Video"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            loading="lazy">
          </iframe>
        </div>
      `;
    }
  } else {
    videoCard.style.display = 'none';
  }
}

// Load Instagram embed
function loadEventInstagram(event) {
  const instagramCard = document.getElementById('instagram-card');
  const instagramContainer = document.getElementById('instagram-container');
  
  if (!instagramCard || !instagramContainer) return;
  
  if (event.instagramUrl) {
    instagramCard.style.display = 'block';
    
    // Extract Instagram post ID
    const postId = extractInstagramId(event.instagramUrl);
    if (postId) {
      instagramContainer.innerHTML = `
        <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${postId}/" data-instgrm-version="14" style="max-width:540px; min-width:326px; width:100%;">
          <div style="padding:16px;">
            <a href="https://www.instagram.com/p/${postId}/" target="_blank" rel="noopener noreferrer" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;">
              <div style="display: flex; flex-direction: row; align-items: center;">
                <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div>
                <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
                  <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div>
                  <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
                </div>
              </div>
              <div style="padding: 19% 0;"></div>
              <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
                <svg width="50px" height="50px" viewBox="0 0 60 60"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg>
              </div>
              <div style="padding-top: 8px;">
                <div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div>
              </div>
            </a>
          </div>
        </blockquote>
      `;
      
      // Load Instagram embed script
      if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = '//www.instagram.com/embed.js';
        document.body.appendChild(script);
      } else {
        // If script already loaded, reinitialize
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      }
    }
  } else {
    instagramCard.style.display = 'none';
  }
}

// Load event organizer information
function loadEventOrganizer(event) {
  const organizerPreview = document.getElementById('organizer-preview');
  const organizerName = document.getElementById('organizer-name');
  const organizerBio = document.getElementById('organizer-bio');
  const organizerTotalEvents = document.getElementById('organizer-total-events');
  const contactButtonsContainer = document.getElementById('organizer-contact-buttons');
  
  // Get organizer data from event or use defaults
  const orgName = event.organizer?.name || 'PAX Events';
  const orgBio = event.organizer?.bio || 'Event organizer at PAX';
  const orgEvents = event.organizer?.events || 0;
  
  // Update preview text in accordion header
  if (organizerPreview) {
    organizerPreview.textContent = orgName;
  }
  
  // Update organizer name
  if (organizerName) {
    organizerName.textContent = orgName;
  }
  
  // Update organizer bio
  if (organizerBio) {
    organizerBio.textContent = orgBio;
  }
  
  // Update total events
  if (organizerTotalEvents) {
    const eventsText = orgEvents === 1 ? '1 Event' : `${orgEvents} Events`;
    organizerTotalEvents.textContent = eventsText;
  }
  
  // Render contact buttons dynamically
  if (contactButtonsContainer && event.organizer) {
    let buttonsHTML = '';
    
    // Email button
    if (event.organizer.email) {
      const subject = encodeURIComponent(`Etkinlik Hakkında: ${event.title || 'PAX Event'}`);
      const body = encodeURIComponent(`Merhaba,\\n\\n${event.title || 'Etkinliğiniz'} hakkında bilgi almak istiyorum.\\n\\nSaygılarımla`);
      buttonsHTML += `
        <a href="mailto:${event.organizer.email}?subject=${subject}&body=${body}" class="organizer-contact-btn organizer-contact-email">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Email
        </a>
      `;
    }
    
    // Phone button
    if (event.organizer.phone) {
      buttonsHTML += `
        <a href="tel:${event.organizer.phone}" class="organizer-contact-btn organizer-contact-phone">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          Phone
        </a>
      `;
    }
    
    // Instagram button
    if (event.organizer.instagram) {
      const instagramHandle = event.organizer.instagram.replace('@', '');
      buttonsHTML += `
        <a href="https://instagram.com/${instagramHandle}" target="_blank" rel="noopener noreferrer" class="organizer-contact-btn organizer-contact-instagram">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
          </svg>
          Instagram
        </a>
      `;
    }
    
    // If no contact info available, show message
    if (!buttonsHTML) {
      buttonsHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center;">İletişim bilgisi mevcut değil</p>';
    }
    
    contactButtonsContainer.innerHTML = buttonsHTML;
  }
}

// Helper: Extract YouTube video ID
function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Helper: Extract Instagram post ID
function extractInstagramId(url) {
  const regExp = /instagram.com\/p\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Gallery lightbox
window.currentEventGallery = [];
window.currentGalleryIndex = 0;

window.openGalleryLightbox = function(index) {
  currentGalleryIndex = index;
  
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Image gallery lightbox');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = `
    <div class="lightbox-overlay" onclick="closeGalleryLightbox()"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" onclick="closeGalleryLightbox()" aria-label="Close lightbox">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <button class="lightbox-prev" onclick="prevGalleryImage()" aria-label="Previous image">
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <img src="${currentEventGallery[index]}" alt="Gallery ${index + 1}" class="lightbox-image">
      <button class="lightbox-next" onclick="nextGalleryImage()" aria-label="Next image">
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <div class="lightbox-counter" aria-live="polite">${index + 1} / ${currentEventGallery.length}</div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  // Keyboard navigation
  document.addEventListener('keydown', handleLightboxKeyboard);
};

window.closeGalleryLightbox = function() {
  const lightbox = document.querySelector('.gallery-lightbox');
  if (lightbox) {
    lightbox.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleLightboxKeyboard);
  }
};

window.nextGalleryImage = function() {
  currentGalleryIndex = (currentGalleryIndex + 1) % currentEventGallery.length;
  updateLightboxImage();
};

window.prevGalleryImage = function() {
  currentGalleryIndex = (currentGalleryIndex - 1 + currentEventGallery.length) % currentEventGallery.length;
  updateLightboxImage();
};

function updateLightboxImage() {
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCounter = document.querySelector('.lightbox-counter');
  
  if (lightboxImage) {
    lightboxImage.src = currentEventGallery[currentGalleryIndex];
  }
  
  if (lightboxCounter) {
    lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${currentEventGallery.length}`;
  }
}

function handleLightboxKeyboard(e) {
  if (e.key === 'Escape') {
    closeGalleryLightbox();
  } else if (e.key === 'ArrowRight') {
    nextGalleryImage();
  } else if (e.key === 'ArrowLeft') {
    prevGalleryImage();
  }
}

// Check if current user can edit this event
function checkOrganizerEditPermission(event) {
  const userEmail = localStorage.getItem('paxUserEmail');
  const userId = localStorage.getItem('paxUserId');
  const userRole = localStorage.getItem('paxUserRole');
  
  // Check if user is logged in and is either admin or the event creator
  const canEdit = userEmail && (
    userRole === 'admin' || 
    event.createdBy === userEmail || 
    event.createdBy === userId
  );
  
  const editBtn = document.getElementById('organizer-edit-btn');
  if (editBtn && canEdit) {
    editBtn.style.display = 'inline-flex';
    editBtn.addEventListener('click', () => {
      window.location.href = `cms/editor.html?mode=edit&id=${event.id}`;
    });
  }
  
  // Update back button to go to dashboard if user is logged in as organizer/admin
  if (userEmail && (userRole === 'admin' || userRole === 'organizer')) {
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
      backBtn.href = 'cms/dashboard.html';
      backBtn.innerHTML = `
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Dashboard
      `;
    }
    
    // Hide "Organizer Portal" link if user is already logged in as organizer/admin
    const organizerPortalLink = document.querySelector('.organizer-portal-link');
    if (organizerPortalLink) {
      organizerPortalLink.style.display = 'none';
    }
  }
}

// DYNAMIC COLOR EXTRACTION FROM EVENT IMAGE
function applyDarkFallback() {
  const fallbackPalette = {
    primary: '#1a0a2e',
    secondary: '#16213e',
    accent: '#0f3460'
  };
  applyDynamicTheme(fallbackPalette);
}

function extractAndApplyImageColors(imgElement) {
  // Apply dark fallback immediately
  applyDarkFallback();
  
  // Ensure image is fully loaded before processing
  if (!imgElement.complete || !imgElement.naturalHeight) {
    imgElement.addEventListener('load', function() {
      extractAndApplyImageColors(imgElement);
    }, { once: true });
    return;
  }
  
  try {
    // Create canvas element for color extraction
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    
    // Set small canvas size for better performance
    const sampleSize = 100;
    canvas.width = sampleSize;
    canvas.height = sampleSize;
    
    // Draw image to canvas
    ctx.drawImage(imgElement, 0, 0, sampleSize, sampleSize);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
    const pixels = imageData.data;
    
    // Extract dominant colors
    const colors = extractDominantColors(pixels, 5);
    
    // Only apply theme if we have valid colors
    if (colors && colors.length > 0) {
      // Generate color palette
      const palette = generateColorPalette(colors);
      
      // Validate palette before applying
      if (palette && palette.primary && palette.secondary && palette.accent) {
        // Apply colors to page
        applyDynamicTheme(palette);
      }
    }
  } catch (error) {
    console.log('Color extraction skipped (CORS or image loading issue) - keeping fallback');
    // Fallback already applied at start of function
  }
}

function extractDominantColors(pixels, numColors) {
  const colorMap = {};
  const step = 4; // Sample every 4th pixel for better performance
  
  // Count color occurrences with filtering
  for (let i = 0; i < pixels.length; i += step * 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    
    // Skip transparent pixels
    if (a < 128) continue;
    
    // Skip very dark pixels (almost black)
    if (r < 20 && g < 20 && b < 20) continue;
    
    // Skip almost-white pixels
    if (r > 240 && g > 240 && b > 240) continue;
    
    // Apply quantization to reduce color variations
    const qR = Math.floor(r / 30) * 30;
    const qG = Math.floor(g / 30) * 30;
    const qB = Math.floor(b / 30) * 30;
    
    // Create color key and count occurrences
    const key = `${qR},${qG},${qB}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }
  
  // Sort by frequency (most common first) and return top N colors
  const sortedColors = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, numColors)
    .map(([color]) => {
      const [r, g, b] = color.split(',').map(Number);
      return { r, g, b };
    });
  
  return sortedColors;
}

function generateColorPalette(dominantColors) {
  if (!dominantColors || dominantColors.length === 0) {
    return {
      primary: '#119cc3',
      secondary: '#cc0000',
      accent: '#ff3333'
    };
  }
  
  // Select most vibrant color as primary
  const primary = dominantColors[0];
  
  // Generate complementary colors
  const primaryRgb = `rgb(${primary.r}, ${primary.g}, ${primary.b})`;
  const primaryHex = rgbToHex(primary.r, primary.g, primary.b);
  
  // Create lighter accent color
  const accentR = Math.min(255, primary.r + 40);
  const accentG = Math.min(255, primary.g + 40);
  const accentB = Math.min(255, primary.b + 40);
  const accentHex = rgbToHex(accentR, accentG, accentB);
  
  // Create secondary color (complementary or from palette)
  let secondaryHex = primaryHex;
  if (dominantColors.length > 1) {
    const secondary = dominantColors[1];
    secondaryHex = rgbToHex(secondary.r, secondary.g, secondary.b);
  }
  
  return {
    primary: primaryHex,
    secondary: secondaryHex,
    accent: accentHex,
    primaryRgb: primaryRgb
  };
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join('');
}

function applyDynamicTheme(palette) {
  const root = document.documentElement;
  
  // Apply colors with smooth transition
  root.style.setProperty('--event-primary-color', palette.primary);
  root.style.setProperty('--event-secondary-color', palette.secondary);
  root.style.setProperty('--event-accent-color', palette.accent);
  
  // Create rgba versions for gradients
  const primaryRgba = hexToRgba(palette.primary, 0.25);
  const secondaryRgba = hexToRgba(palette.secondary, 0.15);
  const darkPrimaryRgba = hexToRgba(palette.primary, 0.08);
  const veryDarkRgba = hexToRgba(palette.primary, 0.03);
  
  root.style.setProperty('--event-glow', primaryRgba);
  root.style.setProperty('--event-border', primaryRgba);
  
  // ===== MAIN PAGE BACKGROUND THEME =====
  // Create a beautiful gradient using the extracted colors
  const pageGradient = `
    radial-gradient(ellipse at top center, ${primaryRgba} 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, ${secondaryRgba} 0%, transparent 40%),
    linear-gradient(180deg, ${darkPrimaryRgba} 0%, ${veryDarkRgba} 50%, #000000 100%)
  `;
  
  // Apply to body
  const body = document.body;
  if (body && body.classList.contains('event-detail-body')) {
    body.style.transition = 'background 0.8s ease';
    body.style.background = pageGradient;
  }
  
  // Apply to event detail container
  const eventDetail = document.querySelector('.event-detail');
  if (eventDetail) {
    eventDetail.style.transition = 'background 0.8s ease';
    eventDetail.style.background = pageGradient;
  }
  
  // Apply to hero background element
  const heroBackground = document.getElementById('hero-background');
  if (heroBackground) {
    heroBackground.style.transition = 'background 0.8s ease';
    heroBackground.style.background = `radial-gradient(ellipse at top, ${primaryRgba} 0%, transparent 70%)`;
    heroBackground.style.opacity = '0.3';
  }
  
  // Set CSS variable for use in other places if needed
  root.style.setProperty('--dynamic-bg', pageGradient);
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function initializeEventDetailPage() {
  // Add smooth scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, observerOptions);

  // Observe content cards
  const cards = document.querySelectorAll('.content-card, .sidebar-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Map button interaction
  const mapBtn = document.querySelector('.venue-map-btn');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      showNotification('Opening map...', 'info');
      setTimeout(() => {
        alert('This would open an interactive map in a real application.');
      }, 1000);
    });
  }

  // Contact organizer button
  const contactBtn = document.querySelector('.organizer-contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      const eventId = localStorage.getItem('selectedEventId');
      const event = eventsData.find(e => e.id == eventId);
      
      if (event && event.organizer && event.organizer.email) {
        const subject = encodeURIComponent(`Etkinlik Hakkında: ${event.title || 'PAX Event'}`);
        const body = encodeURIComponent(`Merhaba,\n\n${event.title || 'Etkinliğiniz'} hakkında bilgi almak istiyorum.\n\nSaygılarımla`);
        window.location.href = `mailto:${event.organizer.email}?subject=${subject}&body=${body}`;
      } else {
        showNotification('İletişim bilgisi bulunamadı', 'error');
      }
    });
  }

  // Initialize Accordion Sidebar
  initializeAccordionSidebar();
}

function initializeAccordionSidebar() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  if (accordionTriggers.length === 0) return;

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent any default button behavior
      
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const parentCard = this.closest('.accordion-card');
      const content = this.nextElementSibling;
      
      // Close all other accordions (one at a time behavior)
      accordionTriggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherContent = otherTrigger.nextElementSibling;
          if (otherContent && otherContent.classList.contains('accordion-content')) {
            otherContent.style.maxHeight = '0px';
          }
        }
      });
      
      // Toggle current accordion
      const newExpandedState = !isExpanded;
      this.setAttribute('aria-expanded', newExpandedState);
      
      // Update max-height for smooth animation
      if (newExpandedState && content) {
        // Calculate actual content height
        content.style.maxHeight = 'none';
        const height = content.scrollHeight;
        content.style.maxHeight = '0px';
        
        // Trigger reflow and set actual height
        setTimeout(() => {
          content.style.maxHeight = (height + 50) + 'px'; // Add buffer for padding
        }, 10);
      } else if (content) {
        content.style.maxHeight = '0px';
      }
    });
    
    // Add keyboard support for accessibility
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Set proper max-height for expanded content on load
  setTimeout(updateAccordionHeights, 100);
  
  // Update heights on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateAccordionHeights, 250);
  }, { passive: true });
}

function updateAccordionHeights() {
  const accordionContents = document.querySelectorAll('.accordion-content');
  
  accordionContents.forEach(content => {
    const trigger = content.previousElementSibling;
    if (trigger && trigger.getAttribute('aria-expanded') === 'true') {
      // Temporarily set to auto to measure true height
      const currentMaxHeight = content.style.maxHeight;
      content.style.maxHeight = 'none';
      const height = content.scrollHeight;
      
      // Set measured height with buffer
      content.style.maxHeight = (height + 50) + 'px';
    } else {
      // Ensure collapsed state
      content.style.maxHeight = '0px';
    }
  });
}

function initializeGallery() {
  // Gallery functionality is now handled in initializeEventDetailPage
  // Kept for compatibility
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function formatPriceLevel(level) {
  // Convert price level (1-5) to dollar signs
  const validLevel = Math.max(1, Math.min(5, level || 1));
  return '$'.repeat(validLevel);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Button interactions
document.addEventListener('click', function(e) {
  // Handle CTA button clicks
  if (e.target.matches('.cta-button')) {
    document.querySelector('#events')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  // Handle purchase button clicks
  if (e.target.matches('.purchase-btn')) {
    showNotification('Redirecting to ticket purchase...', 'success');
    // Simulate redirect to payment
    setTimeout(() => {
      alert('This would redirect to a payment gateway in a real application.');
    }, 1500);
  }

  // Handle map button clicks
  if (e.target.matches('.map-btn')) {
    showNotification('Opening map...', 'info');
    // Simulate opening map
    setTimeout(() => {
      alert('This would open an interactive map in a real application.');
    }, 1000);
  }
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-soft);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Hide notification
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
  // Lazy load images
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  // ESC key to close mobile menu
  if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
    navMenu.classList.remove('active');
    mobileMenu?.classList.remove('active');
  }
});

// Hide nav-menu on scroll and shrink navbar
let lastScrollTop = 0;

// Watch events-section scroll for navbar transparency
const eventsSection = document.querySelector('.events-section');
const filterButtonContainer = document.querySelector('.filter-button-container');
const filterButton = document.querySelector('.floating-filter-btn');

if (eventsSection) {
  const handleEventsSectionScroll = throttle(function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = eventsSection.scrollTop;
    
    if (scrollTop > 50) {
      navbar?.classList.add('scrolled');
      // Move filter button to the right when scrolling
      if (filterButtonContainer) {
        filterButtonContainer.style.transform = 'translateX(0)';
      }
      // Shrink button to icon only
      if (filterButton) {
        filterButton.classList.add('scrolled');
      }
    } else {
      navbar?.classList.remove('scrolled');
      // Reset filter button position
      if (filterButtonContainer) {
        filterButtonContainer.style.transform = 'translateX(0)';
      }
      // Restore button size
      if (filterButton) {
        filterButton.classList.remove('scrolled');
      }
    }
    
    lastScrollTop = scrollTop;
  }, 50);
  
  eventsSection.addEventListener('scroll', handleEventsSectionScroll, { passive: true });
}

// Fallback for pages without events-section (like event detail pages)
// Cache elements for better performance
let cachedNavbar = null;
let cachedNavMenu = null;
let cachedEventsSection = null;
let hasEventsSection = null;

const handleFallbackScroll = throttle(function() {
  if (cachedNavbar === null) {
    cachedNavbar = document.querySelector('.navbar');
    cachedNavMenu = document.getElementById('nav-menu');
    cachedEventsSection = document.querySelector('.events-section');
    hasEventsSection = !!cachedEventsSection;
  }
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Only apply if events-section doesn't exist (other pages)
  if (!hasEventsSection) {
    if (scrollTop > 50) {
      cachedNavbar?.classList.add('scrolled');
      cachedNavMenu?.classList.add('hidden');
    } else {
      cachedNavbar?.classList.remove('scrolled');
      cachedNavMenu?.classList.remove('hidden');
    }
  }
  
  lastScrollTop = scrollTop;
});

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (!touchStartX || !touchStartY) return;

  const touchEndX = e.touches[0].clientX;
  const touchEndY = e.touches[0].clientY;
  
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;
  
  // Handle swipe gestures if needed
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal swipe
    if (diffX > 50) {
      // Swipe left
    } else if (diffX < -50) {
      // Swipe right
    }
  }
  
  touchStartX = 0;
  touchStartY = 0;
});
// ==========================================
// ADD TO CALENDAR FUNCTIONALITY
// ==========================================

function initializeAddToCalendar() {
  const eventId = localStorage.getItem('selectedEventId');
  if (!eventId) return;

  const event = eventsData.find(e => e.id == eventId);
  if (!event) return;

  // Event data for calendar
  const calendarEvent = {
    title: event.title,
    description: `Experience ${event.title} at ${event.venue}. This ${event.category} promises an unforgettable night of music and entertainment.`,
    location: `${event.venue}, ${event.city}`,
    date: event.date,
    time: event.time
  };

  // Attach event listeners to calendar buttons
  document.getElementById('google-calendar')?.addEventListener('click', () => {
    window.open(generateGoogleCalendarUrl(calendarEvent), '_blank');
  });

  document.getElementById('apple-calendar')?.addEventListener('click', () => {
    downloadICS(calendarEvent);
  });

  document.getElementById('outlook-calendar')?.addEventListener('click', () => {
    window.open(generateOutlookUrl(calendarEvent), '_blank');
  });

  document.getElementById('download-ics')?.addEventListener('click', () => {
    downloadICS(calendarEvent);
  });
}

// Convert date and time to ISO format
function formatDateTimeForCalendar(date, time) {
  // Parse date (format: YYYY-MM-DD)
  const [year, month, day] = date.split('-');
  
  // Parse time (format: HH:MM AM/PM)
  let [hours, minutes] = time.split(':');
  const isPM = time.toLowerCase().includes('pm');
  minutes = minutes.replace(/[^0-9]/g, ''); // Remove AM/PM
  
  hours = parseInt(hours);
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  
  // Create Date object
  const eventDate = new Date(year, month - 1, day, hours, parseInt(minutes));
  
  return {
    start: eventDate,
    end: new Date(eventDate.getTime() + (4 * 60 * 60 * 1000)) // 4 hours duration
  };
}

// Format date for ICS file (YYYYMMDDTHHMMSS)
function formatICSDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

// Generate Google Calendar URL
function generateGoogleCalendarUrl(event) {
  const { start, end } = formatDateTimeForCalendar(event.date, event.time);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${formatICSDate(start).replace(/[-:]/g, '')}/${formatICSDate(end).replace(/[-:]/g, '')}`
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Generate Outlook Calendar URL
function generateOutlookUrl(event) {
  const { start, end } = formatDateTimeForCalendar(event.date, event.time);
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: start.toISOString(),
    enddt: end.toISOString()
  });
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

// Generate and download ICS file (for Apple Calendar and others)
function downloadICS(event) {
  const { start, end } = formatDateTimeForCalendar(event.date, event.time);
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PAX Events//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    `UID:${Date.now()}@paxevents.com`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  
  // Create blob and download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

// ==========================================
// VIEW COUNTER FUNCTIONALITY
// ==========================================

// Get view count for a specific event
function getEventViewCount(eventId) {
  const views = JSON.parse(localStorage.getItem('eventViews') || '{}');
  return views[eventId] || 0;
}

// Increment view count for an event
function incrementEventViewCount(eventId) {
  const views = JSON.parse(localStorage.getItem('eventViews') || '{}');
  views[eventId] = (views[eventId] || 0) + 1;
  localStorage.setItem('eventViews', JSON.stringify(views));
  return views[eventId];
}

// Update view count display on detail page
function updateDetailPageViewCount() {
  const eventId = localStorage.getItem('selectedEventId');
  if (!eventId) return;

  const viewCount = getEventViewCount(eventId);
  const viewCountElement = document.getElementById('view-count');
  
  if (viewCountElement) {
    viewCountElement.textContent = `${viewCount} view${viewCount !== 1 ? 's' : ''}`;
  }
}

// ==========================================
// SHARE EVENT FUNCTIONALITY
// ==========================================

function initializeShareButtons() {
  const eventId = localStorage.getItem('selectedEventId');
  if (!eventId) return;

  const event = eventsData.find(e => e.id == eventId);
  if (!event) return;

  // Generate share content
  const eventUrl = window.location.href;
  const eventTitle = event.title;
  const eventText = `Check out ${eventTitle} on ${formatDate(event.date)} at ${event.venue}, ${event.city}!`;
  
  // Check if native share is available
  const nativeShareBtn = document.getElementById('native-share');
  if (nativeShareBtn && navigator.share) {
    nativeShareBtn.style.display = 'flex';
    nativeShareBtn.addEventListener('click', () => {
      navigator.share({
        title: eventTitle,
        text: eventText,
        url: eventUrl
      }).catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      });
    });
  }
  
  // Copy link button
  const copyLinkBtn = document.getElementById('copy-link');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      copyToClipboard(eventUrl);
      showShareNotification('Link copied to clipboard!');
    });
  }
  
  // WhatsApp share
  const whatsappBtn = document.getElementById('share-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(eventText + ' ' + eventUrl)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
  
  // Twitter/X share
  const twitterBtn = document.getElementById('share-twitter');
  if (twitterBtn) {
    twitterBtn.addEventListener('click', () => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(eventText)}&url=${encodeURIComponent(eventUrl)}`;
      window.open(twitterUrl, '_blank');
    });
  }
  
  // Telegram share
  const telegramBtn = document.getElementById('share-telegram');
  if (telegramBtn) {
    telegramBtn.addEventListener('click', () => {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventText)}`;
      window.open(telegramUrl, '_blank');
    });
  }
}

// Copy to clipboard utility
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Clipboard write failed:', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  
  document.body.removeChild(textArea);
}

// Show share notification
function showShareNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'share-notification';
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: linear-gradient(135deg, var(--neon-primary), var(--neon-secondary));
    color: #000;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 8px 25px rgba(17, 156, 195, 0.5);
    z-index: 10000;
    animation: slideInUp 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutDown 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2500);
}
// Load events from localStorage and merge with default events
function loadEventsFromStorage() {
  console.log('Loading events from localStorage...');
  const storedEvents = localStorage.getItem('eventsData');
  if (storedEvents) {
    try {
      const parsedEvents = JSON.parse(storedEvents);
      console.log('Found', parsedEvents.length, 'events in localStorage');
      // Merge: Keep new events from localStorage, update existing ones
      parsedEvents.forEach(storedEvent => {
        const existingIndex = eventsData.findIndex(e => e.id === storedEvent.id);
        if (existingIndex !== -1) {
          // Update existing event, but preserve locationLink from default if not in storage
          const defaultEvent = eventsData[existingIndex];
          const hasStoredLink = storedEvent.locationLink && storedEvent.locationLink.trim() !== '';
          const hasDefaultLink = defaultEvent.locationLink && defaultEvent.locationLink.trim() !== '';
          
          console.log(`Event ${storedEvent.id}: stored link=${hasStoredLink}, default link=${hasDefaultLink}`);
          
          eventsData[existingIndex] = {
            ...defaultEvent,
            ...storedEvent,
            // If stored event doesn't have locationLink but default does, use default
            locationLink: storedEvent.locationLink || defaultEvent.locationLink || ''
          };
        } else {
          // Add new event
          eventsData.push(storedEvent);
          console.log('Added new event:', storedEvent.id, '- locationLink:', storedEvent.locationLink);
        }
      });
    } catch (e) {
      console.error('Error loading events from localStorage:', e);
    }
  } else {
    console.log('No events in localStorage, using default events');
  }
  
  // Save updated eventsData back to localStorage to include locationLinks
  localStorage.setItem('eventsData', JSON.stringify(eventsData));
  console.log('Events saved back to localStorage with', eventsData.length, 'events');
}

// Initialize: Load events when page loads
loadEventsFromStorage();

// Hide "Organizer Portal" link on homepage if user is logged in as organizer/admin
document.addEventListener('DOMContentLoaded', function() {
  const userEmail = localStorage.getItem('paxUserEmail');
  const userRole = localStorage.getItem('paxUserRole');
  const organizerPortalLink = document.querySelector('.organizer-portal-link');
  
  if (organizerPortalLink && userEmail && (userRole === 'admin' || userRole === 'organizer')) {
    organizerPortalLink.style.display = 'none';
  }
  
  // Quick action buttons for share and calendar
  setupQuickActionButtons();
});

// Setup quick action buttons
function setupQuickActionButtons() {
  const quickShareBtn = document.getElementById('quick-share-btn');
  const quickCalendarBtn = document.getElementById('quick-calendar-btn');
  const navShareBtn = document.getElementById('nav-share-btn');
  
  // Get current event data
  const eventId = localStorage.getItem('selectedEventId');
  const event = eventsData.find(e => e.id == eventId);
  
  if (!event) return;
  
  const eventUrl = window.location.href;
  const eventText = `Check out ${event.title} at PAX!`;

  const triggerShare = async () => {
    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: eventText,
          url: eventUrl
        });
        showShareNotification('Thanks for sharing!');
      } catch (err) {
        // User cancelled or error, show manual options
        if (err.name !== 'AbortError') {
          showShareOptions(event, eventUrl, eventText);
        }
      }
    } else {
      // Desktop - show share options
      showShareOptions(event, eventUrl, eventText);
    }
  };
  
  // Share button functionality
  if (quickShareBtn) {
    quickShareBtn.addEventListener('click', triggerShare);
  }

  // Navbar share button (right side of header)
  if (navShareBtn) {
    navShareBtn.addEventListener('click', triggerShare);
  }
  
  // Calendar button functionality
  if (quickCalendarBtn) {
    quickCalendarBtn.addEventListener('click', () => {
      showCalendarOptions(event);
    });
  }
}

// Show share options menu
function showShareOptions(event, eventUrl, eventText) {
  const menu = document.createElement('div');
  menu.className = 'quick-share-menu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-labelledby', 'share-menu-title');
  menu.setAttribute('aria-modal', 'true');
  menu.innerHTML = `
    <div class="quick-menu-overlay" onclick="this.parentElement.remove()"></div>
    <div class="quick-menu-content">
      <div class="quick-menu-header">
        <h3 id="share-menu-title">Share Event</h3>
        <button class="quick-menu-close" onclick="this.closest('.quick-share-menu').remove()" aria-label="Close share menu">×</button>
      </div>
      <div class="quick-menu-buttons">
        <button class="quick-menu-btn" onclick="copyEventLink('${eventUrl}')" aria-label="Copy event link to clipboard">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          Copy Link
        </button>
        <button class="quick-menu-btn" onclick="shareToWhatsApp('${encodeURIComponent(eventText + ' ' + eventUrl)}')" aria-label="Share on WhatsApp">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
        <button class="quick-menu-btn" onclick="shareToTwitter('${encodeURIComponent(eventText)}', '${encodeURIComponent(eventUrl)}')" aria-label="Share on Twitter">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Twitter / X
        </button>
        <button class="quick-menu-btn" onclick="shareToTelegram('${encodeURIComponent(eventUrl)}', '${encodeURIComponent(eventText)}')" aria-label="Share on Telegram">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Telegram
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(menu);
}

// Show calendar options menu
function showCalendarOptions(event) {
  const menu = document.createElement('div');
  menu.className = 'quick-share-menu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-labelledby', 'calendar-menu-title');
  menu.setAttribute('aria-modal', 'true');
  
  // Format date for calendar
  const eventDate = new Date(event.date + 'T' + convertTo24Hour(event.time));
  const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000); // +4 hours
  
  menu.innerHTML = `
    <div class="quick-menu-overlay" onclick="this.parentElement.remove()"></div>
    <div class="quick-menu-content">
      <div class="quick-menu-header">
        <h3 id="calendar-menu-title">Add to Calendar</h3>
        <button class="quick-menu-close" onclick="this.closest('.quick-share-menu').remove()" aria-label="Close calendar menu">×</button>
      </div>
      <div class="quick-menu-buttons">
        <button class="quick-menu-btn" onclick="addToGoogleCalendar('${event.title}', '${event.description || ''}', '${event.venue}, ${event.city}', '${eventDate.toISOString()}', '${endDate.toISOString()}')" aria-label="Add to Google Calendar">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
          </svg>
          Google Calendar
        </button>
        <button class="quick-menu-btn" onclick="addToAppleCalendar('${event.title}', '${event.description || ''}', '${event.venue}, ${event.city}', '${eventDate.toISOString()}', '${endDate.toISOString()}')" aria-label="Add to Apple Calendar">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Apple Calendar
        </button>
        <button class="quick-menu-btn" onclick="addToOutlookCalendar('${event.title}', '${event.description || ''}', '${event.venue}, ${event.city}', '${eventDate.toISOString()}', '${endDate.toISOString()}')" aria-label="Add to Outlook Calendar">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h10V4H7zm5 3a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
          Outlook
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(menu);
}

// Helper: Convert 12-hour to 24-hour format
function convertTo24Hour(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  
  return `${hours}:${minutes}:00`;
}

// Share functions
window.copyEventLink = function(url) {
  copyToClipboard(url);
  showShareNotification('Link copied to clipboard!');
  document.querySelector('.quick-share-menu')?.remove();
};

window.shareToWhatsApp = function(text) {
  window.open(`https://wa.me/?text=${text}`, '_blank');
  document.querySelector('.quick-share-menu')?.remove();
};

window.shareToTwitter = function(text, url) {
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  document.querySelector('.quick-share-menu')?.remove();
};

window.shareToTelegram = function(url, text) {
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  document.querySelector('.quick-share-menu')?.remove();
};

// Calendar functions
window.addToGoogleCalendar = function(title, description, location, startDate, endDate) {
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startDate.replace(/[-:]/g, '').split('.')[0]}Z/${endDate.replace(/[-:]/g, '').split('.')[0]}Z`;
  window.open(url, '_blank');
  document.querySelector('.quick-share-menu')?.remove();
};

window.addToAppleCalendar = function(title, description, location, startDate, endDate) {
  // Apple Calendar uses ICS format
  const ics = generateICS(title, description, location, startDate, endDate);
  downloadICS(ics, title);
  document.querySelector('.quick-share-menu')?.remove();
};

window.addToOutlookCalendar = function(title, description, location, startDate, endDate) {
  const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&startdt=${startDate}&enddt=${endDate}`;
  window.open(url, '_blank');
  document.querySelector('.quick-share-menu')?.remove();
};

// Generate ICS file
function generateICS(title, description, location, startDate, endDate) {
  const formatDate = (date) => date.replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
}

// Download ICS file
function downloadICS(icsContent, filename) {
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showShareNotification('Calendar file downloaded!');
}

// ===========================
// META TAGS UPDATE FOR SEO
// ===========================

function updateMetaTags(event) {
  if (!event) return;
  
  const title = `${event.title} - PAX`;
  const description = event.description || `Join us for ${event.title} at ${event.venue}, ${event.city}`;
  const url = window.location.href;
  const image = event.image || 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  
  // Update page title
  document.getElementById('page-title').textContent = title;
  document.getElementById('page-description').setAttribute('content', description);
  
  // Update Open Graph tags
  document.getElementById('og-url').setAttribute('content', url);
  document.getElementById('og-title').setAttribute('content', title);
  document.getElementById('og-description').setAttribute('content', description);
  document.getElementById('og-image').setAttribute('content', image);
  
  // Update Twitter Card tags
  document.getElementById('twitter-url').setAttribute('content', url);
  document.getElementById('twitter-title').setAttribute('content', title);
  document.getElementById('twitter-description').setAttribute('content', description);
  document.getElementById('twitter-image').setAttribute('content', image);
}

// Add JSON-LD Structured Data for SEO
function addStructuredData(event) {
  if (!event) return;
  
  // Remove existing structured data if any
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create event date-time
  const eventDateTime = new Date(event.date + 'T' + convertTo24Hour(event.time));
  const endDateTime = new Date(eventDateTime.getTime() + 4 * 60 * 60 * 1000); // +4 hours default
  
  // Build structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description || `Join us for ${event.title}`,
    "image": event.image,
    "startDate": eventDateTime.toISOString(),
    "endDate": endDateTime.toISOString(),
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.venueAddress || event.venue,
        "addressLocality": event.city,
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": event.organizer?.name || "PAX Events",
      "url": "https://pax.com"
    }
  };
  
  // Add price information if available
  if (event.ticketPrice) {
    structuredData.offers = {
      "@type": "Offer",
      "url": window.location.href,
      "price": event.ticketPrice,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString()
    };
  }
  
  // Add performer/artist information if available
  if (event.artists && event.artists.length > 0) {
    structuredData.performer = event.artists.map(artist => ({
      "@type": "PerformingGroup",
      "name": artist.name
    }));
  }
  
  // Create script tag and add to head
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// ===========================
// GOOGLE MAPS INTEGRATION
// ===========================

function loadVenueMap(event) {
  if (!event) return;
  
  const mapContainer = document.querySelector('.venue-map-container');
  if (!mapContainer) return;
  
  // Only show map if location link exists
  if (!event.locationLink || event.locationLink.trim() === '') {
    mapContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">Map link not provided</div>';
    return;
  }
  
  console.log('Loading map for event:', event.title);
  console.log('Location link:', event.locationLink);
  
  // Extract query from Google Maps link
  const link = event.locationLink;
  let query = '';
  
  // Check if it's a shortened goo.gl link
  if (link.includes('goo.gl') || link.includes('maps.app.goo.gl')) {
    // Shortened links don't work with embed API, use venue address instead
    console.log('Shortened Google Maps link detected, using venue address instead');
    query = event.venueAddress || `${event.venue}, ${event.city}`;
  } else if (link.includes('google.com/maps')) {
    const qMatch = link.match(/[?&]q=([^&]+)/);
    if (qMatch) {
      query = decodeURIComponent(qMatch[1]);
      console.log('Extracted query from ?q= parameter:', query);
    } else {
      const placeMatch = link.match(/\/place\/([^\/]+)/);
      if (placeMatch) {
        query = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
        console.log('Extracted query from /place/:', query);
      } else {
        const coordMatch = link.match(/\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (coordMatch) {
          query = `${coordMatch[1]},${coordMatch[2]}`;
          console.log('Extracted coordinates:', query);
        }
      }
    }
  }
  
  // If no query extracted, use venue address as fallback
  if (!query) {
    query = event.venueAddress || `${event.venue}, ${event.city}`;
    console.log('No query extracted, using venue address:', query);
  }
  
  const encodedQuery = encodeURIComponent(query);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedQuery}&zoom=15`;
  console.log('Final map URL:', mapUrl);
  const directionsUrl = event.locationLink;
  
  // Create map iframe
  const mapHTML = `
    <div class="venue-map-wrapper">
      <iframe 
        class="venue-map-iframe"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="${mapUrl}">
      </iframe>
    </div>
  `;
  
  mapContainer.innerHTML = mapHTML;
}

// Toggle fullscreen map
window.toggleFullscreenMap = function(button) {
  const mapWrapper = button.closest('.venue-map-wrapper');
  if (!mapWrapper) return;
  
  if (!document.fullscreenElement) {
    mapWrapper.requestFullscreen().catch(err => {
      console.error('Error attempting to enable fullscreen:', err);
    });
    button.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    `;
  } else {
    document.exitFullscreen();
    button.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
      </svg>
    `;
  }
};

// Hero Landing Scroll Functionality (Mobile Only)
document.addEventListener('DOMContentLoaded', function() {
  const heroScrollBtn = document.getElementById('hero-scroll-btn');
  const eventsSection = document.getElementById('events');
  
  if (heroScrollBtn && eventsSection) {
    heroScrollBtn.addEventListener('click', function() {
      eventsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
  
  if (window.innerWidth <= 768) {
    window.scrollTo(0, 0);
  }
});

