'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = true;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    const events = {};

    function execute(contexts) {
        contexts.forEach((eventHandlers, context) => {
            eventHandlers.forEach(event => {
                if (event.exeCount < event.times && event.exeCount % event.frequency === 0) {
                    event.handler.call(context);
                }
                event.exeCount++;
            });
        });
    }

    function subscribe(event, context, handler, info = { times: Infinity, frequency: 1 }) {
        console.info(event, context, handler);
        if (!events[event]) {
            events[event] = new Map();
        }
        if (!events[event].get(context)) {
            events[event].set(context, []);
        }
        const { times, frequency } = info;
        events[event].get(context)
            .push({
                handler: handler,
                exeCount: 0,
                times: times,
                frequency: frequency
            });
    }

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            subscribe(event, context, handler);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            console.info(event, context);
            for (let eventName in events) {
                if (eventName === event || eventName.startsWith(event + '.')) {
                    events[eventName].delete(context);
                }
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            const eventNames = [event];
            let lastDotIndex = event.lastIndexOf('.');

            while (lastDotIndex !== -1) {
                const subString = event.substring(0, lastDotIndex);
                eventNames.push(subString);
                lastDotIndex = subString.indexOf('.');
            }

            eventNames.filter(e => events.hasOwnProperty(e))
                .forEach(e => execute(events[e]));

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            times = times <= 0 ? Infinity : times;

            subscribe(event, context, handler, { times: times, frequency: 1 });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            frequency = frequency <= 0 ? 1 : frequency;
            subscribe(event, context, handler, { times: Infinity, frequency: frequency });

            return this;
        }
    };
}

module.exports = {
    getEmitter,
    isStar
};
