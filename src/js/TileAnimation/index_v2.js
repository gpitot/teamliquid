class TileAnimation {
    constructor(el, postSrcs) {
        this.loadedCount = 0;
        this.images = [];
        this.index = 0;
        this.postSrcsAll = postSrcs;

        this.DOM = {el : el};

        this.animationTime = 800;

        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.changeImages = this.changeImages.bind(this);


        this.resizeCanvas();
       

        

        this.DOM.el.addEventListener('click', this.changeImages);
        window.addEventListener('resize', this.resizeCanvas);
    }
    loadPosts() {
        //loads posts
        this.postSrcs = window.innerWidth > window.innerHeight ? this.postSrcsAll.landscape : this.postSrcsAll.portrait;
        this.images = [];
        this.loadedCount = 0;
        this.postSrcs.forEach((src) => {
            let img = new Image();
            img.src = src;
            this.images.push(img);
            img.onload = ()=>{
                this.loadedCount += 1;
                if (this.loadedCount === this.postSrcs.length) {
                    this.changeImages();
                }
            }
        });
    }
    resizeCanvas() {
        this.DOM.width = this.DOM.el.getBoundingClientRect().width;
        this.DOM.height = window.innerHeight - (this.DOM.el.getBoundingClientRect().top + window.pageYOffset);
        this.DOM.el.style.maxHeight = this.DOM.height + 'px';

        this.loadPosts();
    }


    changeImages() {
        this.index += 1;
        if (this.index >= this.images.length) {
            this.index = 0;
        }
        const el = this.DOM.el;

        for (let i=0;i<el.children.length;i++) {
            el.children[i].style.transform = "scale(0)";
        }
        
        setTimeout(()=>{
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            this.startAnimation();
        }, this.animationTime);
        
    }


    startAnimation() {
        const imageSrc = this.postSrcs[this.index];
        const image = this.images[this.index];
        const {el, width, height} = this.DOM;
        //width height = window width and height
        
        let numColumns;
        if (width > 1400) {
            numColumns = 25;
        } else if (width > 1000) {
            numColumns = 12;
        } else if (width > 750) {
            numColumns = 8;
        } else {
            numColumns = 6;
        }

        


        const squareSize = width / numColumns;
        let numRows = Math.ceil(height / squareSize);


        const ratio = width / image.width;
        const imageScaledHeight = image.height * ratio;
        const maxRows = imageScaledHeight / squareSize;

        if (numRows > maxRows) {
            numRows = maxRows;
        }

        //for each col/ row make a div in it with correct layout
        //set background-position
        //then set scale to 1
        let x = 0;
        let y = 0;
        function drawTile() {
            if (x >= numColumns) {
                x = 0;
                y += 1;
            }
            if (y >= numRows) {
                setTimeout(()=>{
                    animate();
                }, 50);
                return;
            };

            const square = document.createElement('div');
            square.classList.add('square');

            square.style.backgroundImage = `url(${imageSrc})`;
            square.style.height = squareSize + 'px';
            square.style.width = squareSize + 'px';
            square.style.backgroundPositionX = -(x * squareSize) + 'px';
            square.style.backgroundPositionY = -(y * squareSize) + 'px';
            square.style.backgroundSize = width + 'px';
            
            el.appendChild(square);

            x += 1;
            drawTile();
        }
        drawTile();



        function animate() {
            for (let i=0;i<el.children.length;i++) {
                el.children[i].style.transform = "scale(1)";
            }
            
        }

       
    }
}


const posts = {
    portrait : [
        'https://i.pinimg.com/originals/dd/59/4e/dd594e241abf617abed2b7d586c19ef9.jpg',
        'https://pmcvariety.files.wordpress.com/2018/01/carey-mulligan1.jpg?w=700',
        'https://c1.staticflickr.com/6/5279/7391181022_ee25fe55fd_b.jpg'
    ],  
    landscape : [
        'images/interactive/surf.jpeg',
        'images/interactive/surf2.jpeg',
        'images/interactive/lake.jpeg',
        'images/interactive/mountain.jpeg',
        'images/interactive/mountain2.jpeg',
    ]
}

const tileAnim = new TileAnimation(document.getElementById('interactive-banner'), posts);