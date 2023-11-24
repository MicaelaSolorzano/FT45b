var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl)
  for(let i = 0; i < startEl.children.length;i++){
const elem = startEl.children[i]
//en elem eta lo que el usuario esta buscando?
let result = traverseDomAndCollectElements(matchFunc, elem)
resultSet =[...resultSet, ...result]
}
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

const selectorTypeMatcher =  (selector) => {
  // tu código aquí
  if(selector[0] === "#") return "id"
  if(selector[0] === ".") return "class"
  if(selector.includes(".")) return "tag.class"
  else return "tag"
  //OTRA FORMA
  return selector[0] === "#" ? "id"
: selector[0] === "." ? "class"
:selector.includes(".") ? "tag.class"
: "tag"
//OTRA FORMA
const selectorTypeMatcher =  (selector) => 
selector[0] === "#" ? "id"
: selector[0] === "." ? "class"
:selector.includes(".") ? "tag.class"
: "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  let selectorType = selectorTypeMatcher(selector);
  let matchFunction;
  if (selectorType === "id") {
    matchFunction = (elem) =>  "#" + elem.id === selector
      // return "#" + elem.id === selector 
    
  } else if (selectorType === "class") {
    matchFunction = function(elem) {
      for(const el of elem.classList){
        if("." + el === selector) return true
        else return false
      }
      //elem.classList.some((el) => ´.${el}´ === selector)
    }
  } else if (selectorType === "tag.class") {
    matchFunction = function(elem){
      const [tag, clase] = selector.split('.')
      let resultTag = matchFunctionMaker(tag)
      let resultClase = matchFunctionMaker("." + clase)
      resultTag(elem) && 
      //&& xq primero valida si esta en el tag y dsp si esta en la clase correspondiente
      resultClase(elem)
      //ES6
      //matchFunction = function (elem){ 
      //const [tag, clase] = selector.split('.')
      //matchFunctionMaker(tag)(elem) &&
      //matchFunctionMaker("." + clase)(elem)}
    }
  } else if (selectorType === "tag") {
    matchFunction = function (elem) {
      if(selector === elem.tagName.toLowerCase()) return true
      else return false
      // return selector === elem.tagName.toLowerCase()
      // matchFunction = (elem) => selector === elem.tagName.toLowerCase()
    }
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
