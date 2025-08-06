<script lang="ts">
  import type { Component } from 'svelte';
    import Google from './icons/google.svelte';
    import Wikipedia from './icons/wikipedia.svelte';
    import { GithubIcon, Youtube, } from 'lucide-svelte'
    let query = $state("")

    interface macro {
        name: string;
        syntax: () => string;
        icon?: Component | any
    }

    const macros: macro[] = [
        {
            name: '!default',
            syntax: () => `https://google.com/search?q=${query}`,
            icon: Google
        },
        {
            name: '!g',
            syntax: () => `https://github.com/search?q=${query}&type=repositories`,
            icon: GithubIcon
        },
        {
            name: '!w',
            syntax: () => `https://en.wikipedia.org/w/index.php?search=${query}`,
            icon: Wikipedia
        },
        {
            name: '!y',
            syntax: () => `https://www.youtube.com/results?search_query=${query}`,
            icon: Youtube
        }
    ]

    function getActiveMacro() {
        const activeMacro = macros.find(macro => 
            macro.name !== '!default' && query.startsWith(macro.name)
        );
        return activeMacro || macros.find(macro => macro.name === '!default');
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            const activeMacro = getActiveMacro();
            if (activeMacro) {
                let searchQuery = query;
                if (activeMacro.name !== '!default') {
                    searchQuery = query.slice(activeMacro.name.length).trim();
                }
                const originalQuery = query;
                query = searchQuery;
                const url = activeMacro.syntax();
                query = originalQuery;
                window.open(url, '_self');
            }
        }
    }

    const activeMacro = $derived(getActiveMacro());
</script>

<div class="flex items-center shadow-2xl mb-4">
    <input 
        type="text" 
        bind:value={query}
        onkeydown={handleKeydown}
        placeholder="Search..."
        class="px-4 py-3 bg-neutral-800 text-white placeholder-white/50 border-none outline-none rounded-l-lg backdrop-blur-sm flex-1 min-w-0"
    />
    <div class="*:text-neutral-400 bg-neutral-900 px-3 py-3 rounded-r-lg backdrop-blur-sm flex items-center justify-center w-12 h-12">
        {#if activeMacro}
            {@const IconComponent = activeMacro.icon}
            <IconComponent class="w-6 h-6 text-white flex-shrink-0" />
        {/if}
    </div>
</div>