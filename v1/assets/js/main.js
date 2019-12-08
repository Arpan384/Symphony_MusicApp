window.addEventListener("load", initEvent);
// var audio;
var flag = false;
var current = false;

function initEvent() {
    loadSongs();
    // loadPlayList1()
    document.querySelector("#load").addEventListener("click",loadSongs)
    audio = document.querySelector("#audio");
    playBtn = document.querySelector("#play");
    // console.log(playBtn)
    playBtn.addEventListener("click", togglePlay);
    slider = document.querySelector("#slider");
    slider.addEventListener("change", seekSong);
    song_total_time = document.querySelector(".song_total_time");
    document.querySelector("#next").addEventListener("click",next)
    document.querySelector("#prev").addEventListener("click",prev)
    document.querySelector("#search").addEventListener("keyup",search)
    song_curr_time = document.querySelector(".song_curr_time");
}

function next(){
    console.log(current)
    if(current)current = (current%songs.length) +1;
    else current = 1;
    console.log(current)
    playSong(undefined,current)
}

function prev(){
    if (current==1)current=12;
    else if(current)current = (current%songs.length) -1;
    else current = songs.length;
    console.log(current)
    playSong(undefined,current)
}


function loadSongs() {
    var ul = document.querySelector("#songsList");
    ul.innerHTML = ""
    // for (var i = 0; i < songs.length; i++) {
    //     var li = document.createElement("li");
    //     var span = document.createElement("span");
    //     span.innerHTML = songs[i].s_name;
    // }
    songs.forEach(function(obj) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerHTML = obj.song_name;
        var btn = document.createElement("button");
        btn.innerHTML = 'Add to Playlist';
        btn.className = "btn btn-primary d-block w-100";
        var img = document.createElement("img");
        img.setAttribute('src', obj.song_thumb);
        img.setAttribute('sid', obj.song_id);
        li.appendChild(img);
        // console.log(obj);
        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
        img.addEventListener("click", playSong);
        btn.addEventListener("click", addSong);
    })
}

function playSong(evt,curr) {
    // console.log("call", curr,event.srcElement.getAttribute("sid"))
    var s_id
    // console.log(event.srcElement.getAttribute("sid"))
     if (curr)s_id = curr
     else if(event && event.srcElement.getAttribute("sid")){
         console.log(s_id,event.srcElement.getAttribute("sid"));
         var s_id = event.srcElement.getAttribute("sid");
    }
    else{
        return;
    }
    // console.log(curr,s_id)
    // console.log(s_id)
    // console.log(tag);
    for (var i = 0; i < songs.length; i++) {//console.log(songs[i].song_id)
        if (songs[i].song_id == s_id) {
            var songUrl = songs[i].song_url;
            document.querySelector("#cur_song").innerHTML = songs[i].song_name
            current = songs[i].song_id;
            break;
        }
    }

    audio.src = songUrl;
    console.log(current)
    audio.play();
    setInterval(function() {
        slider.value = audio.currentTime;
        var min = Math.floor(audio.currentTime / 60)
        var sec = Math.floor(audio.currentTime % 60)
        if(Math.floor(sec/10) == 0)sec="0"+sec
        if(Math.floor(min/10) == 0)min="0"+min
        song_curr_time.innerHTML = min + ":" + sec;
        if(audio.currentTime == audio.duration){
            next()
        }

    }, 1000);
    setTimeout(function() {
        var duration = audio.duration;
        // console.log(duration)
        slider.max = duration;
        var min = parseInt(duration / 60);
        var sec = parseInt(duration % 60);
        if(Math.floor(sec/10) == 0)sec="0"+sec
        if(Math.floor(min/10) == 0)min="0"+min
        song_total_time.innerHTML = min + ":" + sec;
    }, 500);
    flag = true;
    togglePlay();
}

function seekSong() {
    audio.currentTime = slider.value;
}

function togglePlay() {
    var body = document.body
    if (!flag) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        body.style.backgroundImage = ""
        // body.style.backgroundColor = "black"
        // body.style.transition = "5s"

        audio.pause();
    } else {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        body.style.backgroundImage = "url('https://media1.giphy.com/media/QrooGoDTEGK52/source.gif')"
        body.style.backgroundSize = "125% 100%";
        body.style.backgroundPosition = "50% 0%";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundAttachment = "fixed";
        body.style.transition = "2s"
        audio.play();
    }
    flag = !flag;
}

function addSong() {
    var s_id = event.srcElement.parentElement.children[0].getAttribute("sid")
    for (var i = 0; i < songs.length; i++) {
        if (songs[i].song_id == s_id) {
            var songObj = songs[i];
            obj.addSong(songObj.song_id, songObj.song_name, songObj.song_url, songObj.song_thumb);
            loadPlaylist()
            break
        }
    }
    savePlayList()
}

function loadPlaylist(){
    console.log("call")
    playlist = obj.loadSongs()
    var ul = document.querySelector("#playList");
    ul.innerHTML = ""
    // for (var i = 0; i < songs.length; i++) {
    //     var li = document.createElement("li");
    //     var span = document.createElement("span");
    //     span.innerHTML = songs[i].s_name;
    // }
    console.log(playlist)
    playlist.forEach(function(object) {
        console.log(object)
        var li = document.createElement("li");
        var div = document.createElement("div")
        var p = document.createElement("p");
        p.innerHTML = object.name;
        var btn = document.createElement("button");
        btn.innerHTML = 'X';
        btn.className = "btn btn-danger";
        var img = document.createElement("img");
        img.setAttribute('src', object.image);
        img.setAttribute('sid', object.id);
        li.appendChild(img);
        // console.log(obj);
        div.appendChild(p)
        li.appendChild(div);
        li.appendChild(btn);
        ul.appendChild(li);
        img.addEventListener("click", playSong);
        btn.addEventListener("click", remove);
    })
}

function remove(){
    var sid = event.srcElement.parentElement.children[0].getAttribute("sid")
    obj.deleteSong(sid)
    loadPlaylist()
    savePlayList()
}


function search(){
    // console.log("call")
    var name = document.querySelector("#search").value;
    var ul = document.querySelector("#songsList");
    ul.innerHTML = ""

    name = name.toLowerCase()
    // console.log(name)
    var searchArr =[]

    songs.forEach((obj)=>{
        if(obj.song_name.toLowerCase().includes(name)){
            searchArr.push(obj)
        }
    })

    searchArr.forEach(function(obj) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerHTML = obj.song_name;
        var btn = document.createElement("button");
        btn.innerHTML = 'Add to Playlist';
        btn.className = "btn btn-primary d-block w-100";
        var img = document.createElement("img");
        img.setAttribute('src', obj.song_thumb);
        img.setAttribute('sid', obj.song_id);
        li.appendChild(img);
        // console.log(obj);
        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
        img.addEventListener("click", playSong);
        btn.addEventListener("click", addSong);
    })
    console.log(songs)
}



function savePlayList() {
    if (window.localStorage) {
        var json = JSON.stringify(obj.playList);
        localStorage.setItem("playlist", json);
    }
}

function loadPlayList1() {
    if (window.localStorage) {
        var arr = localStorage.getItem("playlist");
        obj.playList = JSON.parse(arr);
        loadPlaylist();
    }
}