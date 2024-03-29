export default {
  functional: true,

  name: 'ElDivider',

  props: {
    // direction    设置分割线方向    boolean    horizontal / vertical    horizontal
    direction: {
      type: String,
      default: 'horizontal',
      validator (val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },
    // content-position    设置分割线文案的位置    string    left / right / center    center
    contentPosition: {
      type: String,
      default: 'center',
      validator (val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1;
      }
    }
  },

  render (h, context) {
    const $slots = context.slots();
    const { direction, contentPosition } = context.props;
    return (
      <div class={['el-divider', `el-divider--${direction}`]}>
        {
          $slots.default && direction !== 'vertical'
            ? <div class={['el-divider__text', `is-${contentPosition}`]}>{$slots.default}</div>
            : null
        }
      </div>
    );
  }
};