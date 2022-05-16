<script lang="ts">
import { onMount } from "svelte";

  let currentData: any;
  let durationString: string;

  const getCurrent = async () => {
    try {
      const response = await fetch('/current')
      console.log("Got new data")
      currentData = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  const getDuration = (inputDuration: number) => {
    const duration = Date.now() / 1000 + inputDuration
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = Math.floor(duration % 60)
    durationString = `${hours}h ${minutes}m ${seconds}s`
  }

  onMount(async () => {
    await getCurrent()
    getDuration(currentData.duration)

    setInterval(() => {
        getDuration(currentData.duration)
    }, 1000)
    
    setInterval(() => {
      getCurrent()
      getDuration(currentData.duration)
    }, 100000)

  })

</script>

{#if currentData}

    {#if currentData.description === "Nothing"}
      <p>Absoloutley Nothing</p>
    {:else}
      <p>{currentData.project} / {currentData.description}</p>
      <p>{durationString}</p>
    {/if}
{:else}
    <p>Loading...</p>
{/if}

<style>
</style>
