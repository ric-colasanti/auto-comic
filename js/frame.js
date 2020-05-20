var active = null
var frames = []
var selectBot
var selectBubble = null;
var activeBubble = null
var mainCanvas = document.createElement('canvas');
mainCanvas.width = 540;
mainCanvas.height =4*310;
var mainCtx = mainCanvas.getContext("2d");
mainCtx.fillStyle = "#ffffff";
mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

function makeFrameClick(id) {
    //console.log("make",bot)
    return function (e) {
        let xpos = e.pageX - document.body.scrollLeft;
        let ypos = e.pageY - document.body.scrollTop;
        let itm = document.getElementById("menu")
        itm.style.visibility = 'hidden'
        itm = document.getElementById("menuBack")
        itm.style.visibility = 'visible'
        itm.style.top = ypos - 20 + 'px'
        itm.style.left = xpos - 20 + 'px'
        active = id
    }

}



function makeClick(bot) {
    //console.log("make",bot)
    return function (e) {
        var rect = e.target.getBoundingClientRect();
        let xpos = e.pageX - document.body.scrollLeft;
        let ypos = e.pageY - document.body.scrollTop;
        itm = document.getElementById("menu")
        itm.style.visibility = 'visible'
        itm.style.top = ypos - 20 + 'px'
        itm.style.left = xpos - 20 + 'px'
        selectBot = bot
    }

}

function makeBubbleText(bubble) {
    //console.log("make",bot)
    return function (e) {
        var rect = e.target.getBoundingClientRect();
        let xpos = e.pageX - document.body.scrollLeft;
        let ypos = e.pageY - document.body.scrollTop;
        //console.log(xpos, ypos)
        let itm = document.getElementById("menuBack")
        itm.style.visibility = 'hidden'
        itm = document.getElementById("menu")
        itm.style.visibility = 'hidden'
        itm = document.getElementById("edittextarea");
        itm.value=bubble.text;
        itm = document.getElementById("edittext")
        itm.style.visibility = 'visible'
        itm.style.top = ypos - 20 + 'px'
        itm.style.left = xpos - 20 + 'px'
        selectBubble = bubble
    }

}

function toImage(svgId, backgroundImage, ypos) {
    var svgString = new XMLSerializer().serializeToString(document.getElementById(svgId));
    var canvas =  document.createElement('canvas');
    canvas.height = 300;
    canvas.width = 540;
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
        ctx.drawImage(img, -3, -3);
        mainCtx.drawImage(canvas, 0, ypos);
    };
    img.src = url;
}
class Frame {
    constructor(svgid, id) {
        ;
        this.svgid = svgid;
        this.id = id;
        this.startBubble=null;   
        this.robList = [];    
    }

    init() {
        this.robNum = 0
        this.robots = {
            red: {
                order: 0,
                notUsed: true,
                bot: new Robot("red","#94627D", "#657F8E", "thin")
            },
            blue: {
                order: 0,
                notUsed: true,
                bot: new Robot("blue","#6469AD", "#009a9E", "fat")
            },
        }
        this.robots.red.bot.robotGroup.addEventListener("click", makeClick(this.robots.red.bot))
        this.robots.blue.bot.robotGroup.addEventListener("click", makeClick(this.robots.blue.bot))
        this.bubbleYPos = 10;
        var elm = document.getElementById(this.svgid);
        if (elm != null) {
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild);
            }

            this.frame = SVG("g");
            var bground = SVG("image")
            this.backgroundImage = "bground.png";
            bground.setAttribute('href', "img/" + this.backgroundImage);
            bground.setAttribute("width", "100%")
            bground.setAttribute("id", "bgrng" + this.id)
            bground.addEventListener("click", makeFrameClick(this.id))
            this.frame.appendChild(bground)
            elm.appendChild(this.frame)
            toImage(this.svgid, this.backgroundImage,this.id*310); 
        }
    }
    setBackground(backgroundImage) {
        this.backgroundImage = backgroundImage;
        let bground = document.getElementById("bgrng" + this.id)
        bground.setAttribute('href', "img/" + backgroundImage);
        toImage(this.svgid, this.backgroundImage,this.id*310); 
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
                this.robList.push(this.robots[id])
            }
        }
        toImage(this.svgid, this.backgroundImage,this.id*310); 
    }
    setExpression(expression) {
        selectBot.expression(expression)
        let itm = document.getElementById("menu")
        itm.style.visibility = 'hidden'
        toImage(this.svgid, this.backgroundImage,this.id*310); 
    }
    setText(e) {
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
        var speechBubble = new SpeechBubble(itm.value, selectBot.bodyColor,selectBot.id)
        speechBubble.robot = {bot:selectBot,num:selectBot.bubbles.length};
        selectBot.bubbles.push(speechBubble)
        this.frame.appendChild(speechBubble.group)
        var xPos = 160
        if (selectBot.pos == 1) {
            xPos = 190
        }
        speechBubble.xpos = xPos
        speechBubble.group.setAttribute("transform", "translate(" + xPos + "," + this.bubbleYPos + ")")
        speechBubble.ypos = this.bubbleYPos; 
        this.bubbleYPos += speechBubble.group.getBBox().height + 20
        toImage(this.svgid, this.backgroundImage,this.id*310); 
        speechBubble.group.addEventListener("click", makeBubbleText(speechBubble))
        if(activeBubble != null){
            //console.log(activeBubble)
            activeBubble.next = speechBubble;
            //console.log(activeBubble.xpos)
            //console.log("next",activeBubble.next.xpos)
        }
        if(this.startBubble==null){
            this.startBubble = speechBubble;
        }
        activeBubble= speechBubble;

    }

    editBubble() {
        let x = selectBubble.xpos;
        let y = selectBubble.ypos;
        let itm = document.getElementById("edittext")
        itm.style.visibility = 'hidden'

        itm = document.getElementById("edittextarea")
        var speechBubble = new SpeechBubble(itm.value, selectBubble.color,selectBubble.robot.id)
        speechBubble.xpos = x
        speechBubble.ypos = y;
        speechBubble.robot = selectBubble.robot;
        speechBubble.robot.bot.bubbles[selectBubble.robot.num]=speechBubble;
        this.frame.appendChild(speechBubble.group)
        speechBubble.group.setAttribute("transform", "translate(" + x+ "," + y+ ")")
        speechBubble.group.addEventListener("click", makeBubbleText(speechBubble))
        speechBubble.next = selectBubble.next;
        let dif = speechBubble.group.getBBox().height  - selectBubble.group.getBBox().height
        this.bubbleYPos += dif
        let next = speechBubble.next
        while( next != null){
            //console.log("*",next.ypos)
            next.ypos += dif
            //console.log(next.ypos)
            next.group.setAttribute("transform", "translate(" + next.xpos+ "," + next.ypos+ ")")
            next = next.next;
        }
        if(selectBubble == this.frame.startBubble){
            this.frame.startBubble = speechBubble;
        }
        selectBubble.clear()
        toImage(this.svgid, this.backgroundImage,this.id*310); 
    }

    toJson(){
        let jFrame = {backgroundImage:this.backgroundImage}
        let bubble = this.startBubble;
        let i = 0
        let j = 0
        let bots = []
        //console.log(this.robList.length)
        for(i=0;i<this.robList.length;i++){
            let robot = this.robList[i].bot;
            //console.log(robot.id)
            let bot = {robotId:robot.id}
            //console.log(robot.id)
            let expressions = []
            for(j=0; j<robot.toString.length;j++){
                expressions.push(robot.toString[j]);
               // console.log(robot.toString[j])
            }
            bots.push({robotId:bot,expressions :expressions})
        }
        let bubbles = []
        while( bubble!=null){
            //console.log(bubble.robotId,bubble.text)
            bubbles.push({robotId:bubble.robotId, text:bubble.text})
            bubble = bubble.next;
        }
        jFrame.bots = bots;
        jFrame.bubbles = bubbles;
        
        return jFrame;
    }
}

function save(){
    var imgAsDataURL = mainCanvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.href = imgAsDataURL
    link.download = "mycomic.png";
    link.click();    
}

function saveAll(){
    itm = document.getElementById("email")
    let email = itm.value
    itm = document.getElementById("name")
    let name = itm.value
    var comic={name:name, emeil:emeil}
    comic.pic = mainCanvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    comic.frames = []
    let i=0
    for(i=0;i<4;i++){
        comic.frames.push(frames[i].toJson())
    }
    console.log(comic);
    //save()
}

//console.log("frame js loded")