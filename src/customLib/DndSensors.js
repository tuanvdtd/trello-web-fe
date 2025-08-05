import { MouseSensor as LibMouseSensor, TouchSensor as LibTouchSensor } from '@dnd-kit/core';

// Block DnD event propagation if element have "data-no-dnd" attribute, để fix lỗi bôi đen text bị nhả sang kéo thả dnd
// chỉ cẩn thềm data-no-dnd="true" vào thẻ cần chặn sự kiện kéo thả khi bôi đen text
const handler = ({ nativeEvent: event }) => {
    let cur = event.target;

    while (cur) {
        if (cur.dataset && cur.dataset.noDnd) {
            return false;
        }
        cur = cur.parentElement;
    }

    return true;
};

export class MouseSensor extends LibMouseSensor {
    static activators = [{ eventName: 'onMouseDown', handler }];
}

export class TouchSensor extends LibTouchSensor {
    static activators = [{ eventName: 'onTouchStart', handler }];
}