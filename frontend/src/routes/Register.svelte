<script>
    ///***IMPORTS***
    import SvelteStepWizard from 'https://cdn.skypack.dev/svelte-step-wizard';
    import { navigate } from "svelte-routing";
    import { BACKEND_SERVER } from "../stores.js";
    import { Dialog } from 'https://cdn.skypack.dev/svelte-materialify';



    //***VARIABLES***
    var telegramID = '', discordID = '', emailID = '', telegramPersonal = false, discordPersonal = false, emailPersonal = false
    var username = '', password = '', passwordRepeat = '', dualisUsername = '', dualisPassword = ''
    var error400Dialog = false, passwordUnequal = false;
    var telegramDialog = false, discordDialog = false;

    //***FUNCTIONS***
    async function finish () {
        const registerCall = BACKEND_SERVER + "/register"
        const registerData = {
            "username": username,
            "password": password,
            "dualis_username": dualisUsername,
            "dualis_password": dualisPassword,
            "notifications": {
                ...(emailID != '' && { "email": {
                    "notificationEmail": emailID,
                    "withGrades": emailPersonal,
                    "active": true,
                }}),
                ...(discordID != '' && { "discord": {
                    "chatId": discordID,
                    "withGrades": discordPersonal,
                    "active": true
                }}),
                ...(telegramID != '' && { "telegram": {
                    "notificationNumber": telegramID,
                    "withGrades": telegramPersonal,
                    "active": true
                }}),
            },
            "active": true
        }
    
        await fetch(registerCall, {
            method: 'POST',
            headers: { 
                'Access-Control-Allow-Origin': true,
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData)
        }
        )
        .then(async response => {
            if(response.status == 400){
                error400Dialog = true;
            }else{
                error400Dialog = false;
                navigate("/login", { replace: true });
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
                <SvelteStepWizard initialStep={1}>
                    <SvelteStepWizard.Step num={1} let:nextStep>
                        <div>
                            <h1>Registrierung</h1>
                            <hr/>
                            <p>
                                Gib hier die Daten ein, mit denen du dich in der Zukunft anmelden möchtest.
                            </p>
                            <input class="input" placeholder="Benutzername" bind:value={username}/>
                            <input class="input" placeholder="Passwort" type="password" bind:value={password}/>
                            <input class="input" placeholder="Passwort (wiederholen)" type="password" bind:value={passwordRepeat}/>
                            {#if password != passwordRepeat}
                                <p class="warning">
                                    Die Passwörter stimmen nicht überein!
                                </p>
                            {/if}
                            <div style="text-align: right">
                                <button class="rButton" id="buttonNext1" disabled={password!=passwordRepeat || !username || !password} on:click={nextStep}>
                                    next
                                </button>
                            </div>
                        </div>
                    </SvelteStepWizard.Step>
                    <SvelteStepWizard.Step num={2} let:previousStep let:nextStep>
                        <div>
                            <h1>Telegram</h1>
                            <hr/>
                            <p>
                                Für eine Telegram Benachrichtigung musst du hier deine Chat ID eingeben.
                            </p>
                            <button class="gButton" style="margin-top: -5px; margin-bottom: 15px;" on:click={() => (telegramDialog = true)}>
                                <img class="infoPic" src="https://dualis-crawler.s3.eu-central-1.amazonaws.com/info.png" alt="infoIcon" height="20px" />
                            </button>
                            <div>
                                <input class="input" placeholder="Chat ID" style="width: 190px" bind:value={telegramID}/>
                            </div>
                            <div>
                                <input type="checkbox" bind:checked={telegramPersonal}/>
                                Get Message with Grades
                            </div>
                            <div style="text-align: right">
                                <button class="gButton" on:click={previousStep}>
                                back
                                </button>
                                <button class="rButton" on:click={nextStep}>
                                    next
                                </button>
                            </div>
                            <p>Füge den Bot mit Hilfe des folgenden Links zu deinem Channel hinzu:</p>
                            <a href="https://t.me/dhbw_dualis_bot" target="_blank" >Telegram Dualis Bot</a>   
                        </div>
                    </SvelteStepWizard.Step>
                    <SvelteStepWizard.Step num={3} let:previousStep let:nextStep>
                        <div>
                            <h1>Discord</h1>
                            <hr/>
                            <p>
                                Für eine Discord Benachrichtigung musst du hier deine Chat ID eingeben.
                            </p>
                            <button class="gButton" style="margin-top: -5px; margin-bottom: 15px;" on:click={() => (discordDialog = true)}>
                                <img class="infoPic" src="https://dualis-crawler.s3.eu-central-1.amazonaws.com/info.png" alt="infoIcon" height="20px" />
                            </button>
                            <div>
                                <input class="input" placeholder="Chat ID" style="width: 190px" bind:value={discordID}/>
                            </div>
                            <div>
                                <input type="checkbox" bind:checked={discordPersonal}/>
                                Get Message with Grades
                            </div>
                            <div style="text-align: right">
                                <button class="gButton" on:click={previousStep}>
                                    back
                                </button>
                                <button class="rButton" on:click={nextStep}>
                                    next
                                </button>
                            </div>
                            <p>Füge den Bot mit Hilfe des folgenden Links zu deinem Channel hinzu:</p>
                            <a href="https://discord.com/api/oauth2/authorize?client_id=948977276127686687&permissions=534723950656&scope=bot" target="_blank">Discord Dualis Bot</a>
                        </div>
                    </SvelteStepWizard.Step>
                    <SvelteStepWizard.Step num={4} let:previousStep let:nextStep>
                        <div>
                            <h1>E-Mail</h1>
                            <hr/>
                            <p>
                                Für eine Benachrichtigung per E-Mail musst du hier deine gewünschte Mailadresse eingeben.
                            </p>
                            <input class="input" placeholder="E-Mail" style="width: 190px" bind:value={emailID}/>
                            <div>
                                <input type="checkbox" bind:checked={emailPersonal}/>
                                Get Message with Grades
                            </div>
                            <div style="text-align: right">
                                <button class="gButton" on:click={previousStep}>
                                    back
                                </button>
                                <button class="rButton" on:click={nextStep}>
                                    next
                                </button>
                            </div>
                        </div>
                    </SvelteStepWizard.Step>
                    <SvelteStepWizard.Step num={5} let:previousStep>
                        <div>
                            <h1>E-Mail</h1>
                            <hr/>
                            <p>
                                Gib hier deine Dualis Anmeldedaten ein.
                            </p>
                            <input class="input" placeholder="Dualis-Benutzername" bind:value={dualisUsername}/>
                            <input type="password" class="input" placeholder="Dualis-Passwort" bind:value={dualisPassword}/>
                            <div style="text-align: right">
                                <button class="gButton" on:click={previousStep}>
                                    back
                                </button>
                                <button class="rButton" disabled={!dualisUsername || !dualisPassword} on:click={finish}>
                                    finish
                                </button>
                            </div>
                        </div>
                    </SvelteStepWizard.Step>
                </SvelteStepWizard>

        </div>
    </div>
</div>

<Dialog bind:active={error400Dialog} width="auto">
    <div class="center" style="background: #FFFFFF">
        <h2>Registrierung fehlgeschlagen</h2>
        <p>Entweder der Benutzername ist schon vergeben oder die Anmeldedaten für Dualis stimmen nicht.</p>
    </div>
</Dialog>

<Dialog bind:active={passwordUnequal} width="auto">
    <div class="center" style="background: #FFFFFF">
        <h1>Password nicht gleich!</h1>
        <p>Die eingegebenen Passwörter sind nicht gleich.</p>
    </div>
</Dialog>

<Dialog bind:active={discordDialog} width="auto">
    <div class="center" style="background: #FFFFFF">
        <h2>Anleitung Discord</h2>
        <ol>
            <li> Bot über Link (unten) hinzufügen </li>
            <li> ChannelID durch Rechtsklick auf Channelicon im linken Menü kopieren </li>
        </ol>
        <p>Bei Problemen: </p> 
        <a href="https://youtu.be/NLWtSHWKbAI?t=18">Tutorial</a> 
    </div>
</Dialog>

<Dialog bind:active={telegramDialog} width="auto">
    <div class="center" style="background: #FFFFFF">
        <h2>Anleitung Telegram</h2>
        <ol>
            <li> Telegram Nutzername festlegen, wenn noch nicht vorhanden </li>
            <li> Bot über Link (unten) öffnen oder nach dhbw_dualis_bot in den Kontakten suchen und dem gewünschten Chat hinzufügen </li>
            <li> ChannelID mithilfe des <a href="https://t.me/RawDataBot">Raw Data Bots</a> ermitteln </li>
        </ol>
        <p>Bei Problemen: </p> 
        <a href="https://www.alphr.com/find-chat-id-telegram/">Tutorial</a> 
    </div>
</Dialog>

{/each}


<style>
    .infoPic{
        float: right;
    }

</style>