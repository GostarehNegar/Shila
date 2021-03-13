import Config from "./services/config";
import _constants from "./services/constants";
import ServiceLocator from "./services/ServiceLocator";
import configureStore from "./store/store";

export interface IStoreAPI{
    distaptch(ev:any):any;
    getState():any;
}

export class Shila{

    static config = Config;
    static constants = _constants;
    static configureStore = configureStore;
    static TT(){
    }
    static storeAPI():IStoreAPI {
        return ServiceLocator.getService<IStoreAPI>(_constants.serviceNames.storeAPI);
    }
    
}

export default Shila;