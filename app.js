const cols = document.querySelectorAll(".col")


document.addEventListener('click', ev => {
    const type = ev.target.dataset.type;

    if(type === "lock"){ 
        const node = ev.target.tagName.toLowerCase() === "i"
        ? ev.target
        : ev.target.children[0]

        node.classList.toggle("fa-lock-open")
        node.classList.toggle("fa-lock")
    } else if (type === "restart") {
        setRandomColors()
    } else if (type === "copyText") {
        copuToClickBoadr(ev.target.textContent)
    }

})

function setRandomColors(isInitial) {
    const colors = isInitial ?  getColorsFromHash() : []

    cols.forEach((col , index) => {
        const isLocked =  col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')

        const color = isInitial 
        ? colors[index]
            ? colors[index]
            : chroma.random()
        : chroma.random()

        if(isLocked) {
            colors.push(text.textContent)
            return
        }

        if(!isInitial) {
            colors.push(color)
        }

    
        text.textContent = color;
        col.style.background = color;

        setTextColor(text,color);
        setTextColor(button,color);

        updateColorHash(colors)
    })
}

function copuToClickBoadr (text) {
return navigator.clipboard.writeText(text)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();

    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorHash (colors = []) {
document.location.hash = colors
.map((col) => {
    return col.toString().substring(1)
})
.join('-')
}

function getColorsFromHash () {
    if(document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => '#' + color )
    }
    return []
}

setRandomColors(true)