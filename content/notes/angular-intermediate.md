---
title: Intermediate Angular: Signals & Dependency Injection | Frontend Masters (WIP)
description: by Alex Okrushko
publishDate: 2026-08-15
course: angular
order: 3
---


# Intermediate Angular


## Quick Reference

### Angular Signals

```ts
input()
input.required()
output()
signal()
model()
computed()
linkedSignal()
```

Mental models:

```text
input()        → data from parent
output()       → event to parent
signal()       → writable reactive state
model()        → two-way bindable signal
computed()     → read-only derived state
linkedSignal() → writable derived/local state
```




## Introduction

Course repository:

https://github.com/alex-okrushko/devfest-manager.git

Clone it:

```bash
git clone https://github.com/alex-okrushko/devfest-manager.git
```

Course structure:

- `d1`: Intermediate Angular
- `d2`: Advanced Angular

The project uses JSON Server as a lightweight backend during development.

---

## Input & Output Signals

Angular supports signal-based component inputs and outputs.

### Optional input

```ts
name = input<string>();
```

Read it in the template:

```html
{{ name() }}
```

Because an input signal is a signal, its value is read by calling it as a function.

### Required input

```ts
name = input.required<string>();
```

The parent must provide a value.

Example parent template:

```html
<app-child [name]="userName" />
```

---

## Output Signals

Create an output:

```ts
updated = output<string>();
```

Emit an event:

```ts
this.updated.emit("Updated");
```

Handle it in the parent:

```html
<app-child
  (updated)="updateParent($event)"
/>
```

Here:

```text
$event
```

contains the value emitted by the child.

---

## Two-Way Writable Signals

A normal signal created with `signal()` is writable:

```ts
text = signal("Angular");
```

A child component can expose a model signal:

```ts
name = model<string>();
```

The parent can then use two-way binding:

```html
<app-child [(name)]="text" />
```

Conceptually:

```text
Parent text signal
      ⇅
Child name model
```

Changes can flow in both directions.

---

## `computed()`

`computed()` creates derived state.

Example:

```ts
fullName = computed(() => {
  return `${this.firstName()} ${this.lastName()}`;
});
```

A computed signal:

- Derives its value from other signals.
- Automatically reevaluates when dependencies change.
- Is read-only.
- Cannot normally be set directly.

Mental model:

```text
source state
   ↓
computed(...)
   ↓
derived read-only state
```

---

## `linkedSignal()`

`linkedSignal()` creates writable state whose value is derived from another reactive source.

It is useful when you need:

1. An initial or reset value based on another signal.
2. The ability to modify the derived value locally.

Mental model:

```text
source signal
      ↓
 linkedSignal
      ↓
local writable state
```

If the source changes, the linked signal can reevaluate its linked computation.

Unlike `computed()`, a linked signal can also be updated locally.

Example:

```ts
initialLike = input(false);

isFavorite = linkedSignal(() => this.initialLike());
```

Local update:

```ts
toggleFavorite() {
  this.isFavorite.update(value => !value);
}
```

`update()` receives the current signal value and returns the next value.

---

## Passing Data from Parent to Child

Example child input:

```ts
title = input.required<string>();
```

Optional input with a default value:

```ts
subtitle = input<string>("Default Value");
```

Use inputs in the child template:

```html
<h2>{{ title() }}</h2>
<p>{{ subtitle() }}</p>
```

Pass data from the parent:

```html
<app-event-card
  [title]="event.title"
  [subtitle]="event.subtitle"
/>
```

The course example passes data from an event list component into an event card component.

Relevant project path:

```text
/src/app/features/events/event-list.ts
```

Course notes may also be available under:

```text
/instructions/day 1 module 1.md
```

---

## Derived & Computed State

Example:

```ts
daysUntil = computed(() => {
  // calculate difference
  return diffDays;
});
```

In an Angular template, `@let` can evaluate an expression once for that template context and assign it to a local variable:

```html
@let days = daysUntil();

<p>{{ days }}</p>
```

This can make templates cleaner when the same expression is used repeatedly.

---

## Mutable Derived State with `linkedSignal`

Example:

```ts
initialLike = input(false);

isFavorite = linkedSignal(() => this.initialLike());
```

Toggle locally:

```ts
toggleFavorite() {
  this.isFavorite.update(value => !value);
}
```

Template:

```html
<button (click)="toggleFavorite()">
  {{ isFavorite() ? "Unlike" : "Like" }}
</button>
```

### `computed` vs. `linkedSignal`

| Feature | `computed()` | `linkedSignal()` |
|---|---:|---:|
| Derived from signals | Yes | Yes |
| Automatically reactive | Yes | Yes |
| Writable locally | No | Yes |
| Good for pure derived state | Yes | No |
| Good for mutable derived state | No | Yes |

---

## Output Events

Create an output:

```ts
delete = output<void>();
```

Emit it:

```ts
removeEvent() {
  this.delete.emit();
}
```

Parent:

```html
<app-event-card
  (delete)="removeEvent(event.id)"
/>
```

Outputs are the standard way for a child component to notify its parent that something happened.

---

## Formatting Output with Pipes

Angular pipes transform values for display inside templates.

Examples:

```html
{{ eventDate | date }}
{{ price | currency }}
{{ title | uppercase }}
```

Pipes are particularly useful for presentation formatting because they keep display transformations out of the component's core business logic.

---



frontend master notes: 

# Intermediate Angular: Signals & Dependency Injection | Frontend Masters

### Introduction

**Introduction**

[00:00:20](https://master.dev/courses/intermediate-angular/introduction?t=20)
Check out our [Angular Fundamentals course](https://master.dev/courses/angular-fundamentals/) from Mark Techson

[00:01:47](https://master.dev/courses/intermediate-angular/introduction?t=107)
Here's a link to [NgRx](https://ngrx.io/)

[00:02:17](https://master.dev/courses/intermediate-angular/introduction?t=137)
Here's a link to the [Advanced Angular course](https://master.dev/courses/advanced-angular)

[00:02:43](https://master.dev/courses/intermediate-angular/introduction?t=163)
Links to these requirements are [in the project repo](https://github.com/alex-okrushko/devfest-manager)

[00:03:37](https://master.dev/courses/intermediate-angular/introduction?t=217)
Check out our [Angular Fundamentals course](https://master.dev/courses/angular-fundamentals/) from Mark Techson

[00:05:12](https://master.dev/courses/intermediate-angular/introduction?t=312)
Here's a link to [the project repo](https://github.com/alex-okrushko/devfest-manager)

[00:06:05](https://master.dev/courses/intermediate-angular/introduction?t=365)
`git clone https://github.com/alex-okrushko/devfest-manager.git`

[00:06:12](https://master.dev/courses/intermediate-angular/introduction?t=372)
git clone https://github.com/alex-okrushko/devfest-manager.git


d1 is our Intermediate Angular course and d2 is our Advanced Angular course
json server as backend

[00:06:31](https://master.dev/courses/intermediate-angular/introduction?t=391)
`d1` is our Intermediate Angular course and `d2` is our Advanced Angular course

**Project Tour**

[00:02:46](https://master.dev/courses/intermediate-angular/project-tour?t=166)
Here's a link to our [Tailwind CSS course](https://master.dev/courses/tailwind-css-v2/)

[00:04:15](https://master.dev/courses/intermediate-angular/project-tour?t=255)
`day 1` is this course and `day 2` is our Advanced Angular course

### Signals

**Input & Output Signals**

[00:00:01](https://master.dev/courses/intermediate-angular/input-output-signals?t=1)
signal -> 
varName = input<string>() 
varRequiredName = input.required<string>() 

in html: {{varName()}}


how to sent: 
out = output<string>()
....
this.out.emit('Updated')


in the parent (out)="updateParent($event)"

**Two-Way Writable Signals**

[00:00:01](https://master.dev/courses/intermediate-angular/two-way-writable-signals?t=1)
signal is a writableSignal  by default

in parent: 
text = signal ('Angular')


in child : 
name = model<string>() 2 way binding with parent 


[(name)] = 'text'

**Linked Signals**

[00:05:30](https://master.dev/courses/intermediate-angular/linked-signals?t=330)
computed() -> pure derivation of state. (cannot be set )

linkedSignal () -> still linked to the parent, if the parent updates , will reevaluate this expression
linked signal is interanl state, tha tis tied to another signal o set of signals and will re update.  .update function updates only that specific state

### Component Models

**Passing Data from Parent to Child**

[00:00:14](https://master.dev/courses/intermediate-angular/passing-data-from-parent-to-child?t=14)
Instructions for running the project are [in the repo](https://github.com/alex-okrushko/devfest-manager)

[00:00:37](https://master.dev/courses/intermediate-angular/passing-data-from-parent-to-child?t=37)
Open `/src/app/featurse/events/event-list.ts` to code along with Alex

[00:01:17](https://master.dev/courses/intermediate-angular/passing-data-from-parent-to-child?t=77)
Notes for this section can be found in the `/instructions/day 1 module 1.md` file

[00:08:22](https://master.dev/courses/intermediate-angular/passing-data-from-parent-to-child?t=502)
passing data from parent to child: 
from the event list component to the event card itself. 

Open /src/app/featurse/events/event-list.ts to code along with AleNotes for this section can be found in the /instructions/day 1 module 1.md filevariable = input.required<string>();readonly variable2 = ...defaultValue = input<string>('default Value');in html : {{ variable() }}from the parent: in html

**Derived & Computed State**

[00:05:06](https://master.dev/courses/intermediate-angular/derived-computed-state?t=306)
derived state

daysUntil = computed ( () => {
 ...
  return diffDays
})

use let directive: read the value once from daysUntil and put it into a specific const 
in html: 
@let days = daysUntil();

**Mutable Derived State with linkedSignal**

[00:04:53](https://master.dev/courses/intermediate-angular/mutable-derived-state-with-linkedsignal?t=293)
linked signal: A linked signal is used to create a signal that can receive an initial value from a parent component but can also be modified locally within the component. It links the signal to an input value, allowing the component to maintain local state while optionally accepting external updates.

initialLike = input(false)
isFavorite = linkedSignal(() => this.initialLike())

toggleFavorite(){
  this.isFavorite.update(val => !val);
}

in html: 
{{  isFavorite() ? '' : '' }}

The update method on a signal reads the current value and allows you to transform it. For example, to toggle a boolean signal, you would use signal.update(value => !value) to inverse the current value.

**Format Output with Pipes**

[00:09:35](https://master.dev/courses/intermediate-angular/format-output-with-pipes?t=575)
delete = output();

removeEvent() {
  this.delete.emit()
}


add in the parent :
(delete)="..."


concept: aliasis -> use functions like console.log in the html templates

**Two-Way Data Binding**

[00:00:28](https://master.dev/courses/intermediate-angular/two-way-data-binding?t=28)
Open `/src/app/featurse/events/search-bar.ts` to code along with Alex

**Angular Dev Tools**

[00:00:17](https://master.dev/courses/intermediate-angular/angular-dev-tools?t=17)
Here's a link to the [Angular Dev Tools Extension](https://chromewebstore.google.com/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

[00:04:57](https://master.dev/courses/intermediate-angular/angular-dev-tools?t=297)
Here's a link to [NgRx](https://ngrx.io/)

### Declarative Data Fetching

**Create a Data Service**

[00:00:25](https://master.dev/courses/intermediate-angular/create-a-data-service?t=25)
The notes for this section are in the `instructions/day 1 module 2.md` file

**Handling deleteEvent Mutations**

[00:12:33](https://master.dev/courses/intermediate-angular/handling-deleteevent-mutations?t=753)
Learn more about Rx.js in our [Rx.js Fundamentals course](https://master.dev/courses/rx-js/)

### Modern Routing

**Route Configuration & Input Binding**

[00:00:11](https://master.dev/courses/intermediate-angular/route-configuration-input-binding?t=11)
The notes for this section are in the `instructions/day 1 module 3.md` file

**Event Details Component**

[00:00:22](https://master.dev/courses/intermediate-angular/event-details-component?t=22)
You can also copy the code from the `instructions/day 1 module 3.md` file

### The Signal Forms API

**Create a Form Model**

[00:01:37](https://master.dev/courses/intermediate-angular/create-a-form-model?t=97)
There's already been an API change! The `[field]` directive is now `[FormField]`

[00:01:45](https://master.dev/courses/intermediate-angular/create-a-form-model?t=105)
Check out our [Angular Fundamentals course](https://master.dev/courses/angular-fundamentals/) from Mark Techson

[00:02:39](https://master.dev/courses/intermediate-angular/create-a-form-model?t=159)
The notes for this section are in the `instructions/day 1 module 4.md` file and have the updated API

[00:03:18](https://master.dev/courses/intermediate-angular/create-a-form-model?t=198)
Note: The course notes have been updated with the new `FormField` API so check your code with what's in the notes

[00:03:21](https://master.dev/courses/intermediate-angular/create-a-form-model?t=201)
🚨This is now `[formfield]`. Follow what is [in the notes](https://github.com/alex-okrushko/devfest-manager/blob/main/src/app/features/admin/create-event.ts#L23)

**Form Schema & Field Binding**

[00:03:36](https://master.dev/courses/intermediate-angular/form-schema-field-binding?t=216)
This should be `imports: [FormField]`

**Form Validation**

[00:06:22](https://master.dev/courses/intermediate-angular/form-validation?t=382)
Here's a link to the [signal forms docs](https://angular.dev/essentials/signal-forms#validation-and-state)

**Dynamic Arrays**

[00:00:49](https://master.dev/courses/intermediate-angular/dynamic-arrays?t=49)
You can copy the code from the `instructions/day 1 module 4.md` file

**Handling Form Submission**

[00:09:19](https://master.dev/courses/intermediate-angular/handling-form-submission?t=559)
Here's a link to the [Advanced Angular course](https://master.dev/courses/advanced-angular)

### Shared State & Dependency Injection

**Injection Tokens & Factories**

[00:01:07](https://master.dev/courses/intermediate-angular/injection-tokens-factories?t=67)
If you are stuck or need to catch up: `git checkout d1m5`

[00:02:09](https://master.dev/courses/intermediate-angular/injection-tokens-factories?t=129)
The notes for this section are in the `instructions/day 1 module 5.md` file

### Wrapping Up

**Wrapping Up**

[00:03:11](https://master.dev/courses/intermediate-angular/wrapping-up?t=191)
Here's a link to the [Advanced Angular course](https://master.dev/courses/advanced-angular)
