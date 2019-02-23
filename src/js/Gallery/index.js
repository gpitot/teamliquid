


class Gallery {
    constructor(el, postSrcs) {
        this.DOM = {el : el};
        this.NAV = el.parentElement.getElementsByClassName('navigation')[0];

        this.postSrcs = postSrcs;
        this.posts = [];
        this.loadedCount = 0;
        this.loaded = false;
        this.reached = false;
        this.animating = false;

        this.index = 1;

        this.loadPosts = this.loadPosts.bind(this);
        this.showGallery = this.showGallery.bind(this);
        this.generatePost = this.generatePost.bind(this);
        this.displayPost = this.displayPost.bind(this);
        this.changePost = this.changePost.bind(this);

        this.loadPosts();
    }


    loadPosts() {
        //loads posts
        const postSrcs = this.postSrcs;
        postSrcs.forEach((src) => {
            let img = new Image();
            img.src = src;
            this.posts.push(img);
            img.onload = ()=>{
                this.loadedCount += 1;
                if (this.loadedCount === this.postSrcs.length) {
                    this.loaded = true;
                    this.showGallery();
                }
            }
        });
    }

    displayGallery() {
        console.log(this.reached, this.loaded);
        if (this.reached && this.loaded) {
            this.DOM.el.style.opacity = '1';
        }
    }

    showGallery() {
        //add posts to DOM
        this.posts.forEach((img)=>{
            const post = document.createElement('div');
            post.classList.add('post');

            
            post.appendChild(img);
            
        });

        this.DOM.el.appendChild(this.generatePost(this.posts[0]));
        this.DOM.el.appendChild(this.generatePost(this.posts[1]));
        this.DOM.el.appendChild(this.generatePost(this.posts[2]));


        const nav = this.NAV.querySelectorAll('.nav');
        nav[0].addEventListener('click', ()=>{this.changePost(-1)});
        nav[1].addEventListener('click', ()=>{this.changePost(1)});

        this.displayGallery();
        
    }

    changePost(d) {
        if (this.animating) return;
        let newIndex = this.index + d;
        if (newIndex >= this.posts.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = this.posts.length - 1;
        }
        this.index = newIndex;

        const loadingBar = this.NAV.querySelector('.loading-bar');
        loadingBar.classList.add('animating');
        this.animating = true;
        setTimeout(()=>{
            loadingBar.classList.remove('animating');
            this.displayPost(d);
            this.animating = false;
          
        }, 800);

        
    }
    displayPost(d) {
        

        const currentPosts = this.DOM.el.children;

        let nextPost = this.index + d;
        if (nextPost >= this.posts.length) {
            nextPost = 0;
        } else if (nextPost < 0) {
            nextPost = this.posts.length - 1;
        }

       

        if (d > 0) {
            this.DOM.el.removeChild(currentPosts[0]);
            //append new post    to end of list
            this.DOM.el.appendChild(this.generatePost(this.posts[nextPost]));

        } else if (d < 0) {
            this.DOM.el.removeChild(currentPosts[2]);
            this.DOM.el.prepend(this.generatePost(this.posts[nextPost]));
        }

       
    }

    generatePost(img) {
        const post = document.createElement('div');
        post.classList.add('post');
        post.classList.add('current');
        post.appendChild(img);
        return post;
    }
}



const gallery_posts = [
    'https://i.imgur.com/akLELLk.jpg',
    'https://i.pinimg.com/736x/3e/2e/8c/3e2e8c6fa626636eb4e8bdfe78edab3b--redhead-girl-beautiful-redhead.jpg',
    'https://media.glamour.com/photos/5978ff1b73aedb63556f3a04/1:1/w_1683,h_1683,c_limit/dakota-johnson-beauty-river.jpg',
    'https://profoto.azureedge.net/cdn/04a371f/contentassets/7784c9eed38149edb9a6029cede7a9ff/profoto-d2-rossella-vanon-final-setup-3-001.jpg',
    'https://www.shutterbug.com/images/styles/600_wide/public/Promobl6618.jpg'
];
const gallery_1 = new Gallery(document.getElementById('gallery-1'), gallery_posts);

