(function(eventNames, convenienceApi) { 
    var eventHandlers = {};
    eventHandlers[eventNames.PRE_SAVE] = function(modelData, event) { 
         console.log( "Inside PRE_SAVE event handler" ); 
    };
 
    return eventHandlers;
}(eventNames, convenienceApi)); 