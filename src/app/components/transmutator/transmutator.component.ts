import { Component, OnInit } from '@angular/core';
import { TransmutationService } from '../../services/transmutation.service';
import { HelperService } from '../../services/helper.service';
import TransmutatedPair from '../../types/TransmutatedPair';

// Declare component as <transmutator></transmutator>
@Component({
    selector: 'transmutator',
    templateUrl: './transmutator.component.html',
    styleUrls: ['./transmutator.component.css'],
    providers: [TransmutationService, HelperService]
})
/**
 * Controller for Component.
 * Implements OnInit lifecycle hook.
 */
export class TransmutatorComponent implements OnInit {
    private errorMessage: string;
    private transmutatedPairs: TransmutatedPair[];
    private input: string;

    constructor(private helper: HelperService, private transmutator: TransmutationService) { }

    /**
     * On init read values from storage.
     * If none are found create some initial ones.
     */
    public ngOnInit() {
        this.transmutatedPairs = this.helper.getStoredValues();
        if (!this.transmutatedPairs || !this.transmutatedPairs.length) {
            this.transmutatedPairs = [
                this.transmutator.transmutate(5),
                this.transmutator.transmutate(999),
                this.transmutator.transmutate(-6547)
            ];
        }
    }

    /**
     * Handles the submit of the form.
     * Takes the input value, transmutates it, and cleans the input
     */
    public onSubmit(): void {
        const input: string = this.input;
        this.toTransmutatedPair(input);
        this.input = '';
    }

    /**
     * Nuke all
     */
    public clear(): void {
        this.transmutatedPairs = [];
        this.helper.clearStorage();
    }

    /**
     * Add a value to the view.
     */
    private _addPair(value: TransmutatedPair) {
        this.transmutatedPairs = [...this.transmutatedPairs, value];
        this.helper.persistValues(this.transmutatedPairs);
    }

    /**
     * Try to transmutate the input.
     * Show errors if input is bad or unsafe or beyond limit
     */
    private toTransmutatedPair(input: string) {
        try {
            const num = this.helper.parseInput(input);
            const limit = this.helper.limit;
            if (num > limit) {
                throw new Error('The number exceeds the user-defined limit');
            }
            const pair = this.transmutator.transmutate(num);
            this._addPair(pair);
        } catch (e) {
            // If an error occurs, show it for 5 secs
            this._setError(e);
            setTimeout(this._cleanError.bind(this), 5000);
        }
    }

    // Sets an error message
    private _setError(error) {
        this.errorMessage = error;
    }

    // Deletes an error message
    private _cleanError() {
        delete this.errorMessage;
    }

}
