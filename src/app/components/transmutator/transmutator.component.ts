import { Component, OnInit } from '@angular/core';
import { TransmutationService } from '../../services/transmutation.service';
import { HelperService } from '../../services/helper.service';
import TransmutatedPair from '../../types/TransmutatedPair';

@Component({
    selector: 'transmutator',
    templateUrl: './transmutator.component.html',
    styleUrls: ['./transmutator.component.css'],
    providers: [TransmutationService, HelperService]
})
export class TransmutatorComponent implements OnInit {

    private transmutatedPairs: TransmutatedPair[];
    private input: string;

    constructor(private helper: HelperService, private trasnmutator: TransmutationService) {
    }

    public ngOnInit() {
        debugger;
        this.transmutatedPairs = this.helper.getStoredValues();
    }

    public onSubmit(): void {
        const input: string = this.input;
        this.toTransmutatedPair(input);
        this.input = '';
    }

    private _addPair(value: TransmutatedPair) {
        this.transmutatedPairs = [...this.transmutatedPairs, value];
        this.helper.persistValues(this.transmutatedPairs);
    }

    private toTransmutatedPair(input: string) {
        try {
            const num = this.helper.parseInput(input);
            const pair = this.trasnmutator.transmutate(num);
            this._addPair(pair);
        } catch (e) {
            // ToDo: Alert Component.
        }
    }

}
