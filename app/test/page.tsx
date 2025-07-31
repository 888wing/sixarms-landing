export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Tailwind CSS Test</h1>
      <p className="text-light-gray mb-8">Testing if Tailwind classes are working properly.</p>
      
      <div className="space-y-4">
        <div className="bg-dark-gray p-4 rounded-lg">
          <p>Dark Gray Background</p>
        </div>
        
        <div className="bg-medium-gray p-4 rounded-lg">
          <p>Medium Gray Background</p>
        </div>
        
        <button className="bg-accent text-white px-6 py-3 rounded-full hover:bg-accent-light transition-colors">
          Accent Button
        </button>
        
        <button className="bg-success text-white px-6 py-3 rounded-full hover:opacity-80 transition-opacity">
          Success Button
        </button>
        
        <div className="bg-gradient-primary p-8 rounded-lg">
          <p>Gradient Background</p>
        </div>
      </div>
    </div>
  )
}