define([], function () {

    /**
     * Convenience class for dealing with <input type='range'/>
     *
     * @constructor
     */
    var RangeInput = function (inputSelectorString, labelSelectorString, min, max, step, value) {
        this.label = $(labelSelectorString);

        this.sliderDiv = $(inputSelectorString);
        this.sliderDiv.attr('min', min);
        this.sliderDiv.attr('max', max);
        this.sliderDiv.attr('step', step);
        this.sliderDiv.val(value);
        this.sliderDiv.change(jQuery.proxy(this.updateLabel, this));

        this.updateLabel();
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event methods that delegate to jquery object for triggering/observing custom events.
//
// range-change-event          [newValue]
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    RangeInput.prototype.on = function (eventName, callback) {
        this.sliderDiv.on(eventName, callback);
    };

    RangeInput.prototype.trigger = function (eventName, customData) {
        this.sliderDiv.trigger(eventName, customData);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Update the range text display value.
     */
    RangeInput.prototype.updateLabel = function () {
        this.label.text(this.sliderDiv.val());
        this.trigger("range-change-event", this.sliderDiv.val());
    };

    /**
     * Update the range text display value.
     */
    RangeInput.prototype.setValue = function (newValue) {
        this.label.text(newValue);
        this.sliderDiv.val(newValue);
        this.trigger("range-change-event", this.sliderDiv.val());
    };

    return RangeInput;
});