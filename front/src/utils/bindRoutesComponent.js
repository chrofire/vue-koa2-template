function bindRoutesComponent (routes, importData) {
    const _routes = JSON.parse(JSON.stringify(routes))
    _routes.forEach(route => {
        bindComponent (route)
    })
    function bindComponent (content) {
        if (content.hasOwnProperty('component')) {
            content.component = importData[content.component]
        }
        if (content.children && content.children.length) {
            content.children.forEach(child => {
                bindComponent(child)
            })
        }
    }
    return _routes
}

export default bindRoutesComponent