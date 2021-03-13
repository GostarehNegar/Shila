
import ServiceLocator from './services/ServiceLocator'
import Shila from './Shila'
import {AService} from "./services/AService"

const serviceNames = Shila.constants.serviceNames;

const composeServices=()=>{

    ServiceLocator.register("AService", s=>new AService());
    ServiceLocator.register(serviceNames.storeAPI, s => null,"instance");
}

export default composeServices;