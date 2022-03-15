<script>
    import { jwt } from "../stores.js";
    import Link from "svelte-routing/Link.svelte";

    let token = '';
    jwt.subscribe(value => {token = value})
</script>

<h1>Konfiguration</h1>
{#if token != ''}
    <p>{token}</p>
{:else}
    <nav>
        <Link to="login">Bitte melde dich an bevor du deinen Bot regitrierst</Link>
    </nav>
{/if}