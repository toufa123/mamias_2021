/**
 * @license Highcharts JS v9.3.0 (2021-10-21)
 * @module highcharts/themes/grid
 * @requires highcharts
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import H from '../../Core/Globals.js';
import GridTheme from '../../Extensions/Themes/Grid.js';

H.theme = GridTheme.options;
GridTheme.apply();
