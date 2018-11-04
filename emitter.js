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

        events: {},

        /**
         * @returns {Object}
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */
        on: function (event, context, handler) {
            const eventsNames = event.split('.');
            console.info(event, context, handler);
            let con = this.getNestedEvent(eventsNames, eventsNames.length);
            con.observes.push({ context: context, handler: handler });

            return this;
        },

        /**
         * @returns {Object}
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            const eventsNames = event.split('.');
            const nestedEvent = this.getNestedEvent(eventsNames, eventsNames.length);
            const index = nestedEvent.observes.findIndex(x => x.context === context);
            nestedEvent.observes.splice(index, 1);
            console.info(event, context);

            return this;
        },

        getNestedEvent: function (eventsNames, deepLvl) {
            let context = this.events;
            for (let i = 0; i < deepLvl; i++) {
                if (context[eventsNames[i]] === undefined) {
                    context[eventsNames[i]] = {
                        observes: []
                    };
                }
                context = context[eventsNames[i]];
            }

            return context;
        },

        /**
         * @returns {Object}
         * Уведомить о событии
         * @param {String} event
         */
        emit: function (event) {
            const eventsNames = event.split('.');
            let con;
            for (let i = 0; i < eventsNames.length; i++) {
                con = this.getNestedEvent(eventsNames, eventsNames.length - i);
                con.observes.forEach(x => x.handler.call(x.context));
            }
            console.info(event);

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
