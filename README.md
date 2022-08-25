# Purpose

The purpose of this website is to visualize graph coloring algorithms. The main reason I know about them (from real world applications) is compilers and register allocations.

Graph coloring when it comes to register allocation is much different than graph coloring in general, because graph coloring in general can have very nasty cases to screw algorithms over. However, when it comes to register allocation, you won't have many variables interfering with each other at the same time unless it's a deeply nested structure, which tends to be bad coding practice anyways [Source](https://www.lighterra.com/papers/graphcoloring/).

# Features

If this were a real benchmarking tool for real compilers, it wouldn't be done in JavaScript.

Instead, this allows the user to browse through all MxN graph versus algorithm combinations and see which algorithms did the best/worst. And viewing graphs is always fun.

## Maybe Features

A really cool thing will be to see the execution of algorithms step by step. It would probably involve requiring the user to call manual functions, like Add/RemoveEdge or ColorNode, and logging those to record the execution of the program.

# Pre-written programs and tests

They're all in this github, enjoy! Programs are written in JS. **Maybe I'll try to implement that insane paper from earlier** My tests are randomly generated and fairly small.

A great repository to take tests from is [DIMACS Graph Coloring Benchmarks](http://cedric.cnam.fr/~porumbed/graphs/). It's straightforward to parse their text files into my text files. Or heck, I could write the parser myself, who knows.
