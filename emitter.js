'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

function execute(contexts) {
    for (let [context, handlers] of contexts) {
        for (let handler of handlers) {
            handler.call(context);
        }
    }
}

/**
 * Возвращает новый emitter
 * @returns {Object}
 */

function getEmitter() {
    let events = new Map();

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
            while (event !== '') {
                if (events.has(event)) {
                    execute(events.get(event));
                }
                event = event.substring(0, event.lastIndexOf('.'));
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
