<script>
    //***IMPORTS***
    import { jwt, BACKEND_SERVER } from "../stores.js";
    import Link from "svelte-routing/Link.svelte";
    import { onMount } from 'svelte';
    import { Button, Dialog, MaterialApp } from 'https://cdn.skypack.dev/svelte-materialify';

    //***VARIABLES***
    let token;
    jwt.subscribe(value => {token = value})
    var telegramActive = false, discordActive = false, emailActive = false, telegramDisabled = false, discordDisabled = false, emailDisabled = false;
    var telegramID = '', discordID = '', emailID = '';
    var telegramPersonal = true, discordPersonal = true, emailPersonal = true;
    var telegramDialog = false, discordDialog = false, emailDialog = false;
    var user = '';


    //***FUNCTIONS***
    //get user first time loading page
    onMount(async () => {
        getUser()
	});

    async function getUser() {
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
            telegramActive = false
          } else {
            telegramDisabled = false
            telegramActive = res.notifications.telegram.active
            telegramID = res.notifications.telegram.notificationNumber
            telegramPersonal = res.notifications.telegram.withGrades
          }
          if (res.notifications.discord == undefined) {
            discordDisabled = true
            discordActive = false
          } else {
            discordDisabled = false
            discordActive = res.notifications.discord.active
            discordID = res.notifications.discord.chatID
            discordPersonal = res.notifications.discord.withGrades
          }
          if (res.notifications.email == undefined) {
            emailDisabled = true
            emailActive = false
          } else {
            emailDisabled = false
            emailActive = res.notifications.email.active
            emailID = res.notifications.email.notificationEmail
            emailPersonal = res.notifications.email.withGrades
          }
      })
      .catch(error => {
        return [];
      })
    }

    //save-functions
    async function save () {
        const updateCall = BACKEND_SERVER + "/user"
        const updateData = {
            ...(!emailDisabled && { notitfications: {
                "email": {
                    "notificationEmail": emailID,
                    "withGrades": emailPersonal,
                    "active": emailActive,
                }
            }}),
            ...(!discordDisabled && { notifications: {
                "discord": {
                    "chatId": discordID,
                    "withGrades": discordPersonal,
                    "active": discordActive
                }
            }}),
            ...(!telegramDisabled && { notifications: {
                "telegram": {
                    "notificationNumber": telegramID,
                    "withGrades": telegramPersonal,
                    "active": telegramActive
                }
            }})
        }

        await fetch(updateCall, {
            method: 'PUT',
            headers: { 
                'Access-Control-Allow-Origin': true,
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': token 
            },
            body: JSON.stringify(updateData)
        })
        .then(getUser())
        .catch(error => {
            return [];
        });
    }
    async function saveDiscord () {
        const updateCall = BACKEND_SERVER + "/user"
        const updateData = {
            notifications: {
                "discord": {
                    "chatId": discordID,
                    "withGrades": discordPersonal,
                    "active": true
                }
            }
        }
        await fetch(updateCall, {
            method: 'PUT',
            headers: { 
                'Access-Control-Allow-Origin': true,
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': token 
            },
            body: JSON.stringify(updateData)
        })
        .then(getUser())
        .catch(error => {
            return [];
        });
    }
    async function saveEmail () {
        const updateCall = BACKEND_SERVER + "/user"
        const updateData = {
            notifications: {
                "email": {
                    "notificationEmail": emailID,
                    "withGrades": emailPersonal,
                    "active": true,
                }
            }
        }
        await fetch(updateCall, {
            method: 'PUT',
            headers: { 
                'Access-Control-Allow-Origin': true,
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': token 
            },
            body: JSON.stringify(updateData)
        })
        .then(getUser())
        .catch(error => {
            return [];
        });
    }
    async function saveTelegram () {
        const updateCall = BACKEND_SERVER + "/user"
        const updateData = {
            notifications: {
                "telegram": {
                    "notificationNumber": telegramID,
                    "withGrades": telegramPersonal,
                    "active": true
                }
            }
        }
        await fetch(updateCall, {
            method: 'PUT',
            headers: { 
                'Access-Control-Allow-Origin': true,
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': token 
            },
            body: JSON.stringify(updateData)
        })
        .then(getUser())
        .catch(error => {
            return [];
        });
    }
</script>

{#each [...[]] as _}
  <div />
{:else}


    {#if token != ''}
    <div class="outer">
        <div class="middle">
            <div class="inner">
            <h1>Konfiguration</h1>
            <hr/>
            <p>
                Passe deine Einstellungen an oder richte neue Kommunikationswege ein
            </p>
            <div style="text-align: left; margin-top: 40px">	
                <div style="padding-bottom: 20px">
                    <input type="checkbox" disabled={telegramDisabled} bind:checked={telegramActive}/>
                    <span>Telegram</span>
                    <button class="gButton right" on:click={() => (telegramDialog=true)}>
                        {#if !telegramDisabled}
                            Anpassen
                        {:else}
                            Konfigurieren
                        {/if}
                    </button>
                </div>
                <div style="padding-bottom: 20px">
                    <input type="checkbox" disabled={discordDisabled} bind:checked={discordActive} design="slider"/>
                    <span>Discord</span>
                    <button class="gButton right" on:click={() => (discordDialog=true)}>
                        {#if !discordDisabled}
                            Anpassen
                        {:else}
                            Konfigurieren
                        {/if}
                    </button>
                </div>
                <div style="padding-bottom: 20px">
                    <input type="checkbox" disabled={emailDisabled} bind:checked={emailActive} design="slider"/>
                    <span>E-Mail</span>
                    <button class="gButton right" on:click={() => (emailDialog=true)}>
                        {#if !emailDisabled}
                            Anpassen
                        {:else}
                            Konfigurieren
                        {/if}
                    </button>  
                </div>
            </div>
            <button class="rButton" on:click={() => save()}>Speichern</button>
            </div>
        </div>
    </div>
    {:else}
        <div class="outer">
            <div class="middle">
                <div class="inner">
            <p class="warning">
                Sie können Ihren Bot erst nach dem Anmelden konfigurieren.
            </p>
            <nav>
                <Link to="login">Login</Link>
            </nav>
            </div>
            </div>
        </div>
    {/if}

    <Dialog bind:active={telegramDialog} width="auto">
        <div class="center" style="background: #FFFFFF">
            <h1>Telegram</h1>
            <input placeholder="Chat ID" style="width: 190px" bind:value={telegramID}/>
            <div>
                <input type="checkbox" bind:checked={telegramPersonal}/>
                Get Message with Grades
            </div>
            <button class="rButton" on:click={() => saveTelegram()}>Speichern</button>
        </div>
    </Dialog>
    <Dialog bind:active={discordDialog} width="auto">
        <div class="center" style="background: #FFFFFF" >
            <h1>Discord</h1>
            <input placeholder="Chat ID" style="width: 190px" bind:value={discordID}/>
            <div>
                <input type="checkbox" bind:checked={discordPersonal}/>
                Get Message with Grades
            </div>
            <button class="rButton" on:click={() => saveDiscord()}>Speichern</button>
        </div>
    </Dialog>
    <Dialog bind:active={emailDialog} width="auto">
        <div class="center" style="background-color: #FFFFFF">
            <h1>E-Mail</h1>
            <input placeholder="E-Mail" style="width: 190px" bind:value={emailID}/>
            <div>
                <input type="checkbox" bind:checked={emailPersonal}/>
                Get Message with Grades
            </div>
            <button class="rButton" on:click={() => saveEmail()}>Speichern</button>
        </div>
    </Dialog>



{/each}

<style>
    .right{
        float: right; 
        margin-top: -10px;
    }
</style>