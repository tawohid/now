import useFetch from 'react-fetch-hook'

const App = () => {
  const { isLoading, data, error} = useFetch("/current");
  const current = data as any;
  return (
    <>
      <h1>What is Khalid doing right now?</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <h3>{current.description}</h3>}
      {data && <p>{current.durationH}h - {current.durationM}m - {current.durationS}s</p>}

    </>

  )

};
export default App
