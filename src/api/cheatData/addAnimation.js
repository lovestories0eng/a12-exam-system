export default function addAnimation(el){
    const height = el.clientHeight
    const root = el
    return function () {
        const now_height = root.clientHeight
        root.style.height = now_height?0:height + 'px'
    }
}
