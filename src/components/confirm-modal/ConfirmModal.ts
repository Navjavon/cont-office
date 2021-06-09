import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
import {IConfirmModalType} from '@/components/confirm-modal/ConfirmModal.types';

@Component({
  name: 'confirm-modal'
})
export default class ConfirmModal extends Vue {
  @Prop({
    default: {
      show: false,
      message: ''
    }
  })
  confirmData: IConfirmModalType;

  @Emit()
  onCloseConfirm(result: boolean) {
    this.confirmData.show = false;
    return {
      show: false,
      result
    };
  }
}
