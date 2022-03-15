<script>
    //***IMPORTS***
    import { jwt, BACKEND_SERVER } from "../stores.js";
    import Link from "svelte-routing/Link.svelte";
    import { onMount } from 'svelte';

    //***VARIABLES***
    let token = '';
    jwt.subscribe(value => {token = value})
    var user = '';

    //***FUNCTIONS***
    onMount(async () => {
        const userCall = BACKEND_SERVER + "/user";
		await fetch(userCall, {
        method: 'GET',
        headers: { 
          'Access-Control-Allow-Origin': true,
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'auth': token 
        }
      })
      .then(async response => { 
        if(response.status==200){
          const res = await response.json()
          user = res;
          console.log(user);
        }
      })
      .catch(error => {
        console.log(error);
        return [];
      });
	});
    
    function save () {

    }
</script>

{#if token != ''}
<div class="border">
    <div class="center">
      <h1>Konfiguration</h1>
      <hr/>
      <p>
        Passe deine Einstellungen an oder richte neue Kommunikationswege ein
      </p>
      <div>
        <input type=checkbox>
        Telegram
        <button>Anpassen</button>
      </div>
      <div>
        <input type=checkbox>
        Discord
        <button>Anpassen</button>
      </div>
      <div>
        <input type=checkbox>
        E-Mail
        <button>Anpassen</button>
      </div>
      <button class="rButton" on:click={save}>Speichern</button>
    </div>
</div>
{:else}
    <nav>
        <Link to="login">Login</Link>
    </nav>
{/if}