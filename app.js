const beatMeasure = 16;
const bpm = 110;
const bpmPerMilli = 15000/bpm;
let currentMeasure = 0;


function playSequencer() {
    if (currentMeasure == 16) currentMeasure = 0;
    if ($(`.${currentMeasure}`).hasClass('selected')) {
        $('audio')[0].currentTime = 0;
        $('audio')[0].play();
    }
    currentMeasure++;
}

function togglePlay() {
    setInterval(playSequencer, bpmPerMilli);

}

function handlePlayButton() {
    $('.playbutton').click(togglePlay());
}

function handleBeatSelection() {
    $('.pad').on('click', e => {
        $(event.currentTarget).toggleClass('selected');

        // resets currentTime so when other buttons are clicked it can start immediately playing
        // repeatedly pressing buttons heightens pitch, odd side-effect
        // better solutions exist (see: StackOverflow) but for first iteration this is fine
        if ($(event.currentTarget).hasClass('selected')) {
            $('audio')[0].currentTime = 0;
           $('audio')[0].play();
        }
    });
}

function generateSequencerGrid() {
    let htmlString = '';
    for (let i = 0; i < beatMeasure; i++) {
        htmlString += `<button class="pad ${i+1}"></button>`;
    }
    return htmlString;
}

function composeSequencer(){
    $('.sequencer').empty();
    $('.sequencer').append(generateSequencerGrid);
}

function handleStart() {
    composeSequencer();
    handleBeatSelection();
    handlePlayButton();
}

$(handleStart);