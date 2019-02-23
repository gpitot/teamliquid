

class Scroller {
    constructor() {
        this.points =[];

        this.handleScroll = this.handleScroll.bind(this);

        window.addEventListener('scroll', this.handleScroll);
    }

    addPoint(point) {
        /*
        {
            element : 
            removeOnReached : true/false,
            fn : function () {occurs when reached}
        }
        */
        point.offsetTop = point.element.getBoundingClientRect().top + window.pageYOffset;
        this.points.push(point);
        //.getBoundingClientRect().top + window.pageYOffset
        
        //order points by y point (REVERSE ORDER SO CAN REMOVE IN LOOP LATER)
        this.points = this.points.sort((a,b)=>{return (point.offsetTop < b.offsetTop) ? 1 : -1})
       
    }


    handleScroll(e) {
        const points = this.points;
        const offset = window.pageYOffset;
        if (points.length === 0) {
            window.removeEventListener('scroll', this.handleScroll);
        }
        for (let i=0;i<points.length; i+=1) {
            //need this incase doc height has changed
            let point = points[i];
            const currentOffset = point.element.getBoundingClientRect().top + window.pageYOffset + (window.innerHeight * points[i].offset);
            
            if (currentOffset > offset && currentOffset < offset + window.innerHeight) {
                console.log(currentOffset);
                point.fn();
                if (point.removeOnReached) {
                    points.splice(i, 1);
                }
            }
        }
    }

}

const scroller = new Scroller();

const galleryEl = document.getElementById('gallery-1');
console.log(galleryEl)
scroller.addPoint({
    element : galleryEl,
    offset : 0.2,
    removeOnReached : true,
    fn : function() {
        gallery_1.reached = true;
        gallery_1.displayGallery();
    }
});


const headings = document.querySelectorAll('.heading');
const marginLeft = window.innerWidth > 1000 ? '-75px' : '0';
headings.forEach((heading)=>{
    scroller.addPoint({
        element: heading,
        offset: 0.25,
        removeOnReached : true,
        fn : function() {
            heading.style.opacity = "1";
            heading.style.marginLeft = marginLeft;
        }
    })
});

const bannerCopy = document.querySelector('.banner h1');
bannerCopy.style.opacity = "1";