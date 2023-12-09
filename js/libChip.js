//Default Chip Images
const ogFrontLink = "http://cloud-3.steamusercontent.com/ugc/2296336173259455309/29BC198EDC881C4F2777F4FA35006DBA0DEEE048/"
const ogBackLink = "http://cloud-3.steamusercontent.com/ugc/2296336173258106565/781A9071945ECA94EF512A53DE5908AFE8A672EC/"

//Function to create a Blank Chip
function createBlankChip() {
    let blankChip = '{"SaveName": "","Date": "","VersionNumber": "","GameMode": "","GameType": "","GameComplexity": "","Tags": [],"Gravity": 0.5,"PlayArea": 0.5,"Table": "","Sky": "","Note": "","TabStates": {},"LuaScript": "","LuaScriptState": "","XmlUI": "","ObjectStates": [{"GUID": "78cd5d","Name": "Custom_Tile","Transform": {"posX": 0.792169631,"posY": 0.960001349,"posZ": 5.639861,"rotX": -7.653158E-05,"rotY": 180.000015,"rotZ": -7.568315E-05,"scaleX": 1.0,"scaleY": 1.0,"scaleZ": 1.0},"Nickname": "","Description": "","GMNotes": "","AltLookAngle": {"x": 0.0,"y": 0.0,"z": 0.0},"ColorDiffuse": {"r": 0.145046562,"g": 0.145046562,"b": 0.196026951},"Tags": ["Music Cartridge"],"LayoutGroupSortIndex": 0,"Value": 0,"Locked": false,"Grid": false,"Snap": true,"IgnoreFoW": false,"MeasureMovement": false,"DragSelectable": true,"Autoraise": true,"Sticky": true,"Tooltip": true,"GridProjection": false,"HideWhenFaceDown": false,"Hands": false,"CustomImage": {"ImageURL": "","ImageSecondaryURL": "","ImageScalar": 1.0,"WidthScale": 0.0,"CustomTile": {"Type": 3,"Thickness": 0.1,"Stackable": false,"Stretch": true}},"LuaScript": "","LuaScriptState": "","XmlUI": ""}]}';
    return JSON.parse(blankChip)
}

//Function to change the value Nickname in the Chip Object
function changeChipName(chip, name) {
    if(name != ''){
        chip.ObjectStates[0].Nickname = name
    }else{
        // console.log("Empty Nickname")
    }
}

//Function to change the value Description in the Chip Object
function changeChipDescription(chip, description) {
    if(description != ''){
        chip.ObjectStates[0].Description = description
    }else{
        // console.log("Empty Description")
    }
}

//Function to change the value LuaScript in the Chip Object
function changeChipLuaScript(chip, luaScript) {
    if(luaScript != ''){
        chip.ObjectStates[0].LuaScript = luaScript
    }else{
        // console.log("Empty Script")
    }
}

//Function to change the value of the Front Image in the Chip Object
function changeChipImage(chip, linkImg) {
    let img = linkImg.toString()
    if(checkImgSteam(img)){
        chip.ObjectStates[0].CustomImage.ImageURL = linkImg
    }else{
        // console.log("Bad Front Link Image")
    }
}

//Function to change the value of the Back Image in the Chip Object
function changeChipBackImage(chip, linkImg) {
    let img = linkImg.toString()
    if(checkImgSteam(img)){
        chip.ObjectStates[0].CustomImage.ImageSecondaryURL = linkImg
    }else{
        // console.log("Bad Back Link Image")
    }
}

//Function to load the Select and event
function loadTracks(json) {

    const chipSelect = document.getElementById('chipSelect')
    const tracks = document.getElementById('tracks')

    //Cleans the Select and Track List
    resetSelect(chipSelect)
    deleteChilds(tracks)

    //Load the Select with the Options
    loadPages(json, chipSelect)

    //Adds a EventListener to change the Track List when the Select's Value changes
    chipSelect.addEventListener('change', (e)=>{
        loadTrackList(json[e.target.value])
    })
}


//Function to load the tracks of the page selected
function loadTrackList(trackList) {
    
    const tracks = document.getElementById('tracks')

    //Clean the Tack List
    deleteChilds(tracks)

    //Loop through the trackList Array with the Tracks creating DIV elements
    trackList.forEach((track, i) =>{

        //Create the DIV element
        let div = document.createElement('DIV')
        div.classList.add("track")

        //Create the a DIV element with the Track's name
        let trName = document.createElement('DIV')
        trName.classList.add("track-name")

        //Assign a number for each Track (lower than 10 adds a 0 before)
        let nTrack = ++i < 10 ? "0" + i++ : i++
        trName.textContent = nTrack+" | "+track.name

        //Adds the Name's DIV to their parent DIV
        div.appendChild(trName)

        
        //If the Track has a "steam" property, creates an AUDIO element to preview the Track
        //Another http Steam killer :C
        
        if(track.hasOwnProperty('steam')){
            let st = document.createElement('DIV')
            st.classList.add("track-link")
            st.classList.add("track-link--steam")
            
            div.appendChild(st)
            
            //     let aud = document.createElement('AUDIO')
            //     aud.classList.add("track-audio")
            //     aud.controls = 1
            
            //     let sourceAud = document.createElement('SOURCE')
            //     sourceAud.src = track.steam
            //     sourceAud.setAttribute("type", "audio/mp3")
            
            //     aud.appendChild(sourceAud)
            
            //     div.appendChild(aud)
        }

        //Creates a Youtube Link
        if(track.hasOwnProperty("youtube")){
            let a = document.createElement('A')
            a.href = track.youtube
            a.target = "_blank"
            a.classList.add("track-link")

            div.appendChild(a)
        }

        //Adds the Track's DIV to the Tracks List's DIV
        tracks.appendChild(div)
    })
}

//Function to load the Select of Pages with the Options
function loadPages(json, chipSelect) {

    //Check if json has a value
    if(json){

        //Aux var to select the first option
        let first = true
        let firstKey = "";

        //Loop through the JSON object's Keys to create a Option
        Object.keys(json).forEach(pageName =>{

            //Create a Option
            let opt = document.createElement('OPTION')
            opt.name = pageName
            opt.value = pageName
            opt.id = pageName+"Id"
            opt.textContent = pageName

            //If is the first option created, select it
            if(first){
                opt.selected = 1
                firstKey = pageName
                first = false
            }

            //Adds the Option to the Select
            chipSelect.appendChild(opt)
        })

        //Load the First Page Track List
        if(firstKey != ""){
            loadTrackList(json[firstKey])
        }
    }else{
        // console.log("Json Error loadPages")
    }
}

//Function to reset the Select of Pages to default stage
function resetSelect(select) {

    //Clean the Select Options
    deleteChilds(select)

    //Creates a Default Option selected and disabled
    let opt = document.createElement('OPTION')
    opt.selected = 1
    opt.disabled = 1
    opt.textContent = "Choose Page"

    //Adds the Default Option to the Select
    select.appendChild(opt)
}


//Function to delete all child nodes
function deleteChilds(e) {

    //Loop through all the Child Nodes deleting the first until it has no more
    while (e.hasChildNodes()) {
        e.removeChild(e.firstChild);
    }
}

//Function to change the Border Color of the Form Inputs
function toggleInput(input, mode, isBlank) {

    //"mode" (true | false), (ok | fail)
    if(mode){
        input.classList.add("chip-input--ok")
        input.classList.remove("chip-input--fail")
    }else{
        input.classList.remove("chip-input--ok")
        input.classList.add("chip-input--fail")

        //If the Input can be blank remove the Fail class
        if(isBlank && input.value == ""){
            input.classList.remove("chip-input--fail")
        }
    }
}

//Function to change all the Values from the Blank Chip and output the result in the textarea to copy it
function convertJson(chip) {
    const chipImageFront = document.getElementById('chipImageFront').value == "" ? ogFrontLink : document.getElementById('chipImageFront').value
    const chipImageBack = document.getElementById('chipImageBack').value == "" ? ogBackLink : document.getElementById('chipImageBack').value
    const chipName = document.getElementById('chipName').value == "" ? "Test" : document.getElementById('chipName').value
    const chipDesc = document.getElementById('chipDesc').value == "" ? "Test" : document.getElementById('chipDesc').value
    const chipSelect = document.getElementById('chipSelect').value != "Choose Page" ? document.getElementById('chipSelect').value : ""
    const chipCode = checkJson(document.getElementById('chipCode').value) ? JSON.parse(document.getElementById('chipCode').value) : ""

    const code = document.getElementById('code')
    
    changeChipImage(chip, chipImageFront)

    changeChipBackImage(chip, chipImageBack)

    changeChipName(chip, chipName)

    changeChipDescription(chip, chipDesc)

    changeChipLuaScript(chip, trackToLua(chipCode[chipSelect]))

    code.value = JSON.stringify(chip)
}

//Function to convert the Track's List to the Lua Script
function trackToLua(list) {
    let lua = "playlist = {\n"

    list.forEach(track => {

        //If the Track has the property "steam" draws the Track
        if(track.hasOwnProperty('steam')){
            lua += "    {\n"
            lua += "        title = \""+track.name+"\",\n"
            lua += "        url = \""+track.steam+"\",\n"
            lua += "    },\n"
        }
    });

    lua += "}"

    return lua
}

//Function to check if a Json code starts and finish with {}
function checkJson(code) {
    if(code.charAt(0) == "{" && code.charAt(code.length-1) == '}'){
        return true
    }

    return false
}

//Function to check if the new Image loads correctly, if not substitutes it with the unknown.png and change the Input's class
function checkImagesLoad() {
    const images = document.querySelectorAll('img')
    images.forEach(img => {
        img.addEventListener('error', () => {
            if(img.hasAttribute("refId")){
                img.src = 'assets/img/unknown.png'
            }
        })
    });
}

//Function to check if a Image Link is from the Steam Cloud
function checkImgSteam(img) {
    if(img.includes("http://cloud") && img.includes(".steamusercontent.com/ugc/")){
        return true
    }
    return false    
}

//Function to check all the Values to proceed to Convert to a Chip Json
function checkValue() {
    const chipImageFront = document.getElementById('chipImageFront')
    const chipImageBack = document.getElementById('chipImageBack')
    const chipName = document.getElementById('chipName')
    const chipDesc = document.getElementById('chipDesc')
    const chipSelect = document.getElementById('chipSelect')
    let convert = true

    //Check the Front Image (Empty or Steam cloud link)
    if((checkImgSteam(chipImageFront.value) || chipImageFront.value == "")){
        toggleInput(chipImageFront, 1, 1)
    }else{
        toggleInput(chipImageFront, 0, 1)
        convert = false
    }

    //Check the Back Image (Empty or Steam cloud link)
    if((checkImgSteam(chipImageBack.value) || chipImageBack.value == "")){
        toggleInput(chipImageBack, 1, 1)
    }else{
        toggleInput(chipImageBack, 0, 1)
        convert = false
    }
    
    //Check Empty name
    if(chipName.value != ""){
        toggleInput(chipName, 1, 0)
    }else{
        toggleInput(chipName, 0, 0)
        convert = false
    }

    //Check Empty desc
    if(chipDesc.value != ""){
        toggleInput(chipDesc, 1, 0)
    }else{
        toggleInput(chipDesc, 0, 0)
        convert = false
    }

    //Check Empty desc
    if(chipSelect.value != "Choose Page"){
        toggleInput(chipSelect, 1, 0)
    }else{
        toggleInput(chipSelect, 0, 0)
        convert = false
    }

    return convert
}


