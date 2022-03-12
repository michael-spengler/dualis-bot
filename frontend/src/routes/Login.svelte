<script>
  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";

  import { navigate } from "svelte-routing";

  function login() {
    navigate("/config", { replace: true });
  }

</script>

<div>
  <h1>Login</h1>
  <input text="username"/>
  <input/>
  <button on:click={login}>Login</button>
  <nav>
    <Link to="register">Register</Link>
  </nav>
</div>


<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
