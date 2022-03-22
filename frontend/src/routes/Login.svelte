<script>
  //***IMPORTS***
  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";
  import { navigate } from "svelte-routing";
  import { jwt, BACKEND_SERVER } from "../stores.js";

  //***VARIABLES***
  var username = "";
  var password = "";
  var incorrect = false;

  //***FUNCTIONS***
  async function login() {
    const loginCall = BACKEND_SERVER + "/login"
    const loginData = {
      "username": username, 
      "password": password
    }
    await fetch(loginCall, {
        method: 'POST',
        headers: { 
          'Access-Control-Allow-Origin': true,
          'accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(loginData)
      })
      .then(async response => { 
        if(response.status==200){
          const res = await response.json()
          console.log(res.jwt)
          jwt.set(res.jwt)
          navigate("/config", { replace: false });
        }else{
          incorrect = true;
        }
      })
      .catch(error => {
        console.log(error);
        return [];
      });
  }

</script>

<div class="outer">
  <div class="middle">
    <div class="inner">
      <h1>Anmeldung</h1>
      <hr/>
      <p>
        Gib hier deine Anmeldedaten für den Dualis-Bot ein.
      </p>
      <div>
        <input on:input={() => incorrect = false} bind:value={username} placeholder="Benutzername"/>
        <input type="password" on:input={() => incorrect = false} bind:value={password} placeholder="Passwort"/>
      </div>
      {#if incorrect}
        <p class="warning">
          Benutzername oder Passwort falsch!
        </p>
      {/if}
      <nav>
        <Link to="register">Registrieren</Link>
      </nav>
      <nav>
        <a href="https://dualis.dhbw.de/">Hier gehts zu Dualis</a>
      </nav>
      <button class="rButton" on:click={login}>Anmelden</button>
    </div>
  </div>
</div>
