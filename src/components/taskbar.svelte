<script lang="ts">
    import Rss from "./taskItems/rss.svelte";
    import Mail from "./taskItems/mail.svelte";
    import Chatbot from "./taskItems/chatbot.svelte";

</script>

<div class="px-2 flex flex-row items-center justify-between fixed top-0 left-1/2 transform -translate-x-1/2 w-fit h-8 bg-neutral-800 border border-t-0 border-neutral-700 rounded-b-xl">
    <Rss />
    <Chatbot />
    <Mail />
</div>