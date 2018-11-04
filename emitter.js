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
    const events = new Map();

    return {

        /**
         * @returns {Object}
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */
        on: function (event, context, handler) {
            if (!events.has(event)) {
                events.set(event, new Map());
            }
            const contexts = events.get(event);
            if (!contexts.has(context)) {
                contexts.set(context, []);
            }
            const handlers = contexts.get(context);

            handlers.push(handler);

            return this;
        },

        /**
         * @returns {Object}
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            for (let eventName of events.keys()) {
                if (eventName === event || eventName.startsWith(event + '.')) {
                    events.get(event)
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
            const eventNames = [event];
            let lastDotIndex = event.lastIndexOf('.');

            while (lastDotIndex !== -1) {
                const subString = event.substring(0, lastDotIndex);
                eventNames.push(subString);
                lastDotIndex = subString.indexOf('.');
            }

            eventNames.filter(e => events.has(e))
                .forEach(e => {
                    events.get(e)
                        .forEach((handlers, context) => {
                            handlers.forEach(handler => handler.call(context));
                        });
                });

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
        }
    };
}

module.exports = {
    getEmitter,
    isStar
};
