export default class Pojo {
  static getInstanceFromData (data) {
    const instance = Reflect.construct(this, []);
    const obj = {}
    Object.keys(instance).forEach(key => {
      if (instance.hasOwnProperty(key)) {
        if (instance[key]) {
          const field = instance[key].field || key
          if (instance[key].get) {
            obj[key] = instance[key].get(data[field])
          } else {
            obj[key] = data[field]
          }
        }
      }
    })
    return obj
  }
  static transformInstanceToParams (instance) {
    const params = {}
    const proto = Reflect.construct(this, []);
    Object.keys(proto).forEach(key => {
      if (proto.hasOwnProperty(key)) {
        if (proto[key]) {
          const field = proto[key].field || key
          if (proto[key].to) {
            params[field] = proto[key].to(instance[key])
          } else {
            params[field] = instance[key]
          }
        }
      }
    })
    return params
  }
}
