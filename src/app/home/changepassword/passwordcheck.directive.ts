import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

export function compareValidator(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
        if (c.value === null || c.value.length === 0) {
            return null;
        }
        const controlToCompare = c.root.get(controlNameToCompare);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });

        }
        return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;
    };
}

export function compareValidatorA(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
        if (c.value === null || c.value.length === 0) {
            return null;
        }
        const controlToCompare = c.root.get(controlNameToCompare);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });

        }
        return controlToCompare && controlToCompare.value == c.value ? { 'ncompare': true } : null;
    };
}

