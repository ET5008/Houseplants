import SearchBar from './components/SearchBar/SearchBar'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center pt-8 text-green-800">
          House Plant Encyclopedia
        </h1>

        <SearchBar />

        {/* Recent searches  */}
        {/* Most popular */}
      </div>
    </div>
  )
}

export default App
