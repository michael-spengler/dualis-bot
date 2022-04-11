<script>
  //***IMPORTS***
  import Link from "svelte-routing/Link.svelte";
  import { navigate } from "svelte-routing";
  import { jwt, BACKEND_SERVER } from "../stores.js";
  import { onMount } from 'svelte';

  //***VARIABLES***
  var username = "";
  var password = "";
  var incorrect = false;

  //***EVENTS***
  onMount(async () => {
        // Get the input field
        var input = document.getElementById("passwordInput");

        // Execute a function when the user releases a key on the keyboard
        input.addEventListener("keyup", function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("loginBtn").click();
          }
        });
	});

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
          jwt.set(res.jwt)
          navigate("/config", { replace: false });
        }else{
          incorrect = true;
        }
      })
      .catch(error => {
        return [];
      });
  }

</script>

{#each [...[]] as _}
<div _/>
{:else}

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
        <input id="passwordInput" type="password" on:input={() => incorrect = false} bind:value={password} placeholder="Passwort"/>
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
      <button id="loginBtn" class="rButton" on:click={login}>Anmelden</button>
    </div>
  </div>
</div>
<footer style="margin-bottom: 15px;">
  <Link to="login">Login</Link> <span>|</span>
  <Link to="about">About</Link> <span>|</span>
  <Link to="register">Register</Link>
</footer>

{/each}