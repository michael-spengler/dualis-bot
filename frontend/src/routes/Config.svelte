<script>
    //***IMPORTS***
    import { jwt, BACKEND_SERVER } from "../stores.js";
    import Link from "svelte-routing/Link.svelte";
    import { onMount } from 'svelte';
    import { dialogs } from 'https://cdn.skypack.dev/svelte-dialogs';

    //***VARIABLES***
    let token;
    jwt.subscribe(value => {token = value})
    var telegramActive, discordActive, emailActive, telegramDisabled, discordDisabled, emailDisabled = false;
    var telegramID, discordID, emailID = '';
    var telegramPersonal, discordPersonal, emailPersonal = true;
    var user = '';

    //***DIALOGS***
    const telegramDialog= 
        `
            <div>
                <input placeholder="Chat ID" value=${telegramID}/>
                <input type="checkbox" label="Get Message with Grades" value=${telegramPersonal}/>
                <button class="rButton" on:click=${saveTelegram}>Speichern</button>
            </div>
        `;
    const discordDialog= 
        `
            <div>
                <input placeholder="Chat ID" value=${discordID}/>
                <input type="checkbox" label="Get Message with Grades" value=${discordPersonal}/>
                <button class="rButton" on:click=${saveDiscord}>Speichern</button>
            </div>
        `;
    const emailDialog=
        `
            <div>
                <input placeholder="E-Mail" value=${emailID}/>
                <input type="checkbox" label="Get Message with Grades" value=${emailPersonal}/>
                <button class="rButton" on:click=${saveEmail}>Speichern</button>
            </div>
        `;


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
          const res = await response.json()
          user = res;
          if (res.notifications.telegram == undefined) {
            telegramDisabled = true
          } else {
            telegramActive = res.notifications.telegram.active
            telegramID = res.notifications.telegram.notificationNumber
            telegramPersonal = res.notifications.telegram.withGrades
          }
          if (res.notifications.discord == undefined) {
            discordDisabled = true
          } else {
            discordActive = res.notifications.discord.active
            discordID = res.notifications.discord.notificationUsername //need to change after namechange
            discordPersonal = res.notifications.discord.withGrades
          }
          if (res.notifications.email == undefined) {
            emailDisabled = true
          } else {
            emailActive = res.notifications.email.active
            emailID = res.notifications.email.notificationEmail
            emailPersonal = res.notifications.email.withGrades
          }
          console.log(user);
      })
      .catch(error => {
        console.log(error);
        return [];
      });
	});
    function save () {

    }
    function saveDiscord () {

    }
    function saveEmail () {

    }
    function saveTelegram () {

    }
</script>

{#if token != undefined}
<div class="border">
    <div class="center">
      <h1>Konfiguration</h1>
      <hr/>
      <p>
        Passe deine Einstellungen an oder richte neue Kommunikationswege ein
      </p>
      <div style="text-align: left; margin-top: 40px">	
        <div style="padding-bottom: 20px">
            <input type="checkbox" disabled={telegramDisabled} checked={telegramActive}/>
            <span>Telegram</span>
            <button class="gButton right" on:click={() => dialogs.modal(telegramDialog)}>
                {#if !telegramDisabled}
                    Anpassen
                {:else}
                    Konfigurieren
                {/if}
            </button>
        </div>
        <div style="padding-bottom: 20px">
            <input type="checkbox" disabled={discordDisabled} checked={discordActive} design="slider"/>
            <span>Discord</span>
            <button class="gButton right" on:click={() => dialogs.modal(discordDialog)}>
                {#if !discordDisabled}
                    Anpassen
                {:else}
                    Konfigurieren
                {/if}
            </button>
        </div>
        <div style="padding-bottom: 20px">
            <input type="checkbox" disabled={emailDisabled} checked={emailActive} design="slider"/>
            <span>E-Mail</span>
            <button class="gButton right" on:click={() => dialogs.modal(emailDialog)}>
                {#if !emailDisabled}
                    Anpassen
                {:else}
                    Konfigurieren
                {/if}
            </button>  
        </div>
      </div>
      <button class="rButton" on:click={save}>Speichern</button>
    </div>
</div>
{:else}
    <nav>
        <Link to="login">Login</Link>
    </nav>
{/if}

<style>
    .right{
        float: right; 
        margin-top: -10px;
    }
</style>