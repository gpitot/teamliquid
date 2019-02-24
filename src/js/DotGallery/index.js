

class DotGallery {
    constructor(canvas, imageholder, size, srcs) {
        this.DOM = {canvas : canvas};
        this.DOM.ctx = this.DOM.canvas.getContext('2d');
        this.DOM.imageholder = imageholder;

        this.index = 0;
        this.images = [];


        this.loadedCount = 0;
        this.srcs = srcs;
        this.size = size;
        this.gap = 2;

        this.displayImage = this.displayImage.bind(this);
        this.DOM.canvas.addEventListener('click', this.displayImage);

        this.resizeCanvas();
        this.loadImages();
    }

    loadImages() {
       
        //loads posts
        const postSrcs = this.srcs;
        postSrcs.forEach((src) => {
            let img = new Image();
            img.src = src;
            this.images.push(img);
            img.onload = ()=>{
                this.loadedCount += 1;
                if (this.loadedCount === this.srcs.length) {
                    this.loaded = true;
                    this.displayImage();
                }
            }
        });
    }

    resizeCanvas() {
        this.DOM.canvas.width = this.DOM.canvas.parentElement.getBoundingClientRect().width;
        this.DOM.canvas.height = window.innerWidth > 1190 ? 600 : 400;
    }


  


    displayImage() {

        this.index += 1;
        if (this.index >= this.images.length) {
            this.index = 0;
        }

        this.draw(this.images[this.index]);
    }

    draw(image) {
        const {ctx, canvas, imageholder} = this.DOM;

        while (imageholder.firstChild) {
            imageholder.removeChild(imageholder.firstChild);
        }

        imageholder.appendChild(image);

        const rows = canvas.height / (this.size + this.gap);
        const cols = canvas.width / (this.size + this.gap);
         
        let colour = 255;    
        
        
        let fillStyleRND = Math.floor(Math.random() * 3);
        let fillStyle;
       
        
        
        ctx.globalAlpha = 1;
        for (let x=0; x< cols;x+=1) {
            for (let y = 0; y<rows;y+=1) {
                /*
                if (fillStyleRND === 0) {
                    fillStyle=  `rgb(${colour}, 0, 0)`;
                } else if (fillStyleRND === 1) {
                    fillStyle=  `rgb(0, 0, ${colour})`;
                } else {
                    fillStyle=  `rgb(0, ${colour}, 0)`;
                }
                ctx.fillStyle = fillStyle;
                */
                ctx.fillStyle = 'black';
                colour -=1;
                if (colour < 125) {
                    colour = 255;
                }
                ctx.fillRect(((x * this.gap) + (x * this.size)), ((y * this.gap) + (y * this.size)), this.size, this.size);
            }
        }
    }
}


(function() {
    const posts = [
        'https://i.pinimg.com/originals/dd/59/4e/dd594e241abf617abed2b7d586c19ef9.jpg',
        'https://pmcvariety.files.wordpress.com/2018/01/carey-mulligan1.jpg?w=700',
        'https://c1.staticflickr.com/6/5279/7391181022_ee25fe55fd_b.jpg'
    ]
    new DotGallery(document.getElementById('dot-gallery-canvas'), document.getElementById('dot-gallery-image'), 5, posts);
})();
