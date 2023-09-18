export const text = {
    show : false, // foi
    content: 'Bem vindo', // foi
    font : 'Impact', // foi
    size : '500px',
    align : 'center', // nao vou colocar
    baseAlign : 'middle', // nao vou colocar
    position : [0.5,0.5], // percent //foi
    limit : [0.8,0.8], // percent  // foi
    gradient : [
        {stop: 0.1, hex: '#FF0000'},
        {stop: 0.5, hex: '#FF0000'},
        {stop: 0.8, hex: '#FF0000'},
    ],
}

export const particle = {
    number : 3000,
    line: 1,
    colors : ['#b582b5','#800080','#FFFFFF'], 
    speedModifier : [1,1], // max and min
    length : [0,100], // max and min
    curve : [0.01,3], // max and min
    attempt: 10,
}

export const size = {
    width : window.innerWidth,
    height : window.innerHeight,
    cell : 10,
}


export const options = {
    width : Math.floor(size.width / size.cell) * size.cell,
    height : Math.floor(size.height / size.cell) * size.cell,
    cell : size.cell,
}

export const grid = {
    show : false,
    color : '#FF0000',

}

export function setupMenu(element) {
    element.addEventListener('click', () =>  document.getElementById("menu").classList.toggle('hidden'))
}