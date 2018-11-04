'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */

function getEmitter() {
    return {

        events: new Map(),

        /**
         * @returns {Object}
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */
        on: function (event, context, handler) {
            if (!this.events.has(event)) {
                this.events.set(event, new Map());
            }
            let currEvent = this.events.get(event);
            if (!currEvent.has(context)) {
                currEvent.set(context, []);
            }
            let currContext = currEvent.get(context);

            currContext.push(handler);

            return this;
        },

        /**
         * @returns {Object}
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            for (let eventName of this.events.keys()) {
                if (eventName === event || eventName.startsWith(event + '.')) {
                    this.events.get(event)
                        .delete(context);
                }
            }

            return this;
        },

        /**
         * @returns {Object}
         * Уведомить о событии
         * @param {String} event
         */
        emit: function (event) {
            const eventParts = event.split('.');
            const eventNames = [];
            eventNames.push(event)
            for (let i=1;i<eventParts.length;i++){
                const eventName = eventParts.slice(0,eventParts.length-i);
                eventNames.push(eventName.join('.'));
            }
            for (let e of eventNames) {
                if (!this.events.has(e)) {
                    this.events.set(e, new Map());
                }
                let currEvent = this.events.get(e);
                for (let context of currEvent.keys()) {
                    currEvent
                        .get(context)
                        .forEach(handler => {
                            handler.call(context);
                        });
                }
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
