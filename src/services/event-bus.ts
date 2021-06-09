import Vue from 'vue';

const EventBus = new Vue();

export function emitMessageInfo(message: string, err: boolean) {
    EventBus.$emit('messageInfo', {message, error: err});
}

export function emitMessage(returnFields: boolean = false) {
    return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            let err = false;
            let msg: string;
            let fields: any;

            try {
                ({data: {message: msg}} = await originalMethod.apply(this, args));
            } catch (e) {
                ({data: {message: msg, fields}} = e.response);
                err = true;
            }

            emitMessageInfo(msg, err);
            return returnFields && fields ? fields : err;
        };
    }
}

export default EventBus;
