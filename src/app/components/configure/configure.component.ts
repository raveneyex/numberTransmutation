import { Component } from '@angular/core';
import { TransmutationService } from '../../services/transmutation.service';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'app-configure',
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.css'],
    providers: [HelperService]

})
export class ConfigureComponent {
    private input: string;
    private currentLimit: number;
    private systemLimit: number;

    constructor(private helper: HelperService) {
        this.systemLimit = Number.MAX_SAFE_INTEGER;
        this.currentLimit = this.helper.limit !== Number.MAX_SAFE_INTEGER
            ? this.helper.limit
            : null;
    }

    public onSubmit() {
        try {
            const num = this.helper.parseInput(this.input);
            this.helper.limit = num;
            this.currentLimit = this.helper.limit;
            this.input = '';
        } catch (e) {
            // ToDo: Alert Component
        }
    }

    public onRemove() {
        this.helper.limit = null;
        this.currentLimit = this.helper.limit;
    }
}
