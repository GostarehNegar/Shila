

import Components from "./components/deprecated/components";
import Config from "./services/config";
import constants from "./services/constants";
import DataServices from "./services/dataservice";
import EventBus from "./services/EventBus";
import singleton from "./services/singleton";
import utils from "./services/utils";

import configureStore from "./store/store";


class Shila {

    static utils = utils;
    static config = Config;
    static constants = constants;
    static configureStore = configureStore;
    static bus = EventBus;
    static dataService = DataServices;
    static singleton= singleton;
    static components = Components;
    static dispatch(command){
        var api = singleton.storeAPI;
        if (api && typeof api.dispatch==='function'){
            api.dispatch(command);
        }
    }
    static getState(){
        return singleton && singleton.storeAPI && typeof singleton.storeAPI.getState==='function'
            ? singleton.storeAPI.getState()
            : {};
        
    }
}

singleton.shila = Shila

export default Shila;