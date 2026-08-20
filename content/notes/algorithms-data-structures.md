---
title: Algorithms & Data Structures | Frontend Masters (WIP)
description: by The ThePrimeagen.
publishDate: 2026-08-15
---

course notes: https://theprimeagen.github.io/fem-algos/
exercises: https://github.com/ThePrimeagen/kata-machine

# Algorithms & Data Structures

## Quick Reference
### Algorithms

| Concept | Typical Complexity |
|---|---:|
| Linear search | `O(N)` |
| Binary search | `O(log N)` |
| Bubble sort | `O(N²)` |
| Linked-list search | `O(N)` |
| Linked-list insertion with node reference | `O(1)` |
| Queue enqueue | `O(1)` |
| Queue dequeue | `O(1)` |



## Linear Search


Course repository:

https://github.com/ThePrimeagen/kata-machine

How the kata repository works:

https://github.com/ThePrimeagen/kata-machine#how-it-works

Clone through SSH:

```bash
git clone git@github.com:ThePrimeagen/kata-machine.git
```

> This command requires a GitHub SSH key.

### What is linear search?

Linear search checks each element one at a time until it finds the target value.

Conceptually:

```ts
function linearSearch(array, valueToSearch) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === valueToSearch) {
      return i;
    }
  }

  return -1;
}
```

JavaScript's `indexOf()` performs a linear-style search for array values.

### Complexity

Worst-case complexity:

```text
O(N)
```

As the number of items grows, the maximum amount of work grows proportionally.

If the array contains `N` elements, the algorithm may need to inspect all `N`.

### Kata tests

Example:

```bash
npx jest Linear
```

---

## Binary Search

Before considering binary search, always ask:

> Is the data ordered?

Binary search requires sorted data.

### Concept

Instead of inspecting every value, binary search repeatedly divides the search space in half.

Example:

```text
1  3  5  7  9  11  13  15
            ↑
         midpoint
```

If the target is larger than the midpoint, discard the left half.

If the target is smaller, discard the right half.

Repeat until the value is found or no candidates remain.

### Complexity

Binary search:

```text
O(log N)
```

At every step, approximately half of the remaining possibilities are eliminated.

### `O(N log N)`

`O(N log N)` is common in efficient comparison-based sorting algorithms such as merge sort and heapsort.

It is different from the `O(log N)` complexity of a single binary search.

---

## Bubble Sort

Bubble sort repeatedly compares adjacent values and swaps them when they are in the wrong order.

Example:

```text
5 3 4 1

compare 5 and 3
↓
3 5 4 1

compare 5 and 4
↓
3 4 5 1

compare 5 and 1
↓
3 4 1 5
```

After the first full pass, the largest value has "bubbled" to the end.

The next pass does not need to inspect that final sorted position.

Conceptually:

```text
First pass:  N elements
Second pass: N - 1
Third pass:  N - 2
...
```

The number of comparisons is approximately:

```text
N(N - 1) / 2
```

Ignoring constants and lower-order terms:

```text
O(N²)
```

Bubble sort is therefore inefficient for large inputs.

---

## Linked List Data Structures

A linked list is a node-based data structure.

Each node contains:

1. A value.
2. A reference to another node.

Example singly linked list:

```text
HEAD
 ↓
[A | next] → [B | next] → [C | next] → null
```

### Linked list vs. array

Arrays typically store elements in contiguous positions and provide index-based access:

```text
array[0]
array[1]
array[2]
```

Linked lists do not inherently have numeric indexes.

To reach an item, you usually traverse the nodes from the head.

### Singly linked list

Each node points to the next node:

```text
A → B → C
```

### Doubly linked list

Each node can point both forward and backward:

```text
A ⇄ B ⇄ C
```

### Complexity

Inserting or deleting a node can be:

```text
O(1)
```

**if you already have a reference to the correct node/location.**

Finding that location generally requires traversal:

```text
O(N)
```

Random indexed access is also:

```text
O(N)
```

because there is no direct index lookup like an array.

---

## Queue

A queue follows:

```text
FIFO
```

**First In, First Out.**

Example:

```text
enqueue
   ↓
[A] [B] [C]
         ↓
      dequeue from front
```

A queue can be implemented efficiently using a linked list.

Typical operations:

- `enqueue`: add to the back
- `dequeue`: remove from the front
- `peek`: inspect the front item

With an appropriate linked-list implementation:

```text
enqueue: O(1)
dequeue: O(1)
```

---








Frontend masters notes: 

# The Last Algorithms Course You'll Need | Frontend Masters

### Introduction

**Introduction**

[00:00:11](https://master.dev/courses/algorithms/introduction?t=11)
You can reference the [course notes](https://theprimeagen.github.io/fem-algos) throughout the course (fyi he is the using the [Dark Reader](https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh?hl=en) extension)

[00:05:12](https://master.dev/courses/algorithms/introduction?t=312)
Here's a link to check out [Polyglot Programming](https://master.dev/courses/typescript-go-rust) on Master.dev

[00:05:38](https://master.dev/courses/algorithms/introduction?t=338)
Here are links to check out ThePrimeagen on [Youtube](https://youtube.com/ThePrimeagen), [Twitch](https://twitch.tv/ThePrimeagen), and [Twitter](https://twitter.com/ThePrimeagen)

[00:07:03](https://master.dev/courses/algorithms/introduction?t=423)
Here are links to check out [Intro to Algorithms](https://amzn.to/3bYmBMu) and [A Common-Sense Guide...](https://amzn.to/3Qp9KlB)

### Search

**Linear Search & Kata Setup**

[00:04:16](https://master.dev/courses/algorithms/linear-search-kata-setup?t=256)
Here's a link to check out [Kata Machine](https://github.com/ThePrimeagen/kata-machine) on GitHub

[00:04:18](https://master.dev/courses/algorithms/linear-search-kata-setup?t=258)
`git clone git@github.com:ThePrimeagen/kata-machine.git` this clone command requires a GitHub SSH key

[00:04:37](https://master.dev/courses/algorithms/linear-search-kata-setup?t=277)
If you need more help getting setup, the [setup instructions](https://github.com/ThePrimeagen/kata-machine#how-it-works) are in the README

[00:04:40](https://master.dev/courses/algorithms/linear-search-kata-setup?t=280)
Linear search  
// (indexOf -> is a linear seach, function to search the index)

search (array, valueToSearch)  
-> asking everyitrem in the array if it is equal to  valueToSearch

O complexity - > O(N) as your input grows, so does the times to it takes equivalent. 

git clone git@github.com:ThePrimeagen/kata-machine.git this clone command requires a GitHub SSH key


https://github.com/ThePrimeagen/kata-machine
https://github.com/ThePrimeagen/kata-machine#how-it-works

linear_seach in the 
npx jest Linear

**Pseudo Code Binary Search**

[00:02:31](https://master.dev/courses/algorithms/pseudo-code-binary-search?t=151)
Note: this condition should be `v < n`. You compare the value to the needle, not to the position.

[00:02:40](https://master.dev/courses/algorithms/pseudo-code-binary-search?t=160)
algorithm_time 
 
ALWAYS ask: is it ordered? 

 O(N)

 --------

Binary search   
complexity: O (LogN) -> looking a value and divide it into half  or O (N logN) -> scanning an input 
binary -> either 1 or 0

**Implementing Two Crystal Balls**

[00:02:55](https://master.dev/courses/algorithms/implementing-two-crystal-balls?t=175)
The condition should be `j <= jmpAmount`

### Sort

**Bubble Sort**

[00:08:40](https://master.dev/courses/algorithms/bubble-sort?t=520)
bubble sort
sort an aray by iterations, 
first time we go thorugh the  n elements in the array. ( the result is pushing the higher value to the end )
so Second time we go n-1  because the last value is already sorted 

complexity of bubble sort? O(n²), where n is the number of elements in the array.
n(n+1)  / 2  ->  n^2 +n  / 2.   -> o (n^2 + n)     -> o (n^2)

**Implementing Bubble Sort**

[00:02:32](https://master.dev/courses/algorithms/implementing-bubble-sort?t=152)
The comparison should be `if(arr[j] > arr[j+1])` and the swap should be `swap(j, j+1)`

**Linked List Data Structures**

[00:05:09](https://master.dev/courses/algorithms/linked-list-data-structures?t=309)
link list 
What is a linked list, and how does it fundamentally differ from an array?Click to reveal answerA linked list is a node-based data structure where each node contains a value and a reference (pointer) to the next node. Unlike arrays, linked lists allow dynamic insertion and deletion with constant time complexity, and do not require shifting indices when modifying the list.
first element = head
 
single link list
and double link list 


heap alocated objects -> 

insert on a linked list is. O(1)

there is no index in a linkedlist

**Queue**

[00:00:02](https://master.dev/courses/algorithms/queue?t=2)
queue : specific implementation of a linked list  (simply linked list)
FIFO structure 

 O(1)

**Implementing a Queue**

[00:05:40](https://master.dev/courses/algorithms/implementing-a-queue?t=340)
You should also add a check for `if(!this.head)` to ensure head exists

### Arrays

**RingBuffer**

[00:00:20](https://master.dev/courses/algorithms/ringbuffer?t=20)
Prime meant to say "RingBuffers"

### Quick Sort

**Implementing QuickSort**

[00:03:19](https://master.dev/courses/algorithms/implementing-quicksort?t=199)
Here's a link to check out [VIM Fundamentals](https://master.dev/courses/vim-fundamentals/) on Master.dev

[00:03:29](https://master.dev/courses/algorithms/implementing-quicksort?t=209)
Here's a link to check out [Developer Productivity](https://master.dev/courses/developer-productivity/) on Master.dev

### Doubly Linked List

**Linked List: prepend, insertAt, & append**

[00:09:10](https://master.dev/courses/algorithms/linked-list-prepend-insertat-append?t=550)
This should be `node.prev.next = node;` Using `curr.prev.next = curr;` would be  linking the previous node to curr, which would break the doubly linked structure.

**Linked List: remove, get, & removeAt**

[00:09:18](https://master.dev/courses/algorithms/linked-list-remove-get-removeat?t=558)
Note: There are a couple of bugs here that Prime fixes in the Debugging Linked Lists lesson

[00:10:06](https://master.dev/courses/algorithms/linked-list-remove-get-removeat?t=606)
`this.length` should be `idx`

[00:12:51](https://master.dev/courses/algorithms/linked-list-remove-get-removeat?t=771)
Line 54 should be `node.prev.next = node`

### Trees

**Trees Overview**

[00:01:55](https://master.dev/courses/algorithms/trees-overview?t=115)
Here's a link to check out [AST explorer](https://astexplorer.net/)

### Tree Search

**Implement Binary Tree Comparison**

[00:07:49](https://master.dev/courses/algorithms/implement-binary-tree-comparison?t=469)
Here's a link to check out [For Programmers Who Don't Know How...](https://amzn.to/3Qp9KlB)

### Wrapping Up

**Wrapping Up**

[00:01:06](https://master.dev/courses/algorithms/wrapping-up?t=66)
Here's a link to check out [VIM Fundamentals](https://master.dev/courses/vim-fundamentals/) on Master.dev
