# iPromise

Welcome to the **iPromise** project! This repository contains my custom implementation of JavaScript's Promise, named `iPromise`. 

## Cloning the Repository

To get started, clone the repository using the following command:

```bash
git clone https://github.com/visioncrunch/iPromise.git
```

## Understanding iPromise.js

The core of this project lies in the `iPromise.js` file. This is where I've developed my own version of the Promise class, with the intention of better understanding the underlying mechanics of asynchronous programming.

### Current Status

As of now, the `iPromise` implementation supports basic functionalities, including:

- **Pending, Fulfilled, and Rejected States:** The promise starts in a 'pending' state and transitions to either 'fulfilled' or 'rejected'.
- **.then() Method:** This method allows for chaining of operations upon successful resolution or rejection of the promise.
- **.catch() Method:** This method provides a way to handle rejections without specifying a success handler.

However, there are some features still in development:

- **.finally() Method:** This feature is not yet implemented. It will allow a handler to be executed regardless of the promise's outcome, providing a cleaner way to perform cleanup tasks.

### Milestone Achieved

One significant milestone I've achieved is cracking the concept of handlers. This has been a challenge for me for quite some time. After exploring various tutorials and resources, I finally understood how handlers operate within a promise. I would like to share an explanation I found particularly helpful by Perplexity AI.

## Understanding Handlers in a Custom Promise Implementation

In a custom promise implementation, **handlers** are a crucial concept, playing a significant role in managing asynchronous operations. Handlers refer to the functions that execute when the promise is either fulfilled (resolved) or rejected.

### Purpose of Handlers

When a promise is created, it starts in the **pending** state, meaning its eventual outcome is undetermined. Handlers allow the code to specify what actions to perform once the promise's state changes:

- A success handler is invoked if the promise is fulfilled.
- A failure handler is invoked if the promise is rejected.

This design is vital for handling asynchronous operations, where the result may not be immediately available.

## How Handlers Function

### 1. Storing Handlers

When calling the `then` method on a promise instance, two functions are typically passed: one for handling a successful resolution (`onFulfilled`) and another for handling a rejection (`onRejected`). If the promise is still pending, these handlers are stored in an array.

**Example Implementation:**
```javascript
if (this.state === 'pending') {
  // Store the handlers if the promise is still pending
  this.handlers.push({ onFulfilled: handle, onRejected: handle });
}
```

### 2. Executing Handlers

When the promise is resolved or rejected, the appropriate handlers are executed based on the outcome:

- **On Fulfillment:**
  ```javascript
  this.handlers.forEach(handler => handler.onFulfilled(value));
  ```
  This iterates over all stored handlers, calling the `onFulfilled` function with the resolved value.

- **On Rejection:**
  ```javascript
  this.handlers.forEach(handler => handler.onRejected(reason));
  ```
  This calls the `onRejected` function with the rejection reason.

### 3. Handling Settled Promises

If the promise has already been settled (fulfilled or rejected) by the time `then` is called, the handlers are executed immediately:

```javascript
else {
  // Execute the handler if the promise is already settled
  handle();
}
```

This approach ensures that even if handlers are attached after the promise has settled, the correct outcome is still achieved.

## Example Walkthrough

Consider this example:

```javascript
const customPromise = new MyPromise((resolve, reject) => {
  if (2 < 3) {
    resolve('Resolved because the condition is true.');
  } else {
    reject('Rejected because the condition is false.');
  }
});
```

1. **Promise Creation**: The promise begins in the **pending** state.
2. **Condition Check**: The condition `2 < 3` is true, triggering `resolve` with a message.
3. **State Change**: The promise transitions to the **fulfilled** state, storing the message.
4. **Handler Execution**: When `then` is called, the promise is already fulfilled, so the success handler is executed immediately, displaying the resolved value.

### Summary

- **Handlers** define actions to take when a promise is fulfilled or rejected.
- Handlers are stored in an array if the promise is pending.
- Once the promise settles, the relevant handlers are executed based on the outcome.

This structure provides a clean, manageable way to handle asynchronous operations, allowing developers to write more readable and maintainable code.

## Additional Example: Pending Promise

Here’s an example to illustrate a promise in a **pending** state:

**Example Implementation:**
```javascript
// Create a new promise instance
const delayedPromise = new MyPromise((resolve, reject) => {
  console.log('Promise is pending...');

  // Simulate asynchronous operation with setTimeout
  setTimeout(() => {
    // Resolve the promise after 3 seconds
    resolve('Promise resolved after 3 seconds!');
  }, 3000);
});

// Attach handlers to the promise
delayedPromise
  .then(result => {
    console.log('Resolved:', result);
  })
  .catch(error => {
    console.error('Rejected:', error);
  });

console.log('This message logs immediately, while the promise is pending.');
```

### Explanation:

1. **Promise Creation**: When the promise is instantiated, the executor function runs, logging "Promise is pending...".
2. **Simulating Asynchronous Operation**: `setTimeout` simulates a delay of 3 seconds, keeping the promise in the **pending** state.
3. **Storing Handlers**: The `.then()` method is called immediately, storing the success handler in the handlers array since the promise is still pending.
4. **Immediate Logging**: "This message logs immediately, while the promise is pending." is printed instantly, showcasing the non-blocking nature of promises.
5. **Resolving the Promise**: After 3 seconds, `setTimeout`’s callback triggers, resolving the promise. The state changes to **fulfilled**, and the stored handler executes.
6. **Handler Execution**: The stored success handler logs "Resolved: Promise resolved after 3 seconds!".

This example demonstrates the capability of promises to manage asynchronous operations, executing handlers only when the correct conditions are met.

## Future Improvements

As I continue to learn more about promises and asynchronous programming, I plan to refine and expand the functionality of `iPromise`. The inclusion of the `.finally()` method is on the horizon, and I am excited to see how this project evolves.

## Acknowledgments

I want to thank my friend for encouraging me to explore different AI tools, such as Perplexity and Claude, which provided helpful explanations and insights into promises and their handlers.

---

Feel free to reach out if you have any questions or suggestions for improvement!

---
