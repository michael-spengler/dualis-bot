<script>
  //***IMPORTS***
  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";
  import { navigate } from "svelte-routing";

  //import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env

  //***VARIABLES***
  var username = "";
  var password = "";
  var incorrect = false;

  //***FUNCTIONS***
  async function login() {
    //const loginCall = Deno.env.get("BACKEND_SERVER") + "/login"
    const loginCall = "http://localhost:4000/api/v1/login"
    const loginData = {
      "username": username, 
      "password": password
    }
    await fetch(loginCall, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 
          'Access-Control-Allow-Origin': true,
          'accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(loginData)
      })
      .then(response => {
        console.log(response)
        if(response.status==200){
          navigate("/config", { replace: true });
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

<div class="border">
  <div class="center">
    <h1>Login</h1>
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

<style>
  .center {
    margin: auto;
    width: 350px;
    padding: 10px;
    text-align: center;
  }
  .border {
    border: 3px solid #222222;
  }
  .rButton {
    background: #E30613;
    color: #FFFFFF;
    margin-top: 10px;
  }
  .warning {
    color: #E30613
  }
</style>
