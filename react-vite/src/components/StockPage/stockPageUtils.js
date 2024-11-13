// function to convert large number format
export const convert = num => {
  if (isNaN(num)){
    return unavailable
  }
  num = parseInt(num).toString().split('')

  if (num.length < 4){
    return num.join('')
  }
  else if(num.length >= 4 && num.length < 7){
    if (num.length == 4){
      num.splice(1, 0, ',')
    }
    else if (num.length == 5){
      num.splice(2, 0, ',')
    }
    else if (num.length == 6){
      num.splice(3, 0, ',')
    }
    return num.join('')
  }
  else if(num.length >= 7 && num.length < 10){
    if (num.length == 7){
      num.splice(1, 0, '.')
      num.splice(4)
    }
    else if (num.length == 8){
      num.splice(2, 0, '.')
      num.splice(5)
    }
    else if (num.length == 9){
      num.splice(3, 0, '.')
      num.splice(6)
    }
    return num.join('') + 'M'
  } else if(num.length >= 10 && num.length < 13){
    if (num.length == 10){
      num.splice(1, 0, '.')
      num.splice(4)
    }
    else if (num.length == 11){
      num.splice(2, 0, '.')
      num.splice(5)
    }
    else if (num.length == 12){
      num.splice(3, 0, '.')
      num.splice(6)
    }
    return num.join('') + 'B'
  } else if(num.length >= 13){
    num.splice(num.length - 10)
    if (num.length > 2){
      num.splice(1, 0, '.')
    }
    else if (num.length > 3){
      num.splice(2, 0, '.')
    }
    return num.join('') + 'T'
  }
  else return num.join('')
}

export const unavailable = "Information not available"

export const setVisible = (a, b, setAVisibility, setBVisibility) => {
    if(a == 'visible'){
        setAVisibility('invisible')
        setBVisibility('visible')
    }
    if(b == 'visible'){
        setAVisibility('visible')
        setBVisibility('invisible')
    }
}
