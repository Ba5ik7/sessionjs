var Session = {
    /* INIT */
    init: function(minutes) {
        this.clear();
    },

    /* PUBLIC METHODS */
    verify: function(){
        for (var arg in arguments) {
            if(!sessionStorage.getItem(arguments[arg])){
                window.location.href = Pages.INDEX;
                return;
            }
        }
    },

    get: function(){
        var session = {};
        if(arguments.length !== 0){ //get values of given arguments.
            for (var arg in arguments){
                try{
                    session[arguments[arg]]  = JSON.parse(sessionStorage.getItem(arguments[arg]));
                }
                catch(e){
                    session[arguments[arg]]  = sessionStorage.getItem(arguments[arg]);
                }
            }
        }
        else{ //if not receive any arguments returns all session values.
            for (var i = sessionStorage.length - 1; i >= 0; i--) {
                try{
                    session[sessionStorage.key(i)] = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
                }
                catch(e){
                    session[sessionStorage.key(i)] = sessionStorage.getItem(sessionStorage.key(i));
                }
            }
        }
        return session;
    },

    getItem: function(key){
        if(key){
            try{
                return JSON.parse(sessionStorage.getItem(key));
            }
            catch(e){
                return sessionStorage.getItem(key);
            }
        }
    },

    updateItem: function(key, value, groupName){
        var sesion;
        if(groupName){
            session = this.get(groupName);
            session[groupName][key] = value;
            sessionStorage.setItem(groupName, JSON.stringify(session[groupName]));
        }
        else{
            session = this.get(key);
            session[key] = value;
            sessionStorage.setItem(key, JSON.stringify(session[key]));
        }
    },

    setItem: function(key, value){
        if(typeof value === 'object'){
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
    },

    removeItem: function(key){
        sessionStorage.removeItem(key);
    },

    clear: function(){
        sessionStorage.clear();
    }
};
