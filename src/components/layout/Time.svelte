<script lang="ts">
    let hours = $state("");
    let minutes = $state("");
    let seconds = $state("");

    const formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/London",
    });

    function updateTime() {
        const parts = formatter.formatToParts(new Date());
        hours = parts.find((part) => part.type === "hour")?.value || "00";
        minutes = parts.find((part) => part.type === "minute")?.value || "00";
        seconds = parts.find((part) => part.type === "second")?.value || "00";
    }

    $effect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    });
</script>

the time for me is {hours}:{minutes}:{seconds} UTC
