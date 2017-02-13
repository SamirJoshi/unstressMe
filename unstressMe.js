stress_events = [
  {
    "type": "Stress",
    "name": "Got my midterm back yesterday",
    "stressLevel": "20",
    "fact": "I did well",
    "feelings": "I'm happy",
    "fiction": "I'll do well on every test",
    "timestamp": "Today"
  },
  {
    "type": "Stress",
    "name": "Idk",
    "stressLevel": "100",
    "fact": "I did well",
    "feelings": "I'm happy",
    "fiction": "I'll do well on every test",
    "timestamp": "Yesterday"
  },
  {
    "type": "Stress",
    "name": "Took my midterm back yesterday",
    "stressLevel": "20",
    "fact": "I did well",
    "feelings": "I'm happy",
    "fiction": "I'll do well on every test",
    "timestamp": "2 Days Ago"
  },
]

decision_events = [
  {
    "type": "Decision",
    "name": "Should I go to Coffee Lab?",
    "pros": "good coffee",
    "cons": "kinda far + money",
    "stressLevel": "75",
    "timestamp": "Today"
  },
  {
    "type": "Decision",
    "name": "Do I gym?",
    "pros": "health",
    "cons": "y tho",
    "stressLevel": "95",
    "timestamp": "Yesterday"
  },
]
      
whichList = "stress"

function drawCards(ev_list, type_id){
  var eventsList = document.getElementById("prevEvents")
  var sEvents = document.createElement('div')
  sEvents.setAttribute("id", type_id)
  console.log("HEREEEE")
  for(i=0; i < ev_list.length; i++){
    sEvents.appendChild(drawCard(ev_list[i]))
  }
  eventsList.appendChild(sEvents)
}

function drawCard(ev) {
  var row = document.createElement('div')
  row.setAttribute("class", "row")

  var rowTime = document.createElement('div')
  rowTime.setAttribute("class", "rowTime")
  var rTimeText = document.createTextNode(ev.timestamp + " - " + ev.type)
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
      showList()
    }
  }
  else{
    if(whichList != 'decision'){
      whichList = "decision"
      showList()
    }
  }
}

function showList(){
  if(whichList == 'stress'){
    console.log("switching to stress list")
    drawCards(stress_events, "stress")
    var decisionCards = document.getElementById("decision")
    decisionCards.parentNode.removeChild(decisionCards)

    var stressHeader = document.getElementById("stressHeader")
    stressHeader.style.background = "#c1b8a2"

    var decisionHeader = document.getElementById("decisionHeader")
    decisionHeader.style.background = "#eae7df"
  }
  else{
    console.log("switching to decision list")
    drawCards(decision_events, "decision")
    console.log("drew new cards")
    var stressCards = document.getElementById("stress")
    stressCards.parentNode.removeChild(stressCards)

    var stressHeader = document.getElementById("stressHeader")
    stressHeader.style.background = "#eae7df"

    var decisionHeader = document.getElementById("decisionHeader")
    decisionHeader.style.background = "#c1b8a2"
  }
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
        var timestamp = "Today"
        var jsonData = {}
        jsonData["type"] = type
        jsonData["name"] = name
        jsonData["stressLevel"] = stressLevel
        jsonData["fact"] = fact
        jsonData["feelings"] = feelings
        jsonData["fiction"] = fiction
        jsonData["timestamp"] = timestamp
        stress_events.unshift(jsonData)
        console.log(stress_events)
    }
    else {
        //not implemented yet
    }
    alert("Your stress log has been saved.")
    location.href='index.html'
}

if (document.URL.endsWith("index.html")) {
    showList()
}
