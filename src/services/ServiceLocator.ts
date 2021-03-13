

class ServiceDef{
    name:string="";
    cnst:any;
    instanceName:string ="";


}
interface IServiceLocator{
    register(serviceName:any, constructor:any, instanceName:any|null):any;
    getService<T>(serviceName:string):T;

}
class _ServiceLocator implements IServiceLocator {

    serviceDefinitions:ServiceDef[] = [];
    constructor() {
    }
    register(serviceName:any, constructor:any, instanceName:any) {

        instanceName = instanceName || "nodef"
        var current = this.serviceDefinitions.findIndex(s => s.name === serviceName && s.instanceName === instanceName);
        var def:ServiceDef = {
            name: serviceName,
            cnst: constructor,
            instanceName: instanceName
        };
        if (current < 0)
            this.serviceDefinitions.push(def);
        else
            this.serviceDefinitions[current] = def
        return def;
    }
    public getService<T>(serviceName:string):T {
        var result = undefined;
        var services = this.serviceDefinitions.filter(s => s.name === serviceName);
        if (services.length > 0) {
            var def = services[services.length - 1];
            result = def.cnst(this);
        }
        return result;
    }
}
const ServiceLocator:IServiceLocator = new _ServiceLocator();
export default ServiceLocator