---
title: Complete Go for Professional Developers | Frontend Masters (WIP)
description: by Melkey.
publishDate: 2026-08-15
---

Course: https://github.com/Melkeydev/fem-project-live 


# Go Course Notes

## Loops

Go does not have a `while` keyword.

Use a `for` loop with a condition:

```go
counter := 0

for counter < 3 {
    counter++
}
```

Infinite loop:

```go
for {
    // ...
    break
}
```

---

## Functions

### Simulating enums with `iota`

Go does not have traditional enums, but `iota` can be used to create enum-like constants.

Reference: https://go.dev/wiki/Iota

Example:

```go
type Status int

const (
    Pending Status = iota
    Active
    Completed
)
```

### Exported vs. unexported functions

There is no `public` keyword in Go.

To make a function accessible from another package, capitalize its first letter.

```go
func add(a, b int) int {
    return a + b
}
```

`add` is **not exported**.

```go
func Add(a, b int) int {
    return a + b
}
```

`Add` **is exported**.

### Multiple return values

```go
func calculateSumAndProduct(a, b int) (int, int) {
    return a + b, a * b
}

sum, product := calculateSumAndProduct(10, 10)
```

---

## Slices

Arrays are more memory-efficient when you know the exact size in advance.

If your data can grow or change in size, use **slices**.

Slices are similar to dynamic arrays. A slice can represent part of an array or the entire array.

```go
numbers := [5]int{10, 20, 30, 40, 50}

allNumbers := numbers[:]
firstThree := numbers[0:3]
```

Creating a slice directly:

```go
fruits := []string{"apple", "banana", "strawberry"}
```

Appending an item:

```go
fruits = append(fruits, "kiwi")
```

When appending to a slice, Go reuses the underlying array while there is enough capacity. If the capacity is exceeded, Go allocates a larger underlying array and copies the values.

---

## Variables & Basic Types

Short variable declaration:

```go
age := 27
```

This follows the pattern:

```text
variable := value
```

The compiler infers the type.

### Formatting

Go provides `gofmt` for automatic source-code formatting:

https://pkg.go.dev/cmd/gofmt

### Zero values

Variables declared without an explicit value receive a zero value.

| Type | Zero value |
|---|---|
| `int` | `0` |
| `float` | `0.0` |
| `string` | `""` |
| `bool` | `false` |
| pointer | `nil` |

---

## Writing Your First `main.go`

Run a Go program:

```bash
go run main.go
```

Build a binary:

```bash
go build -o main main.go
```

This generates an executable binary file.

---

## Arrays

Example:

```go
numbers := [5]int{10, 20, 30, 40, 50}
```

An array has a fixed length. In this example, the compiler expects exactly five elements.

### Matrices / multidimensional arrays

```go
matrix := [2][3]int{
    {1, 2, 3},
    {4, 5, 6},
}
```

---

## Pointers & Struct Methods

In Go, values are generally passed **by value**.

That means a function receives a copy of the value, so modifying the parameter does not modify the original variable.

Example:

```go
func changeAge(age int) {
    age = 30
}
```

The original value outside the function is unchanged.

### Using pointers

Use `*` in the parameter type to accept a pointer.

Use `&` to obtain the address of a variable.

```go
func changeAge(age *int) {
    *age = 30
}

func main() {
    age := 25
    changeAge(&age)
}
```

`&age` returns the memory address of `age`.

`*age` dereferences the pointer and accesses the value stored at that address.

When a pointer is passed, the function can modify the original value.

---

## Maps

Maps are Go's hash-map data structure.

```go
capitalCities := map[string]string{
    "USA": "Washington D.C.",
}
```

Reading a value and checking whether the key exists:

```go
capital, exists := capitalCities["Germany"]

if exists {
    // key exists
} else {
    // key does not exist
}
```

Deleting a key:

```go
delete(capitalCities, "Germany")
```

---

## Structs

Structs are custom data types used to group related data and pass it around an application.

```go
type Person struct {
    Name string
    Age  int
}

func main() {
    person := Person{
        Name: "John",
        Age:  25,
    }

    fmt.Printf("This is our person: %+v\n", person)
}
```

`%+v` includes the struct field names when printing.

### Anonymous structs

Useful for small temporary values and tests:

```go
employee := struct {
    name string
    id   int
}{
    name: "Alice",
    id:   123,
}
```

### Nested structs

```go
type Address struct {
    Street string
    City   string
}

type Contact struct {
    Name    string
    Address Address
    Phone   string
}
```

Example:

```go
contact := Contact{
    Name: "Marc",
    Address: Address{
        Street: "123 Example Street",
    },
}
```

Fields can be omitted because Go assigns their zero values automatically.

> In Go, values are passed by value unless you explicitly use pointers or another reference-like type.

---

## Role-Playing Game Exercise

A function can become a method by adding a receiver.

```go
type Person struct {
    Name string
    Age  int
}

func (person *Person) modifyPersonName(name string) {
    person.Name = name
}

func (person *Person) ModifyPersonAge(age int) {
    person.Age = age
}
```

Methods and fields beginning with a capital letter are **exported** and can be accessed from other packages.

Methods and fields beginning with a lowercase letter are **unexported** and are only accessible within the same package.

### When should you use pointers?

Consider pointers when:

- You need to modify the original value.
- You want changes to persist outside the function.
- You are passing large structs and want to avoid copying them repeatedly.
- Multiple functions need to work with the same mutable object.

---

# Building the Go Project

## Creating the Go Project

Initialize a Go module:

```bash
go mod init github.com/YOUR_USER_NAME/femProject
```

`go.mod` is roughly comparable to `package.json` in JavaScript projects. It defines the module name and dependencies.

Create `main.go`:

```bash
touch main.go
```

Basic file:

```go
package main

func main() {
}
```

Keep `main.go` as small and simple as possible.

Recommended project-layout reference:

https://go.dev/doc/modules/layout

### Packages and folders

Folders in Go normally correspond to packages.

Example:

```text
internal/
├── app/
│   └── app.go
└── routes/
    └── routes.go
```

To import an internal package:

```go
import "<go.mod-module-name>/internal/app"
```

When deciding whether to create a struct, ask whether the package actually needs persistent state or grouped behavior.

### `panic`

`panic` stops normal program execution and begins unwinding the goroutine stack. If it is not recovered, the application terminates.

It should generally be reserved for unrecoverable situations rather than normal error handling.

---

## Creating an HTTP Server

Example:

```go
server := &http.Server{
    Addr:         ":8080",
    IdleTimeout:  time.Minute,
    ReadTimeout:  10 * time.Second,
    WriteTimeout: 30 * time.Second,
}
```

- `Addr`: address and port used by the server.
- `IdleTimeout`: maximum time to wait for another request when keep-alives are enabled.
- `ReadTimeout`: maximum duration for reading the full request.
- `WriteTimeout`: maximum duration for writing the response.

Start the server:

```go
err := server.ListenAndServe()

if err != nil {
    app.Logger.Fatal(err)
}
```

### HTTP handlers

```go
func HealthCheck(w http.ResponseWriter, r *http.Request) {
    // ...
}
```

Register it:

```go
http.HandleFunc("/health", HealthCheck)
```

`HandleFunc` receives:

1. The route/path.
2. The handler function.

Functions are **first-class citizens** in Go, meaning they can be passed as values.

---

## Chi Router

A handler can also be a method on the application struct:

```go
func (a *Application) HealthCheck(
    w http.ResponseWriter,
    r *http.Request,
) {
    // ...
}
```

The project uses the Chi router:

https://github.com/go-chi/chi

Install it:

```bash
go get -u github.com/go-chi/chi/v5
```

Chi stays close to Go's standard `net/http` APIs while providing routing and middleware support.

Dependencies are recorded in `go.mod` and checksums are stored in `go.sum`.

`go.sum` is somewhat analogous to a lock/checksum file in JavaScript dependency management.

Example route setup:

```go
func SetupRoutes(app *app.Application) *chi.Mux {
    router := chi.NewRouter()

    // routes...

    return router
}
```

Then configure the returned router as the HTTP server's `Handler`.

---

# PostgreSQL

## PostgreSQL Database Docker Container

Project repository:

https://github.com/Melkeydev/fem-project-live

PostgreSQL driver:

https://github.com/jackc/pgx

Install:

```bash
go get github.com/jackc/pgx/v4/stdlib
```

`fmt` documentation:

https://pkg.go.dev/fmt

### Connection pool configuration

Useful settings:

```go
db.SetMaxOpenConns(...)
db.SetMaxIdleConns(...)
db.SetConnMaxIdleTime(...)
```

A `store` package can be used as the database layer.

For example, `store.Open()` creates the database connection.

The application struct can hold it:

```go
type Application struct {
    DB *sql.DB
}
```

In `main.go`:

```go
defer app.DB.Close()
```

`defer` schedules the call to execute when the surrounding function returns.

---

## pgx Driver for PostgreSQL

Use `pgx` as the PostgreSQL driver.

Install:

```bash
go get github.com/jackc/pgx/v4/stdlib
```

Example DSN:

```text
host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable
```

It is a good idea to call:

```go
db.Ping()
```

This verifies that the DSN is valid and the database server is reachable.

Connection pool settings:

```go
db.SetMaxOpenConns(...)
db.SetMaxIdleConns(...)
db.SetConnMaxIdleTime(...)
```

---

## SQL Migrations with Goose

Goose is used to manage database schema migrations.

Repository:

https://github.com/pressly/goose

Install:

```bash
go install github.com/pressly/goose/v3/cmd/goose@latest
```

Check the version:

```bash
goose -version
```

If troubleshooting the installation:

```bash
ls -l ~/go/bin | grep goose
```

Make sure the Go binary directory is in your `PATH`:

```bash
export PATH=$HOME/go/bin:$PATH
```

Migration files can live in a `migrations` folder.

Example:

```text
migrations/
├── fs.go
└── 00001_users.sql
```

The `00001_` prefix ensures migrations run in a deterministic order.

Some projects instead use timestamps:

```text
YYYYMMDDHHMM_migration_name.sql
```

Example migration:

https://github.com/Melkeydev/fem-project-live/blob/main/migrations/00001_users.sql

### Running migrations

Connect to PostgreSQL:

```bash
psql -U postgres -h localhost -p 5432
```

---

# Store Layer

## Defining Data Types in Store

JSON struct tags control how Go struct fields are encoded to and decoded from JSON.

Example:

```go
type Workout struct {
    ID    int    `json:"id"`
    Title string `json:"title"`
}
```

Pointer fields can be useful when you need to distinguish between:

- A field that was not provided.
- A field explicitly provided with its zero value.

Example:

```go
type UpdateWorkoutRequest struct {
    DurationMinutes *int `json:"duration_minutes"`
}
```

If `DurationMinutes == nil`, the client did not provide the field.

To decouple the database implementation from the rest of the application, interact with the database through **interfaces**.

An interface is a collection of method signatures.

---

## CreateWorkout Query

SQL transactions should follow the ACID properties:

- **Atomicity**
- **Consistency**
- **Isolation**
- **Durability**

Reference:

https://frontendmasters.com/courses/sql/transactions/

Example:

```go
query := `
    INSERT INTO workouts (...)
    VALUES ($1, $2, ...)
    RETURNING id
`
```

Execute within a transaction:

```go
err := tx.QueryRow(
    query,
    // parameters corresponding to $1, $2, ...
).Scan(&id)
```

Commit the transaction:

```go
err = tx.Commit()
```

---

## Updating Workouts

Reference implementation:

https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L141

Typical update:

```go
_, err := tx.Exec(query, params...)
```

---

## Getting Workouts By ID

Course notes:

https://github.com/Melkeydev/fem-project-live/blob/main/post_notes.txt

Relevant commit:

https://github.com/Melkeydev/fem-project-live/commit/906b53e39aa4d99507a0fb0e8005f22966746694

Relevant SQL/query examples:

https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L85

```go
row := db.QueryRow(query, params...)

err := row.Scan(
    &workout.ID,
    // ...
)
```

Another reference:

https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L99

---

# API Layer

## CreateWorkout Handler

The workout handler receives a workout store through an interface.

Conceptually:

```go
type WorkoutHandler struct {
    workoutStore WorkoutStore
}
```

This decouples the API layer from the specific database implementation.

Benefits:

- The API does not need to know whether PostgreSQL or another database is being used.
- Database implementations can be swapped more easily.
- Unit testing becomes easier because the store can be mocked.
- Application layers remain less tightly coupled.

Set the response content type:

```go
w.Header().Set("Content-Type", "application/json")
```

Encode the created workout:

```go
json.NewEncoder(w).Encode(createdWorkout)
```

In `app.go`, the store and handler also need to be instantiated:

```go
workoutStore := store.NewPostgresWorkoutStore(pgDB)
workoutHandler := api.NewWorkoutHandler(workoutStore)
```

---

## Handlers for Getting & Updating Workouts

### Why use a pointer-based update request struct?

Pointers make it possible to distinguish between:

- A field that was not sent.
- A field intentionally sent as an empty or zero value.

Example:

```go
type UpdateWorkoutRequest struct {
    Title           *string `json:"title"`
    Description     *string `json:"description"`
    DurationMinutes *int    `json:"duration_minutes"`
    CaloriesBurned  *int    `json:"calories_burned"`
}
```

Because pointer types have `nil` as their zero value:

```go
if request.Title != nil {
    // The client explicitly provided Title.
}
```

This provides more precise server-side validation and partial-update behavior.

### Why use JSON tags?

JSON tags define how JSON keys map to Go struct fields.

```go
Title *string `json:"title"`
```

The client can send:

```json
{
  "title": "Morning Workout"
}
```

and Go can decode it into the corresponding struct field.

---

## Parsing Command-Line Flags

The `flag` package allows command-line options to be parsed when starting the application.

Example:

```go
port := flag.Int("port", 8080, "API server port")

flag.Parse()

fmt.Println(*port)
```

---

# Key Go Concepts

## Values vs. pointers

Go passes function arguments by value.

```go
func updatePerson(person Person) {
    person.Name = "New Name"
}
```

This changes only the local copy.

To modify the original struct:

```go
func updatePerson(person *Person) {
    person.Name = "New Name"
}
```

Call it with:

```go
updatePerson(&person)
```

## Exported identifiers

Capitalized identifiers are exported:

```go
type Person struct{}
func Add() {}
```

Lowercase identifiers are package-private:

```go
type person struct{}
func add() {}
```

## Interfaces for decoupling

Instead of making the API depend directly on PostgreSQL:

```text
API → PostgreSQL implementation
```

depend on an abstraction:

```text
API → Store interface ← PostgreSQL implementation
```

This makes the application easier to test and change.




.......






# Frontend Masters notes: 

# Complete Go for Professional Developers | Frontend Masters

### Introduction

**Introduction**

[00:01:21](https://master.dev/courses/complete-go/introduction?t=81)
Here's a link to [Melkey on Twitch](https://www.twitch.tv/melkey)

[00:01:42](https://master.dev/courses/complete-go/introduction?t=102)
Here's a link to [Melkey on YouTube](https://www.youtube.com/@melkeydev)

[00:02:26](https://master.dev/courses/complete-go/introduction?t=146)
Here's a link to [Go Blueprint](https://github.com/Melkeydev/go-blueprint)

[00:03:50](https://master.dev/courses/complete-go/introduction?t=230)
Here's a link to [Build Go Apps that Scale](https://master.dev/courses/go-aws/)

[00:04:31](https://master.dev/courses/complete-go/introduction?t=271)
You can find links and setup instructions in [the repo](https://github.com/Melkeydev/fem-project-live)

[00:05:04](https://master.dev/courses/complete-go/introduction?t=304)
Check out our [Complete Intro to Containers](https://master.dev/courses/complete-intro-containers-v2/) course to learn more about Docker

### Go Basics

**Installing & Running Go**

[00:00:21](https://master.dev/courses/complete-go/installing-running-go?t=21)
Here's a link to [go.dev](https://go.dev/doc/install)

[00:02:28](https://master.dev/courses/complete-go/installing-running-go?t=148)
Here's a link to [go-blueprint](https://github.com/Melkeydev/go-blueprint)

[00:05:31](https://master.dev/courses/complete-go/installing-running-go?t=331)
We recommend using VS Code :) 

[00:05:56](https://master.dev/courses/complete-go/installing-running-go?t=356)
Here's a link to the [Go VS Code extension](https://marketplace.visualstudio.com/items?itemName=golang.Go)

**Writing Your First main.go**

[00:04:46](https://master.dev/courses/complete-go/writing-your-first-main-go?t=286)
go run main.go
go build -o main main.go -> making a binary file

**Variables & Basic Types**

[00:04:02](https://master.dev/courses/complete-go/variables-basic-types?t=242)
age := 27 
// declare and make the  compiler infer the type for us  -> variable := value

formating when save:
https://pkg.go.dev/cmd/gofmt

// zero values ~ default values
int - float0.0 - string "" bool false

[00:05:26](https://master.dev/courses/complete-go/variables-basic-types?t=326)
See the [gofmt documentation](https://pkg.go.dev/cmd/gofmt) for more information

**Constants & Enums**

[00:03:35](https://master.dev/courses/complete-go/constants-enums?t=215)
Learn more about the [iota identifier](https://go.dev/wiki/Iota)

**Functions**

[00:00:05](https://master.dev/courses/complete-go/functions?t=5)
simulate enums ishhhhh -> https://go.dev/wiki/Iota

[00:00:13](https://master.dev/courses/complete-go/functions?t=13)
functions: 
// There is no public predeccesor. To make the function public, you have to capitalize it. 
//
func nameFunc (argument1 type1,argument2 type2)  typeReturn { } 

func add -> is not exportable 
func Add -> is exportable

multiple results 
func calculateSumAndProduct(a,b int) (int,int){
 return a+b,a*b
}
sum,product := calculateSumAndProduct(10,10)

### Control Structures

**Conditional Statements**

[00:04:14](https://master.dev/courses/complete-go/conditional-statements?t=254)
To have multiple conditions checked see the [fallthrough identifier](https://go.dev/wiki/Switch#fall-through)

**Loops**

[00:00:00](https://master.dev/courses/complete-go/loops?t=0)
there is no while 
use a counter 

for counter< 3 {
  counter++
}

infinite loop 
for {
   ...
   break;
}

**Arrays**

[00:05:43](https://master.dev/courses/complete-go/arrays?t=343)
arrays 
numbers :=[5]int{10,20,30,40,50}
compiler expect 5 spaces on the array (have a capacity of 5)

matriz 
matrix :=[2][3]int{
{1,2,3},
{4,5,6}
}

**Slices**

[00:00:12](https://master.dev/courses/complete-go/slices?t=12)
arrays are more memory efficient

if you know you data could grow use slides:
slides -> "dynamic arrays"
an slide could be a portion of an array or could be the entire array 


allNumbers:=numbers[:]
allNumbers:=numbers[0:3]

fruits := []string{"apple","banana","strawberry"}
fruits.append(fruits, "kiwi")

[00:06:45](https://master.dev/courses/complete-go/slices?t=405)
Note: Melkey didn't add another `fmt.Println()` statement after appending the slice

**Maps**

[00:00:51](https://master.dev/courses/complete-go/maps?t=51)
maps -> are hashmaps

capitalCities := map[string]string{
 "USA": "Washington D.C",
}

capital, exist := capitalCiries["Germany"]
if exist {

} else{ 

} 

delete(capitalCities, "Germany")

**Structs**

[00:01:52](https://master.dev/courses/complete-go/structs?t=112)
structs 
data type can hold data and pass around along the app. 
versatility 

//Person is a type and struct at the same type (custom data type 
type Person struct {
 Name string
 Age int
}


func main () {
 person := Person {Name: "JoHN", Age: 25}
fmt.Printf("This is oyt persons %+v\n", person } //the + is added to add the property names 
}

anonimous struct  (test purposes )
employee := struct {
 name string
 id int
}{ 
name: "alice",
id: 123
}


IN GO , AVLUES ARE PASSED BY VALUE. UNLESS IT IS EXPLICITELY SAID SO


nested structs 

type Address struct { 
 Street stirng 
 City stirng 
}

type Contact struct { 
 Name string 
 Address Address
 Phone string
}
contact :=Contact {
 Name: "Marc",
 Address: Address {
    Street: "123..."
  },
}

we can omit values because of the default values

**Pointers & Struct Methods**

[00:00:11](https://master.dev/courses/complete-go/pointers-struct-methods?t=11)
siempre se envian copias de los valores cuando se pasan por funciones entonces no cambia el objeto origianl si dentro de la funcion cambia el valor

ahora
pointers: con el * en el parametro de la function  y para enviarlo usar &
cuando se usan los pointers, si pasamos el objeto (es decir por referencia -> estmaos enviando la direccion de memoria de esa variable, asi que si cambia el valor, el valor del objeto original si cambia

(To create a pointer to a variable, use the ampersand (&) symbol before the variable name, which returns the memory address of the variable. To dereference and modify the value, use the asterisk (*) symbol before the pointer variable.)

**Role-Playing Game Exercise**

[00:01:14](https://master.dev/courses/complete-go/role-playing-game-exercise?t=74)
// modifyPersonName  is now a method on my person struct type :
func (person *Person) modifyPersonName { 
 }
func (person *Person) ModifyPersonAge { 
 }
(Methods and fields starting with a capital letter are exported and can be accessed from other packages. Methods and fields starting with a lowercase letter are only accessible within the same package.)

When should you consider using pointers instead of passing values in Go?
Consider using pointers when you want to modify the original value across multiple functions, avoid copying large structs, or when you need to persist changes outside a function's scope. A good rule of thumb is to use pointers when passing structs through multiple functions repeatedly.

When appending items to a slice in Go, how does memory allocation work?
Go reuses the underlying array's length and capacity when appending, replacing values without necessarily creating an entirely new data structure, which helps maintain memory efficiency

###  Scaffolding an API Project

**Creating the Go Project**

[00:01:24](https://master.dev/courses/complete-go/creating-the-go-project?t=84)
`go mod init github.com/YOUR_USER_NAME/femProject`

[00:02:37](https://master.dev/courses/complete-go/creating-the-go-project?t=157)
Learn more about [internal packages](https://go.dev/doc/modules/layout)

[00:10:57](https://master.dev/courses/complete-go/creating-the-go-project?t=657)
go mod init github.com/YOUR_USER_NAME/femProject
//go.mod ~ equivalent to package.json for js web dev
touch main.go 

package main 
func main() { }

keep the main go as slim and simple as you can 

https://go.dev/doc/modules/layout

// folders in go -> packages 
internal/ app /app.go: 
how to handle data 
ask yourself if you need a struct. Does this package need a struct. 

/internal/routes/routes.go

to import the intenal packages within you project 
you should import it by using: import("<go.mod module>/package")

panic = self destruction. wipe and close app.

**Creating an HTTP Server**

[00:00:01](https://master.dev/courses/complete-go/creating-an-http-server?t=1)
declare server 
server := &http.Server{
 Addr: "8080", //port
 IdleTimeout: time.Minute, // max amount to wait for the next request when keep-alives are enabled
 ReadTimeout: 10*time.Second, // max duration for reading the entire request including the body
 WriteTimeout: 30 * time.Second,
}

err = server.ListenAndServe()
if err != nil
 app.Logger.Fatal(err)

http handler : 
func HealthCheck(w http.ResponseWriter, r *http.Request)  


in main func 
....
http.HandleFunc("/health", HealthCheck) //2 argumtens : the path of where this function is, and what the function is itself

// functions are firstclass citizens meaning you can pass them as variables

[00:06:04](https://master.dev/courses/complete-go/creating-an-http-server?t=364)
The current code can be found in [the first commit](https://github.com/Melkeydev/fem-project-live/commit/050148ae8ee404d63a854b5f2d009168cdd7ffe7)

**Parsing Command-Line Flags**

[00:04:22](https://master.dev/courses/complete-go/parsing-command-line-flags?t=262)
packages 
flag -> allows us to parse flags to be passed in when calling out function
os

**Chi Router**

[00:01:32](https://master.dev/courses/complete-go/chi-router?t=92)
Here's a link to the [chi package](https://github.com/go-chi/chi)

[00:01:45](https://master.dev/courses/complete-go/chi-router?t=105)
func (a *Application) HealthCheck( ....) -> means that our application struct has now a method called HealthCheck

to reference it 
we can use Chi package (go-chi) https://github.com/go-chi/chi to handle routers (is so close to the standar
go get -u github.com/go-chi/chi/v5

modifies the request pointer from our methods and allows us to inject things and retrieve things from the request to insert our own middleware

it creates a go.sum (package-lock.json similar)

routes.go: func SetupRoutes(app *app.Application) *chi.Mux.   ......

add the SetupRoutes on main.go  and add it as a Handler

[00:02:54](https://master.dev/courses/complete-go/chi-router?t=174)
`go get -u github.com/go-chi/chi/v5`

**API Route Handlers**

[00:02:39](https://master.dev/courses/complete-go/api-route-handlers?t=159)
This struct defines the type details for the WorkoutHandler. It's empty now, but will later include properties for the store and logger.

[00:06:16](https://master.dev/courses/complete-go/api-route-handlers?t=376)
Learn more about [ParseInt](https://pkg.go.dev/strconv#ParseInt)

[00:11:24](https://master.dev/courses/complete-go/api-route-handlers?t=684)
`curl localhost:8080/workouts/2`

[00:11:37](https://master.dev/courses/complete-go/api-route-handlers?t=697)
`curl -X POST localhost:8080/workouts`

### Data Layer

**Postgres Database Docker Container**

[00:01:13](https://master.dev/courses/complete-go/postgres-database-docker-container?t=73)
Check out our [Complete Intro to Containers](https://master.dev/courses/complete-intro-containers-v2/) course to learn more about Docker

[00:01:54](https://master.dev/courses/complete-go/postgres-database-docker-container?t=114)
Make sure you have Docker and Postgres installed. See the [setup instructions](https://github.com/Melkeydev/fem-project-live)

[00:02:03](https://master.dev/courses/complete-go/postgres-database-docker-container?t=123)
https://github.com/Melkeydev/fem-project-live

postgresql driver: https://github.com/jackc/pgx
go get github.com/jackc/pgx/v4/stdlib

https://pkg.go.dev/fmt

Add enhanced configuration to the connection pool settings with: db.SetMaxOpenConns(), db.SetMaxIdleConns(), and db.SetConnMaxIdleTime()


database layer a store package was created to talk to the postgress 


then in the appgo we instatiate it with store.Open()
and in Application struct we added DB *sql.DB


in main.go we can add 
defer app.DB.Close() -> that means that at the very end of execution, after everything else has been done, then go and call this function

[00:02:30](https://master.dev/courses/complete-go/postgres-database-docker-container?t=150)
You can copy the Docker Compose configuration from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/docker-compose.yml)

[00:06:48](https://master.dev/courses/complete-go/postgres-database-docker-container?t=408)
Make sure Docker is running

[00:07:00](https://master.dev/courses/complete-go/postgres-database-docker-container?t=420)
Note: If you get a "Ports are not available" error, Postgres is already running on your computer. Kill the Postgres process or bind to a different port.

**pgx Driver for PostgreSQL**

[00:01:00](https://master.dev/courses/complete-go/pgx-driver-for-postgresql?t=60)
Here's a link to [pgx](https://github.com/jackc/pgx)

[00:02:06](https://master.dev/courses/complete-go/pgx-driver-for-postgresql?t=126)
`go get github.com/jackc/pgx/v4/stdlib`

[00:02:12](https://master.dev/courses/complete-go/pgx-driver-for-postgresql?t=132)
connect to DB using a driver: pgx
(go get github.com/jackc/pgx/v4/stdlib)

in the store folder 
create a file: database.go 

host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable

It's a good idea to call db.Ping() to ensure the DSN is valid and the server is reachable

Add enhanced configuration to the connection pool settings with: 
db.SetMaxOpenConns(), db.SetMaxIdleConns(), and db.SetConnMaxIdleTime()

[00:05:06](https://master.dev/courses/complete-go/pgx-driver-for-postgresql?t=306)
`host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable`

[00:06:07](https://master.dev/courses/complete-go/pgx-driver-for-postgresql?t=367)
The `%w` is a special format specifier that wraps errors. Learn more in the [fmt docs]( https://pkg.go.dev/fmt).

[00:06:19](https://master.dev/courses/complete-go/pgx-driver-for-postgresql?t=379)
It's a good idea to call [db.Ping()](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/database.go#L18) to ensure the DSN is valid and the server is reachable


[00:06:52](https://master.dev/courses/complete-go/pgx-driver-for-postgresql?t=412)
Add enhanced configuration to the connection pool settings with: `db.SetMaxOpenConns(), db.SetMaxIdleConns(), and db.SetConnMaxIdleTime()`

**SQL Migrations with Goose**

[00:00:20](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=20)
Here's a link to [Goose](https://github.com/pressly/goose)

[00:02:28](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=148)
using goose for DB migrations (https://github.com/pressly/goose)
to modify schemas

to use it, we shpould install it (go install github.com/pressly/goose/v3/cmd/goose@latest 
go get github.com/pressly/goose/v3/cmd/goose@latest)

goose -version

If you are troubleshooting, check if Goose is installed: 
ls -l ~/go/bin | grep goose

export PATH=$HOME/go/bin:$PATH

migrations folder -> fs.go 

The prefix 
00001_
 is to ensure order of the migration files. Some prefer date/time prefixes like 
YYYYMMDDHHMM_

repo:
https://github.com/Melkeydev/fem-project-live/blob/main/migrations/00001_users.sql

[00:02:56](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=176)
`go install github.com/pressly/goose/v3/cmd/goose@latest`

[00:03:38](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=218)
If you are troubleshooting, check if Goose is installed: `ls -l ~/go/bin | grep goose`

[00:03:50](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=230)
`export PATH=$HOME/go/bin:$PATH`

[00:04:02](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=242)
More installation and troubleshooting tips can be found in [the Goose documentation](https://pressly.github.io/goose/installation/)

[00:06:15](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=375)
The prefix `00001_` is to ensure order of the migration files. Some prefer date/time prefixes like `YYYYMMDDHHMM_`.

[00:09:52](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=592)
The completed users migration can be found in [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/migrations/00001_users.sql)

[00:11:46](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=706)
The complete workouts migration can be found in [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/migrations/00002_workouts.sql)

[00:16:34](https://master.dev/courses/complete-go/sql-migrations-with-goose?t=994)
The completed workout_entries migration can be found [in the repo](https://github.com/Melkeydev/fem-project-live/blob/main/migrations/00003_workout_entries.sql)

**Running Goose Migrations**

[00:01:32](https://master.dev/courses/complete-go/running-goose-migrations?t=92)
`go get github.com/pressly/goose/v3/cmd/goose@latest`

[00:04:17](https://master.dev/courses/complete-go/running-goose-migrations?t=257)
For a deeper dive into Goose, check out the [Goose blog](https://pressly.github.io/goose/blog/)

[00:06:35](https://master.dev/courses/complete-go/running-goose-migrations?t=395)
`psql -U postgres -h localhost -p 5432`

[00:06:49](https://master.dev/courses/complete-go/running-goose-migrations?t=409)
You can learn more about psql in [our SQL course](https://master.dev/courses/sql/sql-overview-creating-a-database/?t=353)

[00:07:30](https://master.dev/courses/complete-go/running-goose-migrations?t=450)
psql -U postgres -h localhost -p 5432

**Defining Data Types in Store**

[00:05:04](https://master.dev/courses/complete-go/defining-data-types-in-store?t=304)
json  tag (struct tag) help us with the encoding and decoding json into struct

reps a pointer because we want to know if it is null or not
To explicitly allow checking for nil values, which provides more flexibility in handling optional or potentially unset numeric fields.

decoupling DB 
we are going to interact with interfaces ( a collection of methods signatures)

**CreateWorkout Query**

[00:00:57](https://master.dev/courses/complete-go/createworkout-query?t=57)
Learn more about [transactions](https://master.dev/courses/sql/transactions/)

[00:01:31](https://master.dev/courses/complete-go/createworkout-query?t=91)
ACID stands for Atomicity, Consistency, Isolation, and Durability

[00:03:43](https://master.dev/courses/complete-go/createworkout-query?t=223)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L51)

[00:06:13](https://master.dev/courses/complete-go/createworkout-query?t=373)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L64)

[00:10:18](https://master.dev/courses/complete-go/createworkout-query?t=618)
The full implementation will be added in a later lesson.

[00:10:31](https://master.dev/courses/complete-go/createworkout-query?t=631)
https://master.dev/courses/sql/transactions/
ACID stands for Atomicity, Consistency, Isolation, and Durability

quer := 'INSERT .... VALUES ($1, $2 ...)'
tx.QueryRow( query, ...params para los $x  ). Scan( ID) 

tx.Commit()

### API CRUD Routes

**CreateWorkout Handler**

[00:00:00](https://master.dev/courses/complete-go/createworkout-handler?t=0)
workout store go 
HandleCreateWorkout ()

NewWorkouthandler
workout store, is an interface which decouples database connection .  The interface allows decoupling the API layer from the specific database implementation, enabling easier database swapping and maintaining flexibility across application layers

w.Header().Set("Content-Type", ....
json.NewEnconder(w),Enconde(createdWorkout)

in app.go was missing the workoutStore:= storeNewPostgresWorkoutstore(pgDB)
workoutHandler := api.newWorkoutHandler(workoutStore)

**Testing CreateWorkout Endpoint with cURL**

[00:01:44](https://master.dev/courses/complete-go/testing-createworkout-endpoint-with-curl?t=104)
Here's a link to the [post_notes.txt file](https://github.com/Melkeydev/fem-project-live/blob/main/post_notes.txt)

[00:05:10](https://master.dev/courses/complete-go/testing-createworkout-endpoint-with-curl?t=310)
The current code can be found on the [1.5 + post notes commit](https://github.com/Melkeydev/fem-project-live/commit/906b53e39aa4d99507a0fb0e8005f22966746694)

**Getting Workouts By ID**

[00:01:39](https://master.dev/courses/complete-go/getting-workouts-by-id?t=99)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L85)

[00:01:54](https://master.dev/courses/complete-go/getting-workouts-by-id?t=114)
https://github.com/Melkeydev/fem-project-live/blob/main/post_notes.txt

The current code can be found on the 1.5 + post notes commitx
https://github.com/Melkeydev/fem-project-live/commit/906b53e39aa4d99507a0fb0e8005f22966746694

The SQL query can be copied from the repo https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L85


queryRow (query, ...). Scan(pointers...)

The SQL query can be copied from the repo https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L99

[00:05:56](https://master.dev/courses/complete-go/getting-workouts-by-id?t=356)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L99)

**Updating Workouts**

[00:01:31](https://master.dev/courses/complete-go/updating-workouts?t=91)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L141)

[00:05:43](https://master.dev/courses/complete-go/updating-workouts?t=343)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L159)

[00:06:42](https://master.dev/courses/complete-go/updating-workouts?t=402)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L166)

[00:11:38](https://master.dev/courses/complete-go/updating-workouts?t=698)
update:The SQL query can be copied from the repo https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L141


tx.Exec(query, params...)

**Handlers for Getting & Updating Workouts**

[00:14:36](https://master.dev/courses/complete-go/handlers-for-getting-updating-workouts?t=876)
The current code can be found on the [1.6 commit](https://github.com/Melkeydev/fem-project-live/commit/420a1a8910e528b3fa6af48a901b68502b0ee3e4)

[00:15:51](https://master.dev/courses/complete-go/handlers-for-getting-updating-workouts?t=951)
What is the purpose of creating a pointer-based struct for update workout requests?
To allow checking if values are truly nil or intended to be empty, which helps distinguish between intentional updates and zero values. This enables more precise server-side validation by differentiating between unset fields and explicitly empty fields

Why are pointer types used for Title, Description, DurationMinutes, and CaloriesBurned in the update request struct?
Because pointer types have a nil zero value, which allows distinguishing between unset fields and fields with zero/empty values.This provides more confidence in processing client requests by enabling precise field update checks

What is the purpose of using json tags in the UpdateWorkoutRequest struct?
JSON tags define how struct fields are mapped during JSON decoding, allowing the fields to match the expected JSON keys from the client request.This ensures that JSON data is correctly parsed into the struct fields during the update process

**Deleting Workouts**

[00:02:38](https://master.dev/courses/complete-go/deleting-workouts?t=158)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L191)

**JSON Response Writer Refactor**

[00:01:04](https://master.dev/courses/complete-go/json-response-writer-refactor?t=64)
DRY: Don't Repeat Yourself

[00:02:45](https://master.dev/courses/complete-go/json-response-writer-refactor?t=165)
The `any` type was added in Go 1.18

[00:05:51](https://master.dev/courses/complete-go/json-response-writer-refactor?t=351)
The current code can be found on the [1.8 commit](https://github.com/Melkeydev/fem-project-live/commit/0152bf2362188f2a6e496afe5082ca588376dcbf)

### Testing Go Applications

**Using a Testing Database**

[00:00:23](https://master.dev/courses/complete-go/using-a-testing-database?t=23)
Melkey doesn't cover unit tests in this course, but you can check out [this tutorial on go.dev](https://go.dev/doc/tutorial/create-module)

[00:00:54](https://master.dev/courses/complete-go/using-a-testing-database?t=54)
Here's a link to [Thorsten Ball's books](https://thorstenball.com/books/)

[00:01:33](https://master.dev/courses/complete-go/using-a-testing-database?t=93)
Here's a link to [the video](https://www.youtube.com/watch?v=8hQG7QlcLBk)

**Connecting to the Test Database**

[00:00:20](https://master.dev/courses/complete-go/connecting-to-the-test-database?t=20)
Here's more information about the [testing package](https://pkg.go.dev/testing)

[00:00:35](https://master.dev/courses/complete-go/connecting-to-the-test-database?t=35)
Here's a link to [Testify](https://github.com/stretchr/testify)

[00:01:47](https://master.dev/courses/complete-go/connecting-to-the-test-database?t=107)
`go get github.com/stretchr/testify`

[00:05:11](https://master.dev/courses/complete-go/connecting-to-the-test-database?t=311)
Melkey has `%w` on line 12. He later changes this back to `%v`

[00:06:16](https://master.dev/courses/complete-go/connecting-to-the-test-database?t=376)
Make sure `workout_entries` is spelled correctly. Melkey fixes this when running the tests.

**Testing CreateWorkout Success**

[00:04:35](https://master.dev/courses/complete-go/testing-createworkout-success?t=275)
Note: You cannot take an address of a constant

**Testing CreateWorkout Errors**

[00:03:07](https://master.dev/courses/complete-go/testing-createworkout-errors?t=187)
Learn more about subtests in the [standard library docs](https://pkg.go.dev/testing#hdr-Subtests_and_Sub_benchmarks) and [on the blog](https://go.dev/blog/subtests)

[00:04:18](https://master.dev/courses/complete-go/testing-createworkout-errors?t=258)
`go get github.com/stretchr/testify/assert`

### Authentication

**Managing User Data**

[00:02:03](https://master.dev/courses/complete-go/managing-user-data?t=123)
Learn more about the [time package](https://pkg.go.dev/time)

[00:04:25](https://master.dev/courses/complete-go/managing-user-data?t=265)
`go get golang.org/x/crypto/bcrypt`

**Validating User Data**

[00:05:21](https://master.dev/courses/complete-go/validating-user-data?t=321)
Here's a link to the [regex package documentation](https://pkg.go.dev/regexp)

[00:06:06](https://master.dev/courses/complete-go/validating-user-data?t=366)
`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

**Hashing & Storing User Passwords**

[00:01:47](https://master.dev/courses/complete-go/hashing-storing-user-passwords?t=107)
Here's [more information on bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt)

[00:04:43](https://master.dev/courses/complete-go/hashing-storing-user-passwords?t=283)
Learn more about [errors.Is](https://pkg.go.dev/errors#Is)

[00:10:22](https://master.dev/courses/complete-go/hashing-storing-user-passwords?t=622)
The current code can be found on the [3.1 commit](https://github.com/Melkeydev/fem-project-live/commit/0f82adb67aaff0ba7ee51dd8fc5bc1e55cedde07)

[00:11:05](https://master.dev/courses/complete-go/hashing-storing-user-passwords?t=665)
Here's a link to [post_notes.txt](https://github.com/Melkeydev/fem-project-live/blob/main/post_notes.txt#L125)

**Token Authentication & OAuth 2.0**

[00:02:44](https://master.dev/courses/complete-go/token-authentication-oauth-2-0?t=164)
Learn more [about JWTs](https://jwt.io/introduction)

**Creating a Tokens Table**

[00:00:39](https://master.dev/courses/complete-go/creating-a-tokens-table?t=39)
Learn more about the [bytea format](https://www.postgresql.org/docs/current/datatype-binary.html)

[00:02:08](https://master.dev/courses/complete-go/creating-a-tokens-table?t=128)
`goose -dir migrations postgres "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable" up`

[00:03:35](https://master.dev/courses/complete-go/creating-a-tokens-table?t=215)
You can find more troubleshooting tips [in the README of the repo](https://github.com/Melkeydev/fem-project-live)

**Testing the Authentication Routes**

[00:00:07](https://master.dev/courses/complete-go/testing-the-authentication-routes?t=7)
The current code can be found on the [3.2 commit](https://github.com/Melkeydev/fem-project-live/commit/efb3ae2bad4c15f1f77bb63279da77ae9f075715)

[00:00:50](https://master.dev/courses/complete-go/testing-the-authentication-routes?t=50)
Here's a link to [post_notes.txt](https://github.com/Melkeydev/fem-project-live/blob/main/post_notes.txt#L137-L144)

[00:01:25](https://master.dev/courses/complete-go/testing-the-authentication-routes?t=85)
Here's a link to [post_notes.txt](https://github.com/Melkeydev/fem-project-live/blob/main/post_notes.txt#L147-L152)

### Middleware

**Getting User Tokens**

[00:03:20](https://master.dev/courses/complete-go/getting-user-tokens?t=200)
The method receiver should be `*PostgresUserStore`. Melkey fixes this later in the course.

[00:03:38](https://master.dev/courses/complete-go/getting-user-tokens?t=218)
The return should be a pointer to a user: `*User`. Melkey fixes this later in the lesson.

**Modifying Request Context**

[00:02:11](https://master.dev/courses/complete-go/modifying-request-context?t=131)
Learn more about [the context package](https://pkg.go.dev/context) and see [more examples](https://gobyexample.com/context)

[00:04:42](https://master.dev/courses/complete-go/modifying-request-context?t=282)
Learn more about the [possibility of collision](https://medium.com/@matryer/context-keys-in-go-5312346a868d).

**Authentication Middleware**

[00:02:07](https://master.dev/courses/complete-go/authentication-middleware?t=127)
The Vary HTTP header is used to inform caches about which request headers influence the response content

**Adding User ID Migration**

[00:02:08](https://master.dev/courses/complete-go/adding-user-id-migration?t=128)
Learn more about [foreign keys](https://www.postgresql.org/docs/current/tutorial-fk.html)

[00:02:33](https://master.dev/courses/complete-go/adding-user-id-migration?t=153)
`goose -dir migrations postgres "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable" up`

**Validating User Workout Ownership**

[00:02:52](https://master.dev/courses/complete-go/validating-user-workout-ownership?t=172)
The SQL query can be copied from [the repo](https://github.com/Melkeydev/fem-project-live/blob/main/internal/store/workout_store.go#L215)

[00:10:46](https://master.dev/courses/complete-go/validating-user-workout-ownership?t=646)
Make sure you update the error message to say "delete" instead of "update'

**Testing API Endpoints**

[00:00:32](https://master.dev/courses/complete-go/testing-api-endpoints?t=32)
The final code is on [the main branch](https://github.com/Melkeydev/fem-project-live/)

[00:01:31](https://master.dev/courses/complete-go/testing-api-endpoints?t=91)
See [post_notes.txt](https://github.com/Melkeydev/fem-project-live/blob/main/post_notes.txt#L156) for all the cURL commands

### Wrapping Up

**Wrapping Up**

[00:00:20](https://master.dev/courses/complete-go/wrapping-up?t=20)
The final code is on [the main branch](https://github.com/Melkeydev/fem-project-live/)
