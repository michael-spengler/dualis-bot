<script>
    let person = [
        {name: 'Fynn', description: 'Fynn hat die Führung innerhalb des Projektes übernommen und den Überblick behalten.', image: 'https://dualis-crawler.s3.eu-central-1.amazonaws.com/Fynn.png', opacity: 0.5, height: 30, id:1},
        {name: 'Robin', description: 'Robin war für das Backend zuständig.', image: 'https://dualis-crawler.s3.eu-central-1.amazonaws.com/Robin.png', opacity: 0.5, height: 30, id:2},
        {name: 'Steffen', description: 'Steffen hat am Frontend gearbeitet und war für den Telegram-Bot zuständig.', image: 'https://dualis-crawler.s3.eu-central-1.amazonaws.com/Steffen.png', opacity: 0.5, height: 30, id:3},
        {name: 'Maik', description: 'Maik hat am Frontend gearbeitet und war für den Discord-Bot zuständig.', image: 'https://dualis-crawler.s3.eu-central-1.amazonaws.com/Maik.png', opacity: 0.5, height: 30, id:4}
    ]

    const handleMouseOver = (id) => {
        for (let index = 0; index < person.length; index++) {
            if (person[index].id == id){
                person[index].opacity = 1;
                person[index].height = 40;
            }
        }
    }

    const handleMouseOut = (id) => {
		for (let index = 0; index < person.length; index++) {
            if (person[index].id == id){
                person[index].opacity = 0.5;
                person[index].height = 30;
            }
        }
	}

</script>

<div class="border">

    <div class="center">
        <h1 >About the Gang of Fork</h1>
        <hr>
        <p>Unser Team besteht aus vier Personen:</p>
    </div>

    {#each person as person}
        <div class="teammember" on:mouseover={() => {handleMouseOver(person.id)}} on:mouseout={() => {handleMouseOut(person.id)}} on:focus={() => {handleMouseOver(person.id)}} on:blur={() => {handleMouseOut(person.id)}}>
            <p class="names">{person.name}</p>
            <div class="center_column">
                <hr>
                <p>{person.description}</p>
            </div>
            <img style="position:absolute; top:50%; left:33%; opacity: {person.opacity};" src="{person.image}" height="{person.height}%" alt="{person.name}"/>
        </div>
    {/each}    
</div>


<style>
    .center {
      margin: auto;
      width: 350px;
      padding: 10px;
      text-align: center;
    }
    .center_column{
      margin: auto;
      width: 80%;
      text-align: center;
    }
    .border {
      border: 3px solid #222222;
      text-align: center;
    }
    .border:after{
        content: "";
        display: table;
        clear: both;
    }
    .teammember{
        position: relative;
        background-color: white;
        float: left;
        width: 23%;
        height:500px;
        margin: 1%;
    }
    .names{
        color: black;
        font-weight: 1000000;
        font-size: 23px;
    }
  </style>