var active = null
var frames = []
var selectBot

function makeFrameClick(id) {
    //console.log("make",bot)
    return function (e) {
        let xpos = e.pageX - document.body.scrollLeft;
        let ypos = e.pageY - document.body.scrollTop;
        console.log(xpos, ypos)
        let itm = document.getElementById("menuBack")
        itm.style.visibility = 'visible'
        itm.style.top = ypos - 20 + 'px'
        itm.style.left = xpos - 20 + 'px'
        active = id
    }

}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function makeClick(bot) {
    //console.log("make",bot)
    return function (e) {
        var rect = e.target.getBoundingClientRect();
        let xpos = e.pageX - document.body.scrollLeft;
        let ypos = e.pageY - document.body.scrollTop;
        console.log(xpos, ypos)
        let itm = document.getElementById("menu")
        itm.style.visibility = 'visible'
        itm.style.top = ypos - 20 + 'px'
        itm.style.left = xpos - 20 + 'px'
        selectBot = bot
    }

}

function toImage(svgId, backgroundImage) {
    var svgString = new XMLSerializer().serializeToString(document.getElementById(svgId));
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8"
    });
    var url = DOMURL.createObjectURL(svg);
    img.onload = function () {
        var bgImg = new Image();
        bgImg.src = 'img/' + backgroundImage;
        let ratio = canvas.width / bgImg.width
        let height = bgImg.height * ratio
        ctx.drawImage(bgImg, 0, 0, 540, height);
        ctx.drawImage(img, -1, -1);
    };
    img.src = url;
    download(svg,"test.png",'image/png')
}
class Frame {
    constructor(svgid, id) {
        this.robNum = 0;
        this.svgid = svgid;
        console.log(svgid, this.svgid);
        this.id = id;
        this.robots = {
            red: {
                order: 0,
                notUsed: true,
                bot: new Robot("#94627D", "#657F8E", "thin")
            },
            blue: {
                order: 0,
                notUsed: true,
                bot: new Robot("#6469AD", "#009a9E", "fat")
            },
        }
        this.robots.red.bot.robotGroup.addEventListener("click", makeClick(this.robots.red.bot))
        this.robots.blue.bot.robotGroup.addEventListener("click", makeClick(this.robots.blue.bot))
        this.bubbleYPos = 10;
    }

    init() {
        var elm = document.getElementById(this.svgid);
        if (elm != null) {
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild);
            }

            this.frame = SVG("g");
            var bground = SVG("image")
            this.backgroundImage = "living.jpg";
            bground.setAttribute('href', "img/" + this.backgroundImage);
            bground.setAttribute("width", "100%")
            bground.setAttribute("id", "bgrng" + this.id)
            bground.addEventListener("click", makeFrameClick(this.id))
            this.frame.appendChild(bground)
            elm.appendChild(this.frame)
        }
    }
    setBackground(backgroundImage) {
        this.backgroundImage = backgroundImage;
        let bground = document.getElementById("bgrng" + this.id)
        bground.setAttribute('href', "img/" + backgroundImage);
        let itm = document.getElementById("menuBack")
        itm.style.visibility = 'hidden'
    }
    setRobot(id) {
        if (this.robNum < 2) {
            if (this.robots[id].notUsed) {
                this.robots[id].order = this.robNum;
                this.robots[id].bot.pos = this.robNum;
                this.frame.appendChild(this.robots[id].bot.robotGroup);
                let height = this.robots[id].bot.robotGroup.getBBox().height
                this.robots[id].bot.position(height, 10 + (this.robNum * 360), 300)
                this.robNum += 1;
                this.robots[id].notUsed = false;
            }
        }
        let itm = document.getElementById("menuBack")
        itm.style.visibility = 'hidden'
    }
    setExpression(expression) {
        selectBot.expression(expression)
        let itm = document.getElementById("menu")
        itm.style.visibility = 'hidden'
    }
    setText(e, x, y) {
        console.log(x, y)
        let itm = document.getElementById("textarea")
        itm.value = ""
        itm.focus();
        itm = document.getElementById("text")


        let xpos = e.pageX - document.body.scrollLeft;
        let ypos = e.pageY - document.body.scrollTop;

        itm.style.left = xpos - 20 + 'px'
        itm.style.top = ypos - 20 + 'px'
        itm.style.visibility = 'visible'

        itm = document.getElementById("menu")
        itm.style.visibility = 'hidden'
    }

    setBubble() {
        let itm = document.getElementById("text")
        itm.style.visibility = 'hidden'

        itm = document.getElementById("textarea")
        var speechBubble = new SpeechBubble(itm.value, selectBot.bodyColor)
        this.frame.appendChild(speechBubble.group)
        var xPos = 160
        if (selectBot.pos == 1) {
            xPos = 190
        }
        speechBubble.group.setAttribute("transform", "translate(" + xPos + "," + this.bubbleYPos + ")")
        this.bubbleYPos += speechBubble.group.getBBox().height + 20
    }

    save() {
        toImage(this.svgid, this.backgroundImage);
        //     console.log("here",this.backgroundImage)
        //     var svgString = new XMLSerializer().serializeToString(document.getElementById(this.svgid));
        //     var canvas = document.getElementById("canvas");
        //     var ctx = canvas.getContext("2d");
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     var DOMURL = self.URL || self.webkitURL || self;
        //     var img = new Image();
        //     var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
        //     var url = DOMURL.createObjectURL(svg);
        //     img.onload = function() {
        //         var bgImg = new Image();
        //         bgImg.src = 'img/kitchen.png';//+this.backgroundImage;
        //         let ratio = canvas.width/bgImg.width
        //         let height = bgImg.height* ratio
        //         ctx.drawImage(bgImg, 0, 0,540,height);
        //         ctx.drawImage(img, 0, 0);
        //     };
        //     img.src = url;        
    }

}


console.log("frame js loded")