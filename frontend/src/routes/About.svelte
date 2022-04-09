<script>
    import Link from "svelte-routing/Link.svelte";

    let person = [
        {name: 'Fynn', description: 'Internal Applications Architect and Management Specialist for International Product Owners', image: 'https://dualis-crawler.s3.eu-central-1.amazonaws.com/Fynn.png', opacity: 0.5, height: 15, id:1, margin: 24},
        {name: 'Robin', description: 'Expert Experting Dynamic Web Architect Experts for Backend and Mobile Platforms', image: 'https://dualis-crawler.s3.eu-central-1.amazonaws.com/Robin.png', opacity: 0.5, height: 15, id:2, margin: 24},
        {name: 'Steffen', description: 'Head of Office for Forward Tactics for integrated Cloud Technologies', image: 'https://dualis-crawler.s3.eu-central-1.amazonaws.com/Steffen.png', opacity: 0.5, height: 15, id:3, margin: 24},
        {name: 'Maik', description: 'Head of Usability Mobile Design and Lead Usability Supervisor', image: 'https://dualis-crawler.s3.eu-central-1.amazonaws.com/Maik.png', opacity: 0.5, height: 15, id:4, margin: 24}
    ]

    const handleMouseOver = (id) => {
        for (let index = 0; index < person.length; index++) {
            if (person[index].id == id){
                person[index].opacity = 1;
                person[index].height = 20;
                person[index].margin = 15;
            }
        }
    }

    const handleMouseOut = (id) => {
		for (let index = 0; index < person.length; index++) {
            if (person[index].id == id){
                person[index].opacity = 0.5;
                person[index].height = 15;
                person[index].margin = 24;
            }
        }
	}

</script>

<div class="outer">
    <div class="middle">
        <div class="inner" style="width: auto">

            <div class="center">
                <h1 >About the Gang of Fork</h1>
                <hr/>
                <p>Unser Team besteht aus vier Personen:</p>
            </div>

            <div class="wrapper" style="margin-bottom: 45px;">
            {#each person as person}
                <div class="teammember" on:mouseover={() => {handleMouseOver(person.id)}} on:mouseout={() => {handleMouseOut(person.id)}} on:focus={() => {handleMouseOver(person.id)}} on:blur={() => {handleMouseOut(person.id)}}>
                    <p class="names">{person.name}</p>
                    <div class="center_column">
                        <hr/>
                        <p>{person.description}</p>
                    </div>
                    <img style="margin-top:40px; margin-left: {person.margin}%; opacity: {person.opacity};" src="{person.image}" height="{person.height}%" alt="{person.name}"/>
                </div>
            {/each}    
            </div>
            <footer style="margin-bottom: 15px;">
                <Link to="login">Login</Link> <span>|</span>
                <Link to="about">About</Link> <span>|</span>
                <Link to="register">Register</Link>
            </footer>
        </div>
    </div>
</div>


<style>
    .center {
      margin: auto;
      width: 300px;
      padding: 10px;
      text-align: center;
      align-items: center;
    }
    .center_column{
      margin: auto;
      width: 80%;
      align-items: center;
    }
    .wrapper {
        text-align: center;
        overflow: hidden;
    }
    .teammember{
        position: relative;
        background-color: white;
        width: 300px;
        height:500px;
        margin: 1%;
        display: inline-grid;
        margin-top: 20px;
    }
    .names{
        color: black;
        font-weight: 1000000;
        font-size: 23px;
    }
  </style>