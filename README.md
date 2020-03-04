# Modals Example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

## Overview

This document outlines a suggested method of implementing a modal leveraging angular material components and interacting with a [reactive angular form](https://angular.io/guide/reactive-forms). It will explain how the modal component can be customized to fit the demands of the design, the process of passing data in and retrieving it when the modal has closed. All explanation of the form configuration will not be discussed in this explanation. The form will only serve as a real life example of modal content. For a more thorough explanation of the form's implementation, see the [Forms Example](../../../../../Documents/documentation/forms.md).

## The Modal Component

#### Template

A typical modal has three sections: header, content, and footer. Although this implementation allows for the flexibility of removing any one of those sections to fit the desired design.

```html
<div class="modalComponent">
  <ng-template #defaultHeader>
    <app-modal-header [config]="config" [dialogRef]="dialogRef"></app-modal-header>
  </ng-template>
  <ng-template #defaultFooter>
    <app-modal-footer [config]="config" [dialogRef]="dialogRef" [payload]="payload"></app-modal-footer>
  </ng-template>
  <ng-container *ngTemplateOutlet="headerTemplate || defaultHeader; context"></ng-container>
  <ng-container *ngTemplateOutlet="contentTemplate; context"></ng-container>
  <ng-container *ngTemplateOutlet="footerTemplate || defaultFooter; context"></ng-container>
</div>
```

The modal component requires a content template to be specified as part of the implementation. Default header and footer templates are provided if no custom template is provided.

Note that the footer receives the configuration object as well as the payload output to be passed back for primary button callbacks such as a submission api call.

#### Usage and Configuration

The specific content should be created in a component on its own that encapsulates all logic and supporting methods used within the modal. In our example, this file is the ```UserRegistrationFormDialog``` component. The template has the form interface. The typescript file handles the configuration and intitialization of the form instance.

```html
// user-registration-form-dialog.html

<app-modal [config]="config" [dialogRef]="dialogRef" [payload]="userRegistrationForm">
    <ng-template #content>
        <div class="userRegistrationFormDialog">
            <form [formGroup]="userRegistrationForm" fxLayout.xs="column" fxLayout="row wrap" fxLayoutGap="10px grid" fxLayoutGap.xs="0px">
                <app-form-field [form]="userRegistrationForm" [field]="field"
                    *ngFor="let field of userRegistrationFormConfig" fxFlex.xs=100 fxFlex.sm=50
                    [fxFlex]="field.width || 25"></app-form-field>
            </form>
        </div>
    </ng-template>
</app-modal>
```

The important parts of this sample is that the top most node is the implementation of the modal component (app-modal). It is passed the ```dialogRef```, ```config```, and the ```payload```. The dialogRef is the reference to the modal itself. This is handed to the header and footer in order to be able to close the modal. The config is given to pass along to the header and footer for specific data such as a 'title' or primary button callback function. It would be considered the 'input' to run the modal. The payload can be any type of value that would be considered the output. This is passed to the validation and primary callback functions in the default implementation. Any new information learned within the modal should find its way to this package to be used in the context that launched the modal.

The interior content nested in the modal component will be used to render the interface. The current implementation uses the default header and footer. Therefore, none is provided in this template. Content is supplied and passed along with a template selected of **#content**. This is VERY IMPORTANT. It dictates that it gets rendered at all. If a custom header is needed, simply add an ```ng-template``` with the selector of **#header**. Similarly, a footer would have the selector of **#footer**.

```ts
constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: any
) {}
```

In the typescript file, the constructor will expose the ```dialogRef``` variable to be given to the modal component in the template. It will also expose the ```config``` object passed to the modal when it was opened. This will be explained in the next section.

## Implementation

A modal has been created, how does it get used? For starters, make sure that the component is declared in the module that is using it directly or imported through another. Equally as important, it must be added in the ```entryComponents``` array of the module as well. See the ```app.module.ts``` for an example of how this is done.

In the component that will launch the modal, this demonstration uses the example ```modals.component.ts``` file, the ```MatDialog``` needs to be referenced and opened with a configuration object.

```ts
// modals.component.ts

  constructor(
    public dialog: MatDialog,
  ) {}
```

The constructor provides the reference to the ```MatDialog```. The method to open it uses the ```dialog.open``` with several parameters. The first is the component class, the second is the config object.

Usage:
```ts
// modals.component.ts

openUserRegistrationDialog() {
    this.dialog.open(UserRegistrationFormDialogComponent, {
            width: '60vw',
            panelClass: 'no-padding-dialog',
            data: {
                header: {
                    title: 'User Registration Form'
                },
                content: {
                    user: {}
                },
                footer: {
                    primaryButtonLabel: 'Save',
                    primaryButtonCallback: this.submitUserRegistrationForm,
                    primaryButtonValidation: this.isUserRegistrationFormValid,
                }
        }
    });
}

isUserRegistrationFormValid = (form: FormGroup) => {
    return form.valid;
}

submitUserRegistrationForm = (form: FormGroup) => {
    this.formPayload = form.value;
    form.reset();
    this.dialog.closeAll();
}
```

The configuration has standard angular material modal options. Along with that, a data property contains configuration information for the header, content, and footer. Interfaces for the default header and footer options can be found in the ```modal-header.interface.ts``` and the ```modal-footer.interface.ts``` respectively. The data property itself adheres to the ModalConfiguration interface stored in the ```modal-configuration.interface.ts```. Note the default footer implementation will automatically close the modal on the secondary button. But it is up to the developer to close the modal on the primary callback.

NOTE: Notice that the callback functions use the ```=>``` to pass the reference to the function. This ensures that it will run in the context of the component in which it is written. ```this.dialog``` will not be accessible if this was not done.

## Interfaces

#### Modal Header
```ts
export interface ModalHeader {
    title?: string;
    closeCallback?: any;
}
```

**title**: The text to be shown in the header
**closeCallback**: The function to be called when the "x" close button is clicked

#### Modal Footer
```ts
export interface ModalFooter {
    alignment?: string;
    disableSecondaryButtonClose?: boolean;
    secondaryButtonVisible?: boolean;
    secondaryButtonLabel?: string;
    secondaryButtonCallback?: any;
    secondaryButtonValidation?: any;
    primaryButtonVisible?: boolean;
    primaryButtonLabel?: string;
    primaryButtonCallback?: any;
    primaryButtonValidation?: any;
    footerVisible?: boolean;
}
```

**alignment**: Alignment of the footer buttons (left, right, center). Default: 'right'

**disableSecondaryButtonClose**: Disables the default functionality to close the modal automatically on the secondary button click. This is done prior to the callback. Default: false

**secondaryButtonVisible**: Controls the visibility of the secondary button. Default: true

**secondaryButtonLabel**: Display text in the secondary button. Default: 'Cancel'

**secondaryButtonCallback**: Click handler assigned to the secondary button

**secondaryButtonValidation**: Validation function used to determine the disabled state of the secondary button. It should return a boolean of true when the button should be enabled. Default: Returns true

**primaryButtonVisible**: Controls the visibility of the primary button. Default: true

**primaryButtonLabel**: Display text in the primary button. Default: 'Submit'

**primaryButtonCallback**: Click handler assigned to the primary button. Default implementation passed the ```payload``` as the first argument and the modal ```config``` as the second argument

**primaryButtonValidation**: Validation function used to determine the disabled state of the primary button. It should return a boolean of true when the button should be enabled. Default: Returns true. Default implementation passed the ```payload``` as the first argument

**footerVisible**: Hides the footer template completely. Default: true


# Angular CLI Documentation

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
