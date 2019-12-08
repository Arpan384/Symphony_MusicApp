function Song(id, name, url, image) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.image = image;
}

var obj = {
    "playList": [],
    addSong: function(id, name, url, image) {
        var s = new Song(id, name, url, image);
        this.playList.push(s);
        console.log(this.playList);
    },
    deleteSong: function(id) {
        for(i=0; i<this.playList.length;i++){
            if(this.playList[i].id == id){
                this.playList.splice(i,1)
                break
            }
        }
    },
    loadSongs(){
        return this.playList;
    }
}