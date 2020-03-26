// Core
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import Icon from '../icon';
import A11yBlock from './a11y-block';

// Style
import './select.css';

// Key codes
const ENTER_CODE = 13;
const SPACE_CODE = 32;
const TAB_CODE = 9;
const ARROW_UP_CODE = 38;
const ARROW_DOWN_CODE = 40;
const ESC_CODE = 27;

/**
 * The select component!
 */

function Select({ options, selectName, className }) {
    const [selectedOption, setSelectedOption] = useState({});
    const [optionsIsOpen, setOptionsIsOpen] = useState(false);
    const classes = classNames('select', className);

    // Refs
    const selectOptionEl = useRef(null);
    const optionsListEl = useRef(null);

    // Class names
    const selectedClasses = classNames('select__selected', {
        'select__selected--is-open': optionsIsOpen
    });

    // Update Selected Item
    // ---
    function updateSelectedItem(opt) {
        let selectedItemValue;

        // Filter for default value, if more than one item, then use the first
        // item.
        selectedItemValue = opt.filter((option, index) => {
            if (option.default === true) {
                // add index to object to detect which array is active
                option.activeIndex = index;
            }
            return option.default === true;
        })[0];

        // If no default value and use first item of options
        if (opt && selectedItemValue === undefined) {
            const firstItem = opt[0];
            firstItem.activeIndex = 0;
            selectedItemValue = firstItem;
        }

        return selectedItemValue;
    }

    // Get selected option
    // ---
    let getSelectedOption;

    // If selected option is set from useState then use this value,
    // otherwise update selected Item
    if (Object.entries(selectedOption).length !== 0) {
        getSelectedOption = selectedOption;
    } else {
        getSelectedOption = options ? updateSelectedItem(options) : null;
    }

    // Focus Active Item
    // ---
    function focusActiveItem() {
        if (optionsListEl.current.children.length !== 0) {
            optionsListEl.current.children[
                getSelectedOption.activeIndex
            ].focus();
        }
    }

    // Selected Option Events
    // ---
    function selectedOptionEvents(event) {
        const eventType = event.type;

        // Ensure that options are open so can select the item to focus,
        // otherwise nothing to select to focus because options is not
        // in the DOM yet.
        async function openOptionsAndFocusItem() {
            await setOptionsIsOpen(!optionsIsOpen);

            await focusActiveItem();
        }

        if (eventType === 'click') {
            openOptionsAndFocusItem();
        }

        if (eventType === 'keypress') {
            if (event.which === SPACE_CODE) {
                openOptionsAndFocusItem();
            }
        }
    }

    // Select Option Item
    // ---
    // Select item and open/close options menu
    function selectOption(option, index) {
        option.activeIndex = index;

        if (!option.disabled) {
            setSelectedOption(option);
            setOptionsIsOpen(!optionsIsOpen);
        }
    }

    // Item key down events
    // ---
    function itemKeyDownEvent(event, option, index) {
        // Keyboard events
        if (
            event.which === ENTER_CODE ||
            event.which === SPACE_CODE ||
            event.which === TAB_CODE
        ) {
            selectOption(option, index);
        }

        if (event.which === ESC_CODE) {
            setOptionsIsOpen(!optionsIsOpen);
        }

        // Focus next and prev item but only if available
        if (
            event.which === ARROW_UP_CODE &&
            event.target.previousElementSibling
        ) {
            event.target.previousElementSibling.focus();
        }

        if (
            event.which === ARROW_DOWN_CODE &&
            event.target.nextElementSibling
        ) {
            event.target.nextElementSibling.focus();
        }
    }

    // Item click event
    // ---
    function itemClickEvent(option, index) {
        selectOption(option, index);
    }

    // Item blur event
    // ---
    function itemBlurEvent(event) {
        if (
            event.relatedTarget === null ||
            event.relatedTarget.className !== selectOptionEl.current.className
        ) {
            setOptionsIsOpen(!optionsIsOpen);
        }
    }

    return (
        <div className={classes}>
            {/* Information for a11y */}
            {options && getSelectedOption && (
                <A11yBlock options={options} selectedItem={getSelectedOption} />
            )}

            {/* Selected Option */}
            {getSelectedOption && (
                <div
                    className={selectedClasses}
                    onClick={(event) => selectedOptionEvents(event)}
                    onKeyPress={(event) => selectedOptionEvents(event)}
                    tabIndex="0"
                >
                    <div className="select__selected-item">
                        {getSelectedOption.icon && (
                            <div className="select__selected-item-icon">
                                <Icon
                                    name={getSelectedOption.icon}
                                    title={getSelectedOption.label}
                                    id={getSelectedOption.icon}
                                />
                            </div>
                        )}

                        <div className="select__selected-item-label">
                            {getSelectedOption.label}
                        </div>
                    </div>

                    <div className="select__selected-chevron-down">
                        <Icon
                            name="chevron-down"
                            title="Chevron down"
                            id="chevron-down"
                        />
                    </div>
                </div>
            )}

            {/* Select Options  */}
            {optionsIsOpen && options && (
                <div className="select__options" ref={optionsListEl}>
                    {options.map((option, index) => {
                        return (
                            <button
                                key={index}
                                className="select__option"
                                onClick={() => itemClickEvent(option, index)}
                                onKeyDown={(event) =>
                                    itemKeyDownEvent(event, option, index)
                                }
                                onBlur={(event) => itemBlurEvent(event)}
                                data-disabled={option.disabled ? true : false}
                                ref={selectOptionEl}
                            >
                                {option.icon && (
                                    <div className="select__option-icon">
                                        <Icon
                                            name={option.icon}
                                            title={option.label}
                                            id={option.icon}
                                        />
                                    </div>
                                )}

                                <div className="select__option-label">
                                    {option.label}
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Hidden input for forms */}
            {getSelectedOption && selectName && (
                <input
                    name={selectName}
                    type="hidden"
                    value={getSelectedOption.label}
                />
            )}
        </div>
    );
}

Select.propTypes = {
    /**
     * The select options in array
     */
    options: PropTypes.array.isRequired,

    /**
     * Add class name to select component
     */
    className: PropTypes.string,

    /**
     * Forms attribute to add name for input's name attribute
     */
    selectName: PropTypes.string
};

export default Select;
