export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Plan Your Next Adventure with AI ✈️
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Flights, hotels, activities — your entire trip, personalized for you by AI.
        </p>
        
        {/* Primary CTA Button */}
        <div className="mb-8">
          <a
            href="/ai-buddy"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold px-12 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Plan My Trip
          </a>
        </div>
        
        {/* Secondary Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/my-trips"
            className="bg-white text-gray-700 font-medium px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
          >
            My Trips
          </a>
          <a
            href="/community"
            className="bg-white text-gray-700 font-medium px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
          >
            Community
          </a>
        </div>
      </div>
    </div>
  );
}