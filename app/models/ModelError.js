/**
 * @author IkhanRyu
 * @since 2016. 9. 26.
 */

export const VALIDATION_ERR = Symbol();

export default (() => {

    const _type = Symbol();
    const _message = Symbol();
    const _others = Symbol();

    return class ModelError{

        static createValidationError(message, others){
             return new ModelError(VALIDATION_ERR, message, others);           
        }

        constructor(type, message, others){
            this[_type] = type;
            this[_message] = message;
            this[_others] = others;
        }

        get type(){
            return this[_type];
        }

        get message(){
            return this[_message];
        }

        get others(){
            return this[_others];
        }
    }
})();