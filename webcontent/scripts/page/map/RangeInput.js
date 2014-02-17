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
        this.sliderDiv.change(jQuery.proxy(internalHandleSliderMoved, this));

        this.setLabelText(value);
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
//
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Update the range value represented by this class.
     */
    RangeInput.prototype.setValue = function (newValue) {
        this.setLabelText(newValue);
        this.sliderDiv.val(newValue);
        this.notifyListeners(this.sliderDiv.val());
    };

    RangeInput.prototype.setLabelText = function (newValue) {
        this.label.text(newValue);
    };

    RangeInput.prototype.notifyListeners = function (newValue) {
        this.trigger("range-change-event", newValue);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Update the range text display value.
     */
    function internalHandleSliderMoved() {
        var newValue = this.sliderDiv.val();
        this.setLabelText(newValue);
        this.notifyListeners(newValue);
    }


    return RangeInput;
});