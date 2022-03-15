<script>
  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";
  
  import Login from "@/routes/Login.svelte";
  import Register from "@/routes/Register.svelte";
  import About from "@/routes/About.svelte";
  import Config from "@/routes/Config.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <div>
    <Route path="register" component="{Register}" />
    <Route path="config" component="{Config}" />
    <Route path="about" component="{About}" />
    <Route path="login" component="{Login}" />
    <Route path="/" component="{Login}"><Login /></Route>
  </div>
</Router>