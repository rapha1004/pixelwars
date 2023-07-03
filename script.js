const colorsChoice = document.querySelector('#colorsChoice')
const game = document.querySelector('#game')
const cursor = document.querySelector('#cursor')

game.width = 1200
game.height = 600
const gridCellSize = 10


function grid(){
    if(activegrid == true){
        activegrid = false
    }else{
        activegrid = true
    }
}

const ctx = game.getContext('2d');
const gridCtx = game.getContext('2d');
const colorList = [
    "#FFEBEE", "#FCE4EC", "#F3E5F5","#B39DDB", "#9FA8DA", "#90CAF9", "#81D4FA", 
    "#4DB6AC", "#66BB6A", "#9CCC65", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "red",
    "#A1887F", "#E0E0E0", "#90A4AE", "#000","#fff", 
]
let currentColorChoice = colorList[20]

const firebaseConfig = {
    apiKey: "AIzaSyB1KjHnsKjs55gcK7-PFuhIm5CJKFsto-Q",
    authDomain: "platy-pixel.firebaseapp.com",
    projectId: "platy-pixel",
    storageBucket: "platy-pixel.appspot.com",
    messagingSenderId: "929020111095",
    appId: "1:929020111095:web:477628b7ae835cfc8c0bf2"
  };
  
 firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

colorList.forEach(color => {
    const colorItem = document.createElement('div')
    colorItem.style.backgroundColor = color
    colorsChoice.appendChild(colorItem)

    colorItem.addEventListener('click', () => {
        currentColorChoice = color

        colorItem.innerHTML = `<i class="fa-solid fa-check"></i>`


        setTimeout(() => {
            colorItem.innerHTML = ""
        }, 1000)
    })
})

function createPixem(){
    
}

function addPixelIntoGame(){
    const x = cursor.offsetLeft
    const y = cursor.offsetTop - game.offsetTop
    
    
    ctx.beginPath()
    ctx.fillStyle = currentColorChoice
    ctx.fillRect(x, y, gridCellSize, gridCellSize)

    const pixel = {
        x,
        y,
    
    }

    const pixelRef = db.collection('pixels').doc(`${pixel.x}-${pixel.y}`)
    pixelRef.set(pixel, {merge: true })

}

cursor.addEventListener('click', function(event) {
  addPixelIntoGame()
})

game.addEventListener('click', function(){
  addPixelIntoGame()
})

    function drawGrids(ctx, width, height, cellWidth, cellHeight){
        ctx.beginPath()
        ctx.strokeStyle = '#ccc'
    
        for (let i = 0; i < width; i++) {
            ctx.moveTo(i * cellWidth, 0)
            ctx.lineTo(i * cellWidth, height)
        }
    
        for (let i = 0; i < height; i++) {
            ctx.moveTo(0, i * cellHeight)
            ctx.lineTo(width, i * cellHeight)
        }
        ctx.stroke()
    }


drawGrids(gridCtx, game.width, game.height, gridCellSize, gridCellSize)

game.addEventListener('mousemove', function(event){
    console.log(" x :", event.clientX)
    console.log(" y :", event.clientY)

    const cursorLeft = event.clientX - (cursor.offsetWidth / 2)
    const cursorTop = event.clientY - (cursor.offsetHeight / 2)


    cursor.style.left = Math.floor(cursorLeft / gridCellSize) * gridCellSize + "px"
    cursor.style.top = Math.floor(cursorTop / gridCellSize) * gridCellSize + "px"
})

