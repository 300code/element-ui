<template>
  <li
    class="el-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'el-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElDropdownItem',

    mixins: [Emitter],
inject: ['dropdown'],
    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean,
      icon: String
    },

    methods: {
      handleClick(e) {
 
// 1. Find the top-most ElDropdown (Mitchell Admin)
        let parent = this.$parent;
        let rootDropdown = null;
        
        while (parent) {
            if (parent.$options.name === 'ElDropdown') rootDropdown = parent;
            parent = parent.$parent;
        }

        // 2. If the current sub-menu says "keep open", lock the root!
        if (this.dropdown && this.dropdown.keepParentOpen && rootDropdown) {
            rootDropdown.closeLocked = true;
            
            // Auto-unlock after the click event clears
            setTimeout(() => {
                rootDropdown.closeLocked = false;
            }, 500);
        }

        this.dispatch('ElDropdown', 'menu-item-click', [this.command, this]);
        
        if (this.dropdown && this.dropdown.keepParentOpen) {
            if (e && e.stopPropagation) e.stopPropagation();
        }
      }
    }
  };
</script>
