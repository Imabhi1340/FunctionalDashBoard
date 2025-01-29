import { LightningElement ,api} from 'lwc';

export default class FunctionalDashboardSection extends LightningElement {
    @api tileCount;

    handleColorChange(event){
        const{isRed,tileId} = event.detail;
        if(isRed){
            const element = this.template.querySelector(`[data-id="${tileId}"]`);
            console.log('element'+ element);
            element.style.backgroundColor ='rgb(236, 85, 85)';
        }
    }
}