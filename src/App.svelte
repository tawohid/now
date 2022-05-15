<script lang="ts">
  import Current from './lib/Current.svelte'
</script>

<main>
  <h1>What is Khalid doing right now?</h1>
  <Current />
</main>
<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

</style>
