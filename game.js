const mmm = new Audio("music/Drop Of A Hat - The Grey Room _ Density & Time.mp3");console.log(mmm);
let button_play=document.getElementById("play_button");console.log(button_play);
let divplay=document.getElementById("play"); console.log(divplay);
button_play.addEventListener("click",
    ()=>{
        divplay.style.display="none";
        document.getElementById("select_player").style.display="block";
     
    }
);

let players=document.getElementsByClassName("img_players");console.log(players);
let player_selected=players[0];console.log(player_selected);

for (let i=0;i<players.length;i++)
{
    players[i].addEventListener("click",
        ()=>{
           if (player_selected==players[i])
           {
            players[i].style.transform="scale(1.2)";
            document.getElementById("select_button").textContent="Start";
           }
           
           else{
           players[i].style.transform="scale(1.2)";
           player_selected.style.removeProperty("transform");
           player_selected=players[i];console.log(player_selected);
           document.getElementById("select_button").textContent="Start";  }
           
        }
    );
    players[i].addEventListener("hover",
        ()=>{
            players[i].style.transform="scale(1.2)";
        }
    );
}console.log(player_selected);





let music_status=document.getElementById("music_status");
let music=document.getElementById("music");



mmm.addEventListener('error', () => {
    console.error("Fichier audio introuvable ou corrompu");
    music_status.textContent = "ERROR";
});

mmm.addEventListener('ended', () => {
    mmm.currentTime = 0;  // remet au début
    mmm.play();
    music_status.textContent="ON";
});





  
music.addEventListener("click",
    ()=>{
        if(music_status.textContent=="OFF")
        {
            mmm.play();
            music_status.textContent="ON";
        }
        else if(music_status.textContent=="ON")
        {
            mmm.pause();
            music_status.textContent="OFF";
        }

    });

   


