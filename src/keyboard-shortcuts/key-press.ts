function isFullyPressed(map: Map<number,boolean>): boolean {
    return Array.from(map.values()).reduce((a, c) => {
        if (c == false) return false;
        if (a == false) return false;
        return c;
    }, true);
}
function initialize(codes: number[]): Map<number, boolean>{
  return codes.reduce((a,c) => {
    a.set(c, false);
    return a;
}, new Map<number, boolean>());
}

export type KeyPressEvents = {
    onkeydown(event: KeyboardEvent): void;
    onkeyup(event: KeyboardEvent): void;
}
export function keyPress(codes: number[], command: () => void): KeyPressEvents {

    let map = initialize(codes);

    return {
        onkeydown(event: KeyboardEvent) {
            const evtobj = (window.event? window.event : event) as KeyboardEvent
            if (false == map.has(event.keyCode)) return;  // skip other keys

            map.set(evtobj.keyCode, true); 
            if (false == isFullyPressed(map)) return ; // don't continue if the shortcut isn't fully pressed

            map = initialize(codes);
            command();
            
        },
        onkeyup(event: KeyboardEvent){
            if (map.has(event.keyCode)){
                map.set(event.keyCode, false);
            }
        }
    }
}
