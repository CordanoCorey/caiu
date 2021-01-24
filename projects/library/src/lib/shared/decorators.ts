import { BaseEntity } from './base-entity';

// export const ActionCreator = (actionType?: any | any[]) => {

//     return (target: any, propertySignature: string) => {
//         const method = target[propertySignature];
//         const decoratedMethod = function () {
//             const $this = this;
//             const action = method.apply($this, arguments);
//             action.actionType = actionType;
//             return action;
//         };

//         target[propertySignature] = decoratedMethod;
//         return target;
//     };
// };

export const ActionType = () => {

  return (target: any, propertySignature: string) => {
    return target;
  };
};

/**
 * Class Decorator Factory
 * Decorates a class.
 */
export const Class = (metadata: any) => {
  const classDecorator = (target: any) => {
    return target;
  };
  return classDecorator;
};

export const Command = () => {

  return (target: any, propertySignature: string) => {
    return target;
  };
};

export const Dispatcher = () => {

  return (target: any, propertySignature: string) => {
    return target;
  };
};

/**
 * Decorates a class with properties from BaseEntity
 */
export const Entity = (metadata?: any) => {
  function classDecorator<TFunction extends Function>(target: TFunction) {
    const ctor: Function = function () {
      Object.assign(this, new BaseEntity(), { metadata: metadata || {} });
    };
    ctor.prototype = Object.create(target.prototype);
    ctor.prototype.constructor = target;
    return <TFunction>ctor;
  };
  return classDecorator;
};

export const EventHandler = () => {

  return (target: any, propertySignature: string) => {
    return target;
  };
};

export const LifecycleHook = () => {

  return (target: any, propertySignature: string) => {
    return target;
  };
};

/**
 * Method Decorator Factory
 * Decorates a method.
 */
export const Method = (metadata: any) => {
  const methodDecorator = (target: any, propertySignature: string, descriptor: TypedPropertyDescriptor<any>) => {
    return target;
  };
  return methodDecorator;
};

/**
 * Parameter Decorator Factory
 * Decorates a parameter.
 */
export const Parameter = (metadata: any) => {
  const parameterDecorator = (target: any, propertySignature: string, parameterIndex: number) => {
    return target;
  };
  return parameterDecorator;
};

/**
 * Property Decorator Factory
 * Decorates a Property.
 */
export const Property = (metadata: any) => {
  const propertyDecorator = (target: any, propertySignature: string) => {
    if (!target.metadata) {
      target.metadata = {};
    }
    target.metadata[propertySignature] = Object.assign(metadata, { propertyName: propertySignature });
    return target;
  };
  return propertyDecorator;
};

/**
 * Static Method Decorator Factory
 * Decorates a static method.
 */
export const StaticMethod = (metadata: any) => {
  const staticMethodDecorator = (target: any, propertySignature: string) => {
    return target;
  };
  return staticMethodDecorator;
};

/**
 *  Static Property Decorator Factory
 * Decorates a static property.
 */
export const StaticProperty = (metadata: any) => {
  const staticPropertyDecorator = (target: any, propertySignature: string) => {
    return target;
  };
  return staticPropertyDecorator;
};
