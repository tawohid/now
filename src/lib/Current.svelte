<script lang="ts">
  // fetch data from the server
  const getCurrent = (async () => {
    const response = await fetch('/current')
    const data = await response.json()
    return data
  })()


</script>

{#await getCurrent}
  <p> Loading... </p>
{:then data}
  <p>{data.project} / {data.description}</p>
  <p>{data.durationH}h - {data.durationM}m - {data.durationS}s</p>
{:catch error}
  <p>Error: {error}</p>
{/await}

<style>
</style>
