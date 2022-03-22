<script>
    ///***IMPORTS***
    import SvelteStepWizard from 'https://cdn.skypack.dev/svelte-step-wizard';
    import { navigate } from "svelte-routing";
    import { jwt, BACKEND_SERVER } from "../stores.js";
    import { Button, Dialog, MaterialApp } from 'https://cdn.skypack.dev/svelte-materialify';



    //***VARIABLES***
    var telegramID = '', discordID = '', emailID = '', telegramPersonal = false, discordPersonal = false, emailPersonal = false
    var username = '', password = '', passwordRepeat = '', dualisUsername = '', dualisPassword = ''
    var error400Dialog = false, passwordUnequal = false;

    let hovering = false;
    let status = false;



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
        }
        )
        .then(async response => {
            if(response.status == 400){
                error400Dialog = true;
            }
            error400Dialog = false;
            console.log(response)
            navigate("/login", { replace: true });
        })
        .catch(error => {
            console.log(error)
            return [];
        });
    }

    const filledIn = (e) => {
            if(username == "" || password == "" || passwordRepeat == "") { 
                document.getElementById('buttonNext1').disabled = true; 
            } else { 
                //Passwords equal?
                if(password.length == passwordRepeat.length){
                    if(password == passwordRepeat){
                        document.getElementById('buttonNext1').disabled = false;
                    }
                    else{
                        document.getElementById('buttonNext1').disabled = true;
                        passwordUnequal = true;
                    }
                }
                
        }
    }

    const enter = () => {
		hovering = true
	}
	
	const leave = () => (hovering = false)

</script>

<div class="border">
    {#each [...[]] as _}
    <div />
    {:else}

        <SvelteStepWizard initialStep={1}>
            <SvelteStepWizard.Step num={1} let:nextStep>
                <div class="encase">
                    <div class="center_register">
                        <h1>Registrierung</h1>
                        <input class="input" on:keyup={filledIn} placeholder="Benutzername" bind:value={username}/>
                        <input class="input" on:keyup={filledIn} placeholder="Passwort" type="password" bind:value={password}/>
                        <input class="input" on:keyup={filledIn} placeholder="Passwort (wiederholen)" type="password" bind:value={passwordRepeat}/>
                    </div>
                    
                </div>
                <div class="button_space">
                    <button class="nextButton" id="buttonNext1" disabled=false on:click={nextStep}>
                        next
                    </button>
                </div>
            </SvelteStepWizard.Step>
            <SvelteStepWizard.Step num={2} let:previousStep let:nextStep>
                <div class="info" on:mouseover={enter} on:mouseout={leave} on:focus={enter} on:blur={leave}>
                    <img class="infoPic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png" alt="infoIcon" height="50px" />       
                    <p hidden={!hovering}>Lade dir den Bot herunter. Dieser zeigt dir deine ID an.</p>        
                </div>
                <div class="center_register">
                    <h1>Telegram</h1>
                    <input class="input" placeholder="Chat ID" style="width: 190px" bind:value={telegramID}/>
                    <div>
                        <input type="checkbox" bind:checked={telegramPersonal}/>
                        Get Message with Grades
                    </div>
                </div>
                <div class="button_space">
                    <button class="backButton" on:click={previousStep}>
                        back
                    </button>
                    <button class="nextButton" on:click={nextStep}>
                        next
                    </button>
                </div>
            </SvelteStepWizard.Step>
            <SvelteStepWizard.Step num={3} let:previousStep let:nextStep>
                <div class="info" on:mouseover={enter} on:mouseout={leave} on:focus={enter} on:blur={leave}>
                    <img class="infoPic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png" alt="infoIcon" height="50px" />       
                    <p hidden={!hovering}>1. Bot über Link (unten) hinzufügen <br> 2. ChannelID durch Rechtsklick auf Channelicon im linken Menü kopieren. Bei Problemen: </p> 
                    <a hidden={!hovering} href="https://youtu.be/NLWtSHWKbAI?t=18">Tutorial</a>       
                </div>
                <div class="center_register" >
                    <h1>Discord</h1>
                    <input class="input" placeholder="Chat ID" style="width: 190px" bind:value={discordID}/>
                    <div>
                        <input type="checkbox" bind:checked={discordPersonal}/>
                        Get Message with Grades
                    </div>
                </div>
                <div class="button_space">
                    <button class="backButton" on:click={previousStep}>
                        back
                    </button>
                    <button class="nextButton" on:click={nextStep}>
                        next
                    </button>
                </div>
                <p>Füge den Bot mit Hilfe des folgenden Links zu deinem Channel hinzu:</p>
                <a href="https://discord.com/api/oauth2/authorize?client_id=948977276127686687&permissions=534723950656&scope=bot" target="_blank" >Bot zu Channel hinzufügen</a>
            </SvelteStepWizard.Step>
            <SvelteStepWizard.Step num={4} let:previousStep let:nextStep>
                <div class="center_register">
                    <h1>E-Mail</h1>
                    <input class="input" placeholder="E-Mail" style="width: 190px" bind:value={emailID}/>
                    <div>
                        <input type="checkbox" bind:checked={emailPersonal}/>
                        Get Message with Grades
                    </div>
                </div>
                <div class="button_space">
                    <button class="backButton" on:click={previousStep}>
                        back
                    </button>
                    <button class="nextButton" on:click={nextStep}>
                        next
                    </button>
                </div>
            </SvelteStepWizard.Step>
            <SvelteStepWizard.Step num={5} let:previousStep>
                <div class="center_register">
                    <h1>Registrierung</h1>
                    <input class="input" placeholder="Dualis-Benutzername" bind:value={dualisUsername}/>
                    <input class="input" placeholder="Dualis-Passwort" bind:value={dualisPassword}/>
                </div>
                <div class="button_space">
                    <button class="backButton" on:click={previousStep}>
                        back
                    </button>
                    <button class="finishButton" on:click={finish}>
                        finish
                    </button>
                </div>
            </SvelteStepWizard.Step>
        </SvelteStepWizard>

    {/each}
</div>

<Dialog bind:active={error400Dialog} width="auto">
    <div class="center_register" style="background: #FFFFFF">
        <h1>Registrierung fehlgeschlagen</h1>
        <p>Entweder der Benutzername ist schon vergeben oder die Anmeldedaten für Dualis stimmen nicht.</p>
    </div>
</Dialog>

<Dialog bind:active={passwordUnequal} width="auto">
    <div class="center_register" style="backgorung: #FFFFFF">
        <h1>Password nicht gleich!</h1>
        <p>Die eingegebenen Passwörter sind nicht gleich.</p>
    </div>
</Dialog>


<style>
    .border {
      border: 3px solid #222222;
      text-align: center;
      width: 98.6vw;
      height: 97vh;
    }
    .border:after{
        content: "";
        display: table;
        clear: both;
    }
    .encase{
        width: 100%;
    }
    .center_register{
        margin: auto;
        width: 40%;
        padding: 10px;
        text-align: center; 
    }
    .info{
        margin: auto;
        padding: 10px;
        width: 20%;
        float: right;
    }
    .infoPic{
        float: right;
    }
    .button_space{
        margin: auto;
        width: 60%;
        padding: 10px;
        text-align: right;
    }
    .nextButton{
        color: white;
        background-color: #F54F59;
        width: 10%;
    }
    .backButton{
        color: black;
        background-color: #C4C4C4;
        width: 10%
    }
    .finishButton{
        color: white;
        background-color: #E30613;
        width: 10%;
    }
    .input{
        width: 100%;
        color: black;
        background-color: white;
        outline: #C4C4C4;
        text-align: center;
    }

</style>