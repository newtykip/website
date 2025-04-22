<script lang="ts" module>
    export async function updateDonation() {
        let newDonation: Donation | undefined = undefined;
        if (import.meta.env.PROD) {
            newDonation = await fetchApi<Donation>("donation");
        }
        if (!newDonation) {
            newDonation = DUMMY_DONATION;
        }
        donation.set(newDonation);
    }
</script>

<script lang="ts">
    import type { Donation } from "@/api/donation";
    import { DUMMY_DONATION } from "@/consts";
    import donation from "@/stores/donation";
    import { fetchApi } from "@/utils";
</script>

{#if $donation !== undefined}
    <a
        href={`https://ko-fi.com/home/coffeeshop?txid=${$donation?.id}`}
        class="text-text hover:!text-peach"
    >
        {$donation?.name} ({$donation?.currency}{$donation?.amount})
    </a>
{:else}
    loading...
{/if}
