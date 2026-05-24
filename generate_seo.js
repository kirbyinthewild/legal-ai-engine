const fs = require('fs');
const path = require('path');

const cities = [
    { name: "New York", state: "NY" }, { name: "Los Angeles", state: "CA" }, { name: "Chicago", state: "IL" },
    { name: "Houston", state: "TX" }, { name: "Phoenix", state: "AZ" }, { name: "Philadelphia", state: "PA" },
    { name: "San Antonio", state: "TX" }, { name: "San Diego", state: "CA" }, { name: "Dallas", state: "TX" },
    { name: "Austin", state: "TX" }, { name: "Jacksonville", state: "FL" }, { name: "San Jose", state: "CA" },
    { name: "Fort Worth", state: "TX" }, { name: "Columbus", state: "OH" }, { name: "Charlotte", state: "NC" },
    { name: "Indianapolis", state: "IN" }, { name: "San Francisco", state: "CA" }, { name: "Seattle", state: "WA" },
    { name: "Denver", state: "CO" }, { name: "Oklahoma City", state: "OK" }, { name: "Nashville", state: "TN" },
    { name: "El Paso", state: "TX" }, { name: "Washington", state: "DC" }, { name: "Las Vegas", state: "NV" },
    { name: "Boston", state: "MA" }, { name: "Portland", state: "OR" }, { name: "Louisville", state: "KY" },
    { name: "Memphis", state: "TN" }, { name: "Detroit", state: "MI" }, { name: "Baltimore", state: "MD" },
    { name: "Milwaukee", state: "WI" }, { name: "Albuquerque", state: "NM" }, { name: "Tucson", state: "AZ" },
    { name: "Fresno", state: "CA" }, { name: "Sacramento", state: "CA" }, { name: "Kansas City", state: "MO" },
    { name: "Mesa", state: "AZ" }, { name: "Atlanta", state: "GA" }, { name: "Omaha", state: "NE" },
    { name: "Colorado Springs", state: "CO" }, { name: "Raleigh", state: "NC" }, { name: "Long Beach", state: "CA" },
    { name: "Virginia Beach", state: "VA" }, { name: "Oakland", state: "CA" }, { name: "Minneapolis", state: "MN" },
    { name: "Tulsa", state: "OK" }, { name: "Arlington", state: "TX" }, { name: "Tampa", state: "FL" },
    { name: "New Orleans", state: "LA" }, { name: "Wichita", state: "KS" },
    { name: "Cleveland", state: "OH" }, { name: "Bakersfield", state: "CA" }, { name: "Aurora", state: "CO" },
    { name: "Anaheim", state: "CA" }, { name: "Honolulu", state: "HI" }, { name: "Santa Ana", state: "CA" },
    { name: "Riverside", state: "CA" }, { name: "Corpus Christi", state: "TX" }, { name: "Lexington", state: "KY" },
    { name: "Henderson", state: "NV" }, { name: "Stockton", state: "CA" }, { name: "Saint Paul", state: "MN" },
    { name: "Cincinnati", state: "OH" }, { name: "St. Louis", state: "MO" }, { name: "Pittsburgh", state: "PA" },
    { name: "Greensboro", state: "NC" }, { name: "Lincoln", state: "NE" }, { name: "Anchorage", state: "AK" },
    { name: "Plano", state: "TX" }, { name: "Orlando", state: "FL" }, { name: "Irvine", state: "CA" },
    { name: "Newark", state: "NJ" }, { name: "Durham", state: "NC" }, { name: "Chula Vista", state: "CA" },
    { name: "Toledo", state: "OH" }, { name: "Fort Wayne", state: "IN" }, { name: "St. Petersburg", state: "FL" },
    { name: "Laredo", state: "TX" }, { name: "Jersey City", state: "NJ" }, { name: "Chandler", state: "AZ" },
    { name: "Madison", state: "WI" }, { name: "Lubbock", state: "TX" }, { name: "Scottsdale", state: "AZ" },
    { name: "Reno", state: "NV" }, { name: "Buffalo", state: "NY" }, { name: "Gilbert", state: "AZ" },
    { name: "Glendale", state: "AZ" }, { name: "North Las Vegas", state: "NV" }, { name: "Winston-Salem", state: "NC" },
    { name: "Chesapeake", state: "VA" }, { name: "Norfolk", state: "VA" }, { name: "Fremont", state: "CA" },
    { name: "Garland", state: "TX" }, { name: "Irving", state: "TX" }, { name: "Hialeah", state: "FL" },
    { name: "Richmond", state: "VA" }, { name: "Boise", state: "ID" }, { name: "Spokane", state: "WA" },
    { name: "Baton Rouge", state: "LA" }, { name: "Tacoma", state: "WA" }, { name: "San Bernardino", state: "CA" },
    { name: "Modesto", state: "CA" }, { name: "Fontana", state: "CA" }, { name: "Des Moines", state: "IA" },
    { name: "Moreno Valley", state: "CA" }, { name: "Santa Clarita", state: "CA" }, { name: "Fayetteville", state: "NC" },
    { name: "Birmingham", state: "AL" }, { name: "Oxnard", state: "CA" }, { name: "Rochester", state: "NY" },
    { name: "Huntington Beach", state: "CA" }, { name: "Salt Lake City", state: "UT" }, { name: "Grand Rapids", state: "MI" },
    { name: "Amarillo", state: "TX" }, { name: "Yonkers", state: "NY" }, { name: "Montgomery", state: "AL" },
    { name: "Columbus", state: "GA" }, { name: "Augusta", state: "GA" }, { name: "Worcester", state: "MA" },
    { name: "Little Rock", state: "AR" }, { name: "Akron", state: "OH" }, { name: "Tempe", state: "AZ" },
    { name: "Huntsville", state: "AL" }, { name: "Tallahassee", state: "FL" }, { name: "Overland Park", state: "KS" },
    { name: "Knoxville", state: "TN" }, { name: "Grand Prairie", state: "TX" }, { name: "Brownsville", state: "TX" },
    { name: "Mobile", state: "AL" }, { name: "Newport News", state: "VA" }, { name: "Shreveport", state: "LA" },
    { name: "Providence", state: "RI" }, { name: "Fort Lauderdale", state: "FL" }, { name: "Chattanooga", state: "TN" },
    { name: "Cape Coral", state: "FL" }, { name: "Santa Rosa", state: "CA" }, { name: "Oceanside", state: "CA" },
    { name: "Rancho Cucamonga", state: "CA" }, { name: "Port St. Lucie", state: "FL" }, { name: "Ontario", state: "CA" },
    { name: "Vancouver", state: "WA" }, { name: "Temecula", state: "CA" }, { name: "Springfield", state: "MO" },
    { name: "Lancaster", state: "CA" }, { name: "Pembroke Pines", state: "FL" }, { name: "Salem", state: "OR" },
    { name: "Eugene", state: "OR" }, { name: "Peoria", state: "AZ" }, { name: "Sioux Falls", state: "SD" },
    { name: "Corona", state: "CA" }, { name: "Elk Grove", state: "CA" }, { name: "Palmdale", state: "CA" },
    { name: "Fort Collins", state: "CO" }, { name: "Jackson", state: "MS" }, { name: "Cary", state: "NC" },
    { name: "Garden Grove", state: "CA" }, { name: "Bellevue", state: "WA" }, { name: "Hayward", state: "CA" },
    { name: "Pasadena", state: "TX" }, { name: "Paterson", state: "NJ" }, { name: "Salinas", state: "CA" },
    { name: "Sunnyvale", state: "CA" }, { name: "Charleston", state: "SC" }, { name: "Escondido", state: "CA" },
    { name: "Bridgeport", state: "CT" }, { name: "Alexandria", state: "VA" }, { name: "McAllen", state: "TX" },
    { name: "Surprise", state: "AZ" }, { name: "Denton", state: "TX" }, { name: "Hollywood", state: "FL" },
    { name: "Visalia", state: "CA" }, { name: "Pomona", state: "CA" }, { name: "Joliet", state: "IL" },
    { name: "Roseville", state: "CA" }, { name: "Torrance", state: "CA" }, { name: "Rockford", state: "IL" },
    { name: "Lancaster", state: "TX" }, { name: "Fullerton", state: "CA" }, { name: "Mesquite", state: "TX" },
    { name: "McKinney", state: "TX" }, { name: "Savannah", state: "GA" }, { name: "Midland", state: "TX" },
    { name: "Frisco", state: "TX" }, { name: "Olathe", state: "KS" }, { name: "Thornton", state: "CO" },
    { name: "Carrollton", state: "TX" }, { name: "Waco", state: "TX" }, { name: "Orange", state: "CA" },
    { name: "Gresham", state: "OR" }, { name: "Killeen", state: "TX" }, { name: "Dayton", state: "OH" },
    { name: "Ann Arbor", state: "MI" }, { name: "Stamford", state: "CT" }, { name: "Pueblo", state: "CO" },
    { name: "Murrieta", state: "CA" }, { name: "Fargo", state: "ND" }, { name: "Norman", state: "OK" },
    { name: "Westminster", state: "CO" }, { name: "Everett", state: "WA" }, { name: "Athens", state: "GA" },
    { name: "Palm Bay", state: "FL" }, { name: "College Station", state: "TX" }, { name: "Burbank", state: "CA" },
    { name: "Lansing", state: "MI" }, { name: "Beaumont", state: "TX" }, { name: "Independence", state: "MO" },
    { name: "Provo", state: "UT" }, { name: "Arvada", state: "CO" }, { name: "Simi Valley", state: "CA" },
    { name: "Carlsbad", state: "CA" }, { name: "Fairfield", state: "CA" }, { name: "South Bend", state: "IN" },
    { name: "Murfreesboro", state: "TN" }, { name: "Berkeley", state: "CA" }, { name: "Gaithesburg", state: "MD" },
    { name: "Billings", state: "MT" }, { name: "Broken Arrow", state: "OK" }, { name: "Pearland", state: "TX" },
    { name: "High Point", state: "NC" }, { name: "Richardson", state: "TX" }, { name: "Clearwater", state: "FL" },
    { name: "West Jordan", state: "UT" }, { name: "West Covina", state: "CA" }, { name: "Sparks", state: "NV" },
    { name: "Lewisville", state: "TX" }, { name: "Rio Rancho", state: "NM" }, { name: "Tyler", state: "TX" },
    { name: "Davenport", state: "IA" }, { name: "Inglewood", state: "CA" }, { name: "Round Rock", state: "TX" },
    { name: "Sugar Land", state: "TX" }, { name: "Greeley", state: "CO" }, { name: "Waterbury", state: "CT" },
    { name: "Cambridge", state: "MA" }, { name: "League City", state: "TX" }, { name: "Allen", state: "TX" },
    { name: "San Angelo", state: "TX" }, { name: "Meridian", state: "ID" }, { name: "Edinburg", state: "TX" },
    { name: "Mission Viejo", state: "CA" }, { name: "Compton", state: "CA" }, { name: "Nampa", state: "ID" },
    { name: "Concord", state: "NC" }, { name: "Clovis", state: "CA" }, { name: "Bend", state: "OR" },
    { name: "Tuscaloosa", state: "AL" }, { name: "Palm Coast", state: "FL" }, { name: "New Braunfels", state: "TX" },
    { name: "Menifee", state: "CA" }, { name: "Wichita Falls", state: "TX" }, { name: "Gainesville", state: "FL" },
    { name: "Sandy Springs", state: "GA" }, { name: "Chico", state: "CA" }, { name: "Longview", state: "TX" },
    { name: "Vacaville", state: "CA" }, { name: "San Marcos", state: "CA" }, { name: "Avondale", state: "AZ" },
    { name: "Lee's Summit", state: "MO" }, { name: "Goodyear", state: "AZ" }, { name: "Indio", state: "CA" },
    { name: "Fishers", state: "IN" }, { name: "Hialeah Gardens", state: "FL" }, { name: "San Mateo", state: "CA" }, 
    { name: "Carson", state: "CA" }, { name: "Santa Monica", state: "CA" }, { name: "Newton", state: "MA" }, 
    { name: "St. Cloud", state: "MN" }, { name: "San Tan Valley", state: "AZ" }, { name: "Bloomington", state: "IL" }, 
    { name: "Medford", state: "OR" }, { name: "Dothan", state: "AL" }, { name: "Mount Pleasant", state: "SC" }, 
    { name: "Champaign", state: "IL" }, { name: "Livermore", state: "CA" }, { name: "O'Fallon", state: "MO" }, 
    { name: "Yuma", state: "AZ" }, { name: "Chino", state: "CA" }, { name: "San Ramon", state: "CA" }, 
    { name: "Pharr", state: "TX" }, { name: "Lynwood", state: "CA" }, { name: "Redwood City", state: "CA" }, 
    { name: "Mountain View", state: "CA" }, { name: "Alameda", state: "CA" }, { name: "Perris", state: "CA" }, 
    { name: "Hemet", state: "CA" }, { name: "Buckeye", state: "AZ" }, { name: "Tustin", state: "CA" }, 
    { name: "Union City", state: "CA" }, { name: "Baldwin Park", state: "CA" }, { name: "South Gate", state: "CA" }, 
    { name: "Upland", state: "CA" }, { name: "Apple Valley", state: "CA" }, { name: "Lake Elsinore", state: "CA" }, 
    { name: "Santa Barbara", state: "CA" }, { name: "San Juan", state: "TX" }, { name: "Deltona", state: "FL" }, 
    { name: "Bolingbrook", state: "IL" }, { name: "Skokie", state: "IL" }, { name: "Edison", state: "NJ" }, 
    { name: "Woodbridge", state: "NJ" }, { name: "Lakewood", state: "NJ" }, { name: "Troy", state: "MI" }, 
    { name: "Farmington Hills", state: "MI" }, { name: "Grand Junction", state: "CO" }, { name: "Fort Smith", state: "AR" }, 
    { name: "Gulfport", state: "MS" }, { name: "Biloxi", state: "MS" }, { name: "Bozeman", state: "MT" }, 
    { name: "Casper", state: "WY" }, { name: "Cheyenne", state: "WY" }, { name: "Laramie", state: "WY" },
    { name: "Honolulu", state: "HI" }, { name: "Hilo", state: "HI" }, { name: "Kailua", state: "HI" },
    { name: "Anchorage", state: "AK" }, { name: "Fairbanks", state: "AK" }, { name: "Juneau", state: "AK" },
    { name: "Sioux City", state: "IA" }, { name: "Waterloo", state: "IA" }, { name: "Ames", state: "IA" },
    { name: "Council Bluffs", state: "IA" }, { name: "Dubuque", state: "IA" }, { name: "Ankeny", state: "IA" },
    { name: "West Des Moines", state: "IA" }, { name: "Iowa City", state: "IA" }, { name: "Bozeman", state: "MT" },
    { name: "Missoula", state: "MT" }, { name: "Great Falls", state: "MT" }, { name: "Helena", state: "MT" },
    { name: "Kalispell", state: "MT" }, { name: "Butte", state: "MT" }, { name: "Billings", state: "MT" },
    { name: "Fargo", state: "ND" }, { name: "Bismarck", state: "ND" }, { name: "Grand Forks", state: "ND" },
    { name: "Minot", state: "ND" }, { name: "West Fargo", state: "ND" }, { name: "Dickinson", state: "ND" },
    { name: "Williston", state: "ND" }, { name: "Sioux Falls", state: "SD" }, { name: "Rapid City", state: "SD" },
    { name: "Aberdeen", state: "SD" }, { name: "Brookings", state: "SD" }, { name: "Watertown", state: "SD" },
    { name: "Mitchell", state: "SD" }, { name: "Yankton", state: "SD" }, { name: "Pierre", state: "SD" }
];

const template = (city, state) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Top Rated Car Accident Help in ${city}, ${state} | 24/7 Evaluation</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50">
    <nav class="p-6 bg-white shadow-sm">
        <div class="max-w-6xl mx-auto font-bold text-blue-600 text-xl">AI Legal Intake ${city}</div>
    </nav>
    <div class="max-w-4xl mx-auto py-16 px-4">
        <h1 class="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Involved in a collision in <span class="text-blue-600">${city}?</span> Get an instant case evaluation.
        </h1>
        <p class="text-xl text-slate-600 mb-10">
            Don't wait for a callback. Our AI specialist can review your ${city}, ${state} accident details right now and tell you if you have a claim.
        </p>
        
        <div class="bg-white p-10 rounded-2xl shadow-xl border border-slate-200">
            <h2 class="text-2xl font-bold mb-6 text-slate-800">Start Your Free Evaluation</h2>
            <form action="/api/evaluate" method="POST" class="space-y-6">
                <input type="hidden" name="location" value="${city}, ${state}">
                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input type="text" name="name" required class="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">Describe the Incident</label>
                    <textarea name="description" required rows="4" class="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition" placeholder="Tell us what happened..."></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white text-lg font-bold py-5 rounded-xl hover:bg-blue-700 hover:scale-[1.02] transition shadow-lg shadow-blue-200">
                    Submit for Instant AI Review
                </button>
            </form>
        </div>
    </div>
    <footer class="py-10 text-center text-slate-400 text-sm">
        © 2024 AI Case Evaluation Service - Serving ${city}, ${state}
    </footer>
</body>
</html>
`;

const outputDir = path.join(__dirname, 'locations'); // Remove 'public' from here
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

cities.forEach(city => {
    const fileName = `${city.name.toLowerCase().replace(/ /g, '-')}-${city.state.toLowerCase()}.html`;
    const content = template(city.name, city.state);
    fs.writeFileSync(path.join(outputDir, fileName), content);
    console.log(`Generated: ${fileName}`);
});
