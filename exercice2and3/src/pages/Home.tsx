import Counter from '../components/Counter'

function Home() {
  return (
    <div className="mt-10 text-center home">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4">This is a simple homepage created with React and Tailwind CSS.</p>

      <div className="flex justify-center mt-8">
        <Counter />
      </div>
    </div>
  )
}

export default Home
