import { Component } from '@angular/core';
import { TransmutationService } from '../../services/transmutation.service';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'app-configure',
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.css'],
    providers: [TransmutationService, HelperService]

})
export class ConfigureComponent {

    private input: string;
    private currentLimit: number;
    private systemLimit: number;

    constructor(private helper: HelperService, private transmutator: TransmutationService) {
        this.systemLimit = Number.MAX_SAFE_INTEGER;
     }

    public onSubmit() {
        try {
            const num = this.helper.parseInput(this.input);
            this.currentLimit = this.transmutator.limit = num;
            this.input = '';
        } catch (e) {
            // ToDo: Alert Component
        }
    }

    public onRemove() {
        this.currentLimit = this.transmutator.limit = null;
    }
}
