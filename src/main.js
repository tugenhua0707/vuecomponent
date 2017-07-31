
import Checkbox from './components/checkbox/checkbox.vue';
import CheckboxGroup from './components/checkbox/checkbox-group.vue';
import Rate from './components/rate/rate.vue';
import Timeline from './components/timeline/timeline.vue';
import TimelineItem from './components/timeline/timeline-item.vue';
import Icon from './components/icon/icon.vue';
import Button from './components/button/button.vue';
import ButtonGroup from './components/button/button-group.vue';
import Select2 from './components/select2/select2.vue';
import Select2Option from './components/select2/select2-option.vue';
import CitySelect from './components/cityselect/cityselect.vue';
import InputNumber from './components/input-number/input-number.vue';
import Sticky from './components/sticky/sticky.vue';
import Badge from './components/badge/badge.vue';

// import DropDown from './components/dropdown/dropdown.vue';
/* import DropDownItem from './components/dropdown/dropdown-item.vue';
import DropDownMenu from './components/dropdown/dropdown-menu.vue'; */

const iview = {
  'tb-checkbox': Checkbox,
  'tb-checkbox-group': CheckboxGroup,
  'tb-rate': Rate,
  'tb-timeline': Timeline,
  'tb-timeline-item': TimelineItem,
  'tb-icon': Icon,
  'tb-button': Button,
  'tb-button-group': ButtonGroup,
  'tb-select2': Select2,
  'tb-select2-option': Select2Option,
  'tb-city-select': CitySelect,
  'tb-input-number': InputNumber,
  'tb-sticky': Sticky,
  'tb-badge': Badge,
  // 'tb-dropdown': DropDown,
  // 'tb-dropdown-item': DropDownItem,
  // 'tb-dropdown-menu': DropDownMenu
};

const install = function (Vue, opts = {}) {
  Object.keys(iview).forEach((key) => {
    Vue.component(key, iview[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version: '0.0.1',
  'tb-checkbox': Checkbox,
  'tb-checkbox-group': CheckboxGroup,
  'tb-rate': Rate,
  'tb-timeline': Timeline,
  'tb-timeline-item': TimelineItem,
  'tb-icon': Icon,
  'tb-button': Button,
  'tb-button-group': ButtonGroup,
  'tb-select2': Select2,
  'tb-select2-option': Select2Option,
  'tb-city-select': CitySelect,
  'tb-input-number': InputNumber,
  'tb-sticky': Sticky,
  'tb-badge': Badge,
  // 'tb-dropdown': DropDown,
  // 'tb-dropdown-item': DropDownItem,
  // 'tb-dropdown-menu': DropDownMenu
};

module.exports = Object.assign(iview, {install});   // eslint-disable-line no-undef
