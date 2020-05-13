var clickChoice

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
        "L", x, y,
        "L", start.x, start.y
    ].join(" ");

    console.log(d + "z");

    return d + "z";
}

function SVG(elementName) {
    return document.createElementNS('http://www.w3.org/2000/svg', elementName);
}

function Head(bodyColor, armColor) {

    this.armColor = armColor
    this.bodyColor = bodyColor
    this.headGroup = SVG("g");
    antennaLeft = SVG("path");
    var antennaBallLeft = SVG("ellipse");
    var antennaRight = SVG("path");
    var antennaBallRight = SVG("ellipse");
    var topOfHead = SVG("path");
    var head = SVG("path");
    var leftEye = SVG("circle")
    var leftInnerEye = SVG("circle")
    var rightEye = SVG("circle")
    var rightInnerEye = SVG("circle")
    var mouth = SVG("path");



    antennaLeft.setAttribute("d",
        "M76.782,25.942c-0.08-0.815-2.192-20-22.867-21.928l0.137-1.501c21.916,2.044,24.19,23.07,24.21,23.283L76.782,25.942z"
    )

    antennaBallLeft.setAttribute("cx", "55.021")
    antennaBallLeft.setAttribute("cy", "3.39")
    antennaBallLeft.setAttribute("rx", "3.344")
    antennaBallLeft.setAttribute("ry", "3.391")

    antennaRight.setAttribute("d",
        "M83.217,25.942c0.08-0.815,2.192-20,22.867-21.928l-0.137-1.501c-21.916,2.044-24.188,23.07-24.209,23.283L83.217,25.942z"
    )

    antennaBallRight.setAttribute("cx", "104.979")
    antennaBallRight.setAttribute("cy", "3.39")
    antennaBallRight.setAttribute("rx", "3.344")
    antennaBallRight.setAttribute("ry", "3.391")

    topOfHead.setAttribute("d", "M96.079,32.57v-8.546c-10.72-3.765-21.437-3.98-32.156,0v8.546H96.079z")
    topOfHead.setAttribute("fill", this.armColor)

    head.setAttribute("d",
        "M112.809,28.372H80H47.19c-5.814,18.663-5.499,37.322,0,55.983H80h32.811 C118.309,65.694,118.625,47.035,112.809,28.372z"
    )
    head.setAttribute("fill", bodyColor)

    leftEye.setAttribute("r", 10);
    leftEye.setAttribute("cx", 65);
    leftEye.setAttribute("cy", 50);
    leftEye.setAttribute("fill", "rgb(255,255,255)");

    leftInnerEye.setAttribute("r", 5);
    leftInnerEye.setAttribute("cx", 65);
    leftInnerEye.setAttribute("cy", 50);
    leftInnerEye.setAttribute("fill", "rgb(10,10,10)");

    rightEye.setAttribute("r", 10);
    rightEye.setAttribute("cx", 95);
    rightEye.setAttribute("cy", 50);
    rightEye.setAttribute("fill", "rgb(255,255,255)");

    rightInnerEye.setAttribute("r", 5);
    rightInnerEye.setAttribute("cx", 95);
    rightInnerEye.setAttribute("cy", 50);
    rightInnerEye.setAttribute("fill", "rgb(10,10,10)");

    this.mouthHappy = "M 65 70q 15 4 30 0"
    this.mouthSad = "M 65 70q 15 -4 30 0"
    this.mouthStright = "M 65 70q 15 0 30 0"
    mouth.setAttribute("d", this.mouthStright)
    mouth.setAttribute("stroke-width", 5)
    mouth.setAttribute("stroke", "rgb(255,255,255)");


    this.leftSad = "M 54 48q 12 -18 22 -5z"
    this.leftHalf = "M 54 48q 12 -18 22 0z"
    leftEyeLid = SVG("path")
    leftEyeLid.setAttribute("d", this.leftHalf)
    leftEyeLid.setAttribute("fill", "none")

    this.rightSad = "M 84 45q 12 -17 22 4z"
    this.rightHalf = "M 84 48q 12 -18 22 0z"
    var rightEyeLid = SVG("path")
    rightEyeLid.setAttribute("d", this.rightHalf)
    rightEyeLid.setAttribute("fill", "none")

    this.headGroup.appendChild(antennaLeft);
    this.headGroup.appendChild(antennaBallLeft);
    this.headGroup.appendChild(antennaRight);
    this.headGroup.appendChild(antennaBallRight);
    this.headGroup.appendChild(topOfHead);
    this.headGroup.appendChild(head);
    this.headGroup.appendChild(leftEye);
    this.headGroup.appendChild(leftInnerEye);
    this.headGroup.appendChild(rightEye);
    this.headGroup.appendChild(rightInnerEye);
    this.headGroup.appendChild(mouth);
    this.headGroup.appendChild(leftEyeLid);
    this.headGroup.appendChild(rightEyeLid);

    this.leftEye = leftInnerEye
    this.rightEye = rightInnerEye
    this.leftEyeLid = leftEyeLid
    this.rightEyeLid = rightEyeLid
    this.mouth = mouth;

}

Head.prototype.tiltRight = function () {
    this.headGroup.setAttribute("transform", "rotate(4 80 50)")
}
Head.prototype.tiltLeft = function () {
    this.headGroup.setAttribute("transform", "rotate(-4 80 50)")
}
Head.prototype.smile = function () {
    this.mouth.setAttribute("d", this.mouthHappy)
}
Head.prototype.sad = function () {
    this.mouth.setAttribute("d", this.mouthSad)
}
Head.prototype.stright = function () {
    this.mouth.setAttribute("d", this.mouthStright)
}
Head.prototype.tiltRight = function () {
    this.headGroup.setAttribute("transform", "rotate(4 80 50)")
}
Head.prototype.eyesRight = function () {
    this.rightEye.setAttribute("transform", "translate(5,0)")
    this.leftEye.setAttribute("transform", "translate(5,0)")
}
Head.prototype.eyesLeft = function () {
    this.rightEye.setAttribute("transform", "translate(-5,0)")
    this.leftEye.setAttribute("transform", "translate(-5,0)")
}
Head.prototype.eyesDown = function () {
    this.rightEye.setAttribute("transform", "translate(0,7)")
    this.leftEye.setAttribute("transform", "translate(0,7)")
}
Head.prototype.eyesup = function () {
    this.rightEye.setAttribute("transform", "translate(0,-4)")
    this.leftEye.setAttribute("transform", "translate(0,-4)")
}
Head.prototype.noLids = function () {
    this.rightEyeLid.setAttribute("fill", "none")
    this.leftEyeLid.setAttribute("fill", "none")
}
Head.prototype.lids = function () {
    this.rightEyeLid.setAttribute("d", this.rightHalf)
    this.rightEyeLid.setAttribute("fill", this.armcolor)
    this.leftEyeLid.setAttribute("d", this.leftHalf)
    this.leftEyeLid.setAttribute("fill", this.armcolor)

}
Head.prototype.sadLids = function () {
    this.rightEyeLid.setAttribute("d", this.rightSad)
    this.rightEyeLid.setAttribute("fill", this.armcolor)
    this.leftEyeLid.setAttribute("d", this.leftSad)
    this.leftEyeLid.setAttribute("fill", this.armcolor)
}


function Robot(bodyColor, armColor, height) {

    this.bodyColor = bodyColor;
    this.armColor = armColor;
    this.pos = 0;

    function createArm(bodyColor, armcolor) {
        armGroup = SVG("g");
        var arm = SVG("path");
        arm.setAttribute("d",
            "M121.709,95.944c8.258,4.479,15.268,11.387,20.421,18.846c12.647,18.299,14.458,39.472,10.606,61.464l-10.418-1.878c3.339-19.01,2.353-37.017-8.666-53.158c-4.229-6.199-9.987-12.042-16.924-15.812L121.709,95.944z"
        )
        arm.setAttribute("fill", armColor);

        var elbow = SVG("circle")
        elbow.setAttribute("r", 7);
        elbow.setAttribute("cx", "145")
        elbow.setAttribute("cy", "135")
        elbow.setAttribute("stroke", "rgb(10,10,10)")
        elbow.setAttribute("stroke-width", 4)
        elbow.setAttribute("fill", "none")

        var hand = SVG("path");
        hand.setAttribute("d",
            "M150.395,166.5c6.984,1.975,11.067,9.316,9.119,16.398c-1.011,3.662-3.439,6.523-6.511,8.172c0.168-0.363,0.313-0.742,0.424-1.141c1.237-4.484-1.702-9.234-6.562-10.609c-4.861-1.377-9.803,1.145-11.035,5.631c-0.109,0.396-0.18,0.798-0.223,1.197c-1.784-3.021-2.398-6.748-1.393-10.407C136.166,168.661,143.412,164.523,150.395,166.5z"
        )
        hand.setAttribute("fill", bodyColor);

        var attacment = SVG("path");
        attacment.setAttribute("d",
            "M117.645,94.049l8.34-1.248c5.238,10.201,7.015,20.918,4.695,32.248l-8.339,1.248L117.645,94.049z")
        attacment.setAttribute("fill", "rgb(10,10,10)");


        armGroup.appendChild(arm);
        armGroup.appendChild(elbow);
        armGroup.appendChild(hand);
        armGroup.appendChild(attacment);
        return armGroup
    }


    function createLeg(bodyColor, armcolor) {
        var legGroup = SVG("g");
        var leg = SVG("rect")
        leg.setAttribute("x", 98.729)
        leg.setAttribute("y", 158.432)
        leg.setAttribute("fill", armColor)
        leg.setAttribute("height", 81.291)
        leg.setAttribute("width", 12.771)

        var kneecap = SVG("circle")
        kneecap.setAttribute("r", 7);
        kneecap.setAttribute("cx", "105")
        kneecap.setAttribute("cy", "195")
        kneecap.setAttribute("stroke", "rgb(10,10,10)")
        kneecap.setAttribute("stroke-width", 4)
        kneecap.setAttribute("fill", "none")

        var foot = SVG("path")
        foot.setAttribute("d",
            "M105.115,234.096c9.523,0,17.244,7.119,17.244,15.903H87.871C87.871,241.215,95.593,234.096,105.115,234.096z"
        )
        foot.setAttribute("fill", bodyColor);

        legGroup.appendChild(leg);
        legGroup.appendChild(kneecap);
        legGroup.appendChild(foot);
        return legGroup
    }

    function createTorso(bodyColor, armcolor) {
        var torsoGroup = SVG("g");
        var body = SVG("path");
        body.setAttribute("d",
            "M120.098,92.09H80H39.903c-7.105,26.162-6.721,52.325,0,78.488H80h40.098C126.82,144.416,127.203,118.252,120.098,92.09z"
        )
        body.setAttribute("fill", bodyColor)

        var neck = SVG("rect");
        neck.setAttribute("x", 55)
        neck.setAttribute("y", 83)
        neck.setAttribute("fill", armColor)
        neck.setAttribute("height", 10)
        neck.setAttribute("width", 50)


        torsoGroup.appendChild(body);
        torsoGroup.appendChild(neck);
        return torsoGroup
    }





    this.head = new Head(this.bodyColor, this.armcolor);
    var rightArmGroup = createArm(this.bodyColor, this.armcolor);
    var leftArmGroup = createArm(this.bodyColor, this.armcolor);
    var rightLegGroup = createLeg(this.bodyColor, this.armcolor);
    var leftLegGroup = createLeg(this.bodyColor, this.armcolor);
    var torsoGroup = createTorso(this.bodyColor, this.armcolor)


    // //head.tiltRight()
    // //head.eyesRight()
    // //head.eyesLeft()
    // //head.eyesDown()
    // //head.eyesup()
    // //head.noLids()
    // //head.sadLids()
    //head.lids()
    // //head.sad()
    // //head.smile()

    leftArmGroup.setAttribute("transform", "translate(160,0) scale(-1,1)");
    leftLegGroup.setAttribute("transform", "translate(160,0) scale(-1,1)");

    var bodyGroup = SVG("g")
    bodyGroup.appendChild(rightArmGroup)
    bodyGroup.appendChild(leftArmGroup)
    bodyGroup.appendChild(rightLegGroup)
    bodyGroup.appendChild(leftLegGroup)
    bodyGroup.appendChild(torsoGroup)
    if (height == "thin") {
        bodyGroup.setAttribute("transform", "translate(23,0) scale(.7,1)")
    }
    if (height == "fat") {
        bodyGroup.setAttribute("transform", "translate(0,17) scale(1,.8)")
    }

    this.robotGroup = SVG("g");
    this.robotGroup.appendChild(bodyGroup)
    this.robotGroup.appendChild(this.head.headGroup)
}
Robot.prototype.position = function (pos, xPos, floor) {
    yPos = floor - pos
    this.robotGroup.setAttribute("transform", "translate(" + xPos + "," + yPos + ")")
}
Robot.prototype.expression = function (expression) {

    switch (expression) {
        case "happy":
            this.head.smile();
            this.head.noLids();
            break;
        case "eyesleft":
            this.head.eyesLeft();
            break;
        case "eyesright":
            this.head.eyesRight();
            break;
        case "eyesup":
            this.head.eyesup();
            break;
        case "eyesdown":
            this.head.eyesDown();
            break;
        case "headleft":
            this.head.tiltLeft();
            break;
        case "headright":
            this.head.tiltRight();
            break;
        case "cross":
            this.head.stright();
            this.head.lids();
            break;
        case "sad":
            this.head.sad();
            this.head.sadLids();
            break;
    }
}

SpeechBubble = function (text, color) {

    this.xpos = 0;
    this.ypos = 0;
    this.next = null;
    this.color = color;
    this.text = text;
    words = text.split(" ")
    var lines = []
    var l = 0
    var count = 0
    while (count < words.length) {
        line = ""
        while ((line.length < 20) && (count < words.length)) {
            line = line + words[count] + " ";
            count++;
        }
        lines[l] = line
        l++
    }
    this.group = SVG("g")
    var frame = SVG("rect")
    var height = 10
    frame.setAttribute("stroke", color)
    frame.setAttribute("x", 0)
    frame.setAttribute("y", 0)
    frame.setAttribute("rx", 10)
    frame.setAttribute("ry", 10)
    frame.setAttribute("stroke-width", 3)
    frame.setAttribute("width", 200)
    frame.setAttribute("fill", "#ffff")
    this.group.appendChild(frame)
    var yPos = 20
    for (l in lines) {
        speech = SVG("text")
        speech.setAttribute("font-family","sans-serif")
        speech.setAttribute("font-size","12px")
        speech.setAttribute("x", 10)
        speech.setAttribute("y", yPos)
        var textNode = document.createTextNode(lines[l]);
        speech.appendChild(textNode)
        yPos += 20
        this.group.appendChild(speech)
        height += 20
    }
    frame.setAttribute("height", height)

}

SpeechBubble.prototype.clear= function(){
    elm = this.group
    if (elm != null) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
    }
}
