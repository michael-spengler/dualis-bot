<script>
    ///***IMPORTS***
    import SvelteStepWizard from 'https://cdn.skypack.dev/svelte-step-wizard';
    import { navigate } from "svelte-routing";
    import { jwt, BACKEND_SERVER } from "../stores.js";

    //***VARIABLES***
    var telegramID = '', discordID = '', emailID = '', telegramPersonal = false, discordPersonal = false, emailPersonal = false
    var username = '', password = '', dualisUsername = '', dualisPassword = ''

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
        console.log(registerData);

        await fetch(registerCall, {
            method: 'POST',
            headers: { 
                'Access-Control-Allow-Origin': true,
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData)
        })
        .then(response => {
            console.log(response)
            navigate("/login", { replace: true });
        })
        .catch(error => {
            console.log(error)
            return [];
        });
    }
</script>

{#each [...[]] as _}
  <div />
{:else}

    <SvelteStepWizard initialStep={1}>
        <SvelteStepWizard.Step num={1} let:nextStep>
            <h1>Registrierung</h1>
            <input placeholder="Benutzername" bind:value={username}/>
            <input placeholder="Passwort" bind:value={password}/>
            <input placeholder="Passwort (wiederholen)"/>
            <button on:click={nextStep}>
                next
            </button>
        </SvelteStepWizard.Step>
        <SvelteStepWizard.Step num={2} let:previousStep let:nextStep>
            <div class="center">
                <h1>Telegram</h1>
                <input placeholder="Chat ID" style="width: 190px" bind:value={telegramID}/>
                <div>
                    <input type="checkbox" bind:checked={telegramPersonal}/>
                    Get Message with Grades
                </div>
            </div>
            <button on:click={previousStep}>
                back
            </button>
            <button on:click={nextStep}>
                next
            </button>
        </SvelteStepWizard.Step>
        <SvelteStepWizard.Step num={3} let:previousStep let:nextStep>
            <div class="center" >
                <h1>Discord</h1>
                <input placeholder="Chat ID" style="width: 190px" bind:value={discordID}/>
                <div>
                    <input type="checkbox" bind:checked={discordPersonal}/>
                    Get Message with Grades
                </div>
            </div>
            <button on:click={previousStep}>
                back
            </button>
            <button on:click={nextStep}>
                next
            </button>
        </SvelteStepWizard.Step>
        <SvelteStepWizard.Step num={4} let:previousStep let:nextStep>
            <div class="center">
                <h1>E-Mail</h1>
                <input placeholder="E-Mail" style="width: 190px" bind:value={emailID}/>
                <div>
                    <input type="checkbox" bind:checked={emailPersonal}/>
                    Get Message with Grades
                </div>
            </div>
            <button on:click={previousStep}>
                back
            </button>
            <button on:click={nextStep}>
                next
            </button>
        </SvelteStepWizard.Step>
        <SvelteStepWizard.Step num={5} let:previousStep>
            <h1>Registrierung</h1>
            <input placeholder="Dualis-Benutzername" bind:value={dualisUsername}/>
            <input placeholder="Dualis-Passwort" bind:value={dualisPassword}/>
            <button on:click={previousStep}>
                back
            </button>
            <button on:click={finish}>
                finish
            </button>
        </SvelteStepWizard.Step>
    </SvelteStepWizard>

{/each}