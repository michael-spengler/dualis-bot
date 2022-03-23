<script>
  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";
  
  import Login from "@/routes/Login.svelte";
  import Register from "@/routes/Register.svelte";
  import About from "@/routes/About.svelte";
  import Config from "@/routes/Config.svelte";

  import { jwt } from "./stores.js";

  //reset jwt
  jwt.set('');

  export let url = "";

  const CONTACT_DETAILS = {
    HEADING: "asdf", 
    ADDRESS: "asdfj", 
    MOBILE: "43323672", 
    EMAIL: "kjadskjfk"
  }

  const footerData = {
    DESCRIPTION: "Dualis-Bot",
    CONTACT_DETAILS,
    SUBSCRIBE_NEWSLETTER: "kasfdjk",
    SUBSCRIBE: "asfjd"

  }

</script>

<Router url="{url}">
  <div>
    <Route path="register" component="{Register}" />
    <Route path="config" component="{Config}" />
    <Route path="about" component="{About}" />
    <Route path="login" component="{Login}" />
    <Route path="/" component="{Login}">
      <Login/>
    </Route>
    <footer>
      <Link to="login">Login</Link>
      <img height="15px" src="/assets/Logo.jpg"/>
      <Link to="about">About</Link>
      <img height="15px"src="/assets/Logo.jpg"/>
      <Link to="register">Register</Link>
    </footer>
  </div>
</Router>

<style>
  footer {
   position: absolute;
   bottom: 0;
   width: 100%;
   height: 15px;
   text-align: center;
}
</style>