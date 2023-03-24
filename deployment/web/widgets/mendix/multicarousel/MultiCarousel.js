define(['exports', 'react'], (function (exports, react) { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var reactAliceCarousel = {};

	var lib = {};

	var utils$1 = {};

	var calculateDirection$1 = {};

	var types$1 = {};

	Object.defineProperty(types$1, "__esModule", {
	  value: true
	});
	types$1.TraceDirectionKey = types$1.Direction = types$1.Axis = void 0;
	var TraceDirectionKey;
	types$1.TraceDirectionKey = TraceDirectionKey;
	(function (TraceDirectionKey) {
	  TraceDirectionKey["NEGATIVE"] = "NEGATIVE";
	  TraceDirectionKey["POSITIVE"] = "POSITIVE";
	  TraceDirectionKey["NONE"] = "NONE";
	})(TraceDirectionKey || (types$1.TraceDirectionKey = TraceDirectionKey = {}));
	var Direction;
	types$1.Direction = Direction;
	(function (Direction) {
	  Direction["TOP"] = "TOP";
	  Direction["LEFT"] = "LEFT";
	  Direction["RIGHT"] = "RIGHT";
	  Direction["BOTTOM"] = "BOTTOM";
	  Direction["NONE"] = "NONE";
	})(Direction || (types$1.Direction = Direction = {}));
	var Axis;
	types$1.Axis = Axis;
	(function (Axis) {
	  Axis["X"] = "x";
	  Axis["Y"] = "y";
	})(Axis || (types$1.Axis = Axis = {}));

	Object.defineProperty(calculateDirection$1, "__esModule", {
	  value: true
	});
	calculateDirection$1.calculateDirection = calculateDirection;
	var _types$5 = types$1;
	function calculateDirection(trace) {
	  var direction;
	  var negative = _types$5.TraceDirectionKey.NEGATIVE;
	  var positive = _types$5.TraceDirectionKey.POSITIVE;
	  var current = trace[trace.length - 1];
	  var previous = trace[trace.length - 2] || 0;
	  if (trace.every(function (i) {
	    return i === 0;
	  })) {
	    return _types$5.TraceDirectionKey.NONE;
	  }
	  direction = current > previous ? positive : negative;
	  if (current === 0) {
	    direction = previous < 0 ? positive : negative;
	  }
	  return direction;
	}

	var calculateDirectionDelta$1 = {};

	var common$1 = {};

	Object.defineProperty(common$1, "__esModule", {
	  value: true
	});
	common$1.resolveAxisDirection = common$1.getDirectionValue = common$1.getDirectionKey = common$1.getDifference = void 0;
	var _types$4 = types$1;
	var getDirectionKey = function getDirectionKey() {
	  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var key = Object.keys(object).toString();
	  switch (key) {
	    case _types$4.TraceDirectionKey.POSITIVE:
	      return _types$4.TraceDirectionKey.POSITIVE;
	    case _types$4.TraceDirectionKey.NEGATIVE:
	      return _types$4.TraceDirectionKey.NEGATIVE;
	    default:
	      return _types$4.TraceDirectionKey.NONE;
	  }
	};
	common$1.getDirectionKey = getDirectionKey;
	var getDirectionValue = function getDirectionValue() {
	  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  return values[values.length - 1] || 0;
	};
	common$1.getDirectionValue = getDirectionValue;
	var getDifference = function getDifference() {
	  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  return Math.abs(x - y);
	};
	common$1.getDifference = getDifference;
	var resolveAxisDirection = function resolveAxisDirection(axis, key) {
	  var negative = _types$4.Direction.LEFT;
	  var positive = _types$4.Direction.RIGHT;
	  var direction = _types$4.Direction.NONE;
	  if (axis === _types$4.Axis.Y) {
	    negative = _types$4.Direction.BOTTOM;
	    positive = _types$4.Direction.TOP;
	  }
	  if (key === _types$4.TraceDirectionKey.NEGATIVE) {
	    direction = negative;
	  }
	  if (key === _types$4.TraceDirectionKey.POSITIVE) {
	    direction = positive;
	  }
	  return direction;
	};
	common$1.resolveAxisDirection = resolveAxisDirection;

	Object.defineProperty(calculateDirectionDelta$1, "__esModule", {
	  value: true
	});
	calculateDirectionDelta$1.calculateDirectionDelta = calculateDirectionDelta;
	var _types$3 = types$1;
	var _common$1 = common$1;
	function calculateDirectionDelta(traceDirections) {
	  var delta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var length = traceDirections.length;
	  var i = length - 1;
	  var direction = _types$3.TraceDirectionKey.NONE;
	  for (; i >= 0; i--) {
	    var current = traceDirections[i];
	    var currentKey = (0, _common$1.getDirectionKey)(current);
	    var currentValue = (0, _common$1.getDirectionValue)(current[currentKey]);
	    var prev = traceDirections[i - 1] || {};
	    var prevKey = (0, _common$1.getDirectionKey)(prev);
	    var prevValue = (0, _common$1.getDirectionValue)(prev[prevKey]);
	    var difference = (0, _common$1.getDifference)(currentValue, prevValue);
	    if (difference >= delta) {
	      direction = currentKey;
	      break;
	    } else {
	      direction = prevKey;
	    }
	  }
	  return direction;
	}

	var calculateDuration$1 = {};

	Object.defineProperty(calculateDuration$1, "__esModule", {
	  value: true
	});
	calculateDuration$1.calculateDuration = calculateDuration;
	function calculateDuration() {
	  var prevTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var nextTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  return prevTime ? nextTime - prevTime : 0;
	}

	var calculateMovingPosition$1 = {};

	Object.defineProperty(calculateMovingPosition$1, "__esModule", {
	  value: true
	});
	calculateMovingPosition$1.calculateMovingPosition = calculateMovingPosition;
	function calculateMovingPosition(e) {
	  if ('changedTouches' in e) {
	    var touches = e.changedTouches && e.changedTouches[0];
	    return {
	      x: touches && touches.clientX,
	      y: touches && touches.clientY
	    };
	  }
	  return {
	    x: e.clientX,
	    y: e.clientY
	  };
	}

	var calculatePosition$1 = {};

	var updateTrace$1 = {};

	Object.defineProperty(updateTrace$1, "__esModule", {
	  value: true
	});
	updateTrace$1.updateTrace = updateTrace;
	function updateTrace(trace, value) {
	  var last = trace[trace.length - 1];
	  if (last !== value) {
	    trace.push(value);
	  }
	  return trace;
	}

	var resolveDirection$1 = {};

	var calculateTraceDirections$1 = {};

	Object.defineProperty(calculateTraceDirections$1, "__esModule", {
	  value: true
	});
	calculateTraceDirections$1.calculateTraceDirections = calculateTraceDirections;
	var _types$2 = types$1;
	function _defineProperty$2(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	  return obj;
	}
	function calculateTraceDirections() {
	  var trace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var ticks = [];
	  var positive = _types$2.TraceDirectionKey.POSITIVE;
	  var negative = _types$2.TraceDirectionKey.NEGATIVE;
	  var i = 0;
	  var tick = [];
	  var direction = _types$2.TraceDirectionKey.NONE;
	  for (; i < trace.length; i++) {
	    var current = trace[i];
	    var prev = trace[i - 1];
	    if (tick.length) {
	      var currentDirection = current > prev ? positive : negative;
	      if (direction === _types$2.TraceDirectionKey.NONE) {
	        direction = currentDirection;
	      }
	      if (currentDirection === direction) {
	        tick.push(current);
	      } else {
	        ticks.push(_defineProperty$2({}, direction, tick.slice()));
	        tick = [];
	        tick.push(current);
	        direction = currentDirection;
	      }
	    } else {
	      if (current !== 0) {
	        direction = current > 0 ? positive : negative;
	      }
	      tick.push(current);
	    }
	  }
	  if (tick.length) {
	    ticks.push(_defineProperty$2({}, direction, tick));
	  }
	  return ticks;
	}

	Object.defineProperty(resolveDirection$1, "__esModule", {
	  value: true
	});
	resolveDirection$1.resolveDirection = resolveDirection;
	var _calculateDirection = calculateDirection$1;
	var _calculateTraceDirections = calculateTraceDirections$1;
	var _calculateDirectionDelta = calculateDirectionDelta$1;
	var _common = common$1;
	var _types$1 = types$1;
	function resolveDirection(trace) {
	  var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types$1.Axis.X;
	  var directionDelta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	  if (directionDelta) {
	    var directions = (0, _calculateTraceDirections.calculateTraceDirections)(trace);
	    var _direction = (0, _calculateDirectionDelta.calculateDirectionDelta)(directions, directionDelta);
	    return (0, _common.resolveAxisDirection)(axis, _direction);
	  }
	  var direction = (0, _calculateDirection.calculateDirection)(trace);
	  return (0, _common.resolveAxisDirection)(axis, direction);
	}

	var calculateVelocity$1 = {};

	Object.defineProperty(calculateVelocity$1, "__esModule", {
	  value: true
	});
	calculateVelocity$1.calculateVelocity = calculateVelocity;
	function calculateVelocity(x, y, time) {
	  var magnitude = Math.sqrt(x * x + y * y);
	  return magnitude / (time || 1);
	}

	Object.defineProperty(calculatePosition$1, "__esModule", {
	  value: true
	});
	calculatePosition$1.calculatePosition = calculatePosition;
	var _updateTrace = updateTrace$1;
	var _resolveDirection = resolveDirection$1;
	var _calculateDuration = calculateDuration$1;
	var _calculateVelocity = calculateVelocity$1;
	var _types = types$1;
	function calculatePosition(state, options) {
	  var start = state.start,
	    x = state.x,
	    y = state.y,
	    traceX = state.traceX,
	    traceY = state.traceY;
	  var rotatePosition = options.rotatePosition,
	    directionDelta = options.directionDelta;
	  var deltaX = rotatePosition.x - x;
	  var deltaY = y - rotatePosition.y;
	  var absX = Math.abs(deltaX);
	  var absY = Math.abs(deltaY);
	  (0, _updateTrace.updateTrace)(traceX, deltaX);
	  (0, _updateTrace.updateTrace)(traceY, deltaY);
	  var directionX = (0, _resolveDirection.resolveDirection)(traceX, _types.Axis.X, directionDelta);
	  var directionY = (0, _resolveDirection.resolveDirection)(traceY, _types.Axis.Y, directionDelta);
	  var duration = (0, _calculateDuration.calculateDuration)(start, Date.now());
	  var velocity = (0, _calculateVelocity.calculateVelocity)(absX, absY, duration);
	  return {
	    absX: absX,
	    absY: absY,
	    deltaX: deltaX,
	    deltaY: deltaY,
	    directionX: directionX,
	    directionY: directionY,
	    duration: duration,
	    positionX: rotatePosition.x,
	    positionY: rotatePosition.y,
	    velocity: velocity
	  };
	}

	var checkIsMoreThanSingleTouches$1 = {};

	Object.defineProperty(checkIsMoreThanSingleTouches$1, "__esModule", {
	  value: true
	});
	checkIsMoreThanSingleTouches$1.checkIsMoreThanSingleTouches = void 0;
	var checkIsMoreThanSingleTouches = function checkIsMoreThanSingleTouches(e) {
	  return Boolean(e.touches && e.touches.length > 1);
	};
	checkIsMoreThanSingleTouches$1.checkIsMoreThanSingleTouches = checkIsMoreThanSingleTouches;

	var checkIsPassiveSupported$1 = {};

	var createOptions$1 = {};

	Object.defineProperty(createOptions$1, "__esModule", {
	  value: true
	});
	createOptions$1.createOptions = createOptions;
	function createOptions() {
	  var proxy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  Object.defineProperty(proxy, 'passive', {
	    get: function get() {
	      this.isPassiveSupported = true;
	      return true;
	    },
	    enumerable: true
	  });
	  return proxy;
	}

	Object.defineProperty(checkIsPassiveSupported$1, "__esModule", {
	  value: true
	});
	checkIsPassiveSupported$1.checkIsPassiveSupported = checkIsPassiveSupported;
	checkIsPassiveSupported$1.noop = void 0;
	var _createOptions = createOptions$1;
	function checkIsPassiveSupported(isPassiveSupported) {
	  if (typeof isPassiveSupported === 'boolean') {
	    return isPassiveSupported;
	  }
	  var proxy = {
	    isPassiveSupported: isPassiveSupported
	  };
	  try {
	    var options = (0, _createOptions.createOptions)(proxy);
	    window.addEventListener('checkIsPassiveSupported', noop, options);
	    window.removeEventListener('checkIsPassiveSupported', noop, options);
	  } catch (err) {}
	  return proxy.isPassiveSupported;
	}
	var noop = function noop() {};
	checkIsPassiveSupported$1.noop = noop;

	var checkIsTouchEventsSupported$1 = {};

	Object.defineProperty(checkIsTouchEventsSupported$1, "__esModule", {
	  value: true
	});
	checkIsTouchEventsSupported$1.checkIsTouchEventsSupported = void 0;
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}
	var checkIsTouchEventsSupported = function checkIsTouchEventsSupported() {
	  return (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && ('ontouchstart' in window || Boolean(window.navigator.maxTouchPoints));
	};
	checkIsTouchEventsSupported$1.checkIsTouchEventsSupported = checkIsTouchEventsSupported;

	var getInitialState$1 = {};

	Object.defineProperty(getInitialState$1, "__esModule", {
	  value: true
	});
	getInitialState$1.getInitialState = void 0;
	function ownKeys$1(object, enumerableOnly) {
	  var keys = Object.keys(object);
	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    enumerableOnly && (symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    })), keys.push.apply(keys, symbols);
	  }
	  return keys;
	}
	function _objectSpread$1(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = null != arguments[i] ? arguments[i] : {};
	    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
	      _defineProperty$1(target, key, source[key]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
	      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	  }
	  return target;
	}
	function _defineProperty$1(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	  return obj;
	}
	var getInitialState = function getInitialState() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return _objectSpread$1({
	    x: 0,
	    y: 0,
	    start: 0,
	    isSwiping: false,
	    traceX: [],
	    traceY: []
	  }, options);
	};
	getInitialState$1.getInitialState = getInitialState;

	var getInitialProps$1 = {};

	Object.defineProperty(getInitialProps$1, "__esModule", {
	  value: true
	});
	getInitialProps$1.getInitialProps = void 0;
	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);
	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    enumerableOnly && (symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    })), keys.push.apply(keys, symbols);
	  }
	  return keys;
	}
	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = null != arguments[i] ? arguments[i] : {};
	    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
	      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	  }
	  return target;
	}
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	  return obj;
	}
	var getInitialProps = function getInitialProps() {
	  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return _objectSpread({
	    element: null,
	    target: null,
	    delta: 10,
	    directionDelta: 0,
	    rotationAngle: 0,
	    mouseTrackingEnabled: false,
	    touchTrackingEnabled: true,
	    preventDefaultTouchmoveEvent: false,
	    preventTrackingOnMouseleave: false
	  }, props);
	};
	getInitialProps$1.getInitialProps = getInitialProps;

	var getOptions$1 = {};

	Object.defineProperty(getOptions$1, "__esModule", {
	  value: true
	});
	getOptions$1.getOptions = getOptions;
	function getOptions() {
	  var isPassiveSupported = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  if (isPassiveSupported) {
	    return {
	      passive: false
	    };
	  }
	  return {};
	}

	var rotateByAngle$1 = {};

	Object.defineProperty(rotateByAngle$1, "__esModule", {
	  value: true
	});
	rotateByAngle$1.rotateByAngle = rotateByAngle;
	function rotateByAngle(position) {
	  var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  if (angle === 0) {
	    return position;
	  }
	  var x = position.x,
	    y = position.y;
	  var angleInRadians = Math.PI / 180 * angle;
	  var rotatedX = x * Math.cos(angleInRadians) + y * Math.sin(angleInRadians);
	  var rotatedY = y * Math.cos(angleInRadians) - x * Math.sin(angleInRadians);
	  return {
	    x: rotatedX,
	    y: rotatedY
	  };
	}

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var _calculateDirection = calculateDirection$1;
		Object.keys(_calculateDirection).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _calculateDirection[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _calculateDirection[key];
		    }
		  });
		});
		var _calculateDirectionDelta = calculateDirectionDelta$1;
		Object.keys(_calculateDirectionDelta).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _calculateDirectionDelta[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _calculateDirectionDelta[key];
		    }
		  });
		});
		var _calculateDuration = calculateDuration$1;
		Object.keys(_calculateDuration).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _calculateDuration[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _calculateDuration[key];
		    }
		  });
		});
		var _calculateMovingPosition = calculateMovingPosition$1;
		Object.keys(_calculateMovingPosition).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _calculateMovingPosition[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _calculateMovingPosition[key];
		    }
		  });
		});
		var _calculatePosition = calculatePosition$1;
		Object.keys(_calculatePosition).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _calculatePosition[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _calculatePosition[key];
		    }
		  });
		});
		var _calculateTraceDirections = calculateTraceDirections$1;
		Object.keys(_calculateTraceDirections).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _calculateTraceDirections[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _calculateTraceDirections[key];
		    }
		  });
		});
		var _calculateVelocity = calculateVelocity$1;
		Object.keys(_calculateVelocity).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _calculateVelocity[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _calculateVelocity[key];
		    }
		  });
		});
		var _checkIsMoreThanSingleTouches = checkIsMoreThanSingleTouches$1;
		Object.keys(_checkIsMoreThanSingleTouches).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _checkIsMoreThanSingleTouches[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _checkIsMoreThanSingleTouches[key];
		    }
		  });
		});
		var _checkIsPassiveSupported = checkIsPassiveSupported$1;
		Object.keys(_checkIsPassiveSupported).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _checkIsPassiveSupported[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _checkIsPassiveSupported[key];
		    }
		  });
		});
		var _checkIsTouchEventsSupported = checkIsTouchEventsSupported$1;
		Object.keys(_checkIsTouchEventsSupported).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _checkIsTouchEventsSupported[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _checkIsTouchEventsSupported[key];
		    }
		  });
		});
		var _common = common$1;
		Object.keys(_common).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _common[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _common[key];
		    }
		  });
		});
		var _createOptions = createOptions$1;
		Object.keys(_createOptions).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _createOptions[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _createOptions[key];
		    }
		  });
		});
		var _getInitialState = getInitialState$1;
		Object.keys(_getInitialState).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _getInitialState[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _getInitialState[key];
		    }
		  });
		});
		var _getInitialProps = getInitialProps$1;
		Object.keys(_getInitialProps).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _getInitialProps[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _getInitialProps[key];
		    }
		  });
		});
		var _getOptions = getOptions$1;
		Object.keys(_getOptions).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _getOptions[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _getOptions[key];
		    }
		  });
		});
		var _resolveDirection = resolveDirection$1;
		Object.keys(_resolveDirection).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _resolveDirection[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _resolveDirection[key];
		    }
		  });
		});
		var _rotateByAngle = rotateByAngle$1;
		Object.keys(_rotateByAngle).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _rotateByAngle[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _rotateByAngle[key];
		    }
		  });
		});
		var _updateTrace = updateTrace$1;
		Object.keys(_updateTrace).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (key in exports && exports[key] === _updateTrace[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _updateTrace[key];
		    }
		  });
		});
	} (utils$1));

	(function (exports) {

		function _typeof(obj) {
		  "@babel/helpers - typeof";

		  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
		    return typeof obj;
		  } : function (obj) {
		    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
		  }, _typeof(obj);
		}
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var _exportNames = {};
		exports["default"] = void 0;
		var Utils = _interopRequireWildcard(utils$1);
		var _types = types$1;
		Object.keys(_types).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
		  if (key in exports && exports[key] === _types[key]) return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _types[key];
		    }
		  });
		});
		function _getRequireWildcardCache(nodeInterop) {
		  if (typeof WeakMap !== "function") return null;
		  var cacheBabelInterop = new WeakMap();
		  var cacheNodeInterop = new WeakMap();
		  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
		    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		  })(nodeInterop);
		}
		function _interopRequireWildcard(obj, nodeInterop) {
		  if (!nodeInterop && obj && obj.__esModule) {
		    return obj;
		  }
		  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
		    return {
		      "default": obj
		    };
		  }
		  var cache = _getRequireWildcardCache(nodeInterop);
		  if (cache && cache.has(obj)) {
		    return cache.get(obj);
		  }
		  var newObj = {};
		  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		  for (var key in obj) {
		    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
		      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
		      if (desc && (desc.get || desc.set)) {
		        Object.defineProperty(newObj, key, desc);
		      } else {
		        newObj[key] = obj[key];
		      }
		    }
		  }
		  newObj["default"] = obj;
		  if (cache) {
		    cache.set(obj, newObj);
		  }
		  return newObj;
		}
		function _classCallCheck(instance, Constructor) {
		  if (!(instance instanceof Constructor)) {
		    throw new TypeError("Cannot call a class as a function");
		  }
		}
		function _defineProperties(target, props) {
		  for (var i = 0; i < props.length; i++) {
		    var descriptor = props[i];
		    descriptor.enumerable = descriptor.enumerable || false;
		    descriptor.configurable = true;
		    if ("value" in descriptor) descriptor.writable = true;
		    Object.defineProperty(target, descriptor.key, descriptor);
		  }
		}
		function _createClass(Constructor, protoProps, staticProps) {
		  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		  if (staticProps) _defineProperties(Constructor, staticProps);
		  Object.defineProperty(Constructor, "prototype", {
		    writable: false
		  });
		  return Constructor;
		}
		function _defineProperty(obj, key, value) {
		  if (key in obj) {
		    Object.defineProperty(obj, key, {
		      value: value,
		      enumerable: true,
		      configurable: true,
		      writable: true
		    });
		  } else {
		    obj[key] = value;
		  }
		  return obj;
		}
		var VanillaSwipe = /*#__PURE__*/function () {
		  function VanillaSwipe(props) {
		    _classCallCheck(this, VanillaSwipe);
		    _defineProperty(this, "state", void 0);
		    _defineProperty(this, "props", void 0);
		    this.state = Utils.getInitialState();
		    this.props = Utils.getInitialProps(props);
		    this.handleSwipeStart = this.handleSwipeStart.bind(this);
		    this.handleSwipeMove = this.handleSwipeMove.bind(this);
		    this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
		    this.handleMouseDown = this.handleMouseDown.bind(this);
		    this.handleMouseMove = this.handleMouseMove.bind(this);
		    this.handleMouseUp = this.handleMouseUp.bind(this);
		    this.handleMouseLeave = this.handleMouseLeave.bind(this);
		  }
		  _createClass(VanillaSwipe, [{
		    key: "init",
		    value: function init() {
		      this.setupTouchListeners();
		      this.setupMouseListeners();
		    }
		  }, {
		    key: "update",
		    value: function update(props) {
		      var prevProps = this.props;
		      var nextProps = Object.assign({}, prevProps, props);
		      if (prevProps.element !== nextProps.element || prevProps.target !== nextProps.target) {
		        this.destroy();
		        this.props = nextProps;
		        this.init();
		        return;
		      }
		      this.props = nextProps;
		      if (prevProps.mouseTrackingEnabled !== nextProps.mouseTrackingEnabled || prevProps.preventTrackingOnMouseleave !== nextProps.preventTrackingOnMouseleave) {
		        this.cleanupMouseListeners();
		        nextProps.mouseTrackingEnabled ? this.setupMouseListeners() : this.cleanupMouseListeners();
		      }
		      if (prevProps.touchTrackingEnabled !== nextProps.touchTrackingEnabled) {
		        this.cleanupTouchListeners();
		        nextProps.touchTrackingEnabled ? this.setupTouchListeners() : this.cleanupTouchListeners();
		      }
		    }
		  }, {
		    key: "destroy",
		    value: function destroy() {
		      this.cleanupMouseListeners();
		      this.cleanupTouchListeners();
		      this.state = Utils.getInitialState();
		      this.props = Utils.getInitialProps();
		    }
		  }, {
		    key: "setupTouchListeners",
		    value: function setupTouchListeners() {
		      var _this$props = this.props,
		        element = _this$props.element,
		        target = _this$props.target,
		        touchTrackingEnabled = _this$props.touchTrackingEnabled;
		      if (element && touchTrackingEnabled) {
		        var listener = target || element;
		        var isPassiveSupported = Utils.checkIsPassiveSupported();
		        var options = Utils.getOptions(isPassiveSupported);
		        listener.addEventListener('touchstart', this.handleSwipeStart, options);
		        listener.addEventListener('touchmove', this.handleSwipeMove, options);
		        listener.addEventListener('touchend', this.handleSwipeEnd, options);
		      }
		    }
		  }, {
		    key: "cleanupTouchListeners",
		    value: function cleanupTouchListeners() {
		      var _this$props2 = this.props,
		        element = _this$props2.element,
		        target = _this$props2.target;
		      var listener = target || element;
		      if (listener) {
		        listener.removeEventListener('touchstart', this.handleSwipeStart);
		        listener.removeEventListener('touchmove', this.handleSwipeMove);
		        listener.removeEventListener('touchend', this.handleSwipeEnd);
		      }
		    }
		  }, {
		    key: "setupMouseListeners",
		    value: function setupMouseListeners() {
		      var _this$props3 = this.props,
		        element = _this$props3.element,
		        mouseTrackingEnabled = _this$props3.mouseTrackingEnabled,
		        preventTrackingOnMouseleave = _this$props3.preventTrackingOnMouseleave;
		      if (mouseTrackingEnabled && element) {
		        element.addEventListener('mousedown', this.handleMouseDown);
		        element.addEventListener('mousemove', this.handleMouseMove);
		        element.addEventListener('mouseup', this.handleMouseUp);
		        if (preventTrackingOnMouseleave) {
		          element.addEventListener('mouseleave', this.handleMouseLeave);
		        }
		      }
		    }
		  }, {
		    key: "cleanupMouseListeners",
		    value: function cleanupMouseListeners() {
		      var element = this.props.element;
		      if (element) {
		        element.removeEventListener('mousedown', this.handleMouseDown);
		        element.removeEventListener('mousemove', this.handleMouseMove);
		        element.removeEventListener('mouseup', this.handleMouseUp);
		        element.removeEventListener('mouseleave', this.handleMouseLeave);
		      }
		    }
		  }, {
		    key: "getEventData",
		    value: function getEventData(e) {
		      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		        directionDelta: 0
		      };
		      var rotationAngle = this.props.rotationAngle;
		      var directionDelta = options.directionDelta;
		      var movingPosition = Utils.calculateMovingPosition(e);
		      var rotatePosition = Utils.rotateByAngle(movingPosition, rotationAngle);
		      return Utils.calculatePosition(this.state, {
		        rotatePosition: rotatePosition,
		        directionDelta: directionDelta
		      });
		    }
		  }, {
		    key: "handleSwipeStart",
		    value: function handleSwipeStart(e) {
		      if (Utils.checkIsMoreThanSingleTouches(e)) return;
		      var rotationAngle = this.props.rotationAngle;
		      var movingPosition = Utils.calculateMovingPosition(e);
		      var _Utils$rotateByAngle = Utils.rotateByAngle(movingPosition, rotationAngle),
		        x = _Utils$rotateByAngle.x,
		        y = _Utils$rotateByAngle.y;
		      this.state = Utils.getInitialState({
		        isSwiping: false,
		        start: Date.now(),
		        x: x,
		        y: y
		      });
		    }
		  }, {
		    key: "handleSwipeMove",
		    value: function handleSwipeMove(e) {
		      var _this$state = this.state,
		        x = _this$state.x,
		        y = _this$state.y,
		        isSwiping = _this$state.isSwiping;
		      if (!x || !y || Utils.checkIsMoreThanSingleTouches(e)) return;
		      var directionDelta = this.props.directionDelta || 0;
		      var _this$getEventData = this.getEventData(e, {
		          directionDelta: directionDelta
		        }),
		        absX = _this$getEventData.absX,
		        absY = _this$getEventData.absY,
		        deltaX = _this$getEventData.deltaX,
		        deltaY = _this$getEventData.deltaY,
		        directionX = _this$getEventData.directionX,
		        directionY = _this$getEventData.directionY,
		        duration = _this$getEventData.duration,
		        velocity = _this$getEventData.velocity;
		      var _this$props4 = this.props,
		        delta = _this$props4.delta,
		        preventDefaultTouchmoveEvent = _this$props4.preventDefaultTouchmoveEvent,
		        onSwipeStart = _this$props4.onSwipeStart,
		        onSwiping = _this$props4.onSwiping;
		      if (e.cancelable && preventDefaultTouchmoveEvent) e.preventDefault();
		      if (absX < Number(delta) && absY < Number(delta) && !isSwiping) return;
		      if (onSwipeStart && !isSwiping) {
		        onSwipeStart(e, {
		          deltaX: deltaX,
		          deltaY: deltaY,
		          absX: absX,
		          absY: absY,
		          directionX: directionX,
		          directionY: directionY,
		          duration: duration,
		          velocity: velocity
		        });
		      }
		      this.state.isSwiping = true;
		      if (onSwiping) {
		        onSwiping(e, {
		          deltaX: deltaX,
		          deltaY: deltaY,
		          absX: absX,
		          absY: absY,
		          directionX: directionX,
		          directionY: directionY,
		          duration: duration,
		          velocity: velocity
		        });
		      }
		    }
		  }, {
		    key: "handleSwipeEnd",
		    value: function handleSwipeEnd(e) {
		      var _this$props5 = this.props,
		        onSwiped = _this$props5.onSwiped,
		        onTap = _this$props5.onTap;
		      if (this.state.isSwiping) {
		        var directionDelta = this.props.directionDelta || 0;
		        var position = this.getEventData(e, {
		          directionDelta: directionDelta
		        });
		        onSwiped && onSwiped(e, position);
		      } else {
		        var _position = this.getEventData(e);
		        onTap && onTap(e, _position);
		      }
		      this.state = Utils.getInitialState();
		    }
		  }, {
		    key: "handleMouseDown",
		    value: function handleMouseDown(e) {
		      var target = this.props.target;
		      if (target) {
		        if (target === e.target) {
		          this.handleSwipeStart(e);
		        }
		      } else {
		        this.handleSwipeStart(e);
		      }
		    }
		  }, {
		    key: "handleMouseMove",
		    value: function handleMouseMove(e) {
		      this.handleSwipeMove(e);
		    }
		  }, {
		    key: "handleMouseUp",
		    value: function handleMouseUp(e) {
		      var isSwiping = this.state.isSwiping;
		      var target = this.props.target;
		      if (target) {
		        if (target === e.target || isSwiping) {
		          this.handleSwipeEnd(e);
		        }
		      } else {
		        this.handleSwipeEnd(e);
		      }
		    }
		  }, {
		    key: "handleMouseLeave",
		    value: function handleMouseLeave(e) {
		      var isSwiping = this.state.isSwiping;
		      if (isSwiping) {
		        this.handleSwipeEnd(e);
		      }
		    }
		  }], [{
		    key: "isTouchEventsSupported",
		    value: function isTouchEventsSupported() {
		      return Utils.checkIsTouchEventsSupported();
		    }
		  }]);
		  return VanillaSwipe;
		}();
		exports["default"] = VanillaSwipe;
	} (lib));

	var defaultProps = {};

	var types = {};

	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.Modifiers = exports.Classnames = exports.AutoplayDirection = exports.ControlsStrategy = exports.AutoPlayStrategy = exports.AnimationType = exports.EventType = void 0, function (e) {
		  e.ACTION = "action", e.INIT = "init", e.RESIZE = "resize", e.UPDATE = "update";
		}(exports.EventType || (exports.EventType = {})), function (e) {
		  e.FADEOUT = "fadeout", e.SLIDE = "slide";
		}(exports.AnimationType || (exports.AnimationType = {})), function (e) {
		  e.DEFAULT = "default", e.ALL = "all", e.ACTION = "action", e.NONE = "none";
		}(exports.AutoPlayStrategy || (exports.AutoPlayStrategy = {})), function (e) {
		  e.DEFAULT = "default", e.ALTERNATE = "alternate", e.RESPONSIVE = "responsive";
		}(exports.ControlsStrategy || (exports.ControlsStrategy = {})), function (e) {
		  e.RTL = "rtl", e.LTR = "ltr";
		}(exports.AutoplayDirection || (exports.AutoplayDirection = {})), function (e) {
		  e.ANIMATED = "animated animated-out fadeOut", e.ROOT = "alice-carousel", e.WRAPPER = "alice-carousel__wrapper", e.STAGE = "alice-carousel__stage", e.STAGE_ITEM = "alice-carousel__stage-item", e.DOTS = "alice-carousel__dots", e.DOTS_ITEM = "alice-carousel__dots-item", e.PLAY_BTN = "alice-carousel__play-btn", e.PLAY_BTN_ITEM = "alice-carousel__play-btn-item", e.PLAY_BTN_WRAPPER = "alice-carousel__play-btn-wrapper", e.SLIDE_INFO = "alice-carousel__slide-info", e.SLIDE_INFO_ITEM = "alice-carousel__slide-info-item", e.BUTTON_PREV = "alice-carousel__prev-btn", e.BUTTON_PREV_WRAPPER = "alice-carousel__prev-btn-wrapper", e.BUTTON_PREV_ITEM = "alice-carousel__prev-btn-item", e.BUTTON_NEXT = "alice-carousel__next-btn", e.BUTTON_NEXT_WRAPPER = "alice-carousel__next-btn-wrapper", e.BUTTON_NEXT_ITEM = "alice-carousel__next-btn-item";
		}(exports.Classnames || (exports.Classnames = {})), function (e) {
		  e.ACTIVE = "__active", e.INACTIVE = "__inactive", e.CLONED = "__cloned", e.CUSTOM = "__custom", e.PAUSE = "__pause", e.SEPARATOR = "__separator", e.SSR = "__ssr", e.TARGET = "__target";
		}(exports.Modifiers || (exports.Modifiers = {}));
	} (types));

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.defaultProps = void 0;
		var types_1 = types;
		exports.defaultProps = {
		  activeIndex: 0,
		  animationDuration: 400,
		  animationEasingFunction: "ease",
		  animationType: types_1.AnimationType.SLIDE,
		  autoHeight: !1,
		  autoWidth: !1,
		  autoPlay: !1,
		  autoPlayControls: !1,
		  autoPlayDirection: types_1.AutoplayDirection.LTR,
		  autoPlayInterval: 400,
		  autoPlayStrategy: types_1.AutoPlayStrategy.DEFAULT,
		  children: void 0,
		  controlsStrategy: types_1.ControlsStrategy.DEFAULT,
		  disableButtonsControls: !1,
		  disableDotsControls: !1,
		  disableSlideInfo: !0,
		  infinite: !1,
		  innerWidth: void 0,
		  items: void 0,
		  keyboardNavigation: !1,
		  mouseTracking: !1,
		  name: "",
		  paddingLeft: 0,
		  paddingRight: 0,
		  responsive: void 0,
		  swipeDelta: 20,
		  swipeExtraPadding: 200,
		  ssrSilentMode: !0,
		  touchTracking: !0,
		  touchMoveDefaultEvents: !0,
		  onInitialized: function () {},
		  onResized: function () {},
		  onResizeEvent: void 0,
		  onSlideChange: function () {},
		  onSlideChanged: function () {}
		};
	} (defaultProps));

	var views = {};

	var SlideInfo = {};

	var utils = {};

	var common = {};

	var elements = {};

	var mappers = {};

	(function (exports) {

		var __assign = function () {
		    return (__assign = Object.assign || function (o) {
		      for (var t, r = 1, i = arguments.length; r < i; r++) for (var s in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, s) && (o[s] = t[s]);
		      return o;
		    }).apply(this, arguments);
		  },
		  mapPartialCoords = (Object.defineProperty(exports, "__esModule", {
		    value: !0
		  }), exports.mapPositionCoords = exports.mapPartialCoords = void 0, function (o) {
		    return o.map(function (o) {
		      return {
		        width: o.width,
		        position: 0
		      };
		    });
		  }),
		  mapPositionCoords = (exports.mapPartialCoords = mapPartialCoords, function (o, t) {
		    return void 0 === t && (t = 0), o.map(function (o) {
		      return o.position > t ? __assign(__assign({}, o), {
		        position: t
		      }) : o;
		    });
		  });
		exports.mapPositionCoords = mapPositionCoords;
	} (mappers));

	var math = {};

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.isVerticalTouchmoveDetected = exports.getFadeoutAnimationPosition = exports.getFadeoutAnimationIndex = exports.getSwipeTouchendIndex = exports.getSwipeTouchendPosition = exports.getSwipeTransformationCursor = exports.getTransformationItemIndex = exports.getSwipeShiftValue = exports.getItemCoords = exports.getIsLeftDirection = exports.shouldRecalculateSwipePosition = exports.getSwipeLimitMax = exports.getSwipeLimitMin = exports.shouldCancelSlideAnimation = exports.shouldRecalculateSlideIndex = exports.getUpdateSlidePositionIndex = exports.getActiveIndex = exports.getStartIndex = exports.getShiftIndex = void 0;
		var getShiftIndex = function (e, t) {
		    return (e = void 0 === e ? 0 : e) + (t = void 0 === t ? 0 : t);
		  },
		  getStartIndex = (exports.getShiftIndex = getShiftIndex, function (e, t) {
		    if (void 0 === e && (e = 0), t = void 0 === t ? 0 : t) {
		      if (t <= e) return t - 1;
		      if (0 < e) return e;
		    }
		    return 0;
		  }),
		  getActiveIndex = (exports.getStartIndex = getStartIndex, function (e) {
		    var t = e.startIndex,
		      t = void 0 === t ? 0 : t,
		      i = e.itemsCount,
		      e = e.infinite;
		    return void 0 !== e && e ? t : (0, exports.getStartIndex)(t, void 0 === i ? 0 : i);
		  }),
		  getUpdateSlidePositionIndex = (exports.getActiveIndex = getActiveIndex, function (e, t) {
		    return e < 0 ? t - 1 : t <= e ? 0 : e;
		  }),
		  shouldRecalculateSlideIndex = (exports.getUpdateSlidePositionIndex = getUpdateSlidePositionIndex, function (e, t) {
		    return e < 0 || t <= e;
		  }),
		  shouldCancelSlideAnimation = (exports.shouldRecalculateSlideIndex = shouldRecalculateSlideIndex, function (e, t) {
		    return e < 0 || t <= e;
		  }),
		  getSwipeLimitMin = (exports.shouldCancelSlideAnimation = shouldCancelSlideAnimation, function (e, t) {
		    var i = e.itemsOffset,
		      e = e.transformationSet,
		      e = void 0 === e ? [] : e,
		      o = t.infinite,
		      t = t.swipeExtraPadding;
		    return o ? (e[void 0 === i ? 0 : i] || {}).position : (o = (e[0] || {}).width, Math.min(void 0 === t ? 0 : t, void 0 === o ? 0 : o));
		  }),
		  getSwipeLimitMax = (exports.getSwipeLimitMin = getSwipeLimitMin, function (e, t) {
		    var i = t.infinite,
		      t = t.swipeExtraPadding,
		      t = void 0 === t ? 0 : t,
		      o = e.itemsCount,
		      n = e.itemsOffset,
		      r = e.itemsInSlide,
		      r = void 0 === r ? 1 : r,
		      e = e.transformationSet,
		      e = void 0 === e ? [] : e;
		    return i ? (e[(void 0 === o ? 1 : o) + (0, exports.getShiftIndex)(r, void 0 === n ? 0 : n)] || {}).position || 0 : (0, exports.getItemCoords)(-r, e).position + t;
		  }),
		  shouldRecalculateSwipePosition = (exports.getSwipeLimitMax = getSwipeLimitMax, function (e, t, i) {
		    return -t <= e || Math.abs(e) >= i;
		  }),
		  getIsLeftDirection = (exports.shouldRecalculateSwipePosition = shouldRecalculateSwipePosition, function (e) {
		    return (e = void 0 === e ? 0 : e) < 0;
		  }),
		  getItemCoords = (exports.getIsLeftDirection = getIsLeftDirection, function (e, t) {
		    return (t = void 0 === t ? [] : t).slice(e = void 0 === e ? 0 : e)[0] || {
		      position: 0,
		      width: 0
		    };
		  }),
		  getSwipeShiftValue = (exports.getItemCoords = getItemCoords, function (e, t) {
		    return void 0 === e && (e = 0), void 0 === t && (t = []), (0, exports.getItemCoords)(e, t).position;
		  }),
		  getTransformationItemIndex = (exports.getSwipeShiftValue = getSwipeShiftValue, function (e, t) {
		    return void 0 === t && (t = 0), (e = void 0 === e ? [] : e).findIndex(function (e) {
		      return e.position >= Math.abs(t);
		    });
		  }),
		  getSwipeTransformationCursor = (exports.getTransformationItemIndex = getTransformationItemIndex, function (e, t, i) {
		    void 0 === e && (e = []), void 0 === t && (t = 0), void 0 === i && (i = 0);
		    e = (0, exports.getTransformationItemIndex)(e, t);
		    return (0, exports.getIsLeftDirection)(i) ? e : e - 1;
		  }),
		  getSwipeTouchendPosition = (exports.getSwipeTransformationCursor = getSwipeTransformationCursor, function (e, t, i) {
		    void 0 === i && (i = 0);
		    var o = e.infinite,
		      n = e.autoWidth,
		      r = e.isStageContentPartial,
		      s = e.swipeAllowedPositionMax,
		      e = e.transformationSet,
		      i = (0, exports.getSwipeTransformationCursor)(e, i, t),
		      t = (0, exports.getItemCoords)(i, e).position;
		    if (!o) {
		      if (n && r) return 0;
		      if (s < t) return -s;
		    }
		    return -t;
		  }),
		  getSwipeTouchendIndex = (exports.getSwipeTouchendPosition = getSwipeTouchendPosition, function (e, t) {
		    var i = t.transformationSet,
		      o = t.itemsInSlide,
		      n = t.itemsOffset,
		      r = t.itemsCount,
		      s = t.infinite,
		      d = t.isStageContentPartial,
		      a = t.activeIndex,
		      t = t.translate3d;
		    return s || !d && t !== Math.abs(e) ? (d = (0, exports.getTransformationItemIndex)(i, e), s ? d < (t = (0, exports.getShiftIndex)(o, n)) ? r - o - n + d : t + r <= d ? d - (t + r) : d - t : d) : a;
		  }),
		  getFadeoutAnimationIndex = (exports.getSwipeTouchendIndex = getSwipeTouchendIndex, function (e) {
		    var t = e.infinite,
		      i = e.activeIndex,
		      e = e.itemsInSlide;
		    return t ? i + e : i;
		  }),
		  getFadeoutAnimationPosition = (exports.getFadeoutAnimationIndex = getFadeoutAnimationIndex, function (e, t) {
		    var i = t.activeIndex,
		      t = t.stageWidth;
		    return e < i ? (i - e) * -t || 0 : (e - i) * t || 0;
		  }),
		  isVerticalTouchmoveDetected = (exports.getFadeoutAnimationPosition = getFadeoutAnimationPosition, function (e, t, i) {
		    return e < (i = void 0 === i ? 0 : i) || e < .1 * t;
		  });
		exports.isVerticalTouchmoveDetected = isVerticalTouchmoveDetected;
	} (math));

	var hasRequiredElements;

	function requireElements () {
		if (hasRequiredElements) return elements;
		hasRequiredElements = 1;
		(function (exports) {

			var __assign = function () {
			    return (__assign = Object.assign || function (t) {
			      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
			      return t;
			    }).apply(this, arguments);
			  },
			  common_1 = (Object.defineProperty(exports, "__esModule", {
			    value: !0
			  }), exports.getTransformMatrix = exports.getTranslateXProperty = exports.getTouchmoveTranslatePosition = exports.getTranslate3dProperty = exports.getRenderStageItemStyles = exports.getRenderStageStyles = exports.getTransitionProperty = exports.getRenderWrapperStyles = exports.animate = exports.shouldHandleResizeEvent = exports.getElementFirstChild = exports.getElementCursor = exports.getAutoheightProperty = exports.getElementDimensions = exports.getItemWidth = exports.createDefaultTransformationSet = exports.createAutowidthTransformationSet = exports.isElement = exports.createClones = exports.getItemsOffset = exports.getItemsCount = exports.getSlides = void 0, requireCommon()),
			  mappers_1 = mappers,
			  math_1 = math,
			  getSlides = function (t) {
			    var e = t.children,
			      t = t.items;
			    return e ? e.length ? e : [e] : void 0 === t ? [] : t;
			  },
			  getItemsCount = (exports.getSlides = getSlides, function (t) {
			    return (0, exports.getSlides)(t).length;
			  }),
			  getItemsOffset = (exports.getItemsCount = getItemsCount, function (t) {
			    var e = t.infinite,
			      r = t.paddingRight,
			      t = t.paddingLeft;
			    return e && (t || r) ? 1 : 0;
			  }),
			  createClones = (exports.getItemsOffset = getItemsOffset, function (t) {
			    var e,
			      r,
			      n,
			      o,
			      i = (0, exports.getSlides)(t);
			    return t.infinite ? (e = (0, exports.getItemsCount)(t), o = (0, exports.getItemsOffset)(t), t = (0, common_1.getItemsInSlide)(e, t), n = Math.min(t, e) + o, r = i.slice(0, n), n = i.slice(-n), o && t === e && (o = i[0], t = i.slice(-1)[0], n.unshift(t), r.push(o)), n.concat(i, r)) : i;
			  }),
			  isElement = (exports.createClones = createClones, function (t) {
			    try {
			      return t instanceof Element || t instanceof HTMLDocument;
			    } catch (t) {
			      return !1;
			    }
			  }),
			  createAutowidthTransformationSet = (exports.isElement = isElement, function (t, i, e) {
			    void 0 === i && (i = 0), void 0 === e && (e = !1);
			    var s = 0,
			      a = !0,
			      r = [];
			    return (0, exports.isElement)(t) && (r = Array.from((null == t ? void 0 : t.children) || []).reduce(function (t, e, r) {
			      var n = 0,
			        r = r - 1,
			        o = t[r],
			        e = getElementDimensions(null == e ? void 0 : e.firstChild).width,
			        e = void 0 === e ? 0 : e;
			      return a = (s += e) <= i, o && (n = 0 == r ? o.width : o.width + o.position), t.push({
			        position: n,
			        width: e
			      }), t;
			    }, []), e || (r = a ? (0, mappers_1.mapPartialCoords)(r) : (t = s - i, (0, mappers_1.mapPositionCoords)(r, t)))), {
			      coords: r,
			      content: s,
			      partial: a
			    };
			  }),
			  createDefaultTransformationSet = (exports.createAutowidthTransformationSet = createAutowidthTransformationSet, function (t, o, e, r) {
			    void 0 === r && (r = !1);
			    var i = 0,
			      s = !0,
			      n = [],
			      a = (0, exports.getItemWidth)(o, e);
			    return n = t.reduce(function (t, e, r) {
			      var n = 0,
			        r = t[r - 1];
			      return s = (i += a) <= o, r && (n = a + r.position || 0), t.push({
			        width: a,
			        position: n
			      }), t;
			    }, []), {
			      coords: n = r ? n : s ? (0, mappers_1.mapPartialCoords)(n) : (e = i - o, (0, mappers_1.mapPositionCoords)(n, e)),
			      content: i,
			      partial: s
			    };
			  }),
			  getItemWidth = (exports.createDefaultTransformationSet = createDefaultTransformationSet, function (t, e) {
			    return 0 < e ? t / e : t;
			  });
			function getElementDimensions(t) {
			  return t && t.getBoundingClientRect ? {
			    width: (t = t.getBoundingClientRect()).width,
			    height: t.height
			  } : {
			    width: 0,
			    height: 0
			  };
			}
			exports.getItemWidth = getItemWidth, exports.getElementDimensions = getElementDimensions;
			var getAutoheightProperty = function (t, e, r) {
			    var e = (0, exports.getElementCursor)(e, r),
			      r = (0, exports.getElementFirstChild)(t, e);
			    if ((0, exports.isElement)(r)) return t = window.getComputedStyle(r), e = parseFloat(t.marginTop), t = parseFloat(t.marginBottom), Math.ceil(r.offsetHeight + e + t);
			  },
			  getElementCursor = (exports.getAutoheightProperty = getAutoheightProperty, function (t, e) {
			    var r = e.activeIndex,
			      e = e.itemsInSlide;
			    return t.infinite ? r + e + (0, exports.getItemsOffset)(t) : r;
			  }),
			  getElementFirstChild = (exports.getElementCursor = getElementCursor, function (t, e) {
			    t = t && t.children || [];
			    return t[e] && t[e].firstChild || null;
			  });
			function shouldHandleResizeEvent(t, e, r) {
			  return (e = void 0 === e ? {} : e).width !== (r = void 0 === r ? {} : r).width;
			}
			function animate(t, e) {
			  var e = e || {},
			    r = e.position,
			    r = void 0 === r ? 0 : r,
			    n = e.animationDuration,
			    n = void 0 === n ? 0 : n,
			    e = e.animationEasingFunction,
			    e = void 0 === e ? "ease" : e;
			  return t && (0, exports.isElement)(t) && (t.style.transition = "transform ".concat(n, "ms ").concat(e, " 0ms"), t.style.transform = "translate3d(".concat(r, "px, 0, 0)")), t;
			}
			exports.getElementFirstChild = getElementFirstChild, exports.shouldHandleResizeEvent = shouldHandleResizeEvent, exports.animate = animate;
			var getRenderWrapperStyles = function (t, e, r) {
			    var n = t || {},
			      o = n.paddingLeft,
			      i = n.paddingRight,
			      s = n.autoHeight,
			      n = n.animationDuration,
			      s = s ? (0, exports.getAutoheightProperty)(r, t, e) : void 0;
			    return {
			      height: s,
			      transition: s ? "height ".concat(n, "ms") : void 0,
			      paddingLeft: "".concat(o, "px"),
			      paddingRight: "".concat(i, "px")
			    };
			  },
			  getTransitionProperty = (exports.getRenderWrapperStyles = getRenderWrapperStyles, function (t) {
			    var t = t || {},
			      e = t.animationDuration,
			      t = t.animationEasingFunction,
			      t = void 0 === t ? "ease" : t;
			    return "transform ".concat(void 0 === e ? 0 : e, "ms ").concat(t, " 0ms");
			  }),
			  getRenderStageStyles = (exports.getTransitionProperty = getTransitionProperty, function (t, e) {
			    t = (t || {}).translate3d, t = "translate3d(".concat(-(void 0 === t ? 0 : t), "px, 0, 0)");
			    return __assign(__assign({}, e), {
			      transform: t
			    });
			  }),
			  getRenderStageItemStyles = (exports.getRenderStageStyles = getRenderStageStyles, function (t, e) {
			    var r = e.transformationSet,
			      n = e.fadeoutAnimationIndex,
			      o = e.fadeoutAnimationPosition,
			      i = e.fadeoutAnimationProcessing,
			      e = e.animationDuration,
			      r = (r[t] || {}).width;
			    return i && n === t ? {
			      transform: "translateX(".concat(o, "px)"),
			      animationDuration: "".concat(e, "ms"),
			      width: "".concat(r, "px")
			    } : {
			      width: r
			    };
			  }),
			  getTranslate3dProperty = (exports.getRenderStageItemStyles = getRenderStageItemStyles, function (t, e) {
			    var r = t,
			      n = e.infinite,
			      o = e.itemsOffset,
			      i = e.itemsInSlide,
			      e = e.transformationSet;
			    return ((void 0 === e ? [] : e)[r = n ? t + (0, math_1.getShiftIndex)(void 0 === i ? 0 : i, void 0 === o ? 0 : o) : r] || {}).position || 0;
			  }),
			  getTouchmoveTranslatePosition = (exports.getTranslate3dProperty = getTranslate3dProperty, function (t, e) {
			    return -(e - Math.floor(t));
			  });
			function getTranslateXProperty(t) {
			  t = getTransformMatrix(t), t = t && t[4] || "";
			  return Number(t);
			}
			function getTransformMatrix(t) {
			  return t && (0, exports.isElement)(t) && window.getComputedStyle(t).transform.match(/(-?[0-9.]+)/g) || [];
			}
			exports.getTouchmoveTranslatePosition = getTouchmoveTranslatePosition, exports.getTranslateXProperty = getTranslateXProperty, exports.getTransformMatrix = getTransformMatrix;
	} (elements));
		return elements;
	}

	var hasRequiredCommon;

	function requireCommon () {
		if (hasRequiredCommon) return common;
		hasRequiredCommon = 1;
		(function (exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: !0
			}), exports.calculateInitialState = exports.getItemsInSlide = exports.getIsStageContentPartial = exports.concatClassnames = exports.canUseDOM = void 0;
			var elements_1 = requireElements(),
			  math_1 = math,
			  canUseDOM = function () {
			    var t;
			    try {
			      return Boolean(null == (t = null === window || void 0 === window ? void 0 : window.document) ? void 0 : t.createElement);
			    } catch (t) {
			      return !1;
			    }
			  },
			  concatClassnames = (exports.canUseDOM = canUseDOM, function () {
			    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
			    return t.filter(Boolean).join(" ");
			  }),
			  getIsStageContentPartial = (exports.concatClassnames = concatClassnames, function (t, e, n) {
			    return void 0 === e && (e = 0), void 0 === n && (n = 0), !(t = void 0 !== t && t) && n <= e;
			  }),
			  getItemsInSlide = (exports.getIsStageContentPartial = getIsStageContentPartial, function (n, t) {
			    var i,
			      a = 1,
			      o = t.responsive,
			      e = t.autoWidth,
			      s = t.infinite,
			      t = t.innerWidth;
			    return void 0 !== e && e ? void 0 !== s && s ? n : a : (o && (e = Object.keys(o)).length && (t || (0, exports.canUseDOM)()) && (i = void 0 === t ? window.innerWidth : t, e.forEach(function (t) {
			      var e;
			      Number(t) <= i && (e = (t = o[t]).items, t = t.itemsFit, a = "contain" === (void 0 === t ? "fill" : t) ? e : Math.min(e, n));
			    })), a || 1);
			  }),
			  calculateInitialState = (exports.getItemsInSlide = getItemsInSlide, function (t, e, n) {
			    void 0 === n && (n = !1);
			    var i,
			      a,
			      o = t.animationDuration,
			      o = void 0 === o ? 0 : o,
			      s = t.infinite,
			      s = void 0 !== s && s,
			      r = t.autoPlay,
			      r = void 0 !== r && r,
			      l = t.autoWidth,
			      l = void 0 !== l && l,
			      m = (0, elements_1.createClones)(t),
			      d = (0, elements_1.getTransitionProperty)(),
			      c = (0, elements_1.getItemsCount)(t),
			      u = (0, elements_1.getItemsOffset)(t),
			      f = (0, exports.getItemsInSlide)(c, t),
			      g = (0, math_1.getStartIndex)(t.activeIndex, c),
			      g = (0, math_1.getActiveIndex)({
			        startIndex: g,
			        itemsCount: c,
			        infinite: s
			      }),
			      I = (0, elements_1.getElementDimensions)(e).width,
			      S = (a = (e = (l ? (i = (e = (0, elements_1.createAutowidthTransformationSet)(e, I, s)).coords, a = e.content, e) : (i = (e = (0, elements_1.createDefaultTransformationSet)(m, I, f, s)).coords, a = e.content, e)).partial, a), (0, math_1.getItemCoords)(-f, i = i).position),
			      p = (0, math_1.getSwipeLimitMin)({
			        itemsOffset: u,
			        transformationSet: i
			      }, t),
			      t = (0, math_1.getSwipeLimitMax)({
			        itemsCount: c,
			        itemsOffset: u,
			        itemsInSlide: f,
			        transformationSet: i
			      }, t),
			      v = (0, math_1.getSwipeShiftValue)(c, i);
			    return {
			      activeIndex: g,
			      autoWidth: l,
			      animationDuration: o,
			      clones: m,
			      infinite: s,
			      itemsCount: c,
			      itemsInSlide: f,
			      itemsOffset: u,
			      translate3d: (0, elements_1.getTranslate3dProperty)(g, {
			        itemsInSlide: f,
			        itemsOffset: u,
			        transformationSet: i,
			        autoWidth: l,
			        infinite: s
			      }),
			      stageWidth: I,
			      stageContentWidth: a,
			      initialStageHeight: 0,
			      isStageContentPartial: e,
			      isAutoPlaying: Boolean(r),
			      isAutoPlayCanceledOnAction: !1,
			      transformationSet: i,
			      transition: d,
			      fadeoutAnimationIndex: null,
			      fadeoutAnimationPosition: null,
			      fadeoutAnimationProcessing: !1,
			      swipeLimitMin: p,
			      swipeLimitMax: t,
			      swipeAllowedPositionMax: S,
			      swipeShiftValue: v,
			      canUseDom: n || (0, exports.canUseDOM)()
			    };
			  });
			exports.calculateInitialState = calculateInitialState;
	} (common));
		return common;
	}

	var classnames = {};

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.isClonedItem = exports.isTargetItem = exports.isActiveItem = exports.getRenderStageItemClasses = void 0;
		var types_1 = types,
		  common_1 = requireCommon(),
		  math_1 = math,
		  getRenderStageItemClasses = function (e, t) {
		    void 0 === e && (e = 0);
		    var s = t.fadeoutAnimationIndex,
		      i = (0, exports.isActiveItem)(e, t) ? types_1.Modifiers.ACTIVE : "",
		      n = (0, exports.isClonedItem)(e, t) ? types_1.Modifiers.CLONED : "",
		      t = (0, exports.isTargetItem)(e, t) ? types_1.Modifiers.TARGET : "",
		      e = e === s ? types_1.Classnames.ANIMATED : "";
		    return (0, common_1.concatClassnames)(types_1.Classnames.STAGE_ITEM, i, n, t, e);
		  },
		  isActiveItem = (exports.getRenderStageItemClasses = getRenderStageItemClasses, function (e, t) {
		    void 0 === e && (e = 0);
		    var s = t.activeIndex,
		      i = t.itemsInSlide,
		      n = t.itemsOffset,
		      r = t.infinite,
		      t = t.autoWidth,
		      o = (0, math_1.getShiftIndex)(i, n);
		    return t && r ? e - o === s + n : (t = s + o, r ? t <= e && e < t + i : s <= e && e < t);
		  }),
		  isTargetItem = (exports.isActiveItem = isActiveItem, function (e, t) {
		    void 0 === e && (e = 0);
		    var s = t.activeIndex,
		      i = t.itemsInSlide,
		      n = t.itemsOffset,
		      r = t.infinite,
		      t = t.autoWidth,
		      i = (0, math_1.getShiftIndex)(i, n);
		    return r ? t && r ? e - i === s + n : e === s + i : e === s;
		  }),
		  isClonedItem = (exports.isTargetItem = isTargetItem, function (e, t) {
		    void 0 === e && (e = 0);
		    var s = t.itemsInSlide,
		      i = t.itemsOffset,
		      n = t.itemsCount,
		      r = t.infinite,
		      t = t.autoWidth;
		    return !!r && (t && r ? e < s || n - 1 + s < e : e < (t = (0, math_1.getShiftIndex)(s, i)) || n - 1 + t < e);
		  });
		exports.isClonedItem = isClonedItem;
	} (classnames));

	var timers = {};

	(function (exports) {

		function debounce(n, i) {
		  void 0 === i && (i = 0);
		  function u() {
		    d && (clearTimeout(d), d = void 0);
		  }
		  var d = void 0;
		  return [function () {
		    for (var e = this, o = [], t = 0; t < arguments.length; t++) o[t] = arguments[t];
		    u(), d = window.setTimeout(function () {
		      n.apply(e, o), d = void 0;
		    }, i);
		  }, u];
		}
		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.debounce = void 0, exports.debounce = debounce;
	} (timers));

	var debug = {};

	(function (exports) {

		function debug() {
		  for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
		  console.debug.apply(console, e);
		}
		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.debug = void 0, exports.debug = debug;
	} (debug));

	var render = {};

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.getSlideItemInfo = exports.getSlideInfo = exports.getSlideIndexForMultipleItems = exports.getSlideIndexForNonMultipleItems = exports.getActiveSlideDotsLength = exports.getActiveSlideIndex = void 0;
		var getActiveSlideIndex = function (e, t) {
		    var t = t || {},
		      i = t.activeIndex,
		      o = t.itemsInSlide,
		      t = t.itemsCount,
		      i = i + o;
		    return 1 === o ? (0, exports.getSlideIndexForNonMultipleItems)(i, o, t) : (0, exports.getSlideIndexForMultipleItems)(i, o, t, e);
		  },
		  getActiveSlideDotsLength = (exports.getActiveSlideIndex = getActiveSlideIndex, function (e, t) {
		    var i;
		    return void 0 === t && (t = 1), (e = void 0 === e ? 0 : e) && t ? (i = Math.floor(e / t), e % t == 0 ? i - 1 : i) : 0;
		  }),
		  getSlideIndexForNonMultipleItems = (exports.getActiveSlideDotsLength = getActiveSlideDotsLength, function (e, t, i) {
		    return e < t ? i - t : i < e ? 0 : e - 1;
		  }),
		  getSlideIndexForMultipleItems = (exports.getSlideIndexForNonMultipleItems = getSlideIndexForNonMultipleItems, function (e, t, i, o) {
		    var l = (0, exports.getActiveSlideDotsLength)(i, t);
		    return e === i + t ? 0 : o || e < t && 0 !== e ? l : 0 === e ? i % t == 0 ? l : l - 1 : 0 < t ? Math.floor(e / t) - 1 : 0;
		  }),
		  getSlideInfo = (exports.getSlideIndexForMultipleItems = getSlideIndexForMultipleItems, function (e, t) {
		    void 0 === t && (t = 0);
		    e = (e = void 0 === e ? 0 : e) + 1;
		    return e < 1 ? e = t : t < e && (e = 1), {
		      item: e,
		      itemsCount: t
		    };
		  }),
		  getSlideItemInfo = (exports.getSlideInfo = getSlideInfo, function (e) {
		    var e = e || {},
		      t = e.itemsInSlide,
		      i = e.activeIndex,
		      o = e.infinite,
		      l = e.itemsCount;
		    return e.isStageContentPartial ? {
		      isPrevSlideDisabled: !0,
		      isNextSlideDisabled: !0
		    } : {
		      isPrevSlideDisabled: !1 === o && 0 === i,
		      isNextSlideDisabled: !1 === o && l - t <= i
		    };
		  });
		exports.getSlideItemInfo = getSlideItemInfo;
	} (render));

	var controls = {};

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.shouldCancelAutoPlayOnHover = exports.shouldCancelAutoPlayOnAction = exports.getItemIndexForDotNavigation = exports.checkIsTheLastDotIndex = exports.getDotsNavigationLength = exports.hasDotForEachSlide = exports.isStrategy = exports.shouldDisableButtons = exports.shouldDisableDots = exports.shouldDisableControls = void 0;
		var types_1 = types;
		function shouldDisableControls(t, o) {
		  var t = (t || {}).controlsStrategy,
		    o = o || {},
		    e = o.itemsInSlide,
		    s = o.itemsCount,
		    o = o.autoWidth;
		  if ((0, exports.isStrategy)(t, types_1.ControlsStrategy.RESPONSIVE)) return !o && e === s;
		}
		function shouldDisableDots(t, o) {
		  return t.disableDotsControls || shouldDisableControls(t, o);
		}
		function shouldDisableButtons(t, o) {
		  return t.disableButtonsControls || !t.infinite && shouldDisableControls(t, o);
		}
		exports.shouldDisableControls = shouldDisableControls, exports.shouldDisableDots = shouldDisableDots, exports.shouldDisableButtons = shouldDisableButtons;
		var isStrategy = function (t, o) {
		    return void 0 === t && (t = ""), void 0 === o && (o = ""), Boolean(t && t.includes(o));
		  },
		  hasDotForEachSlide = (exports.isStrategy = isStrategy, function (t, o) {
		    return t || (0, exports.isStrategy)(o, types_1.ControlsStrategy.ALTERNATE);
		  }),
		  getDotsNavigationLength = (exports.hasDotForEachSlide = hasDotForEachSlide, function (t, o, e) {
		    return void 0 === t && (t = 0), void 0 === o && (o = 1), (e = void 0 !== e && e) ? t : 0 !== Number(o) && Math.ceil(t / o) || 0;
		  }),
		  checkIsTheLastDotIndex = (exports.getDotsNavigationLength = getDotsNavigationLength, function (t, o, e) {
		    return !o && t === e - 1;
		  }),
		  getItemIndexForDotNavigation = (exports.checkIsTheLastDotIndex = checkIsTheLastDotIndex, function (t, o, e, s) {
		    return (o ? e - s : t * s) || 0;
		  }),
		  shouldCancelAutoPlayOnAction = (exports.getItemIndexForDotNavigation = getItemIndexForDotNavigation, function (t) {
		    return (t = void 0 === t ? "" : t) === types_1.AutoPlayStrategy.ACTION || t === types_1.AutoPlayStrategy.ALL;
		  }),
		  shouldCancelAutoPlayOnHover = (exports.shouldCancelAutoPlayOnAction = shouldCancelAutoPlayOnAction, function (t) {
		    return (t = void 0 === t ? "" : t) === types_1.AutoPlayStrategy.DEFAULT || t === types_1.AutoPlayStrategy.ALL;
		  });
		exports.shouldCancelAutoPlayOnHover = shouldCancelAutoPlayOnHover;
	} (controls));

	(function (exports) {

		var __createBinding = Object.create ? function (e, r, t, o) {
		    void 0 === o && (o = t);
		    var p = Object.getOwnPropertyDescriptor(r, t);
		    p && ("get" in p ? r.__esModule : !p.writable && !p.configurable) || (p = {
		      enumerable: !0,
		      get: function () {
		        return r[t];
		      }
		    }), Object.defineProperty(e, o, p);
		  } : function (e, r, t, o) {
		    e[o = void 0 === o ? t : o] = r[t];
		  },
		  __exportStar = function (e, r) {
		    for (var t in e) "default" === t || Object.prototype.hasOwnProperty.call(r, t) || __createBinding(r, e, t);
		  };
		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), __exportStar(requireCommon(), exports), __exportStar(requireElements(), exports), __exportStar(classnames, exports), __exportStar(timers, exports), __exportStar(math, exports), __exportStar(debug, exports), __exportStar(render, exports), __exportStar(controls, exports), __exportStar(mappers, exports);
	} (utils));

	(function (exports) {

		var __importDefault = function (e) {
		    return e && e.__esModule ? e : {
		      default: e
		    };
		  },
		  react_1 = (Object.defineProperty(exports, "__esModule", {
		    value: !0
		  }), exports.SlideInfo = void 0, __importDefault(require("react"))),
		  types_1 = types,
		  utils_1 = utils,
		  SlideInfo = function (e) {
		    var t = e.activeIndex,
		      s = e.itemsCount,
		      e = e.renderSlideInfo,
		      t = (0, utils_1.getSlideInfo)(t, s).item;
		    return "function" == typeof e ? react_1.default.createElement("div", {
		      className: types_1.Classnames.SLIDE_INFO
		    }, e({
		      item: t,
		      itemsCount: s
		    })) : (e = (0, utils_1.concatClassnames)(types_1.Classnames.SLIDE_INFO_ITEM, types_1.Modifiers.SEPARATOR), react_1.default.createElement("div", {
		      className: types_1.Classnames.SLIDE_INFO
		    }, react_1.default.createElement("span", {
		      className: types_1.Classnames.SLIDE_INFO_ITEM
		    }, t), react_1.default.createElement("span", {
		      className: e
		    }, "/"), react_1.default.createElement("span", {
		      className: types_1.Classnames.SLIDE_INFO_ITEM
		    }, s)));
		  };
		exports.SlideInfo = SlideInfo;
	} (SlideInfo));

	var StageItem = {};

	(function (exports) {

		var __importDefault = function (e) {
		    return e && e.__esModule ? e : {
		      default: e
		    };
		  },
		  react_1 = (Object.defineProperty(exports, "__esModule", {
		    value: !0
		  }), exports.StageItem = void 0, __importDefault(require("react"))),
		  StageItem = function (e) {
		    var t = e.item,
		      r = e.className,
		      e = e.styles;
		    return react_1.default.createElement("li", {
		      style: e,
		      className: r
		    }, t);
		  };
		exports.StageItem = StageItem;
	} (StageItem));

	var DotsNavigation = {};

	(function (exports) {

		var __importDefault = function (e) {
		    return e && e.__esModule ? e : {
		      default: e
		    };
		  },
		  react_1 = (Object.defineProperty(exports, "__esModule", {
		    value: !0
		  }), exports.DotsNavigation = void 0, __importDefault(require("react"))),
		  types_1 = types,
		  utils_1 = utils,
		  DotsNavigation = function (e) {
		    var a = e.state,
		      n = e.onClick,
		      r = e.onMouseEnter,
		      l = e.onMouseLeave,
		      t = e.controlsStrategy,
		      u = e.renderDotsItem,
		      c = a.itemsCount,
		      _ = a.itemsInSlide,
		      d = a.infinite,
		      e = a.autoWidth,
		      m = a.activeIndex,
		      v = (0, utils_1.getSlideItemInfo)(a).isNextSlideDisabled,
		      f = (0, utils_1.hasDotForEachSlide)(e, t),
		      D = (0, utils_1.getDotsNavigationLength)(c, _, f);
		    return react_1.default.createElement("ul", {
		      className: types_1.Classnames.DOTS
		    }, Array.from({
		      length: c
		    }).map(function (e, t) {
		      var i, s, o;
		      if (t < D) return s = (0, utils_1.checkIsTheLastDotIndex)(t, Boolean(d), D), i = (0, utils_1.getItemIndexForDotNavigation)(t, s, c, _), s = (0, utils_1.getActiveSlideIndex)(v, a), f && ((s = m) < 0 ? s = c - 1 : c <= m && (s = 0), i = t), s = s === t ? types_1.Modifiers.ACTIVE : "", o = u ? types_1.Modifiers.CUSTOM : "", o = (0, utils_1.concatClassnames)(types_1.Classnames.DOTS_ITEM, s, o), react_1.default.createElement("li", {
		        key: "dot-item-".concat(t),
		        onMouseEnter: r,
		        onMouseLeave: l,
		        onClick: function () {
		          return n(i);
		        },
		        className: o
		      }, u && u({
		        isActive: Boolean(s),
		        activeIndex: t
		      }));
		    }));
		  };
		exports.DotsNavigation = DotsNavigation;
	} (DotsNavigation));

	var PlayPauseButton = {};

	(function (exports) {

		var __importDefault = function (e) {
		    return e && e.__esModule ? e : {
		      default: e
		    };
		  },
		  react_1 = (Object.defineProperty(exports, "__esModule", {
		    value: !0
		  }), exports.PlayPauseButton = void 0, __importDefault(require("react"))),
		  types_1 = types,
		  utils_1 = utils,
		  PlayPauseButton = function (e) {
		    var t = e.isPlaying,
		      a = e.onClick,
		      e = e.renderPlayPauseButton;
		    return "function" == typeof e ? react_1.default.createElement("div", {
		      className: types_1.Classnames.PLAY_BTN,
		      onClick: a
		    }, e({
		      isPlaying: t
		    })) : (e = t ? types_1.Modifiers.PAUSE : "", t = (0, utils_1.concatClassnames)(types_1.Classnames.PLAY_BTN_ITEM, e), react_1.default.createElement("div", {
		      className: types_1.Classnames.PLAY_BTN
		    }, react_1.default.createElement("div", {
		      className: types_1.Classnames.PLAY_BTN_WRAPPER
		    }, react_1.default.createElement("div", {
		      onClick: a,
		      className: t
		    }))));
		  };
		exports.PlayPauseButton = PlayPauseButton;
	} (PlayPauseButton));

	var PrevNextButton = {};

	(function (exports) {

		var __importDefault = function (e) {
		    return e && e.__esModule ? e : {
		      default: e
		    };
		  },
		  react_1 = (Object.defineProperty(exports, "__esModule", {
		    value: !0
		  }), exports.PrevNextButton = void 0, __importDefault(require("react"))),
		  types_1 = types,
		  utils_1 = utils,
		  PrevNextButton = function (e) {
		    var t,
		      s = e.name,
		      a = e.isDisabled,
		      r = e.onClick,
		      n = e.renderPrevButton,
		      e = e.renderNextButton;
		    return "function" == typeof n ? react_1.default.createElement("div", {
		      className: types_1.Classnames.BUTTON_PREV,
		      onClick: r
		    }, n({
		      isDisabled: a
		    })) : "function" == typeof e ? react_1.default.createElement("div", {
		      className: types_1.Classnames.BUTTON_NEXT,
		      onClick: r
		    }, e({
		      isDisabled: a
		    })) : (e = (n = "prev" === s) ? "<" : ">", s = n ? types_1.Classnames.BUTTON_PREV : types_1.Classnames.BUTTON_NEXT, t = n ? types_1.Classnames.BUTTON_PREV_WRAPPER : types_1.Classnames.BUTTON_NEXT_WRAPPER, n = n ? types_1.Classnames.BUTTON_PREV_ITEM : types_1.Classnames.BUTTON_NEXT_ITEM, a = a ? types_1.Modifiers.INACTIVE : "", n = (0, utils_1.concatClassnames)(n, a), react_1.default.createElement("div", {
		      className: s
		    }, react_1.default.createElement("div", {
		      className: t
		    }, react_1.default.createElement("p", {
		      className: n,
		      onClick: function (e) {
		        return r(e);
		      }
		    }, react_1.default.createElement("span", {
		      "data-area": e
		    })))));
		  };
		exports.PrevNextButton = PrevNextButton;
	} (PrevNextButton));

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: !0
		}), exports.PrevNextButton = exports.PlayPauseButton = exports.DotsNavigation = exports.StageItem = exports.SlideInfo = void 0;
		var SlideInfo_1 = SlideInfo,
		  StageItem_1 = (Object.defineProperty(exports, "SlideInfo", {
		    enumerable: !0,
		    get: function () {
		      return SlideInfo_1.SlideInfo;
		    }
		  }), StageItem),
		  DotsNavigation_1 = (Object.defineProperty(exports, "StageItem", {
		    enumerable: !0,
		    get: function () {
		      return StageItem_1.StageItem;
		    }
		  }), DotsNavigation),
		  PlayPauseButton_1 = (Object.defineProperty(exports, "DotsNavigation", {
		    enumerable: !0,
		    get: function () {
		      return DotsNavigation_1.DotsNavigation;
		    }
		  }), PlayPauseButton),
		  PrevNextButton_1 = (Object.defineProperty(exports, "PlayPauseButton", {
		    enumerable: !0,
		    get: function () {
		      return PlayPauseButton_1.PlayPauseButton;
		    }
		  }), PrevNextButton);
		Object.defineProperty(exports, "PrevNextButton", {
		  enumerable: !0,
		  get: function () {
		    return PrevNextButton_1.PrevNextButton;
		  }
		});
	} (views));

	(function (exports) {

		var __extends = function () {
		    var n = function (t, e) {
		      return (n = Object.setPrototypeOf || ({
		        __proto__: []
		      } instanceof Array ? function (t, e) {
		        t.__proto__ = e;
		      } : function (t, e) {
		        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
		      }))(t, e);
		    };
		    return function (t, e) {
		      if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
		      function i() {
		        this.constructor = t;
		      }
		      n(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
		    };
		  }(),
		  __assign = function () {
		    return (__assign = Object.assign || function (t) {
		      for (var e, i = 1, n = arguments.length; i < n; i++) for (var o in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
		      return t;
		    }).apply(this, arguments);
		  },
		  __createBinding = Object.create ? function (t, e, i, n) {
		    void 0 === n && (n = i);
		    var o = Object.getOwnPropertyDescriptor(e, i);
		    o && ("get" in o ? e.__esModule : !o.writable && !o.configurable) || (o = {
		      enumerable: !0,
		      get: function () {
		        return e[i];
		      }
		    }), Object.defineProperty(t, n, o);
		  } : function (t, e, i, n) {
		    t[n = void 0 === n ? i : n] = e[i];
		  },
		  __setModuleDefault = Object.create ? function (t, e) {
		    Object.defineProperty(t, "default", {
		      enumerable: !0,
		      value: e
		    });
		  } : function (t, e) {
		    t.default = e;
		  },
		  __importStar = function (t) {
		    if (t && t.__esModule) return t;
		    var e = {};
		    if (null != t) for (var i in t) "default" !== i && Object.prototype.hasOwnProperty.call(t, i) && __createBinding(e, t, i);
		    return __setModuleDefault(e, t), e;
		  },
		  __exportStar = function (t, e) {
		    for (var i in t) "default" === i || Object.prototype.hasOwnProperty.call(e, i) || __createBinding(e, t, i);
		  },
		  __awaiter = function (t, a, r, l) {
		    return new (r = r || Promise)(function (i, e) {
		      function n(t) {
		        try {
		          s(l.next(t));
		        } catch (t) {
		          e(t);
		        }
		      }
		      function o(t) {
		        try {
		          s(l.throw(t));
		        } catch (t) {
		          e(t);
		        }
		      }
		      function s(t) {
		        var e;
		        t.done ? i(t.value) : ((e = t.value) instanceof r ? e : new r(function (t) {
		          t(e);
		        })).then(n, o);
		      }
		      s((l = l.apply(t, a || [])).next());
		    });
		  },
		  __generator = function (n, o) {
		    var s,
		      a,
		      r,
		      l = {
		        label: 0,
		        sent: function () {
		          if (1 & r[0]) throw r[1];
		          return r[1];
		        },
		        trys: [],
		        ops: []
		      },
		      t = {
		        next: e(0),
		        throw: e(1),
		        return: e(2)
		      };
		    return "function" == typeof Symbol && (t[Symbol.iterator] = function () {
		      return this;
		    }), t;
		    function e(i) {
		      return function (t) {
		        var e = [i, t];
		        if (s) throw new TypeError("Generator is already executing.");
		        for (; l;) try {
		          if (s = 1, a && (r = 2 & e[0] ? a.return : e[0] ? a.throw || ((r = a.return) && r.call(a), 0) : a.next) && !(r = r.call(a, e[1])).done) return r;
		          switch (a = 0, (e = r ? [2 & e[0], r.value] : e)[0]) {
		            case 0:
		            case 1:
		              r = e;
		              break;
		            case 4:
		              return l.label++, {
		                value: e[1],
		                done: !1
		              };
		            case 5:
		              l.label++, a = e[1], e = [0];
		              continue;
		            case 7:
		              e = l.ops.pop(), l.trys.pop();
		              continue;
		            default:
		              if (!(r = 0 < (r = l.trys).length && r[r.length - 1]) && (6 === e[0] || 2 === e[0])) {
		                l = 0;
		                continue;
		              }
		              if (3 === e[0] && (!r || e[1] > r[0] && e[1] < r[3])) l.label = e[1];else if (6 === e[0] && l.label < r[1]) l.label = r[1], r = e;else {
		                if (!(r && l.label < r[2])) {
		                  r[2] && l.ops.pop(), l.trys.pop();
		                  continue;
		                }
		                l.label = r[2], l.ops.push(e);
		              }
		          }
		          e = o.call(n, l);
		        } catch (t) {
		          e = [6, t], a = 0;
		        } finally {
		          s = r = 0;
		        }
		        if (5 & e[0]) throw e[1];
		        return {
		          value: e[0] ? e[1] : void 0,
		          done: !0
		        };
		      };
		    }
		  },
		  __importDefault = function (t) {
		    return t && t.__esModule ? t : {
		      default: t
		    };
		  },
		  react_1 = (Object.defineProperty(exports, "__esModule", {
		    value: !0
		  }), __importDefault(require("react"))),
		  vanilla_swipe_1 = __importDefault(lib),
		  defaultProps_1 = defaultProps,
		  Views = __importStar(views),
		  Utils = __importStar(utils),
		  types_1 = types,
		  AliceCarousel = (__exportStar(types, exports), function (e) {
		    function t(t) {
		      var s = e.call(this, t) || this;
		      return s.swipeListener = null, s._handleKeyboardEvents = function (t) {
		        switch (t.code) {
		          case "Space":
		            return s.props.autoPlay && s._handlePlayPauseToggle();
		          case "ArrowLeft":
		            return s.slidePrev(t);
		          case "ArrowRight":
		            return s.slideNext(t);
		        }
		      }, s._handleBeforeSlideEnd = function (o) {
		        return __awaiter(s, void 0, void 0, function () {
		          var e, i, n;
		          return __generator(this, function (t) {
		            switch (t.label) {
		              case 0:
		                return (i = this.state, n = i.activeIndex, e = i.itemsCount, i = i.fadeoutAnimationProcessing, Utils.shouldRecalculateSlideIndex(n, e)) ? (n = Utils.getUpdateSlidePositionIndex(n, e), [4, this._handleUpdateSlidePosition(n)]) : [3, 2];
		              case 1:
		                return t.sent(), [3, 4];
		              case 2:
		                return i ? [4, this.setState({
		                  fadeoutAnimationIndex: null,
		                  fadeoutAnimationPosition: null,
		                  fadeoutAnimationProcessing: !1
		                })] : [3, 4];
		              case 3:
		                t.sent(), t.label = 4;
		              case 4:
		                return this._handleSlideChanged(o), [2];
		            }
		          });
		        });
		      }, s._handleMouseEnter = function () {
		        var t = s.props.autoPlayStrategy;
		        Utils.shouldCancelAutoPlayOnHover(t) && s.state.isAutoPlaying && (s.isHovered = !0, s._handlePause());
		      }, s._handleMouseLeave = function () {
		        s.state.isAutoPlaying && (s.isHovered = !1, s._handlePlay());
		      }, s._handlePause = function () {
		        s._clearAutoPlayTimeout();
		      }, s._handlePlayPauseToggle = function () {
		        return __awaiter(s, void 0, void 0, function () {
		          var e;
		          return __generator(this, function (t) {
		            switch (t.label) {
		              case 0:
		                return e = this.state.isAutoPlaying, this.hasUserAction = !0, [4, this.setState({
		                  isAutoPlaying: !e,
		                  isAutoPlayCanceledOnAction: !0
		                })];
		              case 1:
		                return t.sent(), e ? this._handlePause() : this._handlePlay(), [2];
		            }
		          });
		        });
		      }, s._setRootComponentRef = function (t) {
		        return s.rootElement = t;
		      }, s._setStageComponentRef = function (t) {
		        return s.stageComponent = t;
		      }, s._renderStageItem = function (t, e) {
		        var i = Utils.getRenderStageItemStyles(e, s.state),
		          n = Utils.getRenderStageItemClasses(e, s.state);
		        return react_1.default.createElement(Views.StageItem, {
		          styles: i,
		          className: n,
		          key: "stage-item-".concat(e),
		          item: t
		        });
		      }, s._renderSlideInfo = function () {
		        var t = s.props.renderSlideInfo,
		          e = s.state,
		          i = e.activeIndex,
		          e = e.itemsCount;
		        return react_1.default.createElement(Views.SlideInfo, {
		          itemsCount: e,
		          activeIndex: i,
		          renderSlideInfo: t
		        });
		      }, s.state = Utils.calculateInitialState(t, null), s.isHovered = !1, s.isAnimationDisabled = !1, s.isTouchMoveProcessStarted = !1, s.cancelTouchAnimations = !1, s.hasUserAction = !1, s.rootElement = null, s.rootComponentDimensions = {}, s.stageComponent = null, s.startTouchmovePosition = void 0, s.slideTo = s.slideTo.bind(s), s.slidePrev = s.slidePrev.bind(s), s.slideNext = s.slideNext.bind(s), s._handleTouchmove = s._handleTouchmove.bind(s), s._handleTouchend = s._handleTouchend.bind(s), s._handleDotClick = s._handleDotClick.bind(s), s._handleResize = s._handleResize.bind(s), t = Utils.debounce(s._handleResize, 100), s._handleResizeDebounced = t[0], s._cancelResizeDebounced = t[1], s;
		    }
		    return __extends(t, e), t.prototype.componentDidMount = function () {
		      return __awaiter(this, void 0, void 0, function () {
		        return __generator(this, function (t) {
		          switch (t.label) {
		            case 0:
		              return [4, this._setInitialState()];
		            case 1:
		              return t.sent(), this._addEventListeners(), this._setupSwipeHandlers(), this.props.autoPlay && this._handlePlay(), [2];
		          }
		        });
		      });
		    }, t.prototype.componentDidUpdate = function (t, e) {
		      var i = this.props,
		        n = i.activeIndex,
		        o = i.animationDuration,
		        s = i.autoWidth,
		        a = i.children,
		        r = i.infinite,
		        l = i.items,
		        u = i.paddingLeft,
		        d = i.paddingRight,
		        c = i.responsive,
		        h = i.swipeExtraPadding,
		        p = i.mouseTracking,
		        _ = i.swipeDelta,
		        m = i.touchTracking,
		        i = i.touchMoveDefaultEvents;
		      a && t.children !== a ? (a = e.activeIndex, e = __assign(__assign({}, this.props), {
		        activeIndex: a
		      }), this._updateComponent(e)) : t.autoWidth !== s || t.infinite !== r || t.items !== l || t.paddingLeft !== u || t.paddingRight !== d || t.responsive !== c || t.swipeExtraPadding !== h ? this._updateComponent() : (t.animationDuration !== o && this.setState({
		        animationDuration: o
		      }), t.activeIndex !== n && this.slideTo(n, types_1.EventType.UPDATE)), t.swipeDelta === _ && t.mouseTracking === p && t.touchTracking === m && t.touchMoveDefaultEvents === i || this._updateSwipeProps(), this.props.keyboardNavigation !== t.keyboardNavigation && this._updateEventListeners();
		    }, t.prototype.componentWillUnmount = function () {
		      this._cancelResizeDebounced(), this._cancelTimeoutAnimations(), this._removeEventListeners();
		    }, Object.defineProperty(t.prototype, "eventObject", {
		      get: function () {
		        var t = this.state,
		          e = t.itemsInSlide,
		          t = t.activeIndex,
		          i = Utils.getSlideItemInfo(this.state),
		          n = i.isNextSlideDisabled,
		          i = i.isPrevSlideDisabled;
		        return {
		          item: t,
		          slide: Utils.getActiveSlideIndex(n, this.state),
		          itemsInSlide: e,
		          isNextSlideDisabled: n,
		          isPrevSlideDisabled: i,
		          type: types_1.EventType.ACTION
		        };
		      },
		      enumerable: !1,
		      configurable: !0
		    }), Object.defineProperty(t.prototype, "isFadeoutAnimationAllowed", {
		      get: function () {
		        var t = this.state.itemsInSlide,
		          e = this.props,
		          i = e.animationType,
		          n = e.paddingLeft,
		          o = e.paddingRight,
		          e = e.autoWidth;
		        return 1 === t && i === types_1.AnimationType.FADEOUT && !(n || o || e);
		      },
		      enumerable: !1,
		      configurable: !0
		    }), Object.defineProperty(t.prototype, "touchmovePosition", {
		      get: function () {
		        return void 0 !== this.startTouchmovePosition ? this.startTouchmovePosition : this.state.translate3d;
		      },
		      enumerable: !1,
		      configurable: !0
		    }), t.prototype.slideTo = function (t, e) {
		      var i, n, o;
		      void 0 === t && (t = 0), this._handlePause(), this.isFadeoutAnimationAllowed ? (i = Utils.getUpdateSlidePositionIndex(t, this.state.itemsCount), n = Utils.getFadeoutAnimationPosition(i, this.state), o = Utils.getFadeoutAnimationIndex(this.state), this._handleSlideTo({
		        activeIndex: i,
		        fadeoutAnimationIndex: o,
		        fadeoutAnimationPosition: n,
		        eventType: e
		      })) : this._handleSlideTo({
		        activeIndex: t,
		        eventType: e
		      });
		    }, t.prototype.slidePrev = function (t) {
		      this._handlePause(), t && t.isTrusted && (this.hasUserAction = !0);
		      var e,
		        i,
		        t = this.state.activeIndex - 1;
		      this.isFadeoutAnimationAllowed ? (e = -this.state.stageWidth, i = Utils.getFadeoutAnimationIndex(this.state), this._handleSlideTo({
		        activeIndex: t,
		        fadeoutAnimationIndex: i,
		        fadeoutAnimationPosition: e
		      })) : this._handleSlideTo({
		        activeIndex: t
		      });
		    }, t.prototype.slideNext = function (t) {
		      this._handlePause(), t && t.isTrusted && (this.hasUserAction = !0);
		      var e,
		        i,
		        t = this.state.activeIndex + 1;
		      this.isFadeoutAnimationAllowed ? (e = this.state.stageWidth, i = Utils.getFadeoutAnimationIndex(this.state), this._handleSlideTo({
		        activeIndex: t,
		        fadeoutAnimationIndex: i,
		        fadeoutAnimationPosition: e
		      })) : this._handleSlideTo({
		        activeIndex: t
		      });
		    }, t.prototype._addEventListeners = function () {
		      window.addEventListener("resize", this._handleResizeDebounced), this.props.keyboardNavigation && window.addEventListener("keyup", this._handleKeyboardEvents);
		    }, t.prototype._removeEventListeners = function () {
		      this.swipeListener && this.swipeListener.destroy(), window.removeEventListener("resize", this._handleResizeDebounced), window.removeEventListener("keyup", this._handleKeyboardEvents);
		    }, t.prototype._updateEventListeners = function () {
		      this.props.keyboardNavigation ? window.addEventListener("keyup", this._handleKeyboardEvents) : window.removeEventListener("keyup", this._handleKeyboardEvents);
		    }, t.prototype._handleResize = function (o) {
		      return __awaiter(this, void 0, void 0, function () {
		        var e, i, n;
		        return __generator(this, function (t) {
		          switch (t.label) {
		            case 0:
		              return (i = this.props.onResizeEvent, n = Utils.getElementDimensions(this.rootElement), (i || Utils.shouldHandleResizeEvent)(o, this.rootComponentDimensions, n)) ? (this._cancelTimeoutAnimations(), this.rootComponentDimensions = n, i = this.state, n = i.itemsCount, e = i.isAutoPlaying, i = Utils.getUpdateSlidePositionIndex(this.state.activeIndex, n), n = Utils.calculateInitialState(__assign(__assign({}, this.props), {
		                activeIndex: i
		              }), this.stageComponent), i = Utils.getTranslate3dProperty(n.activeIndex, n), n = __assign(__assign({}, n), {
		                translate3d: i,
		                isAutoPlaying: e
		              }), Utils.animate(this.stageComponent, {
		                position: -i
		              }), [4, this.setState(n)]) : [3, 2];
		            case 1:
		              t.sent(), this._handleResized(), this.isAnimationDisabled = !1, e && this._handlePlay(), t.label = 2;
		            case 2:
		              return [2];
		          }
		        });
		      });
		    }, t.prototype._handleTouchmove = function (t, e) {
		      var i = e.absY,
		        n = e.absX,
		        o = e.deltaX,
		        e = this.props.swipeDelta,
		        s = this.state,
		        a = s.swipeShiftValue,
		        r = s.swipeLimitMin,
		        l = s.swipeLimitMax,
		        u = s.infinite,
		        s = s.fadeoutAnimationProcessing;
		      if (this.hasUserAction = !0, !(s || !this.isTouchMoveProcessStarted && Utils.isVerticalTouchmoveDetected(n, i, e))) {
		        this.isTouchMoveProcessStarted || (this._cancelTimeoutAnimations(), this._setTouchmovePosition(), this.isAnimationDisabled = !0, this.isTouchMoveProcessStarted = !0, this._handleSlideChange());
		        var d = Utils.getTouchmoveTranslatePosition(o, this.touchmovePosition);
		        if (!1 === u) return r < d || d < -l ? void 0 : void Utils.animate(this.stageComponent, {
		          position: d
		        });
		        if (Utils.shouldRecalculateSwipePosition(d, r, l)) try {
		          !function t() {
		            Utils.getIsLeftDirection(o) ? d += a : d += -a;
		            Utils.shouldRecalculateSwipePosition(d, r, l) && t();
		          }();
		        } catch (t) {
		          Utils.debug(t);
		        }
		        Utils.animate(this.stageComponent, {
		          position: d
		        });
		      }
		    }, t.prototype._handleTouchend = function (t, e) {
		      var i,
		        n,
		        o,
		        e = e.deltaX;
		      this._clearTouchmovePosition(), this.isTouchMoveProcessStarted && (this.isTouchMoveProcessStarted = !1, i = this.state.animationDuration, n = this.props.animationEasingFunction, o = Utils.getTranslateXProperty(this.stageComponent), e = Utils.getSwipeTouchendPosition(this.state, e, o), Utils.animate(this.stageComponent, {
		        position: e,
		        animationDuration: i,
		        animationEasingFunction: n
		      }), this._handleBeforeTouchEnd(e));
		    }, t.prototype._handleBeforeTouchEnd = function (s) {
		      var t = this,
		        e = this.state.animationDuration;
		      this.touchEndTimeoutId = window.setTimeout(function () {
		        return __awaiter(t, void 0, void 0, function () {
		          var e,
		            i,
		            n,
		            o = this;
		          return __generator(this, function (t) {
		            switch (t.label) {
		              case 0:
		                return e = Utils.getSwipeTouchendIndex(s, this.state), i = Utils.getTranslate3dProperty(e, this.state), Utils.animate(this.stageComponent, {
		                  position: -i
		                }), n = Utils.getTransitionProperty(), [4, this.setState({
		                  activeIndex: e,
		                  translate3d: i,
		                  transition: n
		                })];
		              case 1:
		                return t.sent(), requestAnimationFrame(function () {
		                  return o._handleSlideChanged();
		                }), [2];
		            }
		          });
		        });
		      }, e);
		    }, t.prototype._handleSlideTo = function (t) {
		      var e = t.activeIndex,
		        a = void 0 === e ? 0 : e,
		        e = t.fadeoutAnimationIndex,
		        r = void 0 === e ? null : e,
		        e = t.fadeoutAnimationPosition,
		        l = void 0 === e ? null : e,
		        u = t.eventType;
		      return __awaiter(this, void 0, void 0, function () {
		        var e,
		          i,
		          n,
		          o,
		          s = this;
		        return __generator(this, function (t) {
		          switch (t.label) {
		            case 0:
		              return (i = this.props, n = i.infinite, i = i.animationEasingFunction, e = this.state, o = e.itemsCount, e = e.animationDuration, this.isAnimationDisabled || this.state.activeIndex === a || !n && Utils.shouldCancelSlideAnimation(a, o)) ? [2] : (this.isAnimationDisabled = !0, this._cancelTimeoutAnimations(), this._handleSlideChange(u), n = !1, o = Utils.getTranslate3dProperty(a, this.state), i = null !== r && null !== l ? (n = !0, Utils.getTransitionProperty()) : Utils.getTransitionProperty({
		                animationDuration: e,
		                animationEasingFunction: i
		              }), [4, this.setState({
		                activeIndex: a,
		                transition: i,
		                translate3d: o,
		                animationDuration: e,
		                fadeoutAnimationIndex: r,
		                fadeoutAnimationPosition: l,
		                fadeoutAnimationProcessing: n
		              })]);
		            case 1:
		              return t.sent(), this.slideEndTimeoutId = window.setTimeout(function () {
		                return s._handleBeforeSlideEnd(u);
		              }, e), [2];
		          }
		        });
		      });
		    }, t.prototype._handleUpdateSlidePosition = function (o) {
		      return __awaiter(this, void 0, void 0, function () {
		        var e, i, n;
		        return __generator(this, function (t) {
		          switch (t.label) {
		            case 0:
		              return e = this.state.animationDuration, i = Utils.getTranslate3dProperty(o, this.state), n = Utils.getTransitionProperty({
		                animationDuration: 0
		              }), [4, this.setState({
		                activeIndex: o,
		                translate3d: i,
		                transition: n,
		                animationDuration: e,
		                fadeoutAnimationIndex: null,
		                fadeoutAnimationPosition: null,
		                fadeoutAnimationProcessing: !1
		              })];
		            case 1:
		              return t.sent(), [2];
		          }
		        });
		      });
		    }, t.prototype._handleResized = function () {
		      this.props.onResized && this.props.onResized(__assign(__assign({}, this.eventObject), {
		        type: types_1.EventType.RESIZE
		      }));
		    }, t.prototype._handleSlideChange = function (t) {
		      this.props.onSlideChange && (t = t ? __assign(__assign({}, this.eventObject), {
		        type: t
		      }) : this.eventObject, this.props.onSlideChange(t));
		    }, t.prototype._handleSlideChanged = function (s) {
		      return __awaiter(this, void 0, void 0, function () {
		        var e, i, n, o;
		        return __generator(this, function (t) {
		          switch (t.label) {
		            case 0:
		              return (i = this.state, e = i.isAutoPlaying, i = i.isAutoPlayCanceledOnAction, n = this.props, o = n.autoPlayStrategy, n = n.onSlideChanged, Utils.shouldCancelAutoPlayOnAction(o) && this.hasUserAction && !i) ? [4, this.setState({
		                isAutoPlayCanceledOnAction: !0,
		                isAutoPlaying: !1
		              })] : [3, 2];
		            case 1:
		              return t.sent(), [3, 3];
		            case 2:
		              e && this._handlePlay(), t.label = 3;
		            case 3:
		              return this.isAnimationDisabled = !1, n && (o = s ? __assign(__assign({}, this.eventObject), {
		                type: s
		              }) : this.eventObject, n(o)), [2];
		          }
		        });
		      });
		    }, t.prototype._handleDotClick = function (t) {
		      this.hasUserAction = !0, this.slideTo(t);
		    }, t.prototype._handlePlay = function () {
		      this._setAutoPlayInterval();
		    }, t.prototype._cancelTimeoutAnimations = function () {
		      this._clearAutoPlayTimeout(), this._clearSlideEndTimeout(), this.clearTouchendTimeout();
		    }, t.prototype._clearAutoPlayTimeout = function () {
		      window.clearTimeout(this.autoPlayTimeoutId), this.autoPlayTimeoutId = void 0;
		    }, t.prototype._clearSlideEndTimeout = function () {
		      clearTimeout(this.slideEndTimeoutId), this.slideEndTimeoutId = void 0;
		    }, t.prototype.clearTouchendTimeout = function () {
		      clearTimeout(this.touchEndTimeoutId), this.touchEndTimeoutId = void 0;
		    }, t.prototype._clearTouchmovePosition = function () {
		      this.startTouchmovePosition = void 0;
		    }, t.prototype._setTouchmovePosition = function () {
		      var t = Utils.getTranslateXProperty(this.stageComponent);
		      this.startTouchmovePosition = -t;
		    }, t.prototype._setInitialState = function () {
		      return __awaiter(this, void 0, void 0, function () {
		        var e;
		        return __generator(this, function (t) {
		          switch (t.label) {
		            case 0:
		              return e = Utils.calculateInitialState(this.props, this.stageComponent), this.rootComponentDimensions = Utils.getElementDimensions(this.rootElement), [4, this.setState(e)];
		            case 1:
		              return t.sent(), this.props.onInitialized && this.props.onInitialized(__assign(__assign({}, this.eventObject), {
		                type: types_1.EventType.INIT
		              })), [2];
		          }
		        });
		      });
		    }, t.prototype._setAutoPlayInterval = function () {
		      var t = this,
		        e = this.props,
		        i = e.autoPlayDirection,
		        e = e.autoPlayInterval;
		      this.autoPlayTimeoutId = window.setTimeout(function () {
		        t.isHovered || (i === types_1.AutoplayDirection.RTL ? t.slidePrev() : t.slideNext());
		      }, e);
		    }, t.prototype._setupSwipeHandlers = function () {
		      this.swipeListener = new vanilla_swipe_1.default({
		        element: this.rootElement,
		        delta: this.props.swipeDelta,
		        onSwiping: this._handleTouchmove,
		        onSwiped: this._handleTouchend,
		        rotationAngle: 5,
		        mouseTrackingEnabled: this.props.mouseTracking,
		        touchTrackingEnabled: this.props.touchTracking,
		        preventDefaultTouchmoveEvent: !this.props.touchMoveDefaultEvents,
		        preventTrackingOnMouseleave: !0
		      }), this.swipeListener.init();
		    }, t.prototype._updateComponent = function (t) {
		      var e = this;
		      void 0 === t && (t = this.props), this._cancelTimeoutAnimations(), this.isAnimationDisabled = !1, this.state.isAutoPlaying && this._handlePlay(), this.setState({
		        clones: Utils.createClones(t)
		      }), requestAnimationFrame(function () {
		        e.setState(Utils.calculateInitialState(t, e.stageComponent));
		      });
		    }, t.prototype._updateSwipeProps = function () {
		      this.swipeListener && this.swipeListener.update({
		        delta: this.props.swipeDelta,
		        mouseTrackingEnabled: this.props.mouseTracking,
		        touchTrackingEnabled: this.props.touchTracking,
		        preventDefaultTouchmoveEvent: !this.props.touchMoveDefaultEvents
		      });
		    }, t.prototype._renderDotsNavigation = function () {
		      var t = this.props,
		        e = t.renderDotsItem,
		        t = t.controlsStrategy;
		      return react_1.default.createElement(Views.DotsNavigation, {
		        state: this.state,
		        onClick: this._handleDotClick,
		        renderDotsItem: e,
		        controlsStrategy: t
		      });
		    }, t.prototype._renderPrevButton = function () {
		      var t = this.props.renderPrevButton,
		        e = Utils.getSlideItemInfo(this.state).isPrevSlideDisabled;
		      return react_1.default.createElement(Views.PrevNextButton, {
		        name: "prev",
		        onClick: this.slidePrev,
		        isDisabled: e,
		        renderPrevButton: t
		      });
		    }, t.prototype._renderNextButton = function () {
		      var t = this.props.renderNextButton,
		        e = Utils.getSlideItemInfo(this.state).isNextSlideDisabled;
		      return react_1.default.createElement(Views.PrevNextButton, {
		        name: "next",
		        onClick: this.slideNext,
		        isDisabled: e,
		        renderNextButton: t
		      });
		    }, t.prototype._renderPlayPauseButton = function () {
		      var t = this.props.renderPlayPauseButton,
		        e = this.state.isAutoPlaying;
		      return react_1.default.createElement(Views.PlayPauseButton, {
		        isPlaying: e,
		        onClick: this._handlePlayPauseToggle,
		        renderPlayPauseButton: t
		      });
		    }, t.prototype.render = function () {
		      var t = this.state,
		        e = t.translate3d,
		        i = t.clones,
		        n = t.transition,
		        t = t.canUseDom,
		        o = Utils.shouldDisableDots(this.props, this.state),
		        s = Utils.shouldDisableButtons(this.props, this.state),
		        a = Utils.getRenderWrapperStyles(this.props, this.state, this.stageComponent),
		        e = Utils.getRenderStageStyles({
		          translate3d: e
		        }, {
		          transition: n
		        }),
		        n = this.props.ssrSilentMode || t ? "" : types_1.Modifiers.SSR,
		        t = Utils.concatClassnames(types_1.Classnames.ROOT, n);
		      return react_1.default.createElement("div", {
		        className: t
		      }, react_1.default.createElement("div", {
		        ref: this._setRootComponentRef
		      }, react_1.default.createElement("div", {
		        style: a,
		        className: types_1.Classnames.WRAPPER,
		        onMouseEnter: this._handleMouseEnter,
		        onMouseLeave: this._handleMouseLeave
		      }, react_1.default.createElement("ul", {
		        style: e,
		        className: types_1.Classnames.STAGE,
		        ref: this._setStageComponentRef
		      }, i.map(this._renderStageItem)))), o ? null : this._renderDotsNavigation(), s ? null : this._renderPrevButton(), s ? null : this._renderNextButton(), this.props.disableSlideInfo ? null : this._renderSlideInfo(), this.props.autoPlayControls ? this._renderPlayPauseButton() : null);
		    }, t.defaultProps = defaultProps_1.defaultProps, t;
		  }(react_1.default.PureComponent));
		exports.default = AliceCarousel;
	} (reactAliceCarousel));

	var AliceCarousel = /*@__PURE__*/getDefaultExportFromCjs(reactAliceCarousel);

	// Unique ID creation requires a high quality random # generator. In the browser we therefore
	// require the crypto API and do not support built-in fallback to lower quality random number
	// generators (like Math.random()).
	let getRandomValues;
	const rnds8 = new Uint8Array(16);
	function rng() {
	  // lazy load so that environments that need to polyfill have a chance to do so
	  if (!getRandomValues) {
	    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
	    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
	    if (!getRandomValues) {
	      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
	    }
	  }
	  return getRandomValues(rnds8);
	}

	var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

	function validate(uuid) {
	  return typeof uuid === 'string' && REGEX.test(uuid);
	}

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */

	const byteToHex = [];
	for (let i = 0; i < 256; ++i) {
	  byteToHex.push((i + 0x100).toString(16).slice(1));
	}
	function unsafeStringify(arr, offset = 0) {
	  // Note: Be careful editing this code!  It's been tuned for performance
	  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
	  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
	}

	function parse(uuid) {
	  if (!validate(uuid)) {
	    throw TypeError('Invalid UUID');
	  }
	  let v;
	  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

	  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
	  arr[1] = v >>> 16 & 0xff;
	  arr[2] = v >>> 8 & 0xff;
	  arr[3] = v & 0xff; // Parse ........-####-....-....-............

	  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
	  arr[5] = v & 0xff; // Parse ........-....-####-....-............

	  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
	  arr[7] = v & 0xff; // Parse ........-....-....-####-............

	  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
	  arr[9] = v & 0xff; // Parse ........-....-....-....-############
	  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

	  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
	  arr[11] = v / 0x100000000 & 0xff;
	  arr[12] = v >>> 24 & 0xff;
	  arr[13] = v >>> 16 & 0xff;
	  arr[14] = v >>> 8 & 0xff;
	  arr[15] = v & 0xff;
	  return arr;
	}

	function stringToBytes(str) {
	  str = unescape(encodeURIComponent(str)); // UTF8 escape

	  const bytes = [];
	  for (let i = 0; i < str.length; ++i) {
	    bytes.push(str.charCodeAt(i));
	  }
	  return bytes;
	}
	const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
	const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
	function v35(name, version, hashfunc) {
	  function generateUUID(value, namespace, buf, offset) {
	    var _namespace;
	    if (typeof value === 'string') {
	      value = stringToBytes(value);
	    }
	    if (typeof namespace === 'string') {
	      namespace = parse(namespace);
	    }
	    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
	      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
	    } // Compute hash of namespace and value, Per 4.3
	    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
	    // hashfunc([...namespace, ... value])`

	    let bytes = new Uint8Array(16 + value.length);
	    bytes.set(namespace);
	    bytes.set(value, namespace.length);
	    bytes = hashfunc(bytes);
	    bytes[6] = bytes[6] & 0x0f | version;
	    bytes[8] = bytes[8] & 0x3f | 0x80;
	    if (buf) {
	      offset = offset || 0;
	      for (let i = 0; i < 16; ++i) {
	        buf[offset + i] = bytes[i];
	      }
	      return buf;
	    }
	    return unsafeStringify(bytes);
	  } // Function#name is not settable on some platforms (#270)

	  try {
	    generateUUID.name = name; // eslint-disable-next-line no-empty
	  } catch (err) {} // For CommonJS default export support

	  generateUUID.DNS = DNS;
	  generateUUID.URL = URL;
	  return generateUUID;
	}

	/*
	 * Browser-compatible JavaScript MD5
	 *
	 * Modification of JavaScript MD5
	 * https://github.com/blueimp/JavaScript-MD5
	 *
	 * Copyright 2011, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * https://opensource.org/licenses/MIT
	 *
	 * Based on
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */
	function md5(bytes) {
	  if (typeof bytes === 'string') {
	    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

	    bytes = new Uint8Array(msg.length);
	    for (let i = 0; i < msg.length; ++i) {
	      bytes[i] = msg.charCodeAt(i);
	    }
	  }
	  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
	}
	/*
	 * Convert an array of little-endian words to an array of bytes
	 */

	function md5ToHexEncodedArray(input) {
	  const output = [];
	  const length32 = input.length * 32;
	  const hexTab = '0123456789abcdef';
	  for (let i = 0; i < length32; i += 8) {
	    const x = input[i >> 5] >>> i % 32 & 0xff;
	    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
	    output.push(hex);
	  }
	  return output;
	}
	/**
	 * Calculate output length with padding and bit length
	 */

	function getOutputLength(inputLength8) {
	  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
	}
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length.
	 */

	function wordsToMd5(x, len) {
	  /* append padding */
	  x[len >> 5] |= 0x80 << len % 32;
	  x[getOutputLength(len) - 1] = len;
	  let a = 1732584193;
	  let b = -271733879;
	  let c = -1732584194;
	  let d = 271733878;
	  for (let i = 0; i < x.length; i += 16) {
	    const olda = a;
	    const oldb = b;
	    const oldc = c;
	    const oldd = d;
	    a = md5ff(a, b, c, d, x[i], 7, -680876936);
	    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
	    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
	    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
	    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
	    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
	    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
	    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
	    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
	    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
	    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
	    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
	    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
	    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
	    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
	    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
	    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
	    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
	    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
	    b = md5gg(b, c, d, a, x[i], 20, -373897302);
	    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
	    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
	    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
	    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
	    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
	    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
	    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
	    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
	    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
	    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
	    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
	    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
	    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
	    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
	    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
	    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
	    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
	    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
	    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
	    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
	    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
	    d = md5hh(d, a, b, c, x[i], 11, -358537222);
	    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
	    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
	    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
	    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
	    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
	    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
	    a = md5ii(a, b, c, d, x[i], 6, -198630844);
	    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
	    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
	    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
	    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
	    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
	    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
	    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
	    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
	    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
	    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
	    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
	    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
	    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
	    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
	    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
	    a = safeAdd(a, olda);
	    b = safeAdd(b, oldb);
	    c = safeAdd(c, oldc);
	    d = safeAdd(d, oldd);
	  }
	  return [a, b, c, d];
	}
	/*
	 * Convert an array bytes to an array of little-endian words
	 * Characters >255 have their high-byte silently ignored.
	 */

	function bytesToWords(input) {
	  if (input.length === 0) {
	    return [];
	  }
	  const length8 = input.length * 8;
	  const output = new Uint32Array(getOutputLength(length8));
	  for (let i = 0; i < length8; i += 8) {
	    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
	  }
	  return output;
	}
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */

	function safeAdd(x, y) {
	  const lsw = (x & 0xffff) + (y & 0xffff);
	  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return msw << 16 | lsw & 0xffff;
	}
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */

	function bitRotateLeft(num, cnt) {
	  return num << cnt | num >>> 32 - cnt;
	}
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */

	function md5cmn(q, a, b, x, s, t) {
	  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
	}
	function md5ff(a, b, c, d, x, s, t) {
	  return md5cmn(b & c | ~b & d, a, b, x, s, t);
	}
	function md5gg(a, b, c, d, x, s, t) {
	  return md5cmn(b & d | c & ~d, a, b, x, s, t);
	}
	function md5hh(a, b, c, d, x, s, t) {
	  return md5cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5ii(a, b, c, d, x, s, t) {
	  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
	}

	v35('v3', 0x30, md5);

	const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
	var native = {
	  randomUUID
	};

	function v4(options, buf, offset) {
	  if (native.randomUUID && !buf && !options) {
	    return native.randomUUID();
	  }
	  options = options || {};
	  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

	  rnds[6] = rnds[6] & 0x0f | 0x40;
	  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

	  if (buf) {
	    offset = offset || 0;
	    for (let i = 0; i < 16; ++i) {
	      buf[offset + i] = rnds[i];
	    }
	    return buf;
	  }
	  return unsafeStringify(rnds);
	}

	// Adapted from Chris Veness' SHA1 code at
	// http://www.movable-type.co.uk/scripts/sha1.html
	function f(s, x, y, z) {
	  switch (s) {
	    case 0:
	      return x & y ^ ~x & z;
	    case 1:
	      return x ^ y ^ z;
	    case 2:
	      return x & y ^ x & z ^ y & z;
	    case 3:
	      return x ^ y ^ z;
	  }
	}
	function ROTL(x, n) {
	  return x << n | x >>> 32 - n;
	}
	function sha1(bytes) {
	  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
	  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
	  if (typeof bytes === 'string') {
	    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

	    bytes = [];
	    for (let i = 0; i < msg.length; ++i) {
	      bytes.push(msg.charCodeAt(i));
	    }
	  } else if (!Array.isArray(bytes)) {
	    // Convert Array-like to Array
	    bytes = Array.prototype.slice.call(bytes);
	  }
	  bytes.push(0x80);
	  const l = bytes.length / 4 + 2;
	  const N = Math.ceil(l / 16);
	  const M = new Array(N);
	  for (let i = 0; i < N; ++i) {
	    const arr = new Uint32Array(16);
	    for (let j = 0; j < 16; ++j) {
	      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
	    }
	    M[i] = arr;
	  }
	  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
	  M[N - 1][14] = Math.floor(M[N - 1][14]);
	  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
	  for (let i = 0; i < N; ++i) {
	    const W = new Uint32Array(80);
	    for (let t = 0; t < 16; ++t) {
	      W[t] = M[i][t];
	    }
	    for (let t = 16; t < 80; ++t) {
	      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
	    }
	    let a = H[0];
	    let b = H[1];
	    let c = H[2];
	    let d = H[3];
	    let e = H[4];
	    for (let t = 0; t < 80; ++t) {
	      const s = Math.floor(t / 20);
	      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
	      e = d;
	      d = c;
	      c = ROTL(b, 30) >>> 0;
	      b = a;
	      a = T;
	    }
	    H[0] = H[0] + a >>> 0;
	    H[1] = H[1] + b >>> 0;
	    H[2] = H[2] + c >>> 0;
	    H[3] = H[3] + d >>> 0;
	    H[4] = H[4] + e >>> 0;
	  }
	  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
	}

	v35('v5', 0x50, sha1);

	/*
	 default undefined - The key is the breakpoint
	 (default is the result of: () => window.innerWidth or innerWidth property if the last presented).
	*/
	const defaultResponsive = {
	  0: {
	    items: 1
	  },
	  620: {
	    items: 2
	  },
	  1024: {
	    items: 3
	  },
	  1200: {
	    items: 4
	  },
	  1700: {
	    items: 5
	  },
	  2250: {
	    items: 6
	  }
	};

	/*
	 rebuilt responsive object depending on the container width
	 using the ratio of the width of the box to the width of the window
	*/
	const getNewResponsiveValues = rate => {
	  let newResponsive = {};
	  let keys = Object.keys(defaultResponsive);
	  keys.forEach(key => {
	    let newValue = Math.round(defaultResponsive[key].items / rate);
	    newResponsive[key] = {
	      items: Math.max(newValue, 1)
	    };
	  });
	  return newResponsive;
	};
	const statusList = {
	  reset: "reset",
	  goLast: "goLast",
	  next: "next",
	  prev: "prev"
	};
	const classesAction = {
	  add: "add",
	  remove: "remove"
	};
	const commonClasses = {
	  multi_container: 'multi-carousel__container',
	  multi_empty_container: 'multi-carousel__empty-container',
	  item: "multi-carousel__item",
	  active: "multi-carousel__active",
	  no_dots: 'multi-carousel__no-dots'
	};
	const normalCarouselClasses = {
	  normal_container: 'normal-carousel__container',
	  normal_item: 'normal-carousel__item'
	};
	const activeClickClasses = {
	  active_click_container: 'active-click-carousel__container',
	  active_click_item: 'active-click-carousel__item',
	  active_click_with_btn: 'active-click-carousel__with-btn'
	};
	const activeSlideClasses = {
	  active_slide_container: 'active-slide-carousel__container',
	  active_slide_wrapper: 'active-slide-carousel__wrapper',
	  first_item: "active-slide-carousel__first-item",
	  last_item: "active-slide-carousel__last-item",
	  prev_btn: "active-slide-carousel__prev-btn",
	  next_btn: "active-slide-carousel__next-btn"
	};

	function NormalCarousel(props) {
	  const carouselParent = react.useRef();
	  const [carousel_items, set_carousel_items] = react.useState([]);
	  const [responsive, setResponsive] = react.useState({
	    ...defaultResponsive
	  });
	  const [uniqueClass, setUniqueClass] = react.useState("");

	  /*
	      this method built to handle if the carousel has been rendered inside a container
	      that is not covering the window's full width
	  */
	  const setNewResponsive = () => {
	    let rate = window.innerWidth / carouselParent.current.clientWidth;
	    if (rate > 1.35) {
	      let newResponsive = getNewResponsiveValues(rate);
	      setResponsive({
	        ...newResponsive
	      });
	    } else {
	      setResponsive({
	        ...defaultResponsive
	      });
	    }
	  };
	  const addOrRemoveClassName = (node, action) => {
	    if (action === classesAction.remove) {
	      node.classList.remove(commonClasses.active);
	    } else {
	      node.classList.add(commonClasses.active);
	    }
	  };

	  /*
	      in case of "infinite" carousel the node will be node list "Array"
	      because the carousel create a copy of all the items
	      that why we need change the active class on both nodes - the carousel render both -
	  */
	  const changeActiveClass = (node, action) => {
	    if (node?.length) {
	      node.forEach(item => {
	        addOrRemoveClassName(item, action);
	      });
	    } else if (node) {
	      addOrRemoveClassName(node, action);
	    }
	  };

	  /*
	      idx-"" is the common unique class between original item and the cloned one
	  */
	  const getIdxClassName = e => {
	    let clickedItem = e.target;

	    // in case of clicking element inside the item we need the main div with "idx-" class name
	    while (clickedItem) {
	      if (clickedItem.classList.contains(commonClasses.item)) break;
	      clickedItem = clickedItem.parentNode;
	    }
	    let classNames = clickedItem.className.split(' ');
	    return classNames?.filter(item => item.includes('idx'))?.[0];
	  };
	  const onCardClicked = (e, action) => {
	    if (action?.canExecute) action.execute();

	    // remove active class from original and cloned item
	    let activeNode = document.querySelector(`.${uniqueClass}`)?.querySelectorAll(`.${commonClasses.active}`);
	    changeActiveClass(activeNode, classesAction.remove);
	    let idxClass = getIdxClassName(e);

	    // add active class for both original and cloned item
	    let itemToSetActive = document.querySelector(`.${uniqueClass}`)?.querySelectorAll(`.${idxClass}`);
	    changeActiveClass(itemToSetActive, classesAction.add);
	  };

	  /*
	    set the active item after the carousel has already been initialized
	  */
	  const onInitialized = () => {
	    if (props.carouselType === 'active') {
	      let itemToSetActive = document.querySelector(`.${uniqueClass}`)?.querySelectorAll('.idx-0');
	      changeActiveClass(itemToSetActive, classesAction.add);
	    }
	  };
	  react.useEffect(() => {
	    // set a unique class in case of using two different carousel instances in the same document
	    setUniqueClass("a-" + v4());
	    if (!carouselParent.current) return;

	    // handle resize window or carousel container
	    const resizeObserver = new ResizeObserver(() => {
	      setNewResponsive();
	    });
	    resizeObserver.observe(carouselParent.current);
	    return () => resizeObserver.disconnect();
	  }, []);
	  react.useEffect(() => {
	    if (props.data?.status === "available" && !carousel_items?.length) {
	      set_carousel_items(props.data.items.map((item, i) => react.createElement("div", {
	        key: i,
	        onClick: props.carouselType === 'active' ? e => onCardClicked(e, props.action?.get(item)) : undefined,
	        className: `${commonClasses.item} idx-${i} ${props.carouselType === 'active' ? activeClickClasses.active_click_clickable_item : normalCarouselClasses.normal_item}`
	      }, props.content.get(item))));
	    }
	  }, [props.data]);
	  return react.createElement("div", {
	    className: [commonClasses.multi_container, uniqueClass, props.carouselType === 'active' ? activeClickClasses.active_click_container : normalCarouselClasses.normal_container, props.disableDotsControls ? commonClasses.no_dots : "", !props.disableButtonsControls && props.carouselType === 'active' ? activeClickClasses.active_click_with_btn : ""].join(" "),
	    ref: carouselParent
	  }, carousel_items?.length ? react.createElement(AliceCarousel, {
	    items: carousel_items,
	    responsive: responsive,
	    infinite: props.infinite,
	    autoPlay: props.autoPlay,
	    autoPlayDirection: props.autoPlayDirection,
	    autoPlayControls: props.autoPlayControls,
	    disableButtonsControls: props.disableButtonsControls,
	    disableDotsControls: props.disableDotsControls,
	    animationDuration: props.animationDuration,
	    animationType: props.animationType,
	    keyboardNavigation: props.keyboardNavigation,
	    mouseTracking: props.mouseTracking,
	    touchTracking: props.touchTracking,
	    onInitialized: onInitialized
	  }) : react.createElement("div", {
	    className: commonClasses.multi_empty_container
	  }));
	}

	function ActiveSlideCarousel(props) {
	  const sliderContainer = react.useRef();
	  const [carousel_items, set_carousel_items] = react.useState([]);
	  const [responsive, setResponsive] = react.useState(null);
	  const [uniqueClass, setUniqueClass] = react.useState("");
	  const [currentActiveIdx, setCurrentActiveIdx] = react.useState(0);
	  const [numberOfDisplayedItems, setNumberOfDisplayedItems] = react.useState(0);
	  const [numberOfAllItems, setNumberOfAllItems] = react.useState(0);

	  // get the 'react-alice-carousel' built-in all method and properties
	  const [carouselProperties, setCarouselProperties] = react.useState(null);

	  /*
	      this method built to handle if the carousel has been rendered inside a container
	      that is not covering the window's full width
	  */
	  const setNewResponsive = () => {
	    let rate = window.innerWidth / sliderContainer?.current?.clientWidth;
	    if (rate > 1.4) {
	      let newResponsive = getNewResponsiveValues(rate);
	      setResponsive({
	        ...newResponsive
	      });
	    } else {
	      setResponsive({
	        ...defaultResponsive
	      });
	    }
	  };

	  /*
	      Fired when reach the end of the slider or when resize the carousel
	      => move to the first item
	  */
	  const resetSlider = () => {
	    setCurrentActiveIdx(0);
	    setActiveClass(statusList.reset, null, 0);
	  };

	  /*
	     Fired when ge back when step from the first item
	     => move to the last item
	  */
	  const slideToTheEnd = () => {
	    carouselProperties?.slideTo(numberOfAllItems - numberOfDisplayedItems + 1);
	    setActiveClass(statusList.goLast, null, numberOfAllItems);
	    setCurrentActiveIdx(numberOfAllItems);
	  };

	  /*
	      Fired when clicking "previous" button
	  */
	  const prevClicked = () => {
	    if (!currentActiveIdx) {
	      // currentActiveIdx === 0, the active item is the first one, move to the last
	      slideToTheEnd();
	    } else {
	      setActiveClass(statusList.prev, carouselProperties?.slidePrev, currentActiveIdx - 1);
	      setCurrentActiveIdx(currentActiveIdx - 1);
	    }
	  };

	  /*
	      Fired when clicking "Next" button
	  */
	  const nextClicked = () => {
	    if (currentActiveIdx === numberOfAllItems) {
	      // the active item is the last one, move to the first
	      carouselProperties?.slideTo(0);
	      resetSlider();
	    } else {
	      setActiveClass(statusList.next, carouselProperties?.slideNext, currentActiveIdx + 1);
	      setCurrentActiveIdx(currentActiveIdx + 1);
	    }
	  };

	  /*
	      Remove previous active item and get the index of the item that we want to set it active
	  */
	  const removeActiveClass = (status, allItems) => {
	    let itemIdxToSetActive = 0;
	    for (let i = 0; i < allItems?.length; i++) {
	      // get the index of the item that we want to set it active in the "all items" array
	      // NOTE: we can't use the state "currentActiveIdx" because "allItems" is containing the cloned item also
	      if (allItems[i].classList?.contains(commonClasses.active) && !allItems[i]?.parentElement?.classList?.contains("__cloned")) {
	        // if next pressed will be the next index, if previous pressed will be the previous index 
	        itemIdxToSetActive = status === statusList.next ? i + 1 : i - 1;
	      }
	      allItems[i].classList?.remove(commonClasses.active);
	    }
	    return itemIdxToSetActive;
	  };

	  /*
	      setting the curren active class, and slide left or right when needed
	  */
	  const setActiveClass = (status, slideLeftOrRight, actionIdx) => {
	    let allItems = document.querySelector(`.${uniqueClass}`)?.querySelectorAll(`.${commonClasses.item}`);
	    let itemIdxToSetActive = removeActiveClass(status, allItems);

	    // Set current active item
	    if (status === statusList.reset) {
	      // querySelectorAll ==> the original item and the cloned one
	      // in this case the first one is the original -"react-alice-carouse" way of work-
	      let firstSlide = document.querySelector(`.${uniqueClass}`)?.querySelectorAll(`.${activeSlideClasses.first_item}`);
	      firstSlide[0]?.classList?.add(commonClasses.active);
	    } else if (status === statusList.goLast) {
	      // querySelectorAll ==> the original item and the cloned one
	      // in this case the second one is the original -"react-alice-carouse" way of work-
	      let lastSlide = document.querySelector(`.${uniqueClass}`)?.querySelectorAll(`.${activeSlideClasses.last_item}`);
	      lastSlide[1]?.classList?.add(commonClasses.active);
	    } else {
	      // not containing active means that the next/prev item is not appearing in the screen right now
	      // slide when reach to the start/end of the active item
	      if (!allItems[itemIdxToSetActive]?.parentElement?.classList?.contains("__active")) {
	        slideLeftOrRight();
	      }
	      allItems[itemIdxToSetActive]?.classList?.add(commonClasses.active);
	    }
	    // fire the action that related to the new active item
	    let actionToFire = props.action?.get(props.data.items?.[actionIdx]);
	    onSlideClicked(actionToFire);
	  };

	  /*
	      fired when initialization the carousel
	  */
	  const onCarouselInit = e => {
	    setNumberOfDisplayedItems(e.itemsInSlide);
	    setResponsive({
	      ...responsive
	    });
	  };

	  /*
	      fired when resizing the carousel, carousel will always slide to the first item when resizing -"react-alice-carouse" way of work-
	  */
	  const onCarouselResize = e => {
	    setNumberOfDisplayedItems(e.itemsInSlide);
	    setNewResponsive();
	    resetSlider();
	  };

	  /*
	      fired the current active item action if found
	  */
	  const onSlideClicked = action => {
	    if (action?.canExecute) action.execute();
	  };
	  react.useEffect(() => {
	    if (props.data?.status === "available" && !carousel_items?.length) {
	      let newData = props.data.items.map((item, idx) => react.createElement("div", {
	        key: idx,
	        className: `${commonClasses.item} ${idx === 0 ? activeSlideClasses.first_item + " " + commonClasses.active : ""} ${idx === props.data.items.length - 1 ? activeSlideClasses.last_item : ""}`
	      }, props.content.get(item)));
	      setNumberOfAllItems(newData.length - 1);
	      set_carousel_items(newData);
	    }
	  }, [props.data]);
	  react.useEffect(() => {
	    // set a unique class in case of using two different carousel instances in the same document
	    setUniqueClass("a-" + v4());
	  }, []);

	  /*
	      set the responsive object after initialize the container so it take the correct dimensions
	  */
	  const carouselContainer = react.useCallback(node => {
	    if (node) setNewResponsive();
	  }, []);
	  return carousel_items?.length ? react.createElement("div", {
	    className: activeSlideClasses.active_slide_container,
	    ref: carouselContainer
	  }, react.createElement("button", {
	    className: activeSlideClasses.prev_btn,
	    onClick: prevClicked
	  }), react.createElement("div", {
	    className: [uniqueClass, activeSlideClasses.active_slide_wrapper].join(" "),
	    ref: sliderContainer
	  }, responsive && react.createElement(AliceCarousel
	  // get the 'react-alice-carousel' all method and properties so we can override default next and previous buttons behavior
	  , {
	    ref: el => setCarouselProperties(el),
	    items: carousel_items,
	    responsive: responsive,
	    infinite: true,
	    autoPlay: false,
	    disableButtonsControls: true,
	    disableDotsControls: true

	    // increasing the animation Duration more than 100 will crash the sliding in the carousel
	    ,
	    animationDuration: 100,
	    keyboardNavigation: false,
	    mouseTracking: false,
	    touchTracking: false,
	    onInitialized: onCarouselInit,
	    onResized: onCarouselResize
	  })), react.createElement("button", {
	    className: activeSlideClasses.next_btn,
	    onClick: nextClicked
	  })) : react.createElement("div", {
	    className: commonClasses.multi_empty_container
	  });
	}

	function MultiCarousel(props) {
	  return (props.carouselType === 'normal' || props.carouselType === 'active') && react.createElement(NormalCarousel, {
	    carouselType: props.carouselType,
	    data: props.data,
	    action: props.action,
	    content: props.content,
	    infinite: props.infinite,
	    autoPlay: props.autoPlay,
	    autoPlayDirection: props.autoPlayDirection,
	    autoPlayControls: props.autoPlayControls,
	    disableButtonsControls: props.disableButtonsControls,
	    disableDotsControls: props.disableDotsControls,
	    animationDuration: props.animationDuration,
	    animationType: props.animationType,
	    keyboardNavigation: props.keyboardNavigation,
	    mouseTracking: props.mouseTracking,
	    touchTracking: props.touchTracking
	  }) || props.carouselType === 'slide' && react.createElement(ActiveSlideCarousel, {
	    data: props.data,
	    action: props.action,
	    content: props.content
	  }) || react.createElement("div", null, "Error");
	}

	exports.MultiCarousel = MultiCarousel;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlDYXJvdXNlbC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtc3dpcGUvbGliL3R5cGVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtc3dpcGUvbGliL3V0aWxzL2NhbGN1bGF0ZURpcmVjdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92YW5pbGxhLXN3aXBlL2xpYi91dGlscy9jb21tb24uanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvY2FsY3VsYXRlRGlyZWN0aW9uRGVsdGEuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvY2FsY3VsYXRlRHVyYXRpb24uanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvY2FsY3VsYXRlTW92aW5nUG9zaXRpb24uanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvdXBkYXRlVHJhY2UuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtc3dpcGUvbGliL3V0aWxzL3Jlc29sdmVEaXJlY3Rpb24uanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvY2FsY3VsYXRlVmVsb2NpdHkuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvY2FsY3VsYXRlUG9zaXRpb24uanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvY2hlY2tJc01vcmVUaGFuU2luZ2xlVG91Y2hlcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92YW5pbGxhLXN3aXBlL2xpYi91dGlscy9jcmVhdGVPcHRpb25zLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtc3dpcGUvbGliL3V0aWxzL2NoZWNrSXNQYXNzaXZlU3VwcG9ydGVkLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtc3dpcGUvbGliL3V0aWxzL2NoZWNrSXNUb3VjaEV2ZW50c1N1cHBvcnRlZC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92YW5pbGxhLXN3aXBlL2xpYi91dGlscy9nZXRJbml0aWFsU3RhdGUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvZ2V0SW5pdGlhbFByb3BzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtc3dpcGUvbGliL3V0aWxzL2dldE9wdGlvbnMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFuaWxsYS1zd2lwZS9saWIvdXRpbHMvcm90YXRlQnlBbmdsZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92YW5pbGxhLXN3aXBlL2xpYi91dGlscy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92YW5pbGxhLXN3aXBlL2xpYi9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdHlwZXMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtYWxpY2UtY2Fyb3VzZWwvbGliL2RlZmF1bHRQcm9wcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdXRpbHMvbWFwcGVycy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdXRpbHMvbWF0aC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdXRpbHMvZWxlbWVudHMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtYWxpY2UtY2Fyb3VzZWwvbGliL3V0aWxzL2NvbW1vbi5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdXRpbHMvY2xhc3NuYW1lcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdXRpbHMvdGltZXJzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWFsaWNlLWNhcm91c2VsL2xpYi91dGlscy9kZWJ1Zy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdXRpbHMvcmVuZGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWFsaWNlLWNhcm91c2VsL2xpYi91dGlscy9jb250cm9scy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdXRpbHMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtYWxpY2UtY2Fyb3VzZWwvbGliL3ZpZXdzL1NsaWRlSW5mby5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdmlld3MvU3RhZ2VJdGVtLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWFsaWNlLWNhcm91c2VsL2xpYi92aWV3cy9Eb3RzTmF2aWdhdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdmlld3MvUGxheVBhdXNlQnV0dG9uLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWFsaWNlLWNhcm91c2VsL2xpYi92aWV3cy9QcmV2TmV4dEJ1dHRvbi5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1hbGljZS1jYXJvdXNlbC9saWIvdmlld3MvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtYWxpY2UtY2Fyb3VzZWwvbGliL3JlYWN0LWFsaWNlLWNhcm91c2VsLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9wYXJzZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjM1LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9tZDUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zaGExLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NS5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2hlbHBlci5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL05vcm1hbENhcm91c2VsLmpzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FjdGl2ZVNsaWRlQ2Fyb3VzZWwuanN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL011bHRpQ2Fyb3VzZWwuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5UcmFjZURpcmVjdGlvbktleSA9IGV4cG9ydHMuRGlyZWN0aW9uID0gZXhwb3J0cy5BeGlzID0gdm9pZCAwO1xudmFyIFRyYWNlRGlyZWN0aW9uS2V5O1xuZXhwb3J0cy5UcmFjZURpcmVjdGlvbktleSA9IFRyYWNlRGlyZWN0aW9uS2V5O1xuXG4oZnVuY3Rpb24gKFRyYWNlRGlyZWN0aW9uS2V5KSB7XG4gIFRyYWNlRGlyZWN0aW9uS2V5W1wiTkVHQVRJVkVcIl0gPSBcIk5FR0FUSVZFXCI7XG4gIFRyYWNlRGlyZWN0aW9uS2V5W1wiUE9TSVRJVkVcIl0gPSBcIlBPU0lUSVZFXCI7XG4gIFRyYWNlRGlyZWN0aW9uS2V5W1wiTk9ORVwiXSA9IFwiTk9ORVwiO1xufSkoVHJhY2VEaXJlY3Rpb25LZXkgfHwgKGV4cG9ydHMuVHJhY2VEaXJlY3Rpb25LZXkgPSBUcmFjZURpcmVjdGlvbktleSA9IHt9KSk7XG5cbnZhciBEaXJlY3Rpb247XG5leHBvcnRzLkRpcmVjdGlvbiA9IERpcmVjdGlvbjtcblxuKGZ1bmN0aW9uIChEaXJlY3Rpb24pIHtcbiAgRGlyZWN0aW9uW1wiVE9QXCJdID0gXCJUT1BcIjtcbiAgRGlyZWN0aW9uW1wiTEVGVFwiXSA9IFwiTEVGVFwiO1xuICBEaXJlY3Rpb25bXCJSSUdIVFwiXSA9IFwiUklHSFRcIjtcbiAgRGlyZWN0aW9uW1wiQk9UVE9NXCJdID0gXCJCT1RUT01cIjtcbiAgRGlyZWN0aW9uW1wiTk9ORVwiXSA9IFwiTk9ORVwiO1xufSkoRGlyZWN0aW9uIHx8IChleHBvcnRzLkRpcmVjdGlvbiA9IERpcmVjdGlvbiA9IHt9KSk7XG5cbnZhciBBeGlzO1xuZXhwb3J0cy5BeGlzID0gQXhpcztcblxuKGZ1bmN0aW9uIChBeGlzKSB7XG4gIEF4aXNbXCJYXCJdID0gXCJ4XCI7XG4gIEF4aXNbXCJZXCJdID0gXCJ5XCI7XG59KShBeGlzIHx8IChleHBvcnRzLkF4aXMgPSBBeGlzID0ge30pKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2FsY3VsYXRlRGlyZWN0aW9uID0gY2FsY3VsYXRlRGlyZWN0aW9uO1xuXG52YXIgX3R5cGVzID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVEaXJlY3Rpb24odHJhY2UpIHtcbiAgdmFyIGRpcmVjdGlvbjtcbiAgdmFyIG5lZ2F0aXZlID0gX3R5cGVzLlRyYWNlRGlyZWN0aW9uS2V5Lk5FR0FUSVZFO1xuICB2YXIgcG9zaXRpdmUgPSBfdHlwZXMuVHJhY2VEaXJlY3Rpb25LZXkuUE9TSVRJVkU7XG4gIHZhciBjdXJyZW50ID0gdHJhY2VbdHJhY2UubGVuZ3RoIC0gMV07XG4gIHZhciBwcmV2aW91cyA9IHRyYWNlW3RyYWNlLmxlbmd0aCAtIDJdIHx8IDA7XG5cbiAgaWYgKHRyYWNlLmV2ZXJ5KGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGkgPT09IDA7XG4gIH0pKSB7XG4gICAgcmV0dXJuIF90eXBlcy5UcmFjZURpcmVjdGlvbktleS5OT05FO1xuICB9XG5cbiAgZGlyZWN0aW9uID0gY3VycmVudCA+IHByZXZpb3VzID8gcG9zaXRpdmUgOiBuZWdhdGl2ZTtcblxuICBpZiAoY3VycmVudCA9PT0gMCkge1xuICAgIGRpcmVjdGlvbiA9IHByZXZpb3VzIDwgMCA/IHBvc2l0aXZlIDogbmVnYXRpdmU7XG4gIH1cblxuICByZXR1cm4gZGlyZWN0aW9uO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZXNvbHZlQXhpc0RpcmVjdGlvbiA9IGV4cG9ydHMuZ2V0RGlyZWN0aW9uVmFsdWUgPSBleHBvcnRzLmdldERpcmVjdGlvbktleSA9IGV4cG9ydHMuZ2V0RGlmZmVyZW5jZSA9IHZvaWQgMDtcblxudmFyIF90eXBlcyA9IHJlcXVpcmUoXCIuLi90eXBlc1wiKTtcblxudmFyIGdldERpcmVjdGlvbktleSA9IGZ1bmN0aW9uIGdldERpcmVjdGlvbktleSgpIHtcbiAgdmFyIG9iamVjdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gIHZhciBrZXkgPSBPYmplY3Qua2V5cyhvYmplY3QpLnRvU3RyaW5nKCk7XG5cbiAgc3dpdGNoIChrZXkpIHtcbiAgICBjYXNlIF90eXBlcy5UcmFjZURpcmVjdGlvbktleS5QT1NJVElWRTpcbiAgICAgIHJldHVybiBfdHlwZXMuVHJhY2VEaXJlY3Rpb25LZXkuUE9TSVRJVkU7XG5cbiAgICBjYXNlIF90eXBlcy5UcmFjZURpcmVjdGlvbktleS5ORUdBVElWRTpcbiAgICAgIHJldHVybiBfdHlwZXMuVHJhY2VEaXJlY3Rpb25LZXkuTkVHQVRJVkU7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIF90eXBlcy5UcmFjZURpcmVjdGlvbktleS5OT05FO1xuICB9XG59O1xuXG5leHBvcnRzLmdldERpcmVjdGlvbktleSA9IGdldERpcmVjdGlvbktleTtcblxudmFyIGdldERpcmVjdGlvblZhbHVlID0gZnVuY3Rpb24gZ2V0RGlyZWN0aW9uVmFsdWUoKSB7XG4gIHZhciB2YWx1ZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXSB8fCAwO1xufTtcblxuZXhwb3J0cy5nZXREaXJlY3Rpb25WYWx1ZSA9IGdldERpcmVjdGlvblZhbHVlO1xuXG52YXIgZ2V0RGlmZmVyZW5jZSA9IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoKSB7XG4gIHZhciB4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAwO1xuICB2YXIgeSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgcmV0dXJuIE1hdGguYWJzKHggLSB5KTtcbn07XG5cbmV4cG9ydHMuZ2V0RGlmZmVyZW5jZSA9IGdldERpZmZlcmVuY2U7XG5cbnZhciByZXNvbHZlQXhpc0RpcmVjdGlvbiA9IGZ1bmN0aW9uIHJlc29sdmVBeGlzRGlyZWN0aW9uKGF4aXMsIGtleSkge1xuICB2YXIgbmVnYXRpdmUgPSBfdHlwZXMuRGlyZWN0aW9uLkxFRlQ7XG4gIHZhciBwb3NpdGl2ZSA9IF90eXBlcy5EaXJlY3Rpb24uUklHSFQ7XG4gIHZhciBkaXJlY3Rpb24gPSBfdHlwZXMuRGlyZWN0aW9uLk5PTkU7XG5cbiAgaWYgKGF4aXMgPT09IF90eXBlcy5BeGlzLlkpIHtcbiAgICBuZWdhdGl2ZSA9IF90eXBlcy5EaXJlY3Rpb24uQk9UVE9NO1xuICAgIHBvc2l0aXZlID0gX3R5cGVzLkRpcmVjdGlvbi5UT1A7XG4gIH1cblxuICBpZiAoa2V5ID09PSBfdHlwZXMuVHJhY2VEaXJlY3Rpb25LZXkuTkVHQVRJVkUpIHtcbiAgICBkaXJlY3Rpb24gPSBuZWdhdGl2ZTtcbiAgfVxuXG4gIGlmIChrZXkgPT09IF90eXBlcy5UcmFjZURpcmVjdGlvbktleS5QT1NJVElWRSkge1xuICAgIGRpcmVjdGlvbiA9IHBvc2l0aXZlO1xuICB9XG5cbiAgcmV0dXJuIGRpcmVjdGlvbjtcbn07XG5cbmV4cG9ydHMucmVzb2x2ZUF4aXNEaXJlY3Rpb24gPSByZXNvbHZlQXhpc0RpcmVjdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2FsY3VsYXRlRGlyZWN0aW9uRGVsdGEgPSBjYWxjdWxhdGVEaXJlY3Rpb25EZWx0YTtcblxudmFyIF90eXBlcyA9IHJlcXVpcmUoXCIuLi90eXBlc1wiKTtcblxudmFyIF9jb21tb24gPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZURpcmVjdGlvbkRlbHRhKHRyYWNlRGlyZWN0aW9ucykge1xuICB2YXIgZGVsdGEgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIHZhciBsZW5ndGggPSB0cmFjZURpcmVjdGlvbnMubGVuZ3RoO1xuICB2YXIgaSA9IGxlbmd0aCAtIDE7XG4gIHZhciBkaXJlY3Rpb24gPSBfdHlwZXMuVHJhY2VEaXJlY3Rpb25LZXkuTk9ORTtcblxuICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgY3VycmVudCA9IHRyYWNlRGlyZWN0aW9uc1tpXTtcbiAgICB2YXIgY3VycmVudEtleSA9ICgwLCBfY29tbW9uLmdldERpcmVjdGlvbktleSkoY3VycmVudCk7XG4gICAgdmFyIGN1cnJlbnRWYWx1ZSA9ICgwLCBfY29tbW9uLmdldERpcmVjdGlvblZhbHVlKShjdXJyZW50W2N1cnJlbnRLZXldKTtcbiAgICB2YXIgcHJldiA9IHRyYWNlRGlyZWN0aW9uc1tpIC0gMV0gfHwge307XG4gICAgdmFyIHByZXZLZXkgPSAoMCwgX2NvbW1vbi5nZXREaXJlY3Rpb25LZXkpKHByZXYpO1xuICAgIHZhciBwcmV2VmFsdWUgPSAoMCwgX2NvbW1vbi5nZXREaXJlY3Rpb25WYWx1ZSkocHJldltwcmV2S2V5XSk7XG4gICAgdmFyIGRpZmZlcmVuY2UgPSAoMCwgX2NvbW1vbi5nZXREaWZmZXJlbmNlKShjdXJyZW50VmFsdWUsIHByZXZWYWx1ZSk7XG5cbiAgICBpZiAoZGlmZmVyZW5jZSA+PSBkZWx0YSkge1xuICAgICAgZGlyZWN0aW9uID0gY3VycmVudEtleTtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb24gPSBwcmV2S2V5O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkaXJlY3Rpb247XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNhbGN1bGF0ZUR1cmF0aW9uID0gY2FsY3VsYXRlRHVyYXRpb247XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUR1cmF0aW9uKCkge1xuICB2YXIgcHJldlRpbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDA7XG4gIHZhciBuZXh0VGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgcmV0dXJuIHByZXZUaW1lID8gbmV4dFRpbWUgLSBwcmV2VGltZSA6IDA7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNhbGN1bGF0ZU1vdmluZ1Bvc2l0aW9uID0gY2FsY3VsYXRlTW92aW5nUG9zaXRpb247XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZU1vdmluZ1Bvc2l0aW9uKGUpIHtcbiAgaWYgKCdjaGFuZ2VkVG91Y2hlcycgaW4gZSkge1xuICAgIHZhciB0b3VjaGVzID0gZS5jaGFuZ2VkVG91Y2hlcyAmJiBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0b3VjaGVzICYmIHRvdWNoZXMuY2xpZW50WCxcbiAgICAgIHk6IHRvdWNoZXMgJiYgdG91Y2hlcy5jbGllbnRZXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZS5jbGllbnRYLFxuICAgIHk6IGUuY2xpZW50WVxuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy51cGRhdGVUcmFjZSA9IHVwZGF0ZVRyYWNlO1xuXG5mdW5jdGlvbiB1cGRhdGVUcmFjZSh0cmFjZSwgdmFsdWUpIHtcbiAgdmFyIGxhc3QgPSB0cmFjZVt0cmFjZS5sZW5ndGggLSAxXTtcblxuICBpZiAobGFzdCAhPT0gdmFsdWUpIHtcbiAgICB0cmFjZS5wdXNoKHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiB0cmFjZTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zID0gY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zO1xuXG52YXIgX3R5cGVzID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVUcmFjZURpcmVjdGlvbnMoKSB7XG4gIHZhciB0cmFjZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gIHZhciB0aWNrcyA9IFtdO1xuICB2YXIgcG9zaXRpdmUgPSBfdHlwZXMuVHJhY2VEaXJlY3Rpb25LZXkuUE9TSVRJVkU7XG4gIHZhciBuZWdhdGl2ZSA9IF90eXBlcy5UcmFjZURpcmVjdGlvbktleS5ORUdBVElWRTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgdGljayA9IFtdO1xuICB2YXIgZGlyZWN0aW9uID0gX3R5cGVzLlRyYWNlRGlyZWN0aW9uS2V5Lk5PTkU7XG5cbiAgZm9yICg7IGkgPCB0cmFjZS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjdXJyZW50ID0gdHJhY2VbaV07XG4gICAgdmFyIHByZXYgPSB0cmFjZVtpIC0gMV07XG5cbiAgICBpZiAodGljay5sZW5ndGgpIHtcbiAgICAgIHZhciBjdXJyZW50RGlyZWN0aW9uID0gY3VycmVudCA+IHByZXYgPyBwb3NpdGl2ZSA6IG5lZ2F0aXZlO1xuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBfdHlwZXMuVHJhY2VEaXJlY3Rpb25LZXkuTk9ORSkge1xuICAgICAgICBkaXJlY3Rpb24gPSBjdXJyZW50RGlyZWN0aW9uO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudERpcmVjdGlvbiA9PT0gZGlyZWN0aW9uKSB7XG4gICAgICAgIHRpY2sucHVzaChjdXJyZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpY2tzLnB1c2goX2RlZmluZVByb3BlcnR5KHt9LCBkaXJlY3Rpb24sIHRpY2suc2xpY2UoKSkpO1xuICAgICAgICB0aWNrID0gW107XG4gICAgICAgIHRpY2sucHVzaChjdXJyZW50KTtcbiAgICAgICAgZGlyZWN0aW9uID0gY3VycmVudERpcmVjdGlvbjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGN1cnJlbnQgIT09IDApIHtcbiAgICAgICAgZGlyZWN0aW9uID0gY3VycmVudCA+IDAgPyBwb3NpdGl2ZSA6IG5lZ2F0aXZlO1xuICAgICAgfVxuXG4gICAgICB0aWNrLnB1c2goY3VycmVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRpY2subGVuZ3RoKSB7XG4gICAgdGlja3MucHVzaChfZGVmaW5lUHJvcGVydHkoe30sIGRpcmVjdGlvbiwgdGljaykpO1xuICB9XG5cbiAgcmV0dXJuIHRpY2tzO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZXNvbHZlRGlyZWN0aW9uID0gcmVzb2x2ZURpcmVjdGlvbjtcblxudmFyIF9jYWxjdWxhdGVEaXJlY3Rpb24gPSByZXF1aXJlKFwiLi9jYWxjdWxhdGVEaXJlY3Rpb25cIik7XG5cbnZhciBfY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zID0gcmVxdWlyZShcIi4vY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zXCIpO1xuXG52YXIgX2NhbGN1bGF0ZURpcmVjdGlvbkRlbHRhID0gcmVxdWlyZShcIi4vY2FsY3VsYXRlRGlyZWN0aW9uRGVsdGFcIik7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX3R5cGVzID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xuXG5mdW5jdGlvbiByZXNvbHZlRGlyZWN0aW9uKHRyYWNlKSB7XG4gIHZhciBheGlzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBfdHlwZXMuQXhpcy5YO1xuICB2YXIgZGlyZWN0aW9uRGVsdGEgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDA7XG5cbiAgaWYgKGRpcmVjdGlvbkRlbHRhKSB7XG4gICAgdmFyIGRpcmVjdGlvbnMgPSAoMCwgX2NhbGN1bGF0ZVRyYWNlRGlyZWN0aW9ucy5jYWxjdWxhdGVUcmFjZURpcmVjdGlvbnMpKHRyYWNlKTtcblxuICAgIHZhciBfZGlyZWN0aW9uID0gKDAsIF9jYWxjdWxhdGVEaXJlY3Rpb25EZWx0YS5jYWxjdWxhdGVEaXJlY3Rpb25EZWx0YSkoZGlyZWN0aW9ucywgZGlyZWN0aW9uRGVsdGEpO1xuXG4gICAgcmV0dXJuICgwLCBfY29tbW9uLnJlc29sdmVBeGlzRGlyZWN0aW9uKShheGlzLCBfZGlyZWN0aW9uKTtcbiAgfVxuXG4gIHZhciBkaXJlY3Rpb24gPSAoMCwgX2NhbGN1bGF0ZURpcmVjdGlvbi5jYWxjdWxhdGVEaXJlY3Rpb24pKHRyYWNlKTtcbiAgcmV0dXJuICgwLCBfY29tbW9uLnJlc29sdmVBeGlzRGlyZWN0aW9uKShheGlzLCBkaXJlY3Rpb24pO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jYWxjdWxhdGVWZWxvY2l0eSA9IGNhbGN1bGF0ZVZlbG9jaXR5O1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVWZWxvY2l0eSh4LCB5LCB0aW1lKSB7XG4gIHZhciBtYWduaXR1ZGUgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gIHJldHVybiBtYWduaXR1ZGUgLyAodGltZSB8fCAxKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2FsY3VsYXRlUG9zaXRpb24gPSBjYWxjdWxhdGVQb3NpdGlvbjtcblxudmFyIF91cGRhdGVUcmFjZSA9IHJlcXVpcmUoXCIuL3VwZGF0ZVRyYWNlXCIpO1xuXG52YXIgX3Jlc29sdmVEaXJlY3Rpb24gPSByZXF1aXJlKFwiLi9yZXNvbHZlRGlyZWN0aW9uXCIpO1xuXG52YXIgX2NhbGN1bGF0ZUR1cmF0aW9uID0gcmVxdWlyZShcIi4vY2FsY3VsYXRlRHVyYXRpb25cIik7XG5cbnZhciBfY2FsY3VsYXRlVmVsb2NpdHkgPSByZXF1aXJlKFwiLi9jYWxjdWxhdGVWZWxvY2l0eVwiKTtcblxudmFyIF90eXBlcyA9IHJlcXVpcmUoXCIuLi90eXBlc1wiKTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlUG9zaXRpb24oc3RhdGUsIG9wdGlvbnMpIHtcbiAgdmFyIHN0YXJ0ID0gc3RhdGUuc3RhcnQsXG4gICAgICB4ID0gc3RhdGUueCxcbiAgICAgIHkgPSBzdGF0ZS55LFxuICAgICAgdHJhY2VYID0gc3RhdGUudHJhY2VYLFxuICAgICAgdHJhY2VZID0gc3RhdGUudHJhY2VZO1xuICB2YXIgcm90YXRlUG9zaXRpb24gPSBvcHRpb25zLnJvdGF0ZVBvc2l0aW9uLFxuICAgICAgZGlyZWN0aW9uRGVsdGEgPSBvcHRpb25zLmRpcmVjdGlvbkRlbHRhO1xuICB2YXIgZGVsdGFYID0gcm90YXRlUG9zaXRpb24ueCAtIHg7XG4gIHZhciBkZWx0YVkgPSB5IC0gcm90YXRlUG9zaXRpb24ueTtcbiAgdmFyIGFic1ggPSBNYXRoLmFicyhkZWx0YVgpO1xuICB2YXIgYWJzWSA9IE1hdGguYWJzKGRlbHRhWSk7XG4gICgwLCBfdXBkYXRlVHJhY2UudXBkYXRlVHJhY2UpKHRyYWNlWCwgZGVsdGFYKTtcbiAgKDAsIF91cGRhdGVUcmFjZS51cGRhdGVUcmFjZSkodHJhY2VZLCBkZWx0YVkpO1xuICB2YXIgZGlyZWN0aW9uWCA9ICgwLCBfcmVzb2x2ZURpcmVjdGlvbi5yZXNvbHZlRGlyZWN0aW9uKSh0cmFjZVgsIF90eXBlcy5BeGlzLlgsIGRpcmVjdGlvbkRlbHRhKTtcbiAgdmFyIGRpcmVjdGlvblkgPSAoMCwgX3Jlc29sdmVEaXJlY3Rpb24ucmVzb2x2ZURpcmVjdGlvbikodHJhY2VZLCBfdHlwZXMuQXhpcy5ZLCBkaXJlY3Rpb25EZWx0YSk7XG4gIHZhciBkdXJhdGlvbiA9ICgwLCBfY2FsY3VsYXRlRHVyYXRpb24uY2FsY3VsYXRlRHVyYXRpb24pKHN0YXJ0LCBEYXRlLm5vdygpKTtcbiAgdmFyIHZlbG9jaXR5ID0gKDAsIF9jYWxjdWxhdGVWZWxvY2l0eS5jYWxjdWxhdGVWZWxvY2l0eSkoYWJzWCwgYWJzWSwgZHVyYXRpb24pO1xuICByZXR1cm4ge1xuICAgIGFic1g6IGFic1gsXG4gICAgYWJzWTogYWJzWSxcbiAgICBkZWx0YVg6IGRlbHRhWCxcbiAgICBkZWx0YVk6IGRlbHRhWSxcbiAgICBkaXJlY3Rpb25YOiBkaXJlY3Rpb25YLFxuICAgIGRpcmVjdGlvblk6IGRpcmVjdGlvblksXG4gICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgIHBvc2l0aW9uWDogcm90YXRlUG9zaXRpb24ueCxcbiAgICBwb3NpdGlvblk6IHJvdGF0ZVBvc2l0aW9uLnksXG4gICAgdmVsb2NpdHk6IHZlbG9jaXR5XG4gIH07XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNoZWNrSXNNb3JlVGhhblNpbmdsZVRvdWNoZXMgPSB2b2lkIDA7XG5cbnZhciBjaGVja0lzTW9yZVRoYW5TaW5nbGVUb3VjaGVzID0gZnVuY3Rpb24gY2hlY2tJc01vcmVUaGFuU2luZ2xlVG91Y2hlcyhlKSB7XG4gIHJldHVybiBCb29sZWFuKGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID4gMSk7XG59O1xuXG5leHBvcnRzLmNoZWNrSXNNb3JlVGhhblNpbmdsZVRvdWNoZXMgPSBjaGVja0lzTW9yZVRoYW5TaW5nbGVUb3VjaGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jcmVhdGVPcHRpb25zID0gY3JlYXRlT3B0aW9ucztcblxuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucygpIHtcbiAgdmFyIHByb3h5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3h5LCAncGFzc2l2ZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHRoaXMuaXNQYXNzaXZlU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIHByb3h5O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jaGVja0lzUGFzc2l2ZVN1cHBvcnRlZCA9IGNoZWNrSXNQYXNzaXZlU3VwcG9ydGVkO1xuZXhwb3J0cy5ub29wID0gdm9pZCAwO1xuXG52YXIgX2NyZWF0ZU9wdGlvbnMgPSByZXF1aXJlKFwiLi9jcmVhdGVPcHRpb25zXCIpO1xuXG5mdW5jdGlvbiBjaGVja0lzUGFzc2l2ZVN1cHBvcnRlZChpc1Bhc3NpdmVTdXBwb3J0ZWQpIHtcbiAgaWYgKHR5cGVvZiBpc1Bhc3NpdmVTdXBwb3J0ZWQgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBpc1Bhc3NpdmVTdXBwb3J0ZWQ7XG4gIH1cblxuICB2YXIgcHJveHkgPSB7XG4gICAgaXNQYXNzaXZlU3VwcG9ydGVkOiBpc1Bhc3NpdmVTdXBwb3J0ZWRcbiAgfTtcblxuICB0cnkge1xuICAgIHZhciBvcHRpb25zID0gKDAsIF9jcmVhdGVPcHRpb25zLmNyZWF0ZU9wdGlvbnMpKHByb3h5KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2hlY2tJc1Bhc3NpdmVTdXBwb3J0ZWQnLCBub29wLCBvcHRpb25zKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hlY2tJc1Bhc3NpdmVTdXBwb3J0ZWQnLCBub29wLCBvcHRpb25zKTtcbiAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gIHJldHVybiBwcm94eS5pc1Bhc3NpdmVTdXBwb3J0ZWQ7XG59XG5cbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuXG5leHBvcnRzLm5vb3AgPSBub29wOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jaGVja0lzVG91Y2hFdmVudHNTdXBwb3J0ZWQgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cblxudmFyIGNoZWNrSXNUb3VjaEV2ZW50c1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGNoZWNrSXNUb3VjaEV2ZW50c1N1cHBvcnRlZCgpIHtcbiAgcmV0dXJuICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yod2luZG93KSkgPT09ICdvYmplY3QnICYmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgQm9vbGVhbih3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzKSk7XG59O1xuXG5leHBvcnRzLmNoZWNrSXNUb3VjaEV2ZW50c1N1cHBvcnRlZCA9IGNoZWNrSXNUb3VjaEV2ZW50c1N1cHBvcnRlZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZ2V0SW5pdGlhbFN0YXRlID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgZW51bWVyYWJsZU9ubHkgJiYgKHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KSksIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gbnVsbCAhPSBhcmd1bWVudHNbaV0gPyBhcmd1bWVudHNbaV0gOiB7fTsgaSAlIDIgPyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKSA6IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgZ2V0SW5pdGlhbFN0YXRlID0gZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gIHJldHVybiBfb2JqZWN0U3ByZWFkKHtcbiAgICB4OiAwLFxuICAgIHk6IDAsXG4gICAgc3RhcnQ6IDAsXG4gICAgaXNTd2lwaW5nOiBmYWxzZSxcbiAgICB0cmFjZVg6IFtdLFxuICAgIHRyYWNlWTogW11cbiAgfSwgb3B0aW9ucyk7XG59O1xuXG5leHBvcnRzLmdldEluaXRpYWxTdGF0ZSA9IGdldEluaXRpYWxTdGF0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZ2V0SW5pdGlhbFByb3BzID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgZW51bWVyYWJsZU9ubHkgJiYgKHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KSksIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gbnVsbCAhPSBhcmd1bWVudHNbaV0gPyBhcmd1bWVudHNbaV0gOiB7fTsgaSAlIDIgPyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKSA6IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgZ2V0SW5pdGlhbFByb3BzID0gZnVuY3Rpb24gZ2V0SW5pdGlhbFByb3BzKCkge1xuICB2YXIgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICByZXR1cm4gX29iamVjdFNwcmVhZCh7XG4gICAgZWxlbWVudDogbnVsbCxcbiAgICB0YXJnZXQ6IG51bGwsXG4gICAgZGVsdGE6IDEwLFxuICAgIGRpcmVjdGlvbkRlbHRhOiAwLFxuICAgIHJvdGF0aW9uQW5nbGU6IDAsXG4gICAgbW91c2VUcmFja2luZ0VuYWJsZWQ6IGZhbHNlLFxuICAgIHRvdWNoVHJhY2tpbmdFbmFibGVkOiB0cnVlLFxuICAgIHByZXZlbnREZWZhdWx0VG91Y2htb3ZlRXZlbnQ6IGZhbHNlLFxuICAgIHByZXZlbnRUcmFja2luZ09uTW91c2VsZWF2ZTogZmFsc2VcbiAgfSwgcHJvcHMpO1xufTtcblxuZXhwb3J0cy5nZXRJbml0aWFsUHJvcHMgPSBnZXRJbml0aWFsUHJvcHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdldE9wdGlvbnMgPSBnZXRPcHRpb25zO1xuXG5mdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICB2YXIgaXNQYXNzaXZlU3VwcG9ydGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcblxuICBpZiAoaXNQYXNzaXZlU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucm90YXRlQnlBbmdsZSA9IHJvdGF0ZUJ5QW5nbGU7XG5cbmZ1bmN0aW9uIHJvdGF0ZUJ5QW5nbGUocG9zaXRpb24pIHtcbiAgdmFyIGFuZ2xlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gIGlmIChhbmdsZSA9PT0gMCkge1xuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIHZhciB4ID0gcG9zaXRpb24ueCxcbiAgICAgIHkgPSBwb3NpdGlvbi55O1xuICB2YXIgYW5nbGVJblJhZGlhbnMgPSBNYXRoLlBJIC8gMTgwICogYW5nbGU7XG4gIHZhciByb3RhdGVkWCA9IHggKiBNYXRoLmNvcyhhbmdsZUluUmFkaWFucykgKyB5ICogTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xuICB2YXIgcm90YXRlZFkgPSB5ICogTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpIC0geCAqIE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcbiAgcmV0dXJuIHtcbiAgICB4OiByb3RhdGVkWCxcbiAgICB5OiByb3RhdGVkWVxuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NhbGN1bGF0ZURpcmVjdGlvbiA9IHJlcXVpcmUoXCIuL2NhbGN1bGF0ZURpcmVjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX2NhbGN1bGF0ZURpcmVjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX2NhbGN1bGF0ZURpcmVjdGlvbltrZXldKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9jYWxjdWxhdGVEaXJlY3Rpb25ba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfY2FsY3VsYXRlRGlyZWN0aW9uRGVsdGEgPSByZXF1aXJlKFwiLi9jYWxjdWxhdGVEaXJlY3Rpb25EZWx0YVwiKTtcblxuT2JqZWN0LmtleXMoX2NhbGN1bGF0ZURpcmVjdGlvbkRlbHRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfY2FsY3VsYXRlRGlyZWN0aW9uRGVsdGFba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfY2FsY3VsYXRlRGlyZWN0aW9uRGVsdGFba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfY2FsY3VsYXRlRHVyYXRpb24gPSByZXF1aXJlKFwiLi9jYWxjdWxhdGVEdXJhdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX2NhbGN1bGF0ZUR1cmF0aW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfY2FsY3VsYXRlRHVyYXRpb25ba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfY2FsY3VsYXRlRHVyYXRpb25ba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfY2FsY3VsYXRlTW92aW5nUG9zaXRpb24gPSByZXF1aXJlKFwiLi9jYWxjdWxhdGVNb3ZpbmdQb3NpdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX2NhbGN1bGF0ZU1vdmluZ1Bvc2l0aW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfY2FsY3VsYXRlTW92aW5nUG9zaXRpb25ba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfY2FsY3VsYXRlTW92aW5nUG9zaXRpb25ba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfY2FsY3VsYXRlUG9zaXRpb24gPSByZXF1aXJlKFwiLi9jYWxjdWxhdGVQb3NpdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX2NhbGN1bGF0ZVBvc2l0aW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfY2FsY3VsYXRlUG9zaXRpb25ba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfY2FsY3VsYXRlUG9zaXRpb25ba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zID0gcmVxdWlyZShcIi4vY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zXCIpO1xuXG5PYmplY3Qua2V5cyhfY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zW2tleV0pIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX2NhbGN1bGF0ZVRyYWNlRGlyZWN0aW9uc1trZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9jYWxjdWxhdGVWZWxvY2l0eSA9IHJlcXVpcmUoXCIuL2NhbGN1bGF0ZVZlbG9jaXR5XCIpO1xuXG5PYmplY3Qua2V5cyhfY2FsY3VsYXRlVmVsb2NpdHkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9jYWxjdWxhdGVWZWxvY2l0eVtrZXldKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9jYWxjdWxhdGVWZWxvY2l0eVtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9jaGVja0lzTW9yZVRoYW5TaW5nbGVUb3VjaGVzID0gcmVxdWlyZShcIi4vY2hlY2tJc01vcmVUaGFuU2luZ2xlVG91Y2hlc1wiKTtcblxuT2JqZWN0LmtleXMoX2NoZWNrSXNNb3JlVGhhblNpbmdsZVRvdWNoZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9jaGVja0lzTW9yZVRoYW5TaW5nbGVUb3VjaGVzW2tleV0pIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX2NoZWNrSXNNb3JlVGhhblNpbmdsZVRvdWNoZXNba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfY2hlY2tJc1Bhc3NpdmVTdXBwb3J0ZWQgPSByZXF1aXJlKFwiLi9jaGVja0lzUGFzc2l2ZVN1cHBvcnRlZFwiKTtcblxuT2JqZWN0LmtleXMoX2NoZWNrSXNQYXNzaXZlU3VwcG9ydGVkKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfY2hlY2tJc1Bhc3NpdmVTdXBwb3J0ZWRba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfY2hlY2tJc1Bhc3NpdmVTdXBwb3J0ZWRba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfY2hlY2tJc1RvdWNoRXZlbnRzU3VwcG9ydGVkID0gcmVxdWlyZShcIi4vY2hlY2tJc1RvdWNoRXZlbnRzU3VwcG9ydGVkXCIpO1xuXG5PYmplY3Qua2V5cyhfY2hlY2tJc1RvdWNoRXZlbnRzU3VwcG9ydGVkKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfY2hlY2tJc1RvdWNoRXZlbnRzU3VwcG9ydGVkW2tleV0pIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX2NoZWNrSXNUb3VjaEV2ZW50c1N1cHBvcnRlZFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9jb21tb24gPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5cbk9iamVjdC5rZXlzKF9jb21tb24pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9jb21tb25ba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfY29tbW9uW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX2NyZWF0ZU9wdGlvbnMgPSByZXF1aXJlKFwiLi9jcmVhdGVPcHRpb25zXCIpO1xuXG5PYmplY3Qua2V5cyhfY3JlYXRlT3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX2NyZWF0ZU9wdGlvbnNba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfY3JlYXRlT3B0aW9uc1trZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9nZXRJbml0aWFsU3RhdGUgPSByZXF1aXJlKFwiLi9nZXRJbml0aWFsU3RhdGVcIik7XG5cbk9iamVjdC5rZXlzKF9nZXRJbml0aWFsU3RhdGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9nZXRJbml0aWFsU3RhdGVba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfZ2V0SW5pdGlhbFN0YXRlW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX2dldEluaXRpYWxQcm9wcyA9IHJlcXVpcmUoXCIuL2dldEluaXRpYWxQcm9wc1wiKTtcblxuT2JqZWN0LmtleXMoX2dldEluaXRpYWxQcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX2dldEluaXRpYWxQcm9wc1trZXldKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9nZXRJbml0aWFsUHJvcHNba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfZ2V0T3B0aW9ucyA9IHJlcXVpcmUoXCIuL2dldE9wdGlvbnNcIik7XG5cbk9iamVjdC5rZXlzKF9nZXRPcHRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfZ2V0T3B0aW9uc1trZXldKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9nZXRPcHRpb25zW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX3Jlc29sdmVEaXJlY3Rpb24gPSByZXF1aXJlKFwiLi9yZXNvbHZlRGlyZWN0aW9uXCIpO1xuXG5PYmplY3Qua2V5cyhfcmVzb2x2ZURpcmVjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX3Jlc29sdmVEaXJlY3Rpb25ba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfcmVzb2x2ZURpcmVjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9yb3RhdGVCeUFuZ2xlID0gcmVxdWlyZShcIi4vcm90YXRlQnlBbmdsZVwiKTtcblxuT2JqZWN0LmtleXMoX3JvdGF0ZUJ5QW5nbGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9yb3RhdGVCeUFuZ2xlW2tleV0pIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX3JvdGF0ZUJ5QW5nbGVba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfdXBkYXRlVHJhY2UgPSByZXF1aXJlKFwiLi91cGRhdGVUcmFjZVwiKTtcblxuT2JqZWN0LmtleXMoX3VwZGF0ZVRyYWNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfdXBkYXRlVHJhY2Vba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfdXBkYXRlVHJhY2Vba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBfZXhwb3J0TmFtZXMgPSB7fTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgVXRpbHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi91dGlsc1wiKSk7XG5cbnZhciBfdHlwZXMgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcblxuT2JqZWN0LmtleXMoX3R5cGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9leHBvcnROYW1lcywga2V5KSkgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfdHlwZXNba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfdHlwZXNba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7IHZhciBjYWNoZUJhYmVsSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHZhciBjYWNoZU5vZGVJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgcmV0dXJuIChfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgcmV0dXJuIG5vZGVJbnRlcm9wID8gY2FjaGVOb2RlSW50ZXJvcCA6IGNhY2hlQmFiZWxJbnRlcm9wOyB9KShub2RlSW50ZXJvcCk7IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqLCBub2RlSW50ZXJvcCkgeyBpZiAoIW5vZGVJbnRlcm9wICYmIG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBcImRlZmF1bHRcIjogb2JqIH07IH0gdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoa2V5ICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7IGlmIChjYWNoZSkgeyBjYWNoZS5zZXQob2JqLCBuZXdPYmopOyB9IHJldHVybiBuZXdPYmo7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgVmFuaWxsYVN3aXBlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVmFuaWxsYVN3aXBlKHByb3BzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFZhbmlsbGFTd2lwZSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkodGhpcywgXCJzdGF0ZVwiLCB2b2lkIDApO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KHRoaXMsIFwicHJvcHNcIiwgdm9pZCAwKTtcblxuICAgIHRoaXMuc3RhdGUgPSBVdGlscy5nZXRJbml0aWFsU3RhdGUoKTtcbiAgICB0aGlzLnByb3BzID0gVXRpbHMuZ2V0SW5pdGlhbFByb3BzKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZVN3aXBlU3RhcnQgPSB0aGlzLmhhbmRsZVN3aXBlU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVN3aXBlTW92ZSA9IHRoaXMuaGFuZGxlU3dpcGVNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTd2lwZUVuZCA9IHRoaXMuaGFuZGxlU3dpcGVFbmQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlRG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZU1vdmUgPSB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTW91c2VVcCA9IHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA9IHRoaXMuaGFuZGxlTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFZhbmlsbGFTd2lwZSwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdGhpcy5zZXR1cFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLnNldHVwTW91c2VMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZShwcm9wcykge1xuICAgICAgdmFyIHByZXZQcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgbmV4dFByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldlByb3BzLCBwcm9wcyk7XG5cbiAgICAgIGlmIChwcmV2UHJvcHMuZWxlbWVudCAhPT0gbmV4dFByb3BzLmVsZW1lbnQgfHwgcHJldlByb3BzLnRhcmdldCAhPT0gbmV4dFByb3BzLnRhcmdldCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5wcm9wcyA9IG5leHRQcm9wcztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IG5leHRQcm9wcztcblxuICAgICAgaWYgKHByZXZQcm9wcy5tb3VzZVRyYWNraW5nRW5hYmxlZCAhPT0gbmV4dFByb3BzLm1vdXNlVHJhY2tpbmdFbmFibGVkIHx8IHByZXZQcm9wcy5wcmV2ZW50VHJhY2tpbmdPbk1vdXNlbGVhdmUgIT09IG5leHRQcm9wcy5wcmV2ZW50VHJhY2tpbmdPbk1vdXNlbGVhdmUpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgbmV4dFByb3BzLm1vdXNlVHJhY2tpbmdFbmFibGVkID8gdGhpcy5zZXR1cE1vdXNlTGlzdGVuZXJzKCkgOiB0aGlzLmNsZWFudXBNb3VzZUxpc3RlbmVycygpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldlByb3BzLnRvdWNoVHJhY2tpbmdFbmFibGVkICE9PSBuZXh0UHJvcHMudG91Y2hUcmFja2luZ0VuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgbmV4dFByb3BzLnRvdWNoVHJhY2tpbmdFbmFibGVkID8gdGhpcy5zZXR1cFRvdWNoTGlzdGVuZXJzKCkgOiB0aGlzLmNsZWFudXBUb3VjaExpc3RlbmVycygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZXN0cm95XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLmNsZWFudXBNb3VzZUxpc3RlbmVycygpO1xuICAgICAgdGhpcy5jbGVhbnVwVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuc3RhdGUgPSBVdGlscy5nZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgIHRoaXMucHJvcHMgPSBVdGlscy5nZXRJbml0aWFsUHJvcHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0dXBUb3VjaExpc3RlbmVyc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXR1cFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBlbGVtZW50ID0gX3RoaXMkcHJvcHMuZWxlbWVudCxcbiAgICAgICAgICB0YXJnZXQgPSBfdGhpcyRwcm9wcy50YXJnZXQsXG4gICAgICAgICAgdG91Y2hUcmFja2luZ0VuYWJsZWQgPSBfdGhpcyRwcm9wcy50b3VjaFRyYWNraW5nRW5hYmxlZDtcblxuICAgICAgaWYgKGVsZW1lbnQgJiYgdG91Y2hUcmFja2luZ0VuYWJsZWQpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gdGFyZ2V0IHx8IGVsZW1lbnQ7XG4gICAgICAgIHZhciBpc1Bhc3NpdmVTdXBwb3J0ZWQgPSBVdGlscy5jaGVja0lzUGFzc2l2ZVN1cHBvcnRlZCgpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IFV0aWxzLmdldE9wdGlvbnMoaXNQYXNzaXZlU3VwcG9ydGVkKTtcbiAgICAgICAgbGlzdGVuZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlU3dpcGVTdGFydCwgb3B0aW9ucyk7XG4gICAgICAgIGxpc3RlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlU3dpcGVNb3ZlLCBvcHRpb25zKTtcbiAgICAgICAgbGlzdGVuZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVN3aXBlRW5kLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYW51cFRvdWNoTGlzdGVuZXJzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFudXBUb3VjaExpc3RlbmVycygpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGVsZW1lbnQgPSBfdGhpcyRwcm9wczIuZWxlbWVudCxcbiAgICAgICAgICB0YXJnZXQgPSBfdGhpcyRwcm9wczIudGFyZ2V0O1xuICAgICAgdmFyIGxpc3RlbmVyID0gdGFyZ2V0IHx8IGVsZW1lbnQ7XG5cbiAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICBsaXN0ZW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVTd2lwZVN0YXJ0KTtcbiAgICAgICAgbGlzdGVuZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVTd2lwZU1vdmUpO1xuICAgICAgICBsaXN0ZW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlU3dpcGVFbmQpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXR1cE1vdXNlTGlzdGVuZXJzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldHVwTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBlbGVtZW50ID0gX3RoaXMkcHJvcHMzLmVsZW1lbnQsXG4gICAgICAgICAgbW91c2VUcmFja2luZ0VuYWJsZWQgPSBfdGhpcyRwcm9wczMubW91c2VUcmFja2luZ0VuYWJsZWQsXG4gICAgICAgICAgcHJldmVudFRyYWNraW5nT25Nb3VzZWxlYXZlID0gX3RoaXMkcHJvcHMzLnByZXZlbnRUcmFja2luZ09uTW91c2VsZWF2ZTtcblxuICAgICAgaWYgKG1vdXNlVHJhY2tpbmdFbmFibGVkICYmIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU1vdXNlRG93bik7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuXG4gICAgICAgIGlmIChwcmV2ZW50VHJhY2tpbmdPbk1vdXNlbGVhdmUpIHtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmhhbmRsZU1vdXNlTGVhdmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFudXBNb3VzZUxpc3RlbmVyc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhbnVwTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHRoaXMucHJvcHMuZWxlbWVudDtcblxuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU1vdXNlRG93bik7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmhhbmRsZU1vdXNlTGVhdmUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRFdmVudERhdGFcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RXZlbnREYXRhKGUpIHtcbiAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7XG4gICAgICAgIGRpcmVjdGlvbkRlbHRhOiAwXG4gICAgICB9O1xuICAgICAgdmFyIHJvdGF0aW9uQW5nbGUgPSB0aGlzLnByb3BzLnJvdGF0aW9uQW5nbGU7XG4gICAgICB2YXIgZGlyZWN0aW9uRGVsdGEgPSBvcHRpb25zLmRpcmVjdGlvbkRlbHRhO1xuICAgICAgdmFyIG1vdmluZ1Bvc2l0aW9uID0gVXRpbHMuY2FsY3VsYXRlTW92aW5nUG9zaXRpb24oZSk7XG4gICAgICB2YXIgcm90YXRlUG9zaXRpb24gPSBVdGlscy5yb3RhdGVCeUFuZ2xlKG1vdmluZ1Bvc2l0aW9uLCByb3RhdGlvbkFuZ2xlKTtcbiAgICAgIHJldHVybiBVdGlscy5jYWxjdWxhdGVQb3NpdGlvbih0aGlzLnN0YXRlLCB7XG4gICAgICAgIHJvdGF0ZVBvc2l0aW9uOiByb3RhdGVQb3NpdGlvbixcbiAgICAgICAgZGlyZWN0aW9uRGVsdGE6IGRpcmVjdGlvbkRlbHRhXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlU3dpcGVTdGFydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVTd2lwZVN0YXJ0KGUpIHtcbiAgICAgIGlmIChVdGlscy5jaGVja0lzTW9yZVRoYW5TaW5nbGVUb3VjaGVzKGUpKSByZXR1cm47XG4gICAgICB2YXIgcm90YXRpb25BbmdsZSA9IHRoaXMucHJvcHMucm90YXRpb25BbmdsZTtcbiAgICAgIHZhciBtb3ZpbmdQb3NpdGlvbiA9IFV0aWxzLmNhbGN1bGF0ZU1vdmluZ1Bvc2l0aW9uKGUpO1xuXG4gICAgICB2YXIgX1V0aWxzJHJvdGF0ZUJ5QW5nbGUgPSBVdGlscy5yb3RhdGVCeUFuZ2xlKG1vdmluZ1Bvc2l0aW9uLCByb3RhdGlvbkFuZ2xlKSxcbiAgICAgICAgICB4ID0gX1V0aWxzJHJvdGF0ZUJ5QW5nbGUueCxcbiAgICAgICAgICB5ID0gX1V0aWxzJHJvdGF0ZUJ5QW5nbGUueTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IFV0aWxzLmdldEluaXRpYWxTdGF0ZSh7XG4gICAgICAgIGlzU3dpcGluZzogZmFsc2UsXG4gICAgICAgIHN0YXJ0OiBEYXRlLm5vdygpLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlU3dpcGVNb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVN3aXBlTW92ZShlKSB7XG4gICAgICB2YXIgX3RoaXMkc3RhdGUgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIHggPSBfdGhpcyRzdGF0ZS54LFxuICAgICAgICAgIHkgPSBfdGhpcyRzdGF0ZS55LFxuICAgICAgICAgIGlzU3dpcGluZyA9IF90aGlzJHN0YXRlLmlzU3dpcGluZztcbiAgICAgIGlmICgheCB8fCAheSB8fCBVdGlscy5jaGVja0lzTW9yZVRoYW5TaW5nbGVUb3VjaGVzKGUpKSByZXR1cm47XG4gICAgICB2YXIgZGlyZWN0aW9uRGVsdGEgPSB0aGlzLnByb3BzLmRpcmVjdGlvbkRlbHRhIHx8IDA7XG5cbiAgICAgIHZhciBfdGhpcyRnZXRFdmVudERhdGEgPSB0aGlzLmdldEV2ZW50RGF0YShlLCB7XG4gICAgICAgIGRpcmVjdGlvbkRlbHRhOiBkaXJlY3Rpb25EZWx0YVxuICAgICAgfSksXG4gICAgICAgICAgYWJzWCA9IF90aGlzJGdldEV2ZW50RGF0YS5hYnNYLFxuICAgICAgICAgIGFic1kgPSBfdGhpcyRnZXRFdmVudERhdGEuYWJzWSxcbiAgICAgICAgICBkZWx0YVggPSBfdGhpcyRnZXRFdmVudERhdGEuZGVsdGFYLFxuICAgICAgICAgIGRlbHRhWSA9IF90aGlzJGdldEV2ZW50RGF0YS5kZWx0YVksXG4gICAgICAgICAgZGlyZWN0aW9uWCA9IF90aGlzJGdldEV2ZW50RGF0YS5kaXJlY3Rpb25YLFxuICAgICAgICAgIGRpcmVjdGlvblkgPSBfdGhpcyRnZXRFdmVudERhdGEuZGlyZWN0aW9uWSxcbiAgICAgICAgICBkdXJhdGlvbiA9IF90aGlzJGdldEV2ZW50RGF0YS5kdXJhdGlvbixcbiAgICAgICAgICB2ZWxvY2l0eSA9IF90aGlzJGdldEV2ZW50RGF0YS52ZWxvY2l0eTtcblxuICAgICAgdmFyIF90aGlzJHByb3BzNCA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgZGVsdGEgPSBfdGhpcyRwcm9wczQuZGVsdGEsXG4gICAgICAgICAgcHJldmVudERlZmF1bHRUb3VjaG1vdmVFdmVudCA9IF90aGlzJHByb3BzNC5wcmV2ZW50RGVmYXVsdFRvdWNobW92ZUV2ZW50LFxuICAgICAgICAgIG9uU3dpcGVTdGFydCA9IF90aGlzJHByb3BzNC5vblN3aXBlU3RhcnQsXG4gICAgICAgICAgb25Td2lwaW5nID0gX3RoaXMkcHJvcHM0Lm9uU3dpcGluZztcbiAgICAgIGlmIChlLmNhbmNlbGFibGUgJiYgcHJldmVudERlZmF1bHRUb3VjaG1vdmVFdmVudCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKGFic1ggPCBOdW1iZXIoZGVsdGEpICYmIGFic1kgPCBOdW1iZXIoZGVsdGEpICYmICFpc1N3aXBpbmcpIHJldHVybjtcblxuICAgICAgaWYgKG9uU3dpcGVTdGFydCAmJiAhaXNTd2lwaW5nKSB7XG4gICAgICAgIG9uU3dpcGVTdGFydChlLCB7XG4gICAgICAgICAgZGVsdGFYOiBkZWx0YVgsXG4gICAgICAgICAgZGVsdGFZOiBkZWx0YVksXG4gICAgICAgICAgYWJzWDogYWJzWCxcbiAgICAgICAgICBhYnNZOiBhYnNZLFxuICAgICAgICAgIGRpcmVjdGlvblg6IGRpcmVjdGlvblgsXG4gICAgICAgICAgZGlyZWN0aW9uWTogZGlyZWN0aW9uWSxcbiAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlLmlzU3dpcGluZyA9IHRydWU7XG5cbiAgICAgIGlmIChvblN3aXBpbmcpIHtcbiAgICAgICAgb25Td2lwaW5nKGUsIHtcbiAgICAgICAgICBkZWx0YVg6IGRlbHRhWCxcbiAgICAgICAgICBkZWx0YVk6IGRlbHRhWSxcbiAgICAgICAgICBhYnNYOiBhYnNYLFxuICAgICAgICAgIGFic1k6IGFic1ksXG4gICAgICAgICAgZGlyZWN0aW9uWDogZGlyZWN0aW9uWCxcbiAgICAgICAgICBkaXJlY3Rpb25ZOiBkaXJlY3Rpb25ZLFxuICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhbmRsZVN3aXBlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVN3aXBlRW5kKGUpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczUgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIG9uU3dpcGVkID0gX3RoaXMkcHJvcHM1Lm9uU3dpcGVkLFxuICAgICAgICAgIG9uVGFwID0gX3RoaXMkcHJvcHM1Lm9uVGFwO1xuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5pc1N3aXBpbmcpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbkRlbHRhID0gdGhpcy5wcm9wcy5kaXJlY3Rpb25EZWx0YSB8fCAwO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLmdldEV2ZW50RGF0YShlLCB7XG4gICAgICAgICAgZGlyZWN0aW9uRGVsdGE6IGRpcmVjdGlvbkRlbHRhXG4gICAgICAgIH0pO1xuICAgICAgICBvblN3aXBlZCAmJiBvblN3aXBlZChlLCBwb3NpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgX3Bvc2l0aW9uID0gdGhpcy5nZXRFdmVudERhdGEoZSk7XG5cbiAgICAgICAgb25UYXAgJiYgb25UYXAoZSwgX3Bvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZSA9IFV0aWxzLmdldEluaXRpYWxTdGF0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVNb3VzZURvd25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnByb3BzLnRhcmdldDtcblxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSBlLnRhcmdldCkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU3dpcGVTdGFydChlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTd2lwZVN0YXJ0KGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVNb3VzZU1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKGUpIHtcbiAgICAgIHRoaXMuaGFuZGxlU3dpcGVNb3ZlKGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVNb3VzZVVwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlVXAoZSkge1xuICAgICAgdmFyIGlzU3dpcGluZyA9IHRoaXMuc3RhdGUuaXNTd2lwaW5nO1xuICAgICAgdmFyIHRhcmdldCA9IHRoaXMucHJvcHMudGFyZ2V0O1xuXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IGUudGFyZ2V0IHx8IGlzU3dpcGluZykge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU3dpcGVFbmQoZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGFuZGxlU3dpcGVFbmQoZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhbmRsZU1vdXNlTGVhdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VMZWF2ZShlKSB7XG4gICAgICB2YXIgaXNTd2lwaW5nID0gdGhpcy5zdGF0ZS5pc1N3aXBpbmc7XG5cbiAgICAgIGlmIChpc1N3aXBpbmcpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTd2lwZUVuZChlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJpc1RvdWNoRXZlbnRzU3VwcG9ydGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzVG91Y2hFdmVudHNTdXBwb3J0ZWQoKSB7XG4gICAgICByZXR1cm4gVXRpbHMuY2hlY2tJc1RvdWNoRXZlbnRzU3VwcG9ydGVkKCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFZhbmlsbGFTd2lwZTtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBWYW5pbGxhU3dpcGU7IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIEV2ZW50VHlwZSxBbmltYXRpb25UeXBlLEF1dG9QbGF5U3RyYXRlZ3ksQ29udHJvbHNTdHJhdGVneSxBdXRvcGxheURpcmVjdGlvbixDbGFzc25hbWVzLE1vZGlmaWVycztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxleHBvcnRzLk1vZGlmaWVycz1leHBvcnRzLkNsYXNzbmFtZXM9ZXhwb3J0cy5BdXRvcGxheURpcmVjdGlvbj1leHBvcnRzLkNvbnRyb2xzU3RyYXRlZ3k9ZXhwb3J0cy5BdXRvUGxheVN0cmF0ZWd5PWV4cG9ydHMuQW5pbWF0aW9uVHlwZT1leHBvcnRzLkV2ZW50VHlwZT12b2lkIDAsZnVuY3Rpb24oZSl7ZS5BQ1RJT049XCJhY3Rpb25cIixlLklOSVQ9XCJpbml0XCIsZS5SRVNJWkU9XCJyZXNpemVcIixlLlVQREFURT1cInVwZGF0ZVwifShFdmVudFR5cGU9ZXhwb3J0cy5FdmVudFR5cGV8fChleHBvcnRzLkV2ZW50VHlwZT17fSkpLGZ1bmN0aW9uKGUpe2UuRkFERU9VVD1cImZhZGVvdXRcIixlLlNMSURFPVwic2xpZGVcIn0oQW5pbWF0aW9uVHlwZT1leHBvcnRzLkFuaW1hdGlvblR5cGV8fChleHBvcnRzLkFuaW1hdGlvblR5cGU9e30pKSxmdW5jdGlvbihlKXtlLkRFRkFVTFQ9XCJkZWZhdWx0XCIsZS5BTEw9XCJhbGxcIixlLkFDVElPTj1cImFjdGlvblwiLGUuTk9ORT1cIm5vbmVcIn0oQXV0b1BsYXlTdHJhdGVneT1leHBvcnRzLkF1dG9QbGF5U3RyYXRlZ3l8fChleHBvcnRzLkF1dG9QbGF5U3RyYXRlZ3k9e30pKSxmdW5jdGlvbihlKXtlLkRFRkFVTFQ9XCJkZWZhdWx0XCIsZS5BTFRFUk5BVEU9XCJhbHRlcm5hdGVcIixlLlJFU1BPTlNJVkU9XCJyZXNwb25zaXZlXCJ9KENvbnRyb2xzU3RyYXRlZ3k9ZXhwb3J0cy5Db250cm9sc1N0cmF0ZWd5fHwoZXhwb3J0cy5Db250cm9sc1N0cmF0ZWd5PXt9KSksZnVuY3Rpb24oZSl7ZS5SVEw9XCJydGxcIixlLkxUUj1cImx0clwifShBdXRvcGxheURpcmVjdGlvbj1leHBvcnRzLkF1dG9wbGF5RGlyZWN0aW9ufHwoZXhwb3J0cy5BdXRvcGxheURpcmVjdGlvbj17fSkpLGZ1bmN0aW9uKGUpe2UuQU5JTUFURUQ9XCJhbmltYXRlZCBhbmltYXRlZC1vdXQgZmFkZU91dFwiLGUuUk9PVD1cImFsaWNlLWNhcm91c2VsXCIsZS5XUkFQUEVSPVwiYWxpY2UtY2Fyb3VzZWxfX3dyYXBwZXJcIixlLlNUQUdFPVwiYWxpY2UtY2Fyb3VzZWxfX3N0YWdlXCIsZS5TVEFHRV9JVEVNPVwiYWxpY2UtY2Fyb3VzZWxfX3N0YWdlLWl0ZW1cIixlLkRPVFM9XCJhbGljZS1jYXJvdXNlbF9fZG90c1wiLGUuRE9UU19JVEVNPVwiYWxpY2UtY2Fyb3VzZWxfX2RvdHMtaXRlbVwiLGUuUExBWV9CVE49XCJhbGljZS1jYXJvdXNlbF9fcGxheS1idG5cIixlLlBMQVlfQlROX0lURU09XCJhbGljZS1jYXJvdXNlbF9fcGxheS1idG4taXRlbVwiLGUuUExBWV9CVE5fV1JBUFBFUj1cImFsaWNlLWNhcm91c2VsX19wbGF5LWJ0bi13cmFwcGVyXCIsZS5TTElERV9JTkZPPVwiYWxpY2UtY2Fyb3VzZWxfX3NsaWRlLWluZm9cIixlLlNMSURFX0lORk9fSVRFTT1cImFsaWNlLWNhcm91c2VsX19zbGlkZS1pbmZvLWl0ZW1cIixlLkJVVFRPTl9QUkVWPVwiYWxpY2UtY2Fyb3VzZWxfX3ByZXYtYnRuXCIsZS5CVVRUT05fUFJFVl9XUkFQUEVSPVwiYWxpY2UtY2Fyb3VzZWxfX3ByZXYtYnRuLXdyYXBwZXJcIixlLkJVVFRPTl9QUkVWX0lURU09XCJhbGljZS1jYXJvdXNlbF9fcHJldi1idG4taXRlbVwiLGUuQlVUVE9OX05FWFQ9XCJhbGljZS1jYXJvdXNlbF9fbmV4dC1idG5cIixlLkJVVFRPTl9ORVhUX1dSQVBQRVI9XCJhbGljZS1jYXJvdXNlbF9fbmV4dC1idG4td3JhcHBlclwiLGUuQlVUVE9OX05FWFRfSVRFTT1cImFsaWNlLWNhcm91c2VsX19uZXh0LWJ0bi1pdGVtXCJ9KENsYXNzbmFtZXM9ZXhwb3J0cy5DbGFzc25hbWVzfHwoZXhwb3J0cy5DbGFzc25hbWVzPXt9KSksZnVuY3Rpb24oZSl7ZS5BQ1RJVkU9XCJfX2FjdGl2ZVwiLGUuSU5BQ1RJVkU9XCJfX2luYWN0aXZlXCIsZS5DTE9ORUQ9XCJfX2Nsb25lZFwiLGUuQ1VTVE9NPVwiX19jdXN0b21cIixlLlBBVVNFPVwiX19wYXVzZVwiLGUuU0VQQVJBVE9SPVwiX19zZXBhcmF0b3JcIixlLlNTUj1cIl9fc3NyXCIsZS5UQVJHRVQ9XCJfX3RhcmdldFwifShNb2RpZmllcnM9ZXhwb3J0cy5Nb2RpZmllcnN8fChleHBvcnRzLk1vZGlmaWVycz17fSkpOyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuZGVmYXVsdFByb3BzPXZvaWQgMDt2YXIgdHlwZXNfMT1yZXF1aXJlKFwiLi90eXBlc1wiKTtleHBvcnRzLmRlZmF1bHRQcm9wcz17YWN0aXZlSW5kZXg6MCxhbmltYXRpb25EdXJhdGlvbjo0MDAsYW5pbWF0aW9uRWFzaW5nRnVuY3Rpb246XCJlYXNlXCIsYW5pbWF0aW9uVHlwZTp0eXBlc18xLkFuaW1hdGlvblR5cGUuU0xJREUsYXV0b0hlaWdodDohMSxhdXRvV2lkdGg6ITEsYXV0b1BsYXk6ITEsYXV0b1BsYXlDb250cm9sczohMSxhdXRvUGxheURpcmVjdGlvbjp0eXBlc18xLkF1dG9wbGF5RGlyZWN0aW9uLkxUUixhdXRvUGxheUludGVydmFsOjQwMCxhdXRvUGxheVN0cmF0ZWd5OnR5cGVzXzEuQXV0b1BsYXlTdHJhdGVneS5ERUZBVUxULGNoaWxkcmVuOnZvaWQgMCxjb250cm9sc1N0cmF0ZWd5OnR5cGVzXzEuQ29udHJvbHNTdHJhdGVneS5ERUZBVUxULGRpc2FibGVCdXR0b25zQ29udHJvbHM6ITEsZGlzYWJsZURvdHNDb250cm9sczohMSxkaXNhYmxlU2xpZGVJbmZvOiEwLGluZmluaXRlOiExLGlubmVyV2lkdGg6dm9pZCAwLGl0ZW1zOnZvaWQgMCxrZXlib2FyZE5hdmlnYXRpb246ITEsbW91c2VUcmFja2luZzohMSxuYW1lOlwiXCIscGFkZGluZ0xlZnQ6MCxwYWRkaW5nUmlnaHQ6MCxyZXNwb25zaXZlOnZvaWQgMCxzd2lwZURlbHRhOjIwLHN3aXBlRXh0cmFQYWRkaW5nOjIwMCxzc3JTaWxlbnRNb2RlOiEwLHRvdWNoVHJhY2tpbmc6ITAsdG91Y2hNb3ZlRGVmYXVsdEV2ZW50czohMCxvbkluaXRpYWxpemVkOmZ1bmN0aW9uKCl7fSxvblJlc2l6ZWQ6ZnVuY3Rpb24oKXt9LG9uUmVzaXplRXZlbnQ6dm9pZCAwLG9uU2xpZGVDaGFuZ2U6ZnVuY3Rpb24oKXt9LG9uU2xpZGVDaGFuZ2VkOmZ1bmN0aW9uKCl7fX07IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9fYXNzaWduPWZ1bmN0aW9uKCl7cmV0dXJuKF9fYXNzaWduPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKG8pe2Zvcih2YXIgdCxyPTEsaT1hcmd1bWVudHMubGVuZ3RoO3I8aTtyKyspZm9yKHZhciBzIGluIHQ9YXJndW1lbnRzW3JdKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LHMpJiYob1tzXT10W3NdKTtyZXR1cm4gb30pLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0sbWFwUGFydGlhbENvb3Jkcz0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0cy5tYXBQb3NpdGlvbkNvb3Jkcz1leHBvcnRzLm1hcFBhcnRpYWxDb29yZHM9dm9pZCAwLGZ1bmN0aW9uKG8pe3JldHVybiBvLm1hcChmdW5jdGlvbihvKXtyZXR1cm57d2lkdGg6by53aWR0aCxwb3NpdGlvbjowfX0pfSksbWFwUG9zaXRpb25Db29yZHM9KGV4cG9ydHMubWFwUGFydGlhbENvb3Jkcz1tYXBQYXJ0aWFsQ29vcmRzLGZ1bmN0aW9uKG8sdCl7cmV0dXJuIHZvaWQgMD09PXQmJih0PTApLG8ubWFwKGZ1bmN0aW9uKG8pe3JldHVybiBvLnBvc2l0aW9uPnQ/X19hc3NpZ24oX19hc3NpZ24oe30sbykse3Bvc2l0aW9uOnR9KTpvfSl9KTtleHBvcnRzLm1hcFBvc2l0aW9uQ29vcmRzPW1hcFBvc2l0aW9uQ29vcmRzOyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuaXNWZXJ0aWNhbFRvdWNobW92ZURldGVjdGVkPWV4cG9ydHMuZ2V0RmFkZW91dEFuaW1hdGlvblBvc2l0aW9uPWV4cG9ydHMuZ2V0RmFkZW91dEFuaW1hdGlvbkluZGV4PWV4cG9ydHMuZ2V0U3dpcGVUb3VjaGVuZEluZGV4PWV4cG9ydHMuZ2V0U3dpcGVUb3VjaGVuZFBvc2l0aW9uPWV4cG9ydHMuZ2V0U3dpcGVUcmFuc2Zvcm1hdGlvbkN1cnNvcj1leHBvcnRzLmdldFRyYW5zZm9ybWF0aW9uSXRlbUluZGV4PWV4cG9ydHMuZ2V0U3dpcGVTaGlmdFZhbHVlPWV4cG9ydHMuZ2V0SXRlbUNvb3Jkcz1leHBvcnRzLmdldElzTGVmdERpcmVjdGlvbj1leHBvcnRzLnNob3VsZFJlY2FsY3VsYXRlU3dpcGVQb3NpdGlvbj1leHBvcnRzLmdldFN3aXBlTGltaXRNYXg9ZXhwb3J0cy5nZXRTd2lwZUxpbWl0TWluPWV4cG9ydHMuc2hvdWxkQ2FuY2VsU2xpZGVBbmltYXRpb249ZXhwb3J0cy5zaG91bGRSZWNhbGN1bGF0ZVNsaWRlSW5kZXg9ZXhwb3J0cy5nZXRVcGRhdGVTbGlkZVBvc2l0aW9uSW5kZXg9ZXhwb3J0cy5nZXRBY3RpdmVJbmRleD1leHBvcnRzLmdldFN0YXJ0SW5kZXg9ZXhwb3J0cy5nZXRTaGlmdEluZGV4PXZvaWQgMDt2YXIgZ2V0U2hpZnRJbmRleD1mdW5jdGlvbihlLHQpe3JldHVybihlPXZvaWQgMD09PWU/MDplKSsodD12b2lkIDA9PT10PzA6dCl9LGdldFN0YXJ0SW5kZXg9KGV4cG9ydHMuZ2V0U2hpZnRJbmRleD1nZXRTaGlmdEluZGV4LGZ1bmN0aW9uKGUsdCl7aWYodm9pZCAwPT09ZSYmKGU9MCksdD12b2lkIDA9PT10PzA6dCl7aWYodDw9ZSlyZXR1cm4gdC0xO2lmKDA8ZSlyZXR1cm4gZX1yZXR1cm4gMH0pLGdldEFjdGl2ZUluZGV4PShleHBvcnRzLmdldFN0YXJ0SW5kZXg9Z2V0U3RhcnRJbmRleCxmdW5jdGlvbihlKXt2YXIgdD1lLnN0YXJ0SW5kZXgsdD12b2lkIDA9PT10PzA6dCxpPWUuaXRlbXNDb3VudCxlPWUuaW5maW5pdGU7cmV0dXJuIHZvaWQgMCE9PWUmJmU/dDooMCxleHBvcnRzLmdldFN0YXJ0SW5kZXgpKHQsdm9pZCAwPT09aT8wOmkpfSksZ2V0VXBkYXRlU2xpZGVQb3NpdGlvbkluZGV4PShleHBvcnRzLmdldEFjdGl2ZUluZGV4PWdldEFjdGl2ZUluZGV4LGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU8MD90LTE6dDw9ZT8wOmV9KSxzaG91bGRSZWNhbGN1bGF0ZVNsaWRlSW5kZXg9KGV4cG9ydHMuZ2V0VXBkYXRlU2xpZGVQb3NpdGlvbkluZGV4PWdldFVwZGF0ZVNsaWRlUG9zaXRpb25JbmRleCxmdW5jdGlvbihlLHQpe3JldHVybiBlPDB8fHQ8PWV9KSxzaG91bGRDYW5jZWxTbGlkZUFuaW1hdGlvbj0oZXhwb3J0cy5zaG91bGRSZWNhbGN1bGF0ZVNsaWRlSW5kZXg9c2hvdWxkUmVjYWxjdWxhdGVTbGlkZUluZGV4LGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU8MHx8dDw9ZX0pLGdldFN3aXBlTGltaXRNaW49KGV4cG9ydHMuc2hvdWxkQ2FuY2VsU2xpZGVBbmltYXRpb249c2hvdWxkQ2FuY2VsU2xpZGVBbmltYXRpb24sZnVuY3Rpb24oZSx0KXt2YXIgaT1lLml0ZW1zT2Zmc2V0LGU9ZS50cmFuc2Zvcm1hdGlvblNldCxlPXZvaWQgMD09PWU/W106ZSxvPXQuaW5maW5pdGUsdD10LnN3aXBlRXh0cmFQYWRkaW5nO3JldHVybiBvPyhlW3ZvaWQgMD09PWk/MDppXXx8e30pLnBvc2l0aW9uOihvPShlWzBdfHx7fSkud2lkdGgsTWF0aC5taW4odm9pZCAwPT09dD8wOnQsdm9pZCAwPT09bz8wOm8pKX0pLGdldFN3aXBlTGltaXRNYXg9KGV4cG9ydHMuZ2V0U3dpcGVMaW1pdE1pbj1nZXRTd2lwZUxpbWl0TWluLGZ1bmN0aW9uKGUsdCl7dmFyIGk9dC5pbmZpbml0ZSx0PXQuc3dpcGVFeHRyYVBhZGRpbmcsdD12b2lkIDA9PT10PzA6dCxvPWUuaXRlbXNDb3VudCxuPWUuaXRlbXNPZmZzZXQscj1lLml0ZW1zSW5TbGlkZSxyPXZvaWQgMD09PXI/MTpyLGU9ZS50cmFuc2Zvcm1hdGlvblNldCxlPXZvaWQgMD09PWU/W106ZTtyZXR1cm4gaT8oZVsodm9pZCAwPT09bz8xOm8pKygwLGV4cG9ydHMuZ2V0U2hpZnRJbmRleCkocix2b2lkIDA9PT1uPzA6bildfHx7fSkucG9zaXRpb258fDA6KDAsZXhwb3J0cy5nZXRJdGVtQ29vcmRzKSgtcixlKS5wb3NpdGlvbit0fSksc2hvdWxkUmVjYWxjdWxhdGVTd2lwZVBvc2l0aW9uPShleHBvcnRzLmdldFN3aXBlTGltaXRNYXg9Z2V0U3dpcGVMaW1pdE1heCxmdW5jdGlvbihlLHQsaSl7cmV0dXJuLXQ8PWV8fE1hdGguYWJzKGUpPj1pfSksZ2V0SXNMZWZ0RGlyZWN0aW9uPShleHBvcnRzLnNob3VsZFJlY2FsY3VsYXRlU3dpcGVQb3NpdGlvbj1zaG91bGRSZWNhbGN1bGF0ZVN3aXBlUG9zaXRpb24sZnVuY3Rpb24oZSl7cmV0dXJuKGU9dm9pZCAwPT09ZT8wOmUpPDB9KSxnZXRJdGVtQ29vcmRzPShleHBvcnRzLmdldElzTGVmdERpcmVjdGlvbj1nZXRJc0xlZnREaXJlY3Rpb24sZnVuY3Rpb24oZSx0KXtyZXR1cm4odD12b2lkIDA9PT10P1tdOnQpLnNsaWNlKGU9dm9pZCAwPT09ZT8wOmUpWzBdfHx7cG9zaXRpb246MCx3aWR0aDowfX0pLGdldFN3aXBlU2hpZnRWYWx1ZT0oZXhwb3J0cy5nZXRJdGVtQ29vcmRzPWdldEl0ZW1Db29yZHMsZnVuY3Rpb24oZSx0KXtyZXR1cm4gdm9pZCAwPT09ZSYmKGU9MCksdm9pZCAwPT09dCYmKHQ9W10pLCgwLGV4cG9ydHMuZ2V0SXRlbUNvb3JkcykoZSx0KS5wb3NpdGlvbn0pLGdldFRyYW5zZm9ybWF0aW9uSXRlbUluZGV4PShleHBvcnRzLmdldFN3aXBlU2hpZnRWYWx1ZT1nZXRTd2lwZVNoaWZ0VmFsdWUsZnVuY3Rpb24oZSx0KXtyZXR1cm4gdm9pZCAwPT09dCYmKHQ9MCksKGU9dm9pZCAwPT09ZT9bXTplKS5maW5kSW5kZXgoZnVuY3Rpb24oZSl7cmV0dXJuIGUucG9zaXRpb24+PU1hdGguYWJzKHQpfSl9KSxnZXRTd2lwZVRyYW5zZm9ybWF0aW9uQ3Vyc29yPShleHBvcnRzLmdldFRyYW5zZm9ybWF0aW9uSXRlbUluZGV4PWdldFRyYW5zZm9ybWF0aW9uSXRlbUluZGV4LGZ1bmN0aW9uKGUsdCxpKXt2b2lkIDA9PT1lJiYoZT1bXSksdm9pZCAwPT09dCYmKHQ9MCksdm9pZCAwPT09aSYmKGk9MCk7ZT0oMCxleHBvcnRzLmdldFRyYW5zZm9ybWF0aW9uSXRlbUluZGV4KShlLHQpO3JldHVybigwLGV4cG9ydHMuZ2V0SXNMZWZ0RGlyZWN0aW9uKShpKT9lOmUtMX0pLGdldFN3aXBlVG91Y2hlbmRQb3NpdGlvbj0oZXhwb3J0cy5nZXRTd2lwZVRyYW5zZm9ybWF0aW9uQ3Vyc29yPWdldFN3aXBlVHJhbnNmb3JtYXRpb25DdXJzb3IsZnVuY3Rpb24oZSx0LGkpe3ZvaWQgMD09PWkmJihpPTApO3ZhciBvPWUuaW5maW5pdGUsbj1lLmF1dG9XaWR0aCxyPWUuaXNTdGFnZUNvbnRlbnRQYXJ0aWFsLHM9ZS5zd2lwZUFsbG93ZWRQb3NpdGlvbk1heCxlPWUudHJhbnNmb3JtYXRpb25TZXQsaT0oMCxleHBvcnRzLmdldFN3aXBlVHJhbnNmb3JtYXRpb25DdXJzb3IpKGUsaSx0KSx0PSgwLGV4cG9ydHMuZ2V0SXRlbUNvb3JkcykoaSxlKS5wb3NpdGlvbjtpZighbyl7aWYobiYmcilyZXR1cm4gMDtpZihzPHQpcmV0dXJuLXN9cmV0dXJuLXR9KSxnZXRTd2lwZVRvdWNoZW5kSW5kZXg9KGV4cG9ydHMuZ2V0U3dpcGVUb3VjaGVuZFBvc2l0aW9uPWdldFN3aXBlVG91Y2hlbmRQb3NpdGlvbixmdW5jdGlvbihlLHQpe3ZhciBpPXQudHJhbnNmb3JtYXRpb25TZXQsbz10Lml0ZW1zSW5TbGlkZSxuPXQuaXRlbXNPZmZzZXQscj10Lml0ZW1zQ291bnQscz10LmluZmluaXRlLGQ9dC5pc1N0YWdlQ29udGVudFBhcnRpYWwsYT10LmFjdGl2ZUluZGV4LHQ9dC50cmFuc2xhdGUzZDtyZXR1cm4gc3x8IWQmJnQhPT1NYXRoLmFicyhlKT8oZD0oMCxleHBvcnRzLmdldFRyYW5zZm9ybWF0aW9uSXRlbUluZGV4KShpLGUpLHM/ZDwodD0oMCxleHBvcnRzLmdldFNoaWZ0SW5kZXgpKG8sbikpP3Itby1uK2Q6dCtyPD1kP2QtKHQrcik6ZC10OmQpOmF9KSxnZXRGYWRlb3V0QW5pbWF0aW9uSW5kZXg9KGV4cG9ydHMuZ2V0U3dpcGVUb3VjaGVuZEluZGV4PWdldFN3aXBlVG91Y2hlbmRJbmRleCxmdW5jdGlvbihlKXt2YXIgdD1lLmluZmluaXRlLGk9ZS5hY3RpdmVJbmRleCxlPWUuaXRlbXNJblNsaWRlO3JldHVybiB0P2krZTppfSksZ2V0RmFkZW91dEFuaW1hdGlvblBvc2l0aW9uPShleHBvcnRzLmdldEZhZGVvdXRBbmltYXRpb25JbmRleD1nZXRGYWRlb3V0QW5pbWF0aW9uSW5kZXgsZnVuY3Rpb24oZSx0KXt2YXIgaT10LmFjdGl2ZUluZGV4LHQ9dC5zdGFnZVdpZHRoO3JldHVybiBlPGk/KGktZSkqLXR8fDA6KGUtaSkqdHx8MH0pLGlzVmVydGljYWxUb3VjaG1vdmVEZXRlY3RlZD0oZXhwb3J0cy5nZXRGYWRlb3V0QW5pbWF0aW9uUG9zaXRpb249Z2V0RmFkZW91dEFuaW1hdGlvblBvc2l0aW9uLGZ1bmN0aW9uKGUsdCxpKXtyZXR1cm4gZTwoaT12b2lkIDA9PT1pPzA6aSl8fGU8LjEqdH0pO2V4cG9ydHMuaXNWZXJ0aWNhbFRvdWNobW92ZURldGVjdGVkPWlzVmVydGljYWxUb3VjaG1vdmVEZXRlY3RlZDsiLCJcInVzZSBzdHJpY3RcIjt2YXIgX19hc3NpZ249ZnVuY3Rpb24oKXtyZXR1cm4oX19hc3NpZ249T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odCl7Zm9yKHZhciBlLHI9MSxuPWFyZ3VtZW50cy5sZW5ndGg7cjxuO3IrKylmb3IodmFyIG8gaW4gZT1hcmd1bWVudHNbcl0pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsbykmJih0W29dPWVbb10pO3JldHVybiB0fSkuYXBwbHkodGhpcyxhcmd1bWVudHMpfSxjb21tb25fMT0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0cy5nZXRUcmFuc2Zvcm1NYXRyaXg9ZXhwb3J0cy5nZXRUcmFuc2xhdGVYUHJvcGVydHk9ZXhwb3J0cy5nZXRUb3VjaG1vdmVUcmFuc2xhdGVQb3NpdGlvbj1leHBvcnRzLmdldFRyYW5zbGF0ZTNkUHJvcGVydHk9ZXhwb3J0cy5nZXRSZW5kZXJTdGFnZUl0ZW1TdHlsZXM9ZXhwb3J0cy5nZXRSZW5kZXJTdGFnZVN0eWxlcz1leHBvcnRzLmdldFRyYW5zaXRpb25Qcm9wZXJ0eT1leHBvcnRzLmdldFJlbmRlcldyYXBwZXJTdHlsZXM9ZXhwb3J0cy5hbmltYXRlPWV4cG9ydHMuc2hvdWxkSGFuZGxlUmVzaXplRXZlbnQ9ZXhwb3J0cy5nZXRFbGVtZW50Rmlyc3RDaGlsZD1leHBvcnRzLmdldEVsZW1lbnRDdXJzb3I9ZXhwb3J0cy5nZXRBdXRvaGVpZ2h0UHJvcGVydHk9ZXhwb3J0cy5nZXRFbGVtZW50RGltZW5zaW9ucz1leHBvcnRzLmdldEl0ZW1XaWR0aD1leHBvcnRzLmNyZWF0ZURlZmF1bHRUcmFuc2Zvcm1hdGlvblNldD1leHBvcnRzLmNyZWF0ZUF1dG93aWR0aFRyYW5zZm9ybWF0aW9uU2V0PWV4cG9ydHMuaXNFbGVtZW50PWV4cG9ydHMuY3JlYXRlQ2xvbmVzPWV4cG9ydHMuZ2V0SXRlbXNPZmZzZXQ9ZXhwb3J0cy5nZXRJdGVtc0NvdW50PWV4cG9ydHMuZ2V0U2xpZGVzPXZvaWQgMCxyZXF1aXJlKFwiLi9jb21tb25cIikpLG1hcHBlcnNfMT1yZXF1aXJlKFwiLi9tYXBwZXJzXCIpLG1hdGhfMT1yZXF1aXJlKFwiLi9tYXRoXCIpLGdldFNsaWRlcz1mdW5jdGlvbih0KXt2YXIgZT10LmNoaWxkcmVuLHQ9dC5pdGVtcztyZXR1cm4gZT9lLmxlbmd0aD9lOltlXTp2b2lkIDA9PT10P1tdOnR9LGdldEl0ZW1zQ291bnQ9KGV4cG9ydHMuZ2V0U2xpZGVzPWdldFNsaWRlcyxmdW5jdGlvbih0KXtyZXR1cm4oMCxleHBvcnRzLmdldFNsaWRlcykodCkubGVuZ3RofSksZ2V0SXRlbXNPZmZzZXQ9KGV4cG9ydHMuZ2V0SXRlbXNDb3VudD1nZXRJdGVtc0NvdW50LGZ1bmN0aW9uKHQpe3ZhciBlPXQuaW5maW5pdGUscj10LnBhZGRpbmdSaWdodCx0PXQucGFkZGluZ0xlZnQ7cmV0dXJuIGUmJih0fHxyKT8xOjB9KSxjcmVhdGVDbG9uZXM9KGV4cG9ydHMuZ2V0SXRlbXNPZmZzZXQ9Z2V0SXRlbXNPZmZzZXQsZnVuY3Rpb24odCl7dmFyIGUscixuLG8saT0oMCxleHBvcnRzLmdldFNsaWRlcykodCk7cmV0dXJuIHQuaW5maW5pdGU/KGU9KDAsZXhwb3J0cy5nZXRJdGVtc0NvdW50KSh0KSxvPSgwLGV4cG9ydHMuZ2V0SXRlbXNPZmZzZXQpKHQpLHQ9KDAsY29tbW9uXzEuZ2V0SXRlbXNJblNsaWRlKShlLHQpLG49TWF0aC5taW4odCxlKStvLHI9aS5zbGljZSgwLG4pLG49aS5zbGljZSgtbiksbyYmdD09PWUmJihvPWlbMF0sdD1pLnNsaWNlKC0xKVswXSxuLnVuc2hpZnQodCksci5wdXNoKG8pKSxuLmNvbmNhdChpLHIpKTppfSksaXNFbGVtZW50PShleHBvcnRzLmNyZWF0ZUNsb25lcz1jcmVhdGVDbG9uZXMsZnVuY3Rpb24odCl7dHJ5e3JldHVybiB0IGluc3RhbmNlb2YgRWxlbWVudHx8dCBpbnN0YW5jZW9mIEhUTUxEb2N1bWVudH1jYXRjaCh0KXtyZXR1cm4hMX19KSxjcmVhdGVBdXRvd2lkdGhUcmFuc2Zvcm1hdGlvblNldD0oZXhwb3J0cy5pc0VsZW1lbnQ9aXNFbGVtZW50LGZ1bmN0aW9uKHQsaSxlKXt2b2lkIDA9PT1pJiYoaT0wKSx2b2lkIDA9PT1lJiYoZT0hMSk7dmFyIHM9MCxhPSEwLHI9W107cmV0dXJuKDAsZXhwb3J0cy5pc0VsZW1lbnQpKHQpJiYocj1BcnJheS5mcm9tKChudWxsPT10P3ZvaWQgMDp0LmNoaWxkcmVuKXx8W10pLnJlZHVjZShmdW5jdGlvbih0LGUscil7dmFyIG49MCxyPXItMSxvPXRbcl0sZT1nZXRFbGVtZW50RGltZW5zaW9ucyhudWxsPT1lP3ZvaWQgMDplLmZpcnN0Q2hpbGQpLndpZHRoLGU9dm9pZCAwPT09ZT8wOmU7cmV0dXJuIGE9KHMrPWUpPD1pLG8mJihuPTA9PXI/by53aWR0aDpvLndpZHRoK28ucG9zaXRpb24pLHQucHVzaCh7cG9zaXRpb246bix3aWR0aDplfSksdH0sW10pLGV8fChyPWE/KDAsbWFwcGVyc18xLm1hcFBhcnRpYWxDb29yZHMpKHIpOih0PXMtaSwoMCxtYXBwZXJzXzEubWFwUG9zaXRpb25Db29yZHMpKHIsdCkpKSkse2Nvb3JkczpyLGNvbnRlbnQ6cyxwYXJ0aWFsOmF9fSksY3JlYXRlRGVmYXVsdFRyYW5zZm9ybWF0aW9uU2V0PShleHBvcnRzLmNyZWF0ZUF1dG93aWR0aFRyYW5zZm9ybWF0aW9uU2V0PWNyZWF0ZUF1dG93aWR0aFRyYW5zZm9ybWF0aW9uU2V0LGZ1bmN0aW9uKHQsbyxlLHIpe3ZvaWQgMD09PXImJihyPSExKTt2YXIgaT0wLHM9ITAsbj1bXSxhPSgwLGV4cG9ydHMuZ2V0SXRlbVdpZHRoKShvLGUpO3JldHVybiBuPXQucmVkdWNlKGZ1bmN0aW9uKHQsZSxyKXt2YXIgbj0wLHI9dFtyLTFdO3JldHVybiBzPShpKz1hKTw9byxyJiYobj1hK3IucG9zaXRpb258fDApLHQucHVzaCh7d2lkdGg6YSxwb3NpdGlvbjpufSksdH0sW10pLHtjb29yZHM6bj1yP246cz8oMCxtYXBwZXJzXzEubWFwUGFydGlhbENvb3Jkcykobik6KGU9aS1vLCgwLG1hcHBlcnNfMS5tYXBQb3NpdGlvbkNvb3JkcykobixlKSksY29udGVudDppLHBhcnRpYWw6c319KSxnZXRJdGVtV2lkdGg9KGV4cG9ydHMuY3JlYXRlRGVmYXVsdFRyYW5zZm9ybWF0aW9uU2V0PWNyZWF0ZURlZmF1bHRUcmFuc2Zvcm1hdGlvblNldCxmdW5jdGlvbih0LGUpe3JldHVybiAwPGU/dC9lOnR9KTtmdW5jdGlvbiBnZXRFbGVtZW50RGltZW5zaW9ucyh0KXtyZXR1cm4gdCYmdC5nZXRCb3VuZGluZ0NsaWVudFJlY3Q/e3dpZHRoOih0PXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpLndpZHRoLGhlaWdodDp0LmhlaWdodH06e3dpZHRoOjAsaGVpZ2h0OjB9fWV4cG9ydHMuZ2V0SXRlbVdpZHRoPWdldEl0ZW1XaWR0aCxleHBvcnRzLmdldEVsZW1lbnREaW1lbnNpb25zPWdldEVsZW1lbnREaW1lbnNpb25zO3ZhciBnZXRBdXRvaGVpZ2h0UHJvcGVydHk9ZnVuY3Rpb24odCxlLHIpe3ZhciBlPSgwLGV4cG9ydHMuZ2V0RWxlbWVudEN1cnNvcikoZSxyKSxyPSgwLGV4cG9ydHMuZ2V0RWxlbWVudEZpcnN0Q2hpbGQpKHQsZSk7aWYoKDAsZXhwb3J0cy5pc0VsZW1lbnQpKHIpKXJldHVybiB0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIpLGU9cGFyc2VGbG9hdCh0Lm1hcmdpblRvcCksdD1wYXJzZUZsb2F0KHQubWFyZ2luQm90dG9tKSxNYXRoLmNlaWwoci5vZmZzZXRIZWlnaHQrZSt0KX0sZ2V0RWxlbWVudEN1cnNvcj0oZXhwb3J0cy5nZXRBdXRvaGVpZ2h0UHJvcGVydHk9Z2V0QXV0b2hlaWdodFByb3BlcnR5LGZ1bmN0aW9uKHQsZSl7dmFyIHI9ZS5hY3RpdmVJbmRleCxlPWUuaXRlbXNJblNsaWRlO3JldHVybiB0LmluZmluaXRlP3IrZSsoMCxleHBvcnRzLmdldEl0ZW1zT2Zmc2V0KSh0KTpyfSksZ2V0RWxlbWVudEZpcnN0Q2hpbGQ9KGV4cG9ydHMuZ2V0RWxlbWVudEN1cnNvcj1nZXRFbGVtZW50Q3Vyc29yLGZ1bmN0aW9uKHQsZSl7dD10JiZ0LmNoaWxkcmVufHxbXTtyZXR1cm4gdFtlXSYmdFtlXS5maXJzdENoaWxkfHxudWxsfSk7ZnVuY3Rpb24gc2hvdWxkSGFuZGxlUmVzaXplRXZlbnQodCxlLHIpe3JldHVybihlPXZvaWQgMD09PWU/e306ZSkud2lkdGghPT0ocj12b2lkIDA9PT1yP3t9OnIpLndpZHRofWZ1bmN0aW9uIGFuaW1hdGUodCxlKXt2YXIgZT1lfHx7fSxyPWUucG9zaXRpb24scj12b2lkIDA9PT1yPzA6cixuPWUuYW5pbWF0aW9uRHVyYXRpb24sbj12b2lkIDA9PT1uPzA6bixlPWUuYW5pbWF0aW9uRWFzaW5nRnVuY3Rpb24sZT12b2lkIDA9PT1lP1wiZWFzZVwiOmU7cmV0dXJuIHQmJigwLGV4cG9ydHMuaXNFbGVtZW50KSh0KSYmKHQuc3R5bGUudHJhbnNpdGlvbj1cInRyYW5zZm9ybSBcIi5jb25jYXQobixcIm1zIFwiKS5jb25jYXQoZSxcIiAwbXNcIiksdC5zdHlsZS50cmFuc2Zvcm09XCJ0cmFuc2xhdGUzZChcIi5jb25jYXQocixcInB4LCAwLCAwKVwiKSksdH1leHBvcnRzLmdldEVsZW1lbnRGaXJzdENoaWxkPWdldEVsZW1lbnRGaXJzdENoaWxkLGV4cG9ydHMuc2hvdWxkSGFuZGxlUmVzaXplRXZlbnQ9c2hvdWxkSGFuZGxlUmVzaXplRXZlbnQsZXhwb3J0cy5hbmltYXRlPWFuaW1hdGU7dmFyIGdldFJlbmRlcldyYXBwZXJTdHlsZXM9ZnVuY3Rpb24odCxlLHIpe3ZhciBuPXR8fHt9LG89bi5wYWRkaW5nTGVmdCxpPW4ucGFkZGluZ1JpZ2h0LHM9bi5hdXRvSGVpZ2h0LG49bi5hbmltYXRpb25EdXJhdGlvbixzPXM/KDAsZXhwb3J0cy5nZXRBdXRvaGVpZ2h0UHJvcGVydHkpKHIsdCxlKTp2b2lkIDA7cmV0dXJue2hlaWdodDpzLHRyYW5zaXRpb246cz9cImhlaWdodCBcIi5jb25jYXQobixcIm1zXCIpOnZvaWQgMCxwYWRkaW5nTGVmdDpcIlwiLmNvbmNhdChvLFwicHhcIikscGFkZGluZ1JpZ2h0OlwiXCIuY29uY2F0KGksXCJweFwiKX19LGdldFRyYW5zaXRpb25Qcm9wZXJ0eT0oZXhwb3J0cy5nZXRSZW5kZXJXcmFwcGVyU3R5bGVzPWdldFJlbmRlcldyYXBwZXJTdHlsZXMsZnVuY3Rpb24odCl7dmFyIHQ9dHx8e30sZT10LmFuaW1hdGlvbkR1cmF0aW9uLHQ9dC5hbmltYXRpb25FYXNpbmdGdW5jdGlvbix0PXZvaWQgMD09PXQ/XCJlYXNlXCI6dDtyZXR1cm5cInRyYW5zZm9ybSBcIi5jb25jYXQodm9pZCAwPT09ZT8wOmUsXCJtcyBcIikuY29uY2F0KHQsXCIgMG1zXCIpfSksZ2V0UmVuZGVyU3RhZ2VTdHlsZXM9KGV4cG9ydHMuZ2V0VHJhbnNpdGlvblByb3BlcnR5PWdldFRyYW5zaXRpb25Qcm9wZXJ0eSxmdW5jdGlvbih0LGUpe3Q9KHR8fHt9KS50cmFuc2xhdGUzZCx0PVwidHJhbnNsYXRlM2QoXCIuY29uY2F0KC0odm9pZCAwPT09dD8wOnQpLFwicHgsIDAsIDApXCIpO3JldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSxlKSx7dHJhbnNmb3JtOnR9KX0pLGdldFJlbmRlclN0YWdlSXRlbVN0eWxlcz0oZXhwb3J0cy5nZXRSZW5kZXJTdGFnZVN0eWxlcz1nZXRSZW5kZXJTdGFnZVN0eWxlcyxmdW5jdGlvbih0LGUpe3ZhciByPWUudHJhbnNmb3JtYXRpb25TZXQsbj1lLmZhZGVvdXRBbmltYXRpb25JbmRleCxvPWUuZmFkZW91dEFuaW1hdGlvblBvc2l0aW9uLGk9ZS5mYWRlb3V0QW5pbWF0aW9uUHJvY2Vzc2luZyxlPWUuYW5pbWF0aW9uRHVyYXRpb24scj0oclt0XXx8e30pLndpZHRoO3JldHVybiBpJiZuPT09dD97dHJhbnNmb3JtOlwidHJhbnNsYXRlWChcIi5jb25jYXQobyxcInB4KVwiKSxhbmltYXRpb25EdXJhdGlvbjpcIlwiLmNvbmNhdChlLFwibXNcIiksd2lkdGg6XCJcIi5jb25jYXQocixcInB4XCIpfTp7d2lkdGg6cn19KSxnZXRUcmFuc2xhdGUzZFByb3BlcnR5PShleHBvcnRzLmdldFJlbmRlclN0YWdlSXRlbVN0eWxlcz1nZXRSZW5kZXJTdGFnZUl0ZW1TdHlsZXMsZnVuY3Rpb24odCxlKXt2YXIgcj10LG49ZS5pbmZpbml0ZSxvPWUuaXRlbXNPZmZzZXQsaT1lLml0ZW1zSW5TbGlkZSxlPWUudHJhbnNmb3JtYXRpb25TZXQ7cmV0dXJuKCh2b2lkIDA9PT1lP1tdOmUpW3I9bj90KygwLG1hdGhfMS5nZXRTaGlmdEluZGV4KSh2b2lkIDA9PT1pPzA6aSx2b2lkIDA9PT1vPzA6byk6cl18fHt9KS5wb3NpdGlvbnx8MH0pLGdldFRvdWNobW92ZVRyYW5zbGF0ZVBvc2l0aW9uPShleHBvcnRzLmdldFRyYW5zbGF0ZTNkUHJvcGVydHk9Z2V0VHJhbnNsYXRlM2RQcm9wZXJ0eSxmdW5jdGlvbih0LGUpe3JldHVybi0oZS1NYXRoLmZsb29yKHQpKX0pO2Z1bmN0aW9uIGdldFRyYW5zbGF0ZVhQcm9wZXJ0eSh0KXt0PWdldFRyYW5zZm9ybU1hdHJpeCh0KSx0PXQmJnRbNF18fFwiXCI7cmV0dXJuIE51bWJlcih0KX1mdW5jdGlvbiBnZXRUcmFuc2Zvcm1NYXRyaXgodCl7cmV0dXJuIHQmJigwLGV4cG9ydHMuaXNFbGVtZW50KSh0KSYmd2luZG93LmdldENvbXB1dGVkU3R5bGUodCkudHJhbnNmb3JtLm1hdGNoKC8oLT9bMC05Ll0rKS9nKXx8W119ZXhwb3J0cy5nZXRUb3VjaG1vdmVUcmFuc2xhdGVQb3NpdGlvbj1nZXRUb3VjaG1vdmVUcmFuc2xhdGVQb3NpdGlvbixleHBvcnRzLmdldFRyYW5zbGF0ZVhQcm9wZXJ0eT1nZXRUcmFuc2xhdGVYUHJvcGVydHksZXhwb3J0cy5nZXRUcmFuc2Zvcm1NYXRyaXg9Z2V0VHJhbnNmb3JtTWF0cml4OyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuY2FsY3VsYXRlSW5pdGlhbFN0YXRlPWV4cG9ydHMuZ2V0SXRlbXNJblNsaWRlPWV4cG9ydHMuZ2V0SXNTdGFnZUNvbnRlbnRQYXJ0aWFsPWV4cG9ydHMuY29uY2F0Q2xhc3NuYW1lcz1leHBvcnRzLmNhblVzZURPTT12b2lkIDA7dmFyIGVsZW1lbnRzXzE9cmVxdWlyZShcIi4vZWxlbWVudHNcIiksbWF0aF8xPXJlcXVpcmUoXCIuL21hdGhcIiksY2FuVXNlRE9NPWZ1bmN0aW9uKCl7dmFyIHQ7dHJ5e3JldHVybiBCb29sZWFuKG51bGw9PSh0PW51bGw9PT13aW5kb3d8fHZvaWQgMD09PXdpbmRvdz92b2lkIDA6d2luZG93LmRvY3VtZW50KT92b2lkIDA6dC5jcmVhdGVFbGVtZW50KX1jYXRjaCh0KXtyZXR1cm4hMX19LGNvbmNhdENsYXNzbmFtZXM9KGV4cG9ydHMuY2FuVXNlRE9NPWNhblVzZURPTSxmdW5jdGlvbigpe2Zvcih2YXIgdD1bXSxlPTA7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl0W2VdPWFyZ3VtZW50c1tlXTtyZXR1cm4gdC5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIil9KSxnZXRJc1N0YWdlQ29udGVudFBhcnRpYWw9KGV4cG9ydHMuY29uY2F0Q2xhc3NuYW1lcz1jb25jYXRDbGFzc25hbWVzLGZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdm9pZCAwPT09ZSYmKGU9MCksdm9pZCAwPT09biYmKG49MCksISh0PXZvaWQgMCE9PXQmJnQpJiZuPD1lfSksZ2V0SXRlbXNJblNsaWRlPShleHBvcnRzLmdldElzU3RhZ2VDb250ZW50UGFydGlhbD1nZXRJc1N0YWdlQ29udGVudFBhcnRpYWwsZnVuY3Rpb24obix0KXt2YXIgaSxhPTEsbz10LnJlc3BvbnNpdmUsZT10LmF1dG9XaWR0aCxzPXQuaW5maW5pdGUsdD10LmlubmVyV2lkdGg7cmV0dXJuIHZvaWQgMCE9PWUmJmU/dm9pZCAwIT09cyYmcz9uOmE6KG8mJihlPU9iamVjdC5rZXlzKG8pKS5sZW5ndGgmJih0fHwoMCxleHBvcnRzLmNhblVzZURPTSkoKSkmJihpPXZvaWQgMD09PXQ/d2luZG93LmlubmVyV2lkdGg6dCxlLmZvckVhY2goZnVuY3Rpb24odCl7dmFyIGU7TnVtYmVyKHQpPD1pJiYoZT0odD1vW3RdKS5pdGVtcyx0PXQuaXRlbXNGaXQsYT1cImNvbnRhaW5cIj09PSh2b2lkIDA9PT10P1wiZmlsbFwiOnQpP2U6TWF0aC5taW4oZSxuKSl9KSksYXx8MSl9KSxjYWxjdWxhdGVJbml0aWFsU3RhdGU9KGV4cG9ydHMuZ2V0SXRlbXNJblNsaWRlPWdldEl0ZW1zSW5TbGlkZSxmdW5jdGlvbih0LGUsbil7dm9pZCAwPT09biYmKG49ITEpO3ZhciBpLGEsbz10LmFuaW1hdGlvbkR1cmF0aW9uLG89dm9pZCAwPT09bz8wOm8scz10LmluZmluaXRlLHM9dm9pZCAwIT09cyYmcyxyPXQuYXV0b1BsYXkscj12b2lkIDAhPT1yJiZyLGw9dC5hdXRvV2lkdGgsbD12b2lkIDAhPT1sJiZsLG09KDAsZWxlbWVudHNfMS5jcmVhdGVDbG9uZXMpKHQpLGQ9KDAsZWxlbWVudHNfMS5nZXRUcmFuc2l0aW9uUHJvcGVydHkpKCksYz0oMCxlbGVtZW50c18xLmdldEl0ZW1zQ291bnQpKHQpLHU9KDAsZWxlbWVudHNfMS5nZXRJdGVtc09mZnNldCkodCksZj0oMCxleHBvcnRzLmdldEl0ZW1zSW5TbGlkZSkoYyx0KSxnPSgwLG1hdGhfMS5nZXRTdGFydEluZGV4KSh0LmFjdGl2ZUluZGV4LGMpLGc9KDAsbWF0aF8xLmdldEFjdGl2ZUluZGV4KSh7c3RhcnRJbmRleDpnLGl0ZW1zQ291bnQ6YyxpbmZpbml0ZTpzfSksST0oMCxlbGVtZW50c18xLmdldEVsZW1lbnREaW1lbnNpb25zKShlKS53aWR0aCxTPShhPShlPShsPyhpPShlPSgwLGVsZW1lbnRzXzEuY3JlYXRlQXV0b3dpZHRoVHJhbnNmb3JtYXRpb25TZXQpKGUsSSxzKSkuY29vcmRzLGE9ZS5jb250ZW50LGUpOihpPShlPSgwLGVsZW1lbnRzXzEuY3JlYXRlRGVmYXVsdFRyYW5zZm9ybWF0aW9uU2V0KShtLEksZixzKSkuY29vcmRzLGE9ZS5jb250ZW50LGUpKS5wYXJ0aWFsLGEpLCgwLG1hdGhfMS5nZXRJdGVtQ29vcmRzKSgtZixpPWkpLnBvc2l0aW9uKSxwPSgwLG1hdGhfMS5nZXRTd2lwZUxpbWl0TWluKSh7aXRlbXNPZmZzZXQ6dSx0cmFuc2Zvcm1hdGlvblNldDppfSx0KSx0PSgwLG1hdGhfMS5nZXRTd2lwZUxpbWl0TWF4KSh7aXRlbXNDb3VudDpjLGl0ZW1zT2Zmc2V0OnUsaXRlbXNJblNsaWRlOmYsdHJhbnNmb3JtYXRpb25TZXQ6aX0sdCksdj0oMCxtYXRoXzEuZ2V0U3dpcGVTaGlmdFZhbHVlKShjLGkpO3JldHVybnthY3RpdmVJbmRleDpnLGF1dG9XaWR0aDpsLGFuaW1hdGlvbkR1cmF0aW9uOm8sY2xvbmVzOm0saW5maW5pdGU6cyxpdGVtc0NvdW50OmMsaXRlbXNJblNsaWRlOmYsaXRlbXNPZmZzZXQ6dSx0cmFuc2xhdGUzZDooMCxlbGVtZW50c18xLmdldFRyYW5zbGF0ZTNkUHJvcGVydHkpKGcse2l0ZW1zSW5TbGlkZTpmLGl0ZW1zT2Zmc2V0OnUsdHJhbnNmb3JtYXRpb25TZXQ6aSxhdXRvV2lkdGg6bCxpbmZpbml0ZTpzfSksc3RhZ2VXaWR0aDpJLHN0YWdlQ29udGVudFdpZHRoOmEsaW5pdGlhbFN0YWdlSGVpZ2h0OjAsaXNTdGFnZUNvbnRlbnRQYXJ0aWFsOmUsaXNBdXRvUGxheWluZzpCb29sZWFuKHIpLGlzQXV0b1BsYXlDYW5jZWxlZE9uQWN0aW9uOiExLHRyYW5zZm9ybWF0aW9uU2V0OmksdHJhbnNpdGlvbjpkLGZhZGVvdXRBbmltYXRpb25JbmRleDpudWxsLGZhZGVvdXRBbmltYXRpb25Qb3NpdGlvbjpudWxsLGZhZGVvdXRBbmltYXRpb25Qcm9jZXNzaW5nOiExLHN3aXBlTGltaXRNaW46cCxzd2lwZUxpbWl0TWF4OnQsc3dpcGVBbGxvd2VkUG9zaXRpb25NYXg6Uyxzd2lwZVNoaWZ0VmFsdWU6dixjYW5Vc2VEb206bnx8KDAsZXhwb3J0cy5jYW5Vc2VET00pKCl9fSk7ZXhwb3J0cy5jYWxjdWxhdGVJbml0aWFsU3RhdGU9Y2FsY3VsYXRlSW5pdGlhbFN0YXRlOyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuaXNDbG9uZWRJdGVtPWV4cG9ydHMuaXNUYXJnZXRJdGVtPWV4cG9ydHMuaXNBY3RpdmVJdGVtPWV4cG9ydHMuZ2V0UmVuZGVyU3RhZ2VJdGVtQ2xhc3Nlcz12b2lkIDA7dmFyIHR5cGVzXzE9cmVxdWlyZShcIi4uL3R5cGVzXCIpLGNvbW1vbl8xPXJlcXVpcmUoXCIuL2NvbW1vblwiKSxtYXRoXzE9cmVxdWlyZShcIi4vbWF0aFwiKSxnZXRSZW5kZXJTdGFnZUl0ZW1DbGFzc2VzPWZ1bmN0aW9uKGUsdCl7dm9pZCAwPT09ZSYmKGU9MCk7dmFyIHM9dC5mYWRlb3V0QW5pbWF0aW9uSW5kZXgsaT0oMCxleHBvcnRzLmlzQWN0aXZlSXRlbSkoZSx0KT90eXBlc18xLk1vZGlmaWVycy5BQ1RJVkU6XCJcIixuPSgwLGV4cG9ydHMuaXNDbG9uZWRJdGVtKShlLHQpP3R5cGVzXzEuTW9kaWZpZXJzLkNMT05FRDpcIlwiLHQ9KDAsZXhwb3J0cy5pc1RhcmdldEl0ZW0pKGUsdCk/dHlwZXNfMS5Nb2RpZmllcnMuVEFSR0VUOlwiXCIsZT1lPT09cz90eXBlc18xLkNsYXNzbmFtZXMuQU5JTUFURUQ6XCJcIjtyZXR1cm4oMCxjb21tb25fMS5jb25jYXRDbGFzc25hbWVzKSh0eXBlc18xLkNsYXNzbmFtZXMuU1RBR0VfSVRFTSxpLG4sdCxlKX0saXNBY3RpdmVJdGVtPShleHBvcnRzLmdldFJlbmRlclN0YWdlSXRlbUNsYXNzZXM9Z2V0UmVuZGVyU3RhZ2VJdGVtQ2xhc3NlcyxmdW5jdGlvbihlLHQpe3ZvaWQgMD09PWUmJihlPTApO3ZhciBzPXQuYWN0aXZlSW5kZXgsaT10Lml0ZW1zSW5TbGlkZSxuPXQuaXRlbXNPZmZzZXQscj10LmluZmluaXRlLHQ9dC5hdXRvV2lkdGgsbz0oMCxtYXRoXzEuZ2V0U2hpZnRJbmRleCkoaSxuKTtyZXR1cm4gdCYmcj9lLW89PT1zK246KHQ9cytvLHI/dDw9ZSYmZTx0K2k6czw9ZSYmZTx0KX0pLGlzVGFyZ2V0SXRlbT0oZXhwb3J0cy5pc0FjdGl2ZUl0ZW09aXNBY3RpdmVJdGVtLGZ1bmN0aW9uKGUsdCl7dm9pZCAwPT09ZSYmKGU9MCk7dmFyIHM9dC5hY3RpdmVJbmRleCxpPXQuaXRlbXNJblNsaWRlLG49dC5pdGVtc09mZnNldCxyPXQuaW5maW5pdGUsdD10LmF1dG9XaWR0aCxpPSgwLG1hdGhfMS5nZXRTaGlmdEluZGV4KShpLG4pO3JldHVybiByP3QmJnI/ZS1pPT09cytuOmU9PT1zK2k6ZT09PXN9KSxpc0Nsb25lZEl0ZW09KGV4cG9ydHMuaXNUYXJnZXRJdGVtPWlzVGFyZ2V0SXRlbSxmdW5jdGlvbihlLHQpe3ZvaWQgMD09PWUmJihlPTApO3ZhciBzPXQuaXRlbXNJblNsaWRlLGk9dC5pdGVtc09mZnNldCxuPXQuaXRlbXNDb3VudCxyPXQuaW5maW5pdGUsdD10LmF1dG9XaWR0aDtyZXR1cm4hIXImJih0JiZyP2U8c3x8bi0xK3M8ZTplPCh0PSgwLG1hdGhfMS5nZXRTaGlmdEluZGV4KShzLGkpKXx8bi0xK3Q8ZSl9KTtleHBvcnRzLmlzQ2xvbmVkSXRlbT1pc0Nsb25lZEl0ZW07IiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZGVib3VuY2UobixpKXt2b2lkIDA9PT1pJiYoaT0wKTtmdW5jdGlvbiB1KCl7ZCYmKGNsZWFyVGltZW91dChkKSxkPXZvaWQgMCl9dmFyIGQ9dm9pZCAwO3JldHVybltmdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLG89W10sdD0wO3Q8YXJndW1lbnRzLmxlbmd0aDt0Kyspb1t0XT1hcmd1bWVudHNbdF07dSgpLGQ9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLmFwcGx5KGUsbyksZD12b2lkIDB9LGkpfSx1XX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxleHBvcnRzLmRlYm91bmNlPXZvaWQgMCxleHBvcnRzLmRlYm91bmNlPWRlYm91bmNlOyIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIGRlYnVnKCl7Zm9yKHZhciBlPVtdLG89MDtvPGFyZ3VtZW50cy5sZW5ndGg7bysrKWVbb109YXJndW1lbnRzW29dO1wiZGV2ZWxvcG1lbnRcIj09PXByb2Nlc3MuZW52Lk5PREVfRU5WJiZjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsZSl9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0cy5kZWJ1Zz12b2lkIDAsZXhwb3J0cy5kZWJ1Zz1kZWJ1ZzsiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxleHBvcnRzLmdldFNsaWRlSXRlbUluZm89ZXhwb3J0cy5nZXRTbGlkZUluZm89ZXhwb3J0cy5nZXRTbGlkZUluZGV4Rm9yTXVsdGlwbGVJdGVtcz1leHBvcnRzLmdldFNsaWRlSW5kZXhGb3JOb25NdWx0aXBsZUl0ZW1zPWV4cG9ydHMuZ2V0QWN0aXZlU2xpZGVEb3RzTGVuZ3RoPWV4cG9ydHMuZ2V0QWN0aXZlU2xpZGVJbmRleD12b2lkIDA7dmFyIGdldEFjdGl2ZVNsaWRlSW5kZXg9ZnVuY3Rpb24oZSx0KXt2YXIgdD10fHx7fSxpPXQuYWN0aXZlSW5kZXgsbz10Lml0ZW1zSW5TbGlkZSx0PXQuaXRlbXNDb3VudCxpPWkrbztyZXR1cm4gMT09PW8/KDAsZXhwb3J0cy5nZXRTbGlkZUluZGV4Rm9yTm9uTXVsdGlwbGVJdGVtcykoaSxvLHQpOigwLGV4cG9ydHMuZ2V0U2xpZGVJbmRleEZvck11bHRpcGxlSXRlbXMpKGksbyx0LGUpfSxnZXRBY3RpdmVTbGlkZURvdHNMZW5ndGg9KGV4cG9ydHMuZ2V0QWN0aXZlU2xpZGVJbmRleD1nZXRBY3RpdmVTbGlkZUluZGV4LGZ1bmN0aW9uKGUsdCl7dmFyIGk7cmV0dXJuIHZvaWQgMD09PXQmJih0PTEpLChlPXZvaWQgMD09PWU/MDplKSYmdD8oaT1NYXRoLmZsb29yKGUvdCksZSV0PT0wP2ktMTppKTowfSksZ2V0U2xpZGVJbmRleEZvck5vbk11bHRpcGxlSXRlbXM9KGV4cG9ydHMuZ2V0QWN0aXZlU2xpZGVEb3RzTGVuZ3RoPWdldEFjdGl2ZVNsaWRlRG90c0xlbmd0aCxmdW5jdGlvbihlLHQsaSl7cmV0dXJuIGU8dD9pLXQ6aTxlPzA6ZS0xfSksZ2V0U2xpZGVJbmRleEZvck11bHRpcGxlSXRlbXM9KGV4cG9ydHMuZ2V0U2xpZGVJbmRleEZvck5vbk11bHRpcGxlSXRlbXM9Z2V0U2xpZGVJbmRleEZvck5vbk11bHRpcGxlSXRlbXMsZnVuY3Rpb24oZSx0LGksbyl7dmFyIGw9KDAsZXhwb3J0cy5nZXRBY3RpdmVTbGlkZURvdHNMZW5ndGgpKGksdCk7cmV0dXJuIGU9PT1pK3Q/MDpvfHxlPHQmJjAhPT1lP2w6MD09PWU/aSV0PT0wP2w6bC0xOjA8dD9NYXRoLmZsb29yKGUvdCktMTowfSksZ2V0U2xpZGVJbmZvPShleHBvcnRzLmdldFNsaWRlSW5kZXhGb3JNdWx0aXBsZUl0ZW1zPWdldFNsaWRlSW5kZXhGb3JNdWx0aXBsZUl0ZW1zLGZ1bmN0aW9uKGUsdCl7dm9pZCAwPT09dCYmKHQ9MCk7ZT0oZT12b2lkIDA9PT1lPzA6ZSkrMTtyZXR1cm4gZTwxP2U9dDp0PGUmJihlPTEpLHtpdGVtOmUsaXRlbXNDb3VudDp0fX0pLGdldFNsaWRlSXRlbUluZm89KGV4cG9ydHMuZ2V0U2xpZGVJbmZvPWdldFNsaWRlSW5mbyxmdW5jdGlvbihlKXt2YXIgZT1lfHx7fSx0PWUuaXRlbXNJblNsaWRlLGk9ZS5hY3RpdmVJbmRleCxvPWUuaW5maW5pdGUsbD1lLml0ZW1zQ291bnQ7cmV0dXJuIGUuaXNTdGFnZUNvbnRlbnRQYXJ0aWFsP3tpc1ByZXZTbGlkZURpc2FibGVkOiEwLGlzTmV4dFNsaWRlRGlzYWJsZWQ6ITB9Ontpc1ByZXZTbGlkZURpc2FibGVkOiExPT09byYmMD09PWksaXNOZXh0U2xpZGVEaXNhYmxlZDohMT09PW8mJmwtdDw9aX19KTtleHBvcnRzLmdldFNsaWRlSXRlbUluZm89Z2V0U2xpZGVJdGVtSW5mbzsiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxleHBvcnRzLnNob3VsZENhbmNlbEF1dG9QbGF5T25Ib3Zlcj1leHBvcnRzLnNob3VsZENhbmNlbEF1dG9QbGF5T25BY3Rpb249ZXhwb3J0cy5nZXRJdGVtSW5kZXhGb3JEb3ROYXZpZ2F0aW9uPWV4cG9ydHMuY2hlY2tJc1RoZUxhc3REb3RJbmRleD1leHBvcnRzLmdldERvdHNOYXZpZ2F0aW9uTGVuZ3RoPWV4cG9ydHMuaGFzRG90Rm9yRWFjaFNsaWRlPWV4cG9ydHMuaXNTdHJhdGVneT1leHBvcnRzLnNob3VsZERpc2FibGVCdXR0b25zPWV4cG9ydHMuc2hvdWxkRGlzYWJsZURvdHM9ZXhwb3J0cy5zaG91bGREaXNhYmxlQ29udHJvbHM9dm9pZCAwO3ZhciB0eXBlc18xPXJlcXVpcmUoXCIuLi90eXBlc1wiKTtmdW5jdGlvbiBzaG91bGREaXNhYmxlQ29udHJvbHModCxvKXt2YXIgdD0odHx8e30pLmNvbnRyb2xzU3RyYXRlZ3ksbz1vfHx7fSxlPW8uaXRlbXNJblNsaWRlLHM9by5pdGVtc0NvdW50LG89by5hdXRvV2lkdGg7aWYoKDAsZXhwb3J0cy5pc1N0cmF0ZWd5KSh0LHR5cGVzXzEuQ29udHJvbHNTdHJhdGVneS5SRVNQT05TSVZFKSlyZXR1cm4hbyYmZT09PXN9ZnVuY3Rpb24gc2hvdWxkRGlzYWJsZURvdHModCxvKXtyZXR1cm4gdC5kaXNhYmxlRG90c0NvbnRyb2xzfHxzaG91bGREaXNhYmxlQ29udHJvbHModCxvKX1mdW5jdGlvbiBzaG91bGREaXNhYmxlQnV0dG9ucyh0LG8pe3JldHVybiB0LmRpc2FibGVCdXR0b25zQ29udHJvbHN8fCF0LmluZmluaXRlJiZzaG91bGREaXNhYmxlQ29udHJvbHModCxvKX1leHBvcnRzLnNob3VsZERpc2FibGVDb250cm9scz1zaG91bGREaXNhYmxlQ29udHJvbHMsZXhwb3J0cy5zaG91bGREaXNhYmxlRG90cz1zaG91bGREaXNhYmxlRG90cyxleHBvcnRzLnNob3VsZERpc2FibGVCdXR0b25zPXNob3VsZERpc2FibGVCdXR0b25zO3ZhciBpc1N0cmF0ZWd5PWZ1bmN0aW9uKHQsbyl7cmV0dXJuIHZvaWQgMD09PXQmJih0PVwiXCIpLHZvaWQgMD09PW8mJihvPVwiXCIpLEJvb2xlYW4odCYmdC5pbmNsdWRlcyhvKSl9LGhhc0RvdEZvckVhY2hTbGlkZT0oZXhwb3J0cy5pc1N0cmF0ZWd5PWlzU3RyYXRlZ3ksZnVuY3Rpb24odCxvKXtyZXR1cm4gdHx8KDAsZXhwb3J0cy5pc1N0cmF0ZWd5KShvLHR5cGVzXzEuQ29udHJvbHNTdHJhdGVneS5BTFRFUk5BVEUpfSksZ2V0RG90c05hdmlnYXRpb25MZW5ndGg9KGV4cG9ydHMuaGFzRG90Rm9yRWFjaFNsaWRlPWhhc0RvdEZvckVhY2hTbGlkZSxmdW5jdGlvbih0LG8sZSl7cmV0dXJuIHZvaWQgMD09PXQmJih0PTApLHZvaWQgMD09PW8mJihvPTEpLChlPXZvaWQgMCE9PWUmJmUpP3Q6MCE9PU51bWJlcihvKSYmTWF0aC5jZWlsKHQvbyl8fDB9KSxjaGVja0lzVGhlTGFzdERvdEluZGV4PShleHBvcnRzLmdldERvdHNOYXZpZ2F0aW9uTGVuZ3RoPWdldERvdHNOYXZpZ2F0aW9uTGVuZ3RoLGZ1bmN0aW9uKHQsbyxlKXtyZXR1cm4hbyYmdD09PWUtMX0pLGdldEl0ZW1JbmRleEZvckRvdE5hdmlnYXRpb249KGV4cG9ydHMuY2hlY2tJc1RoZUxhc3REb3RJbmRleD1jaGVja0lzVGhlTGFzdERvdEluZGV4LGZ1bmN0aW9uKHQsbyxlLHMpe3JldHVybihvP2Utczp0KnMpfHwwfSksc2hvdWxkQ2FuY2VsQXV0b1BsYXlPbkFjdGlvbj0oZXhwb3J0cy5nZXRJdGVtSW5kZXhGb3JEb3ROYXZpZ2F0aW9uPWdldEl0ZW1JbmRleEZvckRvdE5hdmlnYXRpb24sZnVuY3Rpb24odCl7cmV0dXJuKHQ9dm9pZCAwPT09dD9cIlwiOnQpPT09dHlwZXNfMS5BdXRvUGxheVN0cmF0ZWd5LkFDVElPTnx8dD09PXR5cGVzXzEuQXV0b1BsYXlTdHJhdGVneS5BTEx9KSxzaG91bGRDYW5jZWxBdXRvUGxheU9uSG92ZXI9KGV4cG9ydHMuc2hvdWxkQ2FuY2VsQXV0b1BsYXlPbkFjdGlvbj1zaG91bGRDYW5jZWxBdXRvUGxheU9uQWN0aW9uLGZ1bmN0aW9uKHQpe3JldHVybih0PXZvaWQgMD09PXQ/XCJcIjp0KT09PXR5cGVzXzEuQXV0b1BsYXlTdHJhdGVneS5ERUZBVUxUfHx0PT09dHlwZXNfMS5BdXRvUGxheVN0cmF0ZWd5LkFMTH0pO2V4cG9ydHMuc2hvdWxkQ2FuY2VsQXV0b1BsYXlPbkhvdmVyPXNob3VsZENhbmNlbEF1dG9QbGF5T25Ib3ZlcjsiLCJcInVzZSBzdHJpY3RcIjt2YXIgX19jcmVhdGVCaW5kaW5nPU9iamVjdC5jcmVhdGU/ZnVuY3Rpb24oZSxyLHQsbyl7dm9pZCAwPT09byYmKG89dCk7dmFyIHA9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihyLHQpO3AmJihcImdldFwiaW4gcD9yLl9fZXNNb2R1bGU6IXAud3JpdGFibGUmJiFwLmNvbmZpZ3VyYWJsZSl8fChwPXtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiByW3RdfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG8scCl9OmZ1bmN0aW9uKGUscix0LG8pe2Vbbz12b2lkIDA9PT1vP3Q6b109clt0XX0sX19leHBvcnRTdGFyPWZ1bmN0aW9uKGUscil7Zm9yKHZhciB0IGluIGUpXCJkZWZhdWx0XCI9PT10fHxPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocix0KXx8X19jcmVhdGVCaW5kaW5nKHIsZSx0KX07T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NvbW1vblwiKSxleHBvcnRzKSxfX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vZWxlbWVudHNcIiksZXhwb3J0cyksX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NsYXNzbmFtZXNcIiksZXhwb3J0cyksX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3RpbWVyc1wiKSxleHBvcnRzKSxfX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vbWF0aFwiKSxleHBvcnRzKSxfX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vZGVidWdcIiksZXhwb3J0cyksX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3JlbmRlclwiKSxleHBvcnRzKSxfX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY29udHJvbHNcIiksZXhwb3J0cyksX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL21hcHBlcnNcIiksZXhwb3J0cyk7IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9faW1wb3J0RGVmYXVsdD1mdW5jdGlvbihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19LHJlYWN0XzE9KE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuU2xpZGVJbmZvPXZvaWQgMCxfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKSksdHlwZXNfMT1yZXF1aXJlKFwiLi4vdHlwZXNcIiksdXRpbHNfMT1yZXF1aXJlKFwiLi4vdXRpbHNcIiksU2xpZGVJbmZvPWZ1bmN0aW9uKGUpe3ZhciB0PWUuYWN0aXZlSW5kZXgscz1lLml0ZW1zQ291bnQsZT1lLnJlbmRlclNsaWRlSW5mbyx0PSgwLHV0aWxzXzEuZ2V0U2xpZGVJbmZvKSh0LHMpLml0ZW07cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZT9yZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLHtjbGFzc05hbWU6dHlwZXNfMS5DbGFzc25hbWVzLlNMSURFX0lORk99LGUoe2l0ZW06dCxpdGVtc0NvdW50OnN9KSk6KGU9KDAsdXRpbHNfMS5jb25jYXRDbGFzc25hbWVzKSh0eXBlc18xLkNsYXNzbmFtZXMuU0xJREVfSU5GT19JVEVNLHR5cGVzXzEuTW9kaWZpZXJzLlNFUEFSQVRPUikscmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7Y2xhc3NOYW1lOnR5cGVzXzEuQ2xhc3NuYW1lcy5TTElERV9JTkZPfSxyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIix7Y2xhc3NOYW1lOnR5cGVzXzEuQ2xhc3NuYW1lcy5TTElERV9JTkZPX0lURU19LHQpLHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLHtjbGFzc05hbWU6ZX0sXCIvXCIpLHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLHtjbGFzc05hbWU6dHlwZXNfMS5DbGFzc25hbWVzLlNMSURFX0lORk9fSVRFTX0scykpKX07ZXhwb3J0cy5TbGlkZUluZm89U2xpZGVJbmZvOyIsIlwidXNlIHN0cmljdFwiO3ZhciBfX2ltcG9ydERlZmF1bHQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fSxyZWFjdF8xPShPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxleHBvcnRzLlN0YWdlSXRlbT12b2lkIDAsX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSkpLFN0YWdlSXRlbT1mdW5jdGlvbihlKXt2YXIgdD1lLml0ZW0scj1lLmNsYXNzTmFtZSxlPWUuc3R5bGVzO3JldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIse3N0eWxlOmUsY2xhc3NOYW1lOnJ9LHQpfTtleHBvcnRzLlN0YWdlSXRlbT1TdGFnZUl0ZW07IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9faW1wb3J0RGVmYXVsdD1mdW5jdGlvbihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19LHJlYWN0XzE9KE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuRG90c05hdmlnYXRpb249dm9pZCAwLF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpKSx0eXBlc18xPXJlcXVpcmUoXCIuLi90eXBlc1wiKSx1dGlsc18xPXJlcXVpcmUoXCIuLi91dGlsc1wiKSxEb3RzTmF2aWdhdGlvbj1mdW5jdGlvbihlKXt2YXIgYT1lLnN0YXRlLG49ZS5vbkNsaWNrLHI9ZS5vbk1vdXNlRW50ZXIsbD1lLm9uTW91c2VMZWF2ZSx0PWUuY29udHJvbHNTdHJhdGVneSx1PWUucmVuZGVyRG90c0l0ZW0sYz1hLml0ZW1zQ291bnQsXz1hLml0ZW1zSW5TbGlkZSxkPWEuaW5maW5pdGUsZT1hLmF1dG9XaWR0aCxtPWEuYWN0aXZlSW5kZXgsdj0oMCx1dGlsc18xLmdldFNsaWRlSXRlbUluZm8pKGEpLmlzTmV4dFNsaWRlRGlzYWJsZWQsZj0oMCx1dGlsc18xLmhhc0RvdEZvckVhY2hTbGlkZSkoZSx0KSxEPSgwLHV0aWxzXzEuZ2V0RG90c05hdmlnYXRpb25MZW5ndGgpKGMsXyxmKTtyZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLHtjbGFzc05hbWU6dHlwZXNfMS5DbGFzc25hbWVzLkRPVFN9LEFycmF5LmZyb20oe2xlbmd0aDpjfSkubWFwKGZ1bmN0aW9uKGUsdCl7dmFyIGkscyxvO2lmKHQ8RClyZXR1cm4gcz0oMCx1dGlsc18xLmNoZWNrSXNUaGVMYXN0RG90SW5kZXgpKHQsQm9vbGVhbihkKSxEKSxpPSgwLHV0aWxzXzEuZ2V0SXRlbUluZGV4Rm9yRG90TmF2aWdhdGlvbikodCxzLGMsXykscz0oMCx1dGlsc18xLmdldEFjdGl2ZVNsaWRlSW5kZXgpKHYsYSksZiYmKChzPW0pPDA/cz1jLTE6Yzw9bSYmKHM9MCksaT10KSxzPXM9PT10P3R5cGVzXzEuTW9kaWZpZXJzLkFDVElWRTpcIlwiLG89dT90eXBlc18xLk1vZGlmaWVycy5DVVNUT006XCJcIixvPSgwLHV0aWxzXzEuY29uY2F0Q2xhc3NuYW1lcykodHlwZXNfMS5DbGFzc25hbWVzLkRPVFNfSVRFTSxzLG8pLHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIix7a2V5OlwiZG90LWl0ZW0tXCIuY29uY2F0KHQpLG9uTW91c2VFbnRlcjpyLG9uTW91c2VMZWF2ZTpsLG9uQ2xpY2s6ZnVuY3Rpb24oKXtyZXR1cm4gbihpKX0sY2xhc3NOYW1lOm99LHUmJnUoe2lzQWN0aXZlOkJvb2xlYW4ocyksYWN0aXZlSW5kZXg6dH0pKX0pKX07ZXhwb3J0cy5Eb3RzTmF2aWdhdGlvbj1Eb3RzTmF2aWdhdGlvbjsiLCJcInVzZSBzdHJpY3RcIjt2YXIgX19pbXBvcnREZWZhdWx0PWZ1bmN0aW9uKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX0scmVhY3RfMT0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0cy5QbGF5UGF1c2VCdXR0b249dm9pZCAwLF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpKSx0eXBlc18xPXJlcXVpcmUoXCIuLi90eXBlc1wiKSx1dGlsc18xPXJlcXVpcmUoXCIuLi91dGlsc1wiKSxQbGF5UGF1c2VCdXR0b249ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5pc1BsYXlpbmcsYT1lLm9uQ2xpY2ssZT1lLnJlbmRlclBsYXlQYXVzZUJ1dHRvbjtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlP3JlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse2NsYXNzTmFtZTp0eXBlc18xLkNsYXNzbmFtZXMuUExBWV9CVE4sb25DbGljazphfSxlKHtpc1BsYXlpbmc6dH0pKTooZT10P3R5cGVzXzEuTW9kaWZpZXJzLlBBVVNFOlwiXCIsdD0oMCx1dGlsc18xLmNvbmNhdENsYXNzbmFtZXMpKHR5cGVzXzEuQ2xhc3NuYW1lcy5QTEFZX0JUTl9JVEVNLGUpLHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse2NsYXNzTmFtZTp0eXBlc18xLkNsYXNzbmFtZXMuUExBWV9CVE59LHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse2NsYXNzTmFtZTp0eXBlc18xLkNsYXNzbmFtZXMuUExBWV9CVE5fV1JBUFBFUn0scmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7b25DbGljazphLGNsYXNzTmFtZTp0fSkpKSl9O2V4cG9ydHMuUGxheVBhdXNlQnV0dG9uPVBsYXlQYXVzZUJ1dHRvbjsiLCJcInVzZSBzdHJpY3RcIjt2YXIgX19pbXBvcnREZWZhdWx0PWZ1bmN0aW9uKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX0scmVhY3RfMT0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0cy5QcmV2TmV4dEJ1dHRvbj12b2lkIDAsX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSkpLHR5cGVzXzE9cmVxdWlyZShcIi4uL3R5cGVzXCIpLHV0aWxzXzE9cmVxdWlyZShcIi4uL3V0aWxzXCIpLFByZXZOZXh0QnV0dG9uPWZ1bmN0aW9uKGUpe3ZhciB0LHM9ZS5uYW1lLGE9ZS5pc0Rpc2FibGVkLHI9ZS5vbkNsaWNrLG49ZS5yZW5kZXJQcmV2QnV0dG9uLGU9ZS5yZW5kZXJOZXh0QnV0dG9uO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4/cmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7Y2xhc3NOYW1lOnR5cGVzXzEuQ2xhc3NuYW1lcy5CVVRUT05fUFJFVixvbkNsaWNrOnJ9LG4oe2lzRGlzYWJsZWQ6YX0pKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlP3JlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse2NsYXNzTmFtZTp0eXBlc18xLkNsYXNzbmFtZXMuQlVUVE9OX05FWFQsb25DbGljazpyfSxlKHtpc0Rpc2FibGVkOmF9KSk6KGU9KG49XCJwcmV2XCI9PT1zKT9cIjxcIjpcIj5cIixzPW4/dHlwZXNfMS5DbGFzc25hbWVzLkJVVFRPTl9QUkVWOnR5cGVzXzEuQ2xhc3NuYW1lcy5CVVRUT05fTkVYVCx0PW4/dHlwZXNfMS5DbGFzc25hbWVzLkJVVFRPTl9QUkVWX1dSQVBQRVI6dHlwZXNfMS5DbGFzc25hbWVzLkJVVFRPTl9ORVhUX1dSQVBQRVIsbj1uP3R5cGVzXzEuQ2xhc3NuYW1lcy5CVVRUT05fUFJFVl9JVEVNOnR5cGVzXzEuQ2xhc3NuYW1lcy5CVVRUT05fTkVYVF9JVEVNLGE9YT90eXBlc18xLk1vZGlmaWVycy5JTkFDVElWRTpcIlwiLG49KDAsdXRpbHNfMS5jb25jYXRDbGFzc25hbWVzKShuLGEpLHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse2NsYXNzTmFtZTpzfSxyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLHtjbGFzc05hbWU6dH0scmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIse2NsYXNzTmFtZTpuLG9uQ2xpY2s6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSl9fSxyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIix7XCJkYXRhLWFyZWFcIjplfSkpKSkpfTtleHBvcnRzLlByZXZOZXh0QnV0dG9uPVByZXZOZXh0QnV0dG9uOyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuUHJldk5leHRCdXR0b249ZXhwb3J0cy5QbGF5UGF1c2VCdXR0b249ZXhwb3J0cy5Eb3RzTmF2aWdhdGlvbj1leHBvcnRzLlN0YWdlSXRlbT1leHBvcnRzLlNsaWRlSW5mbz12b2lkIDA7dmFyIFNsaWRlSW5mb18xPXJlcXVpcmUoXCIuL1NsaWRlSW5mb1wiKSxTdGFnZUl0ZW1fMT0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJTbGlkZUluZm9cIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gU2xpZGVJbmZvXzEuU2xpZGVJbmZvfX0pLHJlcXVpcmUoXCIuL1N0YWdlSXRlbVwiKSksRG90c05hdmlnYXRpb25fMT0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJTdGFnZUl0ZW1cIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gU3RhZ2VJdGVtXzEuU3RhZ2VJdGVtfX0pLHJlcXVpcmUoXCIuL0RvdHNOYXZpZ2F0aW9uXCIpKSxQbGF5UGF1c2VCdXR0b25fMT0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJEb3RzTmF2aWdhdGlvblwiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBEb3RzTmF2aWdhdGlvbl8xLkRvdHNOYXZpZ2F0aW9ufX0pLHJlcXVpcmUoXCIuL1BsYXlQYXVzZUJ1dHRvblwiKSksUHJldk5leHRCdXR0b25fMT0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJQbGF5UGF1c2VCdXR0b25cIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gUGxheVBhdXNlQnV0dG9uXzEuUGxheVBhdXNlQnV0dG9ufX0pLHJlcXVpcmUoXCIuL1ByZXZOZXh0QnV0dG9uXCIpKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIlByZXZOZXh0QnV0dG9uXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIFByZXZOZXh0QnV0dG9uXzEuUHJldk5leHRCdXR0b259fSk7IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZXh0ZW5kcz1mdW5jdGlvbigpe3ZhciBuPWZ1bmN0aW9uKHQsZSl7cmV0dXJuKG49T2JqZWN0LnNldFByb3RvdHlwZU9mfHwoe19fcHJvdG9fXzpbXX1pbnN0YW5jZW9mIEFycmF5P2Z1bmN0aW9uKHQsZSl7dC5fX3Byb3RvX189ZX06ZnVuY3Rpb24odCxlKXtmb3IodmFyIGkgaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxpKSYmKHRbaV09ZVtpXSl9KSkodCxlKX07cmV0dXJuIGZ1bmN0aW9uKHQsZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmbnVsbCE9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIrU3RyaW5nKGUpK1wiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7ZnVuY3Rpb24gaSgpe3RoaXMuY29uc3RydWN0b3I9dH1uKHQsZSksdC5wcm90b3R5cGU9bnVsbD09PWU/T2JqZWN0LmNyZWF0ZShlKTooaS5wcm90b3R5cGU9ZS5wcm90b3R5cGUsbmV3IGkpfX0oKSxfX2Fzc2lnbj1mdW5jdGlvbigpe3JldHVybihfX2Fzc2lnbj1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0KXtmb3IodmFyIGUsaT0xLG49YXJndW1lbnRzLmxlbmd0aDtpPG47aSsrKWZvcih2YXIgbyBpbiBlPWFyZ3VtZW50c1tpXSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxvKSYmKHRbb109ZVtvXSk7cmV0dXJuIHR9KS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9LF9fY3JlYXRlQmluZGluZz1PYmplY3QuY3JlYXRlP2Z1bmN0aW9uKHQsZSxpLG4pe3ZvaWQgMD09PW4mJihuPWkpO3ZhciBvPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSxpKTtvJiYoXCJnZXRcImluIG8/ZS5fX2VzTW9kdWxlOiFvLndyaXRhYmxlJiYhby5jb25maWd1cmFibGUpfHwobz17ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZVtpXX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLG8pfTpmdW5jdGlvbih0LGUsaSxuKXt0W249dm9pZCAwPT09bj9pOm5dPWVbaV19LF9fc2V0TW9kdWxlRGVmYXVsdD1PYmplY3QuY3JlYXRlP2Z1bmN0aW9uKHQsZSl7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pfTpmdW5jdGlvbih0LGUpe3QuZGVmYXVsdD1lfSxfX2ltcG9ydFN0YXI9ZnVuY3Rpb24odCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O3ZhciBlPXt9O2lmKG51bGwhPXQpZm9yKHZhciBpIGluIHQpXCJkZWZhdWx0XCIhPT1pJiZPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxpKSYmX19jcmVhdGVCaW5kaW5nKGUsdCxpKTtyZXR1cm4gX19zZXRNb2R1bGVEZWZhdWx0KGUsdCksZX0sX19leHBvcnRTdGFyPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBpIGluIHQpXCJkZWZhdWx0XCI9PT1pfHxPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxpKXx8X19jcmVhdGVCaW5kaW5nKGUsdCxpKX0sX19hd2FpdGVyPWZ1bmN0aW9uKHQsYSxyLGwpe3JldHVybiBuZXcocj1yfHxQcm9taXNlKShmdW5jdGlvbihpLGUpe2Z1bmN0aW9uIG4odCl7dHJ5e3MobC5uZXh0KHQpKX1jYXRjaCh0KXtlKHQpfX1mdW5jdGlvbiBvKHQpe3RyeXtzKGwudGhyb3codCkpfWNhdGNoKHQpe2UodCl9fWZ1bmN0aW9uIHModCl7dmFyIGU7dC5kb25lP2kodC52YWx1ZSk6KChlPXQudmFsdWUpaW5zdGFuY2VvZiByP2U6bmV3IHIoZnVuY3Rpb24odCl7dChlKX0pKS50aGVuKG4sbyl9cygobD1sLmFwcGx5KHQsYXx8W10pKS5uZXh0KCkpfSl9LF9fZ2VuZXJhdG9yPWZ1bmN0aW9uKG4sbyl7dmFyIHMsYSxyLGw9e2xhYmVsOjAsc2VudDpmdW5jdGlvbigpe2lmKDEmclswXSl0aHJvdyByWzFdO3JldHVybiByWzFdfSx0cnlzOltdLG9wczpbXX0sdD17bmV4dDplKDApLHRocm93OmUoMSkscmV0dXJuOmUoMil9O3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmKHRbU3ltYm9sLml0ZXJhdG9yXT1mdW5jdGlvbigpe3JldHVybiB0aGlzfSksdDtmdW5jdGlvbiBlKGkpe3JldHVybiBmdW5jdGlvbih0KXt2YXIgZT1baSx0XTtpZihzKXRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO2Zvcig7bDspdHJ5e2lmKHM9MSxhJiYocj0yJmVbMF0/YS5yZXR1cm46ZVswXT9hLnRocm93fHwoKHI9YS5yZXR1cm4pJiZyLmNhbGwoYSksMCk6YS5uZXh0KSYmIShyPXIuY2FsbChhLGVbMV0pKS5kb25lKXJldHVybiByO3N3aXRjaChhPTAsKGU9cj9bMiZlWzBdLHIudmFsdWVdOmUpWzBdKXtjYXNlIDA6Y2FzZSAxOnI9ZTticmVhaztjYXNlIDQ6cmV0dXJuIGwubGFiZWwrKyx7dmFsdWU6ZVsxXSxkb25lOiExfTtjYXNlIDU6bC5sYWJlbCsrLGE9ZVsxXSxlPVswXTtjb250aW51ZTtjYXNlIDc6ZT1sLm9wcy5wb3AoKSxsLnRyeXMucG9wKCk7Y29udGludWU7ZGVmYXVsdDppZighKHI9MDwocj1sLnRyeXMpLmxlbmd0aCYmcltyLmxlbmd0aC0xXSkmJig2PT09ZVswXXx8Mj09PWVbMF0pKXtsPTA7Y29udGludWV9aWYoMz09PWVbMF0mJighcnx8ZVsxXT5yWzBdJiZlWzFdPHJbM10pKWwubGFiZWw9ZVsxXTtlbHNlIGlmKDY9PT1lWzBdJiZsLmxhYmVsPHJbMV0pbC5sYWJlbD1yWzFdLHI9ZTtlbHNle2lmKCEociYmbC5sYWJlbDxyWzJdKSl7clsyXSYmbC5vcHMucG9wKCksbC50cnlzLnBvcCgpO2NvbnRpbnVlfWwubGFiZWw9clsyXSxsLm9wcy5wdXNoKGUpfX1lPW8uY2FsbChuLGwpfWNhdGNoKHQpe2U9WzYsdF0sYT0wfWZpbmFsbHl7cz1yPTB9aWYoNSZlWzBdKXRocm93IGVbMV07cmV0dXJue3ZhbHVlOmVbMF0/ZVsxXTp2b2lkIDAsZG9uZTohMH19fX0sX19pbXBvcnREZWZhdWx0PWZ1bmN0aW9uKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX0scmVhY3RfMT0oT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSkpLHZhbmlsbGFfc3dpcGVfMT1fX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInZhbmlsbGEtc3dpcGVcIikpLGRlZmF1bHRQcm9wc18xPXJlcXVpcmUoXCIuL2RlZmF1bHRQcm9wc1wiKSxWaWV3cz1fX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vdmlld3NcIikpLFV0aWxzPV9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi91dGlsc1wiKSksdHlwZXNfMT1yZXF1aXJlKFwiLi90eXBlc1wiKSxBbGljZUNhcm91c2VsPShfX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIiksZXhwb3J0cyksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdCh0KXt2YXIgcz1lLmNhbGwodGhpcyx0KXx8dGhpcztyZXR1cm4gcy5zd2lwZUxpc3RlbmVyPW51bGwscy5faGFuZGxlS2V5Ym9hcmRFdmVudHM9ZnVuY3Rpb24odCl7c3dpdGNoKHQuY29kZSl7Y2FzZVwiU3BhY2VcIjpyZXR1cm4gcy5wcm9wcy5hdXRvUGxheSYmcy5faGFuZGxlUGxheVBhdXNlVG9nZ2xlKCk7Y2FzZVwiQXJyb3dMZWZ0XCI6cmV0dXJuIHMuc2xpZGVQcmV2KHQpO2Nhc2VcIkFycm93UmlnaHRcIjpyZXR1cm4gcy5zbGlkZU5leHQodCl9fSxzLl9oYW5kbGVCZWZvcmVTbGlkZUVuZD1mdW5jdGlvbihvKXtyZXR1cm4gX19hd2FpdGVyKHMsdm9pZCAwLHZvaWQgMCxmdW5jdGlvbigpe3ZhciBlLGksbjtyZXR1cm4gX19nZW5lcmF0b3IodGhpcyxmdW5jdGlvbih0KXtzd2l0Y2godC5sYWJlbCl7Y2FzZSAwOnJldHVybihpPXRoaXMuc3RhdGUsbj1pLmFjdGl2ZUluZGV4LGU9aS5pdGVtc0NvdW50LGk9aS5mYWRlb3V0QW5pbWF0aW9uUHJvY2Vzc2luZyxVdGlscy5zaG91bGRSZWNhbGN1bGF0ZVNsaWRlSW5kZXgobixlKSk/KG49VXRpbHMuZ2V0VXBkYXRlU2xpZGVQb3NpdGlvbkluZGV4KG4sZSksWzQsdGhpcy5faGFuZGxlVXBkYXRlU2xpZGVQb3NpdGlvbihuKV0pOlszLDJdO2Nhc2UgMTpyZXR1cm4gdC5zZW50KCksWzMsNF07Y2FzZSAyOnJldHVybiBpP1s0LHRoaXMuc2V0U3RhdGUoe2ZhZGVvdXRBbmltYXRpb25JbmRleDpudWxsLGZhZGVvdXRBbmltYXRpb25Qb3NpdGlvbjpudWxsLGZhZGVvdXRBbmltYXRpb25Qcm9jZXNzaW5nOiExfSldOlszLDRdO2Nhc2UgMzp0LnNlbnQoKSx0LmxhYmVsPTQ7Y2FzZSA0OnJldHVybiB0aGlzLl9oYW5kbGVTbGlkZUNoYW5nZWQobyksWzJdfX0pfSl9LHMuX2hhbmRsZU1vdXNlRW50ZXI9ZnVuY3Rpb24oKXt2YXIgdD1zLnByb3BzLmF1dG9QbGF5U3RyYXRlZ3k7VXRpbHMuc2hvdWxkQ2FuY2VsQXV0b1BsYXlPbkhvdmVyKHQpJiZzLnN0YXRlLmlzQXV0b1BsYXlpbmcmJihzLmlzSG92ZXJlZD0hMCxzLl9oYW5kbGVQYXVzZSgpKX0scy5faGFuZGxlTW91c2VMZWF2ZT1mdW5jdGlvbigpe3Muc3RhdGUuaXNBdXRvUGxheWluZyYmKHMuaXNIb3ZlcmVkPSExLHMuX2hhbmRsZVBsYXkoKSl9LHMuX2hhbmRsZVBhdXNlPWZ1bmN0aW9uKCl7cy5fY2xlYXJBdXRvUGxheVRpbWVvdXQoKX0scy5faGFuZGxlUGxheVBhdXNlVG9nZ2xlPWZ1bmN0aW9uKCl7cmV0dXJuIF9fYXdhaXRlcihzLHZvaWQgMCx2b2lkIDAsZnVuY3Rpb24oKXt2YXIgZTtyZXR1cm4gX19nZW5lcmF0b3IodGhpcyxmdW5jdGlvbih0KXtzd2l0Y2godC5sYWJlbCl7Y2FzZSAwOnJldHVybiBlPXRoaXMuc3RhdGUuaXNBdXRvUGxheWluZyx0aGlzLmhhc1VzZXJBY3Rpb249ITAsWzQsdGhpcy5zZXRTdGF0ZSh7aXNBdXRvUGxheWluZzohZSxpc0F1dG9QbGF5Q2FuY2VsZWRPbkFjdGlvbjohMH0pXTtjYXNlIDE6cmV0dXJuIHQuc2VudCgpLGU/dGhpcy5faGFuZGxlUGF1c2UoKTp0aGlzLl9oYW5kbGVQbGF5KCksWzJdfX0pfSl9LHMuX3NldFJvb3RDb21wb25lbnRSZWY9ZnVuY3Rpb24odCl7cmV0dXJuIHMucm9vdEVsZW1lbnQ9dH0scy5fc2V0U3RhZ2VDb21wb25lbnRSZWY9ZnVuY3Rpb24odCl7cmV0dXJuIHMuc3RhZ2VDb21wb25lbnQ9dH0scy5fcmVuZGVyU3RhZ2VJdGVtPWZ1bmN0aW9uKHQsZSl7dmFyIGk9VXRpbHMuZ2V0UmVuZGVyU3RhZ2VJdGVtU3R5bGVzKGUscy5zdGF0ZSksbj1VdGlscy5nZXRSZW5kZXJTdGFnZUl0ZW1DbGFzc2VzKGUscy5zdGF0ZSk7cmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFZpZXdzLlN0YWdlSXRlbSx7c3R5bGVzOmksY2xhc3NOYW1lOm4sa2V5Olwic3RhZ2UtaXRlbS1cIi5jb25jYXQoZSksaXRlbTp0fSl9LHMuX3JlbmRlclNsaWRlSW5mbz1mdW5jdGlvbigpe3ZhciB0PXMucHJvcHMucmVuZGVyU2xpZGVJbmZvLGU9cy5zdGF0ZSxpPWUuYWN0aXZlSW5kZXgsZT1lLml0ZW1zQ291bnQ7cmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFZpZXdzLlNsaWRlSW5mbyx7aXRlbXNDb3VudDplLGFjdGl2ZUluZGV4OmkscmVuZGVyU2xpZGVJbmZvOnR9KX0scy5zdGF0ZT1VdGlscy5jYWxjdWxhdGVJbml0aWFsU3RhdGUodCxudWxsKSxzLmlzSG92ZXJlZD0hMSxzLmlzQW5pbWF0aW9uRGlzYWJsZWQ9ITEscy5pc1RvdWNoTW92ZVByb2Nlc3NTdGFydGVkPSExLHMuY2FuY2VsVG91Y2hBbmltYXRpb25zPSExLHMuaGFzVXNlckFjdGlvbj0hMSxzLnJvb3RFbGVtZW50PW51bGwscy5yb290Q29tcG9uZW50RGltZW5zaW9ucz17fSxzLnN0YWdlQ29tcG9uZW50PW51bGwscy5zdGFydFRvdWNobW92ZVBvc2l0aW9uPXZvaWQgMCxzLnNsaWRlVG89cy5zbGlkZVRvLmJpbmQocykscy5zbGlkZVByZXY9cy5zbGlkZVByZXYuYmluZChzKSxzLnNsaWRlTmV4dD1zLnNsaWRlTmV4dC5iaW5kKHMpLHMuX2hhbmRsZVRvdWNobW92ZT1zLl9oYW5kbGVUb3VjaG1vdmUuYmluZChzKSxzLl9oYW5kbGVUb3VjaGVuZD1zLl9oYW5kbGVUb3VjaGVuZC5iaW5kKHMpLHMuX2hhbmRsZURvdENsaWNrPXMuX2hhbmRsZURvdENsaWNrLmJpbmQocykscy5faGFuZGxlUmVzaXplPXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHMpLHQ9VXRpbHMuZGVib3VuY2Uocy5faGFuZGxlUmVzaXplLDEwMCkscy5faGFuZGxlUmVzaXplRGVib3VuY2VkPXRbMF0scy5fY2FuY2VsUmVzaXplRGVib3VuY2VkPXRbMV0sc31yZXR1cm4gX19leHRlbmRzKHQsZSksdC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQ9ZnVuY3Rpb24oKXtyZXR1cm4gX19hd2FpdGVyKHRoaXMsdm9pZCAwLHZvaWQgMCxmdW5jdGlvbigpe3JldHVybiBfX2dlbmVyYXRvcih0aGlzLGZ1bmN0aW9uKHQpe3N3aXRjaCh0LmxhYmVsKXtjYXNlIDA6cmV0dXJuWzQsdGhpcy5fc2V0SW5pdGlhbFN0YXRlKCldO2Nhc2UgMTpyZXR1cm4gdC5zZW50KCksdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKSx0aGlzLl9zZXR1cFN3aXBlSGFuZGxlcnMoKSx0aGlzLnByb3BzLmF1dG9QbGF5JiZ0aGlzLl9oYW5kbGVQbGF5KCksWzJdfX0pfSl9LHQucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZT1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMucHJvcHMsbj1pLmFjdGl2ZUluZGV4LG89aS5hbmltYXRpb25EdXJhdGlvbixzPWkuYXV0b1dpZHRoLGE9aS5jaGlsZHJlbixyPWkuaW5maW5pdGUsbD1pLml0ZW1zLHU9aS5wYWRkaW5nTGVmdCxkPWkucGFkZGluZ1JpZ2h0LGM9aS5yZXNwb25zaXZlLGg9aS5zd2lwZUV4dHJhUGFkZGluZyxwPWkubW91c2VUcmFja2luZyxfPWkuc3dpcGVEZWx0YSxtPWkudG91Y2hUcmFja2luZyxpPWkudG91Y2hNb3ZlRGVmYXVsdEV2ZW50czthJiZ0LmNoaWxkcmVuIT09YT8oYT1lLmFjdGl2ZUluZGV4LGU9X19hc3NpZ24oX19hc3NpZ24oe30sdGhpcy5wcm9wcykse2FjdGl2ZUluZGV4OmF9KSx0aGlzLl91cGRhdGVDb21wb25lbnQoZSkpOnQuYXV0b1dpZHRoIT09c3x8dC5pbmZpbml0ZSE9PXJ8fHQuaXRlbXMhPT1sfHx0LnBhZGRpbmdMZWZ0IT09dXx8dC5wYWRkaW5nUmlnaHQhPT1kfHx0LnJlc3BvbnNpdmUhPT1jfHx0LnN3aXBlRXh0cmFQYWRkaW5nIT09aD90aGlzLl91cGRhdGVDb21wb25lbnQoKToodC5hbmltYXRpb25EdXJhdGlvbiE9PW8mJnRoaXMuc2V0U3RhdGUoe2FuaW1hdGlvbkR1cmF0aW9uOm99KSx0LmFjdGl2ZUluZGV4IT09biYmdGhpcy5zbGlkZVRvKG4sdHlwZXNfMS5FdmVudFR5cGUuVVBEQVRFKSksdC5zd2lwZURlbHRhPT09XyYmdC5tb3VzZVRyYWNraW5nPT09cCYmdC50b3VjaFRyYWNraW5nPT09bSYmdC50b3VjaE1vdmVEZWZhdWx0RXZlbnRzPT09aXx8dGhpcy5fdXBkYXRlU3dpcGVQcm9wcygpLHRoaXMucHJvcHMua2V5Ym9hcmROYXZpZ2F0aW9uIT09dC5rZXlib2FyZE5hdmlnYXRpb24mJnRoaXMuX3VwZGF0ZUV2ZW50TGlzdGVuZXJzKCl9LHQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dGhpcy5fY2FuY2VsUmVzaXplRGVib3VuY2VkKCksdGhpcy5fY2FuY2VsVGltZW91dEFuaW1hdGlvbnMoKSx0aGlzLl9yZW1vdmVFdmVudExpc3RlbmVycygpfSxPYmplY3QuZGVmaW5lUHJvcGVydHkodC5wcm90b3R5cGUsXCJldmVudE9iamVjdFwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnN0YXRlLGU9dC5pdGVtc0luU2xpZGUsdD10LmFjdGl2ZUluZGV4LGk9VXRpbHMuZ2V0U2xpZGVJdGVtSW5mbyh0aGlzLnN0YXRlKSxuPWkuaXNOZXh0U2xpZGVEaXNhYmxlZCxpPWkuaXNQcmV2U2xpZGVEaXNhYmxlZDtyZXR1cm57aXRlbTp0LHNsaWRlOlV0aWxzLmdldEFjdGl2ZVNsaWRlSW5kZXgobix0aGlzLnN0YXRlKSxpdGVtc0luU2xpZGU6ZSxpc05leHRTbGlkZURpc2FibGVkOm4saXNQcmV2U2xpZGVEaXNhYmxlZDppLHR5cGU6dHlwZXNfMS5FdmVudFR5cGUuQUNUSU9OfX0sZW51bWVyYWJsZTohMSxjb25maWd1cmFibGU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodC5wcm90b3R5cGUsXCJpc0ZhZGVvdXRBbmltYXRpb25BbGxvd2VkXCIse2dldDpmdW5jdGlvbigpe3ZhciB0PXRoaXMuc3RhdGUuaXRlbXNJblNsaWRlLGU9dGhpcy5wcm9wcyxpPWUuYW5pbWF0aW9uVHlwZSxuPWUucGFkZGluZ0xlZnQsbz1lLnBhZGRpbmdSaWdodCxlPWUuYXV0b1dpZHRoO3JldHVybiAxPT09dCYmaT09PXR5cGVzXzEuQW5pbWF0aW9uVHlwZS5GQURFT1VUJiYhKG58fG98fGUpfSxlbnVtZXJhYmxlOiExLGNvbmZpZ3VyYWJsZTohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LnByb3RvdHlwZSxcInRvdWNobW92ZVBvc2l0aW9uXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB2b2lkIDAhPT10aGlzLnN0YXJ0VG91Y2htb3ZlUG9zaXRpb24/dGhpcy5zdGFydFRvdWNobW92ZVBvc2l0aW9uOnRoaXMuc3RhdGUudHJhbnNsYXRlM2R9LGVudW1lcmFibGU6ITEsY29uZmlndXJhYmxlOiEwfSksdC5wcm90b3R5cGUuc2xpZGVUbz1mdW5jdGlvbih0LGUpe3ZhciBpLG4sbzt2b2lkIDA9PT10JiYodD0wKSx0aGlzLl9oYW5kbGVQYXVzZSgpLHRoaXMuaXNGYWRlb3V0QW5pbWF0aW9uQWxsb3dlZD8oaT1VdGlscy5nZXRVcGRhdGVTbGlkZVBvc2l0aW9uSW5kZXgodCx0aGlzLnN0YXRlLml0ZW1zQ291bnQpLG49VXRpbHMuZ2V0RmFkZW91dEFuaW1hdGlvblBvc2l0aW9uKGksdGhpcy5zdGF0ZSksbz1VdGlscy5nZXRGYWRlb3V0QW5pbWF0aW9uSW5kZXgodGhpcy5zdGF0ZSksdGhpcy5faGFuZGxlU2xpZGVUbyh7YWN0aXZlSW5kZXg6aSxmYWRlb3V0QW5pbWF0aW9uSW5kZXg6byxmYWRlb3V0QW5pbWF0aW9uUG9zaXRpb246bixldmVudFR5cGU6ZX0pKTp0aGlzLl9oYW5kbGVTbGlkZVRvKHthY3RpdmVJbmRleDp0LGV2ZW50VHlwZTplfSl9LHQucHJvdG90eXBlLnNsaWRlUHJldj1mdW5jdGlvbih0KXt0aGlzLl9oYW5kbGVQYXVzZSgpLHQmJnQuaXNUcnVzdGVkJiYodGhpcy5oYXNVc2VyQWN0aW9uPSEwKTt2YXIgZSxpLHQ9dGhpcy5zdGF0ZS5hY3RpdmVJbmRleC0xO3RoaXMuaXNGYWRlb3V0QW5pbWF0aW9uQWxsb3dlZD8oZT0tdGhpcy5zdGF0ZS5zdGFnZVdpZHRoLGk9VXRpbHMuZ2V0RmFkZW91dEFuaW1hdGlvbkluZGV4KHRoaXMuc3RhdGUpLHRoaXMuX2hhbmRsZVNsaWRlVG8oe2FjdGl2ZUluZGV4OnQsZmFkZW91dEFuaW1hdGlvbkluZGV4OmksZmFkZW91dEFuaW1hdGlvblBvc2l0aW9uOmV9KSk6dGhpcy5faGFuZGxlU2xpZGVUbyh7YWN0aXZlSW5kZXg6dH0pfSx0LnByb3RvdHlwZS5zbGlkZU5leHQ9ZnVuY3Rpb24odCl7dGhpcy5faGFuZGxlUGF1c2UoKSx0JiZ0LmlzVHJ1c3RlZCYmKHRoaXMuaGFzVXNlckFjdGlvbj0hMCk7dmFyIGUsaSx0PXRoaXMuc3RhdGUuYWN0aXZlSW5kZXgrMTt0aGlzLmlzRmFkZW91dEFuaW1hdGlvbkFsbG93ZWQ/KGU9dGhpcy5zdGF0ZS5zdGFnZVdpZHRoLGk9VXRpbHMuZ2V0RmFkZW91dEFuaW1hdGlvbkluZGV4KHRoaXMuc3RhdGUpLHRoaXMuX2hhbmRsZVNsaWRlVG8oe2FjdGl2ZUluZGV4OnQsZmFkZW91dEFuaW1hdGlvbkluZGV4OmksZmFkZW91dEFuaW1hdGlvblBvc2l0aW9uOmV9KSk6dGhpcy5faGFuZGxlU2xpZGVUbyh7YWN0aXZlSW5kZXg6dH0pfSx0LnByb3RvdHlwZS5fYWRkRXZlbnRMaXN0ZW5lcnM9ZnVuY3Rpb24oKXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2hhbmRsZVJlc2l6ZURlYm91bmNlZCksdGhpcy5wcm9wcy5rZXlib2FyZE5hdmlnYXRpb24mJndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIix0aGlzLl9oYW5kbGVLZXlib2FyZEV2ZW50cyl9LHQucHJvdG90eXBlLl9yZW1vdmVFdmVudExpc3RlbmVycz1mdW5jdGlvbigpe3RoaXMuc3dpcGVMaXN0ZW5lciYmdGhpcy5zd2lwZUxpc3RlbmVyLmRlc3Ryb3koKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2hhbmRsZVJlc2l6ZURlYm91bmNlZCksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLHRoaXMuX2hhbmRsZUtleWJvYXJkRXZlbnRzKX0sdC5wcm90b3R5cGUuX3VwZGF0ZUV2ZW50TGlzdGVuZXJzPWZ1bmN0aW9uKCl7dGhpcy5wcm9wcy5rZXlib2FyZE5hdmlnYXRpb24/d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLHRoaXMuX2hhbmRsZUtleWJvYXJkRXZlbnRzKTp3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsdGhpcy5faGFuZGxlS2V5Ym9hcmRFdmVudHMpfSx0LnByb3RvdHlwZS5faGFuZGxlUmVzaXplPWZ1bmN0aW9uKG8pe3JldHVybiBfX2F3YWl0ZXIodGhpcyx2b2lkIDAsdm9pZCAwLGZ1bmN0aW9uKCl7dmFyIGUsaSxuO3JldHVybiBfX2dlbmVyYXRvcih0aGlzLGZ1bmN0aW9uKHQpe3N3aXRjaCh0LmxhYmVsKXtjYXNlIDA6cmV0dXJuKGk9dGhpcy5wcm9wcy5vblJlc2l6ZUV2ZW50LG49VXRpbHMuZ2V0RWxlbWVudERpbWVuc2lvbnModGhpcy5yb290RWxlbWVudCksKGl8fFV0aWxzLnNob3VsZEhhbmRsZVJlc2l6ZUV2ZW50KShvLHRoaXMucm9vdENvbXBvbmVudERpbWVuc2lvbnMsbikpPyh0aGlzLl9jYW5jZWxUaW1lb3V0QW5pbWF0aW9ucygpLHRoaXMucm9vdENvbXBvbmVudERpbWVuc2lvbnM9bixpPXRoaXMuc3RhdGUsbj1pLml0ZW1zQ291bnQsZT1pLmlzQXV0b1BsYXlpbmcsaT1VdGlscy5nZXRVcGRhdGVTbGlkZVBvc2l0aW9uSW5kZXgodGhpcy5zdGF0ZS5hY3RpdmVJbmRleCxuKSxuPVV0aWxzLmNhbGN1bGF0ZUluaXRpYWxTdGF0ZShfX2Fzc2lnbihfX2Fzc2lnbih7fSx0aGlzLnByb3BzKSx7YWN0aXZlSW5kZXg6aX0pLHRoaXMuc3RhZ2VDb21wb25lbnQpLGk9VXRpbHMuZ2V0VHJhbnNsYXRlM2RQcm9wZXJ0eShuLmFjdGl2ZUluZGV4LG4pLG49X19hc3NpZ24oX19hc3NpZ24oe30sbikse3RyYW5zbGF0ZTNkOmksaXNBdXRvUGxheWluZzplfSksVXRpbHMuYW5pbWF0ZSh0aGlzLnN0YWdlQ29tcG9uZW50LHtwb3NpdGlvbjotaX0pLFs0LHRoaXMuc2V0U3RhdGUobildKTpbMywyXTtjYXNlIDE6dC5zZW50KCksdGhpcy5faGFuZGxlUmVzaXplZCgpLHRoaXMuaXNBbmltYXRpb25EaXNhYmxlZD0hMSxlJiZ0aGlzLl9oYW5kbGVQbGF5KCksdC5sYWJlbD0yO2Nhc2UgMjpyZXR1cm5bMl19fSl9KX0sdC5wcm90b3R5cGUuX2hhbmRsZVRvdWNobW92ZT1mdW5jdGlvbih0LGUpe3ZhciBpPWUuYWJzWSxuPWUuYWJzWCxvPWUuZGVsdGFYLGU9dGhpcy5wcm9wcy5zd2lwZURlbHRhLHM9dGhpcy5zdGF0ZSxhPXMuc3dpcGVTaGlmdFZhbHVlLHI9cy5zd2lwZUxpbWl0TWluLGw9cy5zd2lwZUxpbWl0TWF4LHU9cy5pbmZpbml0ZSxzPXMuZmFkZW91dEFuaW1hdGlvblByb2Nlc3Npbmc7aWYodGhpcy5oYXNVc2VyQWN0aW9uPSEwLCEoc3x8IXRoaXMuaXNUb3VjaE1vdmVQcm9jZXNzU3RhcnRlZCYmVXRpbHMuaXNWZXJ0aWNhbFRvdWNobW92ZURldGVjdGVkKG4saSxlKSkpe3RoaXMuaXNUb3VjaE1vdmVQcm9jZXNzU3RhcnRlZHx8KHRoaXMuX2NhbmNlbFRpbWVvdXRBbmltYXRpb25zKCksdGhpcy5fc2V0VG91Y2htb3ZlUG9zaXRpb24oKSx0aGlzLmlzQW5pbWF0aW9uRGlzYWJsZWQ9ITAsdGhpcy5pc1RvdWNoTW92ZVByb2Nlc3NTdGFydGVkPSEwLHRoaXMuX2hhbmRsZVNsaWRlQ2hhbmdlKCkpO3ZhciBkPVV0aWxzLmdldFRvdWNobW92ZVRyYW5zbGF0ZVBvc2l0aW9uKG8sdGhpcy50b3VjaG1vdmVQb3NpdGlvbik7aWYoITE9PT11KXJldHVybiByPGR8fGQ8LWw/dm9pZCAwOnZvaWQgVXRpbHMuYW5pbWF0ZSh0aGlzLnN0YWdlQ29tcG9uZW50LHtwb3NpdGlvbjpkfSk7aWYoVXRpbHMuc2hvdWxkUmVjYWxjdWxhdGVTd2lwZVBvc2l0aW9uKGQscixsKSl0cnl7IWZ1bmN0aW9uIHQoKXtVdGlscy5nZXRJc0xlZnREaXJlY3Rpb24obyk/ZCs9YTpkKz0tYTtVdGlscy5zaG91bGRSZWNhbGN1bGF0ZVN3aXBlUG9zaXRpb24oZCxyLGwpJiZ0KCl9KCl9Y2F0Y2godCl7VXRpbHMuZGVidWcodCl9VXRpbHMuYW5pbWF0ZSh0aGlzLnN0YWdlQ29tcG9uZW50LHtwb3NpdGlvbjpkfSl9fSx0LnByb3RvdHlwZS5faGFuZGxlVG91Y2hlbmQ9ZnVuY3Rpb24odCxlKXt2YXIgaSxuLG8sZT1lLmRlbHRhWDt0aGlzLl9jbGVhclRvdWNobW92ZVBvc2l0aW9uKCksdGhpcy5pc1RvdWNoTW92ZVByb2Nlc3NTdGFydGVkJiYodGhpcy5pc1RvdWNoTW92ZVByb2Nlc3NTdGFydGVkPSExLGk9dGhpcy5zdGF0ZS5hbmltYXRpb25EdXJhdGlvbixuPXRoaXMucHJvcHMuYW5pbWF0aW9uRWFzaW5nRnVuY3Rpb24sbz1VdGlscy5nZXRUcmFuc2xhdGVYUHJvcGVydHkodGhpcy5zdGFnZUNvbXBvbmVudCksZT1VdGlscy5nZXRTd2lwZVRvdWNoZW5kUG9zaXRpb24odGhpcy5zdGF0ZSxlLG8pLFV0aWxzLmFuaW1hdGUodGhpcy5zdGFnZUNvbXBvbmVudCx7cG9zaXRpb246ZSxhbmltYXRpb25EdXJhdGlvbjppLGFuaW1hdGlvbkVhc2luZ0Z1bmN0aW9uOm59KSx0aGlzLl9oYW5kbGVCZWZvcmVUb3VjaEVuZChlKSl9LHQucHJvdG90eXBlLl9oYW5kbGVCZWZvcmVUb3VjaEVuZD1mdW5jdGlvbihzKXt2YXIgdD10aGlzLGU9dGhpcy5zdGF0ZS5hbmltYXRpb25EdXJhdGlvbjt0aGlzLnRvdWNoRW5kVGltZW91dElkPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIF9fYXdhaXRlcih0LHZvaWQgMCx2b2lkIDAsZnVuY3Rpb24oKXt2YXIgZSxpLG4sbz10aGlzO3JldHVybiBfX2dlbmVyYXRvcih0aGlzLGZ1bmN0aW9uKHQpe3N3aXRjaCh0LmxhYmVsKXtjYXNlIDA6cmV0dXJuIGU9VXRpbHMuZ2V0U3dpcGVUb3VjaGVuZEluZGV4KHMsdGhpcy5zdGF0ZSksaT1VdGlscy5nZXRUcmFuc2xhdGUzZFByb3BlcnR5KGUsdGhpcy5zdGF0ZSksVXRpbHMuYW5pbWF0ZSh0aGlzLnN0YWdlQ29tcG9uZW50LHtwb3NpdGlvbjotaX0pLG49VXRpbHMuZ2V0VHJhbnNpdGlvblByb3BlcnR5KCksWzQsdGhpcy5zZXRTdGF0ZSh7YWN0aXZlSW5kZXg6ZSx0cmFuc2xhdGUzZDppLHRyYW5zaXRpb246bn0pXTtjYXNlIDE6cmV0dXJuIHQuc2VudCgpLHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe3JldHVybiBvLl9oYW5kbGVTbGlkZUNoYW5nZWQoKX0pLFsyXX19KX0pfSxlKX0sdC5wcm90b3R5cGUuX2hhbmRsZVNsaWRlVG89ZnVuY3Rpb24odCl7dmFyIGU9dC5hY3RpdmVJbmRleCxhPXZvaWQgMD09PWU/MDplLGU9dC5mYWRlb3V0QW5pbWF0aW9uSW5kZXgscj12b2lkIDA9PT1lP251bGw6ZSxlPXQuZmFkZW91dEFuaW1hdGlvblBvc2l0aW9uLGw9dm9pZCAwPT09ZT9udWxsOmUsdT10LmV2ZW50VHlwZTtyZXR1cm4gX19hd2FpdGVyKHRoaXMsdm9pZCAwLHZvaWQgMCxmdW5jdGlvbigpe3ZhciBlLGksbixvLHM9dGhpcztyZXR1cm4gX19nZW5lcmF0b3IodGhpcyxmdW5jdGlvbih0KXtzd2l0Y2godC5sYWJlbCl7Y2FzZSAwOnJldHVybihpPXRoaXMucHJvcHMsbj1pLmluZmluaXRlLGk9aS5hbmltYXRpb25FYXNpbmdGdW5jdGlvbixlPXRoaXMuc3RhdGUsbz1lLml0ZW1zQ291bnQsZT1lLmFuaW1hdGlvbkR1cmF0aW9uLHRoaXMuaXNBbmltYXRpb25EaXNhYmxlZHx8dGhpcy5zdGF0ZS5hY3RpdmVJbmRleD09PWF8fCFuJiZVdGlscy5zaG91bGRDYW5jZWxTbGlkZUFuaW1hdGlvbihhLG8pKT9bMl06KHRoaXMuaXNBbmltYXRpb25EaXNhYmxlZD0hMCx0aGlzLl9jYW5jZWxUaW1lb3V0QW5pbWF0aW9ucygpLHRoaXMuX2hhbmRsZVNsaWRlQ2hhbmdlKHUpLG49ITEsbz1VdGlscy5nZXRUcmFuc2xhdGUzZFByb3BlcnR5KGEsdGhpcy5zdGF0ZSksaT1udWxsIT09ciYmbnVsbCE9PWw/KG49ITAsVXRpbHMuZ2V0VHJhbnNpdGlvblByb3BlcnR5KCkpOlV0aWxzLmdldFRyYW5zaXRpb25Qcm9wZXJ0eSh7YW5pbWF0aW9uRHVyYXRpb246ZSxhbmltYXRpb25FYXNpbmdGdW5jdGlvbjppfSksWzQsdGhpcy5zZXRTdGF0ZSh7YWN0aXZlSW5kZXg6YSx0cmFuc2l0aW9uOmksdHJhbnNsYXRlM2Q6byxhbmltYXRpb25EdXJhdGlvbjplLGZhZGVvdXRBbmltYXRpb25JbmRleDpyLGZhZGVvdXRBbmltYXRpb25Qb3NpdGlvbjpsLGZhZGVvdXRBbmltYXRpb25Qcm9jZXNzaW5nOm59KV0pO2Nhc2UgMTpyZXR1cm4gdC5zZW50KCksdGhpcy5zbGlkZUVuZFRpbWVvdXRJZD13aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBzLl9oYW5kbGVCZWZvcmVTbGlkZUVuZCh1KX0sZSksWzJdfX0pfSl9LHQucHJvdG90eXBlLl9oYW5kbGVVcGRhdGVTbGlkZVBvc2l0aW9uPWZ1bmN0aW9uKG8pe3JldHVybiBfX2F3YWl0ZXIodGhpcyx2b2lkIDAsdm9pZCAwLGZ1bmN0aW9uKCl7dmFyIGUsaSxuO3JldHVybiBfX2dlbmVyYXRvcih0aGlzLGZ1bmN0aW9uKHQpe3N3aXRjaCh0LmxhYmVsKXtjYXNlIDA6cmV0dXJuIGU9dGhpcy5zdGF0ZS5hbmltYXRpb25EdXJhdGlvbixpPVV0aWxzLmdldFRyYW5zbGF0ZTNkUHJvcGVydHkobyx0aGlzLnN0YXRlKSxuPVV0aWxzLmdldFRyYW5zaXRpb25Qcm9wZXJ0eSh7YW5pbWF0aW9uRHVyYXRpb246MH0pLFs0LHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUluZGV4Om8sdHJhbnNsYXRlM2Q6aSx0cmFuc2l0aW9uOm4sYW5pbWF0aW9uRHVyYXRpb246ZSxmYWRlb3V0QW5pbWF0aW9uSW5kZXg6bnVsbCxmYWRlb3V0QW5pbWF0aW9uUG9zaXRpb246bnVsbCxmYWRlb3V0QW5pbWF0aW9uUHJvY2Vzc2luZzohMX0pXTtjYXNlIDE6cmV0dXJuIHQuc2VudCgpLFsyXX19KX0pfSx0LnByb3RvdHlwZS5faGFuZGxlUmVzaXplZD1mdW5jdGlvbigpe3RoaXMucHJvcHMub25SZXNpemVkJiZ0aGlzLnByb3BzLm9uUmVzaXplZChfX2Fzc2lnbihfX2Fzc2lnbih7fSx0aGlzLmV2ZW50T2JqZWN0KSx7dHlwZTp0eXBlc18xLkV2ZW50VHlwZS5SRVNJWkV9KSl9LHQucHJvdG90eXBlLl9oYW5kbGVTbGlkZUNoYW5nZT1mdW5jdGlvbih0KXt0aGlzLnByb3BzLm9uU2xpZGVDaGFuZ2UmJih0PXQ/X19hc3NpZ24oX19hc3NpZ24oe30sdGhpcy5ldmVudE9iamVjdCkse3R5cGU6dH0pOnRoaXMuZXZlbnRPYmplY3QsdGhpcy5wcm9wcy5vblNsaWRlQ2hhbmdlKHQpKX0sdC5wcm90b3R5cGUuX2hhbmRsZVNsaWRlQ2hhbmdlZD1mdW5jdGlvbihzKXtyZXR1cm4gX19hd2FpdGVyKHRoaXMsdm9pZCAwLHZvaWQgMCxmdW5jdGlvbigpe3ZhciBlLGksbixvO3JldHVybiBfX2dlbmVyYXRvcih0aGlzLGZ1bmN0aW9uKHQpe3N3aXRjaCh0LmxhYmVsKXtjYXNlIDA6cmV0dXJuKGk9dGhpcy5zdGF0ZSxlPWkuaXNBdXRvUGxheWluZyxpPWkuaXNBdXRvUGxheUNhbmNlbGVkT25BY3Rpb24sbj10aGlzLnByb3BzLG89bi5hdXRvUGxheVN0cmF0ZWd5LG49bi5vblNsaWRlQ2hhbmdlZCxVdGlscy5zaG91bGRDYW5jZWxBdXRvUGxheU9uQWN0aW9uKG8pJiZ0aGlzLmhhc1VzZXJBY3Rpb24mJiFpKT9bNCx0aGlzLnNldFN0YXRlKHtpc0F1dG9QbGF5Q2FuY2VsZWRPbkFjdGlvbjohMCxpc0F1dG9QbGF5aW5nOiExfSldOlszLDJdO2Nhc2UgMTpyZXR1cm4gdC5zZW50KCksWzMsM107Y2FzZSAyOmUmJnRoaXMuX2hhbmRsZVBsYXkoKSx0LmxhYmVsPTM7Y2FzZSAzOnJldHVybiB0aGlzLmlzQW5pbWF0aW9uRGlzYWJsZWQ9ITEsbiYmKG89cz9fX2Fzc2lnbihfX2Fzc2lnbih7fSx0aGlzLmV2ZW50T2JqZWN0KSx7dHlwZTpzfSk6dGhpcy5ldmVudE9iamVjdCxuKG8pKSxbMl19fSl9KX0sdC5wcm90b3R5cGUuX2hhbmRsZURvdENsaWNrPWZ1bmN0aW9uKHQpe3RoaXMuaGFzVXNlckFjdGlvbj0hMCx0aGlzLnNsaWRlVG8odCl9LHQucHJvdG90eXBlLl9oYW5kbGVQbGF5PWZ1bmN0aW9uKCl7dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpfSx0LnByb3RvdHlwZS5fY2FuY2VsVGltZW91dEFuaW1hdGlvbnM9ZnVuY3Rpb24oKXt0aGlzLl9jbGVhckF1dG9QbGF5VGltZW91dCgpLHRoaXMuX2NsZWFyU2xpZGVFbmRUaW1lb3V0KCksdGhpcy5jbGVhclRvdWNoZW5kVGltZW91dCgpfSx0LnByb3RvdHlwZS5fY2xlYXJBdXRvUGxheVRpbWVvdXQ9ZnVuY3Rpb24oKXt3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuYXV0b1BsYXlUaW1lb3V0SWQpLHRoaXMuYXV0b1BsYXlUaW1lb3V0SWQ9dm9pZCAwfSx0LnByb3RvdHlwZS5fY2xlYXJTbGlkZUVuZFRpbWVvdXQ9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQodGhpcy5zbGlkZUVuZFRpbWVvdXRJZCksdGhpcy5zbGlkZUVuZFRpbWVvdXRJZD12b2lkIDB9LHQucHJvdG90eXBlLmNsZWFyVG91Y2hlbmRUaW1lb3V0PWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHRoaXMudG91Y2hFbmRUaW1lb3V0SWQpLHRoaXMudG91Y2hFbmRUaW1lb3V0SWQ9dm9pZCAwfSx0LnByb3RvdHlwZS5fY2xlYXJUb3VjaG1vdmVQb3NpdGlvbj1mdW5jdGlvbigpe3RoaXMuc3RhcnRUb3VjaG1vdmVQb3NpdGlvbj12b2lkIDB9LHQucHJvdG90eXBlLl9zZXRUb3VjaG1vdmVQb3NpdGlvbj1mdW5jdGlvbigpe3ZhciB0PVV0aWxzLmdldFRyYW5zbGF0ZVhQcm9wZXJ0eSh0aGlzLnN0YWdlQ29tcG9uZW50KTt0aGlzLnN0YXJ0VG91Y2htb3ZlUG9zaXRpb249LXR9LHQucHJvdG90eXBlLl9zZXRJbml0aWFsU3RhdGU9ZnVuY3Rpb24oKXtyZXR1cm4gX19hd2FpdGVyKHRoaXMsdm9pZCAwLHZvaWQgMCxmdW5jdGlvbigpe3ZhciBlO3JldHVybiBfX2dlbmVyYXRvcih0aGlzLGZ1bmN0aW9uKHQpe3N3aXRjaCh0LmxhYmVsKXtjYXNlIDA6cmV0dXJuIGU9VXRpbHMuY2FsY3VsYXRlSW5pdGlhbFN0YXRlKHRoaXMucHJvcHMsdGhpcy5zdGFnZUNvbXBvbmVudCksdGhpcy5yb290Q29tcG9uZW50RGltZW5zaW9ucz1VdGlscy5nZXRFbGVtZW50RGltZW5zaW9ucyh0aGlzLnJvb3RFbGVtZW50KSxbNCx0aGlzLnNldFN0YXRlKGUpXTtjYXNlIDE6cmV0dXJuIHQuc2VudCgpLHRoaXMucHJvcHMub25Jbml0aWFsaXplZCYmdGhpcy5wcm9wcy5vbkluaXRpYWxpemVkKF9fYXNzaWduKF9fYXNzaWduKHt9LHRoaXMuZXZlbnRPYmplY3QpLHt0eXBlOnR5cGVzXzEuRXZlbnRUeXBlLklOSVR9KSksWzJdfX0pfSl9LHQucHJvdG90eXBlLl9zZXRBdXRvUGxheUludGVydmFsPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPXRoaXMucHJvcHMsaT1lLmF1dG9QbGF5RGlyZWN0aW9uLGU9ZS5hdXRvUGxheUludGVydmFsO3RoaXMuYXV0b1BsYXlUaW1lb3V0SWQ9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LmlzSG92ZXJlZHx8KGk9PT10eXBlc18xLkF1dG9wbGF5RGlyZWN0aW9uLlJUTD90LnNsaWRlUHJldigpOnQuc2xpZGVOZXh0KCkpfSxlKX0sdC5wcm90b3R5cGUuX3NldHVwU3dpcGVIYW5kbGVycz1mdW5jdGlvbigpe3RoaXMuc3dpcGVMaXN0ZW5lcj1uZXcgdmFuaWxsYV9zd2lwZV8xLmRlZmF1bHQoe2VsZW1lbnQ6dGhpcy5yb290RWxlbWVudCxkZWx0YTp0aGlzLnByb3BzLnN3aXBlRGVsdGEsb25Td2lwaW5nOnRoaXMuX2hhbmRsZVRvdWNobW92ZSxvblN3aXBlZDp0aGlzLl9oYW5kbGVUb3VjaGVuZCxyb3RhdGlvbkFuZ2xlOjUsbW91c2VUcmFja2luZ0VuYWJsZWQ6dGhpcy5wcm9wcy5tb3VzZVRyYWNraW5nLHRvdWNoVHJhY2tpbmdFbmFibGVkOnRoaXMucHJvcHMudG91Y2hUcmFja2luZyxwcmV2ZW50RGVmYXVsdFRvdWNobW92ZUV2ZW50OiF0aGlzLnByb3BzLnRvdWNoTW92ZURlZmF1bHRFdmVudHMscHJldmVudFRyYWNraW5nT25Nb3VzZWxlYXZlOiEwfSksdGhpcy5zd2lwZUxpc3RlbmVyLmluaXQoKX0sdC5wcm90b3R5cGUuX3VwZGF0ZUNvbXBvbmVudD1mdW5jdGlvbih0KXt2YXIgZT10aGlzO3ZvaWQgMD09PXQmJih0PXRoaXMucHJvcHMpLHRoaXMuX2NhbmNlbFRpbWVvdXRBbmltYXRpb25zKCksdGhpcy5pc0FuaW1hdGlvbkRpc2FibGVkPSExLHRoaXMuc3RhdGUuaXNBdXRvUGxheWluZyYmdGhpcy5faGFuZGxlUGxheSgpLHRoaXMuc2V0U3RhdGUoe2Nsb25lczpVdGlscy5jcmVhdGVDbG9uZXModCl9KSxyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtlLnNldFN0YXRlKFV0aWxzLmNhbGN1bGF0ZUluaXRpYWxTdGF0ZSh0LGUuc3RhZ2VDb21wb25lbnQpKX0pfSx0LnByb3RvdHlwZS5fdXBkYXRlU3dpcGVQcm9wcz1mdW5jdGlvbigpe3RoaXMuc3dpcGVMaXN0ZW5lciYmdGhpcy5zd2lwZUxpc3RlbmVyLnVwZGF0ZSh7ZGVsdGE6dGhpcy5wcm9wcy5zd2lwZURlbHRhLG1vdXNlVHJhY2tpbmdFbmFibGVkOnRoaXMucHJvcHMubW91c2VUcmFja2luZyx0b3VjaFRyYWNraW5nRW5hYmxlZDp0aGlzLnByb3BzLnRvdWNoVHJhY2tpbmcscHJldmVudERlZmF1bHRUb3VjaG1vdmVFdmVudDohdGhpcy5wcm9wcy50b3VjaE1vdmVEZWZhdWx0RXZlbnRzfSl9LHQucHJvdG90eXBlLl9yZW5kZXJEb3RzTmF2aWdhdGlvbj1mdW5jdGlvbigpe3ZhciB0PXRoaXMucHJvcHMsZT10LnJlbmRlckRvdHNJdGVtLHQ9dC5jb250cm9sc1N0cmF0ZWd5O3JldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChWaWV3cy5Eb3RzTmF2aWdhdGlvbix7c3RhdGU6dGhpcy5zdGF0ZSxvbkNsaWNrOnRoaXMuX2hhbmRsZURvdENsaWNrLHJlbmRlckRvdHNJdGVtOmUsY29udHJvbHNTdHJhdGVneTp0fSl9LHQucHJvdG90eXBlLl9yZW5kZXJQcmV2QnV0dG9uPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5wcm9wcy5yZW5kZXJQcmV2QnV0dG9uLGU9VXRpbHMuZ2V0U2xpZGVJdGVtSW5mbyh0aGlzLnN0YXRlKS5pc1ByZXZTbGlkZURpc2FibGVkO3JldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChWaWV3cy5QcmV2TmV4dEJ1dHRvbix7bmFtZTpcInByZXZcIixvbkNsaWNrOnRoaXMuc2xpZGVQcmV2LGlzRGlzYWJsZWQ6ZSxyZW5kZXJQcmV2QnV0dG9uOnR9KX0sdC5wcm90b3R5cGUuX3JlbmRlck5leHRCdXR0b249ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnByb3BzLnJlbmRlck5leHRCdXR0b24sZT1VdGlscy5nZXRTbGlkZUl0ZW1JbmZvKHRoaXMuc3RhdGUpLmlzTmV4dFNsaWRlRGlzYWJsZWQ7cmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFZpZXdzLlByZXZOZXh0QnV0dG9uLHtuYW1lOlwibmV4dFwiLG9uQ2xpY2s6dGhpcy5zbGlkZU5leHQsaXNEaXNhYmxlZDplLHJlbmRlck5leHRCdXR0b246dH0pfSx0LnByb3RvdHlwZS5fcmVuZGVyUGxheVBhdXNlQnV0dG9uPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5wcm9wcy5yZW5kZXJQbGF5UGF1c2VCdXR0b24sZT10aGlzLnN0YXRlLmlzQXV0b1BsYXlpbmc7cmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFZpZXdzLlBsYXlQYXVzZUJ1dHRvbix7aXNQbGF5aW5nOmUsb25DbGljazp0aGlzLl9oYW5kbGVQbGF5UGF1c2VUb2dnbGUscmVuZGVyUGxheVBhdXNlQnV0dG9uOnR9KX0sdC5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5zdGF0ZSxlPXQudHJhbnNsYXRlM2QsaT10LmNsb25lcyxuPXQudHJhbnNpdGlvbix0PXQuY2FuVXNlRG9tLG89VXRpbHMuc2hvdWxkRGlzYWJsZURvdHModGhpcy5wcm9wcyx0aGlzLnN0YXRlKSxzPVV0aWxzLnNob3VsZERpc2FibGVCdXR0b25zKHRoaXMucHJvcHMsdGhpcy5zdGF0ZSksYT1VdGlscy5nZXRSZW5kZXJXcmFwcGVyU3R5bGVzKHRoaXMucHJvcHMsdGhpcy5zdGF0ZSx0aGlzLnN0YWdlQ29tcG9uZW50KSxlPVV0aWxzLmdldFJlbmRlclN0YWdlU3R5bGVzKHt0cmFuc2xhdGUzZDplfSx7dHJhbnNpdGlvbjpufSksbj10aGlzLnByb3BzLnNzclNpbGVudE1vZGV8fHQ/XCJcIjp0eXBlc18xLk1vZGlmaWVycy5TU1IsdD1VdGlscy5jb25jYXRDbGFzc25hbWVzKHR5cGVzXzEuQ2xhc3NuYW1lcy5ST09ULG4pO3JldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLHtjbGFzc05hbWU6dH0scmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7cmVmOnRoaXMuX3NldFJvb3RDb21wb25lbnRSZWZ9LHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse3N0eWxlOmEsY2xhc3NOYW1lOnR5cGVzXzEuQ2xhc3NuYW1lcy5XUkFQUEVSLG9uTW91c2VFbnRlcjp0aGlzLl9oYW5kbGVNb3VzZUVudGVyLG9uTW91c2VMZWF2ZTp0aGlzLl9oYW5kbGVNb3VzZUxlYXZlfSxyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInVsXCIse3N0eWxlOmUsY2xhc3NOYW1lOnR5cGVzXzEuQ2xhc3NuYW1lcy5TVEFHRSxyZWY6dGhpcy5fc2V0U3RhZ2VDb21wb25lbnRSZWZ9LGkubWFwKHRoaXMuX3JlbmRlclN0YWdlSXRlbSkpKSksbz9udWxsOnRoaXMuX3JlbmRlckRvdHNOYXZpZ2F0aW9uKCkscz9udWxsOnRoaXMuX3JlbmRlclByZXZCdXR0b24oKSxzP251bGw6dGhpcy5fcmVuZGVyTmV4dEJ1dHRvbigpLHRoaXMucHJvcHMuZGlzYWJsZVNsaWRlSW5mbz9udWxsOnRoaXMuX3JlbmRlclNsaWRlSW5mbygpLHRoaXMucHJvcHMuYXV0b1BsYXlDb250cm9scz90aGlzLl9yZW5kZXJQbGF5UGF1c2VCdXR0b24oKTpudWxsKX0sdC5kZWZhdWx0UHJvcHM9ZGVmYXVsdFByb3BzXzEuZGVmYXVsdFByb3BzLHR9KHJlYWN0XzEuZGVmYXVsdC5QdXJlQ29tcG9uZW50KSk7ZXhwb3J0cy5kZWZhdWx0PUFsaWNlQ2Fyb3VzZWw7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcblxuZnVuY3Rpb24gcGFyc2UodXVpZCkge1xuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIGxldCB2O1xuICBjb25zdCBhcnIgPSBuZXcgVWludDhBcnJheSgxNik7IC8vIFBhcnNlICMjIyMjIyMjLS4uLi4tLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFyclswXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgwLCA4KSwgMTYpKSA+Pj4gMjQ7XG4gIGFyclsxXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzJdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclszXSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0jIyMjLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoOSwgMTMpLCAxNikpID4+PiA4O1xuICBhcnJbNV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0jIyMjLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzZdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxOCksIDE2KSkgPj4+IDg7XG4gIGFycls3XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tIyMjIy0uLi4uLi4uLi4uLi5cblxuICBhcnJbOF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTksIDIzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzldID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0uLi4uLSMjIyMjIyMjIyMjI1xuICAvLyAoVXNlIFwiL1wiIHRvIGF2b2lkIDMyLWJpdCB0cnVuY2F0aW9uIHdoZW4gYml0LXNoaWZ0aW5nIGhpZ2gtb3JkZXIgYnl0ZXMpXG5cbiAgYXJyWzEwXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgyNCwgMzYpLCAxNikpIC8gMHgxMDAwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMV0gPSB2IC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTJdID0gdiA+Pj4gMjQgJiAweGZmO1xuICBhcnJbMTNdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMTRdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclsxNV0gPSB2ICYgMHhmZjtcbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2U7IiwiaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UuanMnO1xuXG5mdW5jdGlvbiBzdHJpbmdUb0J5dGVzKHN0cikge1xuICBzdHIgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgY29uc3QgYnl0ZXMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO1xuICB9XG5cbiAgcmV0dXJuIGJ5dGVzO1xufVxuXG5leHBvcnQgY29uc3QgRE5TID0gJzZiYTdiODEwLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnQgY29uc3QgVVJMID0gJzZiYTdiODExLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2MzUobmFtZSwgdmVyc2lvbiwgaGFzaGZ1bmMpIHtcbiAgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIF9uYW1lc3BhY2U7XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBzdHJpbmdUb0J5dGVzKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWVzcGFjZSA9IHBhcnNlKG5hbWVzcGFjZSk7XG4gICAgfVxuXG4gICAgaWYgKCgoX25hbWVzcGFjZSA9IG5hbWVzcGFjZSkgPT09IG51bGwgfHwgX25hbWVzcGFjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX25hbWVzcGFjZS5sZW5ndGgpICE9PSAxNikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdOYW1lc3BhY2UgbXVzdCBiZSBhcnJheS1saWtlICgxNiBpdGVyYWJsZSBpbnRlZ2VyIHZhbHVlcywgMC0yNTUpJyk7XG4gICAgfSAvLyBDb21wdXRlIGhhc2ggb2YgbmFtZXNwYWNlIGFuZCB2YWx1ZSwgUGVyIDQuM1xuICAgIC8vIEZ1dHVyZTogVXNlIHNwcmVhZCBzeW50YXggd2hlbiBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgZS5nLiBgYnl0ZXMgPVxuICAgIC8vIGhhc2hmdW5jKFsuLi5uYW1lc3BhY2UsIC4uLiB2YWx1ZV0pYFxuXG5cbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNiArIHZhbHVlLmxlbmd0aCk7XG4gICAgYnl0ZXMuc2V0KG5hbWVzcGFjZSk7XG4gICAgYnl0ZXMuc2V0KHZhbHVlLCBuYW1lc3BhY2UubGVuZ3RoKTtcbiAgICBieXRlcyA9IGhhc2hmdW5jKGJ5dGVzKTtcbiAgICBieXRlc1s2XSA9IGJ5dGVzWzZdICYgMHgwZiB8IHZlcnNpb247XG4gICAgYnl0ZXNbOF0gPSBieXRlc1s4XSAmIDB4M2YgfCAweDgwO1xuXG4gICAgaWYgKGJ1Zikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KGJ5dGVzKTtcbiAgfSAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcblxuXG4gIHRyeSB7XG4gICAgZ2VuZXJhdGVVVUlELm5hbWUgPSBuYW1lOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgfSBjYXRjaCAoZXJyKSB7fSAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuXG5cbiAgZ2VuZXJhdGVVVUlELkROUyA9IEROUztcbiAgZ2VuZXJhdGVVVUlELlVSTCA9IFVSTDtcbiAgcmV0dXJuIGdlbmVyYXRlVVVJRDtcbn0iLCIvKlxuICogQnJvd3Nlci1jb21wYXRpYmxlIEphdmFTY3JpcHQgTUQ1XG4gKlxuICogTW9kaWZpY2F0aW9uIG9mIEphdmFTY3JpcHQgTUQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5mdW5jdGlvbiBtZDUoYnl0ZXMpIHtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobXNnLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWQ1VG9IZXhFbmNvZGVkQXJyYXkod29yZHNUb01kNShieXRlc1RvV29yZHMoYnl0ZXMpLCBieXRlcy5sZW5ndGggKiA4KSk7XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVUb0hleEVuY29kZWRBcnJheShpbnB1dCkge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgY29uc3QgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjtcbiAgY29uc3QgaGV4VGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIGNvbnN0IHggPSBpbnB1dFtpID4+IDVdID4+PiBpICUgMzIgJiAweGZmO1xuICAgIGNvbnN0IGhleCA9IHBhcnNlSW50KGhleFRhYi5jaGFyQXQoeCA+Pj4gNCAmIDB4MGYpICsgaGV4VGFiLmNoYXJBdCh4ICYgMHgwZiksIDE2KTtcbiAgICBvdXRwdXQucHVzaChoZXgpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIG91dHB1dCBsZW5ndGggd2l0aCBwYWRkaW5nIGFuZCBiaXQgbGVuZ3RoXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRPdXRwdXRMZW5ndGgoaW5wdXRMZW5ndGg4KSB7XG4gIHJldHVybiAoaW5wdXRMZW5ndGg4ICsgNjQgPj4+IDkgPDwgNCkgKyAxNCArIDE7XG59XG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHdvcmRzVG9NZDUoeCwgbGVuKSB7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzI7XG4gIHhbZ2V0T3V0cHV0TGVuZ3RoKGxlbikgLSAxXSA9IGxlbjtcbiAgbGV0IGEgPSAxNzMyNTg0MTkzO1xuICBsZXQgYiA9IC0yNzE3MzM4Nzk7XG4gIGxldCBjID0gLTE3MzI1ODQxOTQ7XG4gIGxldCBkID0gMjcxNzMzODc4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBjb25zdCBvbGRhID0gYTtcbiAgICBjb25zdCBvbGRiID0gYjtcbiAgICBjb25zdCBvbGRjID0gYztcbiAgICBjb25zdCBvbGRkID0gZDtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNSwgLTE2NTc5NjUxMCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMik7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMyk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaV0sIDIwLCAtMzczODk3MzAyKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sIDksIC0xMDE5ODAzNjkwKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpXSwgMTEsIC0zNTg1MzcyMjIpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG4gICAgYSA9IHNhZmVBZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVBZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVBZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVBZGQoZCwgb2xkZCk7XG4gIH1cblxuICByZXR1cm4gW2EsIGIsIGMsIGRdO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgYnl0ZXMgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gKi9cblxuXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4O1xuICBjb25zdCBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xuICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dFtpIC8gOF0gJiAweGZmKSA8PCBpICUgMzI7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgY29uc3QgbHN3ID0gKHggJiAweGZmZmYpICsgKHkgJiAweGZmZmYpO1xuICBjb25zdCBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIG1zdyA8PCAxNiB8IGxzdyAmIDB4ZmZmZjtcbn1cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cblxuXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cbi8qXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICovXG5cblxuZnVuY3Rpb24gbWQ1Y21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIHNhZmVBZGQoYml0Um90YXRlTGVmdChzYWZlQWRkKHNhZmVBZGQoYSwgcSksIHNhZmVBZGQoeCwgdCkpLCBzKSwgYik7XG59XG5cbmZ1bmN0aW9uIG1kNWZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgYyB8IH5iICYgZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWhoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVpaShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWQ1OyIsImltcG9ydCB2MzUgZnJvbSAnLi92MzUuanMnO1xuaW1wb3J0IG1kNSBmcm9tICcuL21kNS5qcyc7XG5jb25zdCB2MyA9IHYzNSgndjMnLCAweDMwLCBtZDUpO1xuZXhwb3J0IGRlZmF1bHQgdjM7IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCIvLyBBZGFwdGVkIGZyb20gQ2hyaXMgVmVuZXNzJyBTSEExIGNvZGUgYXRcbi8vIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvc2hhMS5odG1sXG5mdW5jdGlvbiBmKHMsIHgsIHksIHopIHtcbiAgc3dpdGNoIChzKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHggJiB5IF4gfnggJiB6O1xuXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcblxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG5cbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICB9XG59XG5cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICByZXR1cm4geCA8PCBuIHwgeCA+Pj4gMzIgLSBuO1xufVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIGNvbnN0IEsgPSBbMHg1YTgyNzk5OSwgMHg2ZWQ5ZWJhMSwgMHg4ZjFiYmNkYywgMHhjYTYyYzFkNl07XG4gIGNvbnN0IEggPSBbMHg2NzQ1MjMwMSwgMHhlZmNkYWI4OSwgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3NiwgMHhjM2QyZTFmMF07XG5cbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXMucHVzaChtc2cuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIC8vIENvbnZlcnQgQXJyYXktbGlrZSB0byBBcnJheVxuICAgIGJ5dGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnl0ZXMpO1xuICB9XG5cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgY29uc3QgbCA9IGJ5dGVzLmxlbmd0aCAvIDQgKyAyO1xuICBjb25zdCBOID0gTWF0aC5jZWlsKGwgLyAxNik7XG4gIGNvbnN0IE0gPSBuZXcgQXJyYXkoTik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyArK2kpIHtcbiAgICBjb25zdCBhcnIgPSBuZXcgVWludDMyQXJyYXkoMTYpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tpICogNjQgKyBqICogNF0gPDwgMjQgfCBieXRlc1tpICogNjQgKyBqICogNCArIDFdIDw8IDE2IHwgYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAzXTtcbiAgICB9XG5cbiAgICBNW2ldID0gYXJyO1xuICB9XG5cbiAgTVtOIC0gMV1bMTRdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAvIE1hdGgucG93KDIsIDMyKTtcbiAgTVtOIC0gMV1bMTRdID0gTWF0aC5mbG9vcihNW04gLSAxXVsxNF0pO1xuICBNW04gLSAxXVsxNV0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4ICYgMHhmZmZmZmZmZjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE47ICsraSkge1xuICAgIGNvbnN0IFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCAxNjsgKyt0KSB7XG4gICAgICBXW3RdID0gTVtpXVt0XTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB0ID0gMTY7IHQgPCA4MDsgKyt0KSB7XG4gICAgICBXW3RdID0gUk9UTChXW3QgLSAzXSBeIFdbdCAtIDhdIF4gV1t0IC0gMTRdIF4gV1t0IC0gMTZdLCAxKTtcbiAgICB9XG5cbiAgICBsZXQgYSA9IEhbMF07XG4gICAgbGV0IGIgPSBIWzFdO1xuICAgIGxldCBjID0gSFsyXTtcbiAgICBsZXQgZCA9IEhbM107XG4gICAgbGV0IGUgPSBIWzRdO1xuXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCA4MDsgKyt0KSB7XG4gICAgICBjb25zdCBzID0gTWF0aC5mbG9vcih0IC8gMjApO1xuICAgICAgY29uc3QgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW3RdID4+PiAwO1xuICAgICAgZSA9IGQ7XG4gICAgICBkID0gYztcbiAgICAgIGMgPSBST1RMKGIsIDMwKSA+Pj4gMDtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IFQ7XG4gICAgfVxuXG4gICAgSFswXSA9IEhbMF0gKyBhID4+PiAwO1xuICAgIEhbMV0gPSBIWzFdICsgYiA+Pj4gMDtcbiAgICBIWzJdID0gSFsyXSArIGMgPj4+IDA7XG4gICAgSFszXSA9IEhbM10gKyBkID4+PiAwO1xuICAgIEhbNF0gPSBIWzRdICsgZSA+Pj4gMDtcbiAgfVxuXG4gIHJldHVybiBbSFswXSA+PiAyNCAmIDB4ZmYsIEhbMF0gPj4gMTYgJiAweGZmLCBIWzBdID4+IDggJiAweGZmLCBIWzBdICYgMHhmZiwgSFsxXSA+PiAyNCAmIDB4ZmYsIEhbMV0gPj4gMTYgJiAweGZmLCBIWzFdID4+IDggJiAweGZmLCBIWzFdICYgMHhmZiwgSFsyXSA+PiAyNCAmIDB4ZmYsIEhbMl0gPj4gMTYgJiAweGZmLCBIWzJdID4+IDggJiAweGZmLCBIWzJdICYgMHhmZiwgSFszXSA+PiAyNCAmIDB4ZmYsIEhbM10gPj4gMTYgJiAweGZmLCBIWzNdID4+IDggJiAweGZmLCBIWzNdICYgMHhmZiwgSFs0XSA+PiAyNCAmIDB4ZmYsIEhbNF0gPj4gMTYgJiAweGZmLCBIWzRdID4+IDggJiAweGZmLCBIWzRdICYgMHhmZl07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNoYTE7IiwiaW1wb3J0IHYzNSBmcm9tICcuL3YzNS5qcyc7XG5pbXBvcnQgc2hhMSBmcm9tICcuL3NoYTEuanMnO1xuY29uc3QgdjUgPSB2MzUoJ3Y1JywgMHg1MCwgc2hhMSk7XG5leHBvcnQgZGVmYXVsdCB2NTsiLCIvKlxyXG4gZGVmYXVsdCB1bmRlZmluZWQgLSBUaGUga2V5IGlzIHRoZSBicmVha3BvaW50XHJcbiAoZGVmYXVsdCBpcyB0aGUgcmVzdWx0IG9mOiAoKSA9PiB3aW5kb3cuaW5uZXJXaWR0aCBvciBpbm5lcldpZHRoIHByb3BlcnR5IGlmIHRoZSBsYXN0IHByZXNlbnRlZCkuXHJcbiovXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0UmVzcG9uc2l2ZSA9IHtcclxuICAgIDA6IHtcclxuICAgICAgICBpdGVtczogMSxcclxuICAgIH0sXHJcbiAgICA2MjA6IHtcclxuICAgICAgICBpdGVtczogMixcclxuICAgIH0sXHJcbiAgICAxMDI0OiB7XHJcbiAgICAgICAgaXRlbXM6IDMsXHJcbiAgICB9LFxyXG4gICAgMTIwMDoge1xyXG4gICAgICAgIGl0ZW1zOiA0LFxyXG4gICAgfSxcclxuICAgIDE3MDA6IHtcclxuICAgICAgICBpdGVtczogNSxcclxuICAgIH0sXHJcbiAgICAyMjUwOiB7XHJcbiAgICAgICAgaXRlbXM6IDYsXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qXHJcbiByZWJ1aWx0IHJlc3BvbnNpdmUgb2JqZWN0IGRlcGVuZGluZyBvbiB0aGUgY29udGFpbmVyIHdpZHRoXHJcbiB1c2luZyB0aGUgcmF0aW8gb2YgdGhlIHdpZHRoIG9mIHRoZSBib3ggdG8gdGhlIHdpZHRoIG9mIHRoZSB3aW5kb3dcclxuKi9cclxuZXhwb3J0IGNvbnN0IGdldE5ld1Jlc3BvbnNpdmVWYWx1ZXMgPSAocmF0ZSkgPT4ge1xyXG4gICAgbGV0IG5ld1Jlc3BvbnNpdmUgPSB7fVxyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhkZWZhdWx0UmVzcG9uc2l2ZSlcclxuICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IE1hdGgucm91bmQoZGVmYXVsdFJlc3BvbnNpdmVba2V5XS5pdGVtcyAvIHJhdGUpXHJcbiAgICAgICAgbmV3UmVzcG9uc2l2ZVtrZXldID0geyBpdGVtczogTWF0aC5tYXgobmV3VmFsdWUsIDEpIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbmV3UmVzcG9uc2l2ZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3RhdHVzTGlzdCA9IHtcclxuICAgIHJlc2V0IDogXCJyZXNldFwiLFxyXG4gICAgZ29MYXN0IDogXCJnb0xhc3RcIixcclxuICAgIG5leHQgOiBcIm5leHRcIixcclxuICAgIHByZXYgOiBcInByZXZcIixcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNsYXNzZXNBY3Rpb24gPSB7XHJcbiAgICBhZGQgOiBcImFkZFwiLFxyXG4gICAgcmVtb3ZlIDogXCJyZW1vdmVcIlxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29tbW9uQ2xhc3NlcyA9IHtcclxuICAgIG11bHRpX2NvbnRhaW5lciA6ICdtdWx0aS1jYXJvdXNlbF9fY29udGFpbmVyJyxcclxuICAgIG11bHRpX2VtcHR5X2NvbnRhaW5lciA6ICdtdWx0aS1jYXJvdXNlbF9fZW1wdHktY29udGFpbmVyJyxcclxuICAgIGl0ZW06IFwibXVsdGktY2Fyb3VzZWxfX2l0ZW1cIixcclxuICAgIGFjdGl2ZSA6IFwibXVsdGktY2Fyb3VzZWxfX2FjdGl2ZVwiLFxyXG4gICAgbm9fZG90czogJ211bHRpLWNhcm91c2VsX19uby1kb3RzJ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsQ2Fyb3VzZWxDbGFzc2VzID0ge1xyXG4gICAgbm9ybWFsX2NvbnRhaW5lciA6ICdub3JtYWwtY2Fyb3VzZWxfX2NvbnRhaW5lcicsXHJcbiAgICBub3JtYWxfaXRlbSA6ICdub3JtYWwtY2Fyb3VzZWxfX2l0ZW0nXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhY3RpdmVDbGlja0NsYXNzZXMgPSB7XHJcbiAgICBhY3RpdmVfY2xpY2tfY29udGFpbmVyIDogJ2FjdGl2ZS1jbGljay1jYXJvdXNlbF9fY29udGFpbmVyJyxcclxuICAgIGFjdGl2ZV9jbGlja19pdGVtIDogJ2FjdGl2ZS1jbGljay1jYXJvdXNlbF9faXRlbScsXHJcbiAgICBhY3RpdmVfY2xpY2tfd2l0aF9idG4gOiAnYWN0aXZlLWNsaWNrLWNhcm91c2VsX193aXRoLWJ0bidcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGFjdGl2ZVNsaWRlQ2xhc3NlcyA9IHtcclxuICAgIGFjdGl2ZV9zbGlkZV9jb250YWluZXIgOiAnYWN0aXZlLXNsaWRlLWNhcm91c2VsX19jb250YWluZXInLFxyXG4gICAgYWN0aXZlX3NsaWRlX3dyYXBwZXIgOiAnYWN0aXZlLXNsaWRlLWNhcm91c2VsX193cmFwcGVyJyxcclxuICAgIGZpcnN0X2l0ZW0gOiBcImFjdGl2ZS1zbGlkZS1jYXJvdXNlbF9fZmlyc3QtaXRlbVwiLFxyXG4gICAgbGFzdF9pdGVtIDogXCJhY3RpdmUtc2xpZGUtY2Fyb3VzZWxfX2xhc3QtaXRlbVwiLFxyXG4gICAgcHJldl9idG4gOiBcImFjdGl2ZS1zbGlkZS1jYXJvdXNlbF9fcHJldi1idG5cIixcclxuICAgIG5leHRfYnRuIDogXCJhY3RpdmUtc2xpZGUtY2Fyb3VzZWxfX25leHQtYnRuXCJcclxufSIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICcuLi91aS9Ob3JtYWxDYXJvdXNlbC5zY3NzJ1xuaW1wb3J0ICcuLi91aS9BY3RpdmVDbGlja0Nhcm91c2VsLnNjc3MnXG5pbXBvcnQgQWxpY2VDYXJvdXNlbCBmcm9tICdyZWFjdC1hbGljZS1jYXJvdXNlbCdcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgZGVmYXVsdFJlc3BvbnNpdmUsIGdldE5ld1Jlc3BvbnNpdmVWYWx1ZXMsIGNvbW1vbkNsYXNzZXMsIG5vcm1hbENhcm91c2VsQ2xhc3NlcywgYWN0aXZlQ2xpY2tDbGFzc2VzLCBjbGFzc2VzQWN0aW9uIH0gZnJvbSBcIi4vaGVscGVyXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTm9ybWFsQ2Fyb3VzZWwocHJvcHMpIHtcblxuICAgIGNvbnN0IGNhcm91c2VsUGFyZW50ID0gdXNlUmVmKCk7XG4gICAgY29uc3QgW2Nhcm91c2VsX2l0ZW1zLCBzZXRfY2Fyb3VzZWxfaXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtyZXNwb25zaXZlLCBzZXRSZXNwb25zaXZlXSA9IHVzZVN0YXRlKHsgLi4uZGVmYXVsdFJlc3BvbnNpdmUgfSk7XG4gICAgY29uc3QgW3VuaXF1ZUNsYXNzLCBzZXRVbmlxdWVDbGFzc10gPSB1c2VTdGF0ZShcIlwiKTtcblxuICAgIC8qXG4gICAgICAgIHRoaXMgbWV0aG9kIGJ1aWx0IHRvIGhhbmRsZSBpZiB0aGUgY2Fyb3VzZWwgaGFzIGJlZW4gcmVuZGVyZWQgaW5zaWRlIGEgY29udGFpbmVyXG4gICAgICAgIHRoYXQgaXMgbm90IGNvdmVyaW5nIHRoZSB3aW5kb3cncyBmdWxsIHdpZHRoXG4gICAgKi9cbiAgICBjb25zdCBzZXROZXdSZXNwb25zaXZlID0gKCkgPT4ge1xuICAgICAgICBsZXQgcmF0ZSA9IHdpbmRvdy5pbm5lcldpZHRoIC8gY2Fyb3VzZWxQYXJlbnQuY3VycmVudC5jbGllbnRXaWR0aFxuICAgICAgICBpZiAocmF0ZSA+IDEuMzUpIHtcbiAgICAgICAgICAgIGxldCBuZXdSZXNwb25zaXZlID0gZ2V0TmV3UmVzcG9uc2l2ZVZhbHVlcyhyYXRlKVxuICAgICAgICAgICAgc2V0UmVzcG9uc2l2ZSh7IC4uLm5ld1Jlc3BvbnNpdmUgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFJlc3BvbnNpdmUoeyAuLi5kZWZhdWx0UmVzcG9uc2l2ZSB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWRkT3JSZW1vdmVDbGFzc05hbWUgPSAobm9kZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IGNsYXNzZXNBY3Rpb24ucmVtb3ZlKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoY29tbW9uQ2xhc3Nlcy5hY3RpdmUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoY29tbW9uQ2xhc3Nlcy5hY3RpdmUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBpbiBjYXNlIG9mIFwiaW5maW5pdGVcIiBjYXJvdXNlbCB0aGUgbm9kZSB3aWxsIGJlIG5vZGUgbGlzdCBcIkFycmF5XCJcbiAgICAgICAgYmVjYXVzZSB0aGUgY2Fyb3VzZWwgY3JlYXRlIGEgY29weSBvZiBhbGwgdGhlIGl0ZW1zXG4gICAgICAgIHRoYXQgd2h5IHdlIG5lZWQgY2hhbmdlIHRoZSBhY3RpdmUgY2xhc3Mgb24gYm90aCBub2RlcyAtIHRoZSBjYXJvdXNlbCByZW5kZXIgYm90aCAtXG4gICAgKi9cbiAgICBjb25zdCBjaGFuZ2VBY3RpdmVDbGFzcyA9IChub2RlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgaWYgKG5vZGU/Lmxlbmd0aCkge1xuICAgICAgICAgICAgbm9kZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgYWRkT3JSZW1vdmVDbGFzc05hbWUoaXRlbSwgYWN0aW9uKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZSkge1xuICAgICAgICAgICAgYWRkT3JSZW1vdmVDbGFzc05hbWUobm9kZSwgYWN0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgaWR4LVwiXCIgaXMgdGhlIGNvbW1vbiB1bmlxdWUgY2xhc3MgYmV0d2VlbiBvcmlnaW5hbCBpdGVtIGFuZCB0aGUgY2xvbmVkIG9uZVxuICAgICovXG4gICAgY29uc3QgZ2V0SWR4Q2xhc3NOYW1lID0gKGUpID0+IHtcbiAgICAgICAgbGV0IGNsaWNrZWRJdGVtID0gZS50YXJnZXQ7XG5cbiAgICAgICAgLy8gaW4gY2FzZSBvZiBjbGlja2luZyBlbGVtZW50IGluc2lkZSB0aGUgaXRlbSB3ZSBuZWVkIHRoZSBtYWluIGRpdiB3aXRoIFwiaWR4LVwiIGNsYXNzIG5hbWVcbiAgICAgICAgd2hpbGUgKGNsaWNrZWRJdGVtKSB7XG4gICAgICAgICAgICBpZiAoY2xpY2tlZEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNvbW1vbkNsYXNzZXMuaXRlbSkpIGJyZWFrO1xuICAgICAgICAgICAgY2xpY2tlZEl0ZW0gPSBjbGlja2VkSXRlbS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBjbGlja2VkSXRlbS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXM/LmZpbHRlcihpdGVtID0+IGl0ZW0uaW5jbHVkZXMoJ2lkeCcpKT8uWzBdXG5cbiAgICB9XG5cbiAgICBjb25zdCBvbkNhcmRDbGlja2VkID0gKGUsIGFjdGlvbikgPT4ge1xuXG4gICAgICAgIGlmIChhY3Rpb24/LmNhbkV4ZWN1dGUpIGFjdGlvbi5leGVjdXRlKClcblxuICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gb3JpZ2luYWwgYW5kIGNsb25lZCBpdGVtXG4gICAgICAgIGxldCBhY3RpdmVOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dW5pcXVlQ2xhc3N9YCk/LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2NvbW1vbkNsYXNzZXMuYWN0aXZlfWApO1xuICAgICAgICBjaGFuZ2VBY3RpdmVDbGFzcyhhY3RpdmVOb2RlLCBjbGFzc2VzQWN0aW9uLnJlbW92ZSlcblxuICAgICAgICBsZXQgaWR4Q2xhc3MgPSBnZXRJZHhDbGFzc05hbWUoZSlcblxuICAgICAgICAvLyBhZGQgYWN0aXZlIGNsYXNzIGZvciBib3RoIG9yaWdpbmFsIGFuZCBjbG9uZWQgaXRlbVxuICAgICAgICBsZXQgaXRlbVRvU2V0QWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dW5pcXVlQ2xhc3N9YCk/LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2lkeENsYXNzfWApO1xuICAgICAgICBjaGFuZ2VBY3RpdmVDbGFzcyhpdGVtVG9TZXRBY3RpdmUsIGNsYXNzZXNBY3Rpb24uYWRkKVxuICAgIH1cblxuICAgIC8qXG4gICAgICBzZXQgdGhlIGFjdGl2ZSBpdGVtIGFmdGVyIHRoZSBjYXJvdXNlbCBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkXG4gICAgKi9cbiAgICBjb25zdCBvbkluaXRpYWxpemVkID0gKCkgPT4ge1xuICAgICAgICBpZiAocHJvcHMuY2Fyb3VzZWxUeXBlID09PSAnYWN0aXZlJykge1xuICAgICAgICAgICAgbGV0IGl0ZW1Ub1NldEFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VuaXF1ZUNsYXNzfWApPy5xdWVyeVNlbGVjdG9yQWxsKCcuaWR4LTAnKTtcbiAgICAgICAgICAgIGNoYW5nZUFjdGl2ZUNsYXNzKGl0ZW1Ub1NldEFjdGl2ZSwgY2xhc3Nlc0FjdGlvbi5hZGQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgICAgIC8vIHNldCBhIHVuaXF1ZSBjbGFzcyBpbiBjYXNlIG9mIHVzaW5nIHR3byBkaWZmZXJlbnQgY2Fyb3VzZWwgaW5zdGFuY2VzIGluIHRoZSBzYW1lIGRvY3VtZW50XG4gICAgICAgIHNldFVuaXF1ZUNsYXNzKFwiYS1cIiArIHV1aWR2NCgpKVxuXG4gICAgICAgIGlmICghY2Fyb3VzZWxQYXJlbnQuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIGhhbmRsZSByZXNpemUgd2luZG93IG9yIGNhcm91c2VsIGNvbnRhaW5lclxuICAgICAgICBjb25zdCByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBzZXROZXdSZXNwb25zaXZlKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShjYXJvdXNlbFBhcmVudC5jdXJyZW50KTtcblxuICAgICAgICByZXR1cm4gKCkgPT4gcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH0sIFtdKVxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLmRhdGE/LnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIiAmJiAhY2Fyb3VzZWxfaXRlbXM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0X2Nhcm91c2VsX2l0ZW1zKHByb3BzLmRhdGEuaXRlbXMubWFwKChpdGVtLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLmNhcm91c2VsVHlwZSA9PT0gJ2FjdGl2ZScgPyAoZSkgPT4gb25DYXJkQ2xpY2tlZChlLCBwcm9wcy5hY3Rpb24/LmdldChpdGVtKSkgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7Y29tbW9uQ2xhc3Nlcy5pdGVtfSBpZHgtJHtpfSAke3Byb3BzLmNhcm91c2VsVHlwZSA9PT0gJ2FjdGl2ZScgPyBhY3RpdmVDbGlja0NsYXNzZXMuYWN0aXZlX2NsaWNrX2NsaWNrYWJsZV9pdGVtIDogbm9ybWFsQ2Fyb3VzZWxDbGFzc2VzLm5vcm1hbF9pdGVtfWB9PlxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY29udGVudC5nZXQoaXRlbSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKSlcbiAgICAgICAgfVxuICAgIH0sIFtwcm9wcy5kYXRhXSlcblxuICAgIHJldHVybiA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17W2NvbW1vbkNsYXNzZXMubXVsdGlfY29udGFpbmVyLCB1bmlxdWVDbGFzcyxcbiAgICAgICAgICAgIHByb3BzLmNhcm91c2VsVHlwZSA9PT0gJ2FjdGl2ZScgPyBhY3RpdmVDbGlja0NsYXNzZXMuYWN0aXZlX2NsaWNrX2NvbnRhaW5lciA6IG5vcm1hbENhcm91c2VsQ2xhc3Nlcy5ub3JtYWxfY29udGFpbmVyLFxuICAgICAgICAgICAgcHJvcHMuZGlzYWJsZURvdHNDb250cm9scyA/IGNvbW1vbkNsYXNzZXMubm9fZG90cyA6IFwiXCIsXG4gICAgICAgICAgICAoIXByb3BzLmRpc2FibGVCdXR0b25zQ29udHJvbHMgJiYgcHJvcHMuY2Fyb3VzZWxUeXBlID09PSAnYWN0aXZlJykgPyBhY3RpdmVDbGlja0NsYXNzZXMuYWN0aXZlX2NsaWNrX3dpdGhfYnRuIDogXCJcIl0uam9pbihcIiBcIil9XG4gICAgICAgIHJlZj17Y2Fyb3VzZWxQYXJlbnR9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjYXJvdXNlbF9pdGVtcz8ubGVuZ3RoID9cbiAgICAgICAgICAgICAgICA8QWxpY2VDYXJvdXNlbFxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y2Fyb3VzZWxfaXRlbXN9XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU9e3Jlc3BvbnNpdmV9XG5cbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU9e3Byb3BzLmluZmluaXRlfVxuXG4gICAgICAgICAgICAgICAgICAgIGF1dG9QbGF5PXtwcm9wcy5hdXRvUGxheX1cbiAgICAgICAgICAgICAgICAgICAgYXV0b1BsYXlEaXJlY3Rpb249e3Byb3BzLmF1dG9QbGF5RGlyZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICBhdXRvUGxheUNvbnRyb2xzPXtwcm9wcy5hdXRvUGxheUNvbnRyb2xzfVxuXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b25zQ29udHJvbHM9e3Byb3BzLmRpc2FibGVCdXR0b25zQ29udHJvbHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVEb3RzQ29udHJvbHM9e3Byb3BzLmRpc2FibGVEb3RzQ29udHJvbHN9XG5cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb249e3Byb3BzLmFuaW1hdGlvbkR1cmF0aW9ufVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25UeXBlPXtwcm9wcy5hbmltYXRpb25UeXBlfVxuXG4gICAgICAgICAgICAgICAgICAgIGtleWJvYXJkTmF2aWdhdGlvbj17cHJvcHMua2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgICAgICAgICBtb3VzZVRyYWNraW5nPXtwcm9wcy5tb3VzZVRyYWNraW5nfVxuICAgICAgICAgICAgICAgICAgICB0b3VjaFRyYWNraW5nPXtwcm9wcy50b3VjaFRyYWNraW5nfVxuXG4gICAgICAgICAgICAgICAgICAgIG9uSW5pdGlhbGl6ZWQ9e29uSW5pdGlhbGl6ZWR9XG4gICAgICAgICAgICAgICAgLz4gOiBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y29tbW9uQ2xhc3Nlcy5tdWx0aV9lbXB0eV9jb250YWluZXJ9PjwvZGl2PlxuICAgICAgICB9XG4gICAgPC9kaXY+O1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQWxpY2VDYXJvdXNlbCBmcm9tICdyZWFjdC1hbGljZS1jYXJvdXNlbCdcclxuaW1wb3J0ICcuLi91aS9BY3RpdmVTbGlkZUNhcm91c2VsLnNjc3MnXHJcbmltcG9ydCB7IGRlZmF1bHRSZXNwb25zaXZlLCBnZXROZXdSZXNwb25zaXZlVmFsdWVzLCBjb21tb25DbGFzc2VzLCBhY3RpdmVTbGlkZUNsYXNzZXMsIHN0YXR1c0xpc3QgfSBmcm9tIFwiLi9oZWxwZXJcIlxyXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFjdGl2ZVNsaWRlQ2Fyb3VzZWwocHJvcHMpIHtcclxuXHJcbiAgICBjb25zdCBzbGlkZXJDb250YWluZXIgPSB1c2VSZWYoKTtcclxuICAgIGNvbnN0IFtjYXJvdXNlbF9pdGVtcywgc2V0X2Nhcm91c2VsX2l0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtyZXNwb25zaXZlLCBzZXRSZXNwb25zaXZlXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gICAgY29uc3QgW3VuaXF1ZUNsYXNzLCBzZXRVbmlxdWVDbGFzc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICAgIGNvbnN0IFtjdXJyZW50QWN0aXZlSWR4LCBzZXRDdXJyZW50QWN0aXZlSWR4XSA9IHVzZVN0YXRlKDApO1xyXG4gICAgY29uc3QgW251bWJlck9mRGlzcGxheWVkSXRlbXMsIHNldE51bWJlck9mRGlzcGxheWVkSXRlbXNdID0gdXNlU3RhdGUoMCk7XHJcbiAgICBjb25zdCBbbnVtYmVyT2ZBbGxJdGVtcywgc2V0TnVtYmVyT2ZBbGxJdGVtc10gPSB1c2VTdGF0ZSgwKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlICdyZWFjdC1hbGljZS1jYXJvdXNlbCcgYnVpbHQtaW4gYWxsIG1ldGhvZCBhbmQgcHJvcGVydGllc1xyXG4gICAgY29uc3QgW2Nhcm91c2VsUHJvcGVydGllcywgc2V0Q2Fyb3VzZWxQcm9wZXJ0aWVzXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICAgIC8qXHJcbiAgICAgICAgdGhpcyBtZXRob2QgYnVpbHQgdG8gaGFuZGxlIGlmIHRoZSBjYXJvdXNlbCBoYXMgYmVlbiByZW5kZXJlZCBpbnNpZGUgYSBjb250YWluZXJcclxuICAgICAgICB0aGF0IGlzIG5vdCBjb3ZlcmluZyB0aGUgd2luZG93J3MgZnVsbCB3aWR0aFxyXG4gICAgKi9cclxuICAgICAgICBjb25zdCBzZXROZXdSZXNwb25zaXZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZSA9IHdpbmRvdy5pbm5lcldpZHRoIC8gc2xpZGVyQ29udGFpbmVyPy5jdXJyZW50Py5jbGllbnRXaWR0aFxyXG4gICAgICAgICAgICBpZiAocmF0ZSA+IDEuNCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1Jlc3BvbnNpdmUgPSBnZXROZXdSZXNwb25zaXZlVmFsdWVzKHJhdGUpXHJcbiAgICAgICAgICAgICAgICBzZXRSZXNwb25zaXZlKHsgLi4ubmV3UmVzcG9uc2l2ZSB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0UmVzcG9uc2l2ZSh7IC4uLmRlZmF1bHRSZXNwb25zaXZlIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAgICBGaXJlZCB3aGVuIHJlYWNoIHRoZSBlbmQgb2YgdGhlIHNsaWRlciBvciB3aGVuIHJlc2l6ZSB0aGUgY2Fyb3VzZWxcclxuICAgICAgICA9PiBtb3ZlIHRvIHRoZSBmaXJzdCBpdGVtXHJcbiAgICAqL1xyXG4gICAgY29uc3QgcmVzZXRTbGlkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgc2V0Q3VycmVudEFjdGl2ZUlkeCgwKVxyXG4gICAgICAgIHNldEFjdGl2ZUNsYXNzKHN0YXR1c0xpc3QucmVzZXQsIG51bGwsIDApXHJcbiAgICB9XHJcblxyXG4gICAgIC8qXHJcbiAgICAgICAgRmlyZWQgd2hlbiBnZSBiYWNrIHdoZW4gc3RlcCBmcm9tIHRoZSBmaXJzdCBpdGVtXHJcbiAgICAgICAgPT4gbW92ZSB0byB0aGUgbGFzdCBpdGVtXHJcbiAgICAqL1xyXG4gICAgY29uc3Qgc2xpZGVUb1RoZUVuZCA9ICgpID0+IHtcclxuICAgICAgICBjYXJvdXNlbFByb3BlcnRpZXM/LnNsaWRlVG8obnVtYmVyT2ZBbGxJdGVtcyAtIG51bWJlck9mRGlzcGxheWVkSXRlbXMgKyAxKVxyXG4gICAgICAgIHNldEFjdGl2ZUNsYXNzKHN0YXR1c0xpc3QuZ29MYXN0LCBudWxsLCBudW1iZXJPZkFsbEl0ZW1zKVxyXG4gICAgICAgIHNldEN1cnJlbnRBY3RpdmVJZHgobnVtYmVyT2ZBbGxJdGVtcylcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIEZpcmVkIHdoZW4gY2xpY2tpbmcgXCJwcmV2aW91c1wiIGJ1dHRvblxyXG4gICAgKi9cclxuICAgIGNvbnN0IHByZXZDbGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghY3VycmVudEFjdGl2ZUlkeCkge1xyXG4gICAgICAgICAgICAvLyBjdXJyZW50QWN0aXZlSWR4ID09PSAwLCB0aGUgYWN0aXZlIGl0ZW0gaXMgdGhlIGZpcnN0IG9uZSwgbW92ZSB0byB0aGUgbGFzdFxyXG4gICAgICAgICAgICBzbGlkZVRvVGhlRW5kKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRBY3RpdmVDbGFzcyhzdGF0dXNMaXN0LnByZXYsIGNhcm91c2VsUHJvcGVydGllcz8uc2xpZGVQcmV2LCBjdXJyZW50QWN0aXZlSWR4IC0gMSlcclxuICAgICAgICAgICAgc2V0Q3VycmVudEFjdGl2ZUlkeChjdXJyZW50QWN0aXZlSWR4IC0gMSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAgICBGaXJlZCB3aGVuIGNsaWNraW5nIFwiTmV4dFwiIGJ1dHRvblxyXG4gICAgKi9cclxuICAgIGNvbnN0IG5leHRDbGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChjdXJyZW50QWN0aXZlSWR4ID09PSBudW1iZXJPZkFsbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgIC8vIHRoZSBhY3RpdmUgaXRlbSBpcyB0aGUgbGFzdCBvbmUsIG1vdmUgdG8gdGhlIGZpcnN0XHJcbiAgICAgICAgICAgIGNhcm91c2VsUHJvcGVydGllcz8uc2xpZGVUbygwKVxyXG4gICAgICAgICAgICByZXNldFNsaWRlcigpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0QWN0aXZlQ2xhc3Moc3RhdHVzTGlzdC5uZXh0LCBjYXJvdXNlbFByb3BlcnRpZXM/LnNsaWRlTmV4dCwgY3VycmVudEFjdGl2ZUlkeCArIDEpXHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRBY3RpdmVJZHgoY3VycmVudEFjdGl2ZUlkeCArIDEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgICAgUmVtb3ZlIHByZXZpb3VzIGFjdGl2ZSBpdGVtIGFuZCBnZXQgdGhlIGluZGV4IG9mIHRoZSBpdGVtIHRoYXQgd2Ugd2FudCB0byBzZXQgaXQgYWN0aXZlXHJcbiAgICAqL1xyXG4gICAgY29uc3QgcmVtb3ZlQWN0aXZlQ2xhc3MgPSAoc3RhdHVzLCBhbGxJdGVtcykgPT4ge1xyXG4gICAgICAgIGxldCBpdGVtSWR4VG9TZXRBY3RpdmUgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEl0ZW1zPy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSBpdGVtIHRoYXQgd2Ugd2FudCB0byBzZXQgaXQgYWN0aXZlIGluIHRoZSBcImFsbCBpdGVtc1wiIGFycmF5XHJcbiAgICAgICAgICAgIC8vIE5PVEU6IHdlIGNhbid0IHVzZSB0aGUgc3RhdGUgXCJjdXJyZW50QWN0aXZlSWR4XCIgYmVjYXVzZSBcImFsbEl0ZW1zXCIgaXMgY29udGFpbmluZyB0aGUgY2xvbmVkIGl0ZW0gYWxzb1xyXG4gICAgICAgICAgICBpZiAoYWxsSXRlbXNbaV0uY2xhc3NMaXN0Py5jb250YWlucyhjb21tb25DbGFzc2VzLmFjdGl2ZSkgJiYgIWFsbEl0ZW1zW2ldPy5wYXJlbnRFbGVtZW50Py5jbGFzc0xpc3Q/LmNvbnRhaW5zKFwiX19jbG9uZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5leHQgcHJlc3NlZCB3aWxsIGJlIHRoZSBuZXh0IGluZGV4LCBpZiBwcmV2aW91cyBwcmVzc2VkIHdpbGwgYmUgdGhlIHByZXZpb3VzIGluZGV4IFxyXG4gICAgICAgICAgICAgICAgaXRlbUlkeFRvU2V0QWN0aXZlID0gc3RhdHVzID09PSBzdGF0dXNMaXN0Lm5leHQgPyBpKzEgOiBpLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWxsSXRlbXNbaV0uY2xhc3NMaXN0Py5yZW1vdmUoY29tbW9uQ2xhc3Nlcy5hY3RpdmUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXRlbUlkeFRvU2V0QWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgICAgc2V0dGluZyB0aGUgY3VycmVuIGFjdGl2ZSBjbGFzcywgYW5kIHNsaWRlIGxlZnQgb3IgcmlnaHQgd2hlbiBuZWVkZWRcclxuICAgICovXHJcbiAgICBjb25zdCBzZXRBY3RpdmVDbGFzcyA9IChzdGF0dXMsIHNsaWRlTGVmdE9yUmlnaHQsIGFjdGlvbklkeCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgYWxsSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1bmlxdWVDbGFzc31gKT8ucXVlcnlTZWxlY3RvckFsbChgLiR7Y29tbW9uQ2xhc3Nlcy5pdGVtfWApO1xyXG4gICAgICAgIGxldCBpdGVtSWR4VG9TZXRBY3RpdmUgPSByZW1vdmVBY3RpdmVDbGFzcyhzdGF0dXMsIGFsbEl0ZW1zKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGN1cnJlbnQgYWN0aXZlIGl0ZW1cclxuICAgICAgICBpZiAoc3RhdHVzID09PSBzdGF0dXNMaXN0LnJlc2V0KSB7XHJcbiAgICAgICAgICAgIC8vIHF1ZXJ5U2VsZWN0b3JBbGwgPT0+IHRoZSBvcmlnaW5hbCBpdGVtIGFuZCB0aGUgY2xvbmVkIG9uZVxyXG4gICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdGhlIGZpcnN0IG9uZSBpcyB0aGUgb3JpZ2luYWwgLVwicmVhY3QtYWxpY2UtY2Fyb3VzZVwiIHdheSBvZiB3b3JrLVxyXG4gICAgICAgICAgICBsZXQgZmlyc3RTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VuaXF1ZUNsYXNzfWApPy5xdWVyeVNlbGVjdG9yQWxsKGAuJHthY3RpdmVTbGlkZUNsYXNzZXMuZmlyc3RfaXRlbX1gKTtcclxuICAgICAgICAgICAgZmlyc3RTbGlkZVswXT8uY2xhc3NMaXN0Py5hZGQoY29tbW9uQ2xhc3Nlcy5hY3RpdmUpXHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IHN0YXR1c0xpc3QuZ29MYXN0KSB7XHJcbiAgICAgICAgICAgIC8vIHF1ZXJ5U2VsZWN0b3JBbGwgPT0+IHRoZSBvcmlnaW5hbCBpdGVtIGFuZCB0aGUgY2xvbmVkIG9uZVxyXG4gICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdGhlIHNlY29uZCBvbmUgaXMgdGhlIG9yaWdpbmFsIC1cInJlYWN0LWFsaWNlLWNhcm91c2VcIiB3YXkgb2Ygd29yay1cclxuICAgICAgICAgICAgbGV0IGxhc3RTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VuaXF1ZUNsYXNzfWApPy5xdWVyeVNlbGVjdG9yQWxsKGAuJHthY3RpdmVTbGlkZUNsYXNzZXMubGFzdF9pdGVtfWApO1xyXG4gICAgICAgICAgICBsYXN0U2xpZGVbMV0/LmNsYXNzTGlzdD8uYWRkKGNvbW1vbkNsYXNzZXMuYWN0aXZlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIG5vdCBjb250YWluaW5nIGFjdGl2ZSBtZWFucyB0aGF0IHRoZSBuZXh0L3ByZXYgaXRlbSBpcyBub3QgYXBwZWFyaW5nIGluIHRoZSBzY3JlZW4gcmlnaHQgbm93XHJcbiAgICAgICAgICAgIC8vIHNsaWRlIHdoZW4gcmVhY2ggdG8gdGhlIHN0YXJ0L2VuZCBvZiB0aGUgYWN0aXZlIGl0ZW1cclxuICAgICAgICAgICAgaWYgKCFhbGxJdGVtc1tpdGVtSWR4VG9TZXRBY3RpdmVdPy5wYXJlbnRFbGVtZW50Py5jbGFzc0xpc3Q/LmNvbnRhaW5zKFwiX19hY3RpdmVcIikpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlTGVmdE9yUmlnaHQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsbEl0ZW1zW2l0ZW1JZHhUb1NldEFjdGl2ZV0/LmNsYXNzTGlzdD8uYWRkKGNvbW1vbkNsYXNzZXMuYWN0aXZlKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmaXJlIHRoZSBhY3Rpb24gdGhhdCByZWxhdGVkIHRvIHRoZSBuZXcgYWN0aXZlIGl0ZW1cclxuICAgICAgICBsZXQgYWN0aW9uVG9GaXJlID0gcHJvcHMuYWN0aW9uPy5nZXQocHJvcHMuZGF0YS5pdGVtcz8uW2FjdGlvbklkeF0pXHJcbiAgICAgICAgb25TbGlkZUNsaWNrZWQoYWN0aW9uVG9GaXJlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgICAgZmlyZWQgd2hlbiBpbml0aWFsaXphdGlvbiB0aGUgY2Fyb3VzZWxcclxuICAgICovXHJcbiAgICBjb25zdCBvbkNhcm91c2VsSW5pdCA9IChlKSA9PiB7XHJcbiAgICAgICAgc2V0TnVtYmVyT2ZEaXNwbGF5ZWRJdGVtcyhlLml0ZW1zSW5TbGlkZSlcclxuICAgICAgICBzZXRSZXNwb25zaXZlKHsuLi5yZXNwb25zaXZlfSlcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIGZpcmVkIHdoZW4gcmVzaXppbmcgdGhlIGNhcm91c2VsLCBjYXJvdXNlbCB3aWxsIGFsd2F5cyBzbGlkZSB0byB0aGUgZmlyc3QgaXRlbSB3aGVuIHJlc2l6aW5nIC1cInJlYWN0LWFsaWNlLWNhcm91c2VcIiB3YXkgb2Ygd29yay1cclxuICAgICovXHJcbiAgICBjb25zdCBvbkNhcm91c2VsUmVzaXplID0gKGUpID0+IHtcclxuICAgICAgICBzZXROdW1iZXJPZkRpc3BsYXllZEl0ZW1zKGUuaXRlbXNJblNsaWRlKVxyXG4gICAgICAgIHNldE5ld1Jlc3BvbnNpdmUoKVxyXG4gICAgICAgIHJlc2V0U2xpZGVyKClcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIGZpcmVkIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtIGFjdGlvbiBpZiBmb3VuZFxyXG4gICAgKi9cclxuICAgIGNvbnN0IG9uU2xpZGVDbGlja2VkID0gKGFjdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChhY3Rpb24/LmNhbkV4ZWN1dGUpIGFjdGlvbi5leGVjdXRlKClcclxuICAgIH1cclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChwcm9wcy5kYXRhPy5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIgJiYgIWNhcm91c2VsX2l0ZW1zPy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSBwcm9wcy5kYXRhLml0ZW1zLm1hcCgoaXRlbSwgaWR4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjb21tb25DbGFzc2VzLml0ZW19ICR7aWR4ID09PSAwID8gKGFjdGl2ZVNsaWRlQ2xhc3Nlcy5maXJzdF9pdGVtICsgXCIgXCIgKyBjb21tb25DbGFzc2VzLmFjdGl2ZSkgOiBcIlwifSAke2lkeCA9PT0gKHByb3BzLmRhdGEuaXRlbXMubGVuZ3RoIC0gMSkgPyBhY3RpdmVTbGlkZUNsYXNzZXMubGFzdF9pdGVtIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jb250ZW50LmdldChpdGVtKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKVxyXG5cclxuICAgICAgICAgICAgc2V0TnVtYmVyT2ZBbGxJdGVtcyhuZXdEYXRhLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgIHNldF9jYXJvdXNlbF9pdGVtcyhuZXdEYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtwcm9wcy5kYXRhXSlcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIC8vIHNldCBhIHVuaXF1ZSBjbGFzcyBpbiBjYXNlIG9mIHVzaW5nIHR3byBkaWZmZXJlbnQgY2Fyb3VzZWwgaW5zdGFuY2VzIGluIHRoZSBzYW1lIGRvY3VtZW50XHJcbiAgICAgICAgc2V0VW5pcXVlQ2xhc3MoXCJhLVwiICsgdXVpZHY0KCkpXHJcbiAgICB9LCBbXSlcclxuICAgIFxyXG4gICAgLypcclxuICAgICAgICBzZXQgdGhlIHJlc3BvbnNpdmUgb2JqZWN0IGFmdGVyIGluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBzbyBpdCB0YWtlIHRoZSBjb3JyZWN0IGRpbWVuc2lvbnNcclxuICAgICovXHJcbiAgICBjb25zdCBjYXJvdXNlbENvbnRhaW5lciA9IHVzZUNhbGxiYWNrKG5vZGUgPT4ge1xyXG4gICAgICAgIGlmIChub2RlKSBzZXROZXdSZXNwb25zaXZlKClcclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIGNhcm91c2VsX2l0ZW1zPy5sZW5ndGggP1xyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YWN0aXZlU2xpZGVDbGFzc2VzLmFjdGl2ZV9zbGlkZV9jb250YWluZXJ9IHJlZj17Y2Fyb3VzZWxDb250YWluZXJ9PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2FjdGl2ZVNsaWRlQ2xhc3Nlcy5wcmV2X2J0bn0gb25DbGljaz17cHJldkNsaWNrZWR9PjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1t1bmlxdWVDbGFzcywgYWN0aXZlU2xpZGVDbGFzc2VzLmFjdGl2ZV9zbGlkZV93cmFwcGVyXS5qb2luKFwiIFwiKX0gcmVmPXtzbGlkZXJDb250YWluZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtyZXNwb25zaXZlICYmIDxBbGljZUNhcm91c2VsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgJ3JlYWN0LWFsaWNlLWNhcm91c2VsJyBhbGwgbWV0aG9kIGFuZCBwcm9wZXJ0aWVzIHNvIHdlIGNhbiBvdmVycmlkZSBkZWZhdWx0IG5leHQgYW5kIHByZXZpb3VzIGJ1dHRvbnMgYmVoYXZpb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtlbCA9PiBzZXRDYXJvdXNlbFByb3BlcnRpZXMoZWwpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2Nhcm91c2VsX2l0ZW1zfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlPXtyZXNwb25zaXZlfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9QbGF5PXtmYWxzZX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b25zQ29udHJvbHM9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVEb3RzQ29udHJvbHM9e3RydWV9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbmNyZWFzaW5nIHRoZSBhbmltYXRpb24gRHVyYXRpb24gbW9yZSB0aGFuIDEwMCB3aWxsIGNyYXNoIHRoZSBzbGlkaW5nIGluIHRoZSBjYXJvdXNlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbj17MTAwfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5Ym9hcmROYXZpZ2F0aW9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VUcmFja2luZz17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoVHJhY2tpbmc9e2ZhbHNlfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Jbml0aWFsaXplZD17b25DYXJvdXNlbEluaXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVzaXplZD17b25DYXJvdXNlbFJlc2l6ZX1cclxuICAgICAgICAgICAgICAgICAgICAvPn08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXthY3RpdmVTbGlkZUNsYXNzZXMubmV4dF9idG59IG9uQ2xpY2s9e25leHRDbGlja2VkfSA+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PiA6XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjb21tb25DbGFzc2VzLm11bHRpX2VtcHR5X2NvbnRhaW5lcn0+PC9kaXY+XHJcbiAgICApXHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgXCIuL3VpL011bHRpQ2Fyb3VzZWwuY3NzXCJcbmltcG9ydCBOb3JtYWxDYXJvdXNlbCBmcm9tIFwiLi9jb21wb25lbnRzL05vcm1hbENhcm91c2VsXCJcbmltcG9ydCBBY3RpdmVTbGlkZUNhcm91c2VsIGZyb20gXCIuL2NvbXBvbmVudHMvQWN0aXZlU2xpZGVDYXJvdXNlbFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBNdWx0aUNhcm91c2VsKHByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgKChwcm9wcy5jYXJvdXNlbFR5cGUgPT09ICdub3JtYWwnIHx8IHByb3BzLmNhcm91c2VsVHlwZSA9PT0gJ2FjdGl2ZScpICYmXG4gICAgICAgICAgICA8Tm9ybWFsQ2Fyb3VzZWxcbiAgICAgICAgICAgICAgICBjYXJvdXNlbFR5cGU9e3Byb3BzLmNhcm91c2VsVHlwZX1cbiAgICAgICAgICAgICAgICBkYXRhPXtwcm9wcy5kYXRhfVxuICAgICAgICAgICAgICAgIGFjdGlvbj17cHJvcHMuYWN0aW9ufVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9e3Byb3BzLmNvbnRlbnR9XG5cbiAgICAgICAgICAgICAgICBpbmZpbml0ZT17cHJvcHMuaW5maW5pdGV9XG5cbiAgICAgICAgICAgICAgICBhdXRvUGxheT17cHJvcHMuYXV0b1BsYXl9XG4gICAgICAgICAgICAgICAgYXV0b1BsYXlEaXJlY3Rpb249e3Byb3BzLmF1dG9QbGF5RGlyZWN0aW9ufVxuICAgICAgICAgICAgICAgIGF1dG9QbGF5Q29udHJvbHM9e3Byb3BzLmF1dG9QbGF5Q29udHJvbHN9XG5cbiAgICAgICAgICAgICAgICBkaXNhYmxlQnV0dG9uc0NvbnRyb2xzPXtwcm9wcy5kaXNhYmxlQnV0dG9uc0NvbnRyb2xzfVxuICAgICAgICAgICAgICAgIGRpc2FibGVEb3RzQ29udHJvbHM9e3Byb3BzLmRpc2FibGVEb3RzQ29udHJvbHN9XG5cbiAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbj17cHJvcHMuYW5pbWF0aW9uRHVyYXRpb259XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uVHlwZT17cHJvcHMuYW5pbWF0aW9uVHlwZX1cblxuICAgICAgICAgICAgICAgIGtleWJvYXJkTmF2aWdhdGlvbj17cHJvcHMua2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgICAgIG1vdXNlVHJhY2tpbmc9e3Byb3BzLm1vdXNlVHJhY2tpbmd9XG4gICAgICAgICAgICAgICAgdG91Y2hUcmFja2luZz17cHJvcHMudG91Y2hUcmFja2luZ31cbiAgICAgICAgICAgIC8+KSB8fFxuICAgICAgICAoKHByb3BzLmNhcm91c2VsVHlwZSA9PT0gJ3NsaWRlJykgJiZcbiAgICAgICAgICAgIDxBY3RpdmVTbGlkZUNhcm91c2VsXG4gICAgICAgICAgICAgICAgZGF0YT17cHJvcHMuZGF0YX1cbiAgICAgICAgICAgICAgICBhY3Rpb249e3Byb3BzLmFjdGlvbn1cbiAgICAgICAgICAgICAgICBjb250ZW50PXtwcm9wcy5jb250ZW50fVxuICAgICAgICAgICAgLz4pIHx8IFxuICAgICAgICA8ZGl2PkVycm9yPC9kaXY+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsInR5cGVzIiwiVHJhY2VEaXJlY3Rpb25LZXkiLCJEaXJlY3Rpb24iLCJBeGlzIiwiY2FsY3VsYXRlRGlyZWN0aW9uXzEiLCJjYWxjdWxhdGVEaXJlY3Rpb24iLCJfdHlwZXMiLCJyZXF1aXJlIiwidHJhY2UiLCJkaXJlY3Rpb24iLCJuZWdhdGl2ZSIsIk5FR0FUSVZFIiwicG9zaXRpdmUiLCJQT1NJVElWRSIsImN1cnJlbnQiLCJsZW5ndGgiLCJwcmV2aW91cyIsImV2ZXJ5IiwiaSIsIk5PTkUiLCJjb21tb24iLCJnZXREaXJlY3Rpb25LZXkiLCJvYmplY3QiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJrZXkiLCJrZXlzIiwidG9TdHJpbmciLCJnZXREaXJlY3Rpb25WYWx1ZSIsInZhbHVlcyIsImdldERpZmZlcmVuY2UiLCJ4IiwieSIsIk1hdGgiLCJhYnMiLCJyZXNvbHZlQXhpc0RpcmVjdGlvbiIsImF4aXMiLCJMRUZUIiwiUklHSFQiLCJZIiwiQk9UVE9NIiwiVE9QIiwiY2FsY3VsYXRlRGlyZWN0aW9uRGVsdGFfMSIsImNhbGN1bGF0ZURpcmVjdGlvbkRlbHRhIiwiX2NvbW1vbiIsInRyYWNlRGlyZWN0aW9ucyIsImRlbHRhIiwiY3VycmVudEtleSIsImN1cnJlbnRWYWx1ZSIsInByZXYiLCJwcmV2S2V5IiwicHJldlZhbHVlIiwiZGlmZmVyZW5jZSIsImNhbGN1bGF0ZUR1cmF0aW9uXzEiLCJjYWxjdWxhdGVEdXJhdGlvbiIsInByZXZUaW1lIiwibmV4dFRpbWUiLCJjYWxjdWxhdGVNb3ZpbmdQb3NpdGlvbl8xIiwiY2FsY3VsYXRlTW92aW5nUG9zaXRpb24iLCJlIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WCIsImNsaWVudFkiLCJ1cGRhdGVUcmFjZV8xIiwidXBkYXRlVHJhY2UiLCJsYXN0IiwicHVzaCIsImNhbGN1bGF0ZVRyYWNlRGlyZWN0aW9uc18xIiwiY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zIiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwidGlja3MiLCJ0aWNrIiwiY3VycmVudERpcmVjdGlvbiIsInNsaWNlIiwicmVzb2x2ZURpcmVjdGlvbl8xIiwicmVzb2x2ZURpcmVjdGlvbiIsIl9jYWxjdWxhdGVEaXJlY3Rpb24iLCJfY2FsY3VsYXRlVHJhY2VEaXJlY3Rpb25zIiwiX2NhbGN1bGF0ZURpcmVjdGlvbkRlbHRhIiwiWCIsImRpcmVjdGlvbkRlbHRhIiwiZGlyZWN0aW9ucyIsIl9kaXJlY3Rpb24iLCJjYWxjdWxhdGVWZWxvY2l0eV8xIiwiY2FsY3VsYXRlVmVsb2NpdHkiLCJ0aW1lIiwibWFnbml0dWRlIiwic3FydCIsImNhbGN1bGF0ZVBvc2l0aW9uXzEiLCJjYWxjdWxhdGVQb3NpdGlvbiIsIl91cGRhdGVUcmFjZSIsIl9yZXNvbHZlRGlyZWN0aW9uIiwiX2NhbGN1bGF0ZUR1cmF0aW9uIiwiX2NhbGN1bGF0ZVZlbG9jaXR5Iiwic3RhdGUiLCJvcHRpb25zIiwic3RhcnQiLCJ0cmFjZVgiLCJ0cmFjZVkiLCJyb3RhdGVQb3NpdGlvbiIsImRlbHRhWCIsImRlbHRhWSIsImFic1giLCJhYnNZIiwiZGlyZWN0aW9uWCIsImRpcmVjdGlvblkiLCJkdXJhdGlvbiIsIkRhdGUiLCJub3ciLCJ2ZWxvY2l0eSIsInBvc2l0aW9uWCIsInBvc2l0aW9uWSIsImNoZWNrSXNNb3JlVGhhblNpbmdsZVRvdWNoZXNfMSIsImNoZWNrSXNNb3JlVGhhblNpbmdsZVRvdWNoZXMiLCJCb29sZWFuIiwiY3JlYXRlT3B0aW9uc18xIiwiY3JlYXRlT3B0aW9ucyIsInByb3h5IiwiZ2V0IiwiaXNQYXNzaXZlU3VwcG9ydGVkIiwiY2hlY2tJc1Bhc3NpdmVTdXBwb3J0ZWRfMSIsImNoZWNrSXNQYXNzaXZlU3VwcG9ydGVkIiwiX2NyZWF0ZU9wdGlvbnMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9vcCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlcnIiLCJjaGVja0lzVG91Y2hFdmVudHNTdXBwb3J0ZWRfMSIsIl90eXBlb2YiLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwiY2hlY2tJc1RvdWNoRXZlbnRzU3VwcG9ydGVkIiwibmF2aWdhdG9yIiwibWF4VG91Y2hQb2ludHMiLCJnZXRJbml0aWFsU3RhdGVfMSIsIm93bktleXMiLCJlbnVtZXJhYmxlT25seSIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJzb3VyY2UiLCJmb3JFYWNoIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJnZXRJbml0aWFsU3RhdGUiLCJpc1N3aXBpbmciLCJnZXRJbml0aWFsUHJvcHNfMSIsImdldEluaXRpYWxQcm9wcyIsInByb3BzIiwiZWxlbWVudCIsInJvdGF0aW9uQW5nbGUiLCJtb3VzZVRyYWNraW5nRW5hYmxlZCIsInRvdWNoVHJhY2tpbmdFbmFibGVkIiwicHJldmVudERlZmF1bHRUb3VjaG1vdmVFdmVudCIsInByZXZlbnRUcmFja2luZ09uTW91c2VsZWF2ZSIsImdldE9wdGlvbnNfMSIsImdldE9wdGlvbnMiLCJwYXNzaXZlIiwicm90YXRlQnlBbmdsZV8xIiwicm90YXRlQnlBbmdsZSIsInBvc2l0aW9uIiwiYW5nbGUiLCJhbmdsZUluUmFkaWFucyIsIlBJIiwicm90YXRlZFgiLCJjb3MiLCJzaW4iLCJyb3RhdGVkWSIsIl9jYWxjdWxhdGVNb3ZpbmdQb3NpdGlvbiIsIl9jYWxjdWxhdGVQb3NpdGlvbiIsIl9jaGVja0lzTW9yZVRoYW5TaW5nbGVUb3VjaGVzIiwiX2NoZWNrSXNQYXNzaXZlU3VwcG9ydGVkIiwiX2NoZWNrSXNUb3VjaEV2ZW50c1N1cHBvcnRlZCIsIl9nZXRJbml0aWFsU3RhdGUiLCJfZ2V0SW5pdGlhbFByb3BzIiwiX2dldE9wdGlvbnMiLCJfcm90YXRlQnlBbmdsZSIsIl9leHBvcnROYW1lcyIsIlV0aWxzIiwiX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUiLCJub2RlSW50ZXJvcCIsIldlYWtNYXAiLCJjYWNoZUJhYmVsSW50ZXJvcCIsImNhY2hlTm9kZUludGVyb3AiLCJfX2VzTW9kdWxlIiwiY2FjaGUiLCJoYXMiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJkZXNjIiwic2V0IiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiZGVzY3JpcHRvciIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIlZhbmlsbGFTd2lwZSIsImhhbmRsZVN3aXBlU3RhcnQiLCJiaW5kIiwiaGFuZGxlU3dpcGVNb3ZlIiwiaGFuZGxlU3dpcGVFbmQiLCJoYW5kbGVNb3VzZURvd24iLCJoYW5kbGVNb3VzZU1vdmUiLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VMZWF2ZSIsImluaXQiLCJzZXR1cFRvdWNoTGlzdGVuZXJzIiwic2V0dXBNb3VzZUxpc3RlbmVycyIsInVwZGF0ZSIsInByZXZQcm9wcyIsIm5leHRQcm9wcyIsImFzc2lnbiIsImRlc3Ryb3kiLCJjbGVhbnVwTW91c2VMaXN0ZW5lcnMiLCJjbGVhbnVwVG91Y2hMaXN0ZW5lcnMiLCJfdGhpcyRwcm9wcyIsImxpc3RlbmVyIiwiX3RoaXMkcHJvcHMyIiwiX3RoaXMkcHJvcHMzIiwiZ2V0RXZlbnREYXRhIiwibW92aW5nUG9zaXRpb24iLCJfVXRpbHMkcm90YXRlQnlBbmdsZSIsIl90aGlzJHN0YXRlIiwiX3RoaXMkZ2V0RXZlbnREYXRhIiwiX3RoaXMkcHJvcHM0Iiwib25Td2lwZVN0YXJ0Iiwib25Td2lwaW5nIiwiY2FuY2VsYWJsZSIsInByZXZlbnREZWZhdWx0IiwiTnVtYmVyIiwiX3RoaXMkcHJvcHM1Iiwib25Td2lwZWQiLCJvblRhcCIsIl9wb3NpdGlvbiIsImlzVG91Y2hFdmVudHNTdXBwb3J0ZWQiLCJBQ1RJT04iLCJJTklUIiwiUkVTSVpFIiwiVVBEQVRFIiwiRXZlbnRUeXBlIiwiRkFERU9VVCIsIlNMSURFIiwiQW5pbWF0aW9uVHlwZSIsIkRFRkFVTFQiLCJBTEwiLCJBdXRvUGxheVN0cmF0ZWd5IiwiQUxURVJOQVRFIiwiUkVTUE9OU0lWRSIsIkNvbnRyb2xzU3RyYXRlZ3kiLCJSVEwiLCJMVFIiLCJBdXRvcGxheURpcmVjdGlvbiIsIkFOSU1BVEVEIiwiUk9PVCIsIldSQVBQRVIiLCJTVEFHRSIsIlNUQUdFX0lURU0iLCJET1RTIiwiRE9UU19JVEVNIiwiUExBWV9CVE4iLCJQTEFZX0JUTl9JVEVNIiwiUExBWV9CVE5fV1JBUFBFUiIsIlNMSURFX0lORk8iLCJTTElERV9JTkZPX0lURU0iLCJCVVRUT05fUFJFViIsIkJVVFRPTl9QUkVWX1dSQVBQRVIiLCJCVVRUT05fUFJFVl9JVEVNIiwiQlVUVE9OX05FWFQiLCJCVVRUT05fTkVYVF9XUkFQUEVSIiwiQlVUVE9OX05FWFRfSVRFTSIsIkNsYXNzbmFtZXMiLCJBQ1RJVkUiLCJJTkFDVElWRSIsIkNMT05FRCIsIkNVU1RPTSIsIlBBVVNFIiwiU0VQQVJBVE9SIiwiU1NSIiwiVEFSR0VUIiwiTW9kaWZpZXJzIiwidHlwZXNfMSIsImFjdGl2ZUluZGV4IiwiYW5pbWF0aW9uRHVyYXRpb24iLCJhbmltYXRpb25FYXNpbmdGdW5jdGlvbiIsImFuaW1hdGlvblR5cGUiLCJhdXRvSGVpZ2h0IiwiYXV0b1dpZHRoIiwiYXV0b1BsYXkiLCJhdXRvUGxheUNvbnRyb2xzIiwiYXV0b1BsYXlEaXJlY3Rpb24iLCJhdXRvUGxheUludGVydmFsIiwiYXV0b1BsYXlTdHJhdGVneSIsImNoaWxkcmVuIiwiY29udHJvbHNTdHJhdGVneSIsImRpc2FibGVCdXR0b25zQ29udHJvbHMiLCJkaXNhYmxlRG90c0NvbnRyb2xzIiwiZGlzYWJsZVNsaWRlSW5mbyIsImluZmluaXRlIiwiaW5uZXJXaWR0aCIsIml0ZW1zIiwia2V5Ym9hcmROYXZpZ2F0aW9uIiwibW91c2VUcmFja2luZyIsIm5hbWUiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInJlc3BvbnNpdmUiLCJzd2lwZURlbHRhIiwic3dpcGVFeHRyYVBhZGRpbmciLCJzc3JTaWxlbnRNb2RlIiwidG91Y2hUcmFja2luZyIsInRvdWNoTW92ZURlZmF1bHRFdmVudHMiLCJvbkluaXRpYWxpemVkIiwib25SZXNpemVkIiwib25SZXNpemVFdmVudCIsIm9uU2xpZGVDaGFuZ2UiLCJvblNsaWRlQ2hhbmdlZCIsIl9fYXNzaWduIiwibyIsInQiLCJyIiwicyIsIm1hcFBhcnRpYWxDb29yZHMiLCJtYXAiLCJ3aWR0aCIsIm1hcFBvc2l0aW9uQ29vcmRzIiwiZ2V0U2hpZnRJbmRleCIsImdldFN0YXJ0SW5kZXgiLCJnZXRBY3RpdmVJbmRleCIsInN0YXJ0SW5kZXgiLCJpdGVtc0NvdW50IiwiZ2V0VXBkYXRlU2xpZGVQb3NpdGlvbkluZGV4Iiwic2hvdWxkUmVjYWxjdWxhdGVTbGlkZUluZGV4Iiwic2hvdWxkQ2FuY2VsU2xpZGVBbmltYXRpb24iLCJnZXRTd2lwZUxpbWl0TWluIiwiaXRlbXNPZmZzZXQiLCJ0cmFuc2Zvcm1hdGlvblNldCIsIm1pbiIsImdldFN3aXBlTGltaXRNYXgiLCJuIiwiaXRlbXNJblNsaWRlIiwiZ2V0SXRlbUNvb3JkcyIsInNob3VsZFJlY2FsY3VsYXRlU3dpcGVQb3NpdGlvbiIsImdldElzTGVmdERpcmVjdGlvbiIsImdldFN3aXBlU2hpZnRWYWx1ZSIsImdldFRyYW5zZm9ybWF0aW9uSXRlbUluZGV4IiwiZmluZEluZGV4IiwiZ2V0U3dpcGVUcmFuc2Zvcm1hdGlvbkN1cnNvciIsImdldFN3aXBlVG91Y2hlbmRQb3NpdGlvbiIsImlzU3RhZ2VDb250ZW50UGFydGlhbCIsInN3aXBlQWxsb3dlZFBvc2l0aW9uTWF4IiwiZ2V0U3dpcGVUb3VjaGVuZEluZGV4IiwiZCIsImEiLCJ0cmFuc2xhdGUzZCIsImdldEZhZGVvdXRBbmltYXRpb25JbmRleCIsImdldEZhZGVvdXRBbmltYXRpb25Qb3NpdGlvbiIsInN0YWdlV2lkdGgiLCJpc1ZlcnRpY2FsVG91Y2htb3ZlRGV0ZWN0ZWQiLCJjb21tb25fMSIsIm1hcHBlcnNfMSIsIm1hdGhfMSIsImdldFNsaWRlcyIsImdldEl0ZW1zQ291bnQiLCJnZXRJdGVtc09mZnNldCIsImNyZWF0ZUNsb25lcyIsImdldEl0ZW1zSW5TbGlkZSIsInVuc2hpZnQiLCJjb25jYXQiLCJpc0VsZW1lbnQiLCJFbGVtZW50IiwiSFRNTERvY3VtZW50IiwiY3JlYXRlQXV0b3dpZHRoVHJhbnNmb3JtYXRpb25TZXQiLCJBcnJheSIsImZyb20iLCJyZWR1Y2UiLCJnZXRFbGVtZW50RGltZW5zaW9ucyIsImZpcnN0Q2hpbGQiLCJjb29yZHMiLCJjb250ZW50IiwicGFydGlhbCIsImNyZWF0ZURlZmF1bHRUcmFuc2Zvcm1hdGlvblNldCIsImdldEl0ZW1XaWR0aCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsImdldEF1dG9oZWlnaHRQcm9wZXJ0eSIsImdldEVsZW1lbnRDdXJzb3IiLCJnZXRFbGVtZW50Rmlyc3RDaGlsZCIsImdldENvbXB1dGVkU3R5bGUiLCJwYXJzZUZsb2F0IiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiY2VpbCIsIm9mZnNldEhlaWdodCIsInNob3VsZEhhbmRsZVJlc2l6ZUV2ZW50IiwiYW5pbWF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsInRyYW5zZm9ybSIsImdldFJlbmRlcldyYXBwZXJTdHlsZXMiLCJnZXRUcmFuc2l0aW9uUHJvcGVydHkiLCJnZXRSZW5kZXJTdGFnZVN0eWxlcyIsImdldFJlbmRlclN0YWdlSXRlbVN0eWxlcyIsImZhZGVvdXRBbmltYXRpb25JbmRleCIsImZhZGVvdXRBbmltYXRpb25Qb3NpdGlvbiIsImZhZGVvdXRBbmltYXRpb25Qcm9jZXNzaW5nIiwiZ2V0VHJhbnNsYXRlM2RQcm9wZXJ0eSIsImdldFRvdWNobW92ZVRyYW5zbGF0ZVBvc2l0aW9uIiwiZmxvb3IiLCJnZXRUcmFuc2xhdGVYUHJvcGVydHkiLCJnZXRUcmFuc2Zvcm1NYXRyaXgiLCJtYXRjaCIsImVsZW1lbnRzXzEiLCJjYW5Vc2VET00iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb25jYXRDbGFzc25hbWVzIiwiam9pbiIsImdldElzU3RhZ2VDb250ZW50UGFydGlhbCIsIml0ZW1zRml0IiwiY2FsY3VsYXRlSW5pdGlhbFN0YXRlIiwibCIsIm0iLCJjIiwidSIsImYiLCJnIiwiSSIsIlMiLCJwIiwidiIsImNsb25lcyIsInN0YWdlQ29udGVudFdpZHRoIiwiaW5pdGlhbFN0YWdlSGVpZ2h0IiwiaXNBdXRvUGxheWluZyIsImlzQXV0b1BsYXlDYW5jZWxlZE9uQWN0aW9uIiwic3dpcGVMaW1pdE1pbiIsInN3aXBlTGltaXRNYXgiLCJzd2lwZVNoaWZ0VmFsdWUiLCJjYW5Vc2VEb20iLCJnZXRSZW5kZXJTdGFnZUl0ZW1DbGFzc2VzIiwiaXNBY3RpdmVJdGVtIiwiaXNDbG9uZWRJdGVtIiwiaXNUYXJnZXRJdGVtIiwiZGVib3VuY2UiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZGVidWciLCJjb25zb2xlIiwiZ2V0QWN0aXZlU2xpZGVJbmRleCIsImdldFNsaWRlSW5kZXhGb3JOb25NdWx0aXBsZUl0ZW1zIiwiZ2V0U2xpZGVJbmRleEZvck11bHRpcGxlSXRlbXMiLCJnZXRBY3RpdmVTbGlkZURvdHNMZW5ndGgiLCJnZXRTbGlkZUluZm8iLCJpdGVtIiwiZ2V0U2xpZGVJdGVtSW5mbyIsImlzUHJldlNsaWRlRGlzYWJsZWQiLCJpc05leHRTbGlkZURpc2FibGVkIiwic2hvdWxkRGlzYWJsZUNvbnRyb2xzIiwiaXNTdHJhdGVneSIsInNob3VsZERpc2FibGVEb3RzIiwic2hvdWxkRGlzYWJsZUJ1dHRvbnMiLCJpbmNsdWRlcyIsImhhc0RvdEZvckVhY2hTbGlkZSIsImdldERvdHNOYXZpZ2F0aW9uTGVuZ3RoIiwiY2hlY2tJc1RoZUxhc3REb3RJbmRleCIsImdldEl0ZW1JbmRleEZvckRvdE5hdmlnYXRpb24iLCJzaG91bGRDYW5jZWxBdXRvUGxheU9uQWN0aW9uIiwic2hvdWxkQ2FuY2VsQXV0b1BsYXlPbkhvdmVyIiwiX19jcmVhdGVCaW5kaW5nIiwiY3JlYXRlIiwiX19leHBvcnRTdGFyIiwiX19pbXBvcnREZWZhdWx0IiwiZGVmYXVsdCIsInJlYWN0XzEiLCJ1dGlsc18xIiwiU2xpZGVJbmZvIiwicmVuZGVyU2xpZGVJbmZvIiwiY2xhc3NOYW1lIiwiU3RhZ2VJdGVtIiwic3R5bGVzIiwiRG90c05hdmlnYXRpb24iLCJvbkNsaWNrIiwib25Nb3VzZUVudGVyIiwib25Nb3VzZUxlYXZlIiwicmVuZGVyRG90c0l0ZW0iLCJfIiwiRCIsImlzQWN0aXZlIiwiUGxheVBhdXNlQnV0dG9uIiwiaXNQbGF5aW5nIiwicmVuZGVyUGxheVBhdXNlQnV0dG9uIiwiUHJldk5leHRCdXR0b24iLCJpc0Rpc2FibGVkIiwicmVuZGVyUHJldkJ1dHRvbiIsInJlbmRlck5leHRCdXR0b24iLCJTbGlkZUluZm9fMSIsIlN0YWdlSXRlbV8xIiwiRG90c05hdmlnYXRpb25fMSIsIlBsYXlQYXVzZUJ1dHRvbl8xIiwiUHJldk5leHRCdXR0b25fMSIsIl9fZXh0ZW5kcyIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiU3RyaW5nIiwiX19zZXRNb2R1bGVEZWZhdWx0IiwiX19pbXBvcnRTdGFyIiwiX19hd2FpdGVyIiwiUHJvbWlzZSIsIm5leHQiLCJ0aHJvdyIsImRvbmUiLCJ0aGVuIiwiX19nZW5lcmF0b3IiLCJsYWJlbCIsInNlbnQiLCJ0cnlzIiwib3BzIiwicmV0dXJuIiwicG9wIiwidmFuaWxsYV9zd2lwZV8xIiwiZGVmYXVsdFByb3BzXzEiLCJWaWV3cyIsIkFsaWNlQ2Fyb3VzZWwiLCJzd2lwZUxpc3RlbmVyIiwiX2hhbmRsZUtleWJvYXJkRXZlbnRzIiwiY29kZSIsIl9oYW5kbGVQbGF5UGF1c2VUb2dnbGUiLCJzbGlkZVByZXYiLCJzbGlkZU5leHQiLCJfaGFuZGxlQmVmb3JlU2xpZGVFbmQiLCJfaGFuZGxlVXBkYXRlU2xpZGVQb3NpdGlvbiIsInNldFN0YXRlIiwiX2hhbmRsZVNsaWRlQ2hhbmdlZCIsIl9oYW5kbGVNb3VzZUVudGVyIiwiaXNIb3ZlcmVkIiwiX2hhbmRsZVBhdXNlIiwiX2hhbmRsZU1vdXNlTGVhdmUiLCJfaGFuZGxlUGxheSIsIl9jbGVhckF1dG9QbGF5VGltZW91dCIsImhhc1VzZXJBY3Rpb24iLCJfc2V0Um9vdENvbXBvbmVudFJlZiIsInJvb3RFbGVtZW50IiwiX3NldFN0YWdlQ29tcG9uZW50UmVmIiwic3RhZ2VDb21wb25lbnQiLCJfcmVuZGVyU3RhZ2VJdGVtIiwiX3JlbmRlclNsaWRlSW5mbyIsImlzQW5pbWF0aW9uRGlzYWJsZWQiLCJpc1RvdWNoTW92ZVByb2Nlc3NTdGFydGVkIiwiY2FuY2VsVG91Y2hBbmltYXRpb25zIiwicm9vdENvbXBvbmVudERpbWVuc2lvbnMiLCJzdGFydFRvdWNobW92ZVBvc2l0aW9uIiwic2xpZGVUbyIsIl9oYW5kbGVUb3VjaG1vdmUiLCJfaGFuZGxlVG91Y2hlbmQiLCJfaGFuZGxlRG90Q2xpY2siLCJfaGFuZGxlUmVzaXplIiwiX2hhbmRsZVJlc2l6ZURlYm91bmNlZCIsIl9jYW5jZWxSZXNpemVEZWJvdW5jZWQiLCJjb21wb25lbnREaWRNb3VudCIsIl9zZXRJbml0aWFsU3RhdGUiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJfc2V0dXBTd2lwZUhhbmRsZXJzIiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaCIsIl91cGRhdGVDb21wb25lbnQiLCJfdXBkYXRlU3dpcGVQcm9wcyIsIl91cGRhdGVFdmVudExpc3RlbmVycyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiX2NhbmNlbFRpbWVvdXRBbmltYXRpb25zIiwiX3JlbW92ZUV2ZW50TGlzdGVuZXJzIiwic2xpZGUiLCJ0eXBlIiwiaXNGYWRlb3V0QW5pbWF0aW9uQWxsb3dlZCIsIl9oYW5kbGVTbGlkZVRvIiwiZXZlbnRUeXBlIiwiaXNUcnVzdGVkIiwiX2hhbmRsZVJlc2l6ZWQiLCJfc2V0VG91Y2htb3ZlUG9zaXRpb24iLCJfaGFuZGxlU2xpZGVDaGFuZ2UiLCJ0b3VjaG1vdmVQb3NpdGlvbiIsIl9jbGVhclRvdWNobW92ZVBvc2l0aW9uIiwiX2hhbmRsZUJlZm9yZVRvdWNoRW5kIiwidG91Y2hFbmRUaW1lb3V0SWQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzbGlkZUVuZFRpbWVvdXRJZCIsImV2ZW50T2JqZWN0IiwiX3NldEF1dG9QbGF5SW50ZXJ2YWwiLCJfY2xlYXJTbGlkZUVuZFRpbWVvdXQiLCJjbGVhclRvdWNoZW5kVGltZW91dCIsImF1dG9QbGF5VGltZW91dElkIiwiX3JlbmRlckRvdHNOYXZpZ2F0aW9uIiwiX3JlbmRlclByZXZCdXR0b24iLCJfcmVuZGVyTmV4dEJ1dHRvbiIsIl9yZW5kZXJQbGF5UGF1c2VCdXR0b24iLCJyZW5kZXIiLCJyZWYiLCJkZWZhdWx0UHJvcHMiLCJQdXJlQ29tcG9uZW50IiwiZ2V0UmFuZG9tVmFsdWVzIiwicm5kczgiLCJVaW50OEFycmF5Iiwicm5nIiwiY3J5cHRvIiwiRXJyb3IiLCJ2YWxpZGF0ZSIsInV1aWQiLCJSRUdFWCIsInRlc3QiLCJieXRlVG9IZXgiLCJ1bnNhZmVTdHJpbmdpZnkiLCJhcnIiLCJvZmZzZXQiLCJ0b0xvd2VyQ2FzZSIsInBhcnNlIiwicGFyc2VJbnQiLCJzdHJpbmdUb0J5dGVzIiwic3RyIiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJieXRlcyIsImNoYXJDb2RlQXQiLCJETlMiLCJVUkwiLCJ2MzUiLCJ2ZXJzaW9uIiwiaGFzaGZ1bmMiLCJnZW5lcmF0ZVVVSUQiLCJuYW1lc3BhY2UiLCJidWYiLCJfbmFtZXNwYWNlIiwibWQ1IiwibXNnIiwibWQ1VG9IZXhFbmNvZGVkQXJyYXkiLCJ3b3Jkc1RvTWQ1IiwiYnl0ZXNUb1dvcmRzIiwiaW5wdXQiLCJvdXRwdXQiLCJsZW5ndGgzMiIsImhleFRhYiIsImhleCIsImNoYXJBdCIsImdldE91dHB1dExlbmd0aCIsImlucHV0TGVuZ3RoOCIsImxlbiIsImIiLCJvbGRhIiwib2xkYiIsIm9sZGMiLCJvbGRkIiwibWQ1ZmYiLCJtZDVnZyIsIm1kNWhoIiwibWQ1aWkiLCJzYWZlQWRkIiwibGVuZ3RoOCIsIlVpbnQzMkFycmF5IiwibHN3IiwibXN3IiwiYml0Um90YXRlTGVmdCIsIm51bSIsImNudCIsIm1kNWNtbiIsInEiLCJyYW5kb21VVUlEIiwidjQiLCJuYXRpdmUiLCJybmRzIiwicmFuZG9tIiwieiIsIlJPVEwiLCJzaGExIiwiSyIsIkgiLCJpc0FycmF5IiwiTiIsIk0iLCJqIiwicG93IiwiVyIsIlQiLCJkZWZhdWx0UmVzcG9uc2l2ZSIsImdldE5ld1Jlc3BvbnNpdmVWYWx1ZXMiLCJyYXRlIiwibmV3UmVzcG9uc2l2ZSIsIm5ld1ZhbHVlIiwicm91bmQiLCJtYXgiLCJzdGF0dXNMaXN0IiwicmVzZXQiLCJnb0xhc3QiLCJjbGFzc2VzQWN0aW9uIiwiYWRkIiwicmVtb3ZlIiwiY29tbW9uQ2xhc3NlcyIsIm11bHRpX2NvbnRhaW5lciIsIm11bHRpX2VtcHR5X2NvbnRhaW5lciIsImFjdGl2ZSIsIm5vX2RvdHMiLCJub3JtYWxDYXJvdXNlbENsYXNzZXMiLCJub3JtYWxfY29udGFpbmVyIiwibm9ybWFsX2l0ZW0iLCJhY3RpdmVDbGlja0NsYXNzZXMiLCJhY3RpdmVfY2xpY2tfY29udGFpbmVyIiwiYWN0aXZlX2NsaWNrX2l0ZW0iLCJhY3RpdmVfY2xpY2tfd2l0aF9idG4iLCJhY3RpdmVTbGlkZUNsYXNzZXMiLCJhY3RpdmVfc2xpZGVfY29udGFpbmVyIiwiYWN0aXZlX3NsaWRlX3dyYXBwZXIiLCJmaXJzdF9pdGVtIiwibGFzdF9pdGVtIiwicHJldl9idG4iLCJuZXh0X2J0biIsIk5vcm1hbENhcm91c2VsIiwiY2Fyb3VzZWxQYXJlbnQiLCJ1c2VSZWYiLCJjYXJvdXNlbF9pdGVtcyIsInNldF9jYXJvdXNlbF9pdGVtcyIsInVzZVN0YXRlIiwic2V0UmVzcG9uc2l2ZSIsInVuaXF1ZUNsYXNzIiwic2V0VW5pcXVlQ2xhc3MiLCJzZXROZXdSZXNwb25zaXZlIiwiY2xpZW50V2lkdGgiLCJhZGRPclJlbW92ZUNsYXNzTmFtZSIsIm5vZGUiLCJhY3Rpb24iLCJjbGFzc0xpc3QiLCJjaGFuZ2VBY3RpdmVDbGFzcyIsImdldElkeENsYXNzTmFtZSIsImNsaWNrZWRJdGVtIiwiY29udGFpbnMiLCJwYXJlbnROb2RlIiwiY2xhc3NOYW1lcyIsInNwbGl0Iiwib25DYXJkQ2xpY2tlZCIsImNhbkV4ZWN1dGUiLCJleGVjdXRlIiwiYWN0aXZlTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWR4Q2xhc3MiLCJpdGVtVG9TZXRBY3RpdmUiLCJjYXJvdXNlbFR5cGUiLCJ1c2VFZmZlY3QiLCJ1dWlkdjQiLCJyZXNpemVPYnNlcnZlciIsIlJlc2l6ZU9ic2VydmVyIiwib2JzZXJ2ZSIsImRpc2Nvbm5lY3QiLCJkYXRhIiwic3RhdHVzIiwiYWN0aXZlX2NsaWNrX2NsaWNrYWJsZV9pdGVtIiwiQWN0aXZlU2xpZGVDYXJvdXNlbCIsInNsaWRlckNvbnRhaW5lciIsImN1cnJlbnRBY3RpdmVJZHgiLCJzZXRDdXJyZW50QWN0aXZlSWR4IiwibnVtYmVyT2ZEaXNwbGF5ZWRJdGVtcyIsInNldE51bWJlck9mRGlzcGxheWVkSXRlbXMiLCJudW1iZXJPZkFsbEl0ZW1zIiwic2V0TnVtYmVyT2ZBbGxJdGVtcyIsImNhcm91c2VsUHJvcGVydGllcyIsInNldENhcm91c2VsUHJvcGVydGllcyIsInJlc2V0U2xpZGVyIiwic2V0QWN0aXZlQ2xhc3MiLCJzbGlkZVRvVGhlRW5kIiwicHJldkNsaWNrZWQiLCJuZXh0Q2xpY2tlZCIsInJlbW92ZUFjdGl2ZUNsYXNzIiwiYWxsSXRlbXMiLCJpdGVtSWR4VG9TZXRBY3RpdmUiLCJwYXJlbnRFbGVtZW50Iiwic2xpZGVMZWZ0T3JSaWdodCIsImFjdGlvbklkeCIsImZpcnN0U2xpZGUiLCJsYXN0U2xpZGUiLCJhY3Rpb25Ub0ZpcmUiLCJvblNsaWRlQ2xpY2tlZCIsIm9uQ2Fyb3VzZWxJbml0Iiwib25DYXJvdXNlbFJlc2l6ZSIsIm5ld0RhdGEiLCJpZHgiLCJjYXJvdXNlbENvbnRhaW5lciIsInVzZUNhbGxiYWNrIiwiZWwiLCJNdWx0aUNhcm91c2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0NBRUFBLE1BQU0sQ0FBQ0MsY0FBYyxDQUFDQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0NBQzNDQyxFQUFBQSxLQUFLLEVBQUUsSUFBQTtDQUNULENBQUMsQ0FBQyxDQUFBO0FBQ0ZELFFBQUFBLENB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LENBQUE7S0FDckJpVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR3puQixDQUFDLEtBQUssQ0FBQyxDQUFBO0NBQ3ZCLEdBQUE7Q0FFQSxFQUFBLE9BQU8sQ0FBQ3luQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJ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