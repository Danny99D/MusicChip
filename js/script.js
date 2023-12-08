document.addEventListener('DOMContentLoaded', ()=>{

    //Creates a Blank Chip
    let chip = createBlankChip()

    //Inputs
    const chipImageFront = document.getElementById('chipImageFront')
    const chipImageBack = document.getElementById('chipImageBack')
    const chipName = document.getElementById('chipName')
    const chipDesc = document.getElementById('chipDesc')
    const chipSelect = document.getElementById('chipSelect')
    const chipCode = document.getElementById('chipCode')

    //Buttons
    const copyButton = document.getElementById('copyButton')
    const createChip = document.getElementById('createChip')
    const convertButton = document.getElementById('convertButton')
    const tutorialButton = document.getElementById('tutorialButton')

    //Images
    const imageFront = document.getElementById('imageFront')
    const imageBack = document.getElementById('imageBack')
    
    //Convert Menu
    const output = document.getElementById('output')
    const code = document.getElementById('code')

    //Listen the changes of Json Input to load the Tracks
    chipCode.addEventListener('change', (e)=>{
        let code = e.target.value

        //Check if starts and finish with {}
        if(checkJson(code)){

            //Removes the Disabled class to the Convert Menu Button
            createChip.classList.remove('chip-button--disabled')

            //Load the Options to the Select
            loadTracks(JSON.parse(code))

            //Adds the ok class and removes fail class
            toggleInput(chipCode, 1, 0)
        }else{

            //Adds the Disabled class to the Convert Menu Button
            createChip.classList.add('chip-button--disabled')

            //Reset the Select's Options
            resetSelect(chipSelect)

            //Adds the fail class and removes the ok class
            toggleInput(chipCode, 0, 0)
        }
    })

    //Changes the Front Preview image and class of his Input
    chipImageFront.addEventListener('change', ()=>{

        //Check if the Image Link is from the Steam Cloud
        if(checkImgSteam(chipImageFront.value)){

            //Changes the Source of the Preview Front with the new one
            imageFront.src = chipImageFront.value
            
            toggleInput(chipImageFront, 1, 1)

            //Checks if the Image Exists
            checkImagesLoad()
        }else{

            toggleInput(chipImageFront, 0, 1)

            //If the Input is Blank, change the Image Preview to the Default
            if(chipImageFront.value == "" && imageFront.src != ogFrontLink){
                imageFront.src = ogFrontLink
            }
        }
    })

    //The same as above but for the Back Image
    chipImageBack.addEventListener('change', ()=>{

        if(checkImgSteam(chipImageBack.value)){

            imageBack.src = chipImageBack.value

            toggleInput(chipImageBack, 1, 1)

            checkImagesLoad()
        }else{

            toggleInput(chipImageBack, 0, 1)

            if(chipImageBack.value == "" && imageBack.src != ogBackLink){
                imageBack.src = ogBackLink
            }
        }
    })

    //Check if the Nickname's Input is not Blank
    chipName.addEventListener('change', ()=>{
        if(chipName.value != ""){

            toggleInput(chipName, 1, 0)
        }else{

            toggleInput(chipName, 0, 0)
        }
    })

    //Check if the Description's Input is not Blank
    chipDesc.addEventListener('change', ()=>{
        if(chipDesc.value != ""){

            toggleInput(chipDesc, 1, 0)
        }else{

            toggleInput(chipDesc, 0, 0)
        }
    })

    //Check if the Select's Option is not the Default
    chipSelect.addEventListener('change', ()=>{

        if(chipSelect.value != "Choose Page"){
            
            toggleInput(chipSelect, 1, 0)
        }else{

            toggleInput(chipSelect, 0, 0)
        }
    })

    //When Click the Copy to Clipboard button
    copyButton.addEventListener('click', ()=>{
        
            //Selects the Output Textarea
            code.select()

            //Copy the Text in the Clipboard
            document.execCommand("copy")
    })

    //When Click the Convert Menu Button moves the Output DIV
    createChip.addEventListener('click', (e)=>{

        //If the Button doesn't have the Disabled Class toggles the Show Class
        if(!e.target.classList.contains('chip-button--disabled')){

            output.classList.toggle('chip--show')
            tutorial.classList.remove('chip--show')
        }
    })
    
    //When Click the Tutorial Button moves the Tutorial DIV
    tutorialButton.addEventListener('click', ()=>{
        
        tutorial.classList.toggle('chip--show')
        output.classList.remove('chip--show')
    })

    //When Click the Convert to Json Button checks the values and converts to a Chip Json
    convertButton.addEventListener('click', ()=>{

        if(checkValue()){
            
            convertJson(chip)
        }
    })
})