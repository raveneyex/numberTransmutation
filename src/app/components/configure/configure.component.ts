import { Component, OnInit } from '@angular/core';
import { TransmutationService } from '../../services/transmutation.service';
import { HelperService } from '../../services/helper.service';

// Declare component as <app-configure></app-configure>
@Component({
    selector: 'app-configure',
    templateUrl: './configure.component.html',
    providers: [HelperService]

})
// Controller for the component. Implements the OnInit lifecycle hook
export class ConfigureComponent implements OnInit {
    // User input
    public input: string;
    // Current user-defined limit
    public currentLimit: number;
    // System limit
    public systemLimit: number;
    // View error message
    public errorMessage: string;

    constructor(private helper: HelperService) { }

    /**
     * On Init read the system limit and the user limit (if any)
     */
    public ngOnInit() {
        this.systemLimit = Number.MAX_SAFE_INTEGER;
        this.currentLimit = this.helper.limit !== Number.MAX_SAFE_INTEGER
            ? this.helper.limit
            : null;
    }

    /**
     * Handles the form submit event.
     * Parses the input and saves it as user-defined limit
     */
    public onSubmit() {
        try {
            const num = this.helper.parseInput(this.input);
            this.helper.limit = num;
            this.currentLimit = this.helper.limit;
            this.input = '';
        } catch (e) {
            // If an error occurs, show it for 5 secs
            this.input = '';
            this._setError(e);
            setTimeout(this._cleanError.bind(this), 5000);
        }
    }

    /**
     * Clears the user-defined limit
     */
    public onRemove() {
        this.helper.limit = null;
        this.currentLimit = this.helper.limit;
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
