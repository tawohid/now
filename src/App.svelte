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
    text-align: center;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
