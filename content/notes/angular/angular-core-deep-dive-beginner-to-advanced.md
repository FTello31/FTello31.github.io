---
title: Angular Core Deep Dive - Beginner to Advanced (Angular 20)
description: Practical notes from Angular fundamentals.
publishDate: 2026-08-08
course: angular
order: 1
---


Finished: No
Status: Doing

Let's now quickly summarize what we have learned about the different dependency injection decorators.

Probably the most important thing to bear in mind about this functionality is that it's rarely needed.

Most of the times we want to inject our dependencies as application wide singletons.

We don't use providers here at the level of the component and we simply have services that are injected

using the tree shakable provider syntax.

So this is the most common scenario.

If by some reason we need to get injected in a component, a service that was created at the level of

the component itself, we can do that with the self decorator.

The self decorator will ensure that we are not getting any service from up the component tree.

On the other hand, if we want to make sure that we do get an instance of a service from further up

the application tree and.

Not from the local component.

We have the skip self decorator.

If by some reason we have a directive that needs to grab dependencies created by its host component,

we can do so using the host decorator.

[Angular Core Deep Dive - Beginner to Advanced (Angular 16)](https://globant.udemy.com/course/angular-course/)

[Angular University](https://github.com/angular-university)

# Section 1: Introduction

# **The Typescript Jumpstart Ebook**

Hello everyone,

This course will be in the **Typescript language**, which is closely related to other languages that you are *likely already familiar with*.

But it that is not the case, we have here a **E-Book aimed at getting you started quickly with the language**, so that you can focus on the Advanced Angular features presented during the course.

Before starting setting up your development environment, please take a moment to download the **Typescript Jumpstart Ebook**, that is available together with this video course:

[Typescript_Jumpstart_Book_Udemy.pdf](Angular%20Core%20Deep%20Dive%20-%20Beginner%20to%20Advanced%20(Ang/Typescript_Jumpstart_Book_Udemy.pdf)

This book covers the *Typescript Type System* and the multiples *Type Definitions,* which are the most unique parts of the language that are a bit different from other closely related languages.

Note: This is **not** required reading before continuing the video course.

This book is in the PDF format and the **code is fully in text and not in images**, so everything is searchable. This format is ideal for taking it to work and using it during your daily development,  please enjoy.

**This Book In a Nutshell**

This book is aimed at developers that want to get a *deeper understanding of Typescript*. If you have been trying to learn or use Typescript and would now like to go deeper into the language and learn how to make the most of its **powerful type system**, then this book is for you.

**What is the core value proposition of this book?**

Sit down in *one evening* with this book, and learn the **key aspects** of the language and its type system that might take months of experience and long stackoverflow sessions to gather the hard way.

Become a lot more comfortable using Typescript on a daily basis, learn quickly the fundamentals of the language so that you can focus on other things in your project.

**Why a Fast-track Guide to Typescript?**

Typescript combines many of the best features of **statically-typed** languages, together with some of the best features of **dynamically-typed** languages.

So this means that if you already know one of the following: Javascript /ES6, Java, C#, Ruby Python, you will notice many *overlapping features.* So you already know a lot about Typescript, and only really need to learn **what is unique about it.**

**A Deceivingly Familiar Language!**

Many times developers can just jump right into the language without any formal training, because the **language looks so familiar**. And this is very often the case in the Angular Ecosystem for example, where we often just start using the language straight away.

But you might notice that some things just don't work as expected: for example, compiler error messages show up for something that apparently should just work.

The problem is that the Typescript type system **works in a very different way** than the type systems of the most popular statically typed languages, and there are good reasons for that.

The familiarity with other languages is a great feature, but that **familiarity alone might not be enough** for a comfortable development experience.

To get the most out of Typescript, we really need to take a moment to **dive deeper into its type system**, and that is what this book is specifically about.

**I'm a Javascript Developer, is this book for me?**

If you are afraid that using Typescript means a lot of ceremony and verbosity for just a bit of tooling, in this book you will learn that we can actually have the **best of both worlds in Typescript**:

we can write very concise code with almost no type annotations, but still benefit from all the tooling like auto-completion and refactoring working out-of-the-box.

**Table Of Contents**

Have a look at the table of contents below, to give you an idea about the book:

- Section 1 - Introduction
- Section 2 - The Typescript Type System
- A Simple Example - Why Doesn't This Work?
- Key Concept 1 - Type Inference
- Key Concept 2
- Structural SubTyping - How are types defined?
- Key Concept 3 - Type Compatibility Section
- Section 3 - Typescript Type Definition
- What are the multiple scenarios for Typescript Type Definitions?
- How do I use libraries that don't have Type Definitions available?
- How does the Any Type work?
- What is the relation between Type Definitions and Npm?
- Do we really need type annotations to get type-safety?
- Why Type safety does not mean more ceremony?
- The biggest advantage of Typescript
- How to make the most of Typescript Type Definitions
- What is @types, when should I use it and why?
- What happened to the typings executable and DefinitivelyTyped ?
- What are compiler opt-in types, when should I use them and why?
- Why do I sometimes get this 'duplicate type definition' error?
- Handling the gap between libraries and the compiler
- Guidelines for Using the multiple Type Definitions available
- How to make sure our programs leverage type safety effectively?
- Section 4 - Conclusions
- Final Thoughts
- Bonus Content - Typescript Video List
- Bonus Content - Free Angular For Beginners Course

Any questions or feedback about the book?

If you have **any questions about the book** or would like to send me some **feedback** on it, please send me a Direct Message using the Udemy application.

I hope you will enjoy this book!

Kind Regards,

Vasco

# Section 2: Angular Components, Core Directives and Pipes

ng-container

pipes 

for collections

i the DOM

```jsx
<div *ngFor="let pair of courses | keyvalue">
	{{pair.key + ": " + pair.value}}
</div>

<div *ngFor="let pair of courses | slices:0:2">
	//it would appear just 0 and 1 objects
</div>
```

# Section 3: Angular Local Template Querying In Depth

Template Query

viewChild → get a reference to a child component. is a local template query mechanism (you cant go deep to its children)

```jsx
@ViewChild(CourseComponent)
card: CourseComponent

//in html add template reference #cardRef to the element to reference the instance
@ViewChild('cardRef')
card: CourseComponent

//if carRef is set to a plain DOM it will reference the html, but if it is set  to a component in the html dom, it would reference the instance of the component
//to reference the html element of the component in your html:
@ViewChild('cardRef', {read: ElementRef})
card: ElementRef
```

lifecycle hook AfterViewInit is the earliest possible moment where all references are available 

viewChildren

```jsx
@ViewChildren(CourseComponent);
cards: QueryList<CourseComponent>;

@ViewChildren(CourseComponent, {read:ElementRef});
cards: QueryList<ElementRef>;

```

# Section 4: Angular Content Projection In Depth

Content projection

ng-content

```jsx
//parent

<div *ngIf="courses[0] as course">
	<course-card (courseSelected)="" [course]="course">
			<div class="a">
				<img width="300" alt="Angular" [src]=""course.iconURL>
				<h5> Total courses: 5 </h5>
			</div>
	</course-card>
</div>

```

```jsx
// child
.
.
.
<ng-content> </ng-content>
.
.
.
//if you want to project just 1 thing:
<ng-content select="img"> </ng-content>
```

AfterContentInit is the earliest time we can play with those values

contentChild

```jsx
// solo se usa @ContentChild cuando se usa content projection y se quiere hacer referencia a y solo se restringe a lo que esta adento del ng-content

//html
<div *ngIf="courses[0] as course">
	<course-card (courseSelected)="" [course]="course">
			<div class="a" #courseImage>
				<img width="300" alt="Angular" [src]=""course.iconURL>
				<h5> Total courses: 5 </h5>
			</div>
	</course-card>
</div>

//ts del course-card (del hijo)
@ContentChild('courseImage')
image;
```

contentChildren

```jsx
@ContentChildren(CourseImageComponent)
images: QueryList<CourseImageComponent>;

@ContentChildren(CourseImageComponent, {read:ElementRef});
images: QueryList<ElementRef>;

```

# Section 5: Angular Templates In Depth

[https://github.com/angular-university/angular-course/tree/1-components-finished](https://github.com/angular-university/angular-course/tree/1-components-finished)

ng-template core directive

is going to be use only if we explicitly use it

```jsx
<ng-content select="course-image"
                *ngIf="course.iconUrl; else noImage"></ng-content>

    <ng-template #noImage>
			
				<p> course </p>
    </ng-template>
```

ngTemplateOutlet

```jsx
    <ng-template #noImageTpl let-courseName="**description**">
				<p> {{courseName}} </p>

      

    </ng-template>

  <ng-container *ngTemplateOutlet="noImageTpl;context: {**description**:course.description}">

        </ng-container>
```

# Section 6: Angular Directives In Depth

[https://github.com/angular-university/angular-course/tree/2-directives-finished](https://github.com/angular-university/angular-course/tree/2-directives-finished)

components are directives with a template

directives: 

structural

ngIf

ngFor

ngSwitch

attribute directives:

ng g directive directives/highlighted

hostbinding decorator

```jsx
@HostBinding('className')
get cssClasses(){
	return "highlighted"
}

@HostBinding('class.highlighted')
get cssClasses(){
	return true
}
```

HostListener

```jsx
@HostListener('mouseover', ['$event'])
    mouseOver($event) {
        this.isHighlighted = true;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    @HostListener('mouseleave')
    mouseLeave() {
        this.isHighlighted = false;
        this.toggleHighlight.emit(this.isHighlighted);
    }
```

exportAs

structural directives

ng g directive directives/ngx-unless

# Section 7: Angular View Encapsulation In Depth

ViewEncapsulation → feature, styles are being encapsulated 

:host selector target the host element  

```jsx

//in parent to reference the component:
course-card {
	  display: block;
}

//when we move it to the child itself:
//to reference the component itself
:host {
    display: block;
}

:host.is-first {
    border-top: 2px solid grey;
    padding-top: 20px;
}
```

```jsx
//style elements that were provided via content projection
::ng-deep //modifier

// allow us to style our compoment depending on the presence of css styles
// outside the commponent itself
:host-context(.CSSclass) //modifier
```

```jsx
// view encapsulation options

ViewEncapsulation.Emulated -> default value
ViewEncapsulation.None -> use plain css
ViewEncapsulation.Native -> deprecated
ViewEncapsulation.ShadowDOM -> similar to Emulated. but using browser native reserve words
```

# Section 8: Angular Injectable Services In Depth

3-services branch.

to instantiate a component, angular is going invoke the constructor and pass the multiple dependencies, then call the ngOnInit 

```jsx
//async pipe
courses$: Observable<Courses[]>

this.courses$ = this.http.get<Courses[]>('api/courses', {params});

// in the html
use (courses$ | async)

```

creating custom services

 

```jsx
ng g service services/courses

```

dependency injections: the class does not created the dependency, it gets it injected via the constructor

```jsx
//create a own custom provider

funciton coursesServiceProvider (http:HttpClient): CoursesService {
 return new Courses Service (http);
}

//Injection token - UNIQUE
export const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE')

//in the
@Component({
	selector: ...,
	providers:[
		{ provide: COURSES_SERVICE, 
			useFactory: coursesServiceProvider,
			deps: [HttpClient]
		 }
	]
	
})

...
constructor(@Inject(COURSES_SERVICE) private coursesService: CoursesService
```

# Section 9: Angular Dependency Injection In Depth

hierarchical dependency injection

```jsx
// hierarchy list of components 

when 
providers:[
		{ CoursesService }
	]
<course-card *ngFor="let course of courses" ... >

for each of the course card, has a provider property. so 
Whenever a dependency is needed in a given component, 
the component is going to go through its providers and it's
 going to try to find a provider that provides the corresponding 
 dependency.
 
 
 
 when there is not a provider  providers:[
		{ CoursesService }
	]
	
It did not find a provider that would satisfy that dependency, 
so it moved on to its parent component,
in this case, the application component, to see if there would be 
a provider that would satisfy the dependency.
 
 
So that is why this is called a hierarchical dependency 
injection system.

It's because there is a hierarchy of injectors that 
follows the hierarchy of the components themselves.

So child components like the course card component will 
ask the parent components for their dependencies
```

 tree shakeable providers 

```jsx
// in the service:
@Injectable ({
		providedIn: 'root'	
})

The question here is when should we use the tree shakeable 
syntax when compared here to the syntax using the providers property?

Well, if our service does not have any state and it's an 
application wide singleton such as for example

the courses service, then we should always use the tree shakable 
provider syntax that we see here.

We should only use the provider syntax if our service has some 
state that is specific to the component

that we only want to have visible at the level of the component 
for singletons.

In general, we should always prefer the tree shakeable syntax 
because it results in smaller application bundles and better 
runtime performance.
```

Especial Decorators

optional decorator

```jsx
//take the provider from itself
@Self()

//take the provider from the parent, and not for itself 
@SkipSelf

If we want to make sure that we receive dependencies that are created locally 
at the level of the component, we should use the self decorator.

If, on the other hand, we want to make sure that we don't receive 
dependencies created locally, but instead we always get them from 
parent components.

Then in that case we should use the skip self decorator.

This dependency injection decorators should only be rarely needed 
because in most cases the default behavior of the dependency injection 
system is exactly what we need.
```

```jsx

@Host()

So in order for the highlighted directive to receive a service that comes 
from its host element, we can use the angular host decorator.

This is going to ensure that the dependency that gets injected here is 
coming from the host element onto which we are applying the directive 
and not from higher up the dependency injection hierarchy.
```

summary

Let's now quickly summarize what we have learned about the different dependency injection decorators.

Probably the most important thing to bear in mind about this functionality is that it's rarely needed.

Most of the times we want to inject our dependencies as application wide singletons.

We don't use providers here at the level of the component and we simply have services that are injected using the tree shakable provider syntax.

So this is the most common scenario.

If by some reason we need to get injected in a component, a service that was created at the level of the component itself, we can do that with the self decorator.

The self decorator will ensure that we are not getting any service from up the component tree.

On the other hand, if we want to make sure that we do get an instance of a service from further up the application tree and.

Not from the local component.

We have the skip self decorator.

If by some reason we have a directive that needs to grab dependencies created by its host component, we can do so using the host decorator.

# Section 10: Angular Change Detection In Depth

standard change detection 

change detection is a built in mechanism, that automatically rebuild the view whenever the model gets changed

angular is going to see all the inputs of the template, and decide if something has changed. 

if something has changed, the view needs to be updated 

---

on push change detection:

```jsx
@component({
	selector: ...
	
	changeDetection: ChangeDetectionStategy.OnPush

})

```

si un componente padre modifica una porpiedad de un objeto que se pasa al hijo, este no se renderea de nuevo. 

pero si el objeto cambia (el objeto en si) este si refleja el cambio. 

es decir le proveemos a complete different object, ahi si se refleja el cambio

Mira los @Input dentro y mira si ha cambiado ‘

tambien va a mirar si algun valor fue emitido, como un observable cuando trae data. es decir funciona bien con async pipe

attribute decorator

se pueden pasar inputs sin [ ] a los omponentes hijos, pero estos tiene que ser valores qu eno van a cambiar. 

y en el hijo , en el constructor se agrega un @Atribute(’variable’) private variable: string

---

custom changedetection

```jsx
@component({
	selector: ...
	
	changeDetection: ChangeDetectionStategy.OnPush

})

contructor(private cd:ChangeDetectorRef){...

//you can mark when you want to evaluate the html and place new data

// when you are using custom change detection you should use the hook 
ngDocheck(){

	this.cd.markForCheck()
}
 
```

# Section 11: Angular Lifecycle Hooks In Depth

# Section 12: Angular Modules in Depth

# Section 13: Angular Pipes In Depth

# Section 14: Angular Internationalization (i18n) In Depth

# Section 15: Angular Elements In Depth

# Section 16: Angular Standalone Components

# Section 17: Angular 17 @defer - Partial Template Loading

# Section 18: Angular 17 Signals In Depth

# Section 19: Conclusion & Bonus