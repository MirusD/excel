import {$} from '@core/dom';

export function resizeHandler($root, event) {
    const typeResize = event.target.dataset.resize;
    if (typeResize) {
        const resizer = $(event.target);
        const $parent = resizer.closest('[data-type="resizeble"]');
        const coordsParent = $parent.getCoords();
        const type = typeResize === 'col' ? 'bottom':'right';
        resizer.css({
            opacity: 1,
            [type]: '-5000px'
        });
        let delta;
        let value;
        document.onmousemove = e => {
            if (typeResize === 'col') {
                delta = e.pageX - coordsParent.right;
                value = coordsParent.width + delta;
                resizer.css({
                    right: -delta - 4 + 'px'
                });
            } else {
                delta = e.pageY - coordsParent.bottom;
                value = coordsParent.height + delta;
                resizer.css({
                    bottom: -delta - 4 + 'px'
                });
            }
        }
        document.onmouseup = () => {
            const colList = typeResize === 'col' ? $root.findAll(`[data-col="${$parent.data.col}"]`) : [];
            if (typeResize === 'col') {
                $parent.css({width: [value + 4 + 'px']});
                colList.forEach( item => {
                    $(item).css({width: [value + 4 + 'px']})
                })
                resizer.css({right: '0'});
            } else {
                $parent.css({height: [value + 4 + 'px']});
                resizer.css({bottom: '0'});
            }
            $parent.css({position: 'relative'});
            resizer.css({
                opacity: 0,
                bottom: '0',
                right: '0'
            });
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}
