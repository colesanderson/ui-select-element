import React from 'react';
import PropTypes from 'prop-types';

/**
 * Making Select component accessible!
 */

function A11yBlock({ options, selectedItem }) {
    const optionsCount = options ? options.length : 0;
    const activeItem = selectedItem.hasOwnProperty('activeIndex')
        ? selectedItem.activeIndex + 1
        : '';

    const string = selectedItem
        ? `${selectedItem.label} is selected, ${activeItem} of ${optionsCount} results.`
        : '';

    return (
        <div className="select__visually-hidden">
            {string && <p>{string}</p>}

            <p>
                For Keyboard: Press Space to open select options, use Up and
                Down to choose options, press Enter or Space to select the
                currently focused option, press Tab to select the option and
                exit the menu, or press Escape to close the select options.
            </p>
        </div>
    );
}

A11yBlock.propTypes = {
    /**
     * The select options in array
     */
    options: PropTypes.array.isRequired,

    /**
     * Get selected item in object
     */
    selectedItem: PropTypes.object
};

export default A11yBlock;
