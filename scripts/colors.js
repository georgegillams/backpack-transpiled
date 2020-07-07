const BLUE_START = '\x1B[0;34m';
const YELLOW_START = '\x1B[0;33m';
const COLOR_END = '\x1B[0m';

export const blue = s => `${BLUE_START}${s}${COLOR_END}`;
export const yellow = s => `${YELLOW_START}${s}${COLOR_END}`;
