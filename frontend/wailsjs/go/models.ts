export namespace domain {
	
	export class Track {
	    id: string;
	    path: string;
	    fileName: string;
	    title: string;
	    artist: string;
	    album: string;
	    duration: number;
	    coverMime: string;
	    coverData: number[];
	
	    static createFrom(source: any = {}) {
	        return new Track(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.path = source["path"];
	        this.fileName = source["fileName"];
	        this.title = source["title"];
	        this.artist = source["artist"];
	        this.album = source["album"];
	        this.duration = source["duration"];
	        this.coverMime = source["coverMime"];
	        this.coverData = source["coverData"];
	    }
	}

}

