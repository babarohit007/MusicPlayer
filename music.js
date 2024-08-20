const toggleSwitch = document.getElementById('toggleSwitch');

toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.body.style.backgroundColor = 'blue';
        // Perform actions for the 'on' state
    } else {
        // Toggle is in the 'off' state
        // Perform actions for the 'off' state
        document.body.style.backgroundColor = 'white';
    }
});

    const filterEl = document.getElementById('filter');
    filterEl.addEventListener('change', function(){ // learnings 
        let category = this.value;

        var listItems = document.getElementById('contentlist').querySelectorAll("li");
        for(var i = 0; i<listItems.length; i++){
            var listEl = listItems[i];
            var listItemCategory = listEl.getAttribute("data-category");
            if (category === "all" || listItemCategory === category) {
                listEl.style.display = 'list-item';
            } else {
                listEl.style.display = 'none';
            }
        }
    });

//loading song in main tag

const Obj =[
    {id : 1,singer:"A", aud:"./song/Aadhi Saans Meri 128 Kbps.mp3",Img:"https://blog.byoh.in/wp-content/uploads/2016/04/Romantic-Bollywood-Songs.jpg",content:"Aadhi Saans Meri"},{id : 2,singer:"B", aud:"./song/Aayi Dekho Sherni 128 Kbps.mp3",Img:"https://browngirlmagazine.com/wp-content/uploads/2018/01/Rab-Ne-Bana-Di-Jodi-Bollywood-Songs.jpg",content:"Aayi Dekho Sherni"},{id : 3, singer:"C", aud:"./song/Suhaag Maagan Jaaye Title Track 128 Kbps.mp3",Img:"https://wallpapercave.com/dwp1x/wp8073262.jpg",content:"Suhaag Maagan Jaaye"},
    {id : 4,singer:"D", aud:"./song/Us Rab Se Ek Dua 128 Kbps.mp3",Img:"https://wallpapercave.com/dwp1x/wp8073284.jpg",content:"Us Rab Se Ek Dua"},{id : 5, singer:"E", aud:"./song/Yeh Mera India I Love My India 128 Kbps.mp3",Img:"https://wallpapercave.com/dwp1x/wp8073477.jpg",content:"Yeh Mera India I Love My India"}]

const songEl = document.querySelectorAll(".songName");
const songTitle = document.getElementById("title");
const singerEle = document.getElementById("singer");
const songPoster = document.getElementById("songposter");
const controller = document.getElementById("songControl");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let currentAudioIndex = 0;


songEl.forEach(function(song,index){    
    song.addEventListener('click', 
    function(){        
        playAudio(index);        
    })    
})

let totalSongs = songEl.length;

function playAudio(index){
        songTitle.textContent = Obj[index].content;
        singerEle.textContent = Obj[index].singer;
        var poster = Obj[index].Img;
        songPoster.setAttribute('src', poster);
        var audLink = Obj[index].aud;
        controller.setAttribute('src', audLink);
        controller.play();        
}

function checkIndex(){
    for(let i = 0 ; i < Obj.length; i++){
        if(Obj[i].singer === singerEle.textContent ){
            currentAudioIndex = (Obj[i].id) -1;
            return;
        }
    }
}

function playPrev(){
    checkIndex();
    currentAudioIndex = (currentAudioIndex -1 + totalSongs) % totalSongs;
    playAudio(currentAudioIndex);

}
function playNext(){
    checkIndex();
    currentAudioIndex = (currentAudioIndex +1 + totalSongs) % totalSongs;
    playAudio(currentAudioIndex);

}
prev.addEventListener('click', playPrev);
next.addEventListener('click', playNext);

let currentPlaylistValue;
const createPlaylistBtn = document.getElementById('playlistCreationBtn');
const playLists = {};
createPlaylistBtn.addEventListener('click', function(){
    const playlistName = document.getElementById('playListCreation').value;

    function checkPlaylistName(playlistName){
        if(playlistName in playLists){
            return false;
        }
        return true;
    }    

    if(playlistName.trim() !=='' && checkPlaylistName(playlistName)){
        const playlistDiv = document.createElement('button');
        playlistDiv.textContent = playlistName;
        playlistDiv.value = playlistName;
        playlistDiv.classList.add('myplaylist');
        playLists[playlistName] = [];
        const playlistContainer = document.querySelector(".playlist");
        playlistContainer.appendChild(playlistDiv);
        document.getElementById('playListCreation').value = '';
        playlistDiv.addEventListener('click', function(){
            currentPlaylistValue = playlistName;
            displaySongs(playlistName);
        })
        }else{
        alert('Enter a valid playlist name');
        }
})
function displaySongs(playlistName){
    const songcontainer = document.getElementById("songsContainer");
    const songs = playLists[playlistName];
    songcontainer.innerHTML = "";
    songs.forEach((song)=>{
        const songDiv = document.createElement('button');
        songDiv.textContent = song;
        songcontainer.appendChild(songDiv);
    })
}

function addsongToPlaylist(playlistName, song){
    if(playLists.hasOwnProperty(playlistName)){
        playLists[playlistName].push(song);
    }else{
        alert('playlist name does not exists');
    }
}


const addtoplaylist = document.getElementById('addtoPlaylist');
addtoplaylist.addEventListener('click',function(){        
checkIndex();
const newAddedSong = Obj[currentAudioIndex].content;
addsongToPlaylist(currentPlaylistValue, newAddedSong);
displaySongs(currentPlaylistValue);
})


    
    




