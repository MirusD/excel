import {$} from '@core/dom';

export function resizeHandler($root, event) {
    return new Promise(resolve => {
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
                } else if (typeResize === 'row') {
                    delta = e.pageY - coordsParent.bottom;
                    value = coordsParent.height + delta;
                    resizer.css({
                        bottom: -delta - 4 + 'px'
                    });
                }
            }
            document.onmouseup = () => {
                if (delta) {
                    const colList = typeResize === 'col' ? $root.findAll(`[data-col="${$parent.data.col}"]`) : [];
                    value = value + 4;
                    if (typeResize === 'col') {
                        $parent.css({width: [value + 'px']});
                        colList.forEach( item => {
                            $(item).css({width: [value + 'px']})
                        })
                        resizer.css({right: '0'});
                    } else if (typeResize === 'row') {
                        $parent.css({height: [value + 'px']});
                        resizer.css({bottom: '0'});
                    }
                    $parent.css({position: 'relative'});

                    resolve({
                        typeResize,
                        value,
                        id: $parent.data[typeResize]
                    });
                }
                resizer.css({
                    opacity: 0,
                    bottom: '0',
                    right: '0'
                });
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    })
}
