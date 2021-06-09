import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  name: 'navbar'
})
export default class Navbar extends Vue {
    @Prop({default: []})
    items!: INavbarComplexItem[];
};
