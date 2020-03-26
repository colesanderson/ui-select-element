// Core
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Style
import './Icon.css';

/**
 * Icon component renders an SVG that uses the chosen symbol from the SVG
 * sprite present on the page. SVG icons from www.feathericons.com.
 */

function Icon({ className, title, name, style }) {
    const classes = classNames('icon', className);

    return (
        <svg className={classes} style={style} role="img" aria-label={title}>
            <title>{title}</title>
            <use role="presentation" xlinkHref={`#${name}`} />
        </svg>
    );
}

Icon.propTypes = {
    /**
     * Name of SVG icon, the name should be the filename, for example
     * airplay.svg, the name is `airplay.
     */
    name: PropTypes.string.isRequired,

    /**
     * Add title for screen readers
     */
    title: PropTypes.string.isRequired,

    /**
     * Add custom class to Icon
     */
    className: PropTypes.string,

    /**
     * Add custom styles to Icon
     */
    style: PropTypes.object
};

export default Icon;
