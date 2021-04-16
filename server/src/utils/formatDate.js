const dayjs = require('dayjs')

/**
 * 格式化createdAt
 * @param {Object} row 一条数据
 */
function formatCreatedAt (row) {
    if (row.hasOwnProperty('createdAt') || row.createdAt) {
        row.createdAt = dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
    return row
}

/**
 * 格式化updatedAt
 * @param {Object} row 一条数据
 */
function formatUpdatedAt (row) {
    if (row.hasOwnProperty('updatedAt') || row.updatedAt) {
        row.updatedAt = dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }
    return row
}

/**
 * 格式化deleteAt
 * @param {Object} row 一条数据
 */
function formatDeleteAt (row) {
    if (row.hasOwnProperty('deleteAt') || row.deleteAt) {
        row.deleteAt = dayjs(row.deleteAt).format('YYYY-MM-DD HH:mm:ss')
    }
    return row
}

/**
 * 格式化createdAt, updatedAt, deleteAt
 * @param {Object} row 一条数据
 */
function formatDate (row) {
    formatCreatedAt(row)
    formatUpdatedAt(row)
    formatDeleteAt(row)
    return row
}

module.exports = {
    formatCreatedAt,
    formatUpdatedAt,
    formatDeleteAt,
    formatDate
}
