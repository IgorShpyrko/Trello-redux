export default function findTargetParentByClassName(elem, searchClassName) {
  
  if(elem.className !== searchClassName){
    elem = elem.parentNode
    return findTargetParentByClassName(elem, searchClassName)
  }
  
  if(elem.className === searchClassName){
    return elem
  } 
}