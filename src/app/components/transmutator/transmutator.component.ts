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
        this.transmutatedPairs = this.helper.readFromStorage();
    }

    public onSubmit(): void {
        const input: string = this.input;
        const newPair: TransmutatedPair = this.toTransmutatedPair(input);
        this.add(newPair);
        this.input = '';
    }

    private add(value: TransmutatedPair) {
        this.transmutatedPairs = [...this.transmutatedPairs, value];
    }

    private toTransmutatedPair(input: string): TransmutatedPair {
        try {
            const num = this.helper.parseInput(input);
            return this.trasnmutator.transmutate(num);
        } catch (e) {
            // ToDo: Alert Component.
        }
    }

}
