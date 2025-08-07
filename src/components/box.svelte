<script lang="ts">
    interface itemProps {
        name: string,
        link: string,
        img: string
    }
    export let item: itemProps;
</script>

<a href={item.link} class="w-24 h-24 text-center flex flex-col items-center justify-center bg-neutral-800 shadow-lg overflow-hidden p-1 hover:scale-110 transition-all">
    <img class="h-8 w-8 object-contain mb-1" src={item.img} alt="">
    <p class="text-neutral-500 text-xs truncate w-full">{item.name}</p>
</a>