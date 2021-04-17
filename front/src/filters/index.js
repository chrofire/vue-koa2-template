export default Vue => {
    Vue.filter('replaceNullData', function (value, callback) {
        if (callback) {
            return callback(value)
        }
        if (value) {
            return value
        } else {
            if (value === 0) {
                return 0
            } else {
                return '--'
            }
        }
    })
}