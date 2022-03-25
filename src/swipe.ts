import { isNotDefined } from "./utils";

type SwipeData = {
  sX: number;
  eX: number;
  sY: number;
  eY: number;
}
export function detectswipe(elementId: string, action: () => Promise<void>) {
  const swipe_det: SwipeData = {
    sX: 0,
    sY: 0,
    eY: 0,
    eX: 0
  };
  const min_x = 30;  //min x swipe for horizontal swipe
  const max_x = 30;  //max x difference for vertical swipe
  const min_y = 50;  //min y swipe for vertical swipe
  const max_y = 60;  //max y difference for horizontal swipe
  let direc = "";
  const element = document.getElementById(elementId);
  if (isNotDefined(element)) throw new Error(`Could not find swipe element ${elementId}`)

  element.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
  },false);

  element.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
  },false);

  element.addEventListener('touchend', function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) direc = "r";
      else direc = "l";
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direc = "d";
      else direc = "u";
    }

    if (direc != "" && direc != "u") {
      if(typeof action == 'function') action();
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);  
}