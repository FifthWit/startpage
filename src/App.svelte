<script lang="ts">
  import { data } from "./data";
  import Box from "./components/box.svelte";
  import Search from "./components/search.svelte";
  const username = "Fifth"

  let time = $state('');
  let timeMessage = $state('');

  function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (hours >= 6 && hours < 12) {
      timeMessage = 'Good Morning';
    } else if (hours >= 12 && hours < 18) {
      timeMessage = 'Good Afternoon';
    } else {
      timeMessage = 'Good Night';
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
  
</script>

<main class="h-screen w-screen flex flex-col justify-center items-center">
  <div class="flex flex-row justify-center items-center gap-8 mb-16">
    <h1 class="text-4xl font-bold text-white">{time}</h1>
    <div class="w-fit text-center font-bold text-4xl">
      <h1 class="text-white">{timeMessage}</h1>
      <div class="h-2 bg-white my-1"></div>
      <h1 class="text-white">{username}</h1>
    </div>
  </div>
  
  <div class="flex flex-col gap-1">
    <Search />
    <div class="grid grid-cols-3 gap-8">
      {#each Object.entries(data) as [category, items]}
        <p class="text-center text-neutral-300 capitalize">{category}</p>
      {/each}
    </div>
    
    <div class="grid grid-cols-3 gap-8">
      {#each Object.entries(data) as [category, items]}
        <div class="flex flex-col gap-8">
          {#each items as item}
            <Box {item} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</main>