//发布-订阅模式

function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.addEvent = function(type, handler, once) {
  (this.events[type] || (this.events[type] = [])).push({
    handler: handler,
    once: once
  });
} 
/**
 * @param {String} type 事件类型
 * @param {Function} handler 处理函数
 * 支持链式调用
 **/
EventEmitter.prototype.on = function(type, handler) {
  this.addEvent(type, handler, false);
  return this;
}
/**
 * 注册一个只执行一次的事件 支持链式调用
 */
EventEmitter.prototype.once = function(type, handler) {
  this.addEvent(type, handler, true);
  return this;
}
/**
 * arguments.length 0 移除所有事件
 * arguments.length 1 移除type类型所有事件
 * arguments.length 0 移除type类型的handler事件
 */
EventEmitter.prototype.off = function(type, handler) {
  console.log('gagag');
  let argsLen = arguments.length;
  //移除所有事件
  if(argsLen === 0) {
    this.events = {};
  } 
  else if(argsLen === 1) {
    delete this.events[type]
  } 
  else if(argsLen === 2) {
    let _events = this.events[type];
    if(_events) {
      for(let i = 0; i < _events.length; i++){
        if(_events[i].handler === handler) {
          _events.splice(i, 1)
        }
      }
    }
  }
  return this;
}
/**
 * 执行事件
 */
EventEmitter.prototype.emit = function(type) {
  let _events = this.events[type];
  if(!_events) return;
  let arr = [];
  for(let i = 0, len = _events.length; i < len; i++){
    _events[i].handler();
    if(_events[i].once) arr.push(i) 
  }
  //逆向循环删除事件，防止位置错乱
  for(let i = arr.length - 1; i >= 0;  i--){
    _events.splice(i, 1)
  }
  if(_events.length === 0) {
    delete this.events[type];
  }
} 