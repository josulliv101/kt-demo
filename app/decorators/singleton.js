// Not 100% necessary, but testing out decorators
export default (targetClass) => {

  const instance = Symbol('instance');

  targetClass.getInstance = () => {

    if (!targetClass[instance]) {
    	targetClass[instance] = new targetClass();
    }
    
    return targetClass[instance];
  };

  return targetClass;
}