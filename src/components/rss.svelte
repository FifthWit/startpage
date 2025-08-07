<script lang="ts">
    import { Rss, X, RefreshCw } from 'lucide-svelte';
    
    interface RSSItem {
        title: string;
        link: string;
        pubDate: string;
        description?: string;
    }

    const rssURL = 'https://act.eff.org/action.atom';
    
    let rssItems = $state<RSSItem[]>([]);
    let loading = $state(false);
    let error = $state('');
    let dialog: HTMLDialogElement;

    async function fetchRSS() {
        try {
            loading = true;
            error = '';
            const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(rssURL)}`;
            const response = await fetch(proxyURL);
            const data = await response.json();
            
            let xmlContent = data.contents;
            if (xmlContent.startsWith('data:application/atom+xml; charset=utf-8;base64,')) {
                const base64Content = xmlContent.split(',')[1];
                xmlContent = atob(base64Content);
            }
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
            const entries = xmlDoc.querySelectorAll('entry');
            
            rssItems = Array.from(entries).slice(0, 8).map(entry => ({
                title: entry.querySelector('title')?.textContent || '',
                link: entry.querySelector('link')?.getAttribute('href') || '',
                pubDate: entry.querySelector('published')?.textContent || entry.querySelector('updated')?.textContent || '',
                description: entry.querySelector('summary')?.textContent || entry.querySelector('content')?.textContent || ''
            }));
        } catch (err) {
            error = 'Failed to load RSS feed';
            console.error('RSS fetch error:', err);
        } finally {
            loading = false;
        }
    }

    function formatDate(dateString: string): string {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return '';
        }
    }

    function truncateText(text: string, maxLength: number = 120): string {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    function openDialog() {
        if (rssItems.length === 0) {
            fetchRSS();
        }
        dialog.showModal();
    }

    function closeDialog() {
        dialog.close();
    }
    function handleDialogClick(event: MouseEvent) {
        if (event.target === dialog) {
            closeDialog();
        }
    }
</script>

<!-- RSS Icon Button for Taskbar -->
<button
    onclick={openDialog}
    class="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
    title="EFF RSS Feed"
>
    <Rss size={20} />
</button>

<!-- Native Dialog -->
<dialog 
    bind:this={dialog}
    onclick={handleDialogClick}
    class="backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-transparent p-0 max-w-2xl w-full max-h-[80vh] rounded-xl m-auto"
>
    <div class="bg-neutral-900/95 backdrop-blur-md border border-neutral-700/50 rounded-xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-neutral-700/50">
            <div class="flex items-center gap-3">
                <div class="p-2 bg-orange-500/20 rounded-lg">
                    <Rss size={20} class="text-orange-400" />
                </div>
                <div>
                    <h2 class="text-xl font-semibold text-white">EFF Actions</h2>
                    <p class="text-sm text-neutral-400">Latest updates from Electronic Frontier Foundation</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button
                    onclick={fetchRSS}
                    disabled={loading}
                    class="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-200 disabled:opacity-50"
                    title="Refresh"
                >
                    <RefreshCw size={16} class={loading ? 'animate-spin' : ''} />
                </button>
                <button
                    onclick={closeDialog}
                    class="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                    title="Close"
                >
                    <X size={16} />
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto max-h-[60vh]">
            {#if loading && rssItems.length === 0}
                <div class="space-y-4">
                    {#each Array(5) as _}
                        <div class="animate-pulse">
                            <div class="h-5 bg-neutral-700/50 rounded mb-3"></div>
                            <div class="h-4 bg-neutral-800/50 rounded w-3/4 mb-2"></div>
                            <div class="h-3 bg-neutral-800/30 rounded w-1/2"></div>
                        </div>
                    {/each}
                </div>
            {:else if error}
                <div class="text-center py-12">
                    <div class="p-3 bg-red-500/20 rounded-lg inline-block mb-4">
                        <Rss size={24} class="text-red-400" />
                    </div>
                    <p class="text-red-400 font-medium mb-2">Failed to load RSS feed</p>
                    <p class="text-neutral-400 text-sm mb-4">Please check your connection and try again</p>
                    <button
                        onclick={fetchRSS}
                        class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-200"
                    >
                        Retry
                    </button>
                </div>
            {:else if rssItems.length > 0}
                <div class="space-y-4">
                    {#each rssItems as item, index}
                        <article class="group">
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="block p-4 hover:bg-neutral-800/30 rounded-lg transition-all duration-200 border border-transparent hover:border-neutral-700/50"
                            >
                                <div class="flex items-start justify-between gap-4 mb-2">
                                    <h3 class="text-white font-medium group-hover:text-blue-300 transition-colors duration-200 leading-tight">
                                        {item.title}
                                    </h3>
                                    {#if item.pubDate}
                                        <span class="text-neutral-500 text-xs whitespace-nowrap bg-neutral-800/50 px-2 py-1 rounded">
                                            {formatDate(item.pubDate)}
                                        </span>
                                    {/if}
                                </div>
                                {#if item.description}
                                    <p class="text-neutral-400 text-sm leading-relaxed">
                                        {truncateText(item.description.replace(/<[^>]*>/g, ''), 150)}
                                    </p>
                                {/if}
                            </a>
                            {#if index < rssItems.length - 1}
                                <div class="border-b border-neutral-800/50 mt-4"></div>
                            {/if}
                        </article>
                    {/each}
                </div>
            {:else}
                <div class="text-center py-12">
                    <div class="p-3 bg-neutral-700/20 rounded-lg inline-block mb-4">
                        <Rss size={24} class="text-neutral-500" />
                    </div>
                    <p class="text-neutral-500 font-medium">No RSS items found</p>
                </div>
            {/if}
        </div>
    </div>
</dialog>

<style>
    dialog {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>