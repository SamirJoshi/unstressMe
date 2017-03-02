stress_events = [
  {
    "type": "Stress",
    "name": "Got my midterm back",
    "stressLevel": "20",
    "fact": "I did well",
    "feelings": "I'm happy",
    "fiction": "I'll do well on every test",
    "timestamp": new Date(2017, 1, 28)
  },
  {
    "type": "Stress",
    "name": "Job interview",
    "stressLevel": "100",
    "fact": "I have an exciting opportunity",
    "feelings": "I'm nervous and anxious",
    "fiction": "If I don't do well I'll never get a job",
    "timestamp": new Date(2017, 1, 27)
  },
  {
    "type": "Stress",
    "name": "Took a midterm",
    "stressLevel": "50",
    "fact": "The test was fine",
    "feelings": "I'm pleased that the test went well",
    "fiction": "I didn't do well compared to other students",
    "timestamp": new Date(2017, 1, 26)
  },
]

decision_events = [
  {
    "type": "Decision",
    "name": "Should I go to Coffee Lab?",
    "pros": "good coffee",
    "cons": "kinda far + money",
    "stressLevel": "75",
    "timestamp": new Date(2017, 1, 28)
  },
  {
    "type": "Decision",
    "name": "Do I gym?",
    "pros": "health",
    "cons": "y tho",
    "stressLevel": "55",
    "timestamp": new Date(2017, 1, 27)
  },
]

current_event = 0
current_type = 'Stress'

whichList = "stress"

if (document.cookie == "") {
  setCookie()
}

function setCookie() {
  var stress_str = JSON.stringify(stress_events)
  var decision_str = JSON.stringify(decision_events)
  var currEv_str = toString(current_event)
  var cookie_str = "json_strings=" + stress_str + "||" + decision_str + "||" + whichList + "||" + currEv_str
  console.log("cookie_str:", cookie_str)
  document.cookie = cookie_str
}

function getCookie() {
  var json_strings = document.cookie.split("||")
  console.log("JS S:", json_strings)
  var stress_str = json_strings[0].substring(13)
  var decision_str = json_strings[1]
  whichList = json_strings[2]
  var currEv_str = json_strings[3]
  console.log("W:", whichList_str, ", CE:", currEv_str, ", DS:", decision_str)
  stress_events = JSON.parse(stress_str)
  decision_events = JSON.parse(decision_str)
  current_event = parseInt(currEv_str)
}

function drawCards(ev_list, type_id){
  var eventsList = document.getElementById("prevEvents")
  var sEvents = document.createElement('div')
  sEvents.setAttribute("id", type_id)
  //console.log("HEREEEE")
  for(i=0; i < ev_list.length && i < 3; i++){
    sEvents.appendChild(drawCard(ev_list[i], i))
  }
  eventsList.appendChild(sEvents)
}

function drawCard(ev, i) {
  var row = document.createElement('div')
  row.setAttribute("class", "row")
  // row.setAttribute("onclick", "location.href='showPastEvent.html'")
  current_event = i
  current_type = ev.type
  row.setAttribute("onclick", "location.href='showPastEvent.html'")

  var rowTime = document.createElement('div')
  rowTime.setAttribute("class", "rowTime")
  var datetime = new Date(ev.timestamp)
  var rTimeText = document.createTextNode(datetime.toDateString() + " - " + ev.type)
  rowTime.appendChild(rTimeText)

  var rowTitle = document.createElement('div')
  rowTitle.setAttribute("class", "rowTitle")
  var rTitleText = document.createTextNode(ev.name)
  rowTitle.appendChild(rTitleText)

  row.appendChild(rowTime)
  row.appendChild(rowTitle)

  return row
}

function switchLists(newList){
  if(newList == 'stress'){
    if(whichList != 'stress'){
      whichList = "stress"
      setCookie()
      showList()
    }
  }
  else{
    if(whichList != 'decision'){
      whichList = "decision"
      setCookie()
      showList()
    }
  }
  console.log("whichlist:", whichList)
}

function showList(){
  getCookie()
  if(whichList == 'stress'){
    console.log("switching to stress list")

    drawGraph(stress_events)
    drawCards(stress_events, "stress")
    var decisionCards = document.getElementById("decision")
    decisionCards.parentNode.removeChild(decisionCards)

    var stressHeader = document.getElementById("stressHeader")
    stressHeader.style.background = "#dcdcdc"

    var decisionHeader = document.getElementById("decisionHeader")
    decisionHeader.style.background = "#f5f5f5"
  }
  else{
    console.log("switching to decision list")
    drawGraph(decision_events)
    drawCards(decision_events, "decision")
    console.log("drew new cards")
    var stressCards = document.getElementById("stress")
    stressCards.parentNode.removeChild(stressCards)

    var stressHeader = document.getElementById("stressHeader")
    stressHeader.style.background = "#f5f5f5"

    var decisionHeader = document.getElementById("decisionHeader")
    decisionHeader.style.background = "#dcdcdc"
  }
}

function showPastEv(){
  getCookie()
  var ev = null
  console.log("whichlist in showPastEv:", whichList)
  if(whichList == "stress"){
    ev = stress_events[current_event]
    console.log("HERE IN STRESS")
  }
  else{
    ev = decision_events[current_event]
    console.log("HERE IN DEC")
  }
  console.log("EV", ev)
  var pastCont = document.getElementById("pastContainer")
  var pastStressType = document.getElementById("pastType")
  var pstText = document.createTextNode(current_type)
  pastStressType.appendChild(pstText)
  var pastName = document.getElementById("pastFieldName")
  var nameText = document.createTextNode(ev.name)
  // console.log("NAMETEXT:", nameText)
  // console.log("PASTNAME:", pastName)
  pastName.appendChild(nameText)

  // console.log("PASTNAME:", pastName)
  var pastStress = document.getElementById("pastFieldStress")
  var stressText= document.createTextNode(ev.stressLevel)
  pastStress.appendChild(stressText)


  if(ev.type == "Stress"){
    var pastField1 = document.createElement('div')
    pastField1.setAttribute("class", "pastField")
    var pastHeader1 = document.createElement('div')
    pastHeader1.setAttribute("class", "pastHeader")
    var headerText1 = document.createTextNode("Fact")
    pastHeader1.appendChild(headerText1)
    pastField1.appendChild(pastHeader1)
    var text1 = document.createTextNode(ev.fact)
    pastField1.appendChild(text1)
    pastCont.appendChild(pastField1)

    var pastField2 = document.createElement('div')
    pastField2.setAttribute("class", "pastField")
    var pastHeader2 = document.createElement('div')
    pastHeader2.setAttribute("class", "pastHeader")
    var headerText2 = document.createTextNode("Fiction")
    pastHeader2.appendChild(headerText2)
    pastField2.appendChild(pastHeader2)
    var text2 = document.createTextNode(ev.fiction)
    pastField2.appendChild(text2)
    pastCont.appendChild(pastField2)

    var pastField3 = document.createElement('div')
    pastField3.setAttribute("class", "pastField")
    var pastHeader3 = document.createElement('div')
    pastHeader3.setAttribute("class", "pastHeader")
    var headerText3 = document.createTextNode("Feelings")
    pastHeader3.appendChild(headerText3)
    pastField3.appendChild(pastHeader3)
    var text3 = document.createTextNode(ev.feelings)
    pastField3.appendChild(text3)
    pastCont.appendChild(pastField3)
  }
  else{
    var pastField1 = document.createElement('div')
    pastField1.setAttribute("class", "pastField")
    var pastHeader1 = document.create('div')
    pastHeader1.setAttribute("class", "pastHeader")
    var headerText1 = document.createTextNode("Pros")
    pastHeader1.appendChild(headerText1)
    pastField1.appendChild(pastHeader1)
    var text1 = document.createTextNode(ev.pros)
    pastField1.appendChild(text1)
    pastCont.appendChild(pastField1)

    var pastField2 = document.createElement('div')
    pastField2.setAttribute("class", "pastField")
    var pastHeader2 = document.createElement('div')
    pastHeader2.setAttribute("class", "pastHeader")
    var headerText2 = document.createTextNode("Cons")
    pastHeader2.appendChild(headerText2)
    pastField2.appendChild(pastHeader2)
    var text2 = document.createTextNode(ev.cons)
    pastField2.appendChild(text2)
    pastCont.appendChild(pastField2)
  }
}

function drawGraph(ev_list) {
  var points = []
  for(i=0; i < ev_list.length; i++){
    var point = {}
    point["x"] = new Date(ev_list[i].timestamp)
    point["y"] = parseInt(ev_list[i].stressLevel)
    points.unshift(point)
  }
  //console.log(points)
  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "theme2",
    title:{
      text: "My Stress History"
    },
    animationEnabled: true,
    axisX : {
      valueFormatString: "DD/MMM",
      interval: 1,
      intervalType: "day"
    },
    axisY : {
      minimum: 0,
      maximum: 100
    },
    data: [
    {
      type: "line",
      dataPoints: points
    }
    ]
  });
  //console.log(chart)
  chart.render();
}

function addToList(list) {
    if (list == 'stress') {
        console.log("add to stress_events")
        var type = "Stress"
        var name = document.getElementById("stressName").value
        var stressLevel = document.getElementById("stressRange").value
        var fact = document.getElementById("stressFact").value
        var feelings = document.getElementById("stressFeeling").value
        var fiction = document.getElementById("stressFiction").value
        var timestamp = new Date()
        var jsonData = {}
        jsonData["type"] = type
        jsonData["name"] = name
        jsonData["stressLevel"] = stressLevel
        jsonData["fact"] = fact
        jsonData["feelings"] = feelings
        jsonData["fiction"] = fiction
        jsonData["timestamp"] = timestamp
        getCookie()
        stress_events.unshift(jsonData)
        setCookie()
        alert("Your stress log has been saved.")
    }
    else if (list == 'decision') {
        console.log("add to decision_events")
        var type = "Decision"
        var name = document.getElementById("decisionName").value
        var stressLevel = document.getElementById("decisionRange").value
        var pro = document.getElementById("decisionPro").value
        var con = document.getElementById("decisionCon").value
        var timestamp = new Date()
        var jsonData = {}
        jsonData["type"] = type
        jsonData["name"] = name
        jsonData["stressLevel"] = stressLevel
        jsonData["pro"] = pro
        jsonData["con"] = con
        jsonData["timestamp"] = timestamp
        getCookie()
        decision_events.unshift(jsonData)
        setCookie()
        alert("Your decision log has been saved.")
    }
    else
      console.log("Something's wrong with saving logs")

    location.href='index.html'
}

if (document.URL.endsWith("index.html")) {
  showList()
}

if (document.URL.endsWith("showPastEvent.html")) {
  showPastEv()
}
