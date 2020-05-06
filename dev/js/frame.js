var active = null
var frames=[]
var selectBot
function makeFrameClick(id){
    //console.log("make",bot)
    return function(e){
        let xpos = e.clientX //-e.clientX - rect.left
        let ypos = e.clientY //-e.clientX - rect.top
        let itm = document.getElementById("menuBack")
        console.log(this)
        itm.style.visibility = 'visible'
        itm.style.top = ypos - 20 + 'px'
        itm.style.left = xpos - 20 + 'px' 
        active = id
    }

}

function makeClick(bot){
    //console.log("make",bot)
    return function(e){
        var rect = e.target.getBoundingClientRect();
        xpos = e.clientX//-e.clientX - rect.left
        ypos = e.clientY//-e.clientX - rect.top
        let itm = document.getElementById("menu")
        itm.style.visibility = 'visible'
        itm.style.top = ypos-20+'px'
        itm.style.left = xpos-20+'px'
        selectBot = bot  
        console.log(selectBot)     
    }

}
class Frame {
    constructor(svgid,id) {
        console.log("1",svgid)
        this.robNum = 0
        this.svgid = svgid
        this.id = id;
        this.robots={
            red:{
                order:0, 
                bot:new Robot("#94627D", "#657F8E", "thin")
                },            
            blue:{
                order:0, 
                bot:new Robot("#6469AD", "#009a9E", "fat")
                },
        }
        console.log("bots1")
        this.robots.red.bot.robotGroup.addEventListener("click",makeClick(this.robots.red.bot))
        console.log("G")
        this.robots.blue.bot.robotGroup.addEventListener("click",makeClick(this.robots.blue.bot))
        this.bubbleYPos = 10;
    }

    init(){
        var elm = document.getElementById(this.svgid);
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
        this.frame = SVG("g");
        var bground = SVG("image")
        bground.setAttribute('href', "img/living.jpg");
        bground.setAttribute("width", "100%")
        bground.setAttribute("id", "bgrng"+this.id)
        bground.addEventListener("click", makeFrameClick(this.id))
        this.frame.appendChild(bground)
        elm.appendChild(this.frame)
    }
    setBackground(backgroundImage) {
        let bground = document.getElementById("bgrng"+this.id)
        bground.setAttribute('href', "img/" + backgroundImage);
        let itm = document.getElementById("menuBack")
        itm.style.visibility = 'hidden'
    }
    setRobot(id){
        if(this.robNum<2){
            this.robots[id].order = this.robNum;
            this.robots[id].bot.pos = this.robNum;   
            this.frame.appendChild(this.robots[id].bot.robotGroup);
            let height = this.robots[id].bot.robotGroup.getBBox().height
            this.robots[id].bot.position(height, 10 + (this.robNum*360), 300) 
            this.robNum+=1;
        }
        let itm = document.getElementById("menuBack")
        itm.style.visibility = 'hidden'
    }
    setExpression(expression){
        selectBot.expression(expression)
        let itm = document.getElementById("menu")
        itm.style.visibility = 'hidden'
    }
    setText(e){
        let itm = document.getElementById("textarea")
        itm.value = ""
        itm.focus();
        itm = document.getElementById("text")
        itm.style.visibility = 'visible'
        var rect = e.target.getBoundingClientRect();
            xpos = e.clientX//-e.clientX - rect.left
            ypos = e.clientY//-e.clientX - rect.top
            
            itm.style.visibility = 'visible'
            itm.style.top = ypos-20+'px'
            itm.style.left = xpos-20+'px'
        
        itm = document.getElementById("menu")
        itm.style.visibility = 'hidden'
    }

    setBubble(){
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

}
var frameInit = function(){
    frames.push(new Frame("svg01",0))
    frames.push(new Frame("svg02",1))
    frames[0].init()
    frames[1].init()
    active = 0
}

console.log("frame js loded")