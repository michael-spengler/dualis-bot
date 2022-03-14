<script>
    import SvelteStepWizard from 'https://cdn.skypack.dev/svelte-step-wizard';

    import { navigate } from "svelte-routing";

    function finish (){
        navigate("/config", { replace: true });
    }
</script>

{#each [...[]] as _}
  <div />
{:else}

    <SvelteStepWizard initialStep={1}>
        <SvelteStepWizard.Step num={1} let:nextStep>
            <h1>Registrierung</h1>
            <input/>
            <input/>
            <button on:click={nextStep}>
                next
            </button>
        </SvelteStepWizard.Step>
        <SvelteStepWizard.Step num={2} let:previousStep let:nextStep>
            <h1>Telegram</h1>
            <input/>
            <input/>
            <button on:click={previousStep}>
                back
            </button>
            <button on:click={nextStep}>
                next
            </button>
        </SvelteStepWizard.Step>
        <SvelteStepWizard.Step num={3} let:previousStep let:nextStep>
            <h1>Discord</h1>
            <input/>
            <input/>
            <button on:click={previousStep}>
                back
            </button>
            <button on:click={nextStep}>
                next
            </button>
        </SvelteStepWizard.Step>
        <SvelteStepWizard.Step num={4} let:previousStep>
            <h1>E-Mail</h1>
            <input/>
            <input/>
            <button on:click={previousStep}>
                back
            </button>
            <button on:click={finish}>
                finish
            </button>
        </SvelteStepWizard.Step>
    </SvelteStepWizard>

{/each}