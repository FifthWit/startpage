<script lang="ts">
    const chatbot = "https://kimi.com"
    import { BotMessageSquare } from "lucide-svelte"
</script>

<a href={chatbot}>
    <BotMessageSquare class="text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-200" />
</a>