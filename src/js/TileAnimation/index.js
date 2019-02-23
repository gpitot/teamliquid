
class TileAnimation {
    constructor(canvas, postSrcs) {
        this.loadedCount = 0;
        this.images = [];
        this.index = 0;
        this.postSrcs = postSrcs;

        this.DOM = {canvas : canvas}
        this.DOM.ctx = canvas.getContext('2d');


        this.resizeCanvas = this.resizeCanvas.bind(this);
        
        this.resizeCanvas();
        this.loadPosts();



        window.addEventListener('resize', this.resizeCanvas);
    }

    resizeCanvas() {
        this.DOM.canvas.width = window.innerWidth;
        this.DOM.canvas.height = window.innerHeight - (this.DOM.canvas.getBoundingClientRect().top + window.pageYOffset);
    }

    loadPosts() {
        //loads posts
        const postSrcs = this.postSrcs;
        postSrcs.forEach((src) => {
            let img = new Image();
            img.src = src;
            this.images.push(img);
            img.onload = ()=>{
                this.loadedCount += 1;
                if (this.loadedCount === this.postSrcs.length) {
                    this.startAnimation();
                }
            }
        });
    }


    startAnimation() {
        const image = this.images[this.index];
        const {canvas, ctx} = this.DOM;

        const numColumns = 25;
        const squareSizeCanvas = canvas.width / numColumns;
        const numRows = canvas.height / squareSizeCanvas;

        const ratio = canvas.width / image.width;
        const imageScaledHeight = image.height / ratio;


        const squareSizeImage = squareSizeCanvas / ratio;
        //ctx.drawImage(image, 0, 0, image.width, imageScaledHeight, 0, 0, canvas.width, canvas.height);


        let x = 0;
        let y = 0;

        function drawTile() {
            console.log(x);
            if (x >= numColumns) {
                x= 0;
                y += 1;
            }
            
            if (y >= numRows) {
                return;
            }
            ctx.drawImage(image, x*squareSizeImage, y*squareSizeImage,(x+1)*squareSizeImage, (y+1)*squareSizeImage, x*squareSizeCanvas, y*squareSizeCanvas, (x+1)*squareSizeCanvas, (y+1)*squareSizeCanvas,)
            
            x += 1;
            requestAnimationFrame(()=>{drawTile()});

        }

        drawTile();
    }

    


}

const posts = [
    'images/interactive/surf.jpeg'
]
//const tileAnim = new TileAnimation(document.getElementById('banner-canvas'), posts);