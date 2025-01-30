/***
	Determine keyCodes
***/

if (typeof(KeyboardEvent) != 'undefined') {
    if (typeof(KeyboardEvent.VK_LEFT) != 'undefined') {
      var VK_LEFT = KeyboardEvent.VK_LEFT;
      var VK_UP = KeyboardEvent.VK_UP;
      var VK_RIGHT = KeyboardEvent.VK_RIGHT;
      var VK_DOWN = KeyboardEvent.VK_DOWN;
      var VK_ENTER = KeyboardEvent.VK_ENTER;
      var VK_RED = KeyboardEvent.VK_RED;
      var VK_GREEN = KeyboardEvent.VK_GREEN;
      var VK_YELLOW = KeyboardEvent.VK_YELLOW;
      var VK_BLUE = KeyboardEvent.VK_BLUE;
      var VK_BACK = KeyboardEvent.VK_BACK;
    }
  }
  
  if (typeof(VK_LEFT) == "undefined") {
    var VK_RED = 82; // r
    var VK_GREEN = 71; // g
    var VK_YELLOW = 89; // y
    var VK_BLUE = 66; // b
    var VK_LEFT = 37;
    var VK_UP = 38;
    var VK_RIGHT = 39;
    var VK_DOWN = 40;
    var VK_ENTER = 13;
    var VK_BACK = 220;
  }


// HbbTV Remote Control Key Codes
const KEY_CODES = {
    ENTER: VK_ENTER,
    LEFT: VK_LEFT,
    UP: VK_UP,
    RIGHT: VK_RIGHT,
    DOWN: VK_DOWN,
    BACK: VK_BACK, 
    GREEN: VK_GREEN,
    YELLOW: VK_YELLOW,
    BLUE: VK_BLUE,
    RED: VK_RED
};



export default KEY_CODES