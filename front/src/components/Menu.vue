<script>
export default {
    name: 'Menu',
    props: {
        route: {
            type: Array,
            default: () => ([])
        }
    },
    data () {
        return {
        }
    },
    mounted () {
    },
    methods: {
        createMenu (arr) {
            return arr.map(item => {
                if (item.meta.hidden) {
                    return
                }
                if (Array.isArray(item.children) && !item.meta.menuItem) {
                    return (
                        <el-submenu index={item.meta.fullPath}>
                            <template slot="title">
                                {item.meta.icon ? <i class={item.meta.icon}></i> : <i class={`icon-block`}></i>}
                                <span>{item.meta.title}</span>
                            </template>
                            {this.createMenu(item.children)}
                        </el-submenu>
                    )
                } else {
                    return (
                        <el-menu-item index={item.meta.fullPath}>
                            <template slot="title">
                                {item.meta.icon ? <i class={item.meta.icon}></i> : <i class={`icon-block`}></i>}
                                <span slot="title">{item.meta.title}</span>
                            </template>
                        </el-menu-item>
                    )
                }
            })
        },
        select (key, keyPath) {
            this.$emit('select', key, keyPath)
        },
        open (key, keyPath) {
            this.$emit('open', key, keyPath)
        },
        close (key, keyPath) {
            this.$emit('close', key, keyPath)
        }
    },
    render () {
        const menuAttribute = {
            class: 'menu',
            props: {
                router: true,
                'default-active': this.$route.meta.currentPath || this.$route.path
            },
            on: {
                open: this.open,
                select: this.select,
                close: this.close
            }
        }
        return (
            <el-menu {...menuAttribute}>{this.createMenu(this.route)}</el-menu>
        )
    }
}
</script>

<style lang="scss" scoped>
.menu {
    border-right: none !important;
    user-select: none;
    .el-menu-item.is-active {
        color: #66b1ff;
        outline: 0;
        background-color: #ecf5ff;
    }
}
.icon-block {
    width: 22px;
    height: 22px;
    display: inline-block;
}
</style>