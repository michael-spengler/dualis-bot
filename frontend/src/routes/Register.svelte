<script>
    import SvelteStepWizard from 'https://cdn.skypack.dev/svelte-step-wizard';
</script>

<h1>Register</h1>
<SvelteStepWizard initialStep={1}>
    <SvelteStepWizard.Step num={1} let:nextStep>
        <p>
            This is the first step.
        </p>
        <button on:click={nextStep}>
            Next Step	>
        </button>
    </SvelteStepWizard.Step>
    <SvelteStepWizard.Step num={2} let:previousStep let:nextStep>
        <p>
            Keep going.
        </p>
        <button on:click={previousStep}>
            Go Back
        </button>
        <button on:click={nextStep}>
            Next Step	>
        </button>
    </SvelteStepWizard.Step>
    <SvelteStepWizard.Step num={3} let:previousStep>
        <p>
            Done!
        </p>
        <button on:click={previousStep}>
            Go Back
        </button>
    </SvelteStepWizard.Step>
</SvelteStepWizard>